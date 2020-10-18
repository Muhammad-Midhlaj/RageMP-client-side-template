var lscSpeed = 0;
var lscBrakes = 0;
var lscBoost = 0;
var lscСlutch = 0;
var lscPage = 'home';
var lscSettedMod = -1;
var lscSettedWheelType = 0;
var lscSelected = -1;
var lscRGB = { r: 0, g: 0, b: 0 };
var lscPrimary = { r: 0, g: 0, b: 0 };
var lscSecondary = { r: 0, g: 0, b: 0 };
var lscNeon = { r: 0, g: 0, b: 0 };
var opened = false;
var priceMod = 1;
var isBike = false;
var modelPriceMod = 1;
var carName = "";

var categoryIds = {
    "PAGE_MUFFLER": 0,
    "PAGE_SIDESKIRT": 1,
    "PAGE_HOOD": 2,
    "PAGE_SPOILER": 3,
    "PAGE_LATTICE": 4,
    "PAGE_WINGS": 5,
    "PAGE_ROOF": 6,
    "PAGE_FLAME": 7,
    "bamper_menu_front": 8,
    "bamper_menu_back": 9,
    "engine_menu": 10,
    "turbo_menu": 11,
    "horn_menu": 12,
    "transmission_menu": 13,
    "glasses_menu": 14,
    "suspention_menu": 15,
    "brakes_menu": 16,
    "lights_menu": 17,
    "numbers_menu": 18,
    "wheels_menu": 19,
    "paint_menu": 20,
};

// Switch global page //
mp.events.add('tpage', (id) => {
    global.afkSecondsCount = 0;

    if (id == "PAGE_HOME") {
        setTimeout(function () { mp.gui.emmit(`disable(${JSON.stringify(toDisable)});`); }, 150);
        global.localplayer.vehicle.setHeading(148.9986);

        var camFrom = tunCam;
        tunCam = mp.cameras.new('default', new mp.Vector3(-333.7966, -137.409, 40.58963), new mp.Vector3(0, 0, 0), 60);
        tunCam.pointAtCoord(-338.7966, -137.409, 37.88963);
        tunCam.setActiveWithInterp(camFrom.handle, 500, 1, 1);

        if (lscPage == "numbers_menu") {
            global.localplayer.vehicle.setNumberPlateTextIndex(lscSettedMod);
        }
        else if (lscPage == "glasses_menu") {
            global.localplayer.vehicle.setWindowTint(lscSettedMod);
        }
        else if (lscPage != "paint_menu") {
            if (lscPage == "turbo_menu")
                global.localplayer.vehicle.toggleMod(18, false);
            else if (lscPage == "lights_menu") {
                mp.game.invoke('0xE41033B25D003A07', global.localplayer.vehicle.handle, 0);
                global.localplayer.vehicle.setLights(false);
            } else if (lscPage == "wheels_menu")
                global.localplayer.vehicle.setWheelType(lscSettedWheelType);

            if (categoryModsIds[lscPage] == undefined) return;
            global.localplayer.vehicle.setMod(categoryModsIds[lscPage], lscSettedMod);
        }
    }
    else if (categoryIds[id] != undefined) {
        var camFrom = tunCam;
        tunCam = mp.cameras.new('default', categoryPositions[categoryIds[id]].CamPosition, new mp.Vector3(0, 0, 0), 60);
        tunCam.pointAtCoord(-338.7966, -137.409, 37.88963);
        tunCam.setActiveWithInterp(camFrom.handle, 500, 1, 1);

        global.localplayer.vehicle.setHeading(categoryPositions[categoryIds[id]].CarHeading);

        if (id == "numbers_menu") {
            lscSettedMod = global.localplayer.vehicle.getNumberPlateTextIndex();
        }
        else if (id == "glasses_menu") {
            lscSettedMod = global.localplayer.vehicle.getWindowTint();
        }
        else if (id == "paint_menu") {
            if (lscPage != "home") {
                mp.events.call("hideColorp");
                global.localplayer.vehicle.setCustomPrimaryColour(lscPrimary.r, lscPrimary.g, lscPrimary.b);
                global.localplayer.vehicle.setCustomSecondaryColour(lscSecondary.r, lscSecondary.g, lscSecondary.b);
                global.localplayer.vehicle.setNeonLightsColour(lscNeon.r, lscNeon.g, lscNeon.b);
            }
            else {
                lscPrimary = global.localplayer.vehicle.getCustomPrimaryColour(1, 1, 1);
                lscSecondary = global.localplayer.vehicle.getCustomSecondaryColour(1, 1, 1);
                lscNeon = global.localplayer.vehicle.getNeonLightsColour(1, 1, 1);
            }
        }
        else {
            if (lscPage == "home") {
                if (id == "lights_menu") {
                    global.localplayer.vehicle.setLights(true);
                    if(id >= 0) mp.game.invoke('0xE41033B25D003A07', global.localplayer.vehicle.handle, lscSettedMod);
                } else if (id == "wheels_menu")
                    lscSettedWheelType = global.localplayer.vehicle.getWheelType();
                lscSettedMod = global.localplayer.vehicle.getMod(categoryModsIds[id]);
            }
        }

        if (categoryIds[id] <= 9) {
            var elements = [];
            if(tuningConf[carName][categoryIds[id]] != undefined) {
                global.tuningConf[carName][categoryIds[id]].forEach(element => {
                    var price = element.Item3 * priceMod;
                    elements.push([`${element.Item1}`, element.Item2, price.toFixed()]);
                });
                setTimeout(function () { mp.gui.emmit(`add(${JSON.stringify(elements)})`); }, 150);
            } else mp.events.call('notify', 1, 4, "Этот раздел недоступен для данного авто.", 3000);
        }
        else if (categoryIds[id] <= 18) {
            var prices = [];
            for (var key in global.tuningStandart[categoryIds[id]]) {
                var price = global.tuningStandart[categoryIds[id]][key] * modelPriceMod * priceMod;
                prices.push([`${key}`, price.toFixed()]);
            }
            setTimeout(function () { mp.gui.emmit(`price(${JSON.stringify(prices)})`); }, 150);
        }
    }
    else if (wheelsTypes[id] != undefined) {
        global.localplayer.vehicle.setWheelType(wheelsTypes[id]);
        var prices = [];
        for (var key in global.tuningWheels[wheelsTypes[id]]) {
            var price = global.tuningWheels[wheelsTypes[id]][key] * priceMod;
            prices.push([`${key}`, price.toFixed()]);
        }
        setTimeout(function () { mp.gui.emmit(`price(${JSON.stringify(prices)})`); }, 150);
    }
    else if (id == "paint_menu_one" || id == "paint_menu_two") {
        var price = 5000 * priceMod;
        var prices = ["buy", price.toFixed()];
        setTimeout(function () { mp.gui.emmit(`price(${JSON.stringify(prices)})`); }, 150);
        mp.events.call("showColorp");
    }
    else if (id == "paint_menu_three") {
        var price = 250000 * priceMod;
        var prices = ["buy", price.toFixed()];
        setTimeout(function () { mp.gui.emmit(`price(${JSON.stringify(prices)})`); }, 150);
        if(!isBike) mp.events.call("showColorp");
    }
    if (toDisable.includes(id))
    {
        mp.events.call('tpage', "home");
        mp.events.call('notify', 1, 4, "Этот раздел недоступен для Вашего транспорта.", 3000);
    }
    
    setTimeout(function () { mp.events.call('tupd'); }, 150);
    lscPage = id;
});

mp.events.add('hideTun', () => {
    mp.gui.emmit('window.pages.updateDynamicPage("")');
});

mp.events.add('exitTun', () => {
    mp.gui.emmit('window.pages.updateDynamicPage("")');
    global.menuClose();
    tunCam.destroy();
    mp.game.cam.renderScriptCams(false, false, 500, true, false);
    mp.events.callRemote('exitTuning');
    opened = false;
});

// Forced update //
mp.events.add('tupd', () => {
    lscSpeed = (mp.game.vehicle.getVehicleModelMaxSpeed(global.localplayer.vehicle.model) / 1.2).toFixed();
    lscBrakes = global.localplayer.vehicle.getMaxBraking() * 100;
    lscBoost = global.localplayer.vehicle.getAcceleration() * 100;
    lscСlutch = global.localplayer.vehicle.getMaxTraction() * 10;
    mp.gui.emmit(`window.tuning_lsc.setVehicleStats(${lscSpeed},${lscBrakes},${lscBoost},${lscСlutch})`);
})
// Click on element //
mp.events.add('tclk', (id) => {
    global.afkSecondsCount = 0;
    if (id == undefined) return;

    id = parseInt(id);
    var setted = false;
    switch (lscPage) {
        case "muffler_menu":
            if (vehicleComponents.Muffler == id) setted = true;
            break;
        case "sideskirt_menu":
            if (vehicleComponents.SideSkirt == id) setted = true;
            break;
        case "hood_menu":
            if (vehicleComponents.Hood == id) setted = true;
            break;
        case "spoiler_menu":
            if (vehicleComponents.Spoiler == id) setted = true;
            break;
        case "lattice_menu":
            if (vehicleComponents.Lattice == id) setted = true;
            break;
        case "wings_menu":
            if (vehicleComponents.Wings == id) setted = true;
            break;
        case "roof_menu":
            if (vehicleComponents.Roof == id) setted = true;
            break;
        case "flame_menu":
            if (vehicleComponents.Vinyls == id) setted = true;
            break;
        case "bamper_menu_front":
            if (vehicleComponents.FrontBumper == id) setted = true;
            break;
        case "bamper_menu_back":
            if (vehicleComponents.RearBumper == id) setted = true;
            break;
        case "engine_menu":
            if (vehicleComponents.Engine == id) setted = true;
            break;
        case "turbo_menu":
            if (vehicleComponents.Turbo == id) setted = true;
            break;
        case "horn_menu":
            if (vehicleComponents.Horn == id) setted = true;
            break;
        case "transmission_menu":
            if (vehicleComponents.Transmission == id) setted = true;
            break;
        case "glasses_menu":
            if (vehicleComponents.WindowTint == id) setted = true;
            break;
        case "suspention_menu":
            if (vehicleComponents.Suspension == id) setted = true;
            break;
        case "brakes_menu":
            if (vehicleComponents.Brakes == id) setted = true;
            break;
        case "lights_menu":
            if (vehicleComponents.Headlights == id) setted = true;
            break;
        case "numbers_menu":
            if (vehicleComponents.NumberPlate == id) setted = true;
            break;
        case "wheels_exclusive":
        case "wheels_lowrider":
        case "wheels_musclecar":
        case "wheels_4x4":
        case "wheels_sport":
        case "wheels_4x4_2":
        case "wheels_tuner":
            if (vehicleComponents.WheelsType == wheelsTypes[lscPage] && vehicleComponents.Wheels == id) setted = true;
            break;
    }

    if (setted)
        mp.events.call('notify', 1, 9, "У Вас уже установлена данная модификация", 3000);
    else {
        mp.gui.emmit('window.pages.updateDynamicPage("")');
        opened = false;
        lscSelected = id;

        if (lscPage === "paint_menu_one" || lscPage === "paint_menu_two" || lscPage === "paint_menu_three")
            mp.events.call("hideColorp");

        var title = (lscPage === "paint_menu_one" || lscPage === "paint_menu_two" || lscPage === "paint_menu_three") ? "Вы действительно хотите покрасить машину в данный цвет?" : "Вы действительно хотите установить данную модификацию?";
        mp.events.call('openDialog', 'tuningbuy', title);
    }
})
// Hover on element //
mp.events.add('thov', (id) => {
    global.afkSecondsCount = 0;
    if (lscPage === "wheels_menu") return;

    if (lscPage == "numbers_menu") {
        global.localplayer.vehicle.setNumberPlateTextIndex(parseInt(id));
    }
    else if (lscPage == "glasses_menu") {
        global.localplayer.vehicle.setWindowTint(parseInt(id));
    }
    else if (lscPage == "horn_menu") {
        global.localplayer.vehicle.startHorn(1000, hornNames[id], false);
    }
	else if (lscPage == "lights_menu") {
		global.localplayer.vehicle.setLights(true);
		if(id >= 0) {
			global.localplayer.vehicle.setMod(22, 0);
			mp.game.invoke('0xE41033B25D003A07', global.localplayer.vehicle.handle, parseInt(id));
		} else global.localplayer.vehicle.setMod(22, -1);
	}
    else {
        if (categoryModsIds[lscPage] != undefined) {
            if (lscPage == "turbo_menu")
                global.localplayer.vehicle.toggleMod(18, true);
            global.localplayer.vehicle.setMod(categoryModsIds[lscPage], parseInt(id));
            mp.events.call('tupd');
        }
        else if (wheelsTypes[lscPage] != undefined) {
            global.localplayer.vehicle.setMod(23, parseInt(id));
        }
    }
})
// Buy element //
mp.events.add('tunbuy', (state) => {
    global.afkSecondsCount = 0;
    if (state) {
        if (wheelsTypes[lscPage] != undefined)
            mp.events.callRemote('buyTuning', 19, lscSelected, wheelsTypes[lscPage]);
        else if (lscPage === "paint_menu_one" || lscPage === "paint_menu_two" || lscPage === "paint_menu_three") {
            var paintType;
			if(lscPage === "paint_menu_one") paintType = 0;
			else if(lscPage === "paint_menu_two") paintType = 1;
			else if(lscPage === "paint_menu_three") paintType = 2;
			if(paintType == 2 && isBike) {
				mp.events.call('notify', 1, 4, "Этот раздел недоступен для мотоциклов.", 3000);
                mp.gui.emmit('window.pages.updateDynamicPage("tuning_lsc")');
				opened = true;
			}
            else mp.events.callRemote('buyTuning', 20, paintType, lscRGB.r, lscRGB.g, lscRGB.b);
        }
        else
            mp.events.callRemote('buyTuning', categoryIds[lscPage], lscSelected, -1);
    }
    else {
        mp.gui.emmit('window.pages.updateDynamicPage("tuning_lsc")');
        opened = true;
        if (lscPage == "numbers_menu") {
            global.localplayer.vehicle.setNumberPlateTextIndex(lscSettedMod);
        }
        else if (lscPage == "glasses_menu") {
            global.localplayer.vehicle.setWindowTint(lscSettedMod);
        }
        else if (lscPage == "paint_menu_one") {
            global.localplayer.vehicle.setCustomPrimaryColour(lscPrimary.r, lscPrimary.g, lscPrimary.b);
        }
        else if (lscPage == "paint_menu_two") {
            global.localplayer.vehicle.setCustomSecondaryColour(lscSecondary.r, lscSecondary.g, lscSecondary.b);
        }
		else if (lscPage == "paint_menu_three") {
            global.localplayer.vehicle.setNeonLightsColour(lscNeon.r, lscNeon.g, lscNeon.b);
        }
        else {
            if (lscPage == "turbo_menu")
                global.localplayer.vehicle.toggleMod(18, false);

            if (categoryModsIds[lscPage] == undefined) return;
            global.localplayer.vehicle.setMod(categoryModsIds[lscPage], lscSettedMod);
        }
    }
})
mp.events.add('tunBuySuccess', (id) => {
    global.afkSecondsCount = 0;
    mp.gui.emmit('window.pages.updateDynamicPage("tuning_lsc")');
    opened = true;
    if (id != -2) {

        lscSettedMod = id;
        if (wheelsTypes[lscPage] != undefined)
            lscSettedWheelType = global.localplayer.vehicle.getWheelType();
        else if (lscPage == "paint_menu_one") {
            mp.events.call("showColorp");
            lscPrimary = global.localplayer.vehicle.getCustomPrimaryColour(1, 1, 1);
        } else if (lscPage == "paint_menu_two") {
            mp.events.call("showColorp");
            lscSecondary = global.localplayer.vehicle.getCustomSecondaryColour(1, 1, 1);
        } else if (lscPage == "paint_menu_three") {
            mp.events.call("showColorp");
            lscNeon = global.localplayer.vehicle.getNeonLightsColour(1, 1, 1);
        } 
    }
})
mp.events.add('tunColor', function (c) {
    if (!opened) return;
    global.afkSecondsCount = 0;
    if (lscPage == "paint_menu_one") {
        global.localplayer.vehicle.setCustomPrimaryColour(c.r, c.g, c.b);
        lscRGB = { r: c.r, g: c.g, b: c.b };
    }
    else if(lscPage == "paint_menu_two") {
        global.localplayer.vehicle.setCustomSecondaryColour(c.r, c.g, c.b);
        lscRGB = { r: c.r, g: c.g, b: c.b };
    }
	else if(lscPage == "paint_menu_three") {
        global.localplayer.vehicle.setNeonLightsColour(c.r, c.g, c.b);
        lscRGB = { r: c.r, g: c.g, b: c.b };
    }
});
var tunCam = null;
var categoryPositions = [
    { 'CarHeading': 85.0, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 38.88963) },
    { 'CarHeading': 148.9986, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 39.28963) },
    { 'CarHeading': 265.0, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 40.58963) },
    { 'CarHeading': 85.0, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 39.28963) },
    { 'CarHeading': 265.0, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 38.88963) },
    { 'CarHeading': 148.9986, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 39.28963) },
    { 'CarHeading': 148.9986, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 40.08963) },
    { 'CarHeading': 160.9986, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 42.08963) },
    { 'CarHeading': 265.0, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 38.88963) },
    { 'CarHeading': 85.0, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 38.88963) },
    { 'CarHeading': 265.0, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 40.58963) },
    { 'CarHeading': 265.0, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 40.58963) },
    { 'CarHeading': 148.9986, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 40.58963) },
    { 'CarHeading': 265.0, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 40.58963) },
    { 'CarHeading': 148.9986, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 39.28963) },
    { 'CarHeading': 148.9986, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 39.28963) },
    { 'CarHeading': 265.0, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 40.58963) },
    { 'CarHeading': 265.0, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 38.88963) },
    { 'CarHeading': 85.0, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 38.88963) },
    { 'CarHeading': 148.9986, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 39.28963) },
    { 'CarHeading': 160.9986, 'CamPosition': new mp.Vector3(-333.7966, -137.409, 40.08963) },
];

var categoryModsIds = {
    "muffler_menu": 4,
    "sideskirt_menu": 3,
    "hood_menu": 7,
    "spoiler_menu": 0,
    "lattice_menu": 6,
    "wings_menu": 8,
    "roof_menu": 10,
    "flame_menu": 48,
    "bamper_menu_front": 1,
    "bamper_menu_back": 2,
    "engine_menu": 11,
    "turbo_menu": 18,
    "transmission_menu": 13,
    "suspention_menu": 15,
    "brakes_menu": 12,
    "lights_menu": 22,
    "horn_menu": 14,
    "wheels_menu": 23,
};
var categoryMods = [
    { Name: "muffler_menu", Index: 4 },
    { Name: "sideskirt_menu", Index: 3 },
    { Name: "hood_menu", Index: 7 },
    { Name: "spoiler_menu", Index: 0 },
    { Name: "lattice_menu", Index: 6 },
    { Name: "wings_menu", Index: 8 },
    { Name: "roof_menu", Index: 10 },
    { Name: "flame_menu", Index: 48 },
    { Name: "bamper_menu", Index: 1 },
];
var hornNames = {
    "-1": "HORN_STOCK",
    "0": "HORN_TRUCK",
    "1": "HORN_POLICE",
    "2": "HORN_CLOWN",
};
var wheelsTypes = {
    "wheels_exclusive": 7,
    "wheels_lowrider": 2,
    "wheels_musclecar": 1,
    "wheels_4x4": 3,
    "wheels_sport": 0,
    "wheels_4x4_2": 4,
    "wheels_tuner": 5,
};
var toDisable = ["armor_menu"];
var vehicleComponents = {};
mp.events.add('tuningUpd', function (components) {
    vehicleComponents = JSON.parse(components);
});
mp.events.add('openTun', (priceModief, carModel, modelPriceModief, components, vehclass) => {
    global.afkSecondsCount = 0;
    opened = true;
    global.menuOpen();
    toDisable = ["armor_menu", "protection_menu"];
    categoryMods.forEach(element => {
        if (global.localplayer.vehicle.getNumMods(element.Index) <= 0) toDisable.push(element.Name);
    });
	isBike = false;
	
	if(vehclass == 8) {
		isBike = true;
		toDisable = ["armor_menu", "protection_menu", "muffler_menu", "sideskirt_menu", "hood_menu", "spoiler_menu", "lattice_menu", "wings_menu", "roof_menu", "flame_menu", "bamper_menu", "turbo_menu", "transmission_menu", "suspention_menu", "horn_menu", "wheels_menu", "glasses_menu", "paint_menu_three"];
	}
		
    mp.gui.emmit(`disable(${JSON.stringify(toDisable)});`);
    mp.events.call('tupd');
    mp.gui.emmit('window.pages.updateDynamicPage("tuning_lsc")');

    priceMod = priceModief / 100;
    modelPriceMod = modelPriceModief;
    carName = carModel;

    tunCam = mp.cameras.new('default', new mp.Vector3(-333.7966, -137.409, 40.58963), new mp.Vector3(0, 0, 0), 60);
    tunCam.pointAtCoord(-338.7966, -137.409, 37.88963);
    tunCam.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 500, true, false);

    vehicleComponents = JSON.parse(components);
});

mp.events.add('tuningSeatsCheck', function () {
    var veh = global.localplayer.vehicle;
    for (var i = 0; i < 7; i++)
        if (veh.getPedInSeat(i) !== 0) {
            mp.events.call('notify', 4, 9, 'Попросите выйти всех пассажиров', 3000);
            return;
        }
    mp.events.callRemote('tuningSeatsCheck');
});