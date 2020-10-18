var input = new Vue({
    el: '.input',
    data: {
        active: false,
        title: "Header",
        plholder: "Text",
        input: "",
        len: 99
    },
    methods: {
        set : function(title,help,length){
            this.title = title
            this.plholder = help
            this.len = length
            this.input = ""
        },
        send : function(){
            //console.log('input:'+this.input)
            mp.trigger('input',this.input)
        }
    }
})