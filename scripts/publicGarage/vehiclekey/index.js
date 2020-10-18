var seatCef = null;

let disablekeys = "false";

mp.events.add("cuff", (position) => {
	disablekeys = "true";
});
mp.events.add("uncuff", (position) => {
	disablekeys = "false";
});

const controls = mp.game.controls;

mp.events.add('openSeatCef', () => {
    if (seatCef == null) {
        seatCef = mp.browsers.new('package://Vehicles/vehiclekey/index.html');
		mp.gui.cursor.visible = true;
    }
});

mp.events.add('closeSeatCef', () => {
	if (seatCef !== null) {
        seatCef.destroy();
		seatCef = null;
		mp.gui.cursor.visible = false;
    }
});

mp.events.add('pressfkey', () => {
	if (mp.gui.cursor.visible) 
		return;
	
    const localPlayer = mp.players.local;
        if (localPlayer.vehicle === null) {
            let found = false;
            mp.vehicles.forEachInStreamRange((vehicle) => {
                const dist = distanceTo(localPlayer.position, vehicle.position);
                if (!found && (localPlayer.isOnSpecificVehicle(vehicle.handle) || dist < 4)) {
					if (vehicle.isSeatFree(-1)) {
					    found = true;
						localPlayer.taskEnterVehicle(vehicle.handle, 5000, -1, 1.0, 1, 0);	
					}
                }
            });
        }
        else {
            localPlayer.taskLeaveVehicle(localPlayer.vehicle.handle, 0);
        }
});

mp.events.add('pressgkey', () => {
		if (mp.gui.cursor.visible) 
			return;
	
        const localPlayer = mp.players.local;
        if (localPlayer.vehicle === null) {
            let seats = 0;
            let remoteId = 0;
            let isVehicleFound = false;
            mp.vehicles.forEachInStreamRange((vehicle) => {
                const dist = distanceTo(localPlayer.position, vehicle.position);
                if (!isVehicleFound && (localPlayer.isOnSpecificVehicle(vehicle.handle) || dist < 4)) {
                    isVehicleFound = true;
                    seats = vehicle.getMaxNumberOfPassengers();
                    remoteId = vehicle.remoteId;
                    if (seats < 1 || seats === 1) {
                        isVehicleFound = false;
                        mp.players.local.taskEnterVehicle(vehicle.handle, 5000, 0, 2.0, 1, 0);
                    } else {
                        mp.events.call('openSeatCef');
				        seatCef.execute("showSeatSelection(" + seats + ", " + remoteId + ");");
                    }
                }
            });
        }
});

mp.events.add('render', () =>
{
	controls.disableControlAction(0, 58, true);
	controls.disableControlAction(0, 23, true);
	controls.disableControlAction(0, 199, true);
	if (disablekeys == "true") {
		controls.disableControlAction(0, 21, true);
		controls.disableControlAction(0, 24, true);
		controls.disableControlAction(0, 25, true);
		controls.disableControlAction(0, 22, true);
	}
	
	if(controls.isDisabledControlJustPressed(0, 58))
	{
		mp.events.call('pressgkey');
	}
	
	if (disablekeys == "false") {
		if(controls.isDisabledControlJustPressed(0, 23))
		{
			mp.events.call('pressfkey');
		}
	}

	if(controls.isDisabledControlJustPressed(0, 199))
	{
		mp.events.call('PlayerSmartphone');
	}
});

mp.events.add('takeSeat', (seatNum, remoteId) => {
    const vehicle = mp.vehicles.atRemoteId(remoteId);
    let seats = vehicle.getMaxNumberOfPassengers();
    if (seats > 6) {
        if(seatNum < 4){
            mp.players.local.taskEnterVehicle(vehicle.handle, 5000, seatNum, 2.0, 1, 0);
        } else {
			mp.players.local.taskWarpIntoVehicle(vehicle.handle, seatNum);
        }
    }
    else {
        mp.players.local.taskEnterVehicle(vehicle.handle, 5000, seatNum, 2.0, 1, 0);
    }
    mp.events.call('closeSeatCef');
});

function distanceTo(vec1, vec2) {
     return Math.hypot(vec2.x - vec1.x, vec2.y - vec1.y, vec2.z - vec1.z);
}