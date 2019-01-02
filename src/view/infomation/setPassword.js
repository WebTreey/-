import React from 'react';
import './info.scss'
import {ProvingMobile,HideConter,myStorage} from '../../utils/API'
import {PromptBox} from '../../components/prompt/prompt'
import {getSetPassword,getSendSms} from '../../utils/config'
import { withRouter } from 'react-router';
import {Encrypt,MD5encode} from '../../utils/AES'
class SetPassword extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            phone:'',
            codevalue:'',
            inputtype1:'password',
            inputtype2:'password',
            codetext:'获取验证码',
            imgurl1:require('../../images/bishang.png'),
            imgurl2:require('../../images/bishang.png'),
            pass1:'',
            pass2:'',
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
    //获取修改密码接口
    setPassword(data){
        getSetPassword(data).then(res=>{
            console.log(res.data)
            if(res.data.code==='ok'){
                this.setPromptHide('修改成功');
                this.props.history.go(-1);
            }else{
                this.setPromptHide('修改失败')
            }
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
    handPassword(e){
        const pass = parseInt(e.target.dataset.pass,10);
        const value = e.target.value
        if(pass===1){
            this.setState({
                pass1:value
            })
        }else{
            this.setState({
                pass2:value
            })
        }
    }
    //验证验证码 
    handCodeChange(e){
        this.setState({
            codevalue:ProvingMobile(e.target.value,6)
        })
    }
    //点击隐藏或显示密码 
    handImgClick(e){
        const pass = parseInt(e.target.dataset.pass,10);
        if(pass===1){
            if(this.state.inputtype1==='password'){
                this.setState({
                    inputtype1:'text',
                    imgurl1:require('../../images/zhengkai.png')
                })
            }else{
                this.setState({
                    inputtype1:'password',
                    imgurl1:require('../../images/bishang.png')
                })
            }
        }else {
            if(this.state.inputtype2==='password'){
                this.setState({
                    inputtype2:'text',
                    imgurl2:require('../../images/zhengkai.png')
                })
            }else{
                this.setState({
                    inputtype2:'password',
                    imgurl2:require('../../images/bishang.png')
                })
            }
        }
    }
    //获取验证码
    handCodeClick(){
        this.setSendSms({phone:Encrypt(myStorage.get('phone'))})
    }
    //提交
    handLoginClick(){
        if(this.state.pass1===''){
            this.setPromptHide('密码不能为空')
        }else if(this.state.codevalue===''){
            this.setPromptHide('验证码错误，请重新输入')
        }else if(this.state.pass2==='' || this.state.pass2!==this.state.pass1){
            this.setPromptHide('密码不一致')
        }else{
            const data = {
                phone:Encrypt(myStorage.get('phone')),
                password:MD5encode(this.state.pass1),
                password2:MD5encode(this.state.pass2),
                veryCode:this.state.codevalue}
            this.setPassword(data);
        }
    }
    componentWillUnmount(){
        clearTimeout(this.times);
        this.times = null ;
    }
    render(){
        const inputtype1 = this.state.inputtype1 || 'password';
        const inputtype2 = this.state.inputtype2 || 'password';
        const handCodeClick =  !this.state.isSetinterval ? this.handCodeClick.bind(this) : null;
        return(
            <div className="info-me">
             {this.state.prompt ? <PromptBox text={this.text}></PromptBox> : ''}
                <div className="info-input">
                    <form className="flex-column-left info-setpass">
                        <label className="flex-between">
                        <input type={inputtype1} placeholder="请输入密码" data-pass={1}  value={this.state.pass1} onChange={this.handPassword.bind(this)} ></input>
                        <img alt="" src={this.state.imgurl1} onClick={this.handImgClick.bind(this)} data-pass={1} onClick={this.handImgClick.bind(this)}></img>
                        </label>
                        <label className="flex-between">
                        <input type={inputtype2} placeholder="请确认新密码" data-pass={2}  value={this.state.pass2} onChange={this.handPassword.bind(this)}></input>
                        <img alt="" src={this.state.imgurl2} onClick={this.handImgClick.bind(this)} data-pass={2} onClick={this.handImgClick.bind(this)}></img>
                        </label>
                        <label className="flex-between">
                        <input type="text" placeholder="请输入短信验证码" value={this.state.codevalue} onChange={this.handCodeChange.bind(this)}></input>
                        <span onClick={handCodeClick}>{this.state.codetext}</span>
                        </label>
                    </form>
                </div>
                <div className="info-code-fs">验证码已发送{HideConter(myStorage.get('phone'))}</div>
                <div className="guide-btn" onClick={this.handLoginClick.bind(this)}>确认提交</div>
            </div>
        )
    }
}
export default withRouter(SetPassword)