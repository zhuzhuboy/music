(function ($, player) {

    class RenderPage {
        constructor() {
            
        }
        init(data) {
            console.log(data)
            this.data = data;
            this.renderImg()
            this.renderInfo()
            this.renderIslike()
        }
        renderImg() {
        
            let src = this.data.image;
            $('img').attr('src', src)
            player.blurImg(src)
        }
        renderInfo() {
            let data = this.data
            $('.song-name').html(data.name);
            $('.singer').html(data.singer);
            $('.album').html(data.album);
        }
        renderIslike(){
            let isLike = this.data.isLike;
         
            if(isLike){
                $('.control li').eq(0).addClass('liked')
            }else{
                $('.control li').eq(0).removeClass('liked')
            }
        }
    }

    return player.render = new RenderPage()

})(window.Zepto, window.player || (window.player = {}))