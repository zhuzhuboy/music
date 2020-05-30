(function ($, player) {

    class AudioManage{
        constructor(){
            this.audio = new Audio()
            this.status = 'pause';
        }
        load(src){
           this.audio.src = src
            this.audio.load()
        }
        play(){
            this.audio.play();
            this.status = 'play'
        }
        
        pause(){
            this.audio.pause();
            this.status = 'pause'
        }
        end(fn){
            this.audio.onended =fn
        }
        playTo(time){
            console.log(time)
            this.audio.currentTime = time
        }
    }
    return player.audio = new AudioManage()

})(window.Zepto, window.player || (window.player = {}))