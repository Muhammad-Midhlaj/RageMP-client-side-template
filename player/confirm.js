var text = "";
var canback = "";
var menuWasopened = false;
var lastTime = false;

global.openDialog = () => {
    lastTime = 0;
    mp.gui.emmit(
        `window.modal.updateModalMenu("confirm"),` +
        `window.confirm.setText("Заголовок","${text}");`
    );
    
    global.menuWasopened = global.menuOpened;
    mp.gui.cursor.visible = true;
    if (!global.menuOpened) global.menuOpen(false);
    mp.events.call('startScreenEffect', "MenuMGHeistIn", 1, true);
}

global.closeDialog = () => {
    mp.gui.emmit('window.modal.updateModalMenu("")');
    if (!global.menuWasopened) global.menuClose(false);
    mp.events.call('stopScreenEffect', "MenuMGHeistIn");
}

mp.events.add('openDialog', (cback, ctext) => {
    // Добавить title!!!
    canback = cback;
    text = ctext;
    global.openDialog();
	mp.gui.cursor.visible = true;
})

mp.events.add('closeDialog', () => {
    global.closeDialog();
});

mp.events.add('client:OnDialogCallback', (state) => {
    if (canback == 'tuningbuy') mp.events.call('tunbuy', state);
    else mp.events.callRemote('dialogCallback', canback, state);
    global.closeDialog();
})