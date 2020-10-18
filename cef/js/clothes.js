var clothes = new Vue({
    el: '.clothes',
    data:{
        active: false,
        index: 0,
        indexS: 0,
        indexC: 0,
        styles: ["Style-1","Styles-2"],
        colors: ["Colors-1","Colors-2"],
        prices: [9,99],
        btns: [true,false,false,false],
    },
    methods: {
        left: function(type){
            if(type==0){ //style
                this.indexS--
                if(this.indexS < 0) this.indexS = this.styles.length - 1
                //console.log(this.indexS)
                mp.trigger('clothes','style',this.indexS)
            } else { //color
                this.indexC--
                if(this.indexC < 0) this.indexC = this.colors.length - 1
                //console.log(this.indexC)
                mp.trigger('clothes','color',this.indexC)
            }
        },
        right: function(type){
            if(type==0){ //style
                this.indexS++
                if(this.indexS == this.styles.length) this.indexS = 0
                //console.log(this.indexS)
                mp.trigger('clothes','style',this.indexS)
            } else { //color
                this.indexC++
                if(this.indexC == this.colors.length) this.indexC = 0
                //console.log(this.indexC)
                mp.trigger('clothes','color',this.indexC)
            }
        },
        buy: function(){
            //console.log('buy')
            mp.trigger('buyClothes')
        },
        exit: function(){
            //console.log('exit')
            this.reset()
            mp.trigger('closeClothes')
        },
        reset: function(){
            this.price=-1
            this.indexS=0
            this.indexC=0
            this.styles=[]
            this.colors=[]
            this.prices=[]
        },
        btn: function(id, event){
            //console.log(event.target)
            let ind = this.btns.indexOf(true);
            if (ind > -1) this.btns[ind] = false;
            this.btns[id] = true;
            //console.log(event.target.classList)
            this.index=id;
            //bullshit
            this.active=false;
            this.active=true;
            mp.trigger('clothes', 'cat', id);
        },
    }
})