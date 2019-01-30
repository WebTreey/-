import React from 'react';
import {Encrypt} from '../../utils/AES'
import {getPayLevel} from '../../utils/config'
import Title from'../../components/title/index'
export default class BlacklistPaySJ extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            chechox:[
                {id:3,src:require('../../images/zfb.jpg'),name:'支付宝支付'},
                {id:1,src:require('../../images/wx.jpg'),name:'微信支付'},
            ],
            chechoxDefault:3,
            fromstr:'',
        }
    }
    //时间格式化
    setDateFormat(n){
       return n < 10 ? '0' + n : n;
    }
   
    //选择支付方式
    handClickChechox(e){
        const index = e.target.dataset.id ;
        this.setState({
            chechoxDefault:index
        })

    }
    //获取返回结果
    setPayLevel(data){
        getPayLevel(data).then(res=>{
            console.log(res.data)
            if(parseInt(this.state.chechoxDefault)===3){
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
    handPayBtn(){
        const url = window.location.href.substr(0,window.location.href.indexOf('#')+1);
        if(this.props.location.query) {
            this.setPayLevel({
                name:Encrypt(this.query.info.name),
                card:Encrypt(this.query.info.idCardNo),
                phone:Encrypt(this.query.info.phone),
                payType:parseInt(this.state.chechoxDefault),
                check_level:2,
                backUrl:`${url}/BlackPayTransferSJ?type=${this.state.chechoxDefault}`
            })
        }
        
    }
    render(){
        let info = {};
        let money = {}
        console.log(this.props.location.query)
        if(this.props.location.query) {
            this.query = this.props.location.query || {}
            info = this.query.info || {};
            money = this.query.money || {};
         }
         const dateNow = new Date();
         const datestr = `${dateNow.getFullYear()}-${this.setDateFormat(dateNow.getMonth()+1)}-${this.setDateFormat(dateNow.getDate())}`
        return(
            <div className="payment">
            <div dangerouslySetInnerHTML={{__html:this.state.fromstr}}></div>
            <Title text="支付订单" history = {this.props.history}></Title>
                <div className="result-box">
                    <ul className="payment-ul">
                        <li className="flex-between">
                            <span>订单</span>
                            <em>黑名单风险检测</em>
                        </li>
                    </ul>
                </div>
                <h3 className="payment-title">检测主体信息</h3>
                <div className="result-box">
                    <ul>
                        <li>
                            <span>姓名</span>
                            <i>{info.name}</i>
                        </li>
                        <li>
                            <span>手机号</span>
                            <i>{info.phone}</i>
                        </li>
                        <li>
                            <span>身份号</span>
                            <i>{info.idCardNo}</i>
                        </li>
                        <li>
                            <span>报告日期</span>
                            <i>{datestr}</i>
                        </li>
                    </ul>
                </div>
                <div className="result-box">
                    <ul className="payment-ul">
                        <li className="flex-between" >
                            <span>豪华版黑名单信息查询</span>
                            <i className="flex-between"><em className="payment-bq">￥{money.fee_old}</em>￥{money.fee}</i>
                            <div className="Product2"><img src={require('../../images/dui.jpg')}></img></div>
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
                        <span>￥<i>{money.fee}</i></span>
                    </div>
                    <div className="pay-footer-right" onClick={this.handPayBtn.bind(this)}>立即支付</div>
                </div>
                </div>
            </div>
        )
    }
}