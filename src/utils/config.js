import Axios from 'axios';
import { myStorage } from './API'
import { Encrypt } from './AES'

// const HOST = 'http://192.168.1.127:8080';
const HOST = 'http://113.31.86.153:41070';
// const HOST = 'http://idai.iadcn.com';

//随机数imei
export const ukey = () => {
    let k;
    if (!myStorage.get('ukey')) {
        k = new Date().getTime() + Math.round(Math.random() * 10000)
        myStorage.set("ukey", k)
    } else {
        k = myStorage.get('ukey');
    }
    return k
}
//固定参数
export const setCommparams = {
    appName: ' 闪电借款王',
    appPkgName: 'shandianloanwap',
    osType: 1,
    os_type: 1,
    apkVersion: '1.0',
    apk_version: '1.0',
    channel: 'baidutongji0001',
    isGroup: 1,
    phone: Encrypt(myStorage.get('phone')) || '',
    city: myStorage.get('city') || '',
    imei: ukey()
}
//首页接口
export const getHomeInof = (data) => {
    return Axios({
        method: 'post',
        url: HOST + '/v3/homeinfo',
        headers: {
            "Content-Type": "application/json"
        },
        params: Object.assign({}, setCommparams, data)
    })
}
//获取验证码接口
export const getSendSms = (data) => {
    return Axios({
        method: 'post',
        url: HOST + '/front/sendSms',
        headers: {
            "Content-Type": "application/json"
        },
        params: Object.assign({}, setCommparams, data)
    })
}
//验证码登陆
export const getCodelogin = (data) => {
    return Axios({
        method: 'post',
        url: HOST + '/nloan/codelogin',
        headers: {
            "Content-Type": "application/json"
        },
        params: Object.assign({}, setCommparams, data)
    })
}
//密码登录
export const getPwdlogin = (data) => {
    return Axios({
        method: 'post',
        url: HOST + '/loan/pwdlogin',
        headers: {
            "Content-Type": "application/json"
        },
        params: Object.assign({}, setCommparams, data)
    })
}
//获取产品模块类型ID
export const getModuleInfo = (data) => {
    return Axios({
        method: 'post',
        url: HOST + '/v3/moduleInfo',
        headers: {
            "Content-Type": "application/json"
        },
        params: Object.assign({}, setCommparams, data)
    })
}
//产品列表
export const getRecmdInfo = (data) => {
    return Axios({
        method: 'post',
        url: HOST + '/v3/recmdInfo',
        headers: {
            "Content-Type": "application/json"
        },
        params: Object.assign({}, setCommparams, data)
    })
}
//个人资料接口
export const getIsAuth = (data) => {
    return Axios({
        method: 'post',
        url: HOST + '/loan/isAuth',
        headers: {
            "Content-Type": "application/json"
        },
        params: Object.assign({}, setCommparams, data)
    })
}
//拉消息列表
export const getSms = (data) => {
    return Axios({
        method: 'post',
        url: HOST + '/loan/getSms',
        headers: {
            "Content-Type": "application/json"
        },
        params: Object.assign({}, setCommparams, data)
    })
}
//提交个人资料
export const getDoshenqing = (data) => {
    return Axios({
        method: 'post',
        url: HOST + '/loan/doshenqing',
        headers: {
            "Content-Type": "application/json"
        },
        params: Object.assign({}, setCommparams, data)
    })
}
//保存用户信息或者查询用户信息
export const getSubUsrInfo = (data) => {
    return Axios({
        method: 'post',
        url: HOST + '/v3/subUsrInfo',
        headers: {
            "Content-Type": "application/json"
        },
        params: Object.assign({}, setCommparams, data)
    })
}
//身份证实名认证
export const getCardAuth = (data) => {
    return Axios({
        method: 'post',
        url: HOST + '/v3/cardAuth',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        params: Object.assign({}, setCommparams, data)
    })
}
//修改密码
export const getSetPassword = (data) => {
    return Axios({
        method: 'post',
        url: HOST + '/loan/setPassword',
        headers: {
            "Content-Type": "application/json"
        },
        params: Object.assign({}, setCommparams, data)
    })
}
//获取个人信息
export const getUserInfo = (data) => {
    return Axios({
        method: 'post',
        url: HOST + '/v3/userInfo',
        headers: {
            "Content-Type": "application/json"
        },
        params: Object.assign({}, setCommparams, data)
    })
}
//注册并下载（信息流渠道专用）
export const getXxlChannel = (data) => {
    return Axios({
        method: 'post',
        url: HOST + '/v3/xxlChannel',
        headers: {
            "Content-Type": "application/json"
        },
        params: Object.assign({}, setCommparams, data)
    })
}
// APK下载接口
export const getDownloadApk = (data) => {
    return `${HOST}/front/downloadApk?dn=${data.dn}&t=1`;
}
//运营商H5检测接口
export const getGoOprCheck = (data) => {
    return Axios({
        method: 'post',
        url: HOST + '/loanPay/goOprCheck',
        headers: {
            "Content-Type": "application/json"
        },
        params: Object.assign({}, setCommparams, data)
    })
}
//查询是否存在检测结果
export const getExistCheckReport = (data) => {
    return Axios({
        method: 'post',
        url: HOST + '/loanPay/existCheckReport',
        headers: {
            "Content-Type": "application/json"
        },
        params: Object.assign({}, setCommparams, data)
    })
}
//运营商检测结果的接口
export const getOperatorCheck = (data) => {
    return Axios({
        method: 'post',
        url: HOST + '/loanPay/operatorCheck',
        headers: {
            "Content-Type": "application/json"
        },
        params: Object.assign({}, setCommparams, data)
    })
}
//激活日志接口
export const getSaveHardLog = (data) => {
    return Axios({
        method: 'post',
        url: HOST + '/log/saveHardLog',
        headers: {
            "Content-Type": "application/json"
        },
        data: Object.assign({}, setCommparams, data)
    })
}
//打开日志接口
export const getSaveOpenLog = (data) => {
    return Axios({
        method: 'post',
        url: HOST + '/log/saveOpenLog',
        headers: {
            "Content-Type": "application/json"
        },
        data: Object.assign({}, setCommparams, data)
    })
}
//点击日志接口
export const getCommonClickLog = (data) => {
    return Axios({
        method: 'post',
        url: HOST + '/log/commonClickLog',
        headers: {
            "Content-Type": "application/json"
        },
        data: Object.assign({}, setCommparams, data)
    })
}