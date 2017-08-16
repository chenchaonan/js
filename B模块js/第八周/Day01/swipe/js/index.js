$(function () {
    var mySwiper = new Swiper('#container', {
        direction: 'vertical',
        loop: true,
        onTransitionEnd: function (swiper) {
            var cur = swiper.activeIndex;
            var $slides = swiper.slides;
            var len = $slides.length;
            var tarName = 'page';

           switch (cur) {
               case (len - 1): // 如果索引是len-1 id应该和 第一张一样
                   tarName += 1;
                   break;
               case 0: // 如果索引是0  id应该和倒数第二张 索引一样
                   tarName += len-2;
                   break;
               default:
                   tarName += cur;
           }
            $slides.each(function (ind, item) {
                this.id = cur !== ind ?  null : tarName;
            });
        }
    });

    var music = document.querySelector('#music');
    var audioMusic = document.querySelector('#audioMusic');
    window.onload = function () {
        audioMusic.play();
        music.style.opacity = 1;
        audioMusic.addEventListener('canplay', function () {
            music.className = 'music audioMusic';
        });
    };


    music.addEventListener('click', function () {
        if(audioMusic.paused){
            audioMusic.play();
            music.className = 'music audioMusic';
        } else {
            audioMusic.pause();
            music.className = 'music';
        }
    });
});