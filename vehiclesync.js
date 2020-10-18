mp.game.vehicle.defaultEngineBehaviour = false;
mp.events.add("VehStream_SetEngineStatus", (veh, status) => {
    try {
        if (veh !== undefined) {
            veh.setEngineOn(status, status, !status);
			veh.setUndriveable(!status);
        }
    } catch (e) { }
});

mp.events.add("VehStream_SetLockStatus", (veh, status) => {
    try {
        if (veh && mp.vehicles.exists(veh)) {
            if (veh !== undefined) {
                if (status) {
                    veh.setDoorsLocked(2);
                    mp.game.audio.playSoundFromEntity(1, "Remote_Control_Close", veh.handle, "PI_Menu_Sounds", true, 0);
                } else {
                    veh.setDoorsLocked(1);
                    mp.game.audio.playSoundFromEntity(1, "Remote_Control_Open", veh.handle, "PI_Menu_Sounds", true, 0);
                }
            }
        }
    } catch (e) { }
});

mp.events.add("VehStream_SetVehicleHeadlightsColor", (veh, color) => {
    try {
        if (veh && mp.vehicles.exists(veh)) {
            if (veh !== undefined) {
                if (color > 0) {
                    veh.setMod(22, 0);
                    mp.game.invoke(global.getNative("_SET_VEHICLE_HEADLIGHTS_COLOUR"), veh.handle, color);
                }
                else {
                    veh.setMod(22, color);
                }
            }
        }
    } catch (e) { }
});

mp.events.add("VehStream_SetVehicleNeonColor", (veh, colors) => {
    try {
        if (veh && mp.vehicles.exists(veh)) {
            if (veh !== undefined) {
                veh.setNeonLightsColour(colors[0], colors[1], colors[2]);

                veh.setNeonLightEnabled(0, true);
                veh.setNeonLightEnabled(1, true);
                veh.setNeonLightEnabled(2, true);
                veh.setNeonLightEnabled(3, true);
            }
        }
    } catch (e) { }
});

mp.events.add("VehStream_PlayerExitVehicleAttempt", (entity, enginestate) => {
	mp.events.call("VehStream_SetEngineStatus", entity, enginestate);
});

mp.events.add("VehStream_PlayerEnterVehicle", (entity, seat, enginestate) => {
	mp.events.call("VehStream_SetEngineStatus", entity, enginestate);
});
	
mp.events.add("playerEnterVehicle", (entity, seat) => {
    try {
        if (seat == 0) {
            if (entity.getVariable('BOOST') != undefined) {
                var boost = entity.getVariable('BOOST');
                entity.setEnginePowerMultiplier(boost);
                entity.setEngineTorqueMultiplier(boost);
            }
        }
    } catch (e) { }
});

mp.events.add("VehStream_SetVehicleDoorStatus_Single", (veh, door, state) => {
    try {
        if (veh && mp.vehicles.exists(veh)) {
            if (veh !== undefined) {
                if (state === 0) {
                    veh.setDoorShut(door, false);
                }
                else if (state === 1) {
                    veh.setDoorOpen(door, false, false);
                }
                else {
                    veh.setDoorBroken(door, true);
                }
            }
        }
    } catch (e) { }
});

mp.events.add("VehStream_SetVehicleDoorStatus", (...args) => {
    try {
        if (args[0] && mp.vehicles.exists(args[0])) {
            if (args[0] !== undefined) {
                let y = 0;
                for (y = 1; y < args.length; y++) {
                    if (args[y] === 0) {
                        args[0].setDoorShut(y - 1, false);
                    }
                    else if (args[y] === 1) {
                        args[0].setDoorOpen(y - 1, false, false);
                    }
                    else {
                        args[0].setDoorBroken(y - 1, true);
                    }
                }
            }
        }
    } catch (e) { }
});

mp.events.add("VehStream_FixStreamIn", (entity, data) => {
    if (entity && entity.type !== "vehicle") return;
    if (mp.vehicles.exists(entity)) {
        let typeor = typeof entity.getVariable('VehicleSyncData');
        let actualData = entity.getVariable('VehicleSyncData');

        //Do it anyway
        entity.setUndriveable(true);

        if (typeor !== 'undefined') {
            actualData = JSON.parse(actualData);
            entity.setEngineOn(actualData.Engine, true, false);
            entity.setUndriveable(true);

            if (actualData.Locked)
                entity.setDoorsLocked(2);
            else
                entity.setDoorsLocked(1);

            for (x = 0; x < 8; x++) {
                if (actualData.Door[x] === 1)
                    entity.setDoorOpen(x, false, false);
                else if (actualData.Door[x] === 0)
                    entity.setDoorShut(x, true);
                else
                    entity.setDoorBroken(x, true);
            }
        }

        data = JSON.parse(data);
        entity.setNumberPlateText(data[0]);
        entity.setColours(data[1], data[2]);
        if (data[3] != null) {
            //mp.gui.chat.push('VehStream_FixStreamIn check');
            data = data[3];

            entity.setMod(4, data.Muffler);
            entity.setMod(3, data.SideSkirt);
            entity.setMod(7, data.Hood);
            entity.setMod(0, data.Spoiler);
            entity.setMod(6, data.Lattice);
            entity.setMod(8, data.Wings);
            entity.setMod(10, data.Roof);
            entity.setMod(48, data.Vinyls);
            entity.setMod(1, data.FrontBumper);
            entity.setMod(2, data.RearBumper);

            entity.setMod(11, data.Engine);
            entity.setMod(18, data.Turbo);
            entity.setMod(13, data.Transmission);
            entity.setMod(15, data.Suspension);
            entity.setMod(12, data.Brakes);
            entity.setMod(14, data.Horn);

            entity.setWindowTint(data.WindowTint);

            entity.setCustomPrimaryColour(data.PrimColor.Red, data.PrimColor.Green, data.PrimColor.Blue);
            entity.setCustomSecondaryColour(data.SecColor.Red, data.SecColor.Green, data.SecColor.Blue);

            entity.setWheelType(data.WheelsType);
            entity.setMod(23, data.Wheels);

            if (data.Headlights >= 1) {
                entity.setMod(22, 0);
                mp.game.invoke(global.getNative("_SET_VEHICLE_HEADLIGHTS_COLOUR"), entity.handle, data.Headlights);
            }
            else {
                entity.setMod(22, data.Headlights);
            }

            if (data.NeonColor.Alpha != 0) {
                entity.setNeonLightsColour(data.NeonColor.Red, data.NeonColor.Green, data.NeonColor.Blue);

                entity.setNeonLightEnabled(0, true);
                entity.setNeonLightEnabled(1, true);
                entity.setNeonLightEnabled(2, true);
                entity.setNeonLightEnabled(3, true);
            }
        }
    }
});

//Sync data on stream in
mp.events.add("entityStreamIn", (entity) => {
    try {
        if (entity.type !== "vehicle") return;
        if (entity && mp.vehicles.exists(entity))
        {
            let typeor = typeof entity.getVariable('VehicleSyncData');
            let actualData = entity.getVariable('VehicleSyncData');

            //Needed to stop vehicles from freaking out
            mp.game.streaming.requestCollisionAtCoord(entity.position.x, entity.position.y, entity.position.z);
            //mp.game.invoke(getNative("REQUEST_ADDITIONAL_COLLISION_AT_COORD"), entity.position.x, entity.position.y, entity.position.z);
            entity.setLoadCollisionFlag(true);
            entity.trackVisibility();

            //Set doors unbreakable for a moment
            let x = 0;
            for (x = 0; x < 8; x++) {
                entity.setDoorBreakable(x, false);
            }

            //Do it anyway
            entity.setUndriveable(true);

            if (typeor !== 'undefined') {
                actualData = JSON.parse(actualData);
                entity.setEngineOn(actualData.Engine, true, false);
                entity.setUndriveable(true);

                if (actualData.Locked)
                    entity.setDoorsLocked(2);
                else
                    entity.setDoorsLocked(1);

                for (x = 0; x < 8; x++) {
                    if (actualData.Door[x] === 1)
                        entity.setDoorOpen(x, false, false);
                    else if (actualData.Door[x] === 0)
                        entity.setDoorShut(x, true);
                    else
                        entity.setDoorBroken(x, true);
                }

                if (typeof entity.getVariable('HeadlightsColor') !== 'undefined') {
                    let headlightsColor = entity.getVariable('HeadlightsColor');
                    if (headlightsColor > 0) {
                        entity.setMod(22, 0);
                        mp.game.invoke(global.getNative("_SET_VEHICLE_HEADLIGHTS_COLOUR"), entity.handle, headlightsColor);
                    }
                    else {
                        entity.setMod(22, headlightsColor);
                    }
                }

                if (typeof entity.getVariable('NeonColor') !== 'undefined') {
                    let neonColors = entity.getVariable('NeonColor');

                    entity.setNeonLightsColour(neonColors[0], neonColors[1], neonColors[2]);

                    entity.setNeonLightEnabled(0, true);
                    entity.setNeonLightEnabled(1, true);
                    entity.setNeonLightEnabled(2, true);
                    entity.setNeonLightEnabled(3, true);
                }
            }
            else
                mp.events.callRemote("VehStream_RequestFixStreamIn", entity);

            //Make doors breakable again
            setTimeout(() => {
                for (x = 0; x < 8; x++) {
                    if (entity && mp.vehicles.exists(entity))
                        entity.setDoorBreakable(x, true);
                }
            }, 1500);
        }
    } catch (e) { }
});