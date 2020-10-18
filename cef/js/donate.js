var donate = new Vue({
    el: ".donate",
    data: {
        active: false,
        balance: 0,
        menu: 0,
        totrans: null,
        aftertrans: null,
        fname: null,
        lname: null
    },
    methods: {
        close: function(){
            this.active = false
            this.balance = 0;
            this.menu = 0;
            this.totrans = null;
            this.aftertrans = null;
			this.fname = null;
			this.lname = null;
        },
        onInputTrans: function(){
            if(!this.check(this.totrans)){
                this.totrans = null;
                this.aftertrans = null;
            } else {
				if(Number(this.totrans) < 0) this.totrans = 0;
                this.aftertrans = Number(this.totrans) * 100;
            }
        },
        onInputName: function(){
            if(this.check(this.fname) || this.check(this.lname)){
                this.fname = null;
                this.lname = null;
            }
        },
        check: function(str) {
            return (/[^a-zA-Z]/g.test(str));
        },
        back: function(){
            this.menu = 4;
        },
        open: function(id){
            this.menu = id;
        },
        buy: function(id){
            let data = null;
            switch(id){
                case 1:
                data = this.fname+"_"+this.lname;
                break;
                case 2:
                data = this.totrans;
                break;
                default:
                break;
            }
            mp.trigger("donbuy", id, data);
        },
		show: function(stars){
			this.balance = stars,
			this.active = true;
		}
    }
})