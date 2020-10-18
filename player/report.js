var reportactive = false;

mp.events.add('addreport', (id_, author_, quest_) => {
    mp.gui.emmit(`addReport(${id_},'${author_}','${quest_}', false, '')`);
    mp.events.call('notify', 0, 2, "Пришел новый репорт!", 3000);
})

mp.events.add('setreport', (id, name) => {
    mp.gui.emmit(`setStatus(${id}, '${name}')`);
})

mp.events.add('delreport', (id) => {
    mp.gui.emmit(`deleteReport(${id})`);
})

mp.events.add('takereport', (id, r) => {
    mp.events.callRemote('takereport', id, r);
})

mp.events.add('sendreport', (id, a) => {
    mp.events.callRemote('sendreport', id, a);
})

mp.events.add('exitreport', () => {
	global.menuClose();
	reportactive = false;
    mp.gui.cursor.visible = false;
})
