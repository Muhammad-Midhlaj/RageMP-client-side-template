var circleDesc = {
    "handshake": "handshake",
    "licenses": "Show licenses",
    "carinv":"Trunk",
    "doors":"Open/Close",
    "fraction":"Fraction",
    "offer":"Offer trade",
    "givemoney":"Give money",
    "heal":"Cure",
    "hood":"Open / Close the hood",
    "leadaway":"Lead away",
    "offerheal":"Offer heal",
    "passport":"Show ID",
    "search":"Search",
    "sellkit":"Sell medkit",
    "takegun":"Withdraw guns",
    "takeillegal":"Withdraw illeagal",
    "trunk":"Open/Close trunk",
    "pocket": "Put on / take off the bag",
    "takemask": "Rip off the mask",
    "rob": "Rob",
    "house": "House",
    "ticket": "Write out a fine",

    "sellcar": "Sell car",
    "sellhouse": "Sell house",
    "roommate": "Move into the house",
    "invitehouse": "Invite to the house",

    "acancel": "Stop Animation",

    "acat1": "Sit / Lie",
    "acat2": "Social",
    "acat3": "Phys. exercises",
    "acat4": "Indecent",
    "acat5": "Rack",
    "acat6": "Dancing",
	"acat7": "Facial emotions and gait styles",

    "seat1": "Sit reclining",
    "seat2": "Squat down",
    "seat3": "Sit on the ground",
    "seat4": "Lie on the ground",
    "seat5": "Roll on the ground",
    "seat6": "Get on your knee",
    "seat7": "Sit relaxed",
    "seat8": "Sit on the stairs",

    "social1": "Raise your hands",
    "social2": "Inspect and write",
    "social3": "Like",
    "social4": "Military greeting",
	"social5": "Twist at the temple with both hands",
    "social6": "Royal greeting",
    "social7": "Show off",
	"socialnext1": "Next page",
	
	"social8": "Dobule like",
    "social9": "Frighten",
    "social10": "Surrend",
    "social11": "Clap slowly",
	"social12": "Peace",
    "social13": "Renouncement",
    "social14": "Joy",
	"socialnext2": "Next page",
	
	"social15": "Show fish",
    "social16": "Facepalm",
    "social17": "Show chiken",
    "social18": "Okey",
	"social19": "Lead away",
    "social20": "Rock",
    "social21": "Peace all",

    "phis1": "Charging 1",
    "phis2": "Charging 2",
    "phis3": "Pump press",
	"phis4": "Push up",
	"phis5": "Meditate",

    "indecent1": "Show middle finger",
    "indecent2": "Show smt else",
	"indecent3": "Digging in the nose",
	"indecent4": "Show middle finger to all",
	"indecent5": "Show middle finger violently",

    "stay1": "Stand, hands on the belt",
    "stay2": "Knead your hands",
	"stay3": "Cross your arms over your chest",
	"stay4": "Stand, drive the man away",
	"stay5": "Stand, deny passage",
	"stay6": "Show biceps 1",
	"stay7": "Show biceps 2",
	"staynext1": "Next page",
	
	"stay8": "Show biceps 3",
    "stay9": "Show biceps 4",
	"stay10": "Show biceps 5",
	"stay11": "Show biceps 6",

    "dance1": "Dance 1",
    "dance2": "Dance 2",
    "dance3": "Dance 3",
    "dance4": "Dance 4",
    "dance5": "Dance 5",
    "dance6": "Dance 6",
    "dance7": "Dance 7",
	"dancenext1": "Next page",
	
    "dance8": "Dance 8",
	"dance9": "Dance 9",
    "dance10": "Dance 10",
    "dance11": "Dance 11",
    "dance12": "Dance 12",
    "dance13": "Dance 13",
    "dance14": "Dance 14",
	"dancenext2": "Next page",
	
	"dance15": "Dance 15",
	"dance16": "Dance 16",
    "dance17": "Dance 17",
    "dance18": "Dance 18",
    "dance19": "Dance 19",
    "dance20": "Dance 20",
    "dance21": "Dance 21",
	"dancenext3": "Next page",
	
    "dance22": "Dance 22",
	"dance23": "Dance 23",
	
	"mood0": "Clear facial emotion",
	"mood1": "Contempt",
    "mood2": "Frowning",
    "mood3": "Drunk",
    "mood4": "Joy",
    "mood5": "Surprise",
    "mood6": "Mad",
	"moodnext1": "Next page",
	
	"ws0": "Clear gait style",
	"ws1": "Swift",
    "ws2": "Sure",
    "ws3": "Drunk",
    "ws4": "Waddle",
    "ws5": "Sad",
    "ws6": "Feminine",
    "ws7": "Scared",
    
    "use": "Use",
}
var circleData = {
    "Игрок":
    [
        ["givemoney", "offer", "fraction", "passport", "licenses", "heal", "house", "handshake"],
    ],
    "Машина":
    [
        ["hood", "trunk", "doors", "carinv"],
    ],
    "Дом":
    [
        ["sellcar", "sellhouse", "roommate", "invitehouse"],
    ],
    "Фракция":
    [
        [],
        ["rob", "robguns", "pocket"],
        ["rob", "robguns", "pocket"],
        ["rob", "robguns", "pocket"],
        ["rob", "robguns", "pocket"],
        ["rob", "robguns", "pocket"],
        ["leadaway"],
        ["leadaway", "search", "takegun", "takeillegal", "takemask", "ticket"],
        ["sellkit", "offerheal"],
        ["leadaway", "search", "takegun", "takeillegal", "takemask"],
        ["leadaway", "pocket", "rob", "robguns"],
        ["leadaway", "pocket", "rob", "robguns"],
        ["leadaway", "pocket", "rob", "robguns"],
        ["leadaway", "pocket", "rob", "robguns"],
        ["leadaway"],
    ],
    "Категории":
    [
        ["acat1", "acat2", "acat3", "acat4", "acat5", "acat6", "acat7", "acancel"],
    ],
    "Анимации":
    [
        ["seat1", "seat2", "seat3", "seat4", "seat5", "seat6", "seat7", "seat8"],
        ["social1", "social2", "social3", "social4", "social5", "social6", "social7", "socialnext1"],
        ["phis1", "phis2", "phis3", "phis4", "phis5"],
        ["indecent1", "indecent2", "indecent3", "indecent4", "indecent5"],
        ["stay1", "stay2", "stay3", "stay4", "stay5", "stay6", "stay7", "staynext1"],
        ["dance1", "dance2", "dance3", "dance4", "dance5", "dance6", "dance7", "dancenext1"],
		["mood0", "mood1", "mood2", "mood3", "mood4", "mood5", "mood6", "moodnext1"],
		["dance8", "dance9", "dance10", "dance11", "dance12", "dance13", "dance14", "dancenext2"],
		["dance15", "dance16", "dance17", "dance18", "dance19", "dance20", "dance21", "dancenext3"],
		["dance22", "dance23"],
		["social8", "social9", "social10", "social11", "social12", "social13", "social14", "socialnext2"],
		["social15", "social16", "social17", "social18", "social19", "social20", "social21"],
		["ws0", "ws1", "ws2", "ws3", "ws4", "ws5", "ws6", "ws7"],
		["stay8", "stay9", "stay10", "stay11"],
    ],
}

var circle = new Vue({
    el: '.circle',
    data: {
        active: false,
        icons: [null,null,null,null,null,null,null,null],
        description: null,
        title: "title",
    },
    methods:{
        set: function(t,id){
            this.icons = circleData[t][id]
            this.description = t
            this.title = t
        },
        over: function(e){
            let id = e.target.id
            if(id == 8){
                this.description = "Закрыть"
                return;
            }
            let iname = this.icons[id]
            //console.log(id, iname)
            if(iname == null){
                this.description = this.title
                return;
            }
            this.description = circleDesc[iname]
        },
        out: function(e){
            this.description = this.title
            //console.log('out')
        },
        btn: function(e){
            let id = e.target.id
            if(id == 8){
                mp.trigger("circleCallback", -1);
                this.hide();
                return;
            }
            mp.trigger("circleCallback", Number(e.target.id));
            this.hide();
        },
        show: function(t,id){
            this.active=true
            this.set(t,id)
            setTimeout(()=>{move('.circle').set('width', '480px').set('height', '480px').set('opacity', 1).end()}, 50);
        },
        hide: function(){
            //move('.circle').set('width', '80px').set('height', '80px').set('opacity', 0).end(()=>{circle.active=false})
            circle.active = false;
        }
    }
})