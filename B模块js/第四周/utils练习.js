/**
 * Created by chenchaonan on 2017/7/19.
 */
var utils = (function () {
    function win(attr, val) {
        if (typeof val === 'undefined') {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = val;
        document.body[attr] = val;
    }

    function offset(ele) {
        var l = ele.offsetLeft;
        var t = ele.offsetTop;
        var p = ele.offsetParent;
        while (p) {
            if (navigator.userAgent.indexOf('MSIE 8.0') === -1) {
                l += p.clientLeft;
                t += p.clientTop;
            }
            l += p.offsetLeft;
            t += p.offsetTop;
            p = p.offsetParent;
        }
    }

    function getCss(curEle, attr) {
        var val;
        var reg;
        if ('getComputed' in window) {
            val = curEle.getComputedStyle(curEle, null)[attr];
        } else {
            if (attr === 'opacity') {
                val = curEle.currentStyle['filter'];
                reg = /alpha\(opacity=((?:\d|[1-9]\d+)(?:\.\d+)?)\)/;
                var temp = reg.exec(val);
                val = temp ? temp[1] / 100 : 1;
            } else {
                val = curEle.currentStyle[attr];
            }
        }
        reg = /^[+-]?(\d|[1-9]\d+)(\.\d+)?(px|pt|em|rem)?$/;
        return reg.test(val) ? parseFloat(val) : val;
    }

    function setCss(curEle, attr, val) {
        if (attr === 'opacity') {
            curEle.style[attr] = val;
            curEle.style['filter'] = 'alpha(opacity=' + val * 100 + ')';
            return;
        }
        if (attr === 'float') {
            curEle.style.cssFloat = val;
            curEle.style.styleFloat = val;
            return;
        }
        reg = /^width|height|left|top|right|bottom|fontsize|((margin|padding)|(Left|Top|Right|Bottom)?)$/;
        if (reg.test(attr)) {
            if (!isNaN(val)) {
                val += 'px';
            }
        }
        curEle.style[attr] = val;
    }

    function css(curEle, attr, val) {
        if (typeof attr === 'object') {
            for (var k in attr) {
                setCss(curEle, k, attr[k]);
            }
        }
        setCss(curEle, attr, val);
    }


    return {
        win: win,
        offset: offset,
        getCss: getCss,
        setCss: setCss,
        css: css

    }
})();