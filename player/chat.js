mp.keys.bind(global.Keys.VK_T, true, function() {
    if(global.loggedin === true && global.chatActive === false)
    {
        mp.gui.emmit(`window.chat.toggleInput(true)`);
        mp.gui.cursor.visible = true;
        global.chatActive = true;
    }
});

mp.keys.bind(global.Keys.VK_ESCAPE, false, function() {
    if(global.loggedin === true && global.chatActive === true)
    {
        mp.gui.emmit(`window.chat.toggleInput(false)`);
        mp.gui.cursor.visible = false;
        mp.game.ui.setPauseMenuActive(false);
        global.chatActive = false;
    }
});

mp.events.add('client:OnChatInputChanged', (toggled) => {
    mp.gui.cursor.visible = toggled;
    global.chatActive = toggled;
});