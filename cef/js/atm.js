var atm = new Vue({
    el: '.atm',
    data: {
        active: false,
        type: 1,
        subdata: null,
        number: "99999",
        holder: "Elon Musk",
        balance: "19999$",
        taxacc: "-99$",
        plholder: "значение",
        value: "",
    },
    methods: {
        set: function (num, name, bal, tax, sub) {
            this.number = num; this.holder = name;
            this.balance = bal; this.taxacc = tax;
        },
        open: function (json) {
            this.reset();
            this.plholder = json[2];
            this.subdata = json[1];
            this.type = json[0];
        },
        btn: function (e) {
            let id = Number(e.target.id)
            mp.trigger("atmCB", this.type, id);
        },
        next: function () {
            mp.trigger('atmVal', this.value);
        },
        prev: function () {
            mp.trigger('atmCB', this.type, 0);
        },
        reset: function () {
            this.subdata = null;
            this.value = "";
            this.type = 1;
        }
    }
})