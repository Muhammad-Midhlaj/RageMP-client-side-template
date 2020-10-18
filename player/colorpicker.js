// Color picker //
mp.events.add('showColorp', () => {
    mp.gui.emmit(`window.modal.updateModalMenu("color");`);
});

mp.events.add('hideColorp', () => {
    mp.gui.emmit(`window.modal.updateModalMenu("");`);
});

// Selected color event
mp.events.add('scolor', (c) => {
    // JSON String
    // c = {r: 255, g: 255, b: 255}
    c = JSON.parse(c);
    mp.events.call("tunColor", c)
});


// Button events
mp.events.add('colors', (btn) => {
    switch (btn) {
        case "apply":
            //onapply
            break;
        case "cancel":
            //onbreak
            break;
    }
})