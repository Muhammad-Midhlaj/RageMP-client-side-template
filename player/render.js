
global.entity = null;
global.nearestObject = null;

var lastEntCheck = 0;
var checkInterval = 200;

var backlightColor = [196, 17, 21];

var blockcontrols = false;
global.cuffed = false;
var hasmoney = false;
var isInSafeZone = false;

var lastCuffUpdate = new Date().getTime();

function getLookingAtEntity() {
    let startPosition = global.localplayer.getBoneCoords(12844, 0.5, 0, 0);
    var resolution = mp.game.graphics.getScreenActiveResolution(1, 1);
    let secondPoint = mp.game.graphics.screen2dToWorld3d([resolution.x / 2, resolution.y / 2, (2 | 4 | 8)]);
    if (secondPoint == undefined) return null;

    startPosition.z -= 0.3;
    const result = mp.raycasting.testPointToPoint(startPosition, secondPoint, localplayer, (2 | 4 | 8 | 16));

    if (typeof result !== 'undefined') {
        if (typeof result.entity.type === 'undefined') return null;
        if (result.entity.type == 'object' && result.entity.getVariable('TYPE') == undefined) return null;

        let entPos = result.entity.position;
        let lPos = global.localplayer.position;
        if (mp.game.gameplay.getDistanceBetweenCoords(entPos.x, entPos.y, entPos.z, lPos.x, lPos.y, lPos.z, true) > 8) return null;
        return result.entity;
    }
    return null;
}

function getNearestObjects() {

    var tempO = null;
    if (global.localplayer.isInAnyVehicle(false)) {
        var players = mp.players.toArray();
        players.forEach(
            (player) => {
                var posL = global.localplayer.position;
                var posO = player.position;
                var distance = mp.game.gameplay.getDistanceBetweenCoords(posL.x, posL.y, posL.z, posO.x, posO.y, posO.z, true);
                if (localplayer != player && global.localplayer.dimension === player.dimension && distance < 2) {
                    if (tempO === null) tempO = player;
                    else if (mp.game.gameplay.getDistanceBetweenCoords(posL.x, posL.y, posL.z, posO.x, posO.y, posO.z, true) <
                        mp.game.gameplay.getDistanceBetweenCoords(posL.x, posL.y, posL.z, tempO.position.x, tempO.position.y, tempO.position.z, true))
                        tempO = player;
                }
            });
    }
    else {
        var objects = mp.objects.toArray();
        objects.forEach(
            (object) => {
                var posL = global.localplayer.position;
                var posO = object.position;
                var distance = mp.game.gameplay.getDistanceBetweenCoords(posL.x, posL.y, posL.z, posO.x, posO.y, posO.z, true);
                if (object.getVariable('TYPE') != undefined && global.localplayer.dimension === object.dimension && distance < 3) {
                    if (tempO === null) tempO = object;
                    else if (mp.game.gameplay.getDistanceBetweenCoords(posL.x, posL.y, posL.z, posO.x, posO.y, posO.z, true) <
                        mp.game.gameplay.getDistanceBetweenCoords(posL.x, posL.y, posL.z, tempO.position.x, tempO.position.y, tempO.position.z, true))
                        tempO = object;
                }
            });
    }
    nearestObject = tempO;
}

mp.events.add('blockMove', function (argument) {
    blockcontrols = argument;
});

mp.events.add('CUFFED', function (argument) {
    cuffed = argument;
});

mp.events.add('hasMoney', function (argument) {
    hasmoney = argument;
    if (!argument) global.localplayer.setEnableHandcuffs(false);
});

mp.events.add('safeZone', function (argument) {
    isInSafeZone = argument;
});

mp.keys.bind(global.Keys.VK_G, false, function () { // G key
    if (global.menuCheck() || global.localplayer.getVariable('InDeath') == true && !global.localplayer.isInAnyVehicle(false)) return;
    if (global.circleOpen) {
        global.CloseCircle();
        return;
    }
    if (!global.loggedin || global.chatActive || entity == null || new Date().getTime() - lastCheck < 1000) return;
    switch (entity.type) {
        case "object":
            if (entity && mp.objects.exists(entity)) {
                mp.events.callRemote('oSelected', entity);
            }
            entity = null;
            return;
        case "player":
            mp.gui.cursor.visible = true;
            global.OpenCircle('Игрок', 0);
            return;
        case "vehicle":
            mp.gui.cursor.visible = true;
            global.OpenCircle('Машина', 0);
            return;
    }
    lastCheck = new Date().getTime();
});

mp.keys.bind(global.Keys.VK_F2, false, function () { // F2 key
    if (global.menuCheck() || global.localplayer.getVariable('InDeath') == true) return;
    // player
    if (global.circleOpen) {
        global.CloseCircle();
        return;
    }
    if (!global.loggedin || global.chatActive || nearestObject == null || new Date().getTime() - lastCheck < 1000) return;

    if (nearestObject && nearestObject.type == 'object' && mp.objects.exists(nearestObject)) {
        mp.events.callRemote('oSelected', nearestObject);
    }
    else if (nearestObject && mp.players.exists(nearestObject)) {
        entity = nearestObject;
        mp.gui.cursor.visible = true;
        global.OpenCircle('Игрок', 0);
    }

    lastCheck = new Date().getTime();
});


var truckorderveh = null;

mp.events.add('SetOrderTruck', (vehicle) => {
    try {
        if(truckorderveh == null) truckorderveh = vehicle;
		else truckorderveh = null;
    } catch (e) {
	}
});

mp.events.add('render', () => {
	try {
        if (!global.loggedin) return;
		if(global.pressedraw) {
			mp.game.graphics.drawText(`Нажмите 'E' для взаимодействия`, [0.10, 0.75], {
				font: 0,
				color: [255, 255, 255, 185],
				scale: [0.35, 0.35],
				outline: true
			});
		}
		if(global.pedsaying != null) {
			let pos = global.pedsaying.getBoneCoords(12844, 0.5, 0, 0);
			mp.game.graphics.drawText(global.pedtext, [pos.x, pos.y, pos.z+0.1], {
				font: 0,
				color: [255, 255, 255, 185],
				scale: [0.35, 0.35],
				outline: true
			});
			if(global.pedtext2 != null) {
				let pos = global.pedsaying.getBoneCoords(12844, 0.5, 0, 0);
				mp.game.graphics.drawText(global.pedtext2, [pos.x, pos.y, pos.z+0.017], {
					font: 0,
					color: [255, 255, 255, 185],
					scale: [0.35, 0.35],
					outline: true
				});
			}
		}
		if (!global.admingm) global.localplayer.setInvincible(false);
        if (global.localplayer.isSprinting() || global.localplayer.isOnAnyBike()) mp.game.player.restoreStamina(100);
        mp.game.player.setLockonRangeOverride(1.5);
        mp.game.controls.disableControlAction(1, global.Inputs.CINEMATIC_SLOWMO, true); // Фикс slow-mo режима
        mp.game.controls.disableControlAction(1, global.Inputs.ENTER_CHEAT_CODE, true);
		// thanks to kemperrr
		if (mp.game.invoke(getNative('IS_CUTSCENE_ACTIVE'))) {
	        mp.game.invoke(getNative('STOP_CUTSCENE_IMMEDIATELY'))
		}

	    if (mp.game.invoke(getNative('GET_RANDOM_EVENT_FLAG'))) {
	        mp.game.invoke(getNative('SET_RANDOM_EVENT_FLAG'), false);
		}

		if (mp.game.invoke(getNative('GET_MISSION_FLAG'))) {
			mp.game.invoke(getNative('SET_MISSION_FLAG'), false);
		}


		if (pocketEnabled) {
	        mp.game.controls.disableControlAction(2, global.Inputs.NEXT_CAMERA, true);
	    }

	    if (blockcontrols) {
		    mp.game.controls.disableAllControlActions(2);
			mp.game.controls.enableControlAction(2, global.Inputs.LOOK_LR, true);
	        mp.game.controls.enableControlAction(2, global.Inputs.LOOK_UD, true);
			mp.game.controls.enableControlAction(2, global.Inputs.MOVE_LR, true);
	        mp.game.controls.enableControlAction(2, global.Inputs.MOVE_UD, true);
		    mp.game.controls.enableControlAction(2, global.Inputs.MOVE_UP_ONLY, true);
		}
		if (hasmoney) {
	        global.localplayer.setEnableHandcuffs(true);
        }
        if (isInSafeZone) {
            mp.game.controls.disableControlAction(2, 24, true);
            mp.game.controls.disableControlAction(2, 69, true);
            mp.game.controls.disableControlAction(2, 70, true);
            mp.game.controls.disableControlAction(2, 92, true);
            mp.game.controls.disableControlAction(2, 114, true);
            mp.game.controls.disableControlAction(2, 121, true);
            mp.game.controls.disableControlAction(2, 140, true);
            mp.game.controls.disableControlAction(2, 141, true);
            mp.game.controls.disableControlAction(2, 142, true);
            mp.game.controls.disableControlAction(2, 257, true);
            mp.game.controls.disableControlAction(2, 263, true);
            mp.game.controls.disableControlAction(2, 264, true);
            mp.game.controls.disableControlAction(2, 331, true);
        }
		if (mp.keys.isDown(32) && cuffed && new Date().getTime() - lastCuffUpdate >= 3000) {
			mp.events.callRemote("cuffUpdate");
	        lastCuffUpdate = new Date().getTime();
		}

		if (!global.localplayer.isInAnyVehicle(false) && !global.localplayer.isDead()) {
	        if (!global.circleOpen)
		        entity = getLookingAtEntity();
	        getNearestObjects();
		    if (entity != null && entity.getVariable('INVISIBLE') == true) entity = null;
		}
        else {
            getNearestObjects();
            if (entity != nearestObject) entity = null;
		}

	    if (nearestObject != null && (entity == null || entity.type != "object")) {
		    mp.game.graphics.drawText("F2", [nearestObject.position.x, nearestObject.position.y, nearestObject.position.z], {
			    font: 0,
	            color: [255, 255, 255, 185],
		        scale: [0.4, 0.4],
			    outline: true
			});
		}
        if (entity != null && !global.localplayer.isInAnyVehicle(false)) {
			if(truckorderveh == null || entity != truckorderveh) {
				mp.game.graphics.drawText("G", [entity.position.x, entity.position.y, entity.position.z], {
					font: 0,
					color: [255, 255, 255, 185],
					scale: [0.4, 0.4],
					outline: true
				});
			} else if(entity == truckorderveh) {
				mp.game.graphics.drawText("Ваш Заказ", [entity.position.x, entity.position.y, entity.position.z], {
					font: 1,
					color: [255, 255, 255, 255],
					scale: [1.2, 1.2],
					outline: true
				});
			}
		}
	} catch (e) {
        mp.game.graphics.notify('RE:' + e.toString());
    }
});