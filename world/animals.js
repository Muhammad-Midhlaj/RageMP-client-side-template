// ANIMALS
mp.peds.new(1462895032, new mp.Vector3(-550.4594, -235.0781, 37.36579), 218.8, 0); 
mp.peds.new(1318032802, new mp.Vector3(-555.18, -267.6916, 35.04048), 303.2, 0); 
mp.peds.new(402729631, new mp.Vector3(-555.5945, -268.7845, 37.69592), 316.7, 0);
mp.peds.new(1832265812, new mp.Vector3(564.3991, 2740.475, 41.50517), 182.1, 0); 
mp.peds.new(3549666813, new mp.Vector3(-193.6039, 793.1151, 197.6122), 144.9679,0); 
mp.peds.new(2506301981, new mp.Vector3(-199.1794, -1609.419, 34.01067), 261.4599, 0); 
mp.peds.new(2506301981, new mp.Vector3(85.70742, -1955.27, 20.15471), 314.5776, 0); 
mp.peds.new(2506301981, new mp.Vector3(483.7948, -1519.017, 28.67134), 87.19617, 0); 
mp.peds.new(2506301981, new mp.Vector3(882.3968, -2169.903, 31.65136), 189.0253, 0); 
mp.peds.new(2506301981, new mp.Vector3(1416.409, -1496.435, 59.40118), 161.6646, 0); 
mp.peds.new(882848737, new mp.Vector3(442.9502, -981.1665, 30.06959), 88.87737, 0); 
mp.peds.new(3630914197, new mp.Vector3(-1528.098, 1753.292, 86.17753), 323.6743, 0); 
mp.peds.new(1462895032, new mp.Vector3(2015.733, 4967.312, 41.87567), 258.3119, 0);

// Peds
var needped = [null,null,null];
needped[0] = mp.peds.new(-681546704, new mp.Vector3(3367.203, 5185.236, 1.4752408), 223.7976, 0); 
needped[1] = mp.peds.new(-855671414, new mp.Vector3(3313.838, 5180.052, 19.66486), 229.4973, 0);
needped[2] = mp.peds.new(1906124788, new mp.Vector3(1924.431, 4922.007, 47.70858), 275.0723, 0);

mp.events.add('ChatPyBed', (id, variation) => {
	try {
		if (!global.loggedin || global.pedtimer) return;
		global.pedtimer = true;
		switch(id) {
			case 0:
				global.pedtext = "Слушай, если не влом - помоги моей тётке у дома.";
				mp.gui.chat.push("!{Red}[Bony] !{White}Слушай, если не влом - помоги моей тётке у дома.");
				global.pedsaying = needped[0];
				break;
			case 1:	
				global.pedtext = "К сожалению, я занят и не смогу помочь ей сам...";
				mp.gui.chat.push("!{Red}[Bony] !{White}К сожалению, я занят и не смогу помочь ей сам...");
				global.pedsaying = needped[0];
				break;
			case 2:	
				global.pedtext = "Спасибо, что нашел на меня время, мне нужна твоя помощь.";
				global.pedtext2 = "Собери и принеси мне парочку тыкв, они сзади дома.";
				mp.gui.chat.push("!{Yellow}[Emma] !{White}Спасибо, что нашел на меня время, мне нужна твоя помощь. Собери и принеси мне парочку тыкв, они сзади дома.");
				global.pedsaying = needped[1];
				break;
			case 3:	
				global.pedtext = "Спасибо, что нашла на меня время, дорогая моя!";
				global.pedtext2 = "Собери и принеси мне парочку капуст, они сзади дома.";
				mp.gui.chat.push("!{Yellow}[Emma] !{White}Спасибо, что нашла на меня время, дорогая моя! Собери и принеси мне парочку капуст, они сзади дома.");
				global.pedsaying = needped[1];
				break;
			case 4:	
				global.pedtext = "С таким количеством тыкв и делать нечего!";
				mp.gui.chat.push("!{Yellow}[Emma] !{White}С таким количеством тыкв и делать нечего!");
				global.pedsaying = needped[1];
				break;
			case 5:	
				global.pedtext = "Твоей капусты даже на салат не хватит!";
				mp.gui.chat.push("!{Yellow}[Emma] !{White}Твоей капусты даже на салат не хватит!");
				global.pedsaying = needped[1];
				break;
			case 6:	
				mp.gui.chat.push("!{Gray}[Подсказка] Наверное, этого ей хватит.");
				global.pedtimer = false;
				break;
			case 7:	
				global.pedtext = "Ой, как ты быстро, а я и не ожидала, спасибо!";
				global.pedtext2 = "Держи пару монет в знак благодарности. Слушай...";
				mp.gui.chat.push("!{Yellow}[Emma] !{White}Ой, как ты быстро, а я и не ожидала, спасибо! Держи пару монет в знак благодарности. Слушай...");
				global.pedsaying = needped[1];
				setTimeout(function() { global.pedtimer = false; mp.events.call("ChatPyBed", 8); }, 6100);
				break;
			case 8:	
				global.pedtext = "У знакомого есть работка, живёт в Грейпсид, тут близко.";
				global.pedtext2 = "Я передала тебе бумажку с его местонахождением, глянь.";
				mp.gui.chat.push("!{Yellow}[Emma] !{White}У знакомого есть работка, живёт в Грейпсид, тут близко. Я передала тебе бумажку с его местонахождением, глянь.");
				global.pedsaying = needped[1];
				mp.events.call("createWaypoint", 1924.431, 4922.007);
				break;
			case 9:	
				global.pedtext = "Огроменное тебе спасибо!";
				global.pedtext2 = "Держи, это от меня, так сказать - благодарность!";
				mp.gui.chat.push("!{Red}[Bony] !{White}Огроменное тебе спасибо! Держи, это от меня, так сказать - благодарность!");
				global.pedsaying = needped[0];
				break;
			case 10:	
				global.pedtext = "О, привет! А Эмма говорила о тебе!";
				global.pedtext2 = "Я так понимаю, тебе нужна работка, да?";
				mp.gui.chat.push("!{Orange}[Frank] !{White}О, привет! А Эмма говорила о тебе! Я так понимаю, тебе нужна работка, да?");
				global.pedsaying = needped[2];
				if(variation == 0) setTimeout(function() { global.pedtimer = false; mp.events.call("ChatPyBed", 11); }, 6100);
				else if(variation == 1) setTimeout(function() { global.pedtimer = false; mp.events.call("ChatPyBed", 12); }, 6100);
				break;
			case 11:	
				global.pedtext = "Хотел попросить включить водяной насос, но";
				global.pedtext2 = "пошел дождь, тебе повезло, держи монетку.";
				mp.gui.chat.push("!{Orange}[Frank] !{White}Хотел попросить включить водяной насос, но пошел дождь, тебе повезло, держи монетку.");
				global.pedsaying = needped[2];
				break;
			case 12:	
				global.pedtext = "Мне как раз нужно включить водяной насос!";
				global.pedtext2 = "Сбегай, пожалуйста, включи его.";
				mp.gui.chat.push("!{Orange}[Frank] !{White}Мне как раз нужно включить водяной насос! Сбегай, пожалуйста, включи его.");
				global.pedsaying = needped[2];
				mp.events.call("createWaypoint", 2043.343, 4853.748);
				break;
			case 13:	
				global.pedtext = "Отлично, теперь растениям не страшна жара!";
				global.pedtext2 = "Если ты захочешь еще подзаработать - обращайся.";
				mp.gui.chat.push("!{Orange}[Frank] !{White}Отлично, теперь растениям не страшна жара! Если ты захочешь еще работки - обращайся.");
				global.pedsaying = needped[2];
				break;
			case 14:	
				global.pedtext = "Вижу, тебе нетерпится получить еще денег? Ха-ха.";
				global.pedtext2 = "Лааадно, у меня там трактор в гараже, привези его сюда.";
				mp.gui.chat.push("!{Orange}[Frank] !{White}Вижу, тебе нетерпится получить еще денег? Ха-ха. Лааадно, у меня там трактор в гараже, привези его сюда.");
				global.pedsaying = needped[2];
				mp.events.call("createWaypoint", 1981.87, 5174.382);
				break;
			case 15:	
				global.pedtext = "Эх, вот бы трактор сюда, а то поля-то ждут...";
				mp.gui.chat.push("!{Orange}[Frank] !{White}Эх, вот бы трактор сюда, а то поля-то ждут...");
				global.pedsaying = needped[2];
				mp.events.call("createWaypoint", 1981.87, 5174.382);
				break;
			case 16:	
				global.pedtext = "О, наконец-то! Надеюсь, трактор не поцарапал?";
				global.pedtext2 = "Да ладно, я шучу! Ха-ха-ха. Денюжка твоя.";
				mp.gui.chat.push("!{Orange}[Frank] !{White}О, наконец-то! Надеюсь, трактор не поцарапал? Да ладно, я шучу! Ха-ха-ха. Денюжка твоя.");
				global.pedsaying = needped[2];
				break;
			case 17:	
				global.pedtext = "Прости, пока пусто. Поищи работку в городе.";
				global.pedtext2 = "В будущем, у меня будет много дел для тебя.";
				mp.gui.chat.push("!{Orange}[Frank] !{White}Прости, мне пока нечего тебе дать...");
				global.pedsaying = needped[2];
				break;
			case 18:	
				global.pedtext = "Слушай, мне очень неловко тебя об этом просить,";
				global.pedtext2 = "но, пожалуйста, сделай для меня одолжение...";
				mp.gui.chat.push("!{Orange}[Frank] !{White}Слушай, мне очень неловко тебя об этом просить, но, пожалуйста, сделай для меня одолжение...");
				global.pedsaying = needped[2];
				setTimeout(function() { global.pedtimer = false; mp.events.call("ChatPyBed", 19); }, 6100);
				break;
			case 19:	
				global.pedtext = "Сбегай в ближайший 24/7 и купи мне SIM-карту,";
				global.pedtext2 = "буду очень тебе благодарен!";
				mp.gui.chat.push("!{Orange}[Frank] !{White}Сбегай в ближайший 24/7 и купи мне SIM-карту, буду очень тебе благодарен!");
				global.pedsaying = needped[2];
				mp.events.call("createWaypoint", 1699.871, 4928.831);
				break;
			case 20:	
				global.pedtext = "Я понимаю, что это странная просьба, но,";
				global.pedtext2 = "пожалуйста, купи мне SIM-карту.";
				mp.gui.chat.push("!{Orange}[Frank] !{White}Я понимаю, что это странная просьба, но, пожалуйста, купи мне SIM-карту.");
				global.pedsaying = needped[2];
				mp.events.call("createWaypoint", 1699.871, 4928.831);
				break;
			case 21:	
				global.pedtext = "Блин, супер, спасибо! Сколько я тебе должен за неё?";
				global.pedtext2 = "Хотя, чего мелочится, держи 500$. А еще...";
				mp.gui.chat.push("!{Orange}[Frank] !{White}Блин, супер, спасибо! Сколько я тебе должен за неё? Хотя, чего мелочится, держи 500$. А еще...");
				global.pedsaying = needped[2];
				setTimeout(function() { global.pedtimer = false; mp.events.call("ChatPyBed", 22); }, 6100);
				break;
			case 22:	
				global.pedtext = "Я понимаю, что уже надоел тебе, но найди мою";
				global.pedtext2 = "кошку, она должна быть у дома напротив меня и";
				mp.gui.chat.push("!{Orange}[Frank] !{White}Я понимаю, что уже надоел тебе, но найди мою кошку, она должна быть у дома напротив меня и");
				global.pedsaying = needped[2];
				setTimeout(function() { global.pedtimer = false; mp.events.call("ChatPyBed", 23); }, 6100);
				break;
			case 23:	
				global.pedtext = "не беспокойся, что там здание UNION G.S.,";
				global.pedtext2 = "компания пару лет как не работает, охраны No.";
				mp.gui.chat.push("!{Orange}[Frank] !{White}не беспокойся, что там здание UNION G.S., компания пару лет как не работает, охраны No.");
				global.pedsaying = needped[2];
				mp.events.call("createWaypoint", 2015.733, 4967.312);
				break;
			case 24:	
				global.pedtext = "Пожалуйста, найди кошку, я переживаю за неё!";
				mp.gui.chat.push("!{Orange}[Frank] !{White}Пожалуйста, найди кошку, я переживаю за неё!");
				global.pedsaying = needped[2];
				mp.events.call("createWaypoint", 2015.733, 4967.312);
				break;
			case 25:	
				global.pedtext = "Спасибо тебе! Еще раз извини и держи 100$.";
				global.pedtext2 = "Чтобы добраться в город - беги к таксопарку.";
				mp.gui.chat.push("!{Orange}[Frank] !{White}Спасибо тебе! Еще раз извини и держи 100$. Чтобы добраться в город - беги к таксопарку.");
				global.pedsaying = needped[2];
				mp.events.call("createWaypoint", 1802.69, 4588.494);
				break;
		}
		if(global.pedtimer == true) {
			if(global.pedtext2 == null) setTimeout(function() { global.pedsaying = null; global.pedtext = ""; global.pedtimer = false; }, 3000);
			else setTimeout(function() { global.pedsaying = null; global.pedtext = ""; global.pedtext2 = null; global.pedtimer = false; }, 6000);
		}
	} catch (e) { }
});