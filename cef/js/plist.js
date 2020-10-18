var plist = new Vue({
    el: ".plist",
    data: {
        active: false,
        online: 0,
        items: [],
        playerssort: 0,
        sortrevert: 0,
    },
    methods: {
        reset: function () {
            this.items = [];
            this.online = 0;
        },
        show: function () {
            this.reset();
            this.active = true;
        },
        hide: function () {
            this.reset();
            this.active = false;
        },
        add: function (id, nick, lvl, ping) {
            this.items.push([id, nick, lvl, ping]);
            this.online++;
        },
        sortPlayers: function(sorttype) {

            if(this.playerssort != sorttype) {
                this.playerssort = sorttype;
                this.sortrevert = 0;
            }
            else this.sortrevert = !this.sortrevert;

            var sortarray = [];
            sortarray = this.items;

            sortarray.sort(function(a, b) {
                if (a[sorttype] > b[sorttype]) return 1;
                if (a[sorttype] < b[sorttype]) return -1;
                return 0;
            });
        
            if(this.sortrevert) sortarray.reverse();
            this.members = sortarray;
        }
    }
})