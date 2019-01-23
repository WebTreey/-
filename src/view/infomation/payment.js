import React from 'react';

import {Encrypt} from '../../utils/AES'
import {getoperatorPay} from '../../utils/config'
import Title from'../../components/title/index'
export default class Payment extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            chechox:[
                {id:3,src:require('../../images/zfb.jpg'),name:'支付宝支付'},
                {id:1,src:require('../../images/wx.jpg'),name:'微信支付'},
            ],
            chechoxDefault:3,
            fromstr:''
        }
    }
    setToperatorPay(data){
        getoperatorPay(data).then(res=>{
            console.log(res.data);
            if(parseInt(this.state.chechoxDefault) === 3){
                this.setState({
                    fromstr:res.data.aliOrderInfo
                })
                if(document.forms[0]){
                    document.forms[0].submit();
                }
            }else{
                window.location.href = res.data.wxPrepayUrl
            }
        })
    }
    handClickChechox(e){
        const index = e.target.dataset.id ;
        this.setState({
            chechoxDefault:index
        })

    }
    handPayBtn(){
        const url = window.location.href.substr(0,window.location.href.indexOf('#')+1);
        this.setToperatorPay({payType:parseInt(this.state.chechoxDefault,10),phone:Encrypt(13823541918),backUrl:`${url}/paytransfer?type=${this.state.chechoxDefault}&pay=${this.state.chechoxDefault}`});
        
        
    }
    
    
    render(){
        console.log(this.state.chechoxDefault)
        return(
            <div className="payment">
            <div dangerouslySetInnerHTML={{__html:this.state.fromstr}}></div>
            <Title text="支付订单" history = {this.props.history}></Title>
                <div className="result-box">
                    <ul className="payment-ul">
                        <li className="flex-between">
                            <span>订单</span>
                            <em>升级到豪华版检测报告</em>
                        </li>
                        <li className="flex-between">
                            <span>单价</span>
                            <i className="flex-between"><em className="payment-bq">￥6.00</em>￥2.00</i>
                        </li>
                    </ul>
                </div>
                <h3 className="payment-title">检测主体信息</h3>
                <div className="result-box">
                    <ul>
                        <li>
                            <span>姓名</span>
                            <i>彭少云</i>
                        </li>
                        <li>
                            <span>手机号</span>
                            <i>1854512125</i>
                        </li>
                        <li>
                            <span>身份号</span>
                            <i>430523199109017264</i>
                        </li>
                        <li>
                            <span>报告日期</span>
                            <i>2015-10-12</i>
                        </li>
                    </ul>
                </div>
                <h3 className="payment-title">支付方式</h3>
                <div className="result-box">
                <div  className="pay ">
                    <ul>
                        {this.state.chechox.map((item,index)=>{
                            const classname = parseInt(this.state.chechoxDefault) === item.id ? 'icon1' :'icon2';
                            return(
                                <li className="flex-between" key={index} data-id={item.id} onClick={this.handClickChechox.bind(this)}>
                                    <img src={item.src} data-id={item.id}></img>
                                    <i data-id={item.id}>{item.name}</i>
                                    <span className={classname} data-id={item.id}></span>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="pay-footer flex-between">
                    <div className="pay-footer-left">
                        <em>实付款</em>
                        <span>￥<i>2.00</i></span>
                    </div>
                    <div className="pay-footer-right" onClick={this.handPayBtn.bind(this)}>立即支付</div>
                </div>
                </div>
            </div>
        )
    }
}