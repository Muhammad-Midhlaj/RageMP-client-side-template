mp.gui.cursor.visible = true;
mp.game.ui.setPauseMenuActive(false);

setTimeout(function() {
    var cam = mp.cameras.new('default', new mp.Vector3(-95, 19, 1182), new mp.Vector3(0, 0, 0), 70);
    cam.pointAtCoord(-95, 19, 0);
    cam.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);
}, 500);

var lastButAuth = 0;
var lastButSlots = 0;

// events from cef
mp.events.add('client:OnSignIn', function (username, password) {
    if (new Date().getTime() - lastButAuth < 3000) {
        mp.events.call('notify', 4, 9, "Too fast", 3000);
        return;
    }
    lastButAuth = new Date().getTime();
    mp.events.callRemote('signin', username, password)
});

mp.events.add('restorepass', function (state, authData) {
    if (new Date().getTime() - lastButAuth < 3000) {
        mp.events.call('notify', 4, 9, "Too fast", 3000);
        return;
    }
    lastButAuth = new Date().getTime();

    authData = JSON.parse(authData);

    var nameorcode = authData['entry-login'];

    mp.events.callRemote('restorepass', state, nameorcode)
});

mp.events.add('client:OnSignUp', function (username, email, promo, pass1, pass2) {
    if (new Date().getTime() - lastButAuth < 3000) {
        mp.events.call('notify', 4, 9, "Too fast", 3000);
        return;
    }
    lastButAuth = new Date().getTime();

    if (checkLogin(username) || username.length > 50) {
        mp.events.call('notify', 1, 9, 'Login does not match format or is too long!', 3000);
        return;
    }

    if(pass1 != pass2) {
        mp.events.call('notify', 1, 9, 'Passwords do not match!', 3000);
        return;
    }

    if (pass1.length < 3) {
        mp.events.call('notify', 1, 9, 'Password error!', 3000);
        return;
    }

    mp.events.callRemote('signup', username, pass1, email, promo);
});

mp.events.add('client:OnSelectCharacter', function (slot) {
    
    if (new Date().getTime() - lastButSlots < 3000) {
        mp.events.call('notify', 4, 9, "Too fast", 3000);
        return;
    }

    lastButSlots = new Date().getTime();
	mp.events.callRemote('selectchar', slot);
});

mp.events.add('client:OnCreateCharacter', function (slot, name, lastname) {
    if (checkName(name) || !checkName2(name) || name.length > 25 || name.length <= 2) {
        mp.events.call('notify', 1, 9, 'The correct name format is 3-25 characters and the first letter of the name is capitalized', 3000);
        return;
    }

    if (checkName(lastname) || !checkName2(lastname) || lastname.length > 25 || lastname.length <= 2) {
        mp.events.call('notify', 1, 9, 'The correct format for the last name is 3-25 characters and the first letter of the last name is capitalized', 3000);
        return;
    }

    if (new Date().getTime() - lastButSlots < 3000) {
        mp.events.call('notify', 4, 9, "Too fast", 3000);
        return;
    }
    lastButSlots = new Date().getTime();

    mp.events.callRemote('newchar', slot, name, lastname);
});

mp.events.add('delChar', function (slot, name, lastname, pass) {
    if (checkName(name) || name.length > 25 || name.length <= 2) {
        mp.events.call('notify', 1, 9, 'The correct name format is 3-25 characters and the first letter of the name is capitalized', 3000);
        return;
    }

    if (checkName(lastname) || lastname.length > 25 || lastname.length <= 2) {
        mp.events.call('notify', 1, 9, 'The correct format for the last name is 3-25 characters and the first letter of the last name is capitalized', 3000);
        return;
    }

    if (new Date().getTime() - lastButSlots < 3000) {
        mp.events.call('notify', 4, 9, "Too fast", 3000);
        return;
    }
    lastButSlots = new Date().getTime();

    mp.events.callRemote('delchar', slot, name, lastname, pass);
});

mp.events.add('transferChar', function (slot, name, lastname, pass) {
    if (checkName(name)) {
        mp.events.call('notify', 1, 9, 'The name does not match the format or is too long!', 3000);
        return;
    }

    if (checkName(lastname)) {
        mp.events.call('notify', 1, 9, 'The last name does not fit the format or is too long!', 3000);
        return;
    }

    if (new Date().getTime() - lastButSlots < 3000) {
        mp.events.call('notify', 4, 9, "Too fast", 3000);
        return;
    }
    lastButSlots = new Date().getTime();

    mp.events.callRemote('transferchar', slot, name, lastname, pass);
});

mp.events.add('client:OnSelectSpawn', function (selectedspawn) {
	mp.events.callRemote('spawn', selectedspawn);
});

mp.events.add('buyNewSlot', function (data) {
    if (new Date().getTime() - lastButSlots < 3000) {
        mp.events.call('notify', 4, 9, "Too fast", 3000);
        return;
    }
	lastButSlots = new Date().getTime();
	mp.events.callRemote('donate', 8, data);
});

// events from server
mp.events.add('delCharSuccess', function (data) {
    auth.execute(`delchar(${data})`);
});

mp.events.add('unlockSlot', function (data) {
    auth.execute(`unlockSlot(${data})`);
});

mp.events.add('toslots', function (data) {
    mp.gui.emmit(`window.authentication.switchToCharacterSelector('${data}')`);
});

mp.events.add('spawnShow', function (data) {
    if (data !== false) {
        mp.gui.emmit(`window.authentication.switchToRespawnSelector('${data}')`);
    }
});

mp.events.add('ready', function () {
    global.loggedin = true;
    global.menuClose();
    mp.game.cam.renderScriptCams(false, true, 3000, true, true);

    mp.events.call('showHUD', true);
    mp.events.call('hideTun');
    mp.game.player.setHealthRechargeMultiplier(0);
    mp.gui.emmit(`window.authentication.switchToGame()`);
});

function checkLogin(str) {
    return !(/^[a-zA-Z1-9]*$/g.test(str));
}

function checkName(str) {
    return !(/^[a-zA-Z]*$/g.test(str));
}

function checkName2(str) {
    let ascii = str.charCodeAt(0);
    if (ascii < 65 || ascii > 90) return false; // Если первый символ не заглавный, сразу отказ
    let bsymbs = 0; // Кол-во заглавных символов
    for (let i = 0; i != str.length; i++) {
        ascii = str.charCodeAt(i);
        if (ascii >= 65 && ascii <= 90) bsymbs++;
    }
    if (bsymbs > 2) return false; // Если больше 2х заглавных символов, то отказ. (На сервере по правилам разрешено иметь Фамилию, например McCry, то есть с приставками).
    return true; // string (имя или фамилия) соответствует
}