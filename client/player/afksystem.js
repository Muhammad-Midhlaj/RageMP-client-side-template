global.afkSecondsCount = 0;

setInterval(function () {
    if (!global.menuOpened) {

        afkSecondsCount++;
        if (afkSecondsCount >= 900) {
			if(localplayer.getVariable('IS_ADMIN') == true) afkSecondsCount = 0;
			else {
				mp.gui.chat.push('Has sido excluido del juego por AFK durante más de 15 minutos.');
				mp.events.callRemote('kickclient');
			}
        }
    }
}, 1000);