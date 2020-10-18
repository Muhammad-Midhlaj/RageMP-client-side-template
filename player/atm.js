// ATM //
var atmIndex = 0;
var atmTcheck = 0;
let ATMTemp = "";

mp.events.add('openatm', () => {
    if (global.menuCheck()) return;
    mp.gui.emmit('window.pages.updateDynamicPage("atm")');
    global.menuOpen(false);
});

mp.events.add('closeatm', () => {
    global.menuClose(false);
    mp.gui.emmit('window.atm.reset()');
    mp.gui.emmit('window.pages.updateDynamicPage("")');
});

mp.events.add('setatm', (num, name, bal, sub) => {
    mp.gui.emmit(`window.atm.set('${num}','${name}','${bal}','${sub}')`);
});

mp.events.add('setbank', (bal) => {
    mp.gui.emmit(`window.atm.setBalance(${bal})`);
});

mp.events.add('atmCB', (type, data) => {
    mp.events.callRemote('atmCB', type, data);
});

mp.events.add('atmVal', (data) => {
    if (new Date().getTime() - atmTcheck < 1000) {
        mp.events.callRemote('atmDP');
    } else {
        mp.events.callRemote('atmVal', data);
        atmTcheck = new Date().getTime();
    }
});

mp.events.add('atmOpen', (data) => {
    mp.gui.emmit(`window.atm.open(${data})`);
});

mp.events.add('atmOpenBiz', (data1, data2) => {
    mp.gui.emmit(`window.atm.open([3, ${data1}, ${data2}])`);
});

mp.events.add('atm', (index, data) => 
{
    if (index == 4) {
        ATMTemp = data;
        mp.gui.emmit('window.atm.change(44)');
    }
    else if (index == 44) {
        mp.events.callRemote('atm', 4, data, ATMTemp);
        mp.gui.emmit('atm.reset()');
        return;
    }
    else if (index == 33) {
        mp.events.callRemote('atm', 3, data, ATMTemp);
    }
    else {
        mp.events.callRemote('atm', index, data);
        mp.gui.emmit('atm.reset()');
    }
});