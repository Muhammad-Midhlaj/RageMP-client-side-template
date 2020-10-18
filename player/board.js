global.openOutType = -1;
var boardOpen = false;

mp.keys.bind(global.Keys.VK_I, false, function () {

    if (!global.loggedin || global.chatActive || editing || cuffed || global.localplayer.getVariable('InDeath') == true) return;

    if (boardOpen) mp.events.call('board', 1);
    else mp.events.call('board', 0);
});

mp.keys.bind(global.Keys.VK_ESCAPE, false, function() {

    if (boardOpen) {
        mp.game.ui.setPauseMenuActive(false);
        mp.events.call('board', 1);
    }
});

function openBoard() {

	if (global.menuCheck()) return;
    menuOpen(false);
	mp.gui.emmit(
		`window.pages.updatePage('inventory'),` +
		`window.inventory.clearOutData()`);
	boardOpen = true;
}

function closeBoard() {
	
	menuClose(false);
	mp.gui.emmit(
		`window.context.hide(),` +
		`window.pages.updatePage('none')`
	);
    boardOpen = false;

    if (global.openOutType != -1) {
        mp.events.callRemote('closeInventory');
        global.openOutType = -1;
    }
}
// // //
// 0 - Open
// 1 - Close
// 2 - Statistics data
// 3 - Inventory data
// 4 - Outside data
// 5 - Outside on/off
// // //

mp.events.add('board', (act, data, index) => {
    //mp.gui.chat.push(`act: ${act} | data: ${data}`);

	switch(act){
		case 0:
			openBoard();
			break;
        case 1:
			closeBoard();
			break;
        case 2:
			mp.gui.emmit(`window.inventory.setStats(${data})`)
			break;
		case 3:
			mp.gui.emmit(`window.inventory.setItems(${data})`);
			break;
		case 4:
			mp.gui.emmit(`window.inventory.setOutItems(${data})`);
			break;
		case 5:
			mp.gui.emmit(`window.inventory.setOutSide(${data})`);
            global.openOutType = 0;
			break;
        case 6:
			mp.gui.emmit(`window.inventory.itemUpd(${index},${data})`);
        	break;
        case 11:
            global.openOutType = -1;
            closeBoard();
        	break;
	}
});

mp.events.add('boardCB', (act, type, index) => {
	if(new Date().getTime() - global.lastCheck < 100) return; 
	global.lastCheck = new Date().getTime();
	// bullshit, required refactor 
	switch(act){
		case 1:
		mp.events.callRemote('Inventory', type, index, 'use');
		break;
		case 2:
		mp.events.callRemote('Inventory', type, index, 'transfer');
		break;
		case 3:
		mp.events.callRemote('Inventory', type, index, 'take');
		break;
		case 4:
		mp.events.callRemote('Inventory', type, index, 'drop');
		break;
	}
});
// // //
mp.events.add("playerQuit", (player, exitType, reason) => {
    if (board !== null) {
        if (player.name === global.localplayer.name) {
            board.destroy();
            board = null;
        }
    }
});