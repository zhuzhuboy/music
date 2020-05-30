(function ($, player) {

    function playList(data, wrap) {
       
        let list = $('<div class="play-list">\
        <dl>\
            <dt >播放列表</dt>\
            <dd class="close">关闭</dd>\
        </dl>\
        </div>');
        let musicList = []
        data.forEach((target,i) => {
           
            let dd = $(`<dd>${target.name}</dd>`);
            dd.data('index',i)
            dd.insertBefore(list.find('.close'));
            musicList.push(dd)
        });
        list.appendTo(wrap)
        let offY = Math.ceil(list[0].offsetHeight)
        
        
        list[0].style.transform = `translateY(${offY}px)`;

        function slideUp(){
            list[0].style.transition = `all .5s`
            list[0].style.transform = `translateY(0px)`;
        }
        function slideDown(){
            list[0].style.transition = `all .5s`
            list[0].style.transform = `translateY(${offY}px)`;
        }
        addClose()
        function addClose(){
            list.find('.close')[0].addEventListener('touchend',()=>{
                slideDown()
            })
        }
        changeSelected(0)
        function changeSelected(index){
            for (let i = 0; i < musicList.length; i++) {
                
                musicList[i][0].className = ''
            }
            musicList[index][0].className = 'active'

        }
        return {
            slideUp,
            slideDown,
            list,
            musicList,
            changeSelected
        }
        
    }
    
    player.playList= playList;

})(window.Zepto, window.player || (window.player = {}))