(function ($, player) {

    class IndexControl{
        constructor(len){
            this.len = len;
            this.index = 0;
        }
        prev(){
            return this.getIndex(-1)
        }
        next(){
            return this.getIndex(1)
        }
        getIndex(val){
            this.index = (this.index+val+this.len)%this.len;
            return this.index;
        }
    }
    player.IndexControl = IndexControl;

})(window.Zepto, window.player || (window.player = {}))