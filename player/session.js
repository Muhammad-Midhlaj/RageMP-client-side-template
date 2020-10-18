mp.events.add('adminChange', (adminlevel) => {
    global.pAdmin = adminlevel;
});

mp.events.add('fractionChange', (fraction) => {
    global.pFraction = fraction;
});