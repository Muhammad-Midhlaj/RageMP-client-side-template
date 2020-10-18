var phoneWindow = null;
var phoneOppened = false;

mp.keys.bind(global.Keys.VK_M, false, function () { // M key
    if (!global.loggedin || global.chatActive || editing || global.menuCheck() || cuffed || global.localplayer.getVariable('InDeath') == true) return;
    mp.events.callRemote('openPlayerMenu');
    lastCheck = new Date().getTime();
});

mp.events.add('phoneShow', () => {
    mp.gui.emmit('window.phone.show();');
    mp.gui.cursor.visible = true;
});

mp.events.add('phoneHide', () => {
    mp.gui.emmit('window.phone.hide();');
    mp.gui.cursor.visible = false;
});

mp.events.add('phoneOpen', (data) => {
    var json = JSON.parse(data);
    // // //
    var id = json[0];
    var canHome = json[3];
    var canBack = json[2];
    var items = JSON.stringify(json[1]);
    // // //
    var exec = "window.phone.open('" + id + "'," + canHome + "," + canBack + ",'"  + items + "');";
    //mp.gui.chat.push(exec);
    mp.gui.emmit(exec);
});

mp.events.add('phoneChange', (ind, data) => {
    var exec = "window.phone.change(" + ind + ",'" + data + "');";
    //mp.gui.chat.push(exec);
    mp.gui.emmit(exec);
});

mp.events.add('phoneClose', () => {
    mp.gui.emmit('window.phone.reset();');
});

mp.events.add('client:OnPhoneCallback', (itemid, event, data) => {
    mp.events.callRemote('Phone', 'callback', itemid, event, data);
    //mp.gui.chat.push(itemid+":"+event+":"+data);
});

mp.events.add('client:OnPhoneNavigation', (btn) => {
    mp.events.callRemote('Phone', 'navigation', btn);
});

/*mp.events.add("playerQuit", (player, exitType, reason) => {
    if (phone !== null) {
        if (player.name === global.localplayer.name) {
            phone.destroy();
            phone = null;
            phoneOppened = false;
            phoneWindow = null;
        }
    }
});*/