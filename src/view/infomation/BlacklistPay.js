import React from 'react';
import {Encrypt} from '../../utils/AES'
import {getPay,getCommonClickLog} from '../../utils/config'
import Title from'../../components/title/index'
export default class BlacklistPay extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            chechox:[
                {id:3,src:require('../../images/zfb.jpg'),name:'支付宝支付'},
                {id:1,src:require('../../images/wx.jpg'),name:'微信支付'},
            ],
            chechoxDefault:3,
            fromstr:'',
            Product:1,
        }
    }
    //时间格式化
    setDateFormat(n){
       return n < 10 ? '0' + n : n;
    }
    //支付接口
    setPay(data){
        getPay(data).then(res=>{
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
    //选择支付方式
    handClickChechox(e){
        const index = e.target.dataset.id ;
        this.setState({
            chechoxDefault:index
        })

    }
    //选择产品类型
    handProductType(index){
        if(index===1){
            this.handCount({
                clickType:81,
                appName:"高级支付订单"
            })
        }else{
            this.handCount({
                clickType:82,
                appName:"豪华支付订单"
            })
        }
        this.setState({
            Product:index
        })
    }
    handCount(data){
        getCommonClickLog(data).then(res=>{
            console.log(res.data)
        })
    }
    handPayBtn(){
        const url = window.location.href.substr(0,window.location.href.indexOf('#')+1);
        if(this.props.location.query) {
            this.setPay({
                name:Encrypt(this.query.info.name),
                card:Encrypt(this.query.info.idCardNo),
                phone:Encrypt(this.query.info.phone),
                payType:parseInt(this.state.chechoxDefault),
                check_level:parseInt(this.state.Product),
                backUrl:`${url}/BlackPayTransfer?type=${this.state.chechoxDefault}`
            })
        }
        this.handCount({
            clickType:24,
            appName:"立即支付"
        })
        
    }
    render(){
        let info = {};
        let money = {}
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
                        <li className="flex-between" onClick={this.handProductType.bind(this,1)}>
                            <span>高级黑名单信息查询</span>
                            <i className="flex-between"><em className="payment-bq">￥{money.senior_old}</em>￥{money.senior_now}</i>
                            <div className="Product1">{this.state.Product===1 ? <img src={require('../../images/dui.jpg')}></img>:''}</div>
                        </li>
                        <li className="flex-between" onClick={this.handProductType.bind(this,2)}>
                            <span>豪华版黑名单信息查询</span>
                            <i className="flex-between"><em className="payment-bq">￥{money.luxury_old}</em>￥{money.luxury_now}</i>
                            <div className="Product2">{this.state.Product===2 ? <img src={require('../../images/dui.jpg')}></img>:''}</div>
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
                        <span>￥<i>{this.state.Product===1? money.senior_now : money.luxury_now}</i></span>
                    </div>
                    <div className="pay-footer-right" onClick={this.handPayBtn.bind(this)}>立即支付</div>
                </div>
                </div>
            </div>
        )
    }
}