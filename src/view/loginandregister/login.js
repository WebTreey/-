import React from 'react';
import './login.scss'
import {ProvingMobile,myStorage} from '../../utils/API'
import {getSendSms,getCodelogin,getPwdlogin} from '../../utils/config'
import {PromptBox} from '../../components/prompt/prompt'
import { withRouter } from 'react-router';
import {Encrypt,MD5encode} from '../../utils/AES'
//验证码登录
class LoginFun1 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            phone:'',
            codevalue:'',
            codetext:'获取验证码',
            isSetinterval:false,
            prompt:false
        }
        this.code = 60;
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
     //验证手机号码
     handPhoneChange(e){
        this.setState({
            phone:ProvingMobile(e.target.value,11)
        })
    }
     //验证验证码
    handCodeChange(e){
        this.setState({
            codevalue: ProvingMobile(e.target.value,6)
        })
    }
     //获取验证码接口
    setSendSms(data){
        getSendSms(data).then(res=>{
            console.log(res.data)
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
                this.setPromptHide('手机号码不正确');
            }
        })
    }
    //获取验证码登陆接口
    setCodelogin(data){
        getCodelogin(data).then(res=>{
            console.log(res.data,this.props.history);
            if(res.data.code==='ok' || res.data.code==='no'){
                myStorage.set('token',res.data.token);
                myStorage.set('phone',this.state.phone);
                this.props.history.go(-1);
            }else if(res.data.code==='fail'){
                this.setPromptHide('登录失败');
            }else if(res.data.code==='no_register'){
                this.setPromptHide('账号未注册');
            }else{
                this.setPromptHide('密码错误');
            }
        })
    }
    //获取验证码
    handCodeClick(){
        if(this.state.phone!==''){
            this.setSendSms({phone:Encrypt(this.state.phone)});
        }else{
            this.setPromptHide('请输入您的电话号码')
        }
    }
    //登录
    handLoginClick(){
        if(this.state.phone===''){
            this.setPromptHide('请输入正确的手机号码！')
        }else if(this.state.codevalue===''){
            this.setPromptHide('验证码错误，请重新输入！')
        }else{
            this.setCodelogin({phone:Encrypt(this.state.phone),veryCode:this.state.codevalue})
            
        }
    }
    componentWillUnmount(){
        clearTimeout(this.times);
        this.times = null ;
    }
    render(){
        const handCodeClick =  !this.state.isSetinterval ? this.handCodeClick.bind(this) : null;
        return(
            <div className="com-input">
                 {this.state.prompt ? <PromptBox text={this.text}></PromptBox> : ''}
                <form className="flex-column-left">
                    <label className="flex-between">
                    <input type="text" placeholder="请输入您的手机号" value={this.state.phone} onChange={this.handPhoneChange.bind(this)}></input>
                    </label>
                    <label className="flex-between">
                    <input type="text" placeholder="请输入短信验证码" value={this.state.codevalue} onChange={this.handCodeChange.bind(this)}></input>
                    <span onClick={handCodeClick}>{this.state.codetext}</span>
                    </label>
                </form>
                <div className="guide-btn" onClick={this.handLoginClick.bind(this)}>立即登录</div>
            </div>
        )
    }
}
//密码登录
class LoginFun2 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            phone:'',
            password:'',
            inputtype:'password',
            imgurl:require('../../images/bishang.png')
        }
        this.code = 60;
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
    //输入手机号码验证
    handPhoneChange(e){
        this.setState({
            phone:ProvingMobile(e.target.value,11)
        })
    }
    //输入密码
    handPassChange(e){
        this.setState({
            password:e.target.value
        })
    }
    //显示密码
    handImgClick(){
        if(this.state.inputtype==='password'){
            this.setState({
                inputtype:'text',
                imgurl:require('../../images/zhengkai.png')
            })
        }else{
            this.setState({
                inputtype:'password',
                imgurl:require('../../images/bishang.png')
            })
        }
        
    }
    //登录
    handLoginClick(){
        console.log({phone:Encrypt(this.state.phone),password:MD5encode(this.state.password)})
        if(this.state.phone===''){
           this.setPromptHide('请输入正确的手机号码！')
        }else if(this.state.codevalue===''){
            this.setPromptHide('验证码错误，请重新输入！')
        }else{
            this.setPwdlogin({phone:Encrypt(this.state.phone),password:MD5encode(this.state.password)})
        }
    }
    //密码登录接口
    setPwdlogin(data){
        getPwdlogin(data).then(res=>{
            console.log(res.data)
            if(res.data.code==='ok' || res.data.code==='no'){
                myStorage.set('token',res.data.token);
                myStorage.set('phone',this.state.phone);
                this.props.history.go(-1);
            }else if(res.data.code==='fail'){
                this.setPromptHide('登录失败');
            }else if(res.data.code==='no_register'){
                this.setPromptHide('账号未注册');
            }else{
                this.setPromptHide('密码错误');
            }
        })
    }
    componentWillUnmount(){
        clearTimeout(this.times);
        this.times = null;
    }
    render(){
        return(
            <div className="com-input">
                 {this.state.prompt ? <PromptBox text={this.text}></PromptBox> : ''}
                <form className="flex-column-left">
                    <label className="flex-between">
                    <input type="text" placeholder="请输入您的手机号" value={this.state.phone} onChange={this.handPhoneChange.bind(this)}></input>
                    </label>
                    <label className="flex-between">
                    <input type={this.state.inputtype} placeholder="请输入您的登录密码" value={this.state.codevalue} onChange={this.handPassChange.bind(this)}></input>
                    <img src={this.state.imgurl} onClick={this.handImgClick.bind(this)}></img>
                    </label>
                </form>
                <div className="guide-btn" onClick={this.handLoginClick.bind(this)}>立即登录</div>
            </div>
        )
    }
}
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            Tab:[
                {id:1,value:'验证码登录'},
                {id:2,value:'密码登录'}
            ],
            activeIndex:0,
            prompt:false,
            checked:true,
            checkedclass:'login-checkbox'
        }
       
    }
    handTabClick(e){
        const index = e.target.dataset.index;
        this.setState({
            activeIndex:parseInt(index,10)
        })
    }
    handCheckbox(){
        if(this.state.checked){
            this.setState({
                checked:false,
                checkedclass:'login-checkboxdefault'
            })
        }else{
            this.setState({
                checked:true,
                checkedclass:'login-checkbox'
            })
        }
        
    }
  
    render(){
        const tab = this.state.Tab;
        const activeIndex = this.state.activeIndex;
        const Loinfun = activeIndex===0 ?  <LoginFun1 checked={this.state.checked} history={this.props.history}></LoginFun1> :  <LoginFun2 history={this.props.history} checked={this.state.checked}></LoginFun2>
        return(
            <div className="login">
                <div className="login-header flex-content">
                    <div className="login-nav flex-content">
                       {tab.map((item,index)=>{
                           const divactive = activeIndex === index ? 'divactive' : ''
                           return(
                               <div key={index} data-index={index} className={divactive} onClick={this.handTabClick.bind(this)}>{item.value}</div>
                           )
                       })}
                    </div>
                </div>
                <div className="login-main">
                    {Loinfun}
                </div>
                <div className="login-protocol flex-content">
                    <input type="checkbox" className={this.state.checkedclass} defaultChecked={this.state.checked} onClick={this.handCheckbox.bind(this)}></input>
                    <span>我已阅读并同意 <a>《 用户注册协议 》</a></span>
                </div>
            </div>
        )
    }
}

export default withRouter(Login)

