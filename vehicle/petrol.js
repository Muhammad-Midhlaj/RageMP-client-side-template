// PETROL //

mp.events.add('openPetrol', () => {
    if (global.menuCheck()) return;
    global.menuOpen(false);
    mp.gui.emmit(`window.modal.updateModalMenu("petrol");`);
});

mp.events.add('petrol', (data) => {
    mp.events.callRemote('petrol', data);
    global.menuClose(false);
    mp.gui.emmit('window.petrol.reset()');
    mp.gui.emmit(`window.modal.updateModalMenu("");`);
});

mp.events.add('petrol.full', () => {
    mp.events.callRemote('petrol', 9999);
    global.menuClose(false);
    mp.gui.emmit('window.petrol.reset()');
    mp.gui.emmit(`window.modal.updateModalMenu("");`);
});

mp.events.add('petrol.gov', () => {
    mp.events.callRemote('petrol', 99999);
    global.menuClose(false);
    mp.gui.emmit('window.petrol.reset()');
    mp.gui.emmit(`window.modal.updateModalMenu("");`);
});

mp.events.add('closePetrol', () => {
    global.menuClose(false);
    mp.gui.emmit('window.petrol.reset()');
    mp.gui.emmit(`window.modal.updateModalMenu("");`);
});