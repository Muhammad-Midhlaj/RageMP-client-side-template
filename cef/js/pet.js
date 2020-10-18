var petshop = new Vue({
    el: ".petshop",
    data: {
        active: false,
        indexM: 0,
        indexC: 0,
        models: ["Husky", "Cat"],
		hashes: [1318032802, 1462895032],
        prices: [500000,500000],
        header: "Магазин Питомцев"
    },
    methods: {
        left: function(type){
            if(type==0){ //model
                this.indexM--
                if(this.indexM < 0) this.indexM = 0
                mp.trigger('petshop','model',this.indexM)
            }
        },
        right: function(type){
            if(type==0){ //model
                this.indexM++
                if(this.indexM == this.models.length) this.indexM = 0
                mp.trigger('petshop','model',this.indexM)
            }
        },
        buy: function(){
            mp.trigger('buyPet')
        },
        exit: function(){
            this.reset()
            mp.trigger('closePetshop')
        },
        reset: function(){
            this.price=-1
            this.indexM=0
            this.indexC=0
            this.models=[]
            this.prices=[]
        }
    }
})