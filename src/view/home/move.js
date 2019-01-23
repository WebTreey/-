import React from 'react';
import './home.scss';
import {getModuleInfo,getRecmdInfo,getSaveOpenLog,getCommonClickLog,getSaveHardLog} from '../../utils/config'
import {MoneyFormat,ISFirstWeb} from '../../utils/API';
import Title from'../../components/title/index'
import {Loading} from '../../components/loading/loading'
//排序弹出
class MoveOpen extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            Tabindex: this.props.Tabindex
        }
    }
    componentWillReceiveProps(){
        this.setState({
            Tabindex: 0
        }) 
    }
    render(){
        const data = this.props.data || [];
        return(
            <div className="move-open" onClick={this.props.handHideOpen}>
                <div className="open-box">
                    <ul>
                        {data.map((item,index)=>{
                            const cname = this.state.Tabindex === index ? 'openactive' : ''
                            if(typeof item ==='string'){
                                return(
                                    <li className={cname} key={index} data-index={index} data-item={item} onClick={this.props.handListClick}>{item}</li>
                                )
                            }
                            return(
                                <li className={cname} key={index} data-index={index} data-id={item.id} data-item={item.name} onClick={this.props.handListClick}>{item.name}</li>
                            )
                        })}
                    </ul>
                </div>     
            </div>
        )
    }
}
//加载中。
const Loding = (props)=>{
    return(
        <div className="home-loding flex-conter">
        {props.isimg ? <img alt="闪电贷" src={require('../../images/loding.gif')}></img> : ''}
            <span>{props.text}</span>
        </div>
    )
}
let minLimit ='' , maxLimit ='' , orderBy = 0 , modulee  = 0 , a = '按额度' ,b = '按排序' , c = '按推荐';
export default class Move extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            Tab:[
                {id:1,value:'按额度'},
                {id:2,value:'按排序'},
                {id:3,value:'按推荐'}
            ],
            activeIndex:1,
            moduleData:[],
            opendata:[],
            MoveOpen:false,
            loding:false,
            Tabindex:0,
            minLimit:'',
            maxLimit:'',
            orderBy:'',
            module:'',
            recmdData:[],
            pageSize:10,
            total:0,
            isimg:false,
            wxts:false,
            loading:false
        }
        this.size = 1;
        this.text = ''
       
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
    //点击日志
    setCommonClickLog(data){
        getCommonClickLog(data).then(res=>{
            console.log(res.data)
        })
    }
    //打开日志
    setSaveOpenLog(){
        getSaveOpenLog().then(res=>{
            console.log(res.data)
        })
    }
     //激活日志
    setSaveHardLog(){
        getSaveHardLog().then(res=>{
            console.log(res.data)
        })
    }
    //调用产品接口
    setRecmdInfo(data){
        this.setState({
            loading:true
        })
        getRecmdInfo(data).then(res=>{
            this.setState({
                loading:false
            })
            console.log(res.data)
            if(res.data.result){
                this.setState({
                    recmdData:this.state.recmdData.concat(res.data.result.proRecommendList),
                    loding:false ,
                    total:res.data.result.total
                })
                
            }
           
        })
    }
    //调用产品ID接口
    setModuleInfo(data){
        getModuleInfo(data).then(res=>{
            console.log(res.data)
            this.setState({
                moduleData:[{name: "默认",id: 0, describe: "默认"}].concat(res.data.result)
            })
        })
    }
    //滚动加载数据
    handBoydScroll(){
        const scrollHeight = Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);
        const scrollTop = Math.max(document.documentElement.scrollTop ,document.body.scrollTop)
        const clientHeight = document.documentElement.clientHeight;
        
        const page = Math.ceil(this.state.total/this.state.pageSize)||10;
      
        if((scrollTop+clientHeight)+80>=scrollHeight){
            if(this.size>=page) {
                this.text = '---我也是有底线的---'
                this.setState({
                    isimg:false
                })
            }else{
                this.text = '数据加载中'
                this.setState({
                    isimg:true
                })
                const data = {
                    isPagin:1,
                    pageNo: ++this.size,
                    pageSize:this.state.pageSize,
                    minLimit:this.state.minLimit,
                    maxLimit:this.state.maxLimit,
                    orderBy:this.state.orderBy,
                    module:this.state.modulee,
                    filterApi:1
                }
                this.setRecmdInfo(data);
                return false
            }
          
        }else{
         
        }
       
    }
    //选择排序方式
    handListClick(e){
        
        this.size = 1;
        const that = e.target.dataset;
        const index = parseInt(that.index,10);
        const item = (that.item + '').replace(/,/g,'') || '' ;
        this.setCommonClickLog({clickType:5320,reserve1:item})
        if(this.state.activeIndex===1){
            a = item
            if(item!=='不限额度'){
                minLimit = parseInt(item.split('-')[0]);
                maxLimit = item.indexOf('-') >-1 ? item.split('-')[1] : parseInt(item)
                this.setState({
                    minLimit:minLimit,
                    maxLimit:maxLimit
                })
            }else{
                minLimit = ''
                maxLimit = ''
                this.setState({
                    minLimit:minLimit,
                    maxLimit:maxLimit
                })
            }   
        }else if(this.state.activeIndex===2){
            b = item
            orderBy = that.index ;
            this.setState({
                orderBy:orderBy
            })
        }else{
            c =item
            modulee = that.id ;
            this.setState({
                module:modulee,
            })
        }
        this.setState({
            Tabindex:index,
            MoveOpen:false,
            recmdData:[],
            Tab:[
                {id:1,value:a},
                {id:2,value:b},
                {id:3,value:c}
            ]
        })
        const data = {
            isPagin:1,
            pageNo:1,
            pageSize:this.state.pageSize,
            minLimit:minLimit,
            maxLimit:maxLimit,
            orderBy:orderBy,
            module:modulee,
            filterApi:1
        }
        this.setRecmdInfo(data);
        return false;
    }
    //顶部Tab点击事件
    handTabClick(e){
        const index = parseInt(e.target.dataset.index,10);
        if(index!==this.state.activeIndex){
            this.setState({
                Tabindex:0,
                activeIndex:index,
                MoveOpen:true
            })
        }else{
            this.setState({
                MoveOpen:!this.state.MoveOpen
            })
        }
        // this.setState({
        //     activeIndex:index,
        //     MoveOpen:true
        // })
        
        if(index===1){
            this.setState({
                opendata:['不限额度','0-5,000','5,000-10,000','10,000-50,000','50,000以上']
            })
        }else if(index===2){
            this.setState({
                opendata:['默认','额度高','利率低','放款快']
            })
        }else{
            this.setState({
                opendata:this.state.moduleData
            })
        }
    }
    
    handHideOpen(){
        this.setState({
            MoveOpen:false
        })
    }

    componentDidMount(){
        if(ISFirstWeb('cp')){
            this.setState({
                wxts:true
            })
            this.times = setTimeout(()=>{
                this.setState({
                    wxts:false
                })
            },3000)
        }
        const data = {
            isPagin:1,
            pageNo:1,
            pageSize:this.state.pageSize,
            minLimit:this.state.minLimit || '',
            maxLimit:this.state.maxLimit || '',
            orderBy:this.state.orderBy || 0,
            module:this.state.modulee || 0,
            filterApi:1
        }
       
        this.setModuleInfo()
        this.setRecmdInfo(data);
        if(ISFirstWeb()){
            this.setSaveOpenLog()
        }
        document.onscroll = ()=>{
            this.handBoydScroll()
        }
       
    }
    componentWillUnmount(){
        document.onscroll = null;
        clearTimeout(this.times);
    }
    render(){
        const Tab = this.state.Tab;
        const indexs = this.state.activeIndex;
        const recmdData = this.state.recmdData;
        return(
            <div className="move main main-tj">
                {this.state.loading ? <Loading></Loading> : ''}
                <Title  text="贷款" history = {this.props.history}></Title>
                {this.state.MoveOpen?  <MoveOpen data={this.state.opendata} Tabindex={this.state.Tabindex} handListClick={this.handListClick.bind(this)}
                    handHideOpen = {this.handHideOpen.bind(this)}
                ></MoveOpen> : ''}
                <div className="move-header">
                    <ul className="flex-around">
                        {Tab.map((item,index)=>{
                            let calssname = indexs === item.id ? 'active' : ''
                            let url = indexs === item.id? require("../../images/sort_icon_active.jpg"):require("../../images/sort_icon.jpg")
                            return(
                                <li key={index} data-index={item.id} className={`${calssname} flex-conter` } onClick={this.handTabClick.bind(this)}>
                                    <span data-index={item.id}>{item.value}</span>
                                    <img alt="" className="sort-img" src={url} data-index={item.id}></img>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                {this.state.wxts ? <div className="move-lamp flex-conter">
                    <img alt="" src={require('../../images/horn.jpg')}></img>
                    <span>温馨提示：同时申请多个不同产品，可提高贷款通过率！</span> 
                   
                </div>: ''}
                
                <div className="home-list">
                        <div>
                            <ul>
                                {recmdData.map((item,index)=>{
                                    let dw = ''
                                    if(item.lendRateType===1){
                                        dw = '分钟'
                                    }else if(item.lendRateType===2){
                                        dw = '小时'
                                    }else{
                                        dw = '天'
                                    }
                                    return(
                                        <li key={index}>
                                            <div className="home-item">
                                            <div className="home-item-icon flex-conter">
                                                <span><img alt="" src={item.proIcon}></img></span>
                                                <h4>{item.backName}</h4>
                                            </div>
                                            <div className="flex-between home-item-bottom">
                                                    <div className="home-item-money">
                                                        <span>{MoneyFormat(item.maxLimit)}</span>
                                                        <p>最高可贷额度（元）</p>
                                                    </div>
                                                    <div className="home-item-conter">
                                                        <p>最快{item.minLendRate || item.maxLendRate}{dw}放款</p>
                                                        <p>{item.recommend}</p>
                                                    </div>
                                                    <div className="home-item-btn"><a href={item.h5Link} 
                                                        onClick={this.setCommonClickLog.bind(this,{
                                                            clickType:5211,
                                                            reserve1:item.backName,
                                                            reserve2:item.apiProCode
                                                       })}
                                                    >立即申请</a></div>
                                            </div>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <Loding text={this.text} isimg = {this.state.isimg}></Loding>
                    </div>
            </div>
        )
    }
}