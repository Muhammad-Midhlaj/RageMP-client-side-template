global.showhud = true;
global.passports = {};
var cruiseSpeed = -1;
var cruiseLastPressed = 0;
var showHint = true;

var hudstatus =
{
    online: 0, // Last online int

    street: "",
    area: "",

    invehicle: false,
    engine: false,
    doors: true,
    fuel: 0,
    health: 0
}

// HUD events
mp.events.add('notify', (type, layout, msg, time) => {
    mp.gui.emmit(`window.notification.show(${type},${layout},'${msg}',${time})`);
});

mp.events.add('showHUD', (show) => {
    global.showhud = show;
    if (!show)  mp.gui.emmit(`window.hud.updateComponent("help", ${global.showhud})`);
    else if (show && showHint) mp.gui.emmit(`window.hud.updateComponent("help", ${global.showhud})`);

    mp.gui.emmit(`window.hud.updateComponent("toggle", ${global.showhud})`);

    mp.game.ui.displayAreaName(global.showhud);
    mp.game.ui.displayRadar(global.showhud);
    mp.game.ui.displayHud(global.showhud);
    mp.gui.chat.show(global.showhud);
});

mp.events.add('UpdateMoney', function (temp, amount) {
    mp.gui.emmit(`window.hud.updateComponent("money", ${temp})`);
});

mp.events.add('UpdateBank', function (temp, amount) {
    mp.gui.emmit(`window.hud.updateComponent("bankmoney", ${temp})`);
});

mp.events.add('setWanted', function (lvl) {
    mp.game.gameplay.setFakeWantedLevel(lvl);
});

mp.keys.bind(global.Keys.VK_F5, false, function () { // F5 key
    if (global.menuOpened) return;

    if (global.showhud && showHint) {
        showHint = false;
        mp.gui.emmit(`window.hud.updateComponent("help", false)`);
    }
    else if (global.showhud) {
        global.showhud = !global.showhud;
        mp.events.call('showHUD', global.showhud);
    }
    else {
        showHint = true;
        mp.gui.emmit(`window.hud.updateComponent("help", true)`);
        global.showhud = !global.showhud;
        mp.events.call('showHUD', global.showhud);
    }
});

// CRUISE CONTROL //
mp.keys.bind(global.Keys.VK_6, false, function () { // 5 key - cruise mode on/off
    if (!global.loggedin || global.chatActive || editing || global.menuOpened) return;
    if (!global.localplayer.isInAnyVehicle(true) || global.localplayer.vehicle.getPedInSeat(-1) != global.localplayer.handle) return;
	let vclass = global.localplayer.vehicle.getClass();
	if(vclass == 14 || vclass == 15 || vclass == 16) return;
	if(global.localplayer.vehicle.isOnAllWheels() == false) return;
    if (new Date().getTime() - cruiseLastPressed < 300) {
        mp.events.call('openInput', 'Круиз-контроль', 'Укажите скорость в км/ч', 3, 'setCruise');
    } else {
        var veh = global.localplayer.vehicle;
        if (cruiseSpeed == -1) {
            var vspeed = veh.getSpeed();
            if (vspeed > 1) {
                veh.setMaxSpeed(vspeed);
                cruiseSpeed = vspeed;
            }
        }
        else {
            cruiseSpeed = -1;
            veh.setMaxSpeed(mp.game.vehicle.getVehicleModelMaxSpeed(veh.model));
        }
    }
    cruiseLastPressed = new Date().getTime();
});

mp.events.add('setCruiseSpeed', function (speed) {
    speed = parseInt(speed);
    if (speed === NaN || speed < 1) return;
    if (!global.localplayer.isInAnyVehicle(true) || global.localplayer.vehicle.getPedInSeat(-1) != global.localplayer.handle) return;
	let vclass = global.localplayer.vehicle.getClass();
	if(vclass == 14 || vclass == 15 || vclass == 16) return;
	if(global.localplayer.vehicle.isOnAllWheels() == false) return;
	var veh = global.localplayer.vehicle;
	var curSpeed = veh.getSpeed();
	if(speed < curSpeed) {
		mp.events.call('notify', 4, 9, "Нельзя установить скорость меньше, чем она есть на данный момент, снизьте скорость и попробуйте еще раз.", 6000);
		return;
	}
    speed = speed / 3.6; // convert from kph to mps
    var maxSpeed = mp.game.vehicle.getVehicleModelMaxSpeed(veh.model);
    if (speed > maxSpeed) speed = maxSpeed;
    veh.setMaxSpeed(speed);
    cruiseSpeed = speed;
});

mp.events.add('newPassport', function (player, pass) {
    if (player && mp.players.exists(player))
        global.passports[player.name] = pass;
});

var showAltTabHint = false;
mp.events.add('showAltTabHint', function () {
    showAltTabHint = true;
    setTimeout(function () { showAltTabHint = false; }, 10000);
});

mp.events.add('sendRPMessage', (type, msg, players) => {

    var chatcolor = ``;

    players.forEach((id) => {
        var player = mp.players.atRemoteId(id);
        if (mp.players.exists(player)) {

            if (type === "chat" || type === "s") {
                let localPos = global.localplayer.position;
                let playerPos = player.position;
                let dist = mp.game.system.vdist(playerPos.x, playerPos.y, playerPos.z, localPos.x, localPos.y, localPos.z);
                var color = (dist < 2) ? "FFFFFF" :
                    (dist < 4) ? "F7F9F9" :
                        (dist < 6) ? "DEE0E0" :
                            (dist < 8) ? "C5C7C7" : "ACAEAE";

                chatcolor = color;
            }
			
			var name = "";
			if(player.getVariable('IS_MASK') == true) {
				name = (player === localplayer || global.localplayer.getVariable('IS_ADMIN') == true) ? `${player.name.replace("_", " ")} (${player.getVariable('REMOTE_ID')})` : `Незнакомец (${id})`;
			} else {
				name = (player === localplayer || global.localplayer.getVariable('IS_ADMIN') == true || global.passports[player.name] != undefined || global.friends[player.name] != undefined) ? `${player.name.replace("_", " ")} (${player.getVariable('REMOTE_ID')})` : `Незнакомец (${id})`;
			}
            msg = msg.replace("{name}", name);
        }
    });

    if (type === "chat" || type === "s")
        msg = `!{${chatcolor}}${msg}`;

    mp.gui.chat.push(msg);
});

var optimizationupdate = 0;

mp.events.add('render', () => {

    if (!global.loggedin) return;

    // Устанавливаем GTA интерфейсам цвет проекта
    mp.game.ui.setHudColour(143, 228,66,66,255);
    mp.game.ui.setHudColour(144, 228,66,66,255);
    mp.game.ui.setHudColour(145, 228,66,66,255);

    // Отключаем не нужные HUD компоненты 
    mp.game.ui.hideHudComponentThisFrame(2); // HUD_WEAPON_ICON
    mp.game.ui.hideHudComponentThisFrame(3); // HUD_CASH
    mp.game.ui.hideHudComponentThisFrame(6); // HUD_VEHICLE_NAME
    mp.game.ui.hideHudComponentThisFrame(7); // HUD_AREA_NAME
    mp.game.ui.hideHudComponentThisFrame(8); // HUD_VEHICLE_CLASS
    mp.game.ui.hideHudComponentThisFrame(9); // HUD_STREET_NAME

    mp.game.ui.hideHudComponentThisFrame(19); // HUD_WEAPON_WHEEL
    mp.game.ui.hideHudComponentThisFrame(20); // HUD_WEAPON_WHEEL_STATS
    mp.game.ui.hideHudComponentThisFrame(22); // MAX_HUD_WEAPONS

    var vehiclestatus = global.localplayer.isInAnyVehicle(false);
    var veh = (vehiclestatus) ? global.localplayer.vehicle : null;

    if (new Date().getTime() - optimizationupdate > 50) {
        
        optimizationupdate = new Date().getTime();

        // Обновляем онлайн в логотипе
        if (hudstatus.online != mp.players.length) {

            hudstatus.online = mp.players.length;
            mp.gui.emmit(`window.hud.updateServerInfo("online", ${hudstatus.online})`);
        }

        // Обновляем улицу и район
        var street = mp.game.pathfind.getStreetNameAtCoord(global.localplayer.position.x, global.localplayer.position.y, global.localplayer.position.z, 0, 0);
        var area  = mp.game.zone.getNameOfZone(global.localplayer.position.x, global.localplayer.position.y, global.localplayer.position.z);
        
        street = mp.game.ui.getStreetNameFromHashKey(street.streetName);
        area = mp.game.ui.getLabelText(area);
        
        if(hudstatus.street != street || hudstatus.area != area)
        {
            hudstatus.street = street;
            hudstatus.area = area;   
            
            mp.gui.emmit(`window.hud.updateComponent("street", '${street}')`);
            mp.gui.emmit(`window.hud.updateComponent("crossingroad", '${area}')`);
        }

        // Обновление худа транспорта
        if(vehiclestatus)
        {
            // Обновляем топливо
            if (veh.getVariable('PETROL') !== undefined && veh.getVariable('MAXPETROL') !== undefined) {
                let petrol = veh.getVariable('PETROL');
                //let maxpetrol = veh.getVariable('MAXPETROL');

                if (hudstatus.fuel != petrol && petrol >= 0) {
                    mp.gui.emmit(`window.hud.updateComponent("petrol", ${petrol})`);
                    hudstatus.fuel = petrol;
                }
            }

            // Обновляем статус двигателя
            var engine = veh.getIsEngineRunning();
            if (engine != null && engine !== hudstatus.engine) {
                if (engine == true) mp.gui.emmit(`window.hud.updateComponent("engine", true)`);
                else mp.gui.emmit(`window.hud.updateComponent("engine", false)`);
                hudstatus.engine = engine;
            }

            // Обновляем статус дверей
            if (veh.getVariable('LOCKED') !== undefined) 
            {
                var locked = veh.getVariable('LOCKED');
                if (hudstatus.doors !== locked)
                {
                    if (locked == true) mp.gui.emmit(`window.hud.updateComponent("doors", false)`);
                    else mp.gui.emmit(`window.hud.updateComponent("doors", true)`);
                    hudstatus.doors = locked;
                }
            }

            // Обновляем скорость
            let speed = (veh.getSpeed() * 3.6).toFixed();
            mp.gui.emmit(`window.hud.updateComponent("speed", ${speed})`, false);
            hudstatus.updatespeedTimeout = new Date().getTime();

            // Фиксим скорость круиз контроля
            if (cruiseSpeed != -1) 
            {
                veh.setMaxSpeed(cruiseSpeed);
            }
        }

        // Отключаем IDLE камеру когда курсор активен или игрок мёртв
		if(mp.gui.cursor.visible || global.deathTimerOn) {
			mp.game.invoke("0xF4F2C0D4EE209E20");
		}
    }
    
    if (vehiclestatus) 
    {
        if(veh.getPedInSeat(-1) == global.localplayer.handle) 
        {
			if (!hudstatus.invehicle) mp.gui.emmit(`window.hud.updateComponent("vehicle", true)`);
			hudstatus.invehicle = true;

			if (veh.getVariable('FUELTANK') !== undefined) {
				let fueltank = veh.getVariable('FUELTANK');
				mp.game.graphics.drawText(`Загружено: ${fueltank}/1000л`, [0.93, 0.80], {
					font: 0,
					color: [255, 255, 255, 185],
					scale: [0.4, 0.4],
					outline: true
				});
            }
		}
    } 
    else 
    {
        if (hudstatus.invehicle) mp.gui.emmit(`window.hud.updateComponent("vehicle", false)`);
        hudstatus.invehicle = false;
    }
});