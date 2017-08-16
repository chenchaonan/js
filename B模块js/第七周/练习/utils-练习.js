var utils = (function () {
    /**
     * listToArray 类数组转化成数组
     * @param likeAry 类数组
     * @returns {*}
     */
    function listToArray(likeAry) {
        try {
            return [].slice.call(likeAry, 0);
        } catch (e) {
            var newAry = [];
            for (var i = 0; i < likeAry.length; i++) {
                newAry[newAry.length] = likeAry[i];
            }
            return newAry;
        }
    }

    /**
     * jsonParse 将json字符串转化为json对象
     * @param data
     * @returns {Object}
     */
    function jsonParse(data) {
        return "JSON" in window ? JSON.parse(data) : eval('(' + data + ')')
    }

    /**
     * win 获取／设置document 文档盒模型属性
     * @param attr
     * @param val
     * @returns {*}
     */
    function win(attr, val) {
        if (typeof val === 'undefined') {//获取
            return document.documentElement[attr] || document.body[attr];
        }
        if (typeof val === 'number') {//设置
            document.documentElement[attr] = val;
            document.body[attr] = val;
        }
    }

    /**
     * offset 获取元素距离body的偏移
     * @param ele
     * @returns {{left: (Number|number), top: (Number|number)}}
     */
    function offset(ele) {
        var l = ele.offsetLeft;
        var t = ele.offsetTop;
        var p = ele.offsetParent;
        while (p.nodeName !== "BODY") {
            if (navigator.userAgent.indexOf('MSIE 8.0') === -1) {
                l += p.clientLeft;
                t += p.clientTop;
            }
            l += p.offsetLeft;
            t += p.offsetTop;
            p = p.offsetParent;
        }
        return {
            left: l,
            top: t
        }
    }

    /**
     * getCss 获取样式
     * @param curEle
     * @param attr
     * @returns {Number}
     */
    function getCss(curEle, attr) {
        var val;
        var reg;
        if ('getComputedStyle' in window) {
            val = window.getComputedStyle(curEle, null)[attr];
        } else {//IE low filter
            if (attr === 'opacity') {
                val = curEle.currentStyle['filter'];
                reg = /alpha\(opacity=((?:\d|[1-9]\d+)(?:\d+)?)\)/;
                var temp = reg.exec(val);
                // 确保有没有捕获到 如果捕获到就 得到第一个分组内容 否则返回默认值 1
                val = temp ? temp[1] / 100 : 1;
            } else {
                val = curEle.currentStyle[attr];
            }
        }
        //去掉样式值的单位 比如10px 8em 19rem 0.3 获取到的样式值 都是字符串 block red
        reg = /^[+-]?(\d|[1-9]\d+)(\.\d+)?(px|em|rem|pt)?$/;
        return reg.test(val) ? parseFloat(val) : val;
    }

    /**
     * setCss 设置元素样式
     * @param curEle
     * @param attr
     * @param val
     */
    function setCss(curEle, attr, val) {
        if (attr === 'opacity') {
            curEle.style[attr] = val;
            curEle.style['filter'] = 'alpha(opacity = ' + val * 100 + ')';
            return;
        }
        if (attr === 'float') {
            curEle.style.cssFloat = val;
            curEle.style.styleFloat = val;
            return;
        }
        //如果是以下属性自动添加单位
        var reg = /^width|height|left|top|right|bottom|fontSize|(margin|padding)(Left|Top|Right|Bottom)?$/;
        if (reg.test(attr)) {
            if (!isNaN(val)) {
                val += 'px';
            }
        }
        curEle.style[attr] = val;

    }

    /**
     * css 单独／批量是设置css
     * @param curEle 当前元素
     * @param attr 样式属性
     * @param val 样式值
     */
    function css(curEle, attr, val) {
        if (typeof attr === 'object') {//属性名和属性值以键值对的形式存在，所以attr是对象
            for (var k in attr) {
                setCss(curEle, k, attr[k]);
            }
        } else {
            setCss(curEle, attr, val)
        }
    }

    /**
     * getByClass 通过类名获取元素
     * @param cn
     * @param context
     * @returns {Array}
     */
    function getByClass(cn, context) {
        context = context || document;
        var eles = context.getElementsByTagName('*');
        var classList = cn.myTrim().split(/ +/);
        for (var i = 0; i < classList.length; i++) {
            var cur = classList[i];
            var reg = new RegExp('\\b' + cur + '\\b');
            var arr = [];
            for (var j = 0; j < eles.length; j++) {
                var ele = eles[i];
                reg.test(ele.className) ? arr[arr.length] = ele : null;
            }
            eles = arr;
        }
        return arr;
    }

    /**
     * 去除首尾空格
     * @returns {string}
     */
    String.prototype.myTrim = function () {
        var reg = /^\s+|\s+$/g;
        return this.replace(reg, '');
    };


    return {
        listToArray: listToArray,
        jsonParse: jsonParse,
        win: win,
        offset: offset,
        getCss: getCss,
        setCss: setCss,
        css: css,
        getByClass: getByClass,
    }


})();