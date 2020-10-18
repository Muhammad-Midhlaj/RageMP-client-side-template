var dialog = new Vue({
    el: '.dialog',
    data: {
        active: false,
        title: "¿De verdad quieres tener una barba?",
    },
    methods: {
        yes: function () {
            mp.trigger('dialogCallback',true)
        },
        no: function () {
            mp.trigger('dialogCallback',false)
        }
    }
})