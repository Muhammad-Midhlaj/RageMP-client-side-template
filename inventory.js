global.inventory = mp.browsers.new('package://cef/inventory.html');

mp.keys.bind(Keys.VK_I, false, function () {

    if (!loggedin || chatActive || editing || cuffed || localplayer.getVariable('InDeath') == true) return;

    if (global.inventoryOpen)
        mp.events.call('inventory', 1);
    else
        mp.events.call('inventory', 0);
});

mp.keys.bind(Keys.VK_ESCAPE, false, function() {

    if (global.inventoryOpen) {
        mp.game.ui.setPauseMenuActive(false);
        mp.events.call('inventory', 1);
    }
});

function openInventory() {
    
	if(inventory == null) return;
	if (global.menuCheck()) return;
    menuOpen();
	inventory.execute('inventory.ToggleInventory(true)');
	global.inventoryOpen = true;
}

function closeInventory() {

	if(inventory == null) return;
    menuClose();
    //inventory.execute('context.hide()');
	inventory.execute('inventory.ToggleInventory(false)');
    inventory.execute('inventory.trunktoggled=false');
    global.inventoryOpen = false;

    if (global.openOutType != -1) {
        mp.events.callRemote('closeInventory');
        global.openOutType = -1;
    }
}

mp.events.add('inventoryContext', (act, type, element) => {

    switch(act){
		case 0:
            mp.events.callRemote('inventoryContext', type, element, 'use');
            break;
		case 1:
            mp.events.callRemote('inventoryContext', type, element, 'transfer');
            break;
		case 2:
            mp.events.callRemote('inventoryContext', type, element, 'drop');
            break;
	}
})

mp.events.add('inventory', (act, data, index) => {

    switch(act)
    {
        case 0:
            openInventory();
            break;
        case 1:
            closeInventory();
            break;
        case 2:
			inventory.execute(`inventory.UpdateStats('${data}');`);
            break;
        case 3:
            inventory.execute(`inventory.UpdatePlayerItems('${data}')`);
            break;
        case 4:
            inventory.execute(`inventory.UpdateTrunkItems('${data}')`);
            global.openOutType = 0;
            break;
        case 5:
            inventory.execute(`inventory.trunktoggled=${data}`);
            break;
        case 6:
            inventory.execute(`inventory.UpdatePlayerItem(${index},${data})`);
            break;
        case 7: // save pl inventory

            data = JSON.parse(data);
            var sendarray = [];
            for(var i = 0; i < data.length; i++) sendarray[i] = {"Data": data[i].serial, "ID": data[i].type, "Type": data[i].type, "Count": data[i].count, "IsActive": data[i].active == "0" ? false : true};
            mp.events.callRemote("updatePlayerInventory", JSON.stringify(sendarray));
            break;
        case 8: // save trunk inventory

            data = JSON.parse(data);
            var sendarray = [];
            for(var i = 0; i < data.length; i++) sendarray[i] = {"Data": data[i].serial, "ID": data[i].type, "Type": data[i].type, "Count": data[i].count, "IsActive": data[i].active == "0" ? false : true};
            mp.events.callRemote("updateOutInventory", JSON.stringify(sendarray));
            break;
        case 9:
            mp.events.callRemote("playerOutTrunkInventory");
            break;
        case 11:
            global.openOutType = -1;
            closeBoard();
        	break;
    }
});
