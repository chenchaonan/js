/**
 * Created by chenchaonan on 2017/7/5.
 */
var utils=(function () {
    function liketoArray(likeAry) {
        try {
            return [].slice.call(likeAry, 0);//IE6-8不兼容，会报错
        } catch (e) {
            var arr=[];
            for (var i = 0; i < likeAry.length; i++) {
                arr.push(likeAry[i]);
            }
            return arr;
        }
    }
    function add(a, b) {
        return a + b
    }


    return {
        likeToArray: liketoArray
    }

})();