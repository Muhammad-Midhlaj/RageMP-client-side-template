global.deathTimerOn = false;
var deathTimer = 0;

// Disable auto screen fade
mp.game.gameplay.disableAutomaticRespawn(true);
mp.game.gameplay.ignoreNextRestart(true);
mp.game.gameplay.setFadeOutAfterDeath(false);
mp.game.gameplay.setFadeInAfterDeathArrest(false);
mp.game.gameplay.setFadeInAfterLoad(false);

mp.events.add('DeathTimer', (time) => {

    if (time === false)
    {
        global.deathTimerOn = false;
    }
    else 
    {
        global.deathTimerOn = true;
        deathTimer = new Date().getTime() + time;
    }
});

mp.events.add('render', () => {

    var isDeath = global.localplayer.getVariable('InDeath');

    if (isDeath) 
    {
        mp.game.controls.disableAllControlActions(2);
        mp.game.controls.enableControlAction(2, global.Inputs.LOOK_LR, true);
        mp.game.controls.enableControlAction(2, global.Inputs.LOOK_UD, true);
        mp.game.controls.enableControlAction(2, global.Inputs.LOOK_UP_ONLY, true);
        mp.game.controls.enableControlAction(2, global.Inputs.LOOK_DOWN_ONLY, true);
        mp.game.controls.enableControlAction(2, global.Inputs.LOOK_LEFT_ONLY, true);
        mp.game.controls.enableControlAction(2, global.Inputs.LOOK_RIGHT_ONLY, true);
    }


    if (global.deathTimerOn) 
    {
        var secondsLeft = Math.trunc((deathTimer - new Date().getTime()) / 1000);
        var minutes = Math.trunc(secondsLeft / 60);
        var seconds = secondsLeft % 60;

        mp.gui.execute(`console.log("tick")`);
        mp.game.graphics.drawText(`До смерти осталось ${global.formatIntZero(minutes, 2)}:${global.formatIntZero(seconds, 2)}`, [0.5, 0.8], {
            font: 0,
            color: [255, 255, 255, 200],
            scale: [0.35, 0.35],
            outline: true
        });
    }

    if (
        mp.game.controls.isControlPressed(0, 32) || 
        mp.game.controls.isControlPressed(0, 33) || 
        mp.game.controls.isControlPressed(0, 321) ||
        mp.game.controls.isControlPressed(0, 34) || 
        mp.game.controls.isControlPressed(0, 35) || 
        mp.game.controls.isControlPressed(0, 24) || 
        isDeath == true
    )
    {
        global.afkSecondsCount = 0;
    }
    else if (global.localplayer.isInAnyVehicle(false) && global.localplayer.vehicle.getSpeed() != 0) 
    {
        global.afkSecondsCount = 0;
    } 
    else if(global.spectating) 
    { // Чтобы не кикало администратора в режиме слежки
		global.afkSecondsCount = 0;
	}
});