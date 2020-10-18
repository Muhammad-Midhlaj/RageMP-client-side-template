var inventory = new Vue({
    el: ".vinventory",
    data: {
        active: false,
		
		limits: {
            invent: 20,
            trunk: 20,
		},

		initInvent: [],
        invent: [],
        
		trunktoggled: false,
		initTrunk: [],
		trunk: [],
		trunktype: 0,
        trunktitle: "",
		
		sType: 0,

        items: {
            "-1": 
            {
                name: "Mascara",
                type: ""
            },
            "-3":
			{
                name: "Guantes",
                type: ""
            },
            "-4":
			{
                name: "Pantalones",
                type: ""
            },
            "-5":
			{
                name: "Mochila",
                type: ""
            },
            "-6":
			{
                name: "Calzado",
                type: ""
            },
            "-7":
			{
                name: "Accesorio",
                type: ""
            },
            "-8":
			{
                name: "Ropa interior",
                type: ""
            },
            "-9":
			{
                name: "Armadura",
                type: ""
            },
            "-10":
			{
                name: "Joyería",
                type: ""
            },
            "-11":
			{
                name: "Ropa de calle",
                type: ""
            },
            "-12":
			{
                name: "Головной убор",
                type: ""
            },
            "-13":
			{
                name: "Vasos",
                type: ""
            },
            "-14":
			{
                name: "Accesorio",
                type: ""
            },
            0:
			{
                name: "Test Item",
                type: ""
            },
            1:
			{
                name: "Kit de primeros auxilios",
                type: ""
            },
            2:
			{
                name: "Frasco",
                type: ""
            },
            3:
			{
                name: "Papas fritas",
                type: ""
            },
            4:
			{
                name: "Cerveza",
                type: ""
            },
            5:
			{
                name: "Pizza",
                type: ""
            },
            6:
			{
                name: "Hamburguesa",
                type: ""
            },
            7:
			{
				name: "Pancho",
            	type: ""
			},
			8:
			{
				name: "Sandwich",
            	type: ""
			},
			9:
			{
				name: "eCola",
            	type: ""
			},
			10:
			{
				name: "Sprunk",
            	type: ""
			},
			11:
			{
				name: "Selector de bloqueo",
            	type: ""
			},
			12:
			{
				name: "Bolsa de dinero",
            	type: ""
			},
			13:
			{
				name: "Materiales",
            	type: ""
			},
			14:
			{
				name: "Drogas",
            	type: ""
			},
			15:
			{
				name: "Bolsa con taladro",
            	type: ""
			},
			16:
			{
				name: "Llave maestra militar",
            	type: ""
			},
			17:
			{
				name: "Bolso",
            	type: ""
			},
			18:
			{
				name: "Soleras",
            	type: ""
			},
			19:
			{
				name: "Llaves del coche",
            	type: ""
			},
			40:
			{
				name: "Подарок",
            	type: ""
			},
			41:
			{
				name: "llavero",
                type: ""
            },
            20: 
            {
                name: "\"En una cáscara de limón\"",
            	type: ""
			},
			21:
            {
                name: "\"На бруснике\"",
            	type: ""
			},
			22:
            {
                name: "\"Русский стандарт\"",
            	type: ""
			},
			23:
            {
                name: "\"Asahi\"",
            	type: ""
			},
			24:
            {
                name: "\"Midori\"",
            	type: ""
			},
			25:
            {
                name: "\"Yamazaki\"",
            	type: ""
			},
			26:
            {
                name: "\"Martini Asti\"",
            	type: ""
			},
			27:
            {
                name: "\"Sambuca\"",
            	type: ""
			},
			28:
            {
                name: "\"Campari\"",
            	type: ""
			},
			29:
            {
                name: "\"Jeevan\"",
            	type: ""
			},
			30:
            {
                name: "\"Ararat\"",
            	type: ""
			},
			31:
            {
                name: "\"Noyan Tapan\"",
                type: ""
            },
            100:
			{
				name: "Pistol",
                type: "weapon"
			},
			101:
			{
				name: "Combat Pistol",
            	type: "weapon"
			},
			102:
			{
				name: "Pistol .50",
            	type: "weapon"
			},
			103:
			{
				name: "SNS Pistol",
            	type: "weapon"
			},
			104:
			{
				name: "Heavy Pistol",
            	type: "weapon"
			},
			105:
			{
				name: "Vintage Pistol",
            	type: "weapon"
			},
			106:
			{
				name: "Marksman Pistol",
            	type: "weapon"
			},
			107:
			{
				name: "Revolver",
            	type: "weapon"
			},
			108:
			{
				name: "AP Pistol",
            	type: "weapon"
			},
			109:
			{
				name: "Stun Gun",
            	type: "weapon"
			},
			110:
			{
				name: "Flare Gun",
            	type: "weapon"
			},
			111:
			{
				name: "Double Action",
            	type: "weapon"
			},
			112:
			{
				name: "Pistol Mk2",
            	type: "weapon"
			},
			113:
			{
				name: "SNSPistol Mk2",
            	type: "weapon"
			},
			114:
			{
				name: "Revolver Mk2",
                type: "weapon"
            },
            115:
			{
				name: "Micro SMG",
            	type: "weapon"
			},
			116:
			{
				name: "Machine Pistol",
            	type: "weapon"
			},
			117:
			{
				name: "SMG",
            	type: "weapon"
			},
			118:
			{
				name: "Assault SMG",
            	type: "weapon"
			},
			119:
			{
				name: "Combat PDW",
            	type: "weapon"
			},
			120:
			{
				name: "MG",
            	type: "weapon"
			},
			121:
			{
				name: "Combat MG",
            	type: "weapon"
			},
			122:
			{
				name: "Gusenberg",
            	type: "weapon"
			},
			123:
			{
				name: "Mini SMG",
            	type: ""
			},
			124:
			{
				name: "SMG Mk2",
            	type: ""
			},
			125:
			{
				name: "Combat MG Mk2",
                type: ""
            },
            126:
			{
				name: "Assault Rifle",
            	type: ""
			},
			127:
			{
				name: "Carbine Rifle",
            	type: ""
			},
			128:
			{
				name: "Advanced Rifle",
            	type: ""
			},
			129:
			{
				name: "Special Carbine",
            	type: ""
			},
			130:
			{
				name: "Bullpup Rifle",
            	type: ""
			},
			131:
			{
				name: "Compact Rifle",
            	type: ""
			},
			132:
			{
				name: "Assault Rifle Mk2",
            	type: ""
			},
			133:
			{
				name: "Carbine Rifle Mk2",
            	type: ""
			},
			134:
			{
				name: "Special Carbine Mk2",
            	type: ""
			},
			135:
			{
				name: "Bullpup Rifle Mk2",
                type: ""
            },
            136:
			{
				name: "Sniper Rifle",
            	type: ""
			},
			137:
			{
				name: "Heavy Sniper",
            	type: ""
			},
			138:
			{
				name: "Marksman Rifle",
            	type: ""
			},
			139:
			{
				name: "Heavy Sniper Mk2",
            	type: ""
			},
			140:
			{
				name: "Marksman Rifle Mk2",
                type: ""
            },
            141:
			{
				name: "Pump Shotgun",
            	type: ""
			},
			142:
			{
				name: "SawnOff Shotgun",
            	type: ""
			},
			143:
			{
				name: "Bullpup Shotgun",
            	type: ""
			},
			144:
			{
				name: "Assault Shotgun",
            	type: ""
			},
			145:
			{
				name: "Musket",
            	type: ""
			},
			146:
			{
				name: "Heavy Shotgun",
            	type: ""
			},
			147:
			{
				name: "Double Barrel Shotgun",
            	type: ""
			},
			148:
			{
				name: "Sweeper Shotgun",
            	type: ""
			},
			149:
			{
				name: "Pump Shotgun Mk2",
                type: ""
            },
            180:
			{
				name: "Cuchillo",
            	type: ""
			},
			181:
			{
				name: "Palo",
            	type: ""
			},
			182:
			{
				name: "Martillo",
            	type: ""
			},
			183:
			{
				name: "Бита",
            	type: ""
			},
			184:
			{
				name: "Chatarra",
            	type: ""
			},
			185:
			{
				name: "Palo de Golf",
            	type: ""
			},
			186:
			{
				name: "Botella",
            	type: ""
			},
			187:
			{
				name: "Daga",
            	type: ""
			},
			188:
			{
				name: "Hacha",
            	type: ""
			},
			189:
			{
				name: "Nudillos de latón",
            	type: ""
			},
			190:
			{
				name: "Machete",
            	type: ""
			},
			191:
			{
				name: "Linterna",
            	type: ""
			},
			192:
			{
				name: "Cuchillo suizo",
            	type: ""
			},
			193:
			{
				name: "Кий",
            	type: ""
			},
			194:
			{
				name: "Llave",
            	type: ""
			},
			195:
			{
				name: "Hacha de batalla",
                type: ""
            },
            200:
			{
				name: "Calibre de pistola",
            	type: ""
			},
			201:
			{
				name: "Calibre pequeño",
            	type: ""
			},
			202:
			{
				name: "Calibre automático",
            	type: ""
			},
			203:
			{
				name: "Calibre francotirador",
            	type: ""
			},
			204:
			{
                name: "Fraccion",
                type: ""
            }
        },   
	
        // Player stats
        username: "",
        level: 0,
        exp: "",
        fractionname: "",
        fractionlevel: 0,
        jobname: "",
        phonenumber: "",
        status: "",
        warnscount: "",
        licensecount: "",
        registerdate: "",
        passid: "",
        bankid: "",
    },
    methods: {
        ToggleInventory: function(toggle) {
            inventory.active = toggle;

            if(toggle === false)
            {
				if(JSON.stringify(inventory.initInvent) != JSON.stringify(inventory.invent))
				{
					inventory.initInvent = inventory.invent;
					mp.trigger("inventory", 7, JSON.stringify(inventory.invent));
				}
				
				if(inventory.trunktoggled && JSON.stringify(inventory.initTrunk) != JSON.stringify(inventory.trunk))
				{
					inventory.initTrunk = inventory.trunk;
					mp.trigger("inventory", 8, JSON.stringify(inventory.trunk));
					mp.trigger("inventory", 9);
				}
				else mp.trigger("inventory", 9);
            }
            else
            {
                $(`#grid-1 .dropbox`).remove();
                $(`#grid-2 .dropbox`).remove();

                $('#grid-1').append(dropbox);
		        $('#grid-2').append(dropbox);
            }
        },
        CloseInventory: function() {
            mp.trigger("inventory", 1);
        },
        UpdateStats: function (data) {
			
            data = JSON.parse(data);

            inventory.username = data[0];
            inventory.level = data[1];
            inventory.exp = data[2];
            inventory.fractionname = data[3];
            inventory.fractionlevel = data[4];
            inventory.jobname = data[5];
            inventory.phonenumber = data[6];
            inventory.status = data[7];
            inventory.warnscount = data[8];
            inventory.licensecount = data[9];
            inventory.registerdate = data[10];
            inventory.passid = data[11];
            inventory.bankid = data[12];
			
        },
        UpdatePlayerItems: function(data) {
            
            clearItem(`inventory`);
            data = JSON.parse(data);
            for(var i = 0; i < data.length; i++)
            {
                if(i < count_max[1])
                {
					var newitem = {type: data[i][0], count: data[i][1], active: data[i][2], serial: data[i][3]};
					inventory.initInvent[i] = newitem;
                    addItem(`inventory`, newitem);
                }
            }
        },
        UpdatePlayerItem: function(index, data) {

            if(index < count_max[1])
            {
                var newitem = {type: data[0], count: data[1], active: data[2], serial: data[3]};
                updateItem(`inventory`, index, newitem);
            }
        },
        
        UpdateTrunkItems: function(data) {

            clearItem(`trunk`);
			data = JSON.parse(data);
			inventory.trunktype = data[0];
            inventory.trunktitle = data[1];
            for(var i = 0; i < data[2].length; i++)
            {
                if(i < count_max[2])
                {
					var newitem = {type: data[2][i][0], count: data[2][i][1], active: data[2][i][2], serial: data[2][i][3]};
					inventory.initTrunk[i] = newitem;
                    addItem(`trunk`, newitem);
                }
            }
		},
		
		ContextHandler: function(act, element) {

			if(JSON.stringify(inventory.initInvent) != JSON.stringify(inventory.invent))
			{
				inventory.initInvent = inventory.invent;
				mp.trigger("inventory", 7, JSON.stringify(inventory.invent));
			}

			//let type = (this.sType) ? 0 : this.trunktype;
			mp.trigger("inventoryContext", act, type, element);
		}
    }
});