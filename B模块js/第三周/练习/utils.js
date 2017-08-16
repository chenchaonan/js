/**
 * Created by chenchaonan on 2017/7/17.
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
        return {left: l, top: t}
    }

    function getCss(curEle, attr, val) {
        var reg;
        if ('getComputedStyle' in window) {
            val = window.getComputedStyle(curEle, null)[attr];
        } else {
            if (attr === 'opacity') {
                val = curEle.currentStyle['filter'];
                reg = /alpha\(opacity=((?:\d|[1-9]\d+)(\.\d+)?)\)/;
                var temp = reg.exec(val);
                val = temp ? temp[1] / 100 : 1;
            } else {
                val = curEle.currentStyle[attr];
            }
        }
        reg = /^[+-]?(\d|[1-9]\d)(\.\d+)?(px|pt|rem|em)?$/;
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
            curEle.styleFloat = val;
            return;
        }
        var reg = /^width|height|left|top|right|bottom|fontSize|((padding|margin)(Left|Top|Right|Bottom)?)$/;
        if (reg.test(attr)) {
            if (!isNaN(val)) {
                val += 'px';
            }
        }
        curEle.style[attr] = val;
    }

    /**
     * children 获取所有子元素节点
     * @param curEle
     * @returns {*}
     */
    function children(curEle) {
        if ('children' in curEle) {
            return curEle.children;
        }
        var childNodes = curEle.childNodes;
        var eles = [];
        for (var i = 0; i < childNodes.length; i++) {
            var node = childNodes[i];
            if (node.nodeType === 1) {
                eles[eles.length] = eles;
            }
        }
        return eles;
    }

    /**
     * prev 获取上一个哥哥元素节点
     * @param curEle
     * @returns {*|Node}
     */
    function prev(curEle) {
        if ('previousSibling' in curEle) {
            return curEle.previousElementSibling;
        }
        var p = curEle.previousSibling;
        while (p && p.nodeType !== 1) {
            p = p.previousSibling;
        }
        return p;
    }

    /**
     * prevAll 获取所有哥哥元素节点
     * @param curEle
     */
    function prevAll(curEle) {
        var p = prev(curEle);
        var arr = [];
        while (p) {
            arr.unshift(p);
            p = prev(p);
        }
    }

    /**
     * next 获取所有弟弟节点
     * @param curEle
     * @returns {*|Node}
     */
    function next(curEle) {
        if ('nextElementSibling' in curEle) {
            return curEle.nextSibling;
        }
        var n = curEle.nextSibling;
        while (n && n.nodeType !== 1) {
            n = n.nextSibling;
        }
        return n
    }

    /**
     * nextAll 获取所有的弟弟节点
     * @param curEle
     * @returns {Array}
     */
    function nextAll(curEle) {
        var n = next(n);
        var arr = [];
        while (n) {
            arr[arr.length] = n;
            n = next(n);
        }
        return arr;
    }

    /**
     * sibling 获取上下相邻的两个兄弟节点
     * @param curEle
     * @returns {Array}
     */
    function sibling(curEle) {
        var p = prev(curEle);
        var n = next(curEle);
        var eles = [];
        p && eles.push(p);
        n && eles.push(n);
        return eles;
    }

    function siblings(curEle) {
        return prevAll(curEle).concat(nextAll(curEle));
    }

    function index(curEle) {
        return prevAll(curEle).length;
    }

    function first(container) {
        var first = container.firstChild;
        while (first && first.nodeType !== 1) {
            first = first.nextSibling;
        }
        return first;
    }

    /**
     * last 获取最后一个子元素节点
     * @param container
     * @returns {*|Node}
     */
    function last(container) {
        var last = container.lastChild;
        while (last && last.nodeType !== 1) {
            last = last.nextSibling;
        }
        return last
    }

    /**
     * prepend 将元素插入到指定容器的开头
     * @param newEle
     * @param container
     */
    function prepend(newEle, container) {
        var one = first(container);
        if (one) {
            container.insertBefore(newEle, one);
            return;
        }
        container.appendChild(newEle);
    }

    /**
     * insertAfter 将元素插入到另一个元素的后边
     * @param newEle
     * @param oldEle
     */
    function insertAfter(newEle, oldEle) {
        var n = next(oldEle);
        var par = oldEle.parentNode;
        if (n) {
            par.insertBefore(newEle, n);
            return;
        }
        par.appendChild(newEle);
    }

    return {
        win: win,
        offset: offset,
        getCss: getCss,
        setCss: setCss,
        prev: prev,
        prevAll: prevAll,
        next: next,
        nextAll: nextAll,
        sibling: sibling,
        siblings: siblings,
        index: index,
        first: first,
        last: last,
        prepend: prepend,
        insertAfter:insertAfter
    }
})();