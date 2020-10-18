const movementClipSet = "move_ped_crouched";
const strafeClipSet = "move_ped_crouched_strafing";
const clipSetSwitchTime = 0.5;

const loadClipSet = (clipSetName) => {
    mp.game.streaming.requestClipSet(clipSetName);
    while (!mp.game.streaming.hasClipSetLoaded(clipSetName)) mp.game.wait(0);
};

// load clip sets
loadClipSet(movementClipSet);
loadClipSet(strafeClipSet);

// apply clip sets if streamed player is crouching
mp.events.add("entityStreamIn", (entity) => {
    if (entity.type === "player" && entity.getVariable("isCrouched")) {
        entity.setMovementClipset(movementClipSet, clipSetSwitchTime);
        entity.setStrafeClipset(strafeClipSet);
    }
});

// apply/reset clip sets when isCrouched changes for a streamed player
mp.events.addDataHandler("isCrouched", (entity, value, oldValue) => {
    if (entity.type !== "player") return;
    if (value) {
        entity.setMovementClipset(movementClipSet, clipSetSwitchTime);
        entity.setStrafeClipset(strafeClipSet);
    } else {
        entity.resetMovementClipset(clipSetSwitchTime);
        entity.resetStrafeClipset();
    }
});

// CTRL key to toggle crouching
mp.keys.bind(0x11, false, () => {
    if (mp.tabletActive || mp.chatActive || mp.consoleActive || mp.autoSaloonActive || mp.inventoryActive || mp.tradeActive 
        || mp.playerMenuActive || mp.documentsActive || mp.houseMenuActive || mp.selectMenuActive || mp.game.ui.isPauseMenuActive() || mp.players.local.vehicle) return;
    
    mp.events.callRemote("toggleCrouch");
});