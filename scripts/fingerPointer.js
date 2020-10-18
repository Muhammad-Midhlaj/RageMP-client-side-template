const pointingInfo = {
    keyPressed: false,
    mp_pointing: false,
    lastUpdate: Date.now(),
    lastUpdateDeltaTime: Date.now(),
    browserReady: false,
    streamedPlayers: new Set()
};

const localPlayer = mp.players.local;

const Natives = {
    SET_PED_CURRENT_WEAPON_VISIBLE: '0x0725A4CCFDED9A70',
    _0xD01015C7316AE176: '0xD01015C7316AE176',
    CLEAR_PED_SECONDARY_TASK: '0x176CECF6F920D707',
    _0xD5BB4025AE449A4E: '0xD5BB4025AE449A4E',
    _0xB0A6CFD2C69C1088: '0xB0A6CFD2C69C1088',
    GET_FOLLOW_PED_CAM_VIEW_MODE: '0x8D4D46230B2C353A',
};

function requestAnimDict(string) {
	mp.game.streaming.requestAnimDict(string);
	return new Promise(r => {
		const timer = setInterval(() => {
            if(mp.game.streaming.hasAnimDictLoaded(string)) {
                clearInterval(timer);
                r(true);
            }
        }, 50);
	});
}

const lerp = (value_one, value_two, deltaTime) => (1 - deltaTime) * value_one + deltaTime * value_two;

mp.events.add('streamReice.multiply', (...datas) => {
	for (let i = 0; i < datas.length; i++) {
		mp.events.call('streamReice', JSON.parse(datas[i]));
	}
});

mp.events.add('streamReice', (parsedData) => {
	if (parsedData.eventName === 'fingerPointer.updateData') {

		const player = mp.players.atRemoteId(parsedData.wsId);

		if (player && mp.players.exists(player)) {

			const currentTime = Date.now();

			player.lastFingerCamPitch = typeof player.fingerCamPitch === 'undefined' || isNaN(player.fingerCamPitch) ? player.lastFingerCamPitch : player.fingerCamPitch;
			player.lastFingerCamHeading = typeof player.fingerCamHeading === 'undefined' || isNaN(player.fingerCamHeading) ? player.lastFingerCamHeading : player.fingerCamHeading;
			player.lastFingerIsBlocked = player.fingerIsBlocked;
			player.lastFingerIsFirstPerson = player.fingerIsFirstPerson;

			player.fingerDeltaTime = currentTime - player.fingerLastDeltaTime;

			if (player.fingerDeltaTime === 0) {
				player.fingerDeltaTime = 25;
			}

			player.fingerLerp = 0;

			player.newFingerCamPitch = parsedData.args[0];
			player.newFingerCamHeading = parsedData.args[1];
			player.fingerIsBlocked = parsedData.args[2];
			player.fingerIsFirstPerson = parsedData.args[3];

			player.fingerLastDeltaTime = currentTime;
		}
	}
});

mp.events.add('browserDomReady', (browser) => {
	/*if (browser === syncBrowser) {
		syncBrowser.execute(`init('kek', ${localPlayer.remoteId})`);
		pointingInfo.browserReady = true;
	}*/
});

const sendStreamedData = (eventName, clients, ...args) => {
	if (pointingInfo.browserReady) {
		let argumentsString = '';

		for(const arg of args) {
			switch(typeof arg) {
				case 'string': {
					argumentsString += `'${arg}', `;
					break;
				}
				case 'number': {
					argumentsString += `${arg}, `;
					break;
				}
				case 'boolean': {
					argumentsString += `${arg}, `;
					break;
				}
				case 'object': {
					argumentsString += `${JSON.stringify(arg)}, `;
					break;
				}
			}
		}

		//syncBrowser.execute(`streamReice('${eventName}', ${JSON.stringify(clients)}, ${argumentsString})`);
	}
};

mp.events.add({
	'fingerPointer.client.start': async (player) => {
		await requestAnimDict('anim@mp_point');
		startPointing(player, false);
		player.fingerCamPitch = 0;
		player.fingerCamHeading = 0;
		player.fingerIsBlocked = false;
		player.fingerIsFirstPerson = false;

		player.lastFingerCamPitch = 0;
		player.lastFingerCamHeading = 0;
		player.lastFingerIsBlocked = false;
		player.lastFingerIsFirstPerson = false;

		player.newFingerCamPitch = 0;
		player.newFingerCamHeading = 0;
		player.fingerLerp = 0;
		player.fingerLastDeltaTime = Date.now();
		player.fingerDeltaTime = 200;

		player.fingerIsActive = true;
	},
	'fingerPointer.client.stop': (player) => {
		if (player) {
			player.fingerIsActive = false;
			stopPointing(player, false);
		}
	},
	'entityStreamIn': async (entity) => {
		if (entity.type !== 'player') {
			return false;
		}

		pointingInfo.streamedPlayers.add(entity);

		if (entity.getVariable('fingerPointerActive')) {
			await requestAnimDict('anim@mp_point');
			startPointing(entity, false);

			entity.fingerCamPitch = 0;
			entity.fingerCamHeading = 0;
			entity.fingerIsBlocked = false;
			entity.fingerIsFirstPerson = false;

			entity.lastFingerCamPitch = 0;
			entity.lastFingerCamHeading = 0;
			entity.lastFingerIsBlocked = false;
			entity.lastFingerIsFirstPerson = false;

			entity.newFingerCamPitch = 0;
			entity.newFingerCamHeading = 0;
			entity.fingerLerp = 0;
			entity.fingerLastDeltaTime = Date.now();
			entity.fingerDeltaTime = 200;

			entity.fingerIsActive = true;
		}
	},
	'entityStreamOut': (entity) => {
		if (entity.type === 'player') {
			pointingInfo.streamedPlayers.delete(entity);
		}

		mp.events.call('c.entityStreamOut', entity, 'streamOut');
	},
	'c.entityStreamOut': (entity) => {
		if (entity.type !== 'player') {
			return false;
		}

		pointingInfo.streamedPlayers.delete(entity);
		entity.fingerIsActive = false;
	},
	'playerQuit': (player) => {
		pointingInfo.streamedPlayers.delete(player);
		mp.events.call('c.entityStreamOut', player, 'quit');
	}
})

const startPointing = async (player, isLocal = true) => {
	mp.game.invoke(Natives.SET_PED_CURRENT_WEAPON_VISIBLE, player.handle, 0, 1, 1, 1);
	player.setConfigFlag(36, true);
	player.taskMoveNetwork("task_mp_pointing", 0.5, false, "anim@mp_point", 24);
	mp.game.streaming.removeAnimDict('anim@mp_point');

	if (isLocal) {
		//const playersIdsStr = JSON.stringify(Array.from(pointingInfo.streamedPlayers).map(_player => _player.remoteId));
		mp.events.callRemote('fingerPointer.start');
	}

};

const stopPointing = async (player, isLocal = true) => {
    mp.game.invoke(Natives._0xD01015C7316AE176, player.handle, "Stop");

	/*if (!player.isInjured()) {
		player.clearSecondaryTask();
		player.clearTasks();
		player.clearTasksImmediately();
    }*/

	if(!player.isInAnyVehicle(true)) {
		mp.game.invoke(Natives.SET_PED_CURRENT_WEAPON_VISIBLE, player.handle, 1, 1, 1, 1);
	}

	player.setConfigFlag(36, false);
	mp.game.invoke(Natives.CLEAR_PED_SECONDARY_TASK, player.handle);

	if (isLocal) {
		//const playersIdsStr = JSON.stringify(Array.from(pointingInfo.streamedPlayers).map(_player => _player.remoteId));
		mp.events.callRemote('fingerPointer.stop');
	}
};

mp.keys.bind(0x48, true, async () => {
    await requestAnimDict('anim@mp_point');
	pointingInfo.keyPressed = !pointingInfo.keyPressed;

    if (!cuffed && !localPlayer.getVariable('InDeath') && !chatActive && loggedin && !localPlayer.isInAnyVehicle(false)) {
        if (pointingInfo.keyPressed) {
            if (localPlayer.getVariable('ANIM_DICT') != undefined && localPlayer.isPlayingAnim(localPlayer.getVariable('ANIM_DICT'), localPlayer.getVariable('ANIM_NAME'), 3)) {
                let pos = localPlayer.position;
                localPlayer.stopAnimTask(localPlayer.getVariable('ANIM_DICT'), localPlayer.getVariable('ANIM_NAME'), 0);
                localPlayer.position = pos;
            }
            startPointing(localPlayer);
        } else {
            stopPointing(localPlayer);
        }
    }
});

mp.events.add('render', async () => {
	const localPlayerDimension = mp.players.local.dimension;
	const localPlayerHandle = mp.players.local.handle;
	const currentTime = Date.now();

	const updateDelta = currentTime - pointingInfo.lastUpdateDeltaTime;

	mp.players.forEachInStreamRange((_player) => {
		if (_player.getVariable('INVISIBLE')) {
			_player.setAlpha(0);
		} else {
			_player.setAlpha(255);
		}

		if (_player.fingerIsActive) {
			_player.fingerLerp += (updateDelta) / _player.fingerDeltaTime;

			_player.fingerCamPitch = lerp(_player.lastFingerCamPitch, _player.newFingerCamPitch, _player.fingerLerp);
			_player.fingerCamHeading = lerp(_player.lastFingerCamHeading, _player.newFingerCamHeading, _player.fingerLerp);

			mp.game.invoke(Natives._0xD5BB4025AE449A4E, _player.handle, 'Pitch', _player.fingerCamPitch);
			mp.game.invoke(Natives._0xD5BB4025AE449A4E, _player.handle, 'Heading', _player.fingerCamHeading);
			mp.game.invoke(Natives._0xB0A6CFD2C69C1088, _player.handle, 'isBlocked', _player.fingerIsBlocked);
			mp.game.invoke(Natives._0xB0A6CFD2C69C1088, _player.handle, 'isFirstPerson', _player.fingerIsFirstPerson);
		}
	});

    pointingInfo.streamedPlayers.forEach(_player => {
        if (mp.players.exists(_player) && localPlayerDimension !== _player.dimension) {
						mp.events.call('c.entityStreamOut', _player, 'dimension');
            pointingInfo.streamedPlayers.delete(_player);
        }
    });

	pointingInfo.lastUpdateDeltaTime = currentTime;

	if (pointingInfo.keyPressed) {
		if(!localPlayer.isOnFoot()) {
			stopPointing(localPlayer);
		} else {

			let camPitch = global.gameplayCam.getRot(2).x;

			if(camPitch < -70.0) {
				camPitch = -70.0;
			} else if(camPitch > 41.9) {
				camPitch = 41.9;
			}

			camPitch = (camPitch + 70.0) / 112.0;

			let camHeading = mp.game.cam.getGameplayCamRelativeHeading();

			const cosCamHeading = Math.cos(camHeading);
			const sinCamHeading = Math.sin(camHeading);

			if(camHeading < -180.0) {
				camHeading = -180.0;
			} else if(camHeading > 180.0) {
				camHeading = 180.0;
			}
			camHeading = (camHeading + 180) / 360.0;

			const coords = localPlayer.getOffsetFromInWorldCoords((cosCamHeading * -0.2) - (sinCamHeading * (0.4 * camHeading + 0.3)), (sinCamHeading * -0.2) + (cosCamHeading * (0.4 * camHeading + 0.3)), 0.6);
			const resultRayCast = mp.raycasting.testPointToPoint(new mp.Vector3(coords.x, coords.y, coords.z - 0.2), new mp.Vector3(coords.x, coords.y, coords.z + 0.2), localPlayer);

			const calculateCamHeading = camHeading * -1.0 + 1.0;
			const isBlocked = false; //typeof resultRayCast !== 'undefined';
			const isFirstPerson = false; //mp.game.invoke(Natives.GET_FOLLOW_PED_CAM_VIEW_MODE) === 4;

			mp.game.invoke(Natives._0xD5BB4025AE449A4E, localPlayer.handle, 'Pitch', camPitch);
			mp.game.invoke(Natives._0xD5BB4025AE449A4E, localPlayer.handle, 'Heading', calculateCamHeading);
			mp.game.invoke(Natives._0xB0A6CFD2C69C1088, localPlayer.handle, 'isBlocked', isBlocked);
			mp.game.invoke(Natives._0xB0A6CFD2C69C1088, localPlayer.handle, 'isFirstPerson', isFirstPerson);

			if (currentTime >= pointingInfo.lastUpdate + 200) {
				if (pointingInfo.streamedPlayers.size !== 0) {
					const playersIds = Array.from(pointingInfo.streamedPlayers).map(_player => _player.remoteId);
					sendStreamedData('fingerPointer.updateData', playersIds, camPitch, calculateCamHeading, isBlocked, isFirstPerson);
				}

				pointingInfo.lastUpdate = currentTime;
			}
		}
	}
}, 'finger_pointer');
