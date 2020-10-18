var auto = new Vue({
    el: ".auto",
    data: {
        active: false,
        bizInfoActive: false,
        bizSellPrice: 1,
        indexM: 0,
        indexC: 0,
        models: ["Tesla Model S","Tesla Model 3","Tesla Model X"],
        modelsName: [],
        colors: ["Black Briliant","Blueberry","Cold White"],
        prices: [19,199,1999],
        header: "Автосалон"
    },
    computed: {
        bizIncome: function() {
            return this.bizSellPrice*0.04;
        }
    },
    methods: {
        left: function(type){
            if(type==0){ //model
                this.indexM--
                if(this.indexM < 0) this.indexM = 0
                //console.log(this.indexM)
                mp.trigger('auto','model',this.indexM)
            } else { //color
                this.indexC--
                if(this.indexC < 0) this.indexC = 0
                //console.log(this.indexC)
                mp.trigger('auto','color',this.indexC)
            }
        },
        right: function(type){
            if(type==0){ //model
                this.indexM++
                if(this.indexM == this.models.length) this.indexM = 0
                //console.log(this.indexM)
                mp.trigger('auto','model',this.indexM)
            } else { //color
                this.indexC++
                if(this.indexC == this.colors.length) this.indexC = 0
                //console.log(this.indexC)
                mp.trigger('auto','color',this.indexC)
            }
        },
        auto: function (index) {
            this.indexM = index
            mp.trigger('auto','model', index)
        },
        buyBiz: function () {
            mp.trigger('buyBizCommand');
        },
		buyVehicle() {
				const obj = { model: this.vehicles[this.complete].model, id: this.complete};
				mp.trigger("events.callRemote", "autoSaloon.buyNewCar", JSON.stringify(obj));
				mp.trigger("events.callRemote", "autoSaloon.exit");
				mp.trigger("autoSaloon.deleteVehicle");
				mp.trigger("autoSaloon.setStatusMenu", false);
				mp.trigger("autoSaloon.destroyCam");
		},
        buy: function(){
            //console.log('buy')
            mp.trigger('buyAuto')
        },
        exit: function(){
            //console.log('exit')
            this.reset()
            mp.trigger('closeAuto')
        },
		rotate: function() {
            mp.trigger('rotateAuto', Number(this.rotationAuto))
        },
        reset: function(){
            this.price=-1
            this.indexM=0
            this.indexC=0
            this.models=[]
            this.colors=[]
            this.prices=[]
        }
    }
})