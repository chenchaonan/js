/**
 * Created by chenchaonan on 2017/7/19.
 */
~function () {
    //获取操作元素
    var outer = document.getElementById('outer');
    var inner = document.getElementById('inner');
    var oImg = document.getElementsByTagName('img');
    var wid = outer.clientWidth;
    var step = 0;
    var len = oImg.length;
    // inner.timer = setInterval(function () {
    //     step++;
    //     if (step === len) {
    //         utils.css(inner, 'left', 0);//如果此时到达最后一张后，立刻变成第一张
    //         //紧接着从第一张变成第二张
    //         step = 0;
    //     }
    //     $animate({
    //         ele: inner,
    //         target: {
    //             left: step * -wid,
    //         },
    //         duration: 300
    //     })
    // }, 2000)
    inner.timer = setInterval(function () {
        step--;
        if (step === -1 ) {
            utils.css(inner, 'left', (oImg.length - 1) * -wid);
            step = oImg.length - 2;
        }
        $animate({
            ele: inner,
            target: {
                left: step * -wid,
            },
            duration: 300
        })
    }, 2000)
}();
