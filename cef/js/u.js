if(!('U' in window)) window.U = {};

U.KeyCheckFuncs = {};
U.KeyCheck = function(key, callback){

	if (Array.isArray(key)) {
		for (var i = key.length - 1; i >= 0; i--) {
			this.KeyCheck(key[i]);
		}
		return;
	}

	if (this.KeyCheckFuncs[key] === undefined) this.KeyCheckFuncs[key] = [];
	this.KeyCheckFuncs[key].push(callback);
};
U._KeyCheck = function (event){
	var key = event.key.toLowerCase();
	var funcs = U.KeyCheckFuncs[key];
	if (funcs !== undefined) {
		for (var i = 0; i < funcs.length; i++) {
			if (typeof funcs[i] === 'function') {
				funcs[i](key);
			}
		}
	}
};


U.init_console = function () {
	if ($('#console-debug').length === 0){
		$('<div id="console-debug"><span class="first">Hide</span></div>').appendTo('body');
		$('<div id="console-debug-input"><textarea></textarea><button type="button">Eval</button></div>').appendTo('body');
	}

	var op = false;
	$(document).on('click', '#console-debug span.first', function(event) {
		op = !op;
		$('#console-debug').toggleClass('hide');
		$('#console-debug-input').toggleClass('hide');
	});
	$(document).on('click', '#console-debug-input button', function(event) {
		var code = $('#console-debug-input textarea').val();
		// console.log(code);
		eval(code);
	});
};
U.dbg_trigger = function () {};
U.init_debug = function () {
	if (location.pathname.indexOf('auth.html') != -1) {
		setTimeout(function () {
			toslots('[\
				-1,\
				-1,\
				-2,0,"umbokc"\
				]');
			// toslots('[\
			// 	["Asdd","Asdsd",10,0,"-",5001000,0],\
			// 	["Pol","Lol",0,0,"-",500,0],\
			// 	-2,0,"umbokc"\
			// ]');
		}, 500);
	}

	if( (location.pathname.indexOf('phone.html')  != -1) || (location.pathname.indexOf('android.html')  != -1)) {
		show();

		var data = {
			mainmenu: [
				'mainmenu',
				'[["header","Меню",1,0,1,0,false,[null]],["gps","GPS",3,0,2,0,false,[null]],["contacts","Контакты",3,0,2,0,false,[null]],["services","Вызовы",3,0,2,0,false,[null]],["ad","Подать объявление",3,0,1,0,false,[null]],["close","Закрыть",3,0,1,0,false,[null]]]',
			],
			gps: [
				'gps',
				'[["header","Категории",1,0,1,0,false,[null]],["Гос.структуры","Гос.структуры",3,0,1,0,false,[null]],["Работы","Работы",3,0,1,0,false,[null]],["Банды","Банды",3,0,1,0,false,[null]],["Мафии","Мафии",3,0,1,0,false,[null]],["Ближайшие места","Ближайшие места",3,0,1,0,false,[null]],["close","Закрыть",3,0,1,0,false,[null]]]',
			],
			ads: [
				'ads',
				'[["header","Категории",1,0,1,0,false,[null]],["Гос.структуры","Гос.структуры",3,0,1,0,false,[null]],["Работы","Работы",3,0,1,0,false,[null]],["Банды","Банды",3,0,1,0,false,[null]],["Мафии","Мафии",3,0,1,0,false,[null]],["Ближайшие места","Ближайшие места",3,0,1,0,false,[null]],["close","Закрыть",3,0,1,0,false,[null]]]',
			],
			'Гос.структуры': [
				'gps',
				'[["header","Гос.структуры",1,0,1,0,false,[null]],["Мэрия","Мэрия",3,0,1,0,false,[null]],["LSPD","LSPD",3,0,1,0,false,[null]],["Госпиталь","Госпиталь",3,0,1,0,false,[null]],["ФБР","ФБР",3,0,1,0,false,[null]],["close","Закрыть",3,0,1,0,false,[null]]]',
			],

			contacts: [
				'contacts',
				'[["header","Контакты",1,0,1,0,false,[null]],["call","Позвонить",3,0,1,0,false,[null]],["12","Hee",3,0,1,0,false,[null]],["13","Second",3,0,1,0,false,[null]],["15","Third",3,0,1,0,false,[null]],["add","Добавить номер",3,0,1,0,false,[null]],["back","Назад",3,0,1,0,false,[null]]]'
			],
		};

		open(data.mainmenu[0], false, false, data.mainmenu[1]);
		setPhone("\"[123412, 100]\"");

		U.dbg_trigger = function (event, key, arg2, arg3) {
			if (data[key]) {
				console.log('Open: ' + key);
				open(data[key][0], false, false, data[key][1]);
			} else if (key === 'numcall') {
				callOut(arg2);
			} else if (key === 'acceptcall') {
				callAccepted();
			} else {
				console.log('Not found: ' + key);
			}
			// console.log(key);
		}

		// "housebuy"
		// false
		// false
		// "[["header","Покупка дома",1,0,1,0,false,[null]],["buy","Купить дом",3,0,1,0,false,[null]],["interior","Посмотреть интерьер",3,0,1,0,false,[null]],["close","Закрыть",3,0,1,0,false,[null]]]"

		// "mainmenu"
		// false
		// false
		// '[["header","Меню",1,0,1,0,false,[null]],["gps","GPS",3,0,2,0,false,[null]],["contacts","Контакты",3,0,2,0,false,[null]],["services","Вызовы",3,0,2,0,false,[null]],["ad","Подать объявление",3,0,1,0,false,[null]],["close","Закрыть",3,0,1,0,false,[null]]]'

		//"gps"
		// '"
	}
};

U.trigger = function () {
	window.arguments_trigger = arguments;

	console.log('Thigger: ' + arguments[0] +': '+ JSON.stringify(Object.values(arguments)));
	if(typeof mp !== 'undefined')
		mp.trigger.apply(mp, arguments);
	else
		U.dbg_trigger.apply(null, arguments);
};


; (function ($) {
	$.fn.toJSON = function () {
		var $elements = {};
		var $form = $(this);
		$form.find('input, select, textarea').each(function () {
			var name = $(this).attr('name')
			var type = $(this).attr('type')
			if (name) {
				var $value;
				if (type == 'radio') {
					$value = $('input[name=' + name + ']:checked', $form).val()
				} else if (type == 'checkbox') {
					$value = $(this).is(':checked')
				} else {
					$value = $(this).val()
				}
				$elements[$(this).attr('name')] = $value
			}
		});
		return JSON.stringify($elements)
	};
	$.fn.fromJSON = function (json_string) {
		var $form = $(this)
		var data = JSON.parse(json_string)
		$.each(data, function (key, value) {
			var $elem = $('[name="' + key + '"]', $form)
			var type = $elem.first().attr('type')
			if (type == 'radio') {
				$('[name="' + key + '"][value="' + value + '"]').prop('checked', true)
			} else if (type == 'checkbox' && (value == true || value == 'true')) {
				$('[name="' + key + '"]').prop('checked', true)
			} else {
				$elem.val(value)
			}
		})
	};
}(jQuery));


window.originalConsole = window.originalConsole || window.console;

window.console = {
	warn: function(message, param) {
		originalConsole.warn(message);
		$('<span>Warn: '+message+'</span>').prependTo('#console-debug');
	},
	error: function(message, param) {
		originalConsole.error(message);
		$('<span>Error: '+message+'</span>').prependTo('#console-debug');
	},
	log: function(message, param = '') {
		if (Array.isArray(message)){
			message = '[' + (message.toString()) + ']';
			// message = '[' + ']';
		}

		originalConsole.log(param + ': ');
		originalConsole.log(message);
		$('<span>'+message+'</span>').prependTo('#console-debug');
		$('<span>'+param+':</span>').prependTo('#console-debug');
	}
};

$(function() {
	document.addEventListener("keydown", U._KeyCheck);


	// U.init_console();
	// U.init_debug();
});