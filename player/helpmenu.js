var helpMenuState = false;

const closeHelpMenu = () => {

    if(helpMenuState)
    {
        mp.gui.emmit(`window.pages.updateDynamicPage('')`);
        helpMenuState = false;
        global.menuClose(false);
        mp.gui.cursor.visible = false;
    }
}

mp.events.add('client:OnCloseHelpMenu', () => {
    closeHelpMenu();
});

mp.keys.bind(global.Keys.VK_F10, false, () => {

    if(!helpMenuState)
    {
        global.menuOpen(false);
        mp.gui.emmit(`window.pages.updateDynamicPage('help')`);
        helpMenuState = true;
        mp.gui.cursor.visible = true;
    }
    else closeHelpMenu();
});

mp.keys.bind(global.Keys.VK_ESC, false, closeHelpMenu());