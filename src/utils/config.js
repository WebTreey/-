import Axios from 'axios';
import { myStorage ,GetQueryString} from './API'
import { Encrypt } from './AES'
import { RSAEncrypt ,SHASign } from './index'
var MobileDetect = require('./mobile-detect')
// export const HOST = 'http://192.168.1.127:8080';
export const HOST = 'http://113.31.86.153:41070';
//export const HOST = 'http://idai.iadcn.com';
// export const HOST = 'http://192.168.1.191:9080';



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
export const setCommparams = ()=> {
    return {
        appName: '闪电贷款王', 
        appPkgName: 'shandianloanwap',
        osType: 1,
        os_type: 1,
        apkVersion: '1.0',
        apk_version: '1.0',
        channel: myStorage.get('channel') || 'natureChannel',
        isGroup: 1,
        phone: myStorage.get('phone') ? Encrypt(myStorage.get('phone')) : '',
        city: myStorage.get('city') || '',
        imei: ukey()
    }
}
export const getLinkUrl = (type) =>{
    const com = setCommparams()
    if(!type){
        return `?app_name=${setCommparams().appName}&pkg_name=${setCommparams().appPkgName}&channel=${setCommparams().channel}&version_code=100&
        icon_name=ostype1com.zhangzhong.jieqianban001&os_type=${setCommparams().os_type}&company_name=深圳掌众互联网金融服务有限公司&company_simple_name=掌众金融&sddH5=1
        `
    }
    return `?apk_version=${com.apk_version}&os_type=${com.os_type}&appPkgName=${com.appPkgName}&channel=${com.channel}&sddH5=1`

}
//获取手机数据
export const getMobileDetect = () =>
{
    const md = new MobileDetect(window.navigator.userAgent);
    // console.log( md.mobile() );          // 'Sony'
    // console.log( md.phone() );           // 'Sony'
    // console.log( md.tablet() );          // null
    // console.log( md.userAgent() );       // 'Safari'
    // console.log( md.os() );              // 'AndroidOS'
    // console.log( md.is('iPhone') );      // false
    // console.log( md.is('bot') );         // false
    // console.log( md.version('Webkit') );         // 534.3
    // console.log( md.versionStr('Build') );       // '4.1.A.0.562'
    // console.log( md.match('playstation|xbox') ); // false
    let os = '';
    if (md.os() === "iOS") {//ios系统的处理  
        os =  md.version("iPhone");  
       
    } else if (os === "AndroidOS") {//Android系统的处理  
        os = md.version("Android");  
       
    } 
    return {
        mobile:md.mobile(),
        phone:md.phone(),
        tablet:md.tablet(),
        userAgent:md.userAgent(),
        os:md.os(),
        isIPhone:md.is('iPhone'),
        isBot:md.tablet('bot'),
        version:os,
        versionStr:md.versionStr('Build'),
        match:md.match('playstation|xbox')
    }
   
}

// APK下载接口
export const getDownloadApk = (data) => {
    return `${HOST}/front/downloadApk?dn=${data.dn}&t=1`;
}
//注册协议
export const getUrl = () =>{
    const url = `${HOST}/about/regist_agreement?app_name=${setCommparams().appName}&company_name=深圳掌众互联网金融服务有限公司`;
    return url;
}

//首页接口
export const getHomeInof = (data) => {
    return Axios({
        method: 'post',
        url: HOST + '/v3/homeinfo',
        headers: {
            "Content-Type": "application/json"
        },
        params: Object.assign({}, setCommparams(), data)
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
        params: Object.assign({}, setCommparams(), data)
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
        params: Object.assign({}, setCommparams(), data)
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
        params: Object.assign({}, setCommparams(), data)
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
        params: Object.assign({}, setCommparams(), data)
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
        params: Object.assign({}, setCommparams(), data)
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
        params: Object.assign({}, setCommparams(), data)
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
        params: Object.assign({}, setCommparams(), data)
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
        params: Object.assign({}, setCommparams(), data)
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
        params: Object.assign({}, setCommparams(), data)
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
        params: Object.assign({}, setCommparams(), data)
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
        params: Object.assign({}, setCommparams(), data)
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
        params: Object.assign({}, setCommparams(), data)
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
        params: Object.assign({}, setCommparams(), data)
    })
}
//运营商H5检测接口
export const getGoOprCheck = (data) => {
    return Axios({
        method: 'post',
        url: HOST + '/loanPay/goOprCheck',
        headers: {
            "Content-Type": "application/json"
        },
        params: Object.assign({}, setCommparams(), data)
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
        params: Object.assign({}, setCommparams(), data)
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
        params: Object.assign({}, setCommparams(), data)
    })
}
//运营商完整报告点击
export const getOperatorReport = (data)=>{
    return Axios({
        method: 'post',
        url: HOST + '/loanPay/operatorReport',
        headers: {
            "Content-Type": "application/json"
        },
        params: {data:RSAEncrypt(JSON.stringify(Object.assign({}, setCommparams(), data,{appName: encodeURIComponent('闪电贷款王'),city: encodeURIComponent(myStorage.get('city'))}))),sign:SHASign(JSON.stringify(Object.assign({}, setCommparams(), data,{appName: encodeURIComponent('闪电贷款王'),city: encodeURIComponent(myStorage.get('city'))})))}
    })
}

//激活日志接口
export const getSaveHardLog = (data) => {
    const par = getMobileDetect()
    const d = {
        brand:par.phone,
        model:(par.mobile==='UnknownPhone' || !par.mobile) ? '未知' : par.mobile,
        version:par.version
    }
    return Axios({
        method: 'post',
        url: HOST + '/log/saveHardLog',
        headers: {
            "Content-Type": "application/json"
        },
        params: Object.assign({}, setCommparams(), data, d)
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
        params: Object.assign({}, setCommparams(), data)
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
        data: Object.assign({}, setCommparams(), data)
    })
}
//banner点击统计
export const getAddBannerClickLog =(data) =>{
    return Axios({
        method: 'post',
        url: HOST + '/log/addBannerClickLog',
        headers: {
            "Content-Type": "application/json"
        },
        data: Object.assign({}, setCommparams(), data)
    })
}
//支付接口
export const getoperatorPay = (data) =>{
    return Axios({
        method: 'post',
        url: HOST + '/loanPay/operatorPay',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        params: Object.assign({}, setCommparams(), data)
    })
}
// 查询支付结果的接口
export const getOperatorPayResult = (data) =>{
    return Axios({
        method: 'post',
        url: HOST + '/loanPay/getOperatorPayResult',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        params: Object.assign({}, setCommparams(), data)
    })
}
// 点击黑名单立即检测判断是否已经付费
export const getBlackListCheck = (data) =>{
    return Axios({
        method: 'post',
        url: HOST + '/nLoanPay/blackListCheck',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        params: Object.assign({}, setCommparams(), data)
    })
}
//点击黑名单理解支付付费
export const getPay = (data) =>{
    return Axios({
        method: 'post',
        url: HOST + '/nLoanPay/pay',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        params: Object.assign({}, setCommparams(), data)
    })
}
//黑名单查询支付结果
export const getPayResult = (data) =>{
    return Axios({
        method: 'post',
        url: HOST + '/nLoanPay/getPayResult',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        params: Object.assign({}, setCommparams(), data)
    })
}
//查询检测结果
export const getCheckResult = (data) =>{
    return Axios({
        method: 'post',
        url: HOST + '/nLoanPay/getCheckResult',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        params: Object.assign({}, setCommparams(), data)
    })
}
//黑名单升级支付
export const getPayLevel = (data) =>{
    return Axios({
        method: 'post',
        url: HOST + '/nLoanPay/payLevel',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        params: Object.assign({}, setCommparams(), data)
    })
}
//黑名单查询升级支付结果
export const getPayResultNew = (data) =>{
    return Axios({
        method: 'post',
        url: HOST + '/nLoanPay/getPayResultNew',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        params: Object.assign({}, setCommparams(), data)
    })
}