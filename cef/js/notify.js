function notify(type, layout, message, time) {
    var types = ['alert', 'error', 'success', 'information', 'warning'];
    var layouts = ['top', 'topLeft', 'topCenter', 'topRight', 'center', 'centerLeft', 'centerRight', 'bottom', 'bottomLeft', 'bottomCenter', 'bottomRight'];
    var icons = ['<i class=""><img src="UI/notification/error.png" width="25px"></i></i>', '<i class=""><img src="UI/notification/error.png" width="25px"></i>', '<i class=""><img src="UI/notification/success.png" width="25px"></i></i>', '<i class=""><img src="UI/notification/info.png" width="25px"></i>', '<i class=""> <img src="UI/notification/warning.png" width="25px" style="margin-top: -6px;"></i>']
    message = '<div class="text">'+icons[type]+message+'</div>';
    new Noty({
        type: types[type],
        layout: layouts[layout],
        theme: 'fivestar',
        text: message,
        timeout: time,
        progressBar: true,
        animation: {
            open: 'noty_effects_open',
            close: 'noty_effects_close'
        }
    }).show();
}