var lift = new Vue({
    el: ".lift",
    data: {
        active: false,
        floors: [
            "Floor 1",
            "Floor 2",
            "Floor 3"
        ],
        floor: 0
    },
    methods: {
        set: function (json) {
            this.floors = JSON.parse(json);
        },
        up: function () {
            //console.log('up')
            this.floor++;
            if (this.floor == this.floors.length)
                this.floor = this.floors.length - 1
        },
        down: function () {
            //console.log('down')
            this.floor--;
            if (this.floor < 0)
                this.floor = 0
        },
        stop: function () {
            //console.log('stop')
            mp.trigger('lift', 'stop');
        },
        start: function () {
            //console.log('start')
            mp.trigger('lift', 'start', this.floor);
        },
        reset: function () {
            this.floors = []
            this.floor = 0
            this.text = ""
        }
    }
})