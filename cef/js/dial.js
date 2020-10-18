let dial = {
    active: false,
    audio : null,
    self : null,
    num : null,
    val : 36,
    rot : 0,
    off : 2,
    tick : function(){
        if(this.rot % 2) return;
        this.audio = new Audio();
        this.audio.src = 'res/tick.mp3';
        this.audio.autoplay = true;
        this.audio.volume = 0.6;
    },
    set : function(value){
        switch(value){
            case 'minus':
                if(this.rot == 0) return;
                this.tick(); this.rot--; break;
            case 'plus':
                if(this.rot == 360) return;
                this.tick(); this.rot++; break;
        } this.num.css('transform','rotate(-'+this.rot+'deg)');
    },
    shake : function(){
        this.self.removeClass();
        this.self.addClass('dial');
        if(this.rot==this.val)
            this.self.addClass('shake3');
        else if (this.val - this.off <= this.rot && this.rot <= this.val + this.off)
            this.self.addClass('shake2');
        else if (this.val - this.off - Math.random(2, 4) <= this.rot && this.rot <= this.val + this.off + Math.random(2, 4))
            this.self.addClass('shake1');
    },
    show : function(){
        this.active = true
        this.self.css('display','block')
    },
    hide : function(){
        this.active = false
        this.self.css('display','none')
        //reset
        this.num.css('transform','rotate(-0deg)');
        this.val = 36
        this.rot = 0
    },
    send : function(){
        this.tick()
        if(this.rot == this.val){
            //console.log(true);
            mp.trigger("dial", 'call', true);
            this.hide();
        } else {
            //console.log(false);
            mp.trigger("dial", 'call', false);
        }
    }
}
$(document).ready(function(){
    dial.self = $('.dial');
    dial.num = $('.dial .num');
    $('body').css('display','block')
})
$('body').keydown(function(e){
    if(!dial.active) return;
    if(e.which == 37 || e.which == 38)
        dial.set('minus')
    else if(e.which == 39 || e.which == 40)
        dial.set('plus')
    else if(e.which == 32 || e.which == 13)
        dial.send();
    dial.shake()
})