var bsearch = new Vue({
    el: ".bsearch",
    data: {
        active: false,
        name: "First Last",
        weapons: ["AK-47","Deser Eaagle"],
        items: ["Water","Keys","Apple","Phone","Money","Stick","Laptop"]
    },
    methods: {
        set: function(json){
            var data = JSON.parse(json);
            this.name = data.Name;
            this.weapons = data.Weapons;
            this.items = data.Items;
        },
        btn: function(id){
            if(id==0) this.active=false;
            mp.trigger('bsearch', id);
        }
    }
})