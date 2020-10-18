global.debounceEvent = (ms, triggerCouns, fn) => {
    let g_swapDate = Date.now();
    let g_triggersCount = 0;

    return (...args) => {
        if (++g_triggersCount > triggerCouns) {
            let currentDate = Date.now();

            if ((currentDate - g_swapDate) > ms) {
                g_swapDate = currentDate;
                g_triggersCount = 0;
            } else {
                return true; // cancel event trigger
            }
        }

        fn(...args);
    };
};

/* Events error handling */
const eventsMap = new Map();
const eventsAdd = Symbol('eventsAdd');
const rendersTicks = new Map();
let renderId = -1;
let isRenderDebugActive = false;
global.isGodModeActive = false;

mp.events[eventsAdd] = mp.events.add;
const __eventAdd__ = (eventName, eventFunction, name) => {
    if (
        eventName === 'render' &&
        (
            typeof name !== 'string' ||
            !name.length
        )
    ) {
        renderId++;
        name = renderId;
    }

    const proxyEventFunction = new Proxy(eventFunction, {
        apply: (target, thisArg, argumentsList) => {
            try {
                const start = Date.now();

                target.apply(thisArg, argumentsList);

                if (eventName === 'render') {
                    rendersTicks.set(name, Date.now() - start);
                }
            } catch(e) {
                mp.game.graphics.notify(`${eventName}:error:1`);
            }
        }
    });

    eventsMap.set(eventFunction, proxyEventFunction);

    mp.events[eventsAdd](eventName, proxyEventFunction);
};

mp.events.add = (eventNameOrObject, ...args) => {
    if (typeof eventNameOrObject === 'object') {
        mp.events[eventsAdd](eventNameOrObject);

        return;
    }

    __eventAdd__(eventNameOrObject, ...args);
};

mp.events.add('render', () => {
    if (!isRenderDebugActive) {
        return;
    }

    const rendersTicksValues = [...rendersTicks.entries()];

    for (let i = 0; i < rendersTicksValues.length; i++) {
        mp.game.graphics.drawText(`${rendersTicksValues[i][0]} - ${rendersTicksValues[i][1]}ms`,
            [0.5, 0.1 + (i * 0.03)],
            {
                scale: [0.3, 0.3],
                outline: true,
                color: [255, 255, 255, 255],
                font: 4
            }
        );
    }

}, 'index-render');

mp.events.add('debug.render', () => {
    isRenderDebugActive = !isRenderDebugActive;
});

mp.events.add('admin.toggleGodMode', () => {
    global.isGodModeActive = !global.isGodModeActive;

    mp.players.local.setInvincible(global.isGodModeActive);

    mp.events.call('notify', 4, 9, `GM - ${global.isGodModeActive ? 'включен' : 'выключен'}`, 3000);
});

global.chatActive = false;
global.loggedin = false;
global.localplayer = mp.players.local;

mp.gui.execute("window.location = 'package://cef/hud.html'");
if (mp.storage.data.chatcfg == undefined) {
    mp.storage.data.chatcfg = {
		timestamp: 0,
		chatsize: 0,
		fontstep: 0,
		alpha: 1
	};
    mp.storage.flush();
}

setTimeout(function () { 
    mp.gui.execute(`newcfg(0,${mp.storage.data.chatcfg.timestamp}); newcfg(1,${mp.storage.data.chatcfg.chatsize}); newcfg(2,${mp.storage.data.chatcfg.fontstep}); newcfg(3,${mp.storage.data.chatcfg.alpha});`);
	mp.events.call('showHUD', false); 
}, 1000);

setInterval(function () {
    var name = (localplayer.getVariable('REMOTE_ID') == undefined) ? `Не авторизован` : `Игрок №${localplayer.getVariable("REMOTE_ID")}`;
	//mp.discord.update('ReplayRP-1.1 RolePlay', name);
}, 10000);

var pedsaying = null;
var pedtext = "";
var pedtext2 = null;
var pedtimer = false;

var friends = {};
var personalLabels = [];

var pressedraw = false;
var accessRoding = false;
var pentloaded = false;
var emsloaded = false;
var showCords = false;

const walkstyles = [null,"move_m@brave","move_m@confident","move_m@drunk@verydrunk","move_m@shadyped@a","move_m@sad@a","move_f@sexy@a","move_ped_crouched"];
const moods = [null,"mood_aiming_1", "mood_angry_1", "mood_drunk_1", "mood_happy_1", "mood_injured_1", "mood_stressed_1"];
mp.game.streaming.requestClipSet("move_m@brave");
mp.game.streaming.requestClipSet("move_m@confident");
mp.game.streaming.requestClipSet("move_m@drunk@verydrunk");
mp.game.streaming.requestClipSet("move_m@shadyped@a");
mp.game.streaming.requestClipSet("move_m@sad@a");
mp.game.streaming.requestClipSet("move_f@sexy@a");
mp.game.streaming.requestClipSet("move_ped_crouched");
var admingm = false;

mp.game.object.doorControl(mp.game.joaat("prop_ld_bankdoors_02"), 232.6054, 214.1584, 106.4049, false, 0.0, 0.0, 0.0);
mp.game.object.doorControl(mp.game.joaat("prop_ld_bankdoors_02"), 231.5075, 216.5148, 106.4049, false, 0.0, 0.0, 0.0);
mp.game.audio.setAudioFlag("DisableFlightMusic", true);

global.NativeUI = require("./nativeui.js");
global.Menu = NativeUI.Menu;
global.UIMenuItem = NativeUI.UIMenuItem;
global.UIMenuListItem = NativeUI.UIMenuListItem;
global.UIMenuCheckboxItem = NativeUI.UIMenuCheckboxItem;
global.UIMenuSliderItem = NativeUI.UIMenuSliderItem;
global.BadgeStyle = NativeUI.BadgeStyle;
global.Point = NativeUI.Point;
global.ItemsCollection = NativeUI.ItemsCollection;
global.Color = NativeUI.Color;
global.ListItem = NativeUI.ListItem;

function SetWalkStyle(entity, walkstyle) {
	try {
		if (walkstyle == null) entity.resetMovementClipset(0.0);
		else entity.setMovementClipset(walkstyle, 0.0);
	} catch (e) { }
}

function SetMood(entity, mood) {
	try {
		if (mood == null) entity.clearFacialIdleAnimOverride();
		else mp.game.invoke('0xFFC24B988B938B38', entity.handle, mood, 0);
	} catch (e) { }
}

mp.events.add('chatconfig', function (a, b) {
	if(a == 0) mp.storage.data.chatcfg.timestamp = b;
    else if(a == 1) mp.storage.data.chatcfg.chatsize = b;
	else if(a == 2) mp.storage.data.chatcfg.fontstep = b;
	else mp.storage.data.chatcfg.alpha = b;
	mp.storage.flush();
});

mp.events.add('setFriendList', function (friendlist) {
	friends = {};
	friendlist.forEach(friend => {
		friends[friend] = true;
    });
});

mp.events.add('newFriend', function (friend) {
	friends[friend] = true;
});

mp.events.add('setClientRotation', function (player, rots) {
	if (player !== undefined && player != null && localplayer != player) player.setRotation(0, 0, rots, 2, true);
});

mp.events.add('setWorldLights', function (toggle) {
	try {
		mp.game.graphics.resetLightsState();
		for (let i = 0; i <= 16; i++) {
			if(i != 6 && i != 7) mp.game.graphics.setLightsState(i, toggle);
		}
	} catch { }
});

mp.events.add('setDoorLocked', function (model, x, y, z, locked, angle) {
    mp.game.object.doorControl(model, x, y, z, locked, 0, 0, angle);
});
mp.events.add('changeChatState', function (state) {
    chatActive = state;
});

mp.events.add('PressE', function (toggle) {
    pressedraw = toggle;
});

mp.events.add('allowRoding', function (toggle) {
    accessRoding = toggle;
});

mp.events.add('UpdateMoney', function (temp, amount) {
  mp.events.call('UpdateMoneyHud', temp, amount);
  mp.events.call('UpdateMoneyPhone', temp, amount);
});

mp.events.add('UpdateBank', function (temp, amount) {
  mp.events.call('UpdateBankHud', temp, amount);
  mp.events.call('UpdateBankPhone', temp, amount);
});

// // // // // // //
require('./client/utils/keys.js');
require('./menus.js');
require('./lscustoms.js');
require('./client/player/afksystem.js');
require('./character.js');
require('./render.js');
require('./main.js');
require('./voice.js');

require('./phone.js');
require('./checkpoints.js');
require('./board.js');
//require('./inventory.js');
require('./hud.js');
require('./gamertag.js');
require('./furniture.js');
require('./admesp.js');
require('./circle.js');
require('./vehiclesync.js');
require("./spmenu.js");
require('./basicsync.js');
require('./gangzones.js');
require('./fly.js');
require('./environment.js');
require('./elections.js');
require('./radiosync.js');
require('./animals.js');
require('./client/utils/utils.js');
require('./scripts/crouch.js');
require('./scripts/location.js');
require('./scripts/markers.js');
require('./scripts/fingerPointer.js');
require('./scripts/gps.js');
require('./scripts/Hunting.js');
require('./scripts/publicGarage/index.js');
require('./scripts/SmoothThrottle/SmoothThrottle.js');


require('./configs/tattoo.js');
require('./configs/barber.js');
require('./configs/clothes.js');
require('./configs/natives.js');
require('./configs/tuning.js');

// // // // // // //

if (mp.storage.data.friends == undefined) {
    mp.storage.data.friends = {};
    mp.storage.flush();
}

// LOAD ALL DEFAULT IPL'S
//mp.game.streaming.requestIpl("Coroner_Int_On");
//mp.game.streaming.requestIpl('hei_vw_dlc_casino_door_replay');
mp.game.streaming.requestIpl('vw_prop_vw_casino_door_r_02a');
mp.game.streaming.requestIpl('vw_casino_garage');
mp.game.streaming.requestIpl('vw_casino_carpark');
mp.game.streaming.requestIpl('vw_casino_penthouse');
mp.game.streaming.requestIpl('vw_casino_door');
mp.game.streaming.requestIpl('prop_casino_door_01');
mp.game.streaming.requestIpl('hei_dlc_windows_casino');
mp.game.streaming.requestIpl('hei_dlc_casino_aircon');
mp.game.streaming.requestIpl('hei_dlc_casino_door');
mp.game.streaming.requestIpl("bh1_47_joshhse_unburnt");
mp.game.streaming.requestIpl("bh1_47_joshhse_unburnt_lod");
mp.game.streaming.requestIpl("CanyonRvrShallow");
mp.game.streaming.requestIpl("ch1_02_open");
mp.game.streaming.requestIpl("Carwash_with_spinners");
mp.game.streaming.requestIpl("sp1_10_real_interior");
mp.game.streaming.requestIpl("sp1_10_real_interior_lod");
mp.game.streaming.requestIpl("ferris_finale_Anim");
mp.game.streaming.removeIpl("hei_bi_hw1_13_door");
mp.game.streaming.requestIpl("fiblobby");
mp.game.streaming.requestIpl("fiblobby_lod");
mp.game.streaming.requestIpl("apa_ss1_11_interior_v_rockclub_milo_");
mp.game.streaming.requestIpl("hei_sm_16_interior_v_bahama_milo_");
mp.game.streaming.requestIpl("hei_hw1_blimp_interior_v_comedy_milo_");
mp.game.streaming.requestIpl("gr_case6_bunkerclosed");
mp.game.streaming.requestIpl("vw_casino_main");
//

/*mp.events.add('emsload', () => {
	if(emsloaded == false) {
		emsloaded = true;
		mp.game.streaming.requestIpl("Coroner_Int_On");
	}
});*/

mp.events.add('pentload', () => {
	if(pentloaded == false) {
		pentloaded = true;
		// Enable Penthouse interior // Thanks & Credits to root <3
		let phIntID = mp.game.interior.getInteriorAtCoords(976.636, 70.295, 115.164);
		let phPropList = [
			"Set_Pent_Tint_Shell",
			"Set_Pent_Pattern_01",
			"Set_Pent_Spa_Bar_Open",
			"Set_Pent_Media_Bar_Open",
			"Set_Pent_Dealer",
			"Set_Pent_Arcade_Modern",
			"Set_Pent_Bar_Clutter",
			"Set_Pent_Clutter_01",
			"set_pent_bar_light_01",
			"set_pent_bar_party_0"
		];
		for (const propName of phPropList) {
			mp.game.interior.enableInteriorProp(phIntID, propName);
			mp.game.invoke("0x8D8338B92AD18ED6", phIntID, propName, 1);
		}
		mp.game.interior.refreshInterior(phIntID);
	}
});

// // // // // // //
const mSP = 30;
var prevP = mp.players.local.position;
var localWeapons = {};

function distAnalyze() {
	if(new Date().getTime() - global.lastCheck < 100) return; 
	global.lastCheck = new Date().getTime();
    let temp = mp.players.local.position;
    let dist = mp.game.gameplay.getDistanceBetweenCoords(prevP.x, prevP.y, prevP.z, temp.x, temp.y, temp.z, true);
    prevP = mp.players.local.position;
    if (mp.players.local.isInAnyVehicle(true)) return;
    if (dist > mSP) {
        mp.events.callRemote("acd", "fly");
    }
}

global.serverid = 1;

mp.events.add('ServerNum', (server) => {
   global.serverid = server;
});

global.acheat = {
    pos: () => prevP = mp.players.local.position,
    guns: () => localWeapons = playerLocal.getAllWeapons(),
    start: () => {
        setInterval(distAnalyze, 2000);
    }
}

mp.events.add('authready', () => {
    require('./auth.js');
})

mp.events.add('acpos', () => {
    global.acheat.pos();
})
// // // // // // //
var spectating = false;
var sptarget = null;

//mp.game.invoke(getNative("REMOVE_ALL_PED_WEAPONS"), localplayer.handle, false);

mp.keys.bind(Keys.VK_R, false, function () { // R key
	try {
		if (!loggedin || chatActive || new Date().getTime() - global.lastCheck < 1000 || mp.gui.cursor.visible) return;
		var current = currentWeapon();
		if (current == -1569615261 || current == 911657153) return;
		var ammo = mp.game.invoke(getNative("GET_AMMO_IN_PED_WEAPON"), localplayer.handle, current);
		if (mp.game.weapon.getWeaponClipSize(current) == ammo) return;
		mp.events.callRemote("playerReload", current, ammo);
		global.lastCheck = new Date().getTime();
	} catch { }
});

mp.keys.bind(Keys.VK_1, false, function () { // 1 key
    if (!loggedin || chatActive || new Date().getTime() - global.lastCheck < 1000 || global.menuOpened || mp.gui.cursor.visible) return;
    mp.events.callRemote('changeweap', 1);
    global.lastCheck = new Date().getTime();
});

mp.keys.bind(Keys.VK_2, false, function () { // 2 key
    if (!loggedin || chatActive || new Date().getTime() - global.lastCheck < 1000 || global.menuOpened || mp.gui.cursor.visible) return;
    mp.events.callRemote('changeweap', 2);
    global.lastCheck = new Date().getTime();
});

mp.keys.bind(Keys.VK_3, false, function () { // 3 key
    if (!loggedin || chatActive || new Date().getTime() - global.lastCheck < 1000 || global.menuOpened || mp.gui.cursor.visible) return;
    mp.events.callRemote('changeweap', 3);
    global.lastCheck = new Date().getTime();
});

var ammosweap = 0;
var givenWeapon = -1569615261;
const currentWeapon = () => mp.game.invoke(getNative("GET_SELECTED_PED_WEAPON"), localplayer.handle);
mp.events.add('wgive', (weaponHash, ammo, isReload, equipNow) => {
    weaponHash = parseInt(weaponHash);
    ammo = parseInt(ammo);
    ammo = ammo >= 9999 ? 9999 : ammo;
    givenWeapon = weaponHash;
    ammo += mp.game.invoke(getNative("GET_AMMO_IN_PED_WEAPON"), localplayer.handle, weaponHash);
    mp.game.invoke(getNative("SET_PED_AMMO"), localplayer.handle, weaponHash, 0);
	ammosweap = ammo;
    mp.gui.execute(`HUD.ammo=${ammo};`);
    // GIVE_WEAPON_TO_PED //
    mp.game.invoke(getNative("GIVE_WEAPON_TO_PED"), localplayer.handle, weaponHash, ammo, false, equipNow);

    if (isReload) {
        mp.game.invoke(getNative("MAKE_PED_RELOAD"), localplayer.handle);
    }
});
mp.events.add('takeOffWeapon', (weaponHash) => {
    try {
        weaponHash = parseInt(weaponHash);
        var ammo = mp.game.invoke(getNative("GET_AMMO_IN_PED_WEAPON"), localplayer.handle, weaponHash);
		if(ammo == ammosweap) mp.events.callRemote('playerTakeoffWeapon', weaponHash, ammo, 0);
		else mp.events.callRemote('playerTakeoffWeapon', weaponHash, ammosweap, 1);
		ammosweap = 0;
		mp.game.invoke(getNative("SET_PED_AMMO"), localplayer.handle, weaponHash, 0);
		mp.game.invoke(getNative("REMOVE_WEAPON_FROM_PED"), localplayer.handle, weaponHash);
		givenWeapon = -1569615261;
		mp.gui.execute(`HUD.ammo=0;`);
    } catch (e) { }
});
mp.events.add('serverTakeOffWeapon', (weaponHash) => {
    try {
        weaponHash = parseInt(weaponHash);
        var ammo = mp.game.invoke(getNative("GET_AMMO_IN_PED_WEAPON"), localplayer.handle, weaponHash);
		if(ammo == ammosweap) mp.events.callRemote('takeoffWeapon', weaponHash, ammo, 0);
		else mp.events.callRemote('takeoffWeapon', weaponHash, ammosweap, 1);
		ammosweap = 0;
		mp.game.invoke(getNative("SET_PED_AMMO"), localplayer.handle, weaponHash, 0);
		mp.game.invoke(getNative("REMOVE_WEAPON_FROM_PED"), localplayer.handle, weaponHash);
		givenWeapon = -1569615261;
		mp.gui.execute(`HUD.ammo=0;`);
		
    } catch (e) { }
});

var petathouse = null;
mp.events.add('petinhouse', (petName, petX, petY, petZ, petC, Dimension) => {
	if(petathouse != null) {
		petathouse.destroy();
		petathouse = null;
	}
	switch(petName) {
		case "Husky":
			petName = 1318032802;
			break;
		case "Poodle":
			petName = 1125994524;
			break;
		case "Pug":
			petName = 1832265812;
			break;
		case "Retriever":
			petName = 882848737;
			break;
		case "Rottweiler":
			petName = 2506301981;
			break;
		case "Shepherd":
			petName = 1126154828;
			break;
		case "Westy":
			petName = 2910340283;
			break;
		case "Cat":
			petName = 1462895032;
			break;
		case "Rabbit":
			petName = 3753204865;
			break;
	}
	petathouse = mp.peds.new(petName, new mp.Vector3(petX, petY, petZ), petC, Dimension);
});
var checkTimer = setInterval(function () {
    var current = currentWeapon();
    if (localplayer.isInAnyVehicle(true)) {
        var vehicle = localplayer.vehicle;
        if (vehicle == null) return;

        if (vehicle.getClass() == 15) {
            if (vehicle.getPedInSeat(-1) == localplayer.handle || vehicle.getPedInSeat(0) == localplayer.handle) return;
        }
        else {
            if (canUseInCar.indexOf(current) == -1) return;
        }
    }

    if (currentWeapon() != givenWeapon) {
		ammosweap = 0;
        mp.game.invoke(getNative("GIVE_WEAPON_TO_PED"), localplayer.handle, givenWeapon, 1, false, true);
        mp.game.invoke(getNative("SET_PED_AMMO"), localplayer.handle, givenWeapon, 0);
        localplayer.taskReloadWeapon(false);
        localplayer.taskSwapWeapon(false);
        mp.gui.execute(`HUD.ammo=0;`);
    }
}, 100);
var canUseInCar = [
    453432689,
    1593441988,
    -1716589765,
    -1076751822,
    -771403250,
    137902532,
    -598887786,
    -1045183535,
    584646201,
    911657153,
    1198879012,
    324215364,
    -619010992,
    -1121678507,
];
mp.events.add('playerWeaponShot', (targetPosition, targetEntity) => {
    var current = currentWeapon();
    var ammo = mp.game.invoke(getNative("GET_AMMO_IN_PED_WEAPON"), localplayer.handle, current);
    mp.gui.execute(`HUD.ammo=${ammo};`);
	
	if (current != -1569615261 && current != 911657153) {
		if(ammosweap > 0) ammosweap--;
		if(ammosweap == 0 && ammo != 0) {
			mp.events.callRemote('takeoffWeapon', current, 0, 1);
			ammosweap = 0;
			mp.game.invoke(getNative("SET_PED_AMMO"), localplayer.handle, current, 0);
			mp.game.invoke(getNative("REMOVE_WEAPON_FROM_PED"), localplayer.handle, current);
			givenWeapon = -1569615261;
			mp.gui.execute(`HUD.ammo=0;`);
		}
	}
	
	if (ammo <= 0) {
		ammosweap = 0;
        localplayer.taskSwapWeapon(false);
        mp.gui.execute(`HUD.ammo=0;`);
    }
});
mp.events.add('render', () => {
    try {
        mp.game.controls.disableControlAction(2, 45, true); // reload control
        //localplayer.setCanSwitchWeapon(false);

        //     weapon switch controls       //
		mp.game.controls.disableControlAction(1, 243, true); // CCPanelDisable
		
        mp.game.controls.disableControlAction(2, 12, true);
        mp.game.controls.disableControlAction(2, 13, true);
        mp.game.controls.disableControlAction(2, 14, true);
        mp.game.controls.disableControlAction(2, 15, true);
        mp.game.controls.disableControlAction(2, 16, true);
        mp.game.controls.disableControlAction(2, 17, true);

        mp.game.controls.disableControlAction(2, 37, true);
        mp.game.controls.disableControlAction(2, 99, true);
        mp.game.controls.disableControlAction(2, 100, true);

        mp.game.controls.disableControlAction(2, 157, true);
        mp.game.controls.disableControlAction(2, 158, true);
        mp.game.controls.disableControlAction(2, 159, true);
        mp.game.controls.disableControlAction(2, 160, true);
        mp.game.controls.disableControlAction(2, 161, true);
        mp.game.controls.disableControlAction(2, 162, true);
        mp.game.controls.disableControlAction(2, 163, true);
        mp.game.controls.disableControlAction(2, 164, true);
        mp.game.controls.disableControlAction(2, 165, true);

        mp.game.controls.disableControlAction(2, 261, true);
        mp.game.controls.disableControlAction(2, 262, true);
        //      weapon switch controls       //

        if (currentWeapon() != -1569615261) { // heavy attack controls
            mp.game.controls.disableControlAction(2, 140, true);
            mp.game.controls.disableControlAction(2, 141, true);
            mp.game.controls.disableControlAction(2, 143, true);
            mp.game.controls.disableControlAction(2, 263, true);
        }
    } catch (e) { }
});

mp.events.add("Player_SetMood", (player, index) => {
    try {
        if (player !== undefined) {
            if (index == 0) player.clearFacialIdleAnimOverride();
			else mp.game.invoke('0xFFC24B988B938B38', player.handle, moods[index], 0);
        }
    } catch (e) {
		mp.gui.chat.push("SetMood Debug: " + e.toString());
	}
});

mp.events.add("Player_SetWalkStyle", (player, index) => {
    try {
        if (player !== undefined) {
            if (index == 0) player.resetMovementClipset(0.0);
			else player.setMovementClipset(walkstyles[index], 0.0);
        }
    } catch (e) {
		mp.gui.chat.push("SetWalkStyle Debug: " + e.toString());
	}
});

/*mp.events.add("playerDeath", function (player, reason, killer) {
    givenWeapon = -1569615261;
});*/

mp.events.add("removeAllWeapons", function () {
    givenWeapon = -1569615261;
});

mp.events.add('svem', (pm, tm) => {
	var vehc = localplayer.vehicle;
	vehc.setEnginePowerMultiplier(pm);
	vehc.setEngineTorqueMultiplier(tm);
});

var f10rep = new Date().getTime();

mp.events.add('f10report', (report) => {
	if (!loggedin || new Date().getTime() - f10rep < 3000) return;
    f10rep = new Date().getTime();
	mp.events.callRemote('f10helpreport', report);
});

mp.events.add('dmgmodif', (multi) => {
	mp.game.ped.setAiWeaponDamageModifier(multi);
});

mp.game.ped.setAiWeaponDamageModifier(0.5);
mp.game.ped.setAiMeleeWeaponDamageModifier(0.4);

mp.game.player.setMeleeWeaponDefenseModifier(0.25);
mp.game.player.setWeaponDefenseModifier(1.3);

var resistStages = {
    0: 0.0,
    1: 0.05,
    2: 0.07,
    3: 0.1,
};
mp.events.add("setResistStage", function (stage) {
    mp.game.player.setMeleeWeaponDefenseModifier(0.25 + resistStages[stage]);
    mp.game.player.setWeaponDefenseModifier(1.3 + resistStages[stage]);
});