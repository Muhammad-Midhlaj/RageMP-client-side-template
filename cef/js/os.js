var App = null;
var Home = null;
var Back = null;
var Items = {};
var Lists = [];
var IND = 0;


function open(id, canhome, canback, data) {
    reset();
    App = id;
    Home = canhome;
    Back = canback;
    if (Back == false) $('.back').addClass('disabled');
    if (Home == false) $('.home').addClass('disabled');
    $('.debug').append(id);
    var json = JSON.parse(data);
    json.forEach(function (item, i, arr) {
        switch (item[2]) {
            case 0:
                break;
            case 1:
                addHeader(item[0], i, item[1], item[4], item[3]);
                break;
            case 2:
                addCard(item[0], i, item[1], item[4], item[3]);
                break;
            case 3:
                addBtn(item[0], i, item[1], item[4], item[5]);
                break;
            case 4:
                addCheck(item[0], i, item[4], item[6]);
                break;
            case 5:
                addInput(item[0], i, item[1]);
                break;
            case 6:
                addList(item[0], i, JSON.stringify(item[7]));
                break;
            case 7:
                iconBtn(item[0], i, item[1], item[4], item[5],"gpsBtn");
                break;
            case 8:
                iconBtn(item[0], i, item[1], item[4], item[5],"contactBtn");
                break;
            case 9:
                iconBtn(item[0], i, item[1], item[4], item[5],"servicesBtn");
                break;
            case 10:
                iconBtn(item[0], i, item[1], item[4], item[5],"homeBtn");
                break;
            case 11:
                iconBtn(item[0], i, item[1], item[4], item[5],"grupBtn");
                break;
            case 12:
                iconBtn(item[0], i, item[1], item[4], item[5],"hotelBtn");
                break;
            case 13:
                iconBtn(item[0], i, item[1], item[4], item[5],"ilanBtn");
                break;
            case 14:
                iconBtn(item[0], i, item[1], item[4], item[5],"closeBtn");
                break;
            case 15:
                iconBtn(item[0], i, item[1], item[4], item[5],"businessBtn");
                break;
            case 16:
                iconBtn(item[0], i, item[1], item[4], item[5],"adminBtn");
                break;
            case 17:
                iconBtn(item[0], i, item[1], item[4], item[5],"lockBtn");
                break;
            case 18:
                iconBtn(item[0], i, item[1], item[4], item[5],"leaveBtn");
                break;
            case 19:
                iconBtn(item[0], i, item[1], item[4], item[5],"onRadio");
                break;
            case 20:
                iconBtn(item[0], i, item[1], item[4], item[5],"offRadio");
                break;
			case 21:
                iconBtn(item[0], i, item[1], item[4], item[5],"bankBtn");
                break;	
			case 22:
                iconBtn(item[0], i, item[1], item[4], item[5],"promoBtn");
                break;
        }
        IND++;
    });
}
function show() {
    move('.phone')
        .duration(0)
        .y(0)
        .end(function () {
            move('.phone')
                .y(0)
                .set('opacity', 1)
                .end();
        });
}
function hide() {
    move('.phone')
        .y(0)
        .set('opacity', 0)
        .end();
}
// ELEMENTS //
function addHeader(id, index, text, col, color) {
    var pure = "pure-u-";
    var style = "";
    if (col === 1) pure = pure + col;
    else pure = pure + '1-2';
    style = getColor(color);

    var card = '<div id="' + index + '" data-id="' + id + '" class="' + pure + '">\
    <h1 class="'+ style + '">' + text + '</h1></div>';
    $('.main').append(card);
}
function addBtn(id, index, title, col, big,btnType) {
    var callback = "call('" + id + "','button');";
    var pure = "pure-u-";
    var style = "button";
    if (col === 1) pure = pure + col;
    else pure = pure + '1-2';
    if (big == true) style = style + " big";

    var btn = '<div id="' + index + '" data-id="' + id + '" class="' + pure + '">\
    <div onClick="'+ callback + '" class="' + style + '">' + title + '</div></div>';
    $('.main').append(btn);
}
function iconBtn(id, index, title, col, big,btnType) {
    var callback = "call('" + id + "','button');";
    var pure = "pure-u-6-24";
    var style = btnType;
    if (big == true) style = style + " big";

    var btn = '<div id="' + index + '" data-id="' + id + '" class="' + pure + '">\
    <div onClick="'+ callback + '" class="' + style + '">' + title + '</div></div>';
    $('.main').append(btn);
}

function addCard(id, index, text, col, color) {
    var pure = "pure-u-";
    var style = "";
    if (col === 1) pure = pure + col;
    else pure = pure + '1-2';
    style = getColor(color);

    var card = '<div id="' + index + '" data-id="' + id + '" class="' + pure + '">\
    <p class="'+ style + '">' + text + '</p></div>';
    $('.main').append(card);
}

function addInput(id, index, title) {
    var inp = '<div id="' + index + '" data-id="' + id + '" class="pure-u-1">\
    <input type="text" placeholder="'+ title + '"></div>';
    $('.main').append(inp);
}
function addList(id, index, elements) {
    var data = JSON.parse(elements);
    var callback = "call('" + id + "','listSelect');";
    var callLeft = "listChange('" + index + "','left');";
    var callRight = "listChange('" + index + "','right');";
    Lists[index] = data;

    var list = '<div id="' + index + '" data-id="' + id + '" class="pure-u-1"><div class="list">\
    <i class="left flaticon-left-arrow" onClick="'+ callLeft + '"></i>\
    <input id="l0" type="text" value="'+ data[0] + '" onClick="' + callback + '" readonly>\
    <i class="right flaticon-arrowhead-pointing-to-the-right" onClick="'+ callRight + '"></i>\
    </div></div>';
    $('.main').append(list);
}
function addCheck(id, index, col, checked) {
    var pure = "pure-u-";
    var chk = "";
    if (checked) chk = " checked";
    if (col === 1) pure = pure + col;
    else pure = pure + '1-2';
    var callback = "call('" + id + "','checkbox');";

    var box = '<div id="' + index + '" data-id="' + id + '" class="' + pure + '">\
    <input type="checkbox"'+ chk + ' onClick="' + callback + '"></div>';
    $('.main').append(box);
}
// ELEMENTS //
// SPECIAL //
function change(ind, data) {
    var pure = "pure-u-";
    var json = JSON.parse(data);
    if (json[4] === 1) pure = pure + json[4];
    else pure = pure + '1-2';
    var e = $('#' + ind); //main element
    var c = e.children(); //children element
    var style = "";
    if (json[5] == true) style = " big";
    var chk = "";
    if (json[6]) chk = " checked";
    switch (json[2]) {
        case 0:
            break;
        case 1:
            c.removeClass(); c.addClass(getColor(json[3])); c.html(json[1]);
            break;
        case 2:
            e.removeClass(); e.addClass(pure); c.removeClass(); c.addClass(getColor(json[3])); c.html(json[1]);
            break;
        case 3:
            e.removeClass(); e.addClass(pure); c.removeClass(); c.addClass("button" + style); c.html(json[1]);
            break;
        case 4:
            e.removeClass(); e.addClass(pure);
            break;
        case 5:
            c.html(json[1]);
            break;
        case 6:
            break;
    }
}

function listChange(id, btn) {
    var e = $('#' + id);
    //console.log(e);
    var ind = Number(e.children().children()[1].id.substr(1));
    var items = Lists[id];
    //console.log(ind);
    //console.log(items);
    if (btn == 'right') {
        if (ind + 1 < items.length) ind++;
    } else {
        if (ind - 1 >= 0) ind--;
    }
    e.children().children()[1].value = items[ind];
    e.children().children()[1].id = "l" + ind;
    call(e[0].dataset.id, 'listChange' + btn);
}

function getColor(id) {
    var Color = "";
    switch (id) {
        case 0: break;
        case 1: Color = " red"; break;
        case 2: Color = " green"; break;
        case 3: Color = " blue"; break;
        case 4: Color = " yellow"; break;
        case 5: Color = " orange"; break;
        case 6: Color = " teal"; break;
        case 7: Color = " cyan"; break;
        case 8: Color = " lime"; break;
    }
    return Color;
}
function getData() {
    var data = {};
    for (var i = 0; i <= IND - 1; i++) {
        var element = $('#' + i);//getting by index
        var id = element.get(0).id;//element id
        //console.log(element);
        var child = element.children();//child with data
        if (child.get(0).tagName === "INPUT") {
            if (child.attr("type") === "checkbox") {
                data[id] = child.prop("checked"); //checkbox state
            } else {
                data[id] = child.val();//textarea value
            }
        }
        else if (child.get(0).tagName === "DIV") {
            if (child[0].className !== "list") continue;
            var lst = {};//list data arr
            lst["Index"] = Number(child.children().get(1).id.substr(1));//index of selected item
            lst["Value"] = child.children().get(1).value;//list value
            data[id] = lst;
        }
    }
    return JSON.stringify(data);
}

function reset() {
    $('.debug').html("AppID: ");
    App = null;
    Close = null;
    Items = {};
    Lists = [];
    IND = 0;
    $('.main').empty();
}
function call(id, event) {
    //console.log(id);
    //console.log(event);
    mp.trigger('phoneCallback', id, event, getData());
}

function home() {
    if (!Home) return;
    mp.trigger('phoneNavigation', 'home');
}
function back() {
    if (!Back) return;
    mp.trigger('phoneNavigation', 'back');
}
// SPECIAL //

function startTime() {
	 	 	var today = new Date();
	  		var h = today.getHours();
	  		var m = today.getMinutes();
	 		m = checkTime(m);
	 		document.getElementById('txt').innerHTML = h + ":" + m;
	  		var t = setTimeout(startTime, 500);
		}

		function checkTime(i) {
 			if (i < 10) {i = "0" + i};
  			return i;
		}