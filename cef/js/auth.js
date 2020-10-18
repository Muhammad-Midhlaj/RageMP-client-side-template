U.idToLetter = (id) => {
	if(id == 3) return 'R';
	if(id == 2) return 'M';

	return 'L';
};

U.slotNameById = (id) => {
	return 'slot' + U.idToLetter(id);
};

var slots = new Vue({
	el: ".authDiv",
	data: function () {
		return{
			server: 0,
			slotL: ["", "", 7, 0, 0, "", 0, 0],
			slotM: ["", "", 7, 0, 0, "", 0, 0],
			slotR: ["", "", 7, 0, 0, "", 0, 0],
			blockL: ["Бан", "Cam", "then", "when"],
			blockM: ["Бан", "Cam", "then", "when"],
			blockR: ["Бан", "Cam", "then", "when"],
			uuids: [0, 0, 0],
			redbucks: -1,
			login: "username",
			currSlotId: 0,
			currSlot: ["", "", 7, 0, 0, "", 0, 0],
			emptySlot: ["", "", 7, 0, 0, "", 0, 0],

			is_modal: false,

			show_modal_new_char: false,
			disable_new_char_btn: false,

			show_modal_delete: false,

			chooseBuy: false,
			canChoose: false,
		};
	},
	methods: {
		deleteChar: () => {
			U.trigger('delChar', slots.currSlotId, '', '', '');
		}
	}
})

function checkCode(str) {
	let ascii;
	for (let i = 0; i != str.length; i++) {
		ascii = str.charCodeAt(i);
		if (ascii < 48 || ascii > 57) return false;
	}
	return true;
}

function toslots(data) {
	regPage.removeClass('show');
	authPage.removeClass('show');
	restPage.removeClass('show');
	slotsPage.addClass('show');

	console.log(data);
	data = JSON.parse(data);
	if (data[0] == -1) {
		slotL.addClass('free');
	} else {
		if (data[0][0] == 'ban') {
			slots.blockL[0] = data[0][1];
			slots.blockL[1] = data[0][2];
			slots.blockL[2] = data[0][3];
			slots.blockL[3] = data[0][4];

			slotL.addClass('free blocked');
		} else {

			slots.slotL[0] = data[0][0];
			slots.slotL[1] = data[0][1];
			slots.slotL[2] = data[0][2];
			slots.slotL[3] = data[0][3];
			slots.slotL[4] = 3 + data[0][2] * 3;
			slots.slotL[5] = data[0][4];
			slots.slotL[6] = data[0][5];
			slots.slotL[7] = data[0][6];
			slots.uuids[0] = data[0][7];

			slotL.addClass('active');

			slots.currSlotId = 1;
			slots.currSlot = slots.slotL;
			slots.canChoose = true;
		}
	}

	if (data[1] == -1) {
		slotM.addClass('free');
	} else {
		if (data[1][0] == 'ban') {
			slots.blockM[0] = data[1][1];
			slots.blockM[1] = data[1][2];
			slots.blockM[2] = data[1][3];
			slots.blockM[3] = data[1][4];

			slotM.addClass('free blocked');
		} else {
			slots.slotM[0] = data[1][0];
			slots.slotM[1] = data[1][1];
			slots.slotM[2] = data[1][2];
			slots.slotM[3] = data[1][3];
			slots.slotM[4] = 3 + data[1][2] * 3;
			slots.slotM[5] = data[1][4];
			slots.slotM[6] = data[1][5];
			slots.slotM[7] = data[1][6];
			slots.uuids[1] = data[1][7];

			slotM.addClass('active');
		}
	}

	if (data[2] === -1) {
		slotR.addClass('free');
	} else if (data[2] === -2) {
		slotR.addClass('non-active');
	} else {
		if (data[2][0] == 'ban') {
			slots.blockR[0] = data[2][1];
			slots.blockR[1] = data[2][2];
			slots.blockR[2] = data[2][3];
			slots.blockR[3] = data[2][4];

			slotR.addClass('free blocked');
		} else {
			slots.slotR[0] = data[2][0];
			slots.slotR[1] = data[2][1];
			slots.slotR[2] = data[2][2];
			slots.slotR[3] = data[2][3];
			slots.slotR[4] = 3 + data[2][2] * 3;
			slots.slotR[5] = data[2][4];
			slots.slotR[6] = data[2][5];
			slots.slotR[7] = data[2][6];
			slots.uuids[2] = data[2][7];

			slotR.addClass('active');
		}
	}

	slots.redbucks = data[3];
	slots.login = data[4];

	slotL.addClass('active');
	slotM.addClass('active');
	slotR.addClass('active');

	U.trigger('rederchar');

	//U.trigger('chooseChar', slots.uuids[0]);
}

function unlockSlot(data) {
	slotR.removeClass('non-active');
	slotR.addClass('free');
	slots.redbucks = data;
}

function delchar(data) {
	slots.show_modal_delete = slots.is_modal = false;
	slots.currSlot = slots.emptySlot;
	slots.currSlotId = 0;
	slots.canChoose = false;

	switch (data) {
		case 1:
			slots.slotL = slots.emptySlot;
			slotL.addClass('free');
			return;
		case 2:
			slots.slotM = slots.emptySlot;
			slotM.addClass('free');
			return;
		case 3:
			slots.slotR = slots.emptySlot;
			slotR.addClass('free');
			return;
	}
}

var restPassState = false;
var restPass = null;
var registerBtn = null;
var restoreBtn = null;
var authBackBtn = null;
var authBtn = null;
var endRegisterBtn = null;
var endRestoreBtn = null;
var authPage = null;
var regPage = null;
var restPage = null;
var slotsPage = null;
var slotL = null;
var slotM = null;
var slotR = null;

$(document).ready(() => {
	restPass = $('.entry-login');
	restoreBtn = $('.js-btn-restore');
	registerBtn = $('.js-btn-register');
	authBackBtn = $('.js-btn-back');
	authBtn = $('.js-btn-auth');
	endRegisterBtn = $('.btn-register-end');
	endRestoreBtn = $('.btn-restore-end');
	authPage = $('.auth-page');
	regPage = $('.reg-page');
	restPage = $('.rest-page');
	slotsPage = $('.slots-page');
	slotL = $('.col-l');
	slotM = $('.col-m');
	slotR = $('.col-r');

	// Переход на страницу авторизации (клик на "Регистрация")
	registerBtn.on('click', (e) => {
		e.preventDefault();
		authPage.removeClass('show');
		regPage.addClass('show');
	});

	// Переход на страницу восстановления пароля (клик на 'Восстановить')
	restoreBtn.on('click', (e) => {
		e.preventDefault();
		authPage.removeClass('show');
		restPage.addClass('show');
	});

	// Возврат на страницу авторизации (клик на "Назад")
	authBackBtn.on('click', (e) => {
		e.preventDefault();
		if (restPassState) {
			restPassState = false;
			restPass.attr('placeholder', 'Логин / E-mail');
		}
		regPage.removeClass('show');
		restPage.removeClass('show');
		authPage.addClass('show');
	});

	// Сохраниние данных с полей (Авторизация - Кнопка "Войти")
	authBtn.on('click', () => {
		let authData = $('#auth-form').toJSON();
		mp.trigger('signin', authData);
		localStorage['form_data'] = authData;
		return false;
	});

	// Сохраниние данных с полей (Регистрация - Кнопка "Зарегистрироваться")
	endRegisterBtn.on('click', () => {
		let regData = $('#reg-form').toJSON();
		mp.trigger('signup', regData);
		localStorage['form_data'] = regData;
		return false;
	});


	// Сохранение данных с полей (Восстановление пароля - Кнопка "Вспомнить")
	endRestoreBtn.on('click', (e) => {
		let regData = $('#rest-form').toJSON();
		let myval = document.getElementById("rest-form").elements[0].value;
		if (!restPassState) {
			e.preventDefault();
			if (myval.length != 0) {
				restPassState = true;
				restPass.attr('placeholder', 'Код из письма');
				restPass.val('');
				mp.trigger('restorepass', 0, regData);
				localStorage['form_data'] = regData;
			}
		} else {
			if (myval.length == 4) {
				if (checkCode(myval)) mp.trigger('restorepass', 1, regData);
				else restPass.val('');
			} else restPass.val('');
		}
		return false;
	});

	$(document)
		// Выбор персонажа
		.on('click', '.char', (e) => {
			slots.canChoose = false;
			slots.chooseBuy = false;

			var the = $(e.target);
			if (!the.hasClass('char')) the = the.parents('.char');

			var id = 0;

			if (the.hasClass('col-l')) id = 1;
			if (the.hasClass('col-m')) id = 2;
			if (the.hasClass('col-r')) id = 3;

			slots.currSlotId = id;
			slots.currSlot = slots[U.slotNameById(id)];

			return false;
		})
		.on('click', '.char.active:not(.free):not(.non-active)', () => {
			slots.canChoose = true;
			var ids = slots.currSlotId - 1;
			U.trigger('chooseChar', parseInt(slots.uuids[ids]));
			return false;
		})

		// Кнопка "Содание нового персонажа"
		.on('click', '.char.free.active', () => {
			slots.is_modal = true;
			slots.show_modal_new_char = true;
			return false;
		})
		.on('click', '.js-btn-create', () => {
			let data = $('.form-new-char').toJSON();
			data = JSON.parse(data);
			U.trigger('newChar', slots.currSlotId, data["name"], data["surname"]);
			slots.disable_new_char_btn = true;
			return false;
		})

		// Кнопка "Войти"
		.on('click', '.choose-chars .choose-the', () => {
			U.trigger('selectChar', slots.currSlotId);
			return false;
		})
		.on('click', '.choose-chars .buy-the', () => {
			U.trigger1('buyNewSlot', slots.currSlotId);
			return false;
		})

		// Кнопка "Разблокировать слот"
		.on('click', '.char.non-active', () => {
			slots.chooseBuy = true;
			return false;
		})

		// Кнопка "Удалить персонажа" (отдельно на каждый слот)
		.on('click', '.delet-char .button', () => {
			slots.is_modal = true;
			slots.show_modal_delete = true;
			return false;
		})
	;

});