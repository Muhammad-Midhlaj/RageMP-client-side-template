﻿var lsc = mp.browsers.new('package://cef/lscustoms/home.html');
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
setTimeout(function () { lsc.execute(`show(${false});`); }, 1500);

mp.events.add('hideTun', () => {
    lsc.execute(`show(${false});`);
});
mp.events.add('browserDomReady', (browser) => {
    if (browser === lsc && !opened) {
        lsc.execute(`show(${false});`);
    }
});
// Switch global page //
mp.events.add('tpage', (id) => {
    afkSecondsCount = 0;
    if (!opened) return;

    if (id == "exit_menu") {
        lsc.execute(`show(${false});`);
        global.menuClose();
        tunCam.destroy();
        mp.game.cam.renderScriptCams(false, false, 500, true, false);
        mp.events.callRemote('exitTuning');
        opened = false;
    }
    else {
        lsc.execute(`window.location = 'package://cef/lscustoms/${id}.html'`);
        lsc.execute(`set(${lscSpeed},${lscBrakes},${lscBoost},${lscСlutch})`);

        if (id == "home") {
            setTimeout(function () { lsc.execute(`disable(${JSON.stringify(toDisable)});`); }, 150);
            localplayer.vehicle.setHeading(148.9986);

            var camFrom = tunCam;
            tunCam = mp.cameras.new('default', new mp.Vector3(-333.7966, -137.409, 40.58963), new mp.Vector3(0, 0, 0), 60);
            tunCam.pointAtCoord(-338.7966, -137.409, 37.88963);
            tunCam.setActiveWithInterp(camFrom.handle, 500, 1, 1);

            if (lscPage == "numbers_menu") {
                localplayer.vehicle.setNumberPlateTextIndex(lscSettedMod);
            }
            else if (lscPage == "paint_menu_three") {
                localPlayer.vehicle.setNeonLightEnabled(0, false);
                localPlayer.vehicle.setNeonLightEnabled(1, false);
                localPlayer.vehicle.setNeonLightEnabled(2, false);
                localPlayer.vehicle.setNeonLightEnabled(3, false);
                mp.events.call("hideColorp");
            }
            else if (lscPage == "glasses_menu") {
                localplayer.vehicle.setWindowTint(lscSettedMod);
            }
            else if (lscPage != "paint_menu") {
                if (lscPage == "turbo_menu")
                    localplayer.vehicle.toggleMod(18, false);
                else if (lscPage == "lights_menu") {
                    mp.game.invoke('0xE41033B25D003A07', localplayer.vehicle.handle, 0);
                    localplayer.vehicle.setLights(false);
                } else if (lscPage == "wheels_menu")
                    localplayer.vehicle.setWheelType(lscSettedWheelType);

                if (categoryModsIds[lscPage] == undefined) return;
                localplayer.vehicle.setMod(categoryModsIds[lscPage], lscSettedMod);
            }
        }
        else if (categoryIds[id] != undefined) {
            var camFrom = tunCam;
            tunCam = mp.cameras.new('default', categoryPositions[categoryIds[id]].CamPosition, new mp.Vector3(0, 0, 0), 60);
            tunCam.pointAtCoord(-338.7966, -137.409, 37.88963);
            tunCam.setActiveWithInterp(camFrom.handle, 500, 1, 1);

            localplayer.vehicle.setHeading(categoryPositions[categoryIds[id]].CarHeading);

            if (id == "numbers_menu") {
                lscSettedMod = localplayer.vehicle.getNumberPlateTextIndex();
            }
            else if (id == "glasses_menu") {
                lscSettedMod = localplayer.vehicle.getWindowTint();
            }
            else if (id == "paint_menu") {
                if (lscPage != "home") {
                    mp.events.call("hideColorp");
                    localplayer.vehicle.setCustomPrimaryColour(lscPrimary.r, lscPrimary.g, lscPrimary.b);
                    localplayer.vehicle.setCustomSecondaryColour(lscSecondary.r, lscSecondary.g, lscSecondary.b);
                    localplayer.vehicle.setNeonLightEnabled(0, true);
                    localplayer.vehicle.setNeonLightEnabled(1, true);
                    localplayer.vehicle.setNeonLightEnabled(2, true);
                    localplayer.vehicle.setNeonLightEnabled(3, true);
                    localplayer.vehicle.setNeonLightsColour(lscNeon.r, lscNeon.g, lscNeon.b);
                }
                else {
                    lscPrimary = localplayer.vehicle.getCustomPrimaryColour(1, 1, 1);
                    lscSecondary = localplayer.vehicle.getCustomSecondaryColour(1, 1, 1);
                    lscNeon = localplayer.vehicle.getNeonLightsColour(1, 1, 1);
                }
            }
            else {
                if (lscPage == "home") {
                    if (id == "lights_menu") {
                        localplayer.vehicle.setLights(true);
                        if (id >= 0) mp.game.invoke('0xE41033B25D003A07', localplayer.vehicle.handle, lscSettedMod);
                    } else if (id == "wheels_menu")
                        lscSettedWheelType = localplayer.vehicle.getWheelType();
                    lscSettedMod = localplayer.vehicle.getMod(categoryModsIds[id]);
                }
            }

            if (categoryIds[id] <= 9) {
                var elements = [];
                if (tuningConf[carName][categoryIds[id]] != undefined) {
                    global.tuningConf[carName][categoryIds[id]].forEach(element => {
                        var price = element.Item3 * priceMod;
                        elements.push([`${element.Item1}`, element.Item2, price.toFixed()]);
                    });
                    setTimeout(function () { lsc.execute(`add(${JSON.stringify(elements)})`); }, 150);
                } else mp.events.call('notify', 1, 4, "This section is not available for this car.", 3000);
            }
            else if (categoryIds[id] <= 18) {
                var prices = [];
                for (var key in global.tuningStandart[categoryIds[id]]) {
                    var price = global.tuningStandart[categoryIds[id]][key] * modelPriceMod * priceMod;
                    prices.push([`${key}`, price.toFixed()]);
                }
                setTimeout(function () { lsc.execute(`price(${JSON.stringify(prices)})`); }, 150);
            }
        }
        else if (wheelsTypes[id] != undefined) {
            localplayer.vehicle.setWheelType(wheelsTypes[id]);
            var prices = [];
            for (var key in global.tuningWheels[wheelsTypes[id]]) {
                var price = global.tuningWheels[wheelsTypes[id]][key] * priceMod;
                prices.push([`${key}`, price.toFixed()]);
            }
            setTimeout(function () { lsc.execute(`price(${JSON.stringify(prices)})`); }, 150);
        }
        else if (id == "paint_menu_one" || id == "paint_menu_two") {
            var price = 5000 * priceMod;
            var prices = ["buy", price.toFixed()];
            setTimeout(function () { lsc.execute(`price(${JSON.stringify(prices)})`); }, 150);
            mp.events.call("showColorp");
        }
        else if (id == "paint_menu_three") {
            var price = 250000 * priceMod;
            var prices = ["buy", price.toFixed()];
            setTimeout(function () { lsc.execute(`price(${JSON.stringify(prices)})`); }, 150);
            if (!isBike) mp.events.call("showColorp");
        }
        if (toDisable.includes(id)) {
            mp.events.call('tpage', "home");
            mp.events.call('notify', 1, 4, "This section is not available for your transport.", 3000);
        }

        setTimeout(function () { mp.events.call('tupd'); }, 150);
        lscPage = id;
    }
})
// Forced update //
mp.events.add('tupd', () => {
    lscSpeed = (mp.game.vehicle.getVehicleModelMaxSpeed(localplayer.vehicle.model) / 1.2).toFixed();
    lscBrakes = localplayer.vehicle.getMaxBraking() * 100;
    lscBoost = localplayer.vehicle.getAcceleration() * 100;
    lscСlutch = localplayer.vehicle.getMaxTraction() * 10;
    lsc.execute(`set(${lscSpeed},${lscBrakes},${lscBoost},${lscСlutch})`);
})
// Click on element //
mp.events.add('tclk', (id) => {
    afkSecondsCount = 0;
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
        mp.events.call('notify', 1, 9, "You already have this modification installed", 3000);
    else {
        lsc.execute(`show(${false});`);
        opened = false;
        lscSelected = id;

        if (lscPage === "paint_menu_one" || lscPage === "paint_menu_two" || lscPage === "paint_menu_three")
            mp.events.call("hideColorp");

        var title = (lscPage === "paint_menu_one" || lscPage === "paint_menu_two" || lscPage === "paint_menu_three") ? "Are you sure you want to paint the car this color?" : "Are you sure you want to install this modification?";
        mp.events.call('openDialog', 'tuningbuy', title);
    }
})
// Hover on element //
mp.events.add('thov', (id) => {
    afkSecondsCount = 0;
    if (lscPage === "wheels_menu") return;

    if (lscPage == "numbers_menu") {
        localplayer.vehicle.setNumberPlateTextIndex(parseInt(id));
    }
    else if (lscPage == "glasses_menu") {
        localplayer.vehicle.setWindowTint(parseInt(id));
    }
    else if (lscPage == "horn_menu") {
        localplayer.vehicle.startHorn(1000, hornNames[id], false);
    }
    else if (lscPage == "lights_menu") {
        localplayer.vehicle.setLights(true);
        if (id >= 0) {
            localplayer.vehicle.setMod(22, 0);
            mp.game.invoke('0xE41033B25D003A07', localplayer.vehicle.handle, parseInt(id));
        } else localplayer.vehicle.setMod(22, -1);
    }
    else {
        if (categoryModsIds[lscPage] != undefined) {
            if (lscPage == "turbo_menu")
                localplayer.vehicle.toggleMod(18, true);
            localplayer.vehicle.setMod(categoryModsIds[lscPage], parseInt(id));
            mp.events.call('tupd');
        }
        else if (wheelsTypes[lscPage] != undefined) {
            localplayer.vehicle.setMod(23, parseInt(id));
        }
    }
})
// Buy element //
mp.events.add('tunbuy', (state) => {
    afkSecondsCount = 0;
    if (state) {
        if (wheelsTypes[lscPage] != undefined)
            mp.events.callRemote('buyTuning', 19, lscSelected, wheelsTypes[lscPage]);
        else if (lscPage === "paint_menu_one" || lscPage === "paint_menu_two" || lscPage === "paint_menu_three") {
            var paintType;
            if (lscPage === "paint_menu_one") paintType = 0;
            else if (lscPage === "paint_menu_two") paintType = 1;
            else if (lscPage === "paint_menu_three") paintType = 2;
            if (paintType == 2 && isBike) {
                mp.events.call('notify', 1, 4, "This section is not available for motorcycles.", 3000);
                lsc.execute(`show(${true});`);
                opened = true;
            }
            else mp.events.callRemote('buyTuning', 20, paintType, lscRGB.r, lscRGB.g, lscRGB.b);
        }
        else
            mp.events.callRemote('buyTuning', categoryIds[lscPage], lscSelected, -1);
    }
    else {
        lsc.execute(`show(${true});`);
        opened = true;
        if (lscPage == "numbers_menu") {
            localplayer.vehicle.setNumberPlateTextIndex(lscSettedMod);
        }
        else if (lscPage == "glasses_menu") {
            localplayer.vehicle.setWindowTint(lscSettedMod);
        }
        else if (lscPage == "paint_menu_one") {
            localplayer.vehicle.setCustomPrimaryColour(lscPrimary.r, lscPrimary.g, lscPrimary.b);
        }
        else if (lscPage == "paint_menu_two") {
            localplayer.vehicle.setCustomSecondaryColour(lscSecondary.r, lscSecondary.g, lscSecondary.b);
        }
        else if (lscPage == "paint_menu_three") {
            localplayer.vehicle.setNeonLightsColour(lscNeon.r, lscNeon.g, lscNeon.b);
        }
        else {
            if (lscPage == "turbo_menu")
                localplayer.vehicle.toggleMod(18, false);

            if (categoryModsIds[lscPage] == undefined) return;
            localplayer.vehicle.setMod(categoryModsIds[lscPage], lscSettedMod);
        }
    }
})
mp.events.add('tunBuySuccess', (id) => {
    afkSecondsCount = 0;
    lsc.execute(`show(${true});`);
    opened = true;
    if (id != -2) {

        lscSettedMod = id;
        if (wheelsTypes[lscPage] != undefined)
            lscSettedWheelType = localplayer.vehicle.getWheelType();
        else if (lscPage == "paint_menu_one") {
            mp.events.call("showColorp");
            lscPrimary = localplayer.vehicle.getCustomPrimaryColour(1, 1, 1);
        } else if (lscPage == "paint_menu_two") {
            mp.events.call("showColorp");
            lscSecondary = localplayer.vehicle.getCustomSecondaryColour(1, 1, 1);
        } else if (lscPage == "paint_menu_three") {
            mp.events.call("showColorp");
            lscNeon = localplayer.vehicle.getNeonLightsColour(1, 1, 1);
        }
    }
})
mp.events.add('tunColor', function (c) {
    if (!opened) return;
    afkSecondsCount = 0;
    if (lscPage == "paint_menu_one") {
        localplayer.vehicle.setCustomPrimaryColour(c.r, c.g, c.b);
        lscRGB = { r: c.r, g: c.g, b: c.b };
    }
    else if (lscPage == "paint_menu_two") {
        localplayer.vehicle.setCustomSecondaryColour(c.r, c.g, c.b);
        lscRGB = { r: c.r, g: c.g, b: c.b };
    }
    else if (lscPage == "paint_menu_three") {
        localplayer.vehicle.setNeonLightsColour(c.r, c.g, c.b);
        localplayer.vehicle.setNeonLightEnabled(0, true);
        localplayer.vehicle.setNeonLightEnabled(1, true);
        localplayer.vehicle.setNeonLightEnabled(2, true);
        localplayer.vehicle.setNeonLightEnabled(3, true);
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
var categoryIds = {
    "muffler_menu": 0,
    "sideskirt_menu": 1,
    "hood_menu": 2,
    "spoiler_menu": 3,
    "lattice_menu": 4,
    "wings_menu": 5,
    "roof_menu": 6,
    "flame_menu": 7,
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
    afkSecondsCount = 0;
    opened = true;
    global.menuOpen();
    toDisable = ["armor_menu", "protection_menu"];
    categoryMods.forEach(element => {
        if (localplayer.vehicle.getNumMods(element.Index) <= 0) toDisable.push(element.Name);
    });
    isBike = false;

    if (vehclass == 8) {
        isBike = true;
        toDisable = ["armor_menu", "protection_menu", "muffler_menu", "sideskirt_menu", "hood_menu", "spoiler_menu", "lattice_menu", "wings_menu", "roof_menu", "flame_menu", "bamper_menu", "turbo_menu", "transmission_menu", "suspention_menu", "horn_menu", "wheels_menu", "glasses_menu", "paint_menu_three"];
    }

    lsc.execute(`disable(${JSON.stringify(toDisable)});`);
    mp.events.call('tupd');
    lsc.execute(`show(${true});`);

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
    var veh = localplayer.vehicle;
    for (var i = 0; i < 7; i++)
        if (veh.getPedInSeat(i) !== 0) {
            mp.events.call('notify', 4, 9, 'Ask all passengers to get off', 3000);
            return;
        }
    mp.events.callRemote('tuningSeatsCheck');
});