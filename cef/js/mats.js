var mats = new Vue({
    el: ".mats",
    data: {
        active: false,
        isArmy: true,
        isMed: false,
    },
    methods: {
        load: function(id){
            mp.trigger('matsL', id)
            this.active=false
        },
        unload: function(id){
            mp.trigger('matsU', id);
            this.active=false
        },
        cancel: function(){
            mp.trigger('matsU',0)
            this.active=false
        },
        show: function(statea, statem){
            this.active=true
            this.isArmy=statea
            this.isMed=statem
        }
    }
})