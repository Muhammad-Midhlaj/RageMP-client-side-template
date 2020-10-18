let elec = null;
let elecopened = false;

mp.events.add('addcandidate', function (Name) {
	try {
		elec.AddItem(new UIMenuItem(Name, "Кандидат"));
		elecopened = true;
		elec.Open();
		mp.gui.cursor.visible = false;
		mp.gui.chat.show(false);
	} catch(e) { }
});

mp.events.add('openelem', (firstname) => {
	try {
		elec = new global.NativeMenu("ВЫБОРЫ", "Номер кандидата: ", new global.Point(50, 50));
		elec.AddItem(new UIMenuItem(firstname, "Кандидат"));
		elec.Close();
		elec.ItemSelect.on(item => {
			if(new Date().getTime() - global.lastCheck < 100) return; 
			global.lastCheck = new Date().getTime();
			if (item instanceof UIMenuItem) {
				mp.events.callRemote("choosedelec", item.Text);
				mp.gui.cursor.visible = false;
				mp.gui.chat.show(true);
				elecopened = false;
				elec.Close();
			}
		});
		elec.MenuClose.on(() => {
			if(elecopened) elec.Open();
		});
	} catch(e) { }
});