let menu = {
    active: false,
    self: null,
    el: null,
    add: function(id, type, name, addit){
        var block = $('<div>');
        block.attr('id',id);
        block.attr('class', 'block');
        block.append('<div class="left">'+name+'</div>');
        if(type == 0) block.append('<div class="right">Устроиться</div>');
        else if(type == 1) block.append('<div class="right">Купить</div>');
		else if(type == 10) block.append('<div class="right">Продать</div>');
        else block.append('<div class="right">Взять</div>');
        block.children('.right').attr('onclick','menu.act(this)')
        if(addit !== undefined) block.append('<span>'+addit+'</span>');
        this.el.append(block);
    },
    reset: function(){
        this.el.empty();
        this.self.children('h1').html("");
        this.self.children('.buttons').children('#btn1').css('display','none');
        this.self.children('.buttons').children('#btn2').css('display','none');
        this.self.children('.buttons').children('#btn3').css('display','none');
    },
    show: function(){
        this.active = true
        this.self.css('display','block')
    },
    hide: function(){
        this.active = false
        this.self.css('display','none')
        this.reset()
    },
    act: function(e){
        var btn = $(e);
        var btnid = btn.parent()[0].id;
        var menid = this.self[0].id;
        //console.log('menu:'+menid+':'+btnid);
        mp.trigger('menu',menid,btnid);
    }
}
$(document).ready(function(){
    menu.self = $('.menu')
    menu.el = $('.menu .elements')
})
$('.menu #btn1').on('click', function(){
    var id = menu.self.attr('id');
    //console.log("menu:exit");
    mp.trigger('smExit');
});
$('.menu #btn2').on('click', function(){
    var id = menu.self.attr('id');
    //console.log("menu:exit");
    mp.trigger('menu','resign');
});
$('.menu #btn3').on('click', function(){
    var id = menu.self.attr('id');
    //console.log("menu:exit");
    mp.trigger('smExit');
});

function openWorks(level, currentjob) {

    jobselector.show(level, currentjob);
}

function openShop(data){
    menu.reset();
    menu.self.attr('id', 'shop');
    menu.self.children('h1').html("Магазин");
    var json = JSON.parse(data);
    json.forEach(function (item, i, arr) {
        // name, additional
        menu.add(i, 1,item[0],item[1]);
    });
    menu.self.children('.buttons').children('#btn3').css('display','inline-block');
}
function openFishShop(data){
    menu.reset();
    menu.self.attr('id', 'fishshop');
    menu.self.children('h1').html("Магазин");
    var json = JSON.parse(data);
    json.forEach(function (item, i, arr) {
        // name, additional
        menu.add(i, 10,item[0],item[1]);
    });
    menu.self.children('.buttons').children('#btn3').css('display','inline-block');
}
function openBlack(data){
    menu.reset();
    menu.self.attr('id', 'black');
    menu.self.children('h1').html("Черный рынок");
    var json = JSON.parse(data);
    json.forEach(function (item, i, arr) {
        // name, additional
        menu.add(i, 1,item[0],item[1]);
    });
    menu.self.children('.buttons').children('#btn3').css('display','inline-block');
}
function openFib(data){
    menu.reset();
    menu.self.attr('id', 'fib');
    menu.self.children('h1').html("Выдача оружия");
    var json = JSON.parse(data);
    json.forEach(function (item, i, arr) {
        // name, additional
        menu.add(i, 2, item);
    });
    menu.self.children('.buttons').children('#btn3').css('display','inline-block');
}
function openLspd(data){
    menu.reset();
    menu.self.attr('id', 'lspd');
    menu.self.children('h1').html("Выдача оружия");
    var json = JSON.parse(data);
    json.forEach(function (item, i, arr) {
        // name, additional
        menu.add(i, 2, item);
    });
    menu.self.children('.buttons').children('#btn3').css('display','inline-block');
}
function openArmy(data){
    menu.reset();
    menu.self.attr('id', 'army');
    menu.self.children('h1').html("Выдача одежды");
    var json = JSON.parse(data);
    json.forEach(function (item, i, arr) {
        // name, additional
        menu.add(i, 2, item);
    });
    menu.self.children('.buttons').children('#btn3').css('display','inline-block');
}
function openArmygun(data) {
    menu.reset();
    menu.self.attr('id', 'army');
    menu.self.children('h1').html("Выдача оружия");
    var json = JSON.parse(data);
    json.forEach(function (item, i, arr) {
        // name, additional
        menu.add(i, 2, item);
    });
    menu.self.children('.buttons').children('#btn3').css('display', 'inline-block');
}
function openGov(data) {
    menu.reset();
    menu.self.attr('id', 'gov');
    menu.self.children('h1').html("Выдача оружия");
    var json = JSON.parse(data);
    json.forEach(function (item, i, arr) {
        // name, additional
        menu.add(i, 2, item);
    });
    menu.self.children('.buttons').children('#btn3').css('display', 'inline-block');
}
function openGang(data) {
    menu.reset();
    menu.self.attr('id', 'gang');
    menu.self.children('h1').html("Автотранспорт");
    var json = JSON.parse(data);
    json.forEach(function (item, i, arr) {
        // name, additional
        menu.add(i, 2, item);
    });
    menu.self.children('.buttons').children('#btn3').css('display', 'inline-block');
}
function openMafia(data) {
    menu.reset();
    menu.self.attr('id', 'mafia');
    menu.self.children('h1').html("Перевозка");
    var json = JSON.parse(data);
    json.forEach(function (item, i, arr) {
        // name, additional
        menu.add(i, 2, item);
    });
    menu.self.children('.buttons').children('#btn3').css('display', 'inline-block');
}