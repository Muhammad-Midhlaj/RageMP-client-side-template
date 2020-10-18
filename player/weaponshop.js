// WEAPON SHOP //
var weaponShopOpened = false;

let wshop = {
    lid: -1,
    tab: 0,
    data: [],
};

mp.events.add('wshop', (act, value, sub) => {

    if(new Date().getTime() - global.lastCheck < 50) return;
    global.lastCheck = new Date().getTime();
    
    switch (act) {
        case "cat":
            if (value == 4) return;
            wshop.tab = value;
            weaponShopOpened = true;
            mp.gui.emmit(
                `window.modal.updateModalMenu("weaponshop"),` +
                `window.weaponshop.setData(${value},'${JSON.stringify(wshop.data[value])}')`
            );
            break;
        case "buy":
            mp.events.callRemote('wshop', wshop.tab, value);
            break;
        case "rangebuy":
			mp.events.callRemote('wshopammo', value, sub);
			break;
    }
});

mp.events.add('openWShop', (id, json) => {
    if (global.menuCheck()) return;
    global.menuOpen(false);
    if (id !== wshop.lid) wshop.data = JSON.parse(json);

    weaponShopOpened = true;
    mp.gui.emmit(
        `window.modal.updateModalMenu("weaponshop"),` +
        `window.weaponshop.setData(0,'${JSON.stringify(wshop.data[0])}')`
    );
    wshop.lid = id;
});

mp.events.add('closeWShop', () => {
    global.menuClose(false);
    weaponShopOpened = false;
    mp.gui.emmit(`window.modal.updateModalMenu("")`);
    wshop.tab = 0;
});

mp.keys.bind(global.Keys.VK_ESCAPE, false, function() {
    if(weaponShopOpened) {
        global.menuClose(false);
        weaponShopOpened = false;
        mp.gui.emmit(`window.modal.updateModalMenu("")`);
        wshop.tab = 0;
    }
});