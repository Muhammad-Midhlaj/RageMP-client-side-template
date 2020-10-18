
var validTorsoIDs = [
    // male
    [0, 0, 2, 14, 14, 5, 14, 14, 8, 0, 14, 15, 12],
    // female
    [0, 5, 2, 3, 4, 4, 5, 5, 5, 0]
];

var outClothes = 1;
var pants = 0;
var shoes = 1;

var gender = true;
var father = 0;
var mother = 21;
var similarity = 0.5;
var skin = 0.5;

var features = [];
for (var i = 0; i < 20; i++) features[i] = 0.0;

var hair = 0;
var hairColor = 0;
var eyeColor = 0;

var appearance = [];
for (var i = 0; i < 11; i++) appearance[i] = 255;


function updateCharacterParents() {
    global.localplayer.setHeadBlendData(
        mother,
        father,
        0,

        mother,
        father,
        0,

        similarity,
        skin,
        0.0,

        true
    );
}

function updateCharacterHairAndColors() {
    let currentGender = (gender) ? 0 : 1;
    // hair
    global.localplayer.setComponentVariation(2, hair, 0, 0);
    global.localplayer.setHairColor(hairColor, 0);

    // appearance colors
    global.localplayer.setHeadOverlayColor(2, 1, hairColor, 100); // eyebrow
    global.localplayer.setHeadOverlayColor(1, 1, hairColor, 100); // beard
    global.localplayer.setHeadOverlayColor(10, 1, hairColor, 100); // chesthair

    // eye color
    global.localplayer.setEyeColor(eyeColor);
}

function updateAppearance() {
    for (var i = 0; i < 11; i++) {
        global.localplayer.setHeadOverlay(i, appearance[i], 100, 0, 0);
    }
}

function updateClothes() {
    global.localplayer.setComponentVariation(11, outClothes, 1, 0);
    global.localplayer.setComponentVariation(4, pants, 1, 0);
    global.localplayer.setComponentVariation(6, shoes, 1, 0);
    global.localplayer.setComponentVariation(8, 15, 0, 0);
    let currentGender = (gender) ? 0 : 1;
    global.localplayer.setComponentVariation(3, validTorsoIDs[currentGender][outClothes], 0, 0);
}

mp.events.add('client:OnCustomizationChangeGender', (param) => {
    gender = (param == "men") ? true : false;
    if (gender) {
        global.localplayer.model = mp.game.joaat('mp_m_freemode_01');

        outClothes = 1;
        pants = 0;
        shoes = 1;
    }
    else {
        global.localplayer.model = mp.game.joaat('mp_f_freemode_01');

        outClothes = 5;
        pants = 0;
        shoes = 3;
    }

    appearance[1] = 255;

    updateCharacterParents();
    updateAppearance();
    updateCharacterHairAndColors();
    updateClothes();
    for (var i = 0; i < 20; i++) global.localplayer.setFaceFeature(i, features[i]);
});

mp.events.add('client:OnCustomizationChanged', (param, value) => {

    var lvl = parseFloat(value);
    switch (param) {
        case "similar":
            similarity = lvl;
            updateCharacterParents();
            return;
        case "skin":
            skin = lvl;
            updateCharacterParents();
            return;
        case "noseWidth": global.localplayer.setFaceFeature(0, lvl); features[0] = lvl; return;
        case "noseHeight": global.localplayer.setFaceFeature(1, lvl); features[1] = lvl; return;
        case "noseTipLength": global.localplayer.setFaceFeature(2, lvl); features[2] = lvl; return;
        case "noseDepth": global.localplayer.setFaceFeature(3, lvl); features[3] = lvl; return;
        case "noseTipHeight": global.localplayer.setFaceFeature(4, lvl); features[4] = lvl; return;
        case "noseBroke": global.localplayer.setFaceFeature(5, lvl); features[5] = lvl; return;
        case "eyebrowHeight": global.localplayer.setFaceFeature(6, lvl); features[6] = lvl; return;
        case "eyebrowDepth": global.localplayer.setFaceFeature(7, lvl); features[7] = lvl; return;
        case "cheekboneHeight": global.localplayer.setFaceFeature(8, lvl); features[8] = lvl; return;
        case "cheekboneWidth": global.localplayer.setFaceFeature(9, lvl); features[9] = lvl; return;
        case "cheekDepth": global.localplayer.setFaceFeature(10, lvl); features[10] = lvl; return;
        case "eyeScale": global.localplayer.setFaceFeature(11, lvl); features[11] = lvl; return;
        case "lipThickness": global.localplayer.setFaceFeature(12, lvl); features[12] = lvl; return;
        case "jawWidth": global.localplayer.setFaceFeature(13, lvl); features[13] = lvl; return;
        case "jawShape": global.localplayer.setFaceFeature(14, lvl); features[14] = lvl; return;
        case "chinHeight": global.localplayer.setFaceFeature(15, lvl); features[15] = lvl; return;
        case "chinDepth": global.localplayer.setFaceFeature(16, lvl); features[16] = lvl; return;
        case "chinWidth": global.localplayer.setFaceFeature(17, lvl); features[17] = lvl; return;
        case "chinIndent": global.localplayer.setFaceFeature(18, lvl); features[18] = lvl; return;
        case "neck": global.localplayer.setFaceFeature(19, lvl); features[19] = lvl; return;
        case "father":
            father = value;
            updateCharacterParents();
            return;
        case "mother":
            mother = value;
            updateCharacterParents();
            return;
        case "hair":
            hair = value;
            updateCharacterHairAndColors();
            return;
        case "eyebrows":
            appearance[2] = value;
            updateAppearance();
            return;
        case "beard":
            appearance[1] = value;
            updateAppearance();
            return;
        case "hairColor":
            hairColor = value;
            updateCharacterHairAndColors();
            return;
        case "eyeColor":
            eyeColor = value;
            updateCharacterHairAndColors();
            return;
    }
});

mp.events.add('client:OnFinishCreateCharacter', () => {
    if(new Date().getTime() - global.lastCheck < 1000) return; 
    
	global.lastCheck = new Date().getTime();

    mp.game.graphics.startScreenEffect("MinigameTransitionIn", 0, false);
    let currentGender = (gender) ? 0 : 1;

    var appearance_values = [];
    for (var i = 0; i < 11; i++) appearance_values.push({ Value: appearance[i], Opacity: 100 });

    var hair_or_colors = [];
    hair_or_colors.push(hair);
    hair_or_colors.push(hairColor);
    hair_or_colors.push(0);
    hair_or_colors.push(hairColor);
    hair_or_colors.push(hairColor);
    hair_or_colors.push(eyeColor);
    hair_or_colors.push(0);
    hair_or_colors.push(0);
    hair_or_colors.push(hairColor);

    setTimeout(function () {
        mp.events.callRemote("SaveCharacter", currentGender, father, mother, similarity, skin, JSON.stringify(features), JSON.stringify(appearance_values), JSON.stringify(hair_or_colors));
    }, 5000);
});

mp.events.add('CreatorCamera', () => {
    global.localplayer.freezePosition(true);
    global.localplayer.setRotation(0.0, 0.0, -185.0, 2, true);

    bodyCamStart = global.localplayer.position;
    var camValues = { Angle: global.localplayer.getRotation(2).z + 90, Dist: 0.6, Height: 0.6 };
    var pos = global.getCameraOffset(new mp.Vector3(bodyCamStart.x, bodyCamStart.y, bodyCamStart.z + camValues.Height), camValues.Angle, camValues.Dist);
    bodyCam = mp.cameras.new('default', pos, new mp.Vector3(0, 0, 0), 50);
    bodyCam.pointAtCoord(bodyCamStart.x, bodyCamStart.y, bodyCamStart.z + camValues.Height);
    bodyCam.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 500, true, false);

    updateCharacterParents();
    for (var i = 0; i < 20; i++) global.localplayer.setFaceFeature(i, 0.0);
    updateCharacterHairAndColors();
    updateAppearance();
    updateClothes();

    global.localplayer.taskPlayAnim("amb@world_human_guard_patrol@male@base", "base", 8.0, 1, -1, 1, 0.0, false, false, false);

    mp.gui.emmit(`window.authentication.switchToCustomization()`);

    global.menuOpen();
    mp.events.call('client:OnShowCameraSettings', true);
});

mp.events.add('DestroyCamera', () => {
    if (bodyCam == null) return;
    bodyCam.setActive(false);
    bodyCam.destroy();
    mp.game.cam.renderScriptCams(false, false, 3000, true, true);

    global.menuClose();
    bodyCam = null;

    mp.events.call('client:OnShowCameraSettings', false);
    mp.gui.emmit(`window.customization.switchToGame()`);
    
    global.localplayer.stopAnim("amb@world_human_guard_patrol@male@base", "base", 0.0)
    global.localplayer.freezePosition(false);

    mp.events.call('showHUD', true);
    mp.events.call('showAltTabHint');

    global.loggedin = true;
});

mp.events.add('entityStreamIn', (entity) => {
    if (entity.type !== 'player') return;

    if (entity.getVariable('HAT_DATA') != undefined) {
        var data = JSON.parse(entity.getVariable('HAT_DATA'));
        if (data[0] != -1)
            entity.setPropIndex(0, data[0], data[1], true);
    }
});