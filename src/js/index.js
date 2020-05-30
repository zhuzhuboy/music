(function ($, player) {



    class Music {
        constructor(){
            this.wrap = $('#wrapper')
            this.timer = null;
            this.dataList = null;
            this.indexControl = null;
            this.progress = player.progressControl.pro();
            this.dragControl = null;
        }
        init(url){
            this.getDom()
            this.getData(url)
           
        }
        getData(url) {

            let This = this
            $.ajax({
                url: url,
                method: 'GET',
                success(data) {
                    console.log(This.controlBtns[3])
                    This.dataList = data;
                    console.log(This.dataList);
                    This.playList()
                    This.indexControl  = new player.IndexControl(data.length)
                    This.loadMusic(This.indexControl.index)
                    This.addEvent()
                    This.dragControl = new player.progressControl.drag(This.spot)
                    This.drag()
                }
            })
        }
        getDom() {
            this.controlBtns = $('.control li');
            this.imgBox = $('.img-box');
            this.spot = $('.spot')[0];
        }
        loadMusic(index) {
            console.log(index)
            // 渲染图片
   
            player.render.init(this.dataList[index]);
            player.audio.load(this.dataList[index].audioSrc)
            this.progress.renderAllTime(this.dataList[index].duration)
           
            if (player.audio.status == 'play') {
                player.audio.play();
                player.audio.status = 'play';
                this.controlBtns[2].className = 'pause';
                this.progress.move(0)
                this.imgRotate(0);
                this.playList.changeSelected(index)
            } else {
                player.audio.pause();
                player.audio.status = 'pause'
                this.controlBtns[2].className = ''
            }
        }

        addEvent() {
            this.controlBtns[0].addEventListener('touchend', () => {
                let like =this.dataList[this.indexControl.index].isLike;
                if(like == true){
                   
                    this.dataList[this.indexControl.index].isLike = false;

                }else{
                    this.dataList[this.indexControl.index].isLike = true;
                }
                
                player.render.init(this.dataList[this.indexControl.index]);
            })
            this.controlBtns[1].addEventListener('touchend', () => {
              
                player.audio.status = 'play'
                
                this.loadMusic(this.indexControl.prev())
            })
            this.controlBtns[2].addEventListener('touchend', () => {
                if (player.audio.status == 'pause') {
                    let rotate = this.imgBox.data('rotate') || 0;
                    player.audio.play();      
                    this.progress.move() 
                    player.audio.status = 'play'
                    this.controlBtns[2].className = 'pause'
                    this.imgRotate(rotate)
                } else {
                   
                    player.audio.pause();
                    this.progress.stop()
                    player.audio.status = 'pause'
                    this.controlBtns[2].className = ''
                    this.stopRotate()
                }


            })
            this.controlBtns[3].addEventListener('click', () => {

                player.audio.status = 'play'
                this.loadMusic(this.indexControl.next())
              
            })
            player.audio.end(()=>{
                
                this.controlBtns[3].click();
            })

        }

        playList(){
            this.playList = player.playList(this.dataList,this.wrap)
            this.controlBtns[4].addEventListener('touchend', () => {
              
                this.playList.slideUp()
            })
          
            this.playList.list[0].addEventListener('touchend',(e)=>{
            
               if(e.target.nodeName!=='DD' && e.target.className == 'active' || e.target.className=='close'){
                  
                return
               }
               this.indexControl.index = +e.target.dataset.index
               player.audio.status = 'play'
               this.loadMusic(this.indexControl.index)
               this.playList.slideDown()
            })
        }

        imgRotate(deg = 0) {
            clearInterval(this.timer)
            this.timer = setInterval(() => {
                deg = deg + 0.2;
                this.imgBox.css({
                    transform: `rotate(${deg}deg)`
                })
               
                this.imgBox.data('rotate',deg)
            }, 16)

        }

        stopRotate(){
            clearInterval(this.timer)
        }

        drag(){
            this.dragControl.start = ()=>{
              
                /* if(player.audio.status === 'pause'){
                    console.log(1)
                    return
                }else{
                   
                    this.progress.stop()
                } */
                
                this.progress.stop()
               
            }
            this.dragControl.move = (per)=>{
            
                this.progress.upData(per,true);
                
            }
            this.dragControl.end = (per)=>{
                this.percent = per;
                let time = this.dataList[this.indexControl.index].duration *per;
            
                player.audio.playTo(Math.round(time))
                player.audio.pause()
                player.audio.play()
                this.controlBtns[2].className = 'pause'
                this.progress.move(per)
                let rotate = this.imgBox.data('rotate') || 0;
                this.imgRotate(rotate)
                
            }
        }

    }

    new Music().init('../mock/data.json')
})(window.Zepto, window.player || (window.player = {}))