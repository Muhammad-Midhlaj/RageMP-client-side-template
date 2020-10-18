var petrol = new Vue({
    el: ".petrol",
    data: {
        active: false,
        input: ""
    },
    methods: {
        gov: function () {
            //console.log('full')
            mp.trigger('petrol.gov')
        },
		full: function () {
            //console.log('full')
            mp.trigger('petrol.full')
        },
        yes: function () {
            //console.log('yes')
            mp.trigger('petrol', this.input)
        },
        no: function () {
            //console.log('no')
            mp.trigger('closePetrol')
        },
        reset: function () {
            this.active = false
            this.input = ""
        }
    }
});