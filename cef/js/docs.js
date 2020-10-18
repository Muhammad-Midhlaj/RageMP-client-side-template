var license = new Vue({
    el: '.license',
    data : {
        active : false,
        firstname : "Elon",
        lastname : "Musk",
        date : "9999.99.99",
        gender : "Male",
        lics: "",
        timer: null
    },
    methods : {
        set : function(json){
            var data = JSON.parse(json)
            this.firstname = data[0];
            this.lastname = data[1];
            this.date = data[2];
            this.gender = data[3];
            this.lics = data[4];
        },
        hide : function(){
            this.active = false
            clearTimeout(this.timer)
            mp.trigger('dochide')
        },
        show : function(){
            this.active = true
            this.timer = setTimeout(this.hide,10000);
        }
    }
});
var passport = new Vue({
    el: '.passport',
    data : {
        active : false,
        number : "999999",
        firstname : "Elon",
        lastname : "Musk",
        date : "9999.99.99",
        gender : "Male",
        member : "-",
        work: "SpaceX",
        timer: null
    },
    methods : {
        set : function(json){
            var data = JSON.parse(json)
            this.number = data[0];
            this.firstname = data[1];
            this.lastname = data[2];
            this.date = data[3];
            this.gender = data[4];
            this.member = data[5];
            this.work = data[6];
        },
        hide : function(){
            this.active = false
            clearTimeout(this.timer)
            mp.trigger('dochide')
        },
        show : function(){
            this.active = true
            this.timer = setTimeout(this.hide,10000);
        }
    }
});