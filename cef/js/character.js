var data = {
    "test":["хуй1","хуй2","хуй3","хуй4",],
    "father":["Benjamin", "Daniel", "Joshua", "Noah", "Andrew", "Juan", "Alex", "Isaac", "Evan", "Ethan", "Vincent", "Angel", "Diego", "Adrian", "Gabriel", "Michael", "Santiago", "Kevin", "Louis", "Samuel", "Anthony", "Claude", "Niko", "John"],
    "mother":["Hannah", "Aubrey", "Jasmine", "Gisele", "Amelia", "Isabella", "Zoe", "Ava", "Camila", "Violet", "Sophia", "Evelyn", "Nicole", "Ashley", "Gracie", "Brianna", "Natalie", "Olivia", "Elizabeth", "Charlotte", "Emma", "Misty"],
    "eyebrowsM":["None", "Balanced", "Fashion", "Cleopatra", "Quizzical", "Femme", "Seductive", "Pinched", "Chola", "Triomphe", "Carefree", "Curvaceous", "Rodent", "Double Tram", "Thin", "Penciled", "Mother Plucker", "Straight and Narrow", "Natural", "Fuzzy", "Unkempt", "Caterpillar", "Regular", "Mediterranean", "Groomed", "Bushels", "Feathered", "Prickly", "Monobrow", "Winged", "Triple Tram", "Arched Tram", "Cutouts", "Fade Away", "Solo Tram"],
    "eyebrowsF":["None", "Balanced", "Fashion", "Cleopatra", "Quizzical", "Femme", "Seductive", "Pinched", "Chola", "Triomphe", "Carefree", "Curvaceous", "Rodent", "Double Tram", "Thin", "Penciled", "Mother Plucker", "Straight and Narrow", "Natural", "Fuzzy", "Unkempt", "Caterpillar", "Regular", "Mediterranean", "Groomed", "Bushels", "Feathered", "Prickly", "Monobrow", "Winged", "Triple Tram", "Arched Tram", "Cutouts", "Fade Away", "Solo Tram"],
    "beard":["None", "Light Stubble", "Balbo", "Circle Beard", "Goatee", "Chin", "Chin Fuzz", "Pencil Chin Strap", "Scruffy", "Musketeer", "Mustache", "Trimmed Beard", "Stubble", "Thin Circle Beard", "Horseshoe", "Pencil and 'Chops", "Chin Strap Beard", "Balbo and Sideburns", "Mutton Chops", "Scruffy Beard", "Curly", "Curly & Deep Stranger", "Handlebar", "Faustic", "Otto & Patch", "Otto & Full Stranger", "Light Franz", "The Hampstead", "The Ambrose", "Lincoln Curtain"],
    "hairM":["None", "Buzzcut", "Faux Hawk", "Hipster", "Side Parting", "Shorter Cut", "Biker", "Ponytail", "Cornrows", "Slicked", "Short Brushed", "Spikey", "Caesar", "Chopped", "Dreads", "Long Hair", "Shaggy Curls", "Surfer Dude", "Short Side Part", "High Slicked Sides", "Long Slicked", "Hipster Youth", "Mullet", "Classic Cornrows", "Palm Cornrows", "Lightning Cornrows", "Whipped Cornrows", "Zig Zag Cornrows", "Snail Cornrows", "Hightop", "Loose Swept Back", "Undercut Swept Back", "Undercut Swept Side", "Spiked Mohawk", "Mod", "Layered Mod", "Flattop", "Rolled Quiff"],
    "hairF":["None", "Short", "Layered Bob", "Pigtails", "Ponytail", "Braided Mohawk", "Braids", "Bob", "Faux Hawk", "French Twist", "Long Bob", "Loose Tied", "Pixie", "Shaved Bangs", "Top Knot", "Wavy Bob", "Messy Bun", "Pin Up Girl", "Tight Bun", "Twisted Bob", "Flapper Bob", "Big Bangs", "Braided Top Knot", "Mullet", "Pinched Cornrows", "Leaf Cornrows", "Zig Zag Cornrows", "Pigtail Bangs", "Wave Braids", "Coil Braids", "Rolled Quiff", "Loose Swept Back", "Undercut Swept Back", "Undercut Swept Side", "Spiked Mohawk", "Bandana and Braid", "Layered Mod"],
    "hairColor":["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"],
    "eyeColor":["Green", "Emerald", "Light Blue", "Ocean Blue", "Light Brown", "Dark Brown", "Hazel", "Dark Gray", "Light Gray", "Pink", "Yellow", "Purple"]
};
Vue.component('list',{
    template: '<div v-bind:id="id" class="list">\
    <i @click="left" class="left flaticon-left-arrow"></i>\
    <div>{{ values[index] }}</div>\
    <i @click="right" class="right flaticon-arrowhead-pointing-to-the-right"></i></div>',
    props: ['id','num'],
    data: function(){
        return {
            index: 0,
            values: this.num ? [-1,-0.1,-0.2,-0.3,-0.4,-0.5,-0.6,-0.7,-0.8,-0.9,0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1] : data[this.id],
        }
    },
    methods: {
        left: function(event){
            this.index--
            if(this.index < 0) this.index=0
            this.send()
        },
        right: function(event){
            this.index++
            if(this.index == this.values.length) this.index=0
            this.send()
        },
        send: function(){
            var value = this.num ? this.values[this.index] : this.index
            //console.log('editorList:'+this.id+':'+value)
            mp.trigger('editorList', this.id, Number(value))
        }
    }
})
var editor = new Vue({
    el: ".editor",
    data: {
        active: true,
        gender: true,
        isSurgery: false,
    },
    methods: {
        genderSw: function(type){
            //console.log("gender:"+type)
            if(type){
                this.gender=true
                mp.trigger('characterGender',"Male")
            } else {
                this.gender=false
                mp.trigger('characterGender',"Female")
            }
        },
        save: function(){
            //console.log('characterSave')
            mp.trigger('characterSave')
        }
    }
});
$(function() {
    $(document).on('input', 'input[type="range"]', function(e) {
        let id = e.target.id;
        let val = e.target.value;
        //console.log('editorList:'+id+':'+val);
        $('output#'+id).html(val);
        mp.trigger('editorList', id, Number(val));
    });
    
    $('input[type=range]').rangeslider({
      polyfill: false,
    });

    $('#gendermale').on('click', function(){
        $('#genderfemale').removeClass('on');
        $('#gendermale').addClass('on');
        //console.log(this)
        editor.genderSw(true);
    });
    $('#genderfemale').on('click', function(){
        $('#gendermale').removeClass('on');
        $('#genderfemale').addClass('on');
        //console.log(this)
        editor.genderSw(false);
    });
});