var donateOpened = false;
var redbucks = 0;

mp.keys.bind(global.Keys.VK_F9, false, function() { // F9
    if (!global.loggedin) return;

    if (global.menuCheck()) {
        if (donateOpened) {
            global.menuClose(false);
            mp.gui.emmit(`window.pages.updateDynamicPage('')`);
            donateOpened = false;
        }
	} else {
        global.menuOpen(false);
        donateOpened = true;
        mp.gui.emmit(`window.pages.updateDynamicPage('donate')`);
	}
});

mp.keys.bind(global.Keys.VK_ESCAPE, false, function() {
    if(donateOpened) {
        global.menuClose(false);
        mp.gui.emmit(`window.pages.updateDynamicPage('')`);
        donateOpened = false;
    }
});

mp.events.add('donbuy', (id, data) => {
	global.menuClose(false);
	mp.gui.emmit(`window.pages.updateDynamicPage('')`);
    mp.events.callRemote("donate", id, data);
});

mp.events.add('redset', (reds) => {
    redbucks = reds;
    mp.gui.emmit(`window.hud.updateServerInfo("redbucks", ${redbucks})`);
});