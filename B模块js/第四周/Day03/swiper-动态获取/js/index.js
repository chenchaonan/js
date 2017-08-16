~(function () {
    var inner = document.getElementById('inner');
    var focus = document.getElementById('focus');
    var focusList = focus.getElementsByTagName('li');
    var wid = outer.clientWidth;
    var oImg = inner.getElementsByTagName('img');
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
        var str = '';
        var str2 = '';
        for (var i = 0; i < data.length; i++) {
            var cur = data[i];
            //拼接图片
            str += '<div>';
            str += '<img real="' + cur.src + '">';
            str += '</div>';
            //拼接焦点
            str2 += '<li></li>'
        }
        str += '<div><img real="' + data[0].src + '"></div>';
        inner.innerHTML = str;
        focus.innerHTML = str2;
        focusList[0].className = 'select';

        len = oImg.length;
        delayImg(oImg[0]);
        delayImg(oImg[len - 1]);
        outer.timer = setInterval(autoMove, 3000);
        bindEvent();
    }

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
            effect: ['Bounce', 'easeInOut'],
            duration:300,
            callBack: function () {
                var cur = oImg[step];
                if (cur.flag) return;
                delayImg(cur);
            }
        });
        changeBg(step);
    }


    //图片延迟加载
    function delayImg(img) {
        var imgSrc = img.getAttribute('real');
        var temp = new Image;
        temp.src = imgSrc;
        temp.onload = function () {
            img.src = imgSrc;
            img.flag = true;
            $animate({
                ele: img,
                target: {
                    opacity: 1
                },
                duration: 300
            });
            temp = null;
        };
        temp.onerror = function () {
            img.flag = true;
        }
    }

//切换焦点的选中样式
    function changeBg(n) {
        n === len - 1 ? n = 0 : null;
        for (var j = 0; j < focusList.length; j++) {
            j === n ? utils.addClass(focusList[j], 'select') : utils.removeClass(focusList[j], 'select')
        }
    }

    function bindEvent() {
        //焦点选中状态控制
        for (var i = 0; i < focusList.length; i++) {
            var curLi = focusList[i];
            curLi.n = i;
            curLi.onclick = function () {
                autoMove(this.n);
            }
        }

        //左右切换
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

        //鼠标滑入滑出
        outer.onmouseover = function () {
            clearInterval(inner.timer);
            left.style.display = right.style.display = 'block'
        };
        outer.onmouseout = function () {
            inner.timer = setInterval(autoMove, 2000);
            left.style.display = right.style.display = 'none'
        };
    }
})();