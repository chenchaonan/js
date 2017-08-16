~function () {
    var outer = document.getElementById('outer');
    var inner = outer.getElementsByClassName('inner')[0];
    var Imgs = inner.getElementsByTagName('img');
    var wid = outer.clientWidth;
    var focus = document.getElementsByClassName('focus')[0];
    var oLis = focus.getElementsByTagName('li');
    var left = outer.getElementsByClassName('left')[0];
    var right = outer.getElementsByClassName('right')[0];
    console.log(left, right);
    var len;
    var step = 0;

    //获取数据
    function getData(callBack) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'data.json');
        xhr.responseType = 'json';
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && /^2\d{2}/.test(this.status)) {
                var data = this.response;
                typeof callBack === 'function' ? callBack(data) : null;
            }
        };
        xhr.send();
    }

    getData(bindData);

    //绑定数据
    function bindData(data) {
        var str = '', str2 = '';
        for (var i = 0; i < data.length; i++) {
            var cur = data[i];
            str += '<div>';
            str += '<img real="' + cur.src + '">';
            str += '</div>';

            str2 += '<li></li>'
        }
        str += '<div><img real="' + data[0].src + '"></div>'
        inner.innerHTML = str;
        focus.innerHTML = str2;
        oLis[0].className = 'active';

        len = Imgs.length;
        delayImg(Imgs[0]);
        delayImg(Imgs[len - 1]);
        // outer.timer = setInterval(autoMove, 2000);
        bindEvent();

    }

    //轮播
    function autoMove(n) {
        !isNaN(n) ? step = n : step++;
        console.log(step);
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
                var cur = Imgs[step];
                if (cur.flag) return;
                delayImg(cur);
            }
        });
        changeBg(step);
    }


    //延迟加载
    function delayImg(img) {
        var imgSrc = img.getAttribute('real');
        var temp = new Image;
        temp.src = imgSrc;
        temp.onload = function () {
            img.src = imgSrc;
            img.flag = true;
            temp = null;
        };
        temp.onerror = function () {
            img.flag = true;
        }
    }


    //焦点选中状态控制
    function changeBg(n) {
        console.log(n);
        n === len - 1 ? n = 0 : null;
        for (var j = 0; j < oLis.length; j++) {
            console.log(j);
            j === n ? utils.addClass(oLis[j], 'active') : utils.removeClass(oLis[j], 'active');
        }
    }


    //绑定所有事件
    function bindEvent() {
        //焦点点击事件
        for (var i = 0; i < oLis.length; i++) {
            var cur = oLis[i];
            cur.n = i;
            cur.onclick = function () {
                autoMove(this.n);
            }
        }

        //绑定左右点击事件
        right.onclick = function () {
            autoMove();
        };
        left.onclick = function () {
            step--;
            if (step === -1) {
                utils.css(inner, 'left', (len - 1) * -wid);
                step = len - 2;
            }
            autoMove(step);
        };
        outer.onmouseover = function () {
            clearInterval(this.timer);
            right.style.display = left.style.display = 'block';
        };
        outer.onmouseout = function () {
            this.timer = setInterval(autoMove, 2000);
            right.style.display = left.style.display = 'none';
        }
    }
}();