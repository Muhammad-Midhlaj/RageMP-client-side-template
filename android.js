let phone;
var phoneWindow = null;
var phoneOppened = false;
phone = mp.browsers.new('package://cef/android.html');
global.isPhoneOpen = false;

mp.events.add('stayShow', () => {
	// phone.execute('console.log("stayShow");');
	global.isPhoneOpen = true;
	mp.gui.cursor.visible = true;
});
mp.events.add('phoneShow', () => {
	// phone.execute('console.log("phoneShow");');
	global.isPhoneOpen = true;
	phone.execute('show();');
	mp.gui.cursor.visible = true;
});
mp.events.add('phoneOpen', (data, phoneNumber, param2, param3) => {
	phone.execute('console.log("phoneOpen");');
	mp.gui.cursor.visible = true;

	var id;
	var canHome;
	var canBack;
	var items;

	if (data == 'ads') {
		id = data;
		canHome = phoneNumber;
		canBack = param2;
		items = param3;
	}
	else if (data == 'messages') {
		id = data;
		canHome = phoneNumber;
		canBack = param2;
		items = param3;
	}
	else {
		var json = JSON.parse(data);
		id = json[0];
		canHome = json[3];
		canBack = json[2];
		items = JSON.stringify(json[1]);
	}

	var exec = "";
	exec += "open('" + id + "'," + canHome + "," + canBack + ",'"  + items + "');";
	exec += "setPhone('" + JSON.stringify(phoneNumber) + "');";

	phone.execute(exec);
});
mp.events.add('phoneChange', (ind, data) => {
	// phone.execute('console.log("phoneChange");');
	var exec = "change(" + ind + ",'" + data + "');";
	//mp.gui.chat.push(exec);
	phone.execute(exec);
});
mp.events.add('phoneHide', () => {
	global.isPhoneOpen = false;
	// phone.execute('console.log("phoneHide");');
	phone.execute('hideReset();');
	mp.gui.cursor.visible = false;
});
mp.events.add('phoneClose', () => {
	global.isPhoneOpen = false;
	// phone.execute('console.log("phoneClose");');
	phone.execute('hide();');
	mp.gui.cursor.visible = false;
});
// // // //
mp.events.add('phoneCallback', (itemid, event, data) => {
	// phone.execute('console.log("phoneCallback");');
	mp.events.callRemote('Phone', 'callback', itemid, event, data);
	//mp.gui.chat.push(itemid+":"+event+":"+data);
});
mp.events.add('phoneNavigation', (btn) => {
	mp.events.callRemote('Phone', 'navigation', btn);
});

mp.events.add('openAds', () => {
	mp.events.callRemote('Phone', 'ads');
});

mp.events.add('inputCallback', (type, text, price) => {
	mp.events.callRemote('inputCallback', type, text, price);
});

mp.events.add('UpdateMoneyPhone', function (temp, amount) {
		phone.execute(`android.user.balance=${temp}`);
});

mp.events.add('UpdateBankPhone', function (temp, amount) {
		phone.execute(`android.user.bankBalance=${temp}`);
});

mp.events.add('advertAdded', function () {
		phone.execute("android.adAdded()");
});


mp.events.add('callIn', (number) => {
	var exec = "callIn("+number+");";
	phone.execute(exec);
});
mp.events.add('callOut', (number) => {
	var exec = "callOut("+number+");";
	phone.execute(exec);
});
mp.events.add('endcall', () => {
	var exec = "endcall();";
	phone.execute(exec);
});
mp.events.add('callAccepted', () => {
	var exec = "callAccepted();";
	phone.execute(exec);
});

mp.events.add('phone_endcall', () => {
	mp.events.callRemote('phone_endcall');
});
mp.events.add('phone_callaccept', () => {
	mp.events.callRemote('phone_callaccept');
});

// // //
/*mp.events.add("playerQuit", (player, exitType, reason) => {
	if (phone !== null) {
		if (player.name === localplayer.name) {
			phone.destroy();
			phone = null;
			phoneOppened = false;
			phoneWindow = null;
		}
	}
});*/