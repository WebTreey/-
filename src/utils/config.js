import Axios from 'axios';
import {myStorage} from './API'
const HOST = 'http://113.31.86.153:41070';

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
    apkVersion: '1.0',
    channel: 'baidutongji0001',
    isGroup: 1,
    phone: '13312345678',
    city: '深圳市',
    imei: ukey()
}
//首页接口
export const getHomeInof = (data) =>{
    return Axios({
            method:'post',
            url: HOST + '/v3/homeinfo',
            headers:{
                "Content-Type":"application/json"
            },
            params:data
        })
}