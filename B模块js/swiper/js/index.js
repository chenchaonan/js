~(function () {
    var outer = document.getElementById('outer');
    var inner = outer.getElementsByClassName('inner')[0];
    var oImgs = inner.getElementsByTagName('img');
    var btns = outer.getElementsByTagName('a');
    var left = btns[0];
    var right = btns[1];
    var focus = outer.getElementsByClassName('focus')[0];
    var focusList = focus.getElementsByTagName('li');
    //console.log(outer, inner, oImgs, btns, left, right, focus,focusList);
    var wid = inner.length;
    var len;
    //1.获取数据
    function getData(callBack) {
        var xhr = new XMLHttpRequest;
        xhr.open('get', 'data.json');
        xhr.responseType = 'json';
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && /^2\d{2}$/.test(this.status)) {
                var data = this.response;
                console.log(data);
                typeof callBack === 'function' ? callBack(data) : null;
            }
        };
        xhr.send();

    }

    getData(bindData);

    //2.绑定数据
    function bindData(data) {
        var str = '';
        var str2 = '';
        for (var i = 0; i < data.length; i++) {
            var cur = data[i];
            str += '<div>';
            str += '<img real="' + cur.src + '">';
            str += '</div>';
            str2 += '<li></li>'
        }
        str += '<div><img real="' + data[0].src + '"></div>';
        inner.innerHTML = str;
        focus.innerHTML = str2;
        focusList[0].className = 'active';

        len = oImgs.length;
        delayImg(oImgs[0]);
        delayImg(oImgs[len - 1]);
        outer.timer = setInterval(autoMove, 2000);

    }

    //3.轮播动画
    function autoMove(n) {
        !isNaN(n) ? step = n : step++;
        if (step === len) {
            utils.css(inner, 'left', 0);
            step = 1;
        }
        $animate({
            ele: inner,
            target: {
                left: step * -wid
            },
            duration: 300,
            callBack: function () {
                var cur = oImgs[step];
                if(cur.flag) return;
                delayImg(cur);
            }
        });
        changBg(step);

    }

    //4.延迟加载
    function delayImg(img) {
        var imgSrc = img.getAttribute('real');
        var temp = new Image;
        temp.src = imgSrc;
        temp.onload=function () {
            img.src = imgSrc;
            img.flag = true;
            $animate({
                ele:img,
                target:{
                    opacity:1
                },
                duration:300
            });
            temp = null;
        };
        temp.onerror = function () {
            img.flag = true;
        }
    }

    // //5.控制焦点的选中状态
    //
    // function changeBg() {
    //
    // }
    //
    // //6。绑定所有事件，焦点的点击，左右点击事件，鼠标移入移出
    // function bindEvent() {
    //
    // }

})()