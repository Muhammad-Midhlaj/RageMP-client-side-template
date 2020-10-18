global.showhud = true;
var cruiseSpeed = -1;
var cruiseLastPressed = 0;
var showHint = true;
let fishingState = 0;
let fishingSuccess = 0;
let fishingBarPosition = 0;
let fishingBarMin = 0;
let fishingBarMax = 0;
let movementRight = true;
let fishingAchieveStart = 0;
let intervalFishing;
let isIntervalCreated = false;
let isInZone = false;
let isShowPrompt = false;
let isEnter = false;
let isjoinTable = false;

var hudstatus =
{
    safezone: null, // Last safezone size
    online: 0, // Last online int

    street: null,
    area: null,

    invehicle: false,
    updatespeedTimeout: 0, // Timeout for optimization speedometer
    engine: false,
	belt: false,
    doors: true,
    fuel: 0,
    health: 0
}
mp.events.add('fishingBaitTaken', () => {
	fishingBarMin = 0.277;
    fishingBarMax = 0.675;
	fishingAchieveStart = Math.random() * 0.39 + fishingBarMin;
    isEnter=true;
    fishingBarPosition = 0.476;
    fishingSuccess = 0;
    fishingState = 3;
});
mp.events.add('UpdateEat', function (temp, amount) {
    mp.gui.execute(`HUD.eat=${temp}`);
});

mp.events.add('UpdateWater', function (temp, amount) {
    mp.gui.execute(`HUD.water=${temp}`);
});
function drawFishingMinigame() {

       if(mp.game.controls.isControlPressed(0, 24) && mp.game.controls.isControlJustPressed(0, 24)) {
            switch(fishingState) {
            case 2:
                fishingState = -1;
                mp.events.callRemote('stopFishDrop');
                isEnter=false;
                break;
            case 3:
                if(fishingBarPosition > fishingAchieveStart-0.01 && fishingBarPosition < fishingAchieveStart+0.01) {
                    fishingSuccess++;
                    if(fishingSuccess == 1) {
                        fishingState = -1;
                        let heading = localplayer.getHeading() + 90;
                        let point = {
                            x: localplayer.position.x + 15*Math.cos(heading * Math.PI / 180.0),
                            y: localplayer.position.y + 15*Math.sin(heading * Math.PI / 180.0),
                            z: localplayer.position.z
                        }
                        mp.events.callRemote('giveRandomFish');
                        isEnter=false;
                    } else {

                        movementRight = true;
                        fishingBarPosition = 0.476;
                        fishingAchieveStart = Math.random() * 0.39 + fishingBarMin;
                    }
                } else {
                    fishingState = -1;
                    mp.events.callRemote('stopFishDrop');
                    isEnter=false;
                }
                break;
        }
        return;
    }

    if(fishingState == 3) {
        mp.game.graphics.drawRect(0.47, 0.2, 0.39, 0.025, 60, 60, 60, 120);
		// x y w h r g b a
        mp.game.graphics.drawRect(fishingAchieveStart, 0.2, 0.030, 0.025, 0, 255, 0, 255);
        mp.game.graphics.drawRect(fishingBarPosition, 0.19, 0.002, 0.026, 255, 255, 255, 255);
        if(movementRight) {
            fishingBarPosition += 0.001;
            if(fishingBarPosition > fishingBarMax) {
                fishingBarPosition = fishingBarMax;
                movementRight = false;
            }
        } else {
            fishingBarPosition -= 0.001;
            if(fishingBarPosition < fishingBarMin) {
                fishingBarPosition = fishingBarMin;
                movementRight = true;
            }
        }
    }
}
// HUD events
mp.events.add('notify', (type, layout, msg, time) => {
    if (global.loggedin) mp.gui.execute(`notify(${type},${layout},'${msg}',${time})`);
    else mp.events.call('authNotify', type, layout, msg, time)
});

mp.events.add('showHUD', (show) => {
    global.showhud = show;
    if (!show) mp.gui.execute(`hidehelp(${!showhud})`);
    else if (show && showHint) mp.gui.execute(`hidehelp(${!showhud})`);

    if(show) mp.gui.execute(`logotype.server=${serverid};`);
    mp.gui.execute(`hidehud(${!showhud})`);

    var screen = mp.game.graphics.getScreenActiveResolution(0,0);
    mp.gui.execute(`updateSafeZoneSize(${screen.x},${screen.y},${hudstatus.safezone})`);

    mp.game.ui.displayAreaName(showhud);
    mp.game.ui.displayRadar(showhud);
    mp.game.ui.displayHud(showhud);
    mp.gui.chat.show(showhud);
});

mp.events.add('UpdateMoney', function (temp, amount) {
    mp.gui.execute(`HUD.money=${temp}`);
});

mp.events.add('UpdateBank', function (temp, amount) {
    mp.gui.execute(`HUD.bank=${temp}`);
});

mp.events.add('setWanted', function (lvl) {
    mp.game.gameplay.setFakeWantedLevel(lvl);
});

mp.keys.bind(Keys.VK_F5, false, function () { // F5 key
    if (global.menuOpened) return;

    if (global.showhud && showHint) {
        showHint = false;
        mp.gui.execute(`hidehelp(${!showHint})`);
    }
    else if (global.showhud) {
        global.showhud = !global.showhud;
        mp.events.call('showHUD', global.showhud);
    }
    else {
        showHint = true;
        mp.gui.execute(`hidehelp(${!showHint})`);
        global.showhud = !global.showhud;
        mp.events.call('showHUD', global.showhud);
    }
});

mp.keys.bind(Keys.VK_K, false, function () { // belt system
if (!loggedin || chatActive || editing || new Date().getTime() - lastCheck < 400 || global.menuOpened) return;
if (localplayer.isInAnyVehicle(false)) {
lastCheck = new Date().getTime();

if(hudstatus.belt)
{
localplayer.setConfigFlag(32, true);
mp.events.call('notify', 4, 9, "You unbuckled your seat belt", 2000);
}
else
{
localplayer.setConfigFlag(32, false);
mp.events.call('notify', 2, 9, "Have you fastened your seat belt", 2000);
}

hudstatus.belt = !hudstatus.belt;
mp.gui.execute(`HUD.belt=${hudstatus.belt}`);

var testBelt = localplayer.getConfigFlag(32, true);
//mp.gui.chat.push(`flag32: ` + testBelt + ` hud.belt ` + hudstatus.belt);

mp.events.callRemote('beltCarPressed', testBelt);
}
});

// CRUISE CONTROL //
mp.keys.bind(Keys.VK_6, false, function () { // 5 key - cruise mode on/off
    if (!loggedin || global.chatActive || editing || global.menuOpened) return;
    if (!localplayer.isInAnyVehicle(true) || localplayer.vehicle.getPedInSeat(-1) != localplayer.handle) return;
	let vclass = localplayer.vehicle.getClass();
	if(vclass == 14 || vclass == 15 || vclass == 16) return;
	if(localplayer.vehicle.isOnAllWheels() == false) return;
    if (new Date().getTime() - cruiseLastPressed < 300) {
        mp.events.call('openInput', 'Cruise control', 'Indicate speed in km / h', 3, 'setCruise');
    } else {
        var veh = localplayer.vehicle;
        if (cruiseSpeed == -1) {
            var vspeed = veh.getSpeed();
            if (vspeed > 1) {
                veh.setMaxSpeed(vspeed);
                mp.gui.execute(`HUD.cruiseColor='#eebe00'`);
                cruiseSpeed = vspeed;
            }
        }
        else {
            cruiseSpeed = -1;
            veh.setMaxSpeed(mp.game.vehicle.getVehicleModelMaxSpeed(veh.model));
            mp.gui.execute(`HUD.cruiseColor='#ffffff'`);
        }
    }
    cruiseLastPressed = new Date().getTime();
});

mp.events.add('setCruiseSpeed', function (speed) {
    speed = parseInt(speed);
    if (speed === NaN || speed < 1) return;
    if (!localplayer.isInAnyVehicle(true) || localplayer.vehicle.getPedInSeat(-1) != localplayer.handle) return;
	let vclass = localplayer.vehicle.getClass();
	if(vclass == 14 || vclass == 15 || vclass == 16) return;
	if(localplayer.vehicle.isOnAllWheels() == false) return;
	var veh = localplayer.vehicle;
	var curSpeed = veh.getSpeed();
	if(speed < curSpeed) {
		mp.events.call('notify', 4, 9, "You cannot set the speed lower than it is at the moment, reduce the speed and try again.", 6000);
		return;
	}
    speed = speed / 3.6; // convert from kph to mps
    var maxSpeed = mp.game.vehicle.getVehicleModelMaxSpeed(veh.model);
    if (speed > maxSpeed) speed = maxSpeed;
    veh.setMaxSpeed(speed);
    mp.gui.execute(`HUD.cruiseColor='#eebe00'`);
    cruiseSpeed = speed;
});

var passports = {};
mp.events.add('newPassport', function (player, pass) {
    if (player && mp.players.exists(player))
        passports[player.name] = pass;
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
                let localPos = localplayer.position;
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
				name = (player === localplayer || localplayer.getVariable('IS_ADMIN') == true) ? `${player.name.replace("_", " ")} (${player.getVariable('REMOTE_ID')})` : `Stranger (${id})`;
			} else {
				name = (player === localplayer || localplayer.getVariable('IS_ADMIN') == true || passports[player.name] != undefined || friends[player.name] != undefined) ? `${player.name.replace("_", " ")} (${player.getVariable('REMOTE_ID')})` : `Stranger (${id})`;
			}
            msg = msg.replace("{name}", name);
        }
    });

    if (type === "chat" || type === "s")
        msg = `!{#${chatcolor}}${msg}`;

    mp.gui.chat.push(msg);
});

mp.events.add('render', (nametags) => {

    if (!global.loggedin) return;
	
	if(fishingState > 0) {
        drawFishingMinigame();
    }
    // Disable HUD components.    
    mp.game.ui.hideHudComponentThisFrame(2); // HUD_WEAPON_ICON
    mp.game.ui.hideHudComponentThisFrame(3); // HUD_CASH
    mp.game.ui.hideHudComponentThisFrame(6); // HUD_VEHICLE_NAME
    mp.game.ui.hideHudComponentThisFrame(7); // HUD_AREA_NAME
    mp.game.ui.hideHudComponentThisFrame(8); // HUD_VEHICLE_CLASS
    mp.game.ui.hideHudComponentThisFrame(9); // HUD_STREET_NAME

    mp.game.ui.hideHudComponentThisFrame(19); // HUD_WEAPON_WHEEL
    mp.game.ui.hideHudComponentThisFrame(20); // HUD_WEAPON_WHEEL_STATS
    mp.game.ui.hideHudComponentThisFrame(22); // MAX_HUD_WEAPONS

    // Update online counter in logotype.
    if (hudstatus.online != mp.players.length) {

        hudstatus.online = mp.players.length;
        mp.gui.execute(`logotype.online=${hudstatus.online}`);
    }

    // Update street & district
    var street = mp.game.pathfind.getStreetNameAtCoord(localplayer.position.x, localplayer.position.y, localplayer.position.z, 0, 0);
    let area  = mp.game.zone.getNameOfZone(localplayer.position.x, localplayer.position.y, localplayer.position.z);
    if(hudstatus.street != street || hudstatus.area != area)
    {
        hudstatus.street = street;
        hudstatus.area = area;   
        
        mp.gui.execute(`HUD.street='${mp.game.ui.getStreetNameFromHashKey(street.streetName)}'`);
        mp.gui.execute(`HUD.crossingRoad='${mp.game.ui.getLabelText(hudstatus.area)}'`);
    }
    
    // Update CEF safezone.
    var lastsafezone = mp.game.graphics.getSafeZoneSize();
    if(lastsafezone != hudstatus.safezone) {
        
        hudstatus.safezone = lastsafezone;
        var resolution = mp.game.graphics.getScreenActiveResolution(0,0);
        mp.gui.execute(`updateSafeZoneSize(${resolution.x},${resolution.y},${hudstatus.safezone})`);
    }

    
    if (localplayer.isInAnyVehicle(false)) {

		if(localplayer.vehicle.getPedInSeat(-1) == localplayer.handle) {
			if (!hudstatus.invehicle) mp.gui.execute(`HUD.inVeh=1`);
			hudstatus.invehicle = true;

			var veh = localplayer.vehicle;

			if (veh.getVariable('FUELTANK') !== undefined) {
				let fueltank = veh.getVariable('FUELTANK');
				mp.game.graphics.drawText(`Загружено: ${fueltank}/1000л`, [0.93, 0.80], {
					font: 0,
					color: [255, 255, 255, 185],
					scale: [0.4, 0.4],
					outline: true
				});
			}
			if (veh.getVariable('PETROL') !== undefined && veh.getVariable('MAXPETROL') !== undefined) {
				let petrol = veh.getVariable('PETROL');
				let maxpetrol = veh.getVariable('MAXPETROL');

				if (hudstatus.fuel != petrol && petrol >= 0) {
					mp.gui.execute(`HUD.fuel=${petrol}`);
					hudstatus.fuel = petrol;
					
					if (petrol <= (maxpetrol * 0.2)) ifuel = 0;
					else if (petrol <= (maxpetrol * 0.6)) ifuel = 1;
					else ifuel = 2;
					mp.gui.execute(`HUD.ifuel=${ifuel}`);
				}
			}

			var engine = veh.getIsEngineRunning();
			if (engine != null && engine !== hudstatus.engine) {
				if (engine == true) mp.gui.execute(`HUD.engine=1`);
				else mp.gui.execute(`HUD.engine=0`);

				hudstatus.engine = engine;
			}

            if (veh.getVariable('LOCKED') !== undefined) 
            {
                var locked = veh.getVariable('LOCKED');
                
				if (hudstatus.doors !== locked) {
					if (locked == true) mp.gui.execute(`HUD.doors=0`);
					else mp.gui.execute(`HUD.doors=1`)

					hudstatus.doors = locked;
				}
			}

			var hp = veh.getHealth() / 10;
			hp = hp.toFixed();
			if (hp !== hudstatus.health) {
				mp.gui.execute(`HUD.hp=${hp}`);
				hudstatus.health = hp;
			}

			if (new Date().getTime() - hudstatus.updatespeedTimeout > 50) {
				let speed = (veh.getSpeed() * 3.6).toFixed();
				mp.gui.execute(`HUD.updateSpeed(${speed})`);
				hudstatus.updatespeedTimeout = new Date().getTime();

				if (cruiseSpeed != -1) // kostyl'
					veh.setMaxSpeed(cruiseSpeed);
			}
		}
    } 
    else 
    {
        if (hudstatus.invehicle) mp.gui.execute(`HUD.inVeh=0`);
        hudstatus.invehicle = false;
		hudstatus.belt = false;
        mp.gui.execute(`HUD.belt=${hudstatus.belt}`);
    }
});