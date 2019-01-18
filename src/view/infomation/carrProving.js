import React from 'react';
import './info.scss'
import {ProvingID} from '../../utils/API'
import {PromptBox} from '../../components/prompt/prompt';
import {getGoOprCheck,getUrl} from '../../utils/config';
import {Encrypt} from '../../utils/AES'
import Log from '../../components/log/log'
import Title from'../../components/title/index'
// import { withRouter } from 'react-router';
class CarrProving extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:'',
            id:'',
            checked:true,
            checkedclass:'guide-checkbox',
            prompt:false,
        }
       
    }
    setGoOprCheck(data){
        getGoOprCheck(data).then(res=>{
           if(res.data.code===1){
               window.location.href = res.data.result;
           }
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
    //监听姓名输入
    handChangeName(e){
        this.setState({
            name:e.target.value
        })
    }
    //监听身份证号码输入
    handProvingID(e){
        const value = e.target.value;
        const str = ProvingID(value);
        this.setState({
            id:str
        })
    }
    //检测按钮
    handLoginClick(){
        if(this.state.name===''){
            this.setPromptHide('姓名不能为空');
        }else if(this.state.id===''){
            this.setPromptHide('身份证号码不能为空');
        }else{
            const data = {
                name:Encrypt(this.state.name),
                idCard:Encrypt(this.state.id),
                backUrl:`${document.domain}/#/home/infoindex?nav=2`
            }
            this.setGoOprCheck(data);
        }
       
    }
    //是否同意检测协议
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
    componentWillUnmount(){
        clearTimeout(this.times);
        this.times = null;
    }
    render(){
        return(
            <div className="info info-me" style={{margin:'0'}}>
            <Log></Log>
            <Title  text="运营商风险检测" history = {this.props.history}></Title>
                {this.state.prompt ? <PromptBox text={this.text}></PromptBox> : ''}
                <div className="info-yys-header flex-around">
                    <div className="yys-icon yys-dx"></div>
                    <div className="yys-icon yys-lt"></div>
                    <div className="yys-icon yys-yd"></div>
                </div>
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
                <div className="guide-protocol flex-conter" style={{padding:'.3rem .3rem 0'}}>
                    <input type="checkbox" className={this.state.checkedclass} defaultChecked={this.state.checked} onClick={this.handCheckbox.bind(this)}></input>
                    <span>我已阅读并同意 <a href={getUrl()}>《 用户注册协议 》</a></span>
                </div>
                <div className="guide-btn" onClick={this.handLoginClick.bind(this)}>确认提交</div>
                <div className="info-yys-instruction">
                    <h3>运营商风险检测说明：</h3>
                    <p>贷款公司通过你的手机号运营商数据，判断您的信用、消费能力、社交关系，如：</p>
                    <ul>
                        <li>月套餐水平 - 消费能力</li>
                        <li>是否欠费 - 信用水平</li>
                        <li>电话/短信对象 - 是否稳定的社交关系，是否经常购物，是否经常借款等信息检测后您将可以得到一份完整的免费报告！</li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default CarrProving