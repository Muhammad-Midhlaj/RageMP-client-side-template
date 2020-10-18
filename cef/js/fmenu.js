var fmenu = new Vue({
    el: ".fmenu",
    data: {
        active: false,
        submenu: false,
        members: [],
        playerssort: 0,
        sortrevert: 0,
        showonly: 2,
        menu: 0,
        input: "",
        rank: "",
        btntext: ["", "", "Принять", "Выгнать", "Изменить"],
        header: ["", "", "Принять в организацию", "Выгнать из организации", "Изменить ранг"],
        btnactive: [false, false, false, false, false],
        oncounter: 0,
        ofcounter: 0,
        counter: 0,
    },
    methods: {
        set: function (json, count, on, off) {
            // JSON - array with user data
            // Count - count "All";
            // On - count "Online";
            // Off - count "Offline";
            this.members = JSON.parse(json);
            this.oncounter = on;
            this.ofcounter = off;
            this.counter = count;
        },
        btn: function (id, event) {
            //console.log(id)
            var ind = this.btnactive.indexOf(true);
            if (ind > -1) this.btnactive[ind] = false;
            if (id == 0) {
                this.reset();
                this.active = false;
                mp.trigger('closefm');
                return;
            } else {
                this.submenu = true;
                this.menu = id;
                this.btnactive[id] = true;
                //console.log(event.target.classList)
            }
        },
        submit: function () {
            //console.log('submit:' + this.menu + ':' + this.input + ':' + this.rank);
            mp.trigger("fmenu", this.menu, this.input, this.rank);
            this.active = false;
            this.reset();
        },
        reset: function () {
            this.btnactive = [false, false, false, false, false];
            this.submenu = false;
            this.members = [];
            this.input = "";
            this.rank = "";
            this.menu = 0;
        },
        sortMembers: function(sorttype) {

            if(this.playerssort != sorttype) {
                this.playerssort = sorttype;
                this.sortrevert = 0;
            }
            else this.sortrevert = !this.sortrevert;

            var sortarray = [];
            sortarray = this.members;

            sortarray.sort(function(a, b) {
                if (a[sorttype] == '-') return -1;
                if (a[sorttype] > b[sorttype]) return 1;
                if (a[sorttype] < b[sorttype]) return -1;
                return 0;
            });
        
            if(this.sortrevert) sortarray.reverse();
            this.members = sortarray;
        }
    }
})