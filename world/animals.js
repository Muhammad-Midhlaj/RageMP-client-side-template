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
				global.pedtext = "Listen, if not broke - help my aunt at the house.";
				mp.gui.chat.push("!{Red}[Bony] !{White}Listen, if not broke - help my aunt at the house.");
				global.pedsaying = needped[0];
				break;
			case 1:	
				global.pedtext = "К Unfortunately, I'm busy and can't help her myself ...";
				mp.gui.chat.push("!{Red}[Bony] !{White}К Unfortunately, I'm busy and can't help her myself ...");
				global.pedsaying = needped[0];
				break;
			case 2:	
				global.pedtext = "Thanks for taking the time with me, I need your help.";
				global.pedtext2 = "Collect and bring me a couple of pumpkins, they are in the back of the house.";
				mp.gui.chat.push("!{Yellow}[Emma] !{White}Thanks for taking the time with me, I need your help. Collect and bring me a couple of pumpkins, they are in the back of the house.");
				global.pedsaying = needped[1];
				break;
			case 3:	
				global.pedtext = "Thank you for taking the time with me, my dear!";
				global.pedtext2 = "Collect and bring me a couple of cabbages, they are in the back of the house.";
				mp.gui.chat.push("!{Yellow}[Emma] !{White}Thank you for taking the time with me, my dear! Collect and bring me a couple of cabbages, they are in the back of the house.");
				global.pedsaying = needped[1];
				break;
			case 4:	
				global.pedtext = "С so many pumpkins and there is nothing to do!";
				mp.gui.chat.push("!{Yellow}[Emma] !{White}С so many pumpkins and there is nothing to do!");
				global.pedsaying = needped[1];
				break;
			case 5:	
				global.pedtext = "Your cabbage isn't even enough for a salad!";
				mp.gui.chat.push("!{Yellow}[Emma] !{White}Your cabbage isn't even enough for a salad!");
				global.pedsaying = needped[1];
				break;
			case 6:	
				mp.gui.chat.push("!{Gray}[prompt] Perhaps that will be enough for her.");
				global.pedtimer = false;
				break;
			case 7:	
				global.pedtext = "Oh, how fast you are, and I didn't expect it, thanks!";
				global.pedtext2 = "Keep a couple of gratitude coins. Listen ...";
				mp.gui.chat.push("!{Yellow}[Emma] !{White}Oh, how fast you are, and I didn't expect it, thanks! Keep a couple of gratitude coins. Listen ...");
				global.pedsaying = needped[1];
				setTimeout(function() { global.pedtimer = false; mp.events.call("ChatPyBed", 8); }, 6100);
				break;
			case 8:	
				global.pedtext = "A friend has a job, lives in Grapeseed, close here.";
				global.pedtext2 = "I gave you a piece of paper with his location, look.";
				mp.gui.chat.push("!{Yellow}[Emma] !{White}A friend has a job, lives in Grapeseed, close here. I gave you a piece of paper with his location, look.");
				global.pedsaying = needped[1];
				mp.events.call("createWaypoint", 1924.431, 4922.007);
				break;
			case 9:	
				global.pedtext = "Thank you so much!";
				global.pedtext2 = "Keep it from me, so to speak - thanks!";
				mp.gui.chat.push("!{Red}[Bony] !{White}Thank you so much! Keep it from me, so to speak - thanks!");
				global.pedsaying = needped[0];
				break;
			case 10:	
				global.pedtext = "Oh, hi! And Emma was talking about you!";
				global.pedtext2 = "I understand you need a job, right?";
				mp.gui.chat.push("!{Orange}[Frank] !{White}Oh, hi! And Emma was talking about you! I understand you need a job, right?");
				global.pedsaying = needped[2];
				if(variation == 0) setTimeout(function() { global.pedtimer = false; mp.events.call("ChatPyBed", 11); }, 6100);
				else if(variation == 1) setTimeout(function() { global.pedtimer = false; mp.events.call("ChatPyBed", 12); }, 6100);
				break;
			case 11:	
				global.pedtext = "I wanted to ask to turn on the water pump, but";
				global.pedtext2 = "it's raining, you're in luck, hold a coin.";
				mp.gui.chat.push("!{Orange}[Frank] !{White}I wanted to ask you to turn on the water pump, but it started raining, you're in luck, hold a coin.");
				global.pedsaying = needped[2];
				break;
			case 12:	
				global.pedtext = "I just need to turn on the water pump!";
				global.pedtext2 = "Run, please, turn it on.";
				mp.gui.chat.push("!{Orange}[Frank] !{White}I just need to turn on the water pump! Run, please, turn it on.");
				global.pedsaying = needped[2];
				mp.events.call("createWaypoint", 2043.343, 4853.748);
				break;
			case 13:	
				global.pedtext = "Great, now the plants are not afraid of the heat!";
				global.pedtext2 = "If you want to earn extra money, please contact.";
				mp.gui.chat.push("!{Orange}[Frank] !{White}Great, now the plants are not afraid of the heat! If you want more work, please contact.");
				global.pedsaying = needped[2];
				break;
			case 14:	
				global.pedtext = "I see you're impatient to get more money? Haha.";
				global.pedtext2 = "Laaadno, I have a tractor in the garage, bring it here.";
				mp.gui.chat.push("!{Orange}[Frank] !{White}I see you're impatient to get more money? Haha. Laaadno, I have a tractor in the garage, bring it here.");
				global.pedsaying = needped[2];
				mp.events.call("createWaypoint", 1981.87, 5174.382);
				break;
			case 15:	
				global.pedtext = "Oh, if only the tractor is here, otherwise the fields are waiting ...";
				mp.gui.chat.push("!{Orange}[Frank] !{White}Oh, if only the tractor is here, otherwise the fields are waiting ...");
				global.pedsaying = needped[2];
				mp.events.call("createWaypoint", 1981.87, 5174.382);
				break;
			case 16:	
				global.pedtext = "Oh, finally! I hope the tractor hasn't been scratched?";
				global.pedtext2 = "Come on, I'm kidding! Ha ha ha. The money is yours.";
				mp.gui.chat.push("!{Orange}[Frank] !{White}Oh, finally! I hope the tractor hasn't been scratched? Come on, I'm kidding! Ha ha ha. The money is yours.");
				global.pedsaying = needped[2];
				break;
			case 17:	
				global.pedtext = "Sorry, while it's empty. Look for a job in the city.";
				global.pedtext2 = "In the future, I will have a lot to do for you.";
				mp.gui.chat.push("!{Orange}[Frank] !{White}Sorry, I have nothing to give you yet ...");
				global.pedsaying = needped[2];
				break;
			case 18:	
				global.pedtext = "Look, I'm really embarrassed to ask you this";
				global.pedtext2 = "but please do me a favor ...";
				mp.gui.chat.push("!{Orange}[Frank] !{White}Look, I'm really embarrassed to ask you this, but please do me a favor ...");
				global.pedsaying = needped[2];
				setTimeout(function() { global.pedtimer = false; mp.events.call("ChatPyBed", 19); }, 6100);
				break;
			case 19:	
				global.pedtext = "Run to the next 24/7 and buy me a SIM card,";
				global.pedtext2 = "I will be very grateful to you!";
				mp.gui.chat.push("!{Orange}[Frank] !{White}Run to the next 24/7 and buy me a SIM card, I will be very grateful to you!");
				global.pedsaying = needped[2];
				mp.events.call("createWaypoint", 1699.871, 4928.831);
				break;
			case 20:	
				global.pedtext = "I understand that this is a strange request, but,";
				global.pedtext2 = "please buy me a SIM card.";
				mp.gui.chat.push("!{Orange}[Frank] !{White}I understand that this is a strange request, but please buy me a SIM card.");
				global.pedsaying = needped[2];
				mp.events.call("createWaypoint", 1699.871, 4928.831);
				break;
			case 21:	
				global.pedtext = "Damn, super, thanks! How much do I owe you for it?";
				global.pedtext2 = "Although, what is small, keep $500. And also ...";
				mp.gui.chat.push("!{Orange}[Frank] !{White}Damn, super, thanks! How much do I owe you for it? Although, what is small, keep $ 500. And also ...");
				global.pedsaying = needped[2];
				setTimeout(function() { global.pedtimer = false; mp.events.call("ChatPyBed", 22); }, 6100);
				break;
			case 22:	
				global.pedtext = "I understand that you are already tired of you, but find mine";
				global.pedtext2 = "cat, she should be at home opposite me and";
				mp.gui.chat.push("!{Orange}[Frank] !{White}I understand that you are already tired of you, but find my cat, she should be at the house opposite me and");
				global.pedsaying = needped[2];
				setTimeout(function() { global.pedtimer = false; mp.events.call("ChatPyBed", 23); }, 6100);
				break;
			case 23:	
				global.pedtext = "don't worry that there is a UNION G.S.,";
				global.pedtext2 = "the company has not been working for a couple of years, security No.";
				mp.gui.chat.push("!{Orange}[Frank] !{White}don't worry that there is a UNION G.S. building there, the company has not been working for a couple of years, security No.");
				global.pedsaying = needped[2];
				mp.events.call("createWaypoint", 2015.733, 4967.312);
				break;
			case 24:	
				global.pedtext = "Please find a cat, I'm worried about her!";
				mp.gui.chat.push("!{Orange}[Frank] !{White}Please find a cat, I'm worried about her!");
				global.pedsaying = needped[2];
				mp.events.call("createWaypoint", 2015.733, 4967.312);
				break;
			case 25:	
				global.pedtext = "Thank you! Sorry again and keep $ 100.";
				global.pedtext2 = "To get to the city, run to the taxi company.";
				mp.gui.chat.push("!{Orange}[Frank] !{White}Thank you! Sorry again and keep $ 100. To get to the city, run to the taxi company.");
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