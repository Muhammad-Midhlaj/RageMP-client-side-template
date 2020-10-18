// SIMPLE MENU //
global.openSM = (type, data) => {
    if (global.menuCheck()) return;

    var execute = `window.modal.updateModalMenu("menu"),`;
    switch (type) {
        case 1: execute += `window.menu.openShop('${data}');`; break;
        case 2: execute += `window.menu.openBlack('${data}');`; break;
        case 3: execute += `window.menu.openFib('${data}');`; break;
        case 4: execute += `window.menu.openLspd('${data}');`; break;
        case 5: execute += `window.menu.openArmy('${data}');`; break;
        case 6: execute += `window.menu.openGov('${data}');`; break;
        case 7: execute += `window.menu.openArmygun('${data}');`; break;
        case 8: execute += `window.menu.openGang('${data}');`; break;
        case 9: execute += `window.menu.openMafia('${data}');`; break;
        case 10: execute += `window.menu.openFishShop('${data}');`; break;
    }
    mp.gui.emmit(execute);
    global.menuOpen(false)
}

global.closeSM = () => {
    global.mp.gui.emmit(`window.modal.updateModalMenu("");`)
    global.menuClose(false)
}

mp.events.add('smExit', () => {
    global.closeSM();
});

mp.events.add('smOpen', (type, data) => {
    global.openSM(type, data);
});

mp.events.add('menu', (action, data) => {
    switch (action) {
        case "resign":
            mp.events.callRemote('jobjoin', -1);
            break;
        case "work":
            mp.events.callRemote('jobjoin', data);
            break;
        case "shop":
            mp.events.callRemote('shop', data);
            break;
        case "black":
            mp.events.callRemote('mavrbuy', data);
            break;
        case "fib":
            mp.events.callRemote('fbigun', data);
            break;
        case "lspd":
            mp.events.callRemote('lspdgun', data);
            break;
        case "army":
            mp.events.callRemote('armygun', data);
            break;
        case "gov":
            mp.events.callRemote('govgun', data);
            break;
        case "gang":
            mp.events.callRemote('gangmis', data);
            break;
        case "mafia":
            mp.events.callRemote('mafiamis', data);
            break;
        case "fishshop":
            mp.events.callRemote('shop', data);
            break;
    }
});