var HUD = new Vue({
    el: ".inGameHud",
    data: {
        show: false,

        // Player data
        ammo: 0,
        money: 0,
        bank: 0,
        mic: false,
        time: "00:00",
        date: "00.00.00",

        street: "",
        crossingRoad: "",

        // Vehicle data
        inVeh: false,
		belt: false,
        engine: false,
        doors: false,
        speed: 0,
		rpm: 0,
		gear: 0,
        cruiseColor: '#ffffff', // cruise mode color ('#ffffff' = off, '#eebe00' = on)
        ifuel: 0, // Fuel Info (0 - Red, 1 - Yellow, 2 - Green)
        fuel: 0,
        hp: 0,
    },
    methods: {
        setTime: (time, date) => {
            this.time = time;
            this.date = date;
        }, 
        updateSpeed(currentspeed, maxspeed = 240)
        {
            this.speed = currentspeed;

            /*
            var speedPercent = Math.floor(currentspeed / maxspeed * 100);
            if(speedPercent > 100) speedPercent = 100;

            var 
                redColor = new Color(228, 66, 66),
                whiteColor = new Color(255, 255, 255),
                yellowColor = new Color(225, 228, 66),
                start = whiteColor,
                end = yellowColor;
        
            if (speedPercent > 50) {
                speedPercent = speedPercent % 51;
                start = yellowColor;
                end = redColor;
            }

            var 
                startColors = start.getColors(),
                endColors = end.getColors();
            var r = InterpolateColor(startColors.r, endColors.r, 50, speedPercent);
            var g = InterpolateColor(startColors.g, endColors.g, 50, speedPercent);
            var b = InterpolateColor(startColors.b, endColors.b, 50, speedPercent);
        
            $('.speed_count').css("color", "rgb(" + r + "," + g + "," + b + ")");
            */

            //

            const meters = document.querySelectorAll('svg[data-value] .meter');

            meters.forEach( (path) => {
            
                let length = path.getTotalLength();
                

            
                let c = parseInt(path.parentNode.getAttribute('data-value'));
                
                let value = 0.4166666666666667 * c;
                let rotate = -130 + (value * 2.61153846153846);
                
                let to = length * ((100 - value) / 100);
                //alert(to);
                path.getBoundingClientRect();
                
                path.style.strokeDashoffset = Math.max(0, to);  
            });
        }
    }
})

var logotype = new Vue({
    el: ".logobox",
    data: {
        show: false,
        server: 0,
        online: 0,
    }
});