import React from 'react';
import './info.scss';
import {myStorage} from '../../utils/API'
import {getOperatorCheck} from '../../utils/config';
import {Encrypt} from '../../utils/AES';
import {PromptBox} from '../../components/prompt/prompt'

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
    setOperatorCheck(data){
        getOperatorCheck(data).then(res=>{
            console.log(res.data);
            let x = [];
            let y = [];
            if(res.data.code==='ok'){
                this.setState({
                    data:res.data.data
                })
                
                const feeDetails = res.data.data.checkRes.feeDetails || []
                for(var i =0; i<feeDetails.length;i++){
                    const month = feeDetails[i].fee_month
                    const m = (month+'').split('-')[1]+'月'
                    x.push(m);
                    y.push(feeDetails[i].fee);
                }
                this.setHFData(x,y);
               
            }
           
            
        })
    }
    setHFData(x,y){
         // 基于准备好的dom，初始化echarts实例
         var myChart = echarts.init(document.getElementById('huaf'));
         // 绘制图表
         myChart.setOption({
            title: {
                subtext: '元/月份'
            },
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
                
                left: '3%',
                right: '3%',
                bottom: '3%',
                containLabel: true
            },
             series: [{
                 name: '销量',
                 type: 'bar',
                 data: y,
                 itemStyle: {
                    normal: {color: '#6aa4e8'}
                }
             }]
         });
    }
    componentDidMount(){
        this.setOperatorCheck({phone:Encrypt(13823541918),taskId:'9408ed50-4f6e-11e8-83b0-00163e0d2629'});
       
    }
    render(){
        const data = this.state.data.checkRes || {} ;
        return(
            <div className="test-result">
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
                    <div className="result-tb"></div>
                </div>
            </div>
        )
    }
}