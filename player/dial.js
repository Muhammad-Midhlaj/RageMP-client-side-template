// DIAL //
var vall, off;

mp.events.add('dial', (act, val, reset) => {
    switch (act) {
        case "open":
            if (reset == true) {
                mp.gui.emmit.execute('window.hud.updateComponent("breakinglock", false)');
                global.menuClose()
            }
            var off = Math.random(2, 5);

            mp.gui.emmit.execute(`window.hud.updateComponent("breakinglock", true)`);
            val = val, off = off;
            mp.gui.emmit.execute(`window.breakinglock.setData(${val},${off})`);
            
            global.menuOpen();
            break;
        case "close":
            mp.gui.emmit.execute('window.hud.updateComponent("breakinglock", false)');
            global.menuClose()
            break;
        case "call":
            mp.events.callRemote('dialPress', val);
            global.menuClose()
            break;
    }
});