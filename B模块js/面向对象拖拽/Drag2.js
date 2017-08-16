~function () {
    function Darg(id) {
        if (!id) {
            console.warn('未传入元素');
            return;
        }
        var that = this;
        that.el = document.getElementById(id.slice(1));
        that.el.onmousedown = that.handleThis(this, that.init)
    }

    Darg.prototype = {
        constructor: Darg,
        init: init,
        down: down,
        move: move,
        up: up,
        handleThis: handleThis
    };

    function init(e) {
        var that = this;
        that.el.style.zIndex = 10;

        that.down.call(that.el, e);
        document.onmousemove = that.handleThis(that.el, that.move);
        document.onmouseup = that.handleThis(that.el, that.up);

    }

    function down(e) {
        e = e || window.event;
        this.l = e.clientX - this.offsetLeft;
        this.t = e.clientY - this.offsetTop;

        var winW = document.documentElement.clientWidth || document.body.clientWidth;
        var winH = document.documentElement.clientHeight || document.body.clientHeight;

        this.maxL = winW - this.offsetWidth;
        this.maxT = winH - this.offsetHeight;
    }

    function move(e) {
        e = e || window.event;
        e.preventDefault?e.preventDefault():e.returnValue=false;
        var l = e.clientX - this.l;
        var t = e.clientY - this.t;
        if (l < 0) {
            l = 0;
        } else if (l > this.maxL) {
            l = this.maxL;
        }
        if (t < 0) {
            t = 0;
        } else if (t > this.maxT) {
            t = this.maxT;
        }
        this.style.left = l + 'px';
        this.style.top = t + 'px';
    }

    function up() {
        document.onmousemove = null;
        document.onmouseup = null;
        this.style.zIndex = 0;
    }

    function handleThis(context, fn) {
        return function (e) {
            fn.call(context, e);
        }
    }

    window.$Darg = Darg
}();