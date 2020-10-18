var cssAnimation = document.createElement('style');
cssAnimation.type = 'text/css';
var rules = null;
var cstate = 0;
const mlimit = 50000;
const llimit = 15000;
var totalbet = 0;
const timeOutput = $('#roulete-output');
const redOutput = $('.js-bet-red__output')[0];
const zeroOutput = $('.js-bet-zero__output')[0];
const blackOutput = $('.js-bet-black__output')[0];
const bankOutput = $('.bankcashoutput')[0];
const winOutput = $('.winOutput')[0];
const redBtn = $("#redbet");
const zeroBtn = $("#zerobet");
const blackBtn = $("#blackbet");
const roulete = $("#roulete-img");
const dredOutput = $('.js-bet-red__output__all')[0];
const dzeroOutput = $('.js-bet-zero__output__all')[0];
const dblackOutput = $('.js-bet-black__output__all')[0];
const betInput = $('#bet-input-id');

function startrotate(a) {
	rules = document.createTextNode('@keyframes rulete-rotate {'+
	'from { transform: rotate(0); }'+
	'to { transform: rotate(calc(9.72972973deg * ' + a + ')); }'+
	'}');
	cssAnimation.appendChild(rules);
	document.getElementsByTagName("head")[0].appendChild(cssAnimation);
	roulete.attr("class", "roulete-img rotate");
	setTimeout(function() { 
		roulete.attr("class", "roulete-img") 
		winOutput.textContent = 0;
	} , 15000);
}

function timercfg(b, c) {
	cstate = c;
	timeOutput.text('' + b + '');
}

function updatebank(a) {
	bankOutput.textContent = a;
}

function wonmoney(a, b) {
	totalbet = 0;
	cstate = 0;
	winOutput.textContent = a;
	bankOutput.textContent = b;
	redOutput.textContent = 0;
	zeroOutput.textContent = 0;
	blackOutput.textContent = 0;
	dredOutput.textContent = 0;
	dzeroOutput.textContent = 0;
	dblackOutput.textContent = 0;
	buttonstate(0,3);
}

function buttonstate(a, b) {
	if(b == 0) { // Выключить нужную кнопку
		if(a == 0) redBtn.attr("class", "red  js-bet-red disabled");
		else if(a == 1) zeroBtn.attr("class", "zero  js-bet-zero disabled");
		else if(a == 2) blackBtn.attr("class", "black  js-bet-black disabled");
	} else if(b == 1) { // Включить нужную кнопку
		if(a == 0) redBtn.attr("class", "red  js-bet-red active");
		else if(a == 1) zeroBtn.attr("class", "zero  js-bet-zero active");
		else if(a == 2) blackBtn.attr("class", "black  js-bet-black active");
	} else if(b == 2) { // Выключить все кнопки
		redBtn.attr("class", "red  js-bet-red disabled");
		zeroBtn.attr("class", "zero  js-bet-zero disabled");
		blackBtn.attr("class", "black  js-bet-black disabled");
	} else if(b == 3) { // Включить все кнопки
		if(cstate == 0) { // Но только если ставки активны, иначе выключить всё
			redBtn.attr("class", "red  js-bet-red active");
			zeroBtn.attr("class", "zero  js-bet-zero active");
			blackBtn.attr("class", "black  js-bet-black active");
		} else buttonstate(0,2);
	}
}

$(document).ready(() => {
  
  // Закрыть рулетку
  $('.close-btn').on('click', () => {
	if(cstate == 0) mp.trigger('rouletecfg', 5, 0, 0); // Не давать игрокам выйти с казино, если ставки сделаны
	else {
		if(totalbet == 0) mp.trigger('rouletecfg', 5, 0, 0); // Не давать игрокам выйти с казино, если ставки сделаны
	}
  });

  // Мин
  $('.js-min').on('click', () => {
    betInput.val(1000);
  });

  // х2
  $('.js-double').on('click', () => {
    let sum = Math.round((betInput.val() * 2));
	if(sum >= 1000 && sum <= 50000) betInput.val(sum);
	else if(sum >= 50000) betInput.val(50000);
	else betInput.val(1000);
  });

  // 1/2
  $('.js-half').on('click', () => {
    let sum = Math.round((betInput.val()/2));
	if(sum >= 1000) betInput.val(sum);
	else betInput.val(1000);
  });

  // Макс.
  $('.js-max').on('click', () => {
	let sum = Math.round(parseInt(bankOutput.textContent, 10));
	if(sum >= 65000) betInput.val(50000);
	else if(sum >= 16000) betInput.val((sum-llimit));
	else betInput.val(1000);
  });

  // Ставка на красные
  $('.js-bet-red').on('click', () => {
    let sum = Math.round(betInput.val() * 1);
	betInput.val(1000);
	let bank = parseInt(bankOutput.textContent, 10);
	if(bank - sum >= llimit) {
		if(sum >= 1000) {
			buttonstate(1, 0);
			buttonstate(2, 0);
			let newbank = bank - sum;
			bankOutput.textContent = newbank;
			let currentBet = parseInt(redOutput.textContent, 10) + sum;
			return redOutput.textContent = currentBet;
		}
	}
  });

  // Ставка на зеро
  $('.js-bet-zero').on('click', () => {
	let sum = Math.round(betInput.val() * 1);
	betInput.val(1000);
	let bank = parseInt(bankOutput.textContent, 10);
	if(bank - sum >= llimit) {
		if(sum >= 1000) {
			buttonstate(0, 0);
			buttonstate(2, 0);
			let newbank = bank - sum;
			bankOutput.textContent = newbank;
			let currentBet = parseInt(zeroOutput.textContent, 10) + sum;
			return zeroOutput.textContent = currentBet;
		}
	}
  });

  // Ставка на черные
  $('.js-bet-black').on('click', () => {
    let sum = Math.round(betInput.val() * 1);
	betInput.val(1000);
	let bank = parseInt(bankOutput.textContent, 10);
	if(bank - sum >= llimit) {
		if(sum >= 1000) {
			buttonstate(0, 0);
			buttonstate(1, 0);
			let newbank = bank - sum;
			bankOutput.textContent = newbank;
			let currentBet = parseInt(blackOutput.textContent, 10) + sum;
			return blackOutput.textContent = currentBet;
		}
	}
  });

  // Сбросить ставки
  $('.js-bet-reset').on('click', () => {
	if(cstate == 0) { // Сбросить ставки можно только тогда, когда ставки открыты
		let sum = parseInt(bankOutput.textContent, 10);
		sum += (parseInt(redOutput.textContent, 10) + parseInt(zeroOutput.textContent, 10) + parseInt(blackOutput.textContent, 10));
		bankOutput.textContent = sum;
		redOutput.textContent = 0;
		zeroOutput.textContent = 0;
		blackOutput.textContent = 0;
		betInput.val(1000);
		buttonstate(0, 3);
	}
  });
  
  // Поставить ставку
  $('.js-bet-submit').on('click', () => {
	if(cstate == 0) { // Поставить ставки можно только тогда, когда ставки открыты
		let redSum = parseInt(redOutput.textContent, 10);
		let zeroSum = parseInt(zeroOutput.textContent, 10);
		let blackSum = parseInt(blackOutput.textContent, 10);
		if(totalbet + redSum + zeroSum + blackSum <= mlimit) {
			if(redSum >= 1 || zeroSum >= 1 || blackSum >= 1) {
				let dredSum = parseInt(dredOutput.textContent, 10);
				let dzeroSum = parseInt(dzeroOutput.textContent, 10);
				let dblackSum = parseInt(dblackOutput.textContent, 10);
				if(redSum >= 1) {
					if(dzeroSum >= 1 && dblackSum >= 1) return;
				} else if(zeroSum >= 1) {
					if(dredSum >= 1 && dblackSum >= 1) return;
				} else if(blackSum >= 1) {
					if(dredSum >= 1 && dzeroSum >= 1) return;
				}
				let tredSum = dredSum + redSum;
				let tzeroSum = dzeroSum + zeroSum;
				let tblackSum = dblackSum + blackSum;
				totalbet = tredSum + tzeroSum + tblackSum;
				redOutput.textContent = 0;
				zeroOutput.textContent = 0;
				blackOutput.textContent = 0;
				dredOutput.textContent = tredSum;
				dzeroOutput.textContent = tzeroSum;
				dblackOutput.textContent = tblackSum;
				buttonstate(0, 3);
				mp.trigger("placedbet", tredSum, tzeroSum, tblackSum);
			}
		}
	}
  });

});