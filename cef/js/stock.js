let stock = {
    active : false,
    self : null,
    title : null,
    value : null,
    index : 0,
    count : [10,20,30,40],
    change : function(){
        this.reset()
        switch(this.index){
            case 0:
                this.self.addClass('cash')
                this.title.html('Деньги')
            break;
            case 1:
                this.self.addClass('healkit')
                this.title.html('Kit de primeros auxilios')
            break;
            case 2:
                this.self.addClass('weed')
                this.title.html('Drogas')
            break;
            case 3:
                this.self.addClass('weapons')
                this.title.html('Оружейные материалы')
            break;
            case 4:
                this.self.addClass('weaponsstock')
                this.title.html('Оружейный склад')
            break;
        } this.value.html(this.count[this.index]);
    },
    reset : function(){
        this.self.removeClass()
        this.self.addClass('stock')
    },
    show : function(){
        this.active = true; this.change();
        this.self.css('display','block')
    },
    hide : function(){
        this.active = false;
        this.self.css('display','none')
    }
}
$(document).ready(function(){
    stock.self = $('.stock');
    stock.title = $('.stock .title label');
    stock.value = $('.stock .count span');
})
$('.stock #R').on('click',()=>{
    if(!stock.active)return;
    stock.index++;
    if(stock.index > 4) stock.index = 0;
    stock.change()
})
$('.stock #L').on('click',()=>{
    if(!stock.active)return;
    stock.index--;
    if(stock.index < 0) stock.index = 4;
    stock.change()
})
$('.stock #take').on('click',()=>{
    if(!stock.active)return;
    //console.log('stock:take:'+stock.index);
    mp.trigger('stockTake', stock.index);
    stock.hide();
})
$('.stock #put').on('click',()=>{
    if(!stock.active)return;
    //console.log('stock:put:'+stock.index);
    mp.trigger('stockPut', stock.index);
    stock.hide();
})
$('.stock #exit').on('click',()=>{
    if(!stock.active)return;
    //console.log('stock:exit');
    mp.trigger('stockExit');
    stock.hide();
})