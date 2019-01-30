import React from 'react';
import {getCheckResult,getUserInfo,getCommonClickLog} from '../../utils/config'
import {Encrypt} from '../../utils/AES'
import Title from'../../components/title/index'
export default class BlacklistDetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            Info :{},
            resultData:{},
            fee:false
        }
    }
    //时间格式化
    setDateFormat(n){
    return n < 10 ? '0' + n : n;
    }
     //获取用户信息
    setUserInfo(){
        getUserInfo().then(res=>{
            console.log(res.data)
            this.setState({
                Info:res.data.result
            })
            return res.data.result
        }).then(res=>{
            console.log(res)
            this.setPayResult({
                name:Encrypt(res.name),
                card:Encrypt(res.idCardNo),
                phone:Encrypt(res.phone)
            })
        }) 
    }
    //获取返回结果
    setPayResult(data){
        getCheckResult(data).then(res=>{
            console.log(res.data)
            this.setState({
                resultData:res.data.data.checkRes,
                fee:res.data.data.fee
            })
            this.fee = res.data.data.fee;
            this.fee_old = res.data.data.fee_old
        })
    }
    handCount(data){
        getCommonClickLog(data).then(res=>{
            console.log(res.data)
        })
    }
    handShengJi(){
        this.props.history.push({pathname:'/BlacklistPaySJ',query:{info:this.state.Info,money:{fee:this.fee,fee_old:this.fee_old}}})
        this.handCount({
            clickType:83,
            appName:"升级版支付"
        })
    }
    componentDidMount(){
        this.setUserInfo()
    }
    render(){
        console.log(this.state.Info)
        const info = this.state.Info || {};
        const dateNow = new Date();
        const datestr = `${dateNow.getFullYear()}-${this.setDateFormat(dateNow.getMonth()+1)}-${this.setDateFormat(dateNow.getDay())}`
        const data = this.state.resultData || {};
        const mon = data.apply_loan_IN_3mon;
        const userdata = data.user_apply_excep_data;
        let monarr ='';
        let userdataarr ='';
        if(mon!==null){
            monarr = (mon+'').split('\n');
            userdataarr = (userdata+'').split('\n');
            this.monstr = monarr.map((item,index)=>{
               return(
                   <li key={index}>
                       <span>{item.split(':')[0]}</span>
                       <i>{item.split(':')[1]}</i>
                   </li>
               )
            })
            userdataarr = (userdata+'').split('\n');
            this.userdataarr = userdataarr.map((item,index)=>{
                return(
                    <li key={index}>
                        {item}
                    </li>
                )
             })
        }else{
            this.monstr = <div className="blackDetails-js" style={{margin:0}}>本项查看用户身份证和手机号是否命中网贷失信名单、执行名单。以及用户是否有违章、欠款、信贷预期等行为</div>
            this.userdataarr =  <div className="blackDetails-js" style={{margin:0}}>本项检测用户申请贷款时是否使用专一的材料。如果一个贷款人使用多个手机号、身份证、银行卡等资料申请，侧面说明用户资料滥用或被他人滥用</div>
        }

        if(this.state.resultData.is_phone_in_gray===null){
            this.gray = <ul><li><span>手机号</span><i>{info.phone}</i></li><li><span>身份证号</span><i>{info.idCardNo}</i></li>
            <div className="blackDetails-js" style={{margin:0}}>本项查看用户身份证和手机号是否命中网贷失信名单、执行名单。以及用户是否有违章、欠款、信贷预期等行为</div>
            </ul>
        }else{
            this.gray = 
            <ul>
                <li><span>手机号</span><i>{info.phone}</i>
                {
                    parseInt(this.state.resultData.is_phone_in_gray) ? <div className="blackDetails-js1 flex-content"><img className="gth" src={require('../../images/gantanhaox3.png')}></img>手机号在风险关注名单中，请注意</div> :
                    <div className="blackDetails-js">手机号不在风险关注名单中，请继续保持</div>
                }
                </li>
                <li><span>身份证号</span><i>{info.idCardNo}</i>
                {parseInt(this.state.resultData.is_idcard_in_gray) ? <div className="blackDetails-js1 flex-content"><img className="gth" src={require('../../images/gantanhaox3.png')}></img>身份证号在风险名单中，请注意</div>:
                <div className="blackDetails-js">身份证号不在风险关注名单中，请继续保持</div>}
                </li>
            </ul>
        }
       
       

        let icons_zhong = '';
        let icons_dengji = '';
        let strname = '';
        let strexcep = '';
        if (data.is_industry_rise_name == 0) {
            strname = '否'
            icons_zhong = 'icon4';
        } else {
            strname = '是'
            icons_zhong = 'icon3';
        }

        if (data.rejectRate == '低') {
            icons_dengji = 'icon1'
        } else if (data.rejectRate == '较低') {
            icons_dengji = 'icon5'
        } else {
            icons_dengji = 'icon2'
        }
        return(
            <div className="blackDetails">
                <Title  text="检测结果" history = {this.props.history}></Title>
                <h3 className="blackDetails-title">检测对象</h3>
                <div className="result-box blackDetails-box">
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
                            <span>身份证号</span>
                            <i>{info.idCardNo}</i>
                        </li>
                        <li>
                            <span>报告日期</span>
                            <i>{datestr}</i>
                        </li>
                    </ul>
                </div>
                <h3 className="blackDetails-title">是否命中行业风险黑名单
                    <span className={`blackDetails-icon ${icons_zhong}`}></span>
                </h3>
                <div className="result-box blackDetails-box">
                    <ul>
                        <li className="flex-conter">
                            <img className="gth" src={require('../../images/gantanhaox3.png')}></img>
                            <i>请您<em style={{color:"#ff6000"}}>按时还款</em>或注意申请贷款频率</i>
                        </li>
                    </ul>
                </div>
                <h3 className="blackDetails-title">您申请贷款被拒概率
                    <span className={`blackDetails-icon ${icons_dengji}`}></span>
                </h3>
                <div className="result-box blackDetails-box">
                    <ul>
                        <li className="flex-conter">
                            <img className="gth" src={require('../../images/gantanhaox3.png')}></img>
                            <i>用户危险检测</i>
                            <em>{data.user_danger_action}</em>
                        </li>
                        <li className="flex-conter">
                            <img className="gth" src={require('../../images/gantanhaox3.png')}></img>
                            <i>三个月内多平台借款</i>
                            <em>{data.loan_cnt_3mon}</em>
                        </li>
                        <li className="flex-conter">
                            <img className="gth" src={require('../../images/gantanhaox3.png')}></img>
                            <i>是否命中行业风险名单</i>
                            <em>{strname}</em>
                        </li>
                        <li className="flex-conter">
                            <img className="gth" src={require('../../images/gantanhaox3.png')}></img>
                            <i>用户申请材料异常</i>
                            <em>{data.user_apply_excep}</em>
                        </li>
                    </ul>
                </div>
                <h3 className="blackDetails-title">您申请贷款被拒概率</h3>
                <div className="result-box blackDetails-box">
                    {this.gray}
                </div>
                <h3 className="blackDetails-title">3个月内申请贷款数据</h3>
                <div className="result-box blackDetails-box">
                    <ul>
                       {this.monstr}
                    </ul>
                </div>
                <h3 className="blackDetails-title flex-between">用户申请材料异常或滥用
                {this.state.fee ? <p className="blackDetails-shengji" onClick={this.handShengJi.bind(this)}>升级查看</p> :''}
                </h3>
                <div className="result-box blackDetails-box">
                        <ul>
                            {this.userdataarr}
                        </ul>
                   
                </div>
                <h3 className="blackDetails-title">报告数据说明</h3>
                <div className="result-box blackDetails-box">
                    <div className="blackDetails-js">本项检测用户申请贷款时是否使用专一的材料。如果一个贷款人使用多个手机号、身份证、银行卡等资料申请，侧面说明用户资料滥用或被他人滥用</div>
                </div>
                {this.state.fee ? <div className="blackDetails-btn" onClick={this.handShengJi.bind(this)}>升级到豪华版，查看更完整报告</div> : ""}
            </div>
        )
    }
}