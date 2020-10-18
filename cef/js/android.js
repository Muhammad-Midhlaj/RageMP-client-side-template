var App = null;
var start_open_contacts = false;
var AppToScreen = {
	mainmenu: {
		name: 'main',
		callback: function (data) {
			if ('my_phone' != android.currScreen) {
				console.log(android.currScreen, 'Open home');
				android.currScreen = this.name;
			} else {
			}

			if (data[1][0] != undefined && data[1][0] === 'acceptcall') {
				console.log(data[1][0]);
			}
		}
	},
	gps: {
		name: 'gps',
		callback: function (data) {
			android.currScreen = this.name;
			android.gpsList = data;
		}
	},
	auction: {
		name: 'auction',
		callback: function(data) {
			android.currScreen = this.name;
		}
	},
	messages: {
		name: 'messages',
		callback: function (data) {
			let dialogList = [];
			//U.trigger('notify', 1, 9, data, 3000);

			for (var i = 0; i < data.length; i++) {
				let item = data[i];
				
				let messagesL = [];
				for(var j = 0; j < item[1].length; j++){
					messagesL.push({
						text: item[1][j][0],
						type: item[1][j][1],
						read: item[1][j][2],
					});
				}
				
				dialogList.push({
					from: item[0],
					name: '',
					messages: messagesL,
				})
			}

			android.messagesList = dialogList;

			/*if (start_open_contacts) {
				// console.log('start_open_contacts');
				start_open_contacts = false;
				U.trigger('phoneNavigation', 'back');
				U.trigger('phoneNavigation', 'home');
				return;
			}*/

			android.currScreen = this.name;
			android.setState('messages');
			android.needBack = true;
		}
	},
	ads: {
		name: 'weazel_news',
		callback: function (data) {
			android.currScreen = this.name;
			// console.log('weazel_news');
			var items = data.Item4;
			// var items = [[123123, 'Lorem ipsum dolor sit.', 400],];
			var ads_items = [];

			for (var i = 0; i < items.length; i++) {
				ads_items.push({
					title: items[i][1],
					price: items[i][2],
					phone: items[i][0],
				});
			}

			android.weazelNewsList = ads_items;
		}
	},
	contacts: {
		name: 'my_phone',
		callback: function (data) {

			let contactsList = [];

			for (var i = 0; i < data.length; i++) {
				let item = data[i];
				if (["header", "call", "add", "back"].includes(item[0])) {
					continue;
				}
				contactsList.push({
					name: item[1],
					number: item[0],
				})
			}

			android.myContacts = contactsList;

			if (start_open_contacts) {
				// console.log('start_open_contacts');
				start_open_contacts = false;
				U.trigger('phoneNavigation', 'back');
				U.trigger('phoneNavigation', 'home');
				return;
			}

			android.currScreen = this.name;
			android.setState('contacts');
			android.needBack = true;
		}
	},

	template: {
		name: 'template',
		callback: function (data) {
			// console.log(data, 'template');
		}
	},
};

function getTime() {
	var d = new Date();
	var h = d.getHours();
	var m = d.getMinutes();
	var s = d.getSeconds();

	return pad(h) + ':' + pad(m);
}

function pad(val) {
	var valString = val + "";
	if (valString.length < 2) {
		return "0" + valString;
	} else {
		return valString;
	}
}

function checkLongClickContact(){
	var start,
	end,
	diff;
	var clickTime = 500;
	var pressTimer;

	$(document).on('mouseup', '.my-phone-screen .wrap .contacts-list .items .item', function(event) {
		end = Date.now();
		diff = (end - start) + 1;
		if (diff > clickTime) {
			android.longClickContact();
		} else {
			android.simpleClickContact();
		}

		return false;
	});
	$(document).on('mousedown', '.my-phone-screen .wrap .contacts-list .items .item', function(event) {
		start = Date.now();
		return false;
	});
}

function setPhone(data) {
	var phoneNumber = JSON.parse(JSON.parse(data));
	if (Array.isArray(phoneNumber)) {
		// console.log(phoneNumber, 'phoneNumber');
		android.user.number = phoneNumber[0];
		android.user.numberBalance = phoneNumber[1];
	}
}

function open(id, canhome, canback, data) {
	// reset();
	show();
	App = id;
	var json = JSON.parse(data);
	// console.log([id, data]);

	if (AppToScreen[id]) {
		console.log("App:" + id);
		AppToScreen[id].callback(json);
	} else {
		console.log('Error: no screen: ' + id);
	}
}
function change(ind, data) {
	console.log([ind, data], 'Changer');
}

function show() {
	$('.phone').css('display', 'block');
	// console.log('show ' + $('.phone').css('display'));
	// if($('.phone').css('display') == 'none') $('.phone').slideDown();
}
function hide() {
	if ('my_phone' == android.currScreen){
		U.trigger('stayShow');
		return;
	}
	$('.phone').css('display', 'none');
	// console.log('hide ' + $('.phone').css('display'));
	// $('.phone').slideUp();
}
function hideReset() {
	if ('my_phone' == android.currScreen){
		U.trigger('stayShow');
		return;
	}
	hide();
	reset();
}
function hideTrigger() {
	U.trigger('phoneHide');
	hide();
}
function reset() {
	console.log('reset');
	android.currScreen = 'main';
	// hide();
}
function getData() {
	var data = {};
	return JSON.stringify(data);
}

function callIn(number){
	console.log('callIn('+number+')');
	android.numberCall = number;
	android.open('my_phone');
	android.setState('callIn');
	android.numberCall = number;
	android.isCalling = true;
	android.isCallTypeOut = false;
}

function callOut(number){
	console.log('callOut('+number+')');
	android.numberCall = number;
	android.isCallOn = false;
	android.setState('callOn');
	android.isCalling = true;
	android.isCallTypeOut = true;
}

function endcall(){
	console.log('endcall');
	android.callIn = false;
	android.isCallOn = false;
	android.isCalling = false;
	// U.trigger('phoneNavigation', 'back');
	android.setState('main');
}
function callAccepted(){
	console.log('callAccepted');
	android.isCallOn = true;
	android.isCalling = true;
}

var android = new Vue({
	el: ".android",
	data: {
		needBack: false,
		showPhone: false,
		isCalling: false,
		timenow: getTime(),
		currScreen: 'main',
		user:{
			balance: 0,
			bankBalance: 0,
			numberBalance: 0,
			number: '-2',
		},
		screens: {
			main: '.main-screen', // done
			weazel_news: '.weazel-news-screen', // done
			online_bank: '.online-bank-screen', // done
			my_number: '.my-number-screen', // done
			car_find: '.car-find-screen', // done
			events: '.events-screen', // done
			gps: '.gps-screen', // done
			music_cloud: '.music-cloud-screen', // done
			auction: '.auction-screen', // done
			trade_board: '.trade-board-screen', // done

			messages: '.messages-screen', // done
			my_phone: '.my-phone-screen',
			internet: '.internet-screen', // no
			camera: '.camera-screen', // no
		},

		state: {
			main:{no:0},
			weazel_news:{list:0, add: 1},
			online_bank:{no:0, transfer:1},
			my_number:{no:0},
			car_find:{list:0, car:1},
			events:{no:0},
			gps:{no:0},
			music_cloud:{player:0, list:1},
			auction:{no:0},
			trade_board:{no:0},

			messages:{list:0,add:1,show:2},
			my_phone:{main:0, contacts:1, newContact: 2, editContact: 3, viewContact: 4, history: 5, callIn: 6, callOn: 7},
			internet:{no:0},
			camera:{no:0},
		},

		state_main: 0,
		state_weazel_news: 0,
		state_online_bank: 0,
		state_my_number: 0,
		state_car_find: 0,
		state_events: 0,
		state_gps: 0,
		state_music_cloud: 0,
		state_auction: 0,
		state_trade_board: 0,

		state_messages: 0,
		state_my_phone: 0,
		state_internet: 0,
		state_camera: 0,

		// gps
		gpsList: [
			// ["header", "Категории", 1, 0, 1, 0, false,[null]],
			// ["Гос.структуры", "Гос.структуры", 3, 0, 1, 0, false,[null]],
			// ["Работы", "Работы", 3, 0, 1, 0, false,[null]],
			// ["Банды", "Банды", 3, 0, 1, 0, false,[null]],
			// ["Мафии", "Мафии", 3, 0, 1, 0, false,[null]],
			// ["Ближайшие места", "Ближайшие места", 3, 0, 1, 0, false,[null]],
			// ["close", "Закрыть", 3, 0, 1, 0, false,[null]],
		],

		// weazel_news
		weazelNewsList: [
			{title: 'Продам авто Sandking', price: '400.000', phone: '6445939'},
			{title: 'Продам авто Sandking', price: '400.000', phone: '6445939'},
			{title: 'Продам авто Sandking', price: '400.000', phone: '6445939'},
			{title: 'Продам авто Sandking', price: '400.000', phone: '6445939'},
			{title: 'Продам авто Sandking', price: '400.000', phone: '6445939'},
			{title: 'Продам авто Sandking', price: '400.000', phone: '6445939'},
			{title: 'Продам авто Sandking', price: '400.000', phone: '6445939'},
			{title: 'Продам авто Sandking', price: '400.000', phone: '6445939'},
			{title: 'Продам авто Sandking', price: '400.000', phone: '6445939'},
			{title: 'Продам авто Sandking', price: '400.000', phone: '6445939'},
			{title: 'Продам авто Sandking', price: '400.000', phone: '6445939'},
			// {title: 'Продам авто Sandking', price: '400.000$', phone: '6445939'},
			// {title: 'Продам авто Sandking', price: '400.000$', phone: '6445939'},
			// {title: 'Продам авто Sandking', price: '400.000$', phone: '6445939'},
			// {title: 'Продам авто Sandking', price: '400.000$', phone: '6445939'},
			// {title: 'Продам авто Sandking', price: '400.000$', phone: '6445939'},
		],
		newAdInp: '',
		newAdInpPrice: '',


		// car_find
		carList: [
			{number: 'M555HS',name: 'SANDKING',image: 'assets/android/img/test/car.svg'},
			{number: 'M555HS',name: 'SANDKING',image: 'assets/android/img/test/car.svg'},
			{number: 'M555HS',name: 'SANDKING',image: 'assets/android/img/test/car.svg'},
			{number: 'M555HS',name: 'SANDKING',image: 'assets/android/img/test/car.svg'},
			{number: 'M555HS',name: 'SANDKING',image: 'assets/android/img/test/car.svg'},
			{number: 'M555HS',name: 'SANDKING',image: 'assets/android/img/test/car.svg'},
		],
		currCar: 0,

		// events
		eventsList:[
			{time: '16:35', fill: 25, count: 50, name:'Гонка Вооружений', image: 'assets/android/img/test/car.svg'},
		],

		// music_cloud
		currMusic: 0,
		is_music_play: false,
		musicList: [
			{title: 'Pappa Raper',desc: 'Light Monday & Sobakasoma feat. Blake',fav: false},
			{title: 'Sing To Me',desc: 'Missio',fav: true},
			{title: 'Smart',desc: 'PHARAOH',fav: false},
			{title: 'Sad Girl',desc: 'Lana Del Rey',fav: false},
			{title: 'Поворот',desc: 'Скриптонит feat. Niman',fav: false},
			{title: 'No Waves',desc: 'FIDLAR',fav: false},
			{title: 'Sad Girl',desc: 'Lana Del Rey',fav: false},
			{title: 'Поворот',desc: 'Скриптонит feat. Niman',fav: false},
			{title: 'No Waves',desc: 'FIDLAR',fav: false},
		],

		// number
		currNumberInput: '',
		searchContact: '',
		numbersToClick:['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'],
		myContacts: [
			// {name: 'Покупает Машину', number: '11111'},
			// {name: 'Костян', number: '22222'},
			// {name: 'Миша Сиплый', number: '33333'},
			// {name: 'Продает дом', number: '44444'},
		],
		callHistory: [
			// '11111',
			// '6445939',
			// '22222',
			// '33333',
			// '4896564',
		],
		currContactId: null,
		contactName: '',
		contactNumber: '',
		isCallOn: false,
		isCallTypeOut: false,
		callTimeSecs: 0,
		numberCall: '',

		// auction
		auctionList: [

		],

		// messages
		messagesList: [
			{
				from: '645939',
				name: '',
				messages: [
					{text: 'Привет это ты продаешь машину?', type: 'in', read: true},
					{text: 'Да 130к', type: 'out'},
				]
			},
			{
				from: '6459122',
				name: 'Миша сиплый',
				messages: [
					{text: 'Нам забили стрелу, сбор на ssss', type: 'in', read: false},
				]
			},
			{
				from: '645939',
				name: '',
				messages: [
					{text: 'Привет это ты продаешь машину?', type: 'in', read: true},
					{text: 'Да 130к', type: 'out'},
					{text: 'Где и когда, я заебался ждать', type: 'in', read: true},
					{text: 'Время идет', type: 'in', read: true},
				]
			},
			{
				from: '6459122',
				name: 'Миша сиплый',
				messages: [
					{text: 'Нам забили стрелу, сбор на ssss', type: 'in', read: false},
				]
			},
			{
				from: '645939',
				name: '',
				messages: [
					{text: 'Привет это ты продаешь машину?', type: 'in', read: true},
					{text: 'Да 130к', type: 'out'},
				]
			},
			{
				from: '6459122',
				name: 'Миша сиплый',
				messages: [
					{text: 'Нам забили стрелу, сбор на ssss', type: 'in', read: false},
				]
			},
			{
				from: '645939',
				name: '',
				messages: [
					{text: 'Привет это ты продаешь машину?', type: 'in', read: true},
					{text: 'Да 130к', type: 'out'},
				]
			},
			{
				from: '6459122',
				name: 'Миша сиплый',
				messages: [
					{text: 'Нам забили стрелу, сбор на ssss', type: 'in', read: false},
				]
			},
		],
		currChat: 0,
	},
	methods: {
		hide: hideTrigger,
		home: function() {
			// if (!Home) return;
			U.trigger('phoneNavigation', 'home');
		},
		back: function() {
			// if (!Back) return;
			U.trigger('phoneNavigation', 'back');
		},
		time: function() {
			this.timenow = getTime();
			if (this.isCallOn) this.callTimeSecs++;
			else this.callTimeSecs = 0;
		},
		open: function(key) {
			// console.log([this.screens, key]);
			if (key === 'my_phone') {
				if (['-1','-2', '0'].includes(this.user.number.toString())) {
					U.trigger('notify', 1, 9, "У Вас нет сим-карты", 3000);
					return;
				}
				if (this.isCalling) {
					var cond;
					cond = (this.isCallOn || (!this.isCallOn && this.isCallTypeOut)) ? 'callOn' : 'callIn';
					this.currScreen = 'my_phone';
					this.setState(cond);
					return;
				}

				this.needBack = true;
				start_open_contacts = true;
				this.openT('contacts');
			}
			this.currScreen = this.screens[key] ? key : 'main';
			this.setState(0);
		},
		openT: function(key) {
			// console.log([this.screens, key]);
			// this.setState(0)
			// this.currScreen = this.screens[key] ? key : 'main';
			if (android.needBack){
				U.trigger('phoneNavigation', 'home');
				android.needBack = false;
			}
			U.trigger('phoneCallback', key, 'button', getData());
		},
		openAsd: function(key) {
			// console.log([this.screens, key]);
			// this.setState(0)
			// this.currScreen = this.screens[key] ? key : 'main';
			U.trigger('openAds');
		},
		isScreen(name){
			return this.currScreen === name;
		},
		mountStates: function(){
			U.KeyCheck('backspace', this.backspaceNumber);
			for (var i = 0; i < this.numbersToClick.length; i++) {
				U.KeyCheck(this.numbersToClick[i], (key) => {
					this.clickOnNumber(key);
				});
			}

			// this.open('my_phone');
			// this.currNumberInput = '123123';
			// this.call('number');
		},

		setState: function(type){
			let key_state = 'state_'+this.currScreen;
			this[key_state] = this.state[this.currScreen][type] || 0;
		},
		isState(type){
			let key_state = 'state_'+this.currScreen;
			let state = this.state[this.currScreen][type] || 0;
			return this[key_state] === state;
		},

		// weazel_news
		sendAd: function () {
			U.trigger('inputCallback', 'make_ad', this.newAdInp, this.newAdInpPrice);
		},
		adAdded: function () {
			this.newAdInp = '';
			this.newAdInpPrice = '';
			this.currScreen = 'weazel_news';
		},
		// gps
		openGps: function (type) {
			U.trigger('phoneCallback', type, 'button', getData());
		},
		// car_find
		openCar: function(id){
			this.setState('car');
			this.currCar = id;
		},

		// music_cloud
		music_play: function(act){this.is_music_play = !this.is_music_play;},
		music_next: function(){if(this.currMusic < this.musicList.length-1) this.currMusic++;},
		music_prev: function(){if(this.currMusic > 0) this.currMusic--;},
		playMusic: function(index){
			this.currMusic = this.musicList[index] ? index : 0;
			this.setState('player');
		},
		favMusic: function(){
			this.musicList[this.currMusic].fav = !this.musicList[this.currMusic].fav;
		},

		// my_phone
		clickOnNumber: function(char){
			if (this.isScreen('my_phone') && this.isState('main')) {
				// if (char === '*') {
				// } else if (char === '#') {
				// } else {
				// }
				if (this.currNumberInput.length >= 9) return;
				this.currNumberInput += char;
			}
		},
		backspaceNumber: function(){
			if (this.isScreen('my_phone') && this.isState('main')){
				this.currNumberInput = this.currNumberInput.slice(0, -1);
			}
		},
		call: function(type){
			if (this.currScreen != 'my_phone') {
				this.open('my_phone');
			}

			if (type === 'number') {
				if (this.currNumberInput === '') return;
				this.numberCall = this.currNumberInput;
				this.currNumberInput = '';
			} else if (type === 'contact') {
				this.numberCall = this.contactNumber;
			} else {
				this.numberCall = type;
			}

			// this.setState('callOn');
			// U.trigger('phoneCallback', this.numberCall, 'button', getData());
			// U.trigger('phoneCallback', 'call', 'button', getData());

			U.trigger('inputCallback', 'numcall', this.numberCall);
		},
		aceptCall: function(){
			U.trigger('phone_callaccept');
		},
		dismissCall: function(){
			console.log('dismissCall');
			this.callIn = false;
			this.isCallOn = false;
			this.isCalling = false;
			U.trigger('phone_endcall');
			// U.trigger('phoneNavigation', 'back');
			// U.trigger('phoneCallback', 'endcall', 'button', getData());
			// this.setState('main');
		},
		longClickContact: function(){
			console.log('longClickContact');
		},
		simpleClickContact: function(){
			console.log('simpleClickContact');
		},
		openContact: function(i){
			let contact = this.myContacts[i];
			this.currContactId = i;

			this.contactName = contact.name;
			this.contactNumber = contact.number;

			U.trigger('phoneCallback', this.contactNumber, 'button', getData());

			this.setState('viewContact');
		},
		deleteContact: function(){
			// if (this.contactName.trim().length < 2 || this.contactNumber.trim().length < 2) return;

			U.trigger('inputCallback', 'smsdel', this.contactNumber);

			this.openT('contacts');

			// this.myContacts = this.myContacts.map((elem, index) => {
			// 	if (index === this.currContactId) {
			// 		elem.name = this.contactName;
			// 		elem.number = this.contactNumber;
			// 	}
			// 	return elem;
			// });

			this.currContactId = null;
			// this.setState('viewContact');
		},
		editContact: function(){
			if (this.contactName.trim().length < 2 || this.contactNumber.trim().length < 2) return;

			U.trigger('inputCallback', 'smsname', this.contactName, this.contactNumber);

			this.openT('contacts');

			// this.myContacts = this.myContacts.map((elem, index) => {
			// 	if (index === this.currContactId) {
			// 		elem.name = this.contactName;
			// 		elem.number = this.contactNumber;
			// 	}
			// 	return elem;
			// });

			this.currContactId = null;
			// this.setState('viewContact');
		},
		newContact: function(){
			if (this.contactName.trim().length < 2 || this.contactNumber.trim().length < 2) return;

			U.trigger('inputCallback', 'smsadd', this.contactNumber, this.contactName);

			this.openT('contacts');

			// let find = this.myContacts.filter(contact => {
			// 	return contact.number == this.contactNumber;
			// });

			// if (find.length == 0) {
			// 	this.myContacts.push({name: this.contactName, number: this.contactNumber});
			// } else {
			// 	this.myContacts = this.myContacts.map((elem) => {
			// 		if (elem.number == this.contactNumber) {
			// 			elem.name = this.contactName;
			// 		}
			// 		return elem;
			// 	});
			// }

			// this.setState('viewContact');
		},
		getContactNameByPhone: function(phone){
			let find = this.myContacts.filter(contact => {
				return contact.number.toString() == phone.toString();
			});
			return (find.length > 0 ? find[0].name : phone);
		},

		// messages
		openChat: function (id){
			this.setState('show');
			this.currChat = id;
		},
		getLastMessagesList: function (){
			var messages = [];
			for (var i = 0; i < this.messagesList.length; i++) {
				var item = this.messagesList[i];
				var from = this.getFromMessage(i);
				for (var j = item.messages.length - 1; j >= 0; j--) {
					// if (item.messages[j].type == 'in') {
						messages.push({
							from: from,
							message: item.messages[j]
						});
						break;
					// }
				}
			}
			return messages;
		},
		getFromMessage: function (id) {
			var item = this.messagesList[id];
			return (item.name.trim() ? item.name : item.from);
		},
	},
	mounted: function() {
		this.mountStates();
		this.getLastMessagesList();
		setInterval(this.time, 1000);
	},
	computed: {
		filteredListContacts() {
			return this.myContacts.filter(contact => {
				return (
					contact.name.toString().toLowerCase().includes(this.searchContact.toString().toLowerCase()) ||
					contact.number.toString().includes(this.searchContact.toString().toLowerCase())
				)
			})
		},
		isEditContact() {
			var states = [
				this.state.my_phone.newContact,
				this.state.my_phone.editContact,
				this.state.my_phone.viewContact,
			];
			return states.includes(this.state_my_phone)
		},
		statusCall() {
			let min = pad(parseInt(this.callTimeSecs / 60));
			let sec = pad(this.callTimeSecs % 60);
			let time = min+':'+sec;
			return this.isCallOn ? 'Длительность вызова ' + time : (
				this.isState('callIn') ? 'Входящий вызов' : 'Иcходящий вызов'
			);
		}
	}
});

$(function() {
	window.ondragstart = function() {return false};

	$(document).on('mousedown', '.a', function(event) {
		var the = $(event.target);
		if(!the.hasClass('a')) the = the.closest('.a');
		the.addClass('mousedown');
	});
	$(document).on('mouseup', '.a', function(event) {
		var the = $(event.target);
		if(!the.hasClass('a')) the = the.closest('.a');
		the.removeClass('mousedown');
	});

	// copy to buf
	var c2b = '.copy2buf';
	var clipboard = new Clipboard(c2b);
	clipboard.on('success', function(e) {
		$(c2b).attr({
			'title':'Copied'
		});
	});
	clipboard.on('error', function(e) {
		$(c2b).attr({
			'title':'Error'
		});
	});

	// checkLongClickContact();

	let is_number_check = (function (e) {
		let val = $(e.target).val().trim();
		val = val.replace(/[^0-9]/g, '');
		$(e.target).val(val);
	});

	$(document).on('keyup', "input.is-number", is_number_check);
	$(document).on('keydown', "input.is-number", is_number_check);

	// U.init_debug();
	// U.init_console();

	// U.KeyCheck('escape', hide);
});
