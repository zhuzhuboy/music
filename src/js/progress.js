(function ($, player) {

    class Progress {
        constructor() {
            this.curTime = null;
            this.totalTime = null;
            this.frameID = null;
            this.allTime = null;
            this.startTime = null;
            this.lastPercent = null;
            this.init()
        }
        init() {
            this.getDom()


        }
        getDom() {
            this.domCurTime = document.querySelector('.cur-time');
            this.domFontBg = document.querySelector('.font-bg')
            this.domSpot = document.querySelector('.spot')
            this.domTotalTime = document.querySelector('.total-time')
        }
        renderAllTime(duration) {
            this.allTime = duration;
            this.domTotalTime.innerHTML = this.formatTime(duration)
        }
        formatTime(duration) {

            duration = Math.round(duration);
            let m = Math.floor(duration / 60);
            let s = duration % 60;
            m = String(m).padStart(2, '0');
            s = String(s).padStart(2, '0');
            return m + ':' + s;
        }
        move(per,isDrag) {
            this.lastPercent = per===undefined?this.lastPercent:per
            cancelAnimationFrame(this.frameID)
            let cliTime = new Date().getTime()
            this.startTime = cliTime

            let frame = () => {
               
                let nowTime = new Date().getTime();
                let percent = this.lastPercent+(nowTime - cliTime) / (this.allTime * 1000);
               
                if (percent >= 0 && percent <= 1) {

                    this.upData(percent,isDrag)
                    this.frameID = requestAnimationFrame(frame)
                } else {
                    cancelAnimationFrame(this.frameID)
                }

            }
            frame()
        }
        upData(percent,isDrag) {
           
            
            let curTime = percent * this.allTime;
            let time = this.formatTime(curTime);
            this.domCurTime.innerHTML = time;
            console.log(percent)
            this.domFontBg.style.width = percent * 100 + '%'
            if(isDrag){
                return
            }
            this.domSpot.style.left = percent * 100 + '%'
        }
        stop() {
           
            let stopTime = new Date().getTime()
            console.log(this.lastPercent)
            this.lastPercent += (stopTime - this.startTime) / (this.allTime * 1000)
            
            cancelAnimationFrame(this.frameID)
        }

    }

    class Drag {
        constructor(dom) {
          
            this.dragDom = dom;
            this.offLeft = 0;
            this.init()
        }
        init() {
            this.offLeft = this.dragDom.parentNode.offsetLeft;
            this.offWidth = this.dragDom.parentNode.offsetWidth;
            this.addEvent()

        }
        addEvent() {
            this.dragDom.addEventListener('touchstart', (e) => {
                this.start && this.start()
                
            })
            this.dragDom.addEventListener('touchmove', (e) => {
                let x = e.changedTouches[0].pageX;
                let l = x - this.offLeft;
                let percent = l / this.offWidth;
                this.percent = percent;
                percent <=0?percent = 0:percent;
                percent >=1?percent = 1:percent;
                console.log(percent)
                this.dragDom.style.left = percent *100 +'%'
                this.move && this.move(percent)
            })
            this.dragDom.addEventListener('touchend', (e) => {
                this.end&&this.end(this.percent)
            })
        }

    }
    

    function instanceProgress() {
        return new Progress()
    }
   
    player.progressControl = {
        pro: instanceProgress,
        drag:Drag
    }


})(window.Zepto, window.player || (window.player = {}))