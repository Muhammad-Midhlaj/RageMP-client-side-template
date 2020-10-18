setInterval(function () {
    var name = (global.localplayer.getVariable('REMOTE_ID') == undefined) ? `Not authorized` : `Player No.${global.localplayer.getVariable("REMOTE_ID")}`; 
	mp.discord.update('Kingsland RolePlay', name);
}, 10000);