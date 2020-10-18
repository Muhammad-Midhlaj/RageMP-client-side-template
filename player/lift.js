// ELEVATOR //
var liftcBack = "";

function openLift(type, cBack) {
    if (global.menuCheck()) return;
    let floors = [
        ["Гараж", "1 этаж", "49 этаж", "Крыша"]
    ];
    let json = JSON.stringify(floors[type]);
    mp.gui.emmit(`window.hud.updateComponent("lift", true)`);
    mp.gui.emmit(`window.lift.set('${json}');`);
    global.menuOpen(false);
    liftcBack = cBack;
}
function closeLift() {
    global.menuClose(false);
    mp.gui.emmit('window.lift.reset()');
    mp.gui.emmit(`window.hud.updateComponent("lift", false)`);
    liftcBack = "";
}

mp.events.add('openlift', (type, cBack) => {
    openLift(type, cBack);
});

mp.events.add('lift', (act, data) => {
    switch (act) {
        case "stop":
            closeLift();
            break;
        case "start":
            mp.events.callRemote(liftcBack, data);
            closeLift();
            break;
    }
});