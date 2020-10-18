global.gtainterface = {
    safezone: 0.0,
    aspect_ratio: 0.0,
    res: {x: 0, y: 0}
};

var last_pausemenustatus = false;
var last_cursorstate = false;

mp.gui.emmit = function(execute, log = true) {
    if(log) {
        var text = `[cef debug] ${execute}`
        mp.gui.execute(`console.log(${JSON.stringify(text)})`);
        //mp.gui.chat.push(text);
    }
    mp.gui.execute(execute);
}

mp.gui.emmit("window.location = 'package://interface/index.html'");

setInterval(function() {

    // Исправляем баг с курсором в меню паузы
    if (last_pausemenustatus == false && mp.game.ui.isPauseMenuActive())
    {
        last_pausemenustatus = true;
        last_cursorstate = mp.gui.cursor.visible;
        mp.gui.cursor.visible = false;
    }
    else if(last_pausemenustatus == true && !mp.game.ui.isPauseMenuActive())
    {
        last_pausemenustatus = false;
        mp.gui.cursor.visible = last_cursorstate;
    }

    // Обновляем безопасную зону
    var updateanchor = false;

    var temp_safezone = mp.game.graphics.getSafeZoneSize();
    if (temp_safezone != global.gtainterface.safezone)
    {
        global.gtainterface.safezone = temp_safezone;

        updateanchor = true;
    }

    var temp_aspect_ratio = mp.game.graphics.getScreenAspectRatio(false);
    if (temp_aspect_ratio != global.gtainterface.aspect_ratio)
    {
        global.gtainterface.aspect_ratio = temp_aspect_ratio;

        updateanchor = true;
    }

    var temp_res = mp.game.graphics.getScreenActiveResolution(0, 0);
    if (temp_res.x != global.gtainterface.res.x || temp_res.y != global.gtainterface.res.y)
    {
        global.gtainterface.res = temp_res;

        updateanchor = true;
    }

    if (updateanchor) UpdateAnchor();

}, 50);

function UpdateAnchor()
{
    var new_safezone_info = {};

    var xscale = 1.0 / global.gtainterface.res.x;
    var yscale = 1.0 / global.gtainterface.res.y;

    new_safezone_info.minimap_width = xscale * (global.gtainterface.res.x / (4 * global.gtainterface.aspect_ratio));
    new_safezone_info.minimap_height = yscale * (global.gtainterface.res.y / 5.674);

    new_safezone_info.minimap_padding_left = xscale * (global.gtainterface.res.x * ((1.0 / 20.0) * ((Math.abs(global.gtainterface.safezone - 1.0)) * 10)));
    new_safezone_info.minimap_padding_right = new_safezone_info.minimap_padding_left + new_safezone_info.minimap_width;

    /*if(global.gtainterface.res.x >= 3440)
    {
        new_safezone_info.minimap_padding_left *= 9.5;
        new_safezone_info.minimap_padding_right *= 9.5;
    }
    else if(global.gtainterface.res.x >= 2560)
    {
        new_safezone_info.minimap_padding_left *= 9.0;
        new_safezone_info.minimap_padding_right *= 9.0;
    }*/

    new_safezone_info.minimap_padding_bottom = 1.0 - yscale * (global.gtainterface.res.y * ((1.0 / 20.0) * ((Math.abs(global.gtainterface.safezone - 1.0)) * 10)));
    new_safezone_info.minimap_padding_top = new_safezone_info.minimap_padding_bottom - new_safezone_info.minimap_height;

    new_safezone_info.xunit = xscale;
    new_safezone_info.yunit = yscale;

    new_safezone_info.safezone_padding_leftright = new_safezone_info.minimap_padding_left;
    new_safezone_info.safezone_padding_topbottom = (1.0 - new_safezone_info.minimap_padding_bottom);

    global.gtainterface.safezone_info = new_safezone_info;

    mp.gui.emmit(`window.hud.updateSafeZone(${JSON.stringify(new_safezone_info)})`);
}