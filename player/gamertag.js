
mp.nametags.enabled = false;

var showGamertags = false;

var gameplayCamPos;
var playerTarget;
var playerAimAt;
var width = 0.025; 
var height = 0.004;
var border = 0.001;

mp.keys.bind(global.Keys.VK_5, false, () => { // Turn on, turn off.
    
    if (!global.loggedin || global.chatActive || editing || global.menuOpened) return;
    showGamertags = !showGamertags;
});

mp.events.add('render', (nametags) => {

    if (!global.loggedin) return;

    // Pre draw
    gameplayCamPos = mp.players.local.position;
    playerAimAt = mp.game.player.getEntityIsFreeAimingAt();
    playerTarget = mp.game.player.getTargetEntity();

    // Get variables
    var isAdmin = global.localplayer.getVariable('IS_ADMIN');

    // Admin get target info
    if (
        isAdmin == true &&
        (playerTarget != undefined && playerTarget.handle) || 
        (playerAimAt != undefined && playerAimAt.handle)
    )
    {
        var player = playerTarget;
        if(player == undefined && !player.handle) player = playerAimAt;
        if(player == undefined && !player.handle) return;

        mp.game.graphics.drawText(`${player.name} (${player.remoteId})`, [0.5, 0.8], { font: 4, color: [255, 255, 255, 235], scale: [0.5, 0.5], outline: true });
    }

    // Player gamertags
    if (showGamertags) {

        nametags.forEach(nametag => {
            let [player, x, y, distance] = nametag;
            
            if(distance < 50.0)
            {                
                if(player.getVariable('INVISIBLE') != true && player.getVariable('HideNick') != true)
                {
                    var passportText = '';
                    if (global.passports[player.name] != undefined) passportText = ` | ${global.passports[player.name]}`;
                    var text;
					if(player.getVariable('IS_MASK') == true) {
						text = (isAdmin === true) ? `${player.name} (${player.remoteId}${passportText})` : `ID: ${player.remoteId}`;
					} else {
						text = (isAdmin === true || global.friends[player.name] != undefined || global.passports[player.name] != undefined) ? `${player.name} (${player.remoteId}${passportText})` : `ID: ${player.remoteId}`;
					}
        
                    var localFraction = global.localplayer.getVariable('fraction');
                    var playerFraction = player.getVariable('fraction');
                    if (localFraction != null && playerFraction != null && localFraction === playerFraction)  text = `${player.name} (${player.remoteId}${passportText})`;
        
                    var color = (player.getVariable('REDNAME') === true) ? [255, 0, 0, 255] : [255, 255, 255, 255];
        
                    var isInVehicle = (player.vehicle);
                    if (isInVehicle) y += 0.065;
    
                    drawPlayerTag(player, x, y, text, color);
                    drawPlayerVoiceIcon(player, x, y);
                }
            }
        })
    }
});

function drawPlayerTag(player, x, y, displayname, color)
{
    //var position = player.getBoneCoords(12844, 0.6, 0, 0); //player.position;
    //position.z += 1.5;
    //var frameTime = lastFrameTime;
    //const frameRate = 1.0 / (mp.game.invoke("0x15C40837039FFAF7") / );

    // draw user name
    mp.game.graphics.drawText(displayname, [x, y], { font: 4, color: color, scale: [0.35, 0.35], outline: true });

    // draw health & ammo bar
    if (
        (playerTarget != undefined && player.handle == playerTarget.handle) || 
        (playerAimAt != undefined && player.handle == playerAimAt.handle)
        || global.spectating)
    {
        y += 0.04;
        let health = player.getHealth();
        health = (health <= 100) ? (health / 100) : ((health - 100) / 100);

        let armour = player.getArmour() / 100;
        if (armour > 0) {

            mp.game.graphics.drawRect(x, y, width + border * 2, height + border * 2, 0, 0, 0, 200);
            mp.game.graphics.drawRect(x, y, width, height, 150, 150, 150, 255);
            mp.game.graphics.drawRect(x - width / 2 * (1 - health), y, width * health, height, 255, 255, 255, 200);

            y -= 0.007;

            mp.game.graphics.drawRect(x, y, width + border * 2, height + border * 2, 0, 0, 0, 200);
            mp.game.graphics.drawRect(x, y, width, height, 41, 66, 78, 255);
            mp.game.graphics.drawRect(x - width / 2 * (1 - armour), y, width * armour, height, 48, 108, 135, 200);
        }
        else {

            mp.game.graphics.drawRect(x, y, width + border * 2, height + border * 2, 0, 0, 0, 200);
            mp.game.graphics.drawRect(x, y, width, height, 150, 150, 150, 255);
            mp.game.graphics.drawRect(x - width / 2 * (1 - health), y, width * health, height, 255, 255, 255, 200);
        }
    }
}

function drawPlayerVoiceIcon(player, x, y)
{
    const isMuted = false;
    const sprite = (!isMuted) ? 'leaderboard_audio_3' : 'leaderboard_audio_mute';

    if (player.isVoiceActive) drawVoiceSprite("mpleaderboard", sprite, [0.7, 0.7], 0, [255, 255, 255, 255], x, y - 0.02 * 0.7);
}

function drawVoiceSprite(dist, name, scale, heading, colour, x, y, layer) 
{
    const resolution = mp.game.graphics.getScreenActiveResolution(0, 0),
        textureResolution = mp.game.graphics.getTextureResolution(dist, name),
        textureScale = [(scale[0] * textureResolution.x) / resolution.x, (scale[1] * textureResolution.y) / resolution.y]

    if (mp.game.graphics.hasStreamedTextureDictLoaded(dist) === 1) 
    {
        if (typeof layer === 'number') mp.game.graphics.set2dLayer(layer);
        mp.game.graphics.drawSprite(dist, name, x, y, textureScale[0], textureScale[1], heading, colour[0], colour[1], colour[2], colour[3]);
    } 
    else mp.game.graphics.requestStreamedTextureDict(dist, true)
}