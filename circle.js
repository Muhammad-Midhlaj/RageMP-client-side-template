global.circleEntity = null;
global.circleOpen = false;
var circleTitle = "";

function OpenCircle(title, data) {
    if (menuCheck() || circleOpen) return;
    board.execute(`circle.show("${title}",${data})`);
    circleTitle = title;
    circleOpen = true;
    menuOpen();
}
function CloseCircle(hide) {
    if(hide) board.execute("circle.hide()");
    circleOpen = false;
    menuClose();
}

// // //
mp.events.add('circleCallback', (index) => {
    if (index == -1) {
        CloseCircle(false);
    } else {
        CloseCircle(false);
        switch (circleTitle) {
            case "Car":
                switch (index) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        if (entity == null) return;
                        mp.events.callRemote('vehicleSelected', entity, index);
                        return;
                }
                return;
            case "Player":
                if (entity == null) return;
                switch (index) {
                    case 0:
                        mp.events.callRemote('pSelected', entity, "Give money");
                        return;
                    case 1:
                        mp.events.callRemote('pSelected', entity, "Offer an exchange");
                        return;
                    case 2:
                        if (pFraction === 0 || pFraction === 15) return;
                        OpenCircle("Fraction", pFraction);
                        return;
                    case 3:
                        //mp.gui.chat.push(">>" + entity);
                        mp.events.callRemote('passport', entity);
                        return;
                    case 4:
                        //mp.gui.chat.push(">>" + entity);
                        mp.events.callRemote('licenses', entity);
                        return;
                    case 5:
                        mp.events.callRemote('pSelected', entity, "Cure");
                        return;
                    case 6:
                        OpenCircle("House", 0);
                        return;
                    case 7:
                        mp.events.callRemote('pSelected', entity, "To shake the hand");
                        return;
                }
                return;
            case "House":
                switch (index) {
                    case 0:
                        mp.events.callRemote('pSelected', entity, "Sell ​​a car");
                        return;
                    case 1:
                        mp.events.callRemote('pSelected', entity, "Sell ​​a house");
                        return;
                    case 2:
                        mp.events.callRemote('pSelected', entity, "Move into the house");
                        return;
                    case 3:
                        mp.events.callRemote('pSelected', entity, "Invite to the house");
                        return;
                }
                return;
				            case "Furniture":
                if (entity == null) return;
                switch (index) {
                    case 0:
                        mp.events.callRemote('furnSelected', entity._furnid, "Open inventory");
                        return;
                    case 1:
                        mp.events.callRemote('furnSelected', entity._furnid, "Open close");
                        return;
                    case 2:
                        mp.events.callRemote('furnSelected', entity._furnid, "Rearrange");
                        return;
                    case 3:
                        mp.events.callRemote('furnSelected', entity._furnid, "Remove");
                        return;
                }
                return;
            case "Fraction":
                if (entity == null) return;
                circleEntity = entity;
                if (fractionActions[pFraction] == undefined) return;
                mp.events.callRemote('pSelected', entity, fractionActions[pFraction][index]);
                return;
            case "Categories":
                if (index == 7) {
					if(!localplayer.isFalling()) mp.events.callRemote('aSelected', -1, -1);
                    return;
                }
                switch (index) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
					case 6:
                        aCategory = index;
                        OpenCircle("Animations", index);
                        return;
                }
                return;
            case "Animations":
				if(aCategory == 1 && index == 7) {
					aCategory = 10;
                    OpenCircle("Animations", 10);
				} else if(aCategory == 4 && index == 7) {
					aCategory = 13;
                    OpenCircle("Animations", 13);
				} else if(aCategory == 5 && index == 7) {
					aCategory = 7;
                    OpenCircle("Animations", 7);
				} else if(aCategory == 6 && index == 7) {
					aCategory = 12;
                    OpenCircle("Animations", 12);
				} else if(aCategory == 7 && index == 7) {
					aCategory = 8;
                    OpenCircle("Animations", 8);
				} else if(aCategory == 8 && index == 7) {
					aCategory = 9;
                    OpenCircle("Animations", 9);
				} else if(aCategory == 10 && index == 7) {
					aCategory = 11;
                    OpenCircle("Animations", 11);
				} else mp.events.callRemote('aSelected', aCategory, index);
                return;
        }
    }
});

var aCategory = -1;

// // //
var pFraction = 0;
var fractionActions = [];
fractionActions[1] = ["Rob", "Steal a weapon", "Handbag"];
fractionActions[2] = ["Rob", "Steal a weapon", "Handbag"];
fractionActions[3] = ["Rob", "Steal a weapon", "Handbag"];
fractionActions[4] = ["Rob", "Steal a weapon", "Handbag"];
fractionActions[5] = ["Rob", "Steal a weapon", "Handbag"];
fractionActions[6] = ["To lead"];
fractionActions[7] = ["To lead", "Search", "Withdraw weapon", "Withdraw illegal", "Rip off the mask", "Write out a fine"];
fractionActions[8] = ["Sell ​​first aid kit", "Suggest treatment"];
fractionActions[9] = ["To lead", "Search", "Withdraw weapon", "Withdraw illegal", "Rip off the mask"];
fractionActions[10] = ["To lead", "handbag", "Rob", "Steal a weapon"];
fractionActions[11] = ["Вcarry along", "Handbag", "Rob", "Steal a weapon"];
fractionActions[12] = ["To lead", "Handbag", "Rob", "Steal a weapon"];
fractionActions[13] = ["To lead", "Handbag", "Rob", "Steal a weapon"];
fractionActions[14] = ["To lead"];
mp.events.add('fractionChange', (fraction) => {
    pFraction = fraction;
});