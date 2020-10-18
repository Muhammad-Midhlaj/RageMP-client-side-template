function set(data) {
    data = JSON.parse(data);
    $('.boxRespawnOnExit').css('display', 'block');

    if (data[1] === true) $('.boxRespawnFractions').css('display', 'block');
    else $('.noBox2').css('display', 'block');

    if (data[2] === true) $('.boxRespawnHome').css('display', 'block');
    else $('.noBox3').css('display', 'block');
}

function spawn(id) {
    mp.trigger('spawn', id);
}