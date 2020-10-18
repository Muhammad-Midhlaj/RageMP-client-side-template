global.afkSecondsCount = 0;

setInterval(function () {
    if (!global.menuOpened) {

        global.afkSecondsCount++;
        if (global.afkSecondsCount >= 900) {
			if(localplayer.getVariable('IS_ADMIN') == true) global.afkSecondsCount = 0;
			else {
				mp.gui.chat.push('Вы были исключены из игры за AFK более 15 минут.');
				mp.events.callRemote('kickclient');
			}
        }
    }
}, 1000);