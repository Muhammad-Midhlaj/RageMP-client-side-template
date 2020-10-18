mp.game.object.doorControl(97297972, 17.2718, -1115.07519, 30.33417, false, 0.0, 0.0, 0.0);
mp.game.object.doorControl(-8873588, 17.3677, -1115.1101, 30.3593, false, 0.0, 0.0, 0.0);

mp.events.add("LSPDGateOpen", () => {
    mp.game.object.doorControl(-1603817716, 411.67, -1023.172, 28.4064846, false, 0.0, 0.0, 0.0);
});

mp.events.add("LSPDGateClose", () => {
    mp.game.object.doorControl(-1603817716, 411.67, -1023.172, 28.4064846, true, 0.0, 0.0, 0.0);
});

mp.events.add("LSPDWeaponDoorOpen", () => {
    mp.game.object.doorControl(749848321, 453.0793, -983.1895, 30.83926, false, 0.0, 0.0, 0.0);
});

mp.events.add("LSPDWeaponDoorClose", () => {
    mp.game.object.doorControl(749848321, 453.0793, -983.1895, 30.83926, true, 0.0, 0.0, 0.0);
});

mp.keys.bind(0x45, false, function() {
	if (mp.gui.cursor.visible)
		return;
	
	mp.events.callRemote("OpenLSPDDoor", player);
    mp.events.callRemote("OpenLSPDGate", player);
});