var outer = document.getElementById('outer');
var inner = document.getElementById('inner');
var oImg = inner.getElementsByTagName('img');
//获取轮播图片个数
var len = oImg.length;

var focus = document.getElementById('focus');
var focusList = focus.getElementsByTagName('li');

var btns = outer.getElementsByTagName('a');
var left = btns[0];
var right = btns[1];
console.log(left);

//获取轮播视口的宽度
var wid = outer.clientWidth;
console.log(wid);

delayImg(oImg[0]);
delayImg(oImg[len - 1]);

var step = 0;//记录当前图片的索引
inner.timer = setInterval(autoMove, 2000)

function autoMove(n) {
    //step++;//当前要切换的索引
    !isNaN(n) ? step = n : step++;
    if (step === len) {
        utils.css(inner, 'left', 0);//当切换图片已经到头时，立马变成第一张
        step = 1;//紧接着让此时的动画切换到第二张
    }
    //utils.setCss(inner, 'left', step * -wid);
    $animate({
        ele: inner,
        target: {
            left: step * -wid
        },
        duration: 300,
        callBack: function () {
            var cur = oImg[step];
            if (cur.flag) return;
            delayImg(cur);
        }
    });
    changBg(step)
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

//焦点
for (var i = 0; i < focusList.length; i++) {
    var curLi = focusList[i];
    curLi.n = i;
    curLi.onclick = function () {
        autoMove(this.n);
    }
}
//切换焦点的选中样式
function changBg(n) {
    n >= len - 1 ? n = 0 : null;
    for (var i = 0; i < focusList.length; i++) {
        var oLi = focusList[i];
        i === n ? utils.addClass(oLi, 'select') : utils.removeClass(oLi, 'select');
    }
}

//鼠标滑入滑出
outer.onmouseover = function () {
    clearInterval(inner.timer);
    left.style.display = right.style.display = 'block'
};
outer.onmouseout = function () {
    inner.timer = setInterval(autoMove, 2000);
    left.style.display = right.style.display = 'none'
};

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
            duration: 200
        })
    };
    temp.onerror = function () {
        img.flag = true;
    }
}