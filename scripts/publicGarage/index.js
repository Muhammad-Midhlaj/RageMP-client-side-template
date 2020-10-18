var garage;


// num 2
mp.keys.bind(0x62, true, function () {
    mp.events.callRemote("IsInNearVehStore");
});

mp.events.add('OpenVehStore', () => {
    if (!garage) {
        mp.gui.cursor.show(true, true);
		mp.gui.chat.activate(false);
		mp.gui.chat.show(false);
        garage = mp.browsers.new("package://scripts/publicGarage/garage.html");
        mp.events.callRemote("getVehicles");
    } else {
        mp.gui.cursor.show(false, false);
		mp.gui.chat.activate(true);
		mp.gui.chat.show(true);
        garage.destroy();
        garage = null;
    }
});

mp.events.add({
    "receiveVehicles": (json) => {
        json = JSON.stringify(json);
        if(json.length == 2) {
            garage.execute(`loadItems(${json});`);
        } else {
            garage.execute(`loadItems(${json});`);
        }
    },
    "spawnVehicle": (id) => {
        mp.events.callRemote("spawnVehicle", id);
        mp.gui.cursor.show(false, false);
		mp.gui.chat.activate(true);
		mp.gui.chat.show(true);
        garage.destroy();
        garage = null;
    }
});