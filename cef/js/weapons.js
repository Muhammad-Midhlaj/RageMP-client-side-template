var weapData = [
    [ 
        ["Pistol",1],
        ["CombatPistol",2],
        ["Revolver",3],
        ["HeavyPistol",4],
    ],
    [ 
        ["BullpupShotgun",11],
    ],
    [ 
        ["CombatPDW",111],
        ["MachinePistol",112],
    ],
]
var matsGang = [
    [
        ["Pistol",1],
        ["SNSPistol",1]
    ],
    [
        ["DoubleBarrelShotgun",1],
        ["SawnoffShotgun",1]
    ],
    [
        ["MicroSMG",1],
    ],
    [],
]
var matsMafia = [
    [
        ["Pistol",1],
        ["Pistol50",1],
        ["VintagePistol",1]
    ],
    [
        ["PumpShotgun",1],
    ],
    [
        ["MiniSMG", 1]
    ],
    [
        ["AssaultRifle",1],
        ["CompactRifle",1]
    ],
]
// Name Min Max Mats CurMats
var gangAmmo = [
    ["Pistol Ammo", 0, 100, 1, 0],
    ["Shotgun Ammo", 0, 100, 4, 0],
    ["SMG Ammo", 0, 100, 2, 0],
]
var mafiaAmmo = [
    ["Pistol Ammo", 0, 100, 1, 0],
    ["Shotgun Ammo", 0, 100, 4, 0],
    ["SMG Ammo", 0, 100, 2, 0],
    ["Rifles Ammo", 0, 100, 4, 0],
]
var ammo = [
	["Pistol Ammo",0,100,2,0],
	["SMG Ammo",0,100,2,0],
	["Rifles Ammo",0,100,2,0],
	["SniperRifles Ammo",0,100,2,0],
	["Shotguns Ammo",0,100,2,0],
]
var wshop = new Vue({
    el: ".weapons_buy",
    data: {
        active: false,
        btns: [true,false,false,false,false],
        index: 1,
        items: [["Pistol",1],["SNSPistol",1]],
		sliderActive: false,
		sliders: [],
    },
    methods:{
        btn: function (id, event) {
            if (id == 4) return;
            //console.log(event.target)
            let ind = this.btns.indexOf(true);
            if (ind > -1) this.btns[ind] = false;
            this.btns[id] = true;
            //console.log(event.target.classList)
            this.index=id;
            //bullshit
            this.active=false;
            this.active=true;
            mp.trigger('wshop', 'cat', id);
        },
        buy: function(id){
            //console.log(id)
            mp.trigger('wshop', 'buy', id);
        },
        set: function(type, json){

            let prices = JSON.parse(json);

            this.sliderActive = false;
            this.sliders = [];
            if (type == 3) {
                let ammoData = ammo;
                prices.forEach(function (item, i, arr) {
                    ammoData[i][3] = item;
                });

				this.sliderActive=true;
                this.sliders = ammoData;
				this.items = [];
				return;
			}

            let data = weapData[type];
            prices.forEach(function (item, i, arr) {
                data[i][1] = item;
            });
            this.items = data;
        },
		range: function(e){
			let id = e.target.id;
			let val = e.target.value;
			this.sliders[id][4] = val * this.sliders[id][3];
			$("output#wbuyslider"+id).val(this.sliders[id][4] + "$");
		},
		rangebuy: function(e){
			let id = e.target.id;
			let val = e.target.value;
			mp.trigger('wshop', 'rangebuy', id, val);
		},
        exit: function(){
            this.active = false;
            this.items = [];
            this.index = 0;
            this.btns = [true, false, false, false, false];
            mp.trigger('closeWShop');
        }
    }
})
var wcraft = new Vue({
    el: ".weapons_craft",
    data: {
        active: false,
        btns: [true,false,false,false,false],
        index: 1,
        items: [["Pistol",1],["SNSPistol",1]],
		sliderActive: false,
		sliders: [],
    },
    methods:{
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
            mp.trigger('wcraft', 'cat', id);
        },
        buy: function(id){
            //console.log(id)
            mp.trigger('wcraft', 'buy', id);
        },
        set: function(frac, type, json){
            let data = []

            this.sliderActive = false;
            this.sliders = [];
			if(type == 4){
                this.sliderActive = true;
                this.sliders = (frac >= 1 && frac <= 5) ? gangAmmo : mafiaAmmo;
				this.items = [];
				return;
			}

            if(frac >= 1 && frac <= 5)
                data = matsGang[type];
            else if(frac >= 10 && frac <= 13)
                data = matsMafia[type];
			
            
            let prices = JSON.parse(json);
            prices.forEach(function (item, i, arr) {
                data[i][1] = item;
            });
            this.items = data;
        },
		range: function(e){
			let id = e.target.id;
			let val = e.target.value;
			this.sliders[id][4] = val * this.sliders[id][3];
			$("output#wcraftslider"+id).val(this.sliders[id][4] + "M");
		},
		rangebuy: function(e){
			let id = e.target.id;
			let val = e.target.value;
			mp.trigger('wcraft', 'rangebuy', id, val);
		},
        exit: function(){
            this.active = false;
            mp.trigger('closeWCraft');
        }
    }
})