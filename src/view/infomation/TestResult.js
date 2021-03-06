import React from 'react';
import './info.scss';
import {getOperatorCheck,getOperatorReport,getCommonClickLog} from '../../utils/config';
import {GetQueryString} from '../../utils/API'
import {Encrypt} from '../../utils/AES';
import Title from'../../components/title/index'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

export default class TestResult extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:{}
        }
    }
    handLinkPay(){
        this.props.history.push({pathname:'/Payment',query:{now:this.state.data.operator_check_now,old:this.state.data.operator_check_old}})
    }
    //运营商检测结果
    setOperatorCheck(data){
        getOperatorCheck(data).then(res=>{
            console.log(res.data);
            if(res.data.code==='ok'){
                this.handCount({
                    clickType:85, 
                    appName:'查询成功'

                })
                const feeDetails = res.data.data.checkRes.feeDetails || []
                const callDetails = res.data.data.checkRes.callDetails || []
                this.setTuBiao(feeDetails,'huaf')
                this.setTuBiao(callDetails,'tongh')
                this.setState({
                    data:res.data.data
                })
            }else{
                this.handCount({
                    clickType:86, 
                    appName:'查询失败'
                })
            }
           
            
        })
    }
    //运营商检测完整结果
    setOperatorReport(data){
        getOperatorReport(data).then(res=>{
            console.log(res.data)
        })
    }
    //图表时间格式化
    setTuBiao(data,el){
        let x = [];
        let y = [];
        for(var i =0; i<data.length;i++){
            const month = data[i].fee_month || data[i].call_month
            const m = (month+'').split('-')[1]+'月'
            x.push(m);
            y.push(data[i].fee || data[i].call_num);
        }
        this.setHFData(x,y,el);
    }
    //图标基本框架
    setHFData(x,y,el){
         // 基于准备好的dom，初始化echarts实例
         var myChart = echarts.init(document.getElementById(el));
         // 绘制图表
         myChart.setOption({
            
             tooltip: {},
             xAxis: {
                 data: x
             },
             yAxis: {
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
             },
             grid: {
                top: '10%',
                left: '3%',
                right: '3%',
                bottom: '3%',
                containLabel: true
            },
             series: [{
                 type: 'bar',
                 data: y,
                 itemStyle: {
                    normal: {color: '#6aa4e8'}
                }
             }]
         });
    }
    handCount(data){
        getCommonClickLog(data).then(res=>{
            console.log(res.data);
        })
    }
    componentDidMount(){
        this.setOperatorCheck({taskId:GetQueryString('taskId'),phone:Encrypt(GetQueryString('account'))});
        this.setOperatorReport({smses:[],calls:[]})
        const a = encodeURIComponent('深圳市')
        console.log(a)
        console.log(decodeURIComponent(a))
    }
    render(){
        const data = this.state.data.checkRes || {} ;
        return(
            <div className="test-result">
            <Title  text="运营商检测结果" history = {this.props.history}></Title>
                <div className="result-box">
                    <h3>检测对象</h3>
                    <ul>
                        <li>
                            <span>手机号</span>
                            <i>{data.mobile}</i>
                        </li>
                        <li>
                            <span>运营商</span>
                            <i>{data.carrier}</i>
                        </li>
                        <li>
                            <span>在网时长</span>
                            <i>{data.net_time} 天</i>
                        </li>
                    </ul>
                </div>
                <div className="result-box">
                    <h3>话费数据</h3>
                    <div className="huaf-data" id="huaf"></div>
                    <div className="result-tb">
                        <p><i>您的话费月均消费</i><span>{data.fee_per_month} 元</span></p>
                        <p><i>话费消费能力</i><span>{data.fee_bility}</span></p>
                    </div>
                </div>
                <div className="result-box">
                    <h3>通话数据</h3>
                    <div className="huaf-data" id="tongh"></div>
                    <div className="result-tb">
                        <p><i>您的月均通话</i><span>{data.call_per_month} 次</span></p>
                        <p><i>社交关系</i><span>{data.social_relate}</span></p>
                        <p><i>通话风险</i><span>{data.call_risk || '数据为空'}</span></p>
                    </div>
                </div>
                {/* <div className="result-box">
                    <h3 className="flex-between"><i>亲密联系人数据</i><img alt="" onClick={this.handLinkPay.bind(this)} className="pay-btn" src={require('../../images/pay_btn.png')}></img></h3>
                    <div className="result-content">帮助您正确填写亲密人，提升贷款申请通过率</div>
                </div>
                <div className="result-box">
                    <h3 className="flex-between"><i>手机号风险联系人分析</i><img alt="" onClick={this.handLinkPay.bind(this)} className="pay-btn" src={require('../../images/pay_btn.png')}></img></h3>
                    <div className="result-content">通话记录中，哪些联系人影响您的贷款申请</div>
                </div>
                <div className="result-box">
                    <h3 className="flex-between"><i>短信通讯风险分析</i><img alt="" onClick={this.handLinkPay.bind(this)} className="pay-btn" src={require('../../images/pay_btn.png')}></img></h3>
                    <div className="result-content">通话记录中，哪些短信影响您的贷款申请</div>
                </div>
                <div className="result-btn" onClick={this.handLinkPay.bind(this)}>查看完整报告</div> */}
            </div>
        )
    }
}