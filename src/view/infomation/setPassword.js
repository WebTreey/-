import React from 'react';
import './info.scss'
import {ProvingMobile,HideConter} from '../../utils/API'
import {PromptBox} from '../../components/prompt/prompt'
import { withRouter } from 'react-router';
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
            pass2:''
        }
        this.code = 60;
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
        const value = e.target.value;
        const str = ProvingMobile(value,6);
        this.setState({
            codevalue:str
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

       
        console.log(pass===1)
    }
     //获取验证码
     handCodeClick(){
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
    }
    //提交
    handLoginClick(){
        if(this.state.pass1===''){
            this.text = '密码不能为空';
            this.setState({
                prompt:true
            })
            this.times = setTimeout(()=>{
                this.setState({
                    prompt:false
                })
                clearTimeout(this.times);
            },2000)
        }else if(this.state.codevalue===''){
            this.text = '验证码错误，请重新输入！';
            this.setState({
                prompt:true
            })
            this.times = setTimeout(()=>{
                this.setState({
                    prompt:false
                })
                clearTimeout(this.times);
            },2000)
        }else if(this.state.pass2===''){
            this.text = '密码不一致';
            this.setState({
                prompt:true
            })
            this.times = setTimeout(()=>{
                this.setState({
                    prompt:false
                })
                clearTimeout(this.times);
            },2000)
        }
    }
    render(){
        const handCodeClick =  !this.state.isSetinterval ? this.handCodeClick.bind(this) : null;
        return(
            <div className="info-me">
             {this.state.prompt ? <PromptBox text={this.text}></PromptBox> : ''}
                <div className="info-input">
                    <form className="flex-column-left">
                        <label className="flex-between">
                        <input type={this.state.inputtype1} placeholder="请输入您的登录密码" data-pass={1}  value={this.state.pass1} onChange={this.handPassword.bind(this)} ></input>
                        <img src={this.state.imgurl1} onClick={this.handImgClick.bind(this)} data-pass={1} onClick={this.handImgClick.bind(this)}></img>
                        </label>
                        <label className="flex-between">
                        <input type={this.state.inputtype2} placeholder="请确认新登录密码" data-pass={2}  value={this.state.pass2} onChange={this.handPassword.bind(this)}></input>
                        <img src={this.state.imgurl2} onClick={this.handImgClick.bind(this)} data-pass={2} onClick={this.handImgClick.bind(this)}></img>
                        </label>
                        <label className="flex-between">
                        <input type="text" placeholder="请输入短信验证码" value={this.state.codevalue} onChange={this.handCodeChange.bind(this)}></input>
                        <span onClick={handCodeClick}>{this.state.codetext}</span>
                        </label>
                    </form>
                </div>
                <div className="info-code-fs">验证码已发送{HideConter(13312345678)}</div>
                <div className="guide-btn" onClick={this.handLoginClick.bind(this)}>确认提交</div>
            </div>
        )
    }
}
export default withRouter(SetPassword)