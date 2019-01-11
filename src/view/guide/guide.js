import React from 'react';
import './guide.scss';
import {ProvingMobile,myStorage,ISFirstWeb,ISFirstWebJH,getcheckPhone,GetQueryString,WinodwLink} from '../../utils/API';
import {PromptBox} from '../../components/prompt/prompt';
import {getSendSms,getCodelogin,getUrl,getSaveHardLog,getSaveOpenLog} from '../../utils/config';
import {Encrypt} from '../../utils/AES';

export default class Guide extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            phone:'',
            codevalue:'',
            codetext:'获取验证码',
            isSetinterval:false,
            prompt:false,
            checked:true,
            checkedclass:'guide-checkbox'
        }
        this.code = 60;
        // BaiDuHm();
        document.body.style.background = '#f5f5f9'
    }
    //通过百度api获取地址
    getBaiDuAPI(){
        var BMap = window.BMap;
        var map = new BMap.Map("allmap");
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
            var point = new BMap.Point(r.point.lng,r.point.lat);
            map.centerAndZoom(point,12);
            var gc = new BMap.Geocoder();  //初始化，Geocoder类
            gc.getLocation(point, function (rs) {   //getLocation函数用来解析地址信息，分别返回省市区街等
                var addComp = rs.addressComponents;
                myStorage.set('city',addComp.city)
        });
        })
    }
    //提示框隐藏显示
    setPromptHide(text){
        this.text = text;
        this.setState({
            prompt:true
        })
        clearTimeout(this.times)
        this.times = setTimeout(()=>{
            this.setState({
                prompt:false
            })
        },2000)
    }
    //打开日志
    setSaveOpenLog(){
        getSaveOpenLog().then(res=>{
            console.log(res.data)
        })
    }
    //激活日志
    setSaveHardLog(){
        getSaveHardLog().then(res=>{
            console.log(res.data)
        })
    }
    //验证手机号码
    handPhoneChange(e){
        this.setState({
            phone:ProvingMobile(e.target.value,11)
        })
    }
     //验证验证码
    handCodeChange(e){
        this.setState({
            codevalue:ProvingMobile(e.target.value,4)
        })
    }
    //登录
    handLoginClick(){
       
        if(!this.state.checked){
            this.setPromptHide('请先勾选同意用户协议')
            return false;
        }
        if(!getcheckPhone(this.state.phone)){
            this.setPromptHide('请输入正确的手机号码！')
        }else if(this.state.codevalue===''){
            this.setPromptHide('验证码错误，请重新输入')
        }else{
            this.setCodelogin({phone:Encrypt(this.state.phone),veryCode:this.state.codevalue})
        }
    }
    //复选框
    handCheckbox(){
        if(this.state.checked){
            this.setState({
                checked:false,
                checkedclass:'guide-checkboxdefault'
            })
        }else{
            this.setState({
                checked:true,
                checkedclass:'guide-checkbox'
            })
        }
    }
    //获取验证码
    handCodeClick(){
        if(this.state.phone!==''){
            this.setSendSms({phone:Encrypt(this.state.phone)});
        }else{
            this.setPromptHide('请输入您的电话号码')
        }
    }
    //页面跳转
    handLinkHome(){
        WinodwLink('/home')
        // this.props.history.push('/home');
    }
    //获取验证码接口
    setSendSms(data){
        getSendSms(data).then(res=>{
            if(res.data.code==='ok'){
                this.setPromptHide('验证码已发送');
                clearInterval(this.inTimes);
                this.inTimes = setInterval(()=>{
                    if(this.code>0){
                        this.setState({
                            codetext: this.code--,
                            isSetinterval:true
                        })
                    }else{
                        this.setState({
                            codetext:'获取验证码',
                            isSetinterval:false
                        })
                        this.code = 60;
                        clearInterval(this.inTimes);
                    }
                },1000)
            }else{
                this.setPromptHide('请输入正确的手机号码！');
            }
        })
    }
    //获取验证码登陆接口
    setCodelogin(data){
        getCodelogin(data).then(res=>{
            console.log(res.data);
            if(res.data.code==='ok'){
                WinodwLink('/home')
                // this.props.history.push('/home')
                myStorage.set('token',res.data.token)
                myStorage.set('phone',this.state.phone);
            }else if(res.data.code==='codeError'){
                this.setPromptHide('验证码错误，请重新输入')
            }
            
        })
    }
    componentDidMount(){
        myStorage.set('channel',GetQueryString('channel'));
        this.getBaiDuAPI()
        if(ISFirstWeb()){
            this.setSaveOpenLog()
        }
        if(ISFirstWebJH()){
            this.setSaveHardLog()
        }
    }
    componentWillUnmount(){
        clearTimeout(this.times)
        this.times = null;
    }
    render(){
        const handCodeClick =  !this.state.isSetinterval ? this.handCodeClick.bind(this) : null;
        return(
            <div className="guide">
                <div id="allmap" style={{display:'none'}}></div>
                {this.state.prompt ? <PromptBox text={this.text}></PromptBox> :''}
                <div className="guide-banner">
                    <img alt="" src={require('../../images/guide.jpg')}></img>
                    <div className="guide-login tran-bottom">
                        <form className="flex-column-left">
                            <label className="flex-between">
                               <input type="text" placeholder="请输入您的手机号" value={this.state.phone} onChange={this.handPhoneChange.bind(this)}></input>
                            </label>
                            <label className="flex-between">
                               <input type="text" placeholder="请输入短信验证码" value={this.state.codevalue} onChange={this.handCodeChange.bind(this)}></input>
                               <span onClick={handCodeClick}>{this.state.codetext}</span>
                            </label>
                        </form>
                    </div>
                </div>
                <div className="guide-btn" onClick={this.handLoginClick.bind(this)}>立即登录</div>
                <div className="guide-protocol flex-content">
                    <input type="checkbox" className={this.state.checkedclass} defaultChecked={this.state.checked} onClick={this.handCheckbox.bind(this)}></input>
                    <span>我已阅读并同意 <a href={getUrl()}>《 用户注册协议 》</a></span>
                </div>
                <div className="guide-footer" onClick={this.handLinkHome.bind(this)}>我先逛逛</div>
                <div className="guide-banq">CopyRight @ 2019 掌众互联网金融 版权所有</div>
            </div>
        )
    }
}