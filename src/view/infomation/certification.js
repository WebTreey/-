import React from 'react';
import './info.scss'
import {ProvingID,ProvingChina} from '../../utils/API'
import {PromptBox} from '../../components/prompt/prompt'
import {getDoshenqing,getCardAuth} from '../../utils/config'
import { withRouter } from 'react-router';
import {Encrypt} from '../../utils/AES'
import Log from '../../components/log/log'
import Title from'../../components/title/index'
class Certification extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:'',
            id:'',
            data:[]
        }
        
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
    //提交个人资料
    setDoshenqing(data){
        getDoshenqing(data).then(res=>{
            if(res.data.code==='ok'){
                this.setPromptHide('实名认证完成');
                this.times = setTimeout(()=>{
                    this.props.history.go(-1);
                },2000)
            }else if(res.data.code==='nameError'){
                this.setPromptHide('身份信息输入有误，请重新核对后输入');
            }else if(res.data.code==='hasError'){
                this.setPromptHide('已申请');
            }else if(res.data.code==='error'){
                this.setPromptHide('保存失败');
            }
            console.log(res.data)
        })
    }
    //认证身份证信息
    setCardAuth(data){
        console.log(data)
        getCardAuth(data).then(res=>{
            console.log(res.data)
            if(res.data.code===1){
                if(res.data.result.authFlag==='1'){
                    this.setDoshenqing(data)
                }else{
                    this.setPromptHide('认证失败');
                }
            }else{
                this.setPromptHide('认证失败');
            }
        })
    }
    handChangeName(e){
        this.setState({
            name:ProvingChina(e.target.value,10)
        })
    }
    handProvingID(e){
        this.setState({
            id:ProvingID(e.target.value)
        })
    }
    handLoginClick(){
        if(this.state.name===''){
            this.setPromptHide('姓名不能为空');
        }else if(this.state.id===''){
            this.setPromptHide('身份证号码不能为空');
        }else{
            console.log(this.state.name,this.state.id)
            this.setCardAuth({name:Encrypt(this.state.name),idCardNo:Encrypt(this.state.id),card:Encrypt(this.state.id),isNeedVerfyCode:'noNeed'})
        }
    }
    componentWillUnmount(){
        clearTimeout(this.times);
        this.times = null ;
    }
    render(){
        return(
            <div className="info info-me">
            <Log></Log>
            <Title  text="实名认证" history = {this.props.history}></Title>
            {this.state.prompt ? <PromptBox text={this.text}></PromptBox> : ''}
                <div className="info-input">
                    <form className="flex-column-left">
                        <label className="flex-between">
                        <i>姓名</i>
                        <input type="text" placeholder="请输入您的姓名" data-pass={1}  value={this.state.name} onChange={this.handChangeName.bind(this)} ></input>
                        
                        </label>
                        <label className="flex-between">
                        <i>身份证号</i>
                        <input type="text" placeholder="请输入您的身份证号" data-pass={2}  value={this.state.id} onChange={this.handProvingID.bind(this)}></input>
                        </label>
                    </form>
                </div>
                <div className="info-code-fs">实名认证仅用于验证身份，实名后将不可更改，请确保录入本人信息，否则将影响贷款等业务办理，认证信息将受到严格保密！</div>
                <div className="guide-btn" onClick={this.handLoginClick.bind(this)}>确认提交</div>
            </div>
        )
    }
}
export default withRouter(Certification)