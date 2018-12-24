import React from 'react';
import './guide.scss';
import {ProvingMobile} from '../../utils/API'
import {PromptBox} from '../../components/prompt/prompt'
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
            codevalue:ProvingMobile(e.target.value,6)
        })
    }
    //登录
    handLoginClick(){
        if(this.state.phone===''){
            this.text = '请输入正确的手机号码！';
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
            this.text = '请输入正确的手机号码！';
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
            <div className="guide">
                {this.state.prompt ? <PromptBox text={this.text}></PromptBox> : ''}
                <div className="guide-banner">
                    <img src={require('../../images/guide.jpg')}></img>
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
                    <span>我已阅读并同意 <a>《 用户注册协议 》</a></span>
                </div>
                <div className="guide-footer">我先逛逛</div>
                <div className="guide-banq">Copyright@2018 xxx有限公司版权所有</div>
            </div>
        )
    }
}