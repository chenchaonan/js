/**
 * Created by chenchaonan on 2017/7/25.
 */
$(function () {
    var $outer = $('#outer'), $imgs = $outer.find('img'),
        $left = $outer.find('.left'), $right = $outer.find('.right'),
        $focus = $outer.find('.focus'), $oLis = $focus.find('li');
    var len = $imgs.size();
    // console.log($outer,$imgs,$focus,$oLis,len,$left,$right);
    //首张图加载
    delayImg($imgs.eq(0));
    var step = 0;
    //轮播
    $outer[0].timer = setInterval(move, 2000);
    function move(n) {
        !isNaN(n) ? step = n : step++;
        if (step === len) {
            step = 0;
        }
        $imgs.stop(true, true).eq(step).fadeIn(300, function () {
            if (this.flag) return;
            delayImg($(this));
        }).siblings('img').fadeOut(300);
        $oLis.eq(step).addClass('active').siblings('li').removeClass('active');
    }

    //鼠标经过暂停，离开自动播放
    $outer.hover(function () {
        clearInterval(this.timer);
        $left.fadeIn(300);
        $right.fadeIn(300);
    }, function () {
        this.timer = setInterval(move, 2000);
        $left.fadeOut(300);
        $right.fadeOut(300);
    });

    //左右按钮点击切换
    $right.click(move);
    $left.click(function () {
        step--;
        if (step === -1) {
            step = len - 1;
        }
        move(step);
    });
    //焦点切换
    $oLis.mouseover(function () {
        move($(this).index())
    });

    //延迟加载
    function delayImg($img) {
        var imgSrc = $img.attr('real');
        var temp = new Image;
        $(temp).prop('src', imgSrc);
        $(temp).load(function () {
            $img.prop('src', imgSrc).fadeIn(300);
            $img[0].flag = true;
        })
    }

});