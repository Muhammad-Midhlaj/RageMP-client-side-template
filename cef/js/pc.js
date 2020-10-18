let pc = {
    active : false,
    self : null,
    head : null,
    el : null,
    openCar : function(model, owner){
        this.reset()
        this.head.html('База номеров')
        this.el.append('<input type="text" maxlength="5" placeholder="Номер">')
        this.el.append('<div class="button">Пробить</div>')
        this.el.append('<p>МАРКА: <span></span></p><p>ВЛАДЕЛЕЦ: <span></span></p>')
        this.el.children('p:first').children().html(model)
        this.el.children('p:last').children().html(owner)
        this.set()
    },
    openWanted : function(data){
        this.reset()
        this.head.html('Сейчас в розыске')
        this.el.append('<ol></ol>')
        var json = JSON.parse(data);
        json.forEach(function(item, i, arr) {
            pc.el.children('ol').append('<li>'+item+'</li>');
        });
    },
    openPerson : function(fname,lname,pass,gender,lvl,lic){
        this.reset()
        this.head.html("База данных")
        this.el.append('<input type="text" maxlength="30" placeholder="Паспорт/Имя_Фамилия">')
        this.el.append('<div class="button">Пробить</div>')
        this.el.append('<p>Имя: <span>'+fname+'</span></p>')
        this.el.append('<p>Фамилия: <span>' + lname + '</span></p>')
        this.el.append('<p>Паспорт: <span>' + pass + '</span></p>')
        this.el.append('<p>Пол: <span>'+gender+'</span></p>')
        this.el.append('<p>Ур. Розыска: <span>'+lvl+'</span></p>')
        this.el.append('<p>Список лицензий: <span>'+lic+'</span></p>')
        this.set()
    },
    clearWanted : function(){
        this.reset()
        this.head.html("Снять с розыска")
        this.el.append('<input type="text" maxlength="30" placeholder="Паспорт/Имя_Фамилия">')
        this.el.append('<div class="button">Очистить розыск</div>')
        this.set()
    },
    set : function(){
        $('.button').on('click', function(){
            var t = $(this);
            //console.log(t);
            var data = $('input')[0].value;
            //console.log('pcMenuInput:'+data);
            mp.trigger('pcMenuInput', data);
        });
    },
    reset : function(){
        $('.button').off('click');
        $(".elements").empty();
    },
    show : function(){
        this.active = true
        this.self.css('display','block')
    },
    hide : function(){
        this.active = false
        this.self.css('display','none')
    }
}
$('.pc menu li').on('click', function(){
    var t = $(this)
    //console.log("pcMenu:"+t[0].id);
    mp.trigger('pcMenu', Number(t[0].id));
})
$(document).ready(function(){
    pc.head = $('.pc .right h1')
    pc.el = $('.pc .right .elements')
    pc.self = $('.pc');
})