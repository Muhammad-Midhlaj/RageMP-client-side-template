
const Use3d = true;
const UseAutoVolume = false;
const MaxRange = 10.0;

const enableMicrophone = () => {
    if (
        global.chatActive || 
        global.localplayer.getVariable('vmuted') ||
        !global.loggedin || 
        !mp.voiceChat.muted
    ) return;
    
    mp.voiceChat.muted = false;
    mp.gui.emmit(`window.hud.updateComponent("microphone", 1)`);
    global.localplayer.playFacialAnim("mic_chatter", "mp_facial");
}

const disableMicrophone = () => {
    if (
        !global.loggedin || 
        mp.voiceChat.muted
    ) return;
         
    mp.voiceChat.muted = true;
    mp.gui.emmit(`window.hud.updateComponent("microphone", 0)`);
    global.localplayer.playFacialAnim("mood_normal_1", "facials@gen_male@variations@normal");
}

mp.keys.bind(global.Keys.VK_N, true, enableMicrophone);
mp.keys.bind(global.Keys.VK_N, false, disableMicrophone);

let g_voiceMgr =
    {
        listeners: [],

        add: function (player, notify) {
            if (this.listeners.indexOf(player) === -1) {
				if (notify) mp.events.callRemote("add_voice_listener", player);
				this.listeners.push(player);
				player.voice3d = true;
				player.voiceVolume = 0.0;
				player.isListening = true;
			}
        },

        remove: function (player, notify) {
            let idx = this.listeners.indexOf(player);
            if (idx !== -1) {
				if (notify) mp.events.callRemote("remove_voice_listener", player);
				this.listeners.splice(idx, 1);
				player.isListening = false;
			}
        }
    };

mp.events.add("playerQuit", (player) => {
    if (player.isListening) g_voiceMgr.remove(player, false);
});

var PHONE = {
    target: null,
    status: false
};

mp.events.add('voice.mute', () => {
    disableMicrophone();
})
mp.events.add('voice.phoneCall', (target) => {
    if (!PHONE.target) {
        PHONE.target = target;
        PHONE.status = true;
        mp.events.callRemote("add_voice_listener", target);
        target.voiceVolume = 1.0;
        target.voice3d = false;
        g_voiceMgr.remove(target, false);
    }
});
mp.events.add("voice.phoneStop", () => {
    if (PHONE.target) {
        if (mp.players.exists(PHONE.target)) {
            let localPos = global.localplayer.position;
            const playerPos = PHONE.target.position;
            let dist = mp.game.system.vdist(playerPos.x, playerPos.y, playerPos.z, localPos.x, localPos.y, localPos.z);
            if (dist > MaxRange) mp.events.callRemote("remove_voice_listener", PHONE.target);
            else g_voiceMgr.add(PHONE.target, false);
        } else mp.events.callRemote("remove_voice_listener", PHONE.target);
        PHONE.target = null;
        PHONE.status = false;
    }
});

mp.events.add('v_reload', () => {
	try {
		mp.voiceChat.cleanupAndReload(true, true, true);
	} catch(e) { }
});

mp.events.add('v_reload2', () => {
	try {
		mp.voiceChat.cleanupAndReload(false, false, true);
	} catch(e) { }
});

mp.events.add('v_reload3', () => {
	try {
		mp.voiceChat.cleanupAndReload(true, false, false);
	} catch(e) { }
});

mp.events.add('playerStartTalking', (player) => {
    if (PHONE.target != player) player.voice3d = true;
	player.playFacialAnim("mic_chatter", "mp_facial");
    
});

mp.events.add('playerStopTalking', (player) => {
	player.playFacialAnim("mood_normal_1", "facials@gen_male@variations@normal");
});
var localPos = global.localplayer.position;
var playerPos = global.localplayer.position;

const voiceUpdate = () => {

    localPos = global.localplayer.position;

    mp.players.forEachInStreamRange(player => {
        if (player != global.localplayer) {
            if (!player.isListening && (!PHONE.target || PHONE.target != player)) {
                playerPos = player.position;
                if (mp.game.system.vdist(playerPos.x, playerPos.y, playerPos.z, localPos.x, localPos.y, localPos.z) <= MaxRange) g_voiceMgr.add(player, true);
            }
        }
    });
}

const voiceVolumeUpdate = () => {

    g_voiceMgr.listeners.forEach((player) => {

        if (player.handle !== 0) {

            playerPos = player.position;
            let dist = mp.game.system.vdist(playerPos.x, playerPos.y, playerPos.z, localPos.x, localPos.y, localPos.z);

            if (dist > MaxRange) g_voiceMgr.remove(player, true);
            else if (!UseAutoVolume) player.voiceVolume = 1 - (dist / MaxRange);
        }
        else g_voiceMgr.remove(player, true);
    });
}

setInterval(voiceUpdate, 350);
setInterval(voiceVolumeUpdate, 50);