global.openFractionMenu = () => {
    if (global.menuCheck()) return;
    global.menuOpen(false);
    mp.gui.emmit(`window.pages.updateDynamicPage('fraction')`);
}

global.closeFractionMenu = () => {
    mp.gui.emmit(`window.pages.updateDynamicPage('')`);
    global.menuClose(false);
}

mp.events.add('openfm', () => {
   global.openFractionMenu();
});

mp.events.add('setmem', (json, count, on, off) => {
    mp.gui.emmit(`window.fraction.updateMembers('${json}',${count},${on},${off});`);
});

mp.events.add('closefm', () => {
    global.closeFractionMenu();
});

mp.events.add('fmenu', (act, data1, data2) => {
    global.closeFractionMenu();
});