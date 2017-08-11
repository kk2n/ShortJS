import config from './config'
// e.preventUpdate = 0;防止自动更新

let __ = {
    _stores: [],
    addStore: function (store) {
        this._stores.push(store);
    },
    reset: function () {
        this._stores = [];
    }
};
['on','one','off','trigger','emit','$emit','$on'].forEach(function(api){
    __[api] = function() {
        var args = [].slice.call(arguments);
        this._stores.forEach(function(el){
            el[api].apply(el, args);
        });
    };
});
/*
 ===================================
 用__.ajax全局代理axios
 =================================
 */
__.ajax = config.ajaxConfig;

__.t = (x,y=0) => {
    x = new TAG({el: x,pt:y});
    return x
};
/*
 ===================================
 字符券处理
 =================================
 */
// 返回字符串的实际长度, 一个汉字算2个长度
String.prototype.strlen = function () {
    return this.replace(/[^\x00-\xff]/g, "**").length;
};
//字符串超出省略
String.prototype.cutstr = function (len) {
    let restr = this;
    let wlength = this.replace(/[^\x00-\xff]/g, "**").length;
    if (wlength > len) {
        for (let k = len / 2; k < this.length; k++) {
            if (this.substr(0, k).replace(/[^\x00-\xff]/g, "**").length >= len) {
                restr = this.substr(0, k) + "..";
                break;
            }
        }
    }
    return restr;
};
//替换全部
String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2)
};
//字符串去空格
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};
String.prototype.trimAll = function () {
    return this.replace(/\s+/g, "");
};
String.prototype.trimLeft = function () {
    return this.replace(/(^\s*)/g, "");
};
String.prototype.trimRight = function () {
    return this.replace(/(\s*$)/g, "");
};
//判断是否以某个字符串开头
String.prototype.startWith = function (s) {
    return this.indexOf(s) == 0
};
//判断是否以某个字符串结束
String.prototype.endWith = function (s) {
    let d = this.length - s.length;
    return (d >= 0 && this.lastIndexOf(s) == d)
};
//

//ie不支持数组的foreach时，扩展
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (callback, thisArg) {
        let T, k;
        if (this == null) {
            throw new TypeError(" this is null or not defined");
        }
        let O = Object(this);
        let len = O.length >>> 0; // Hack to convert O.length to a UInt32
        if ({}.toString.call(callback) != "[object Function]") {
            throw new TypeError(callback + " is not a function");
        }
        if (thisArg) {
            T = thisArg;
        }
        k = 0;
        while (k < len) {
            let kValue;
            if (k in O) {
                kValue = O[k];
                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };
}
/*
 ===================================
 判断某个值是否在数组中,返回布尔
 =================================
 例：
 [1,2,3].inArray(2) ==>  true
 */
Array.prototype.inArray = function (e) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] == e)
            return true;
    }
    return false;
};
/*
 ===================================
 判断某个值在数组中的位置,返回序列，数字型
 =================================
 例：
 [1,2,3].indexOf(2) ==>  1
 */
Array.prototype.indexOf = function (e) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] == e)
            return i;
    }
    return -1;
};

/*
 ===================================
 将数组转成对象
 =================================
 例：
 [1,2,3].toObj('name') ==>  [{name:1},{name:2},{name:3}]
 */
Array.prototype.toObj = function (name) {
    let str = [];
    this.forEach((c) => {
        str.push({[name]: c});
    });
    return str
};
/*
 ===================================
 数组中找到某一个对象，返回一个对象
 =================================
 例：
 let arr=[{id:1,a:'1'},{id:2,a:'2'},{id:3,a:'3'}]
 arr=arr.findObj({id:1});
 =>{id:1,a:'1'}
 */

Array.prototype.findObj = function (obj) {
    return __._.find(this, (x) => x[__._.keys(obj)] == __._.values(obj));
};

/*
 ===================================
 排除数组中的对象Obj，返回一个数组
 =================================
 例：
 let arr=[{id:1,a:'1'},{id:2,a:'2'},{id:3,a:'3'}]
 arr=arr.rejectObj({id:1});
 =>[{id:2,a:'3'},{id:3,a:'3'}]
 */
Array.prototype.rejectObj = function (obj) {
    return __._.reject(this, (x) => x[__._.keys(obj)] == __._.values(obj));
};

/*
 ===================================
 过滤数组中的对象Obj，返回一个数组
 =================================
 例：
 let arr=[{id:1,a:'1'},{id:2,a:'2'},{id:3,a:'3'}]
 arr=arr.filterObj({id:1});
 =>[{id:1,a:'1'}]
 */
Array.prototype.filterObj = function (obj) {
    return __._.filter(this, (x) => x[__._.keys(obj)] == __._.values(obj));
};


//转义html标签
__.HtmlEncode = function (text) {
    return text.replace(/&/g, '&').replace(/\"/g, '"').replace(/</g, '<').replace(/>/g, '>')
};
/**
 * 反义html标签
 * @return {string}
 */
__.HtmlDecode = function (text) {
    let temp = document.createElement("div");
    temp.innerHTML = text;
    let output = temp.innerText || temp.textContent;
    temp = null;
    return output;
};
//获取页面高度
__.getDocHei = function () {
    let g = document, a = g.body, f = g.documentElement, d = g.compatMode == "BackCompat" ? a : g.documentElement;
    return Math.max(f.scrollHeight, a.scrollHeight, d.clientHeight);
};
//获取页面宽度
__.getDocWid = function () {
    let g = document, a = g.body, f = g.documentElement, d = g.compatMode == "BackCompat" ? a : g.documentElement;
    return Math.max(f.scrollWidth, a.scrollWidth, d.clientWidth);
};
//获取页面可视宽度
__.getWinWid = function () {
    let d = document, a = d.compatMode == "BackCompat"
        ? d.body
        : d.documentElement;
    return a.clientWidth;
};
//获取页面可视高度
__.getWinHei = function () {
    let d = document, a = d.compatMode == "BackCompat"
        ? d.body
        : d.documentElement;
    return a.clientHeight;
};

/*
 ===================================
 返回浏览器顶部
 =================================
 */
__.BackTop = function () {
    $("body,html").animate({scrollTop: 0}, 1000);
};
/*
 ===================================
 判断所用浏览器，直接返回浏览器名称，IE下返回版本...
 =================================
 */
/**
 * @return {string}
 */
__.BrowserVer = function () {
    let explorer = window.navigator.userAgent;
    let browser = "";
    if (explorer.indexOf("MSIE") >= 0) {// ie10及以下
        let b_version = navigator.appVersion;
        let version = b_version.split(";");
        version = version[1].replace(/[ ]/g, "");
        version = version.split('MSIE')[1];
        browser = 'IE:' + version;
    } else if (explorer.indexOf("Firefox") >= 0) {// Firefox
        browser = 'Firefox';
    } else if (explorer.indexOf("Chrome") >= 0) {// Chrome
        browser = 'Chrome';
    } else if (explorer.indexOf("Opera") >= 0) {// Opera
        browser = 'Opera';
    } else if (explorer.indexOf("Safari") >= 0) {// Safari
        browser = 'Safari';
    } else if (explorer.indexOf("Trident/7.0") >= 0) {// IE11
        browser = 'IE:10.0以上';
    }
    return browser;
};
/*=================================
 根据ID获取DOM
 @return {object},但强制转换成数组对象
 =================================
 */
__.getId = function (id) {
    return [document.getElementById(id.replaceAll('#', ''))]
};
/*=================================
 根据class获取DOM
 @return {array}
 =================================
 */
__.getClass = function (myclass) {
    return document.getElementsByClassName(myclass.replaceAll('\\.', ''))
};
__.addClass = function (tag, name) {
    tag.className += " " + name;
};
/*
 ============================
 获取url参数
 例子：
 // 这样调用：
 __.getUrl("参数名1");
 ============================
 */
__.getUrl = function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
};

export default __;
