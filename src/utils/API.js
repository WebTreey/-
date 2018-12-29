/*
    Date:2018/12/07,
    USE:验证，通用
*/
//纯数字输入
export const ProvingMobile = (value = "", length) => {
    let s = value.length > length ? (value + '').substring(0, length) : value;
    var rex = /[^\d]/;
    const str = (s + '').replace(rex, '')
    return str;
}
//验证身份证输入
export const ProvingID = (value = "") => {
    let s = value.length > 18 ? (value + '').substring(0, 18) : value;
    const rex = /[^\dxX]/g;
    const str = (s + '').replace(rex, '')
    return str;
}
//邮箱验证
export const ProvingEmail = (value = "") => {
    const rex = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    if (rex.test(value) || value === "") {
        return true
    }
    return false
}

//隐藏中间字符
export const HideConter = (value) => {
   
    const str = value + '';
    const len = str.length;
    if (len === 2) {
        return str.substring(0, 1) + '*'
    } else if (len === 3) {
        return str.substring(0, 1) + '*' + str.charAt(len - 1);
    } else if (len === 11) {
        return str.substring(0, 4) + '****' + str.substring(7);
    }else if (len === 18) {
        return str.substring(0, 4) + '****' + str.substring(14);
    }
    return str;
}

//获取url参数
export const GetQueryString = (param) => { //param为要获取的参数名 注:获取不到是为null
    var currentUrl = window.location.href; //获取当前链接
    var arr = currentUrl.split("?"); //分割域名和参数界限
    if (arr.length > 1) {
        arr = arr[1].split("&"); //分割参数
        for (var i = 0; i < arr.length; i++) {
            var tem = arr[i].split("="); //分割参数名和参数内容
            if (tem[0] == param) {
                return tem[1];
            }
        }
        return null;
    } else {
        return null;
    }
}
//钱币格式化
export const MoneyFormat = (num) => {
    let str = num + '';
    let arrInt = str.indexOf('.') > -1 ? str.split('.')[0] : str ;
    const arrmin = str.indexOf('.') > -1 ? '.' + str.split('.')[1] : '' ;
    const rex = /(\d+)(\d{3})/;
    while(rex.test(arrInt)){
        arrInt = arrInt.replace(rex,'$1'+','+'$2');
    }
    return arrInt + arrmin ;
}

//本地储存
export const myStorage = {
    get: function (key) {
        var value = localStorage.getItem(key);
        if (value) {
            try {
                var value_json = JSON.parse(value);
                if (typeof value_json === 'object') {
                    return value_json;
                } else if (typeof value_json === 'number') {
                    return value_json;
                }
            } catch (e) {
                return value;
            }
        } else {
            return false;
        }
    },
    set: function (key, value) {
        localStorage.setItem(key, value);
    },
    remove: function (key) {
        localStorage.removeItem(key);
    },
    clear: function () {
        localStorage.clear();
    }
};

