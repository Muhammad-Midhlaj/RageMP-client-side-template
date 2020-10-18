var jobselector = new Vue({
    el: ".joblist",
    data: {
        active: false,
        jobid: -1,
        level: 1,
        list: 
        [
            {class: "electro", name: "Electricista", level: 0, jobid: 1},
            {class: "gazon", name: "Cortacésped", level: 0, jobid: 5},
            {class: "pochta", name: "Cartero", level: 1, jobid: 2},
            {class: "taxi", name: "Taxista", level: 2, jobid: 3},
            {class: "bus", name: "Autobusero", level: 2, jobid: 4},
            {class: "mechanic", name: "Mecanico", level: 4, jobid: 8},
            {class: "truck", name: "Camionero", level: 5, jobid: 6},
            {class: "inkos", name: "Repartidor de dinero", level: 8, jobid: 7},
        ],
    },
    methods: {
        closeJobMenu: function() {
            mp.trigger("closeJobMenu");
        },
        show: function (level, currentjob) {
            this.level = level;
            this.jobid = currentjob;
            this.active = true;
        },
        hide: function () {
            this.active = false;
        },
        selectJob: function(jobid) {
            mp.trigger("selectJob", jobid);
        }
    }
})