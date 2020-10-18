global.afkSecondsCount = 0;

setInterval(function () {
    if (!global.menuOpened) {

        global.afkSecondsCount++;
        if (global.afkSecondsCount >= 900) {
			if(localplayer.getVariable('IS_ADMIN') == true) global.afkSecondsCount = 0;
			else {
				mp.gui.chat.push('You were kicked out for AFK for more than 15 minutes.');
				mp.events.callRemote('kickclient');
			}
        }
    }
}, 1000);