import React from 'react';
import './home.scss';
import {getModuleInfo,getRecmdInfo} from '../../utils/config'
import {MoneyFormat} from '../../utils/API'
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
            <div className="move-open">
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
                                <li className={cname} key={index} data-index={index} data-id={item.id} onClick={this.props.handListClick}>{item.name}</li>
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
            opendata:['不限额度','0-5000','5000-10000','10000-50000','50000以上'],
            MoveOpen:false,
            loding:false,
            Tabindex:0,
            minLimit:'',
            maxLimit:'',
            orderBy:'',
            module:'',
            recmdData:[],
            pageSize:5,
            total:0,
            isimg:true
        }
        this.size = 1;
        this.text = '数据加载中...'
    }
    //调用产品ID接口
    setModuleInfo(data){
        getModuleInfo(data).then(res=>{
            console.log(res.data);
            this.setState({
                moduleData:res.data.result
            })
        })
    }
    //滚动加载数据
    handBoydScroll(){
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop 
        const clientHeight = document.documentElement.clientHeight;
        const page = Math.ceil(this.state.total/this.state.pageSize);
        if((scrollTop+clientHeight)>=scrollHeight){
            this.setState({
                loding: true
            })
            clearTimeout(this.times)
            this.times = setTimeout(()=>{
                if(this.size>=page) {
                    this.text = '已经没有更多数据了'
                    this.setState({
                        isimg:false
                    })
                    return false;
                }else{
                    this.setState({
                        isimg:true
                    })
                    this.text = '数据加载中...'
                }
                const data = {
                    isPagin:1,
                    pageNo: this.size++,
                    pageSize:this.state.pageSize,
                    minLimit:this.state.minLimit,
                    maxLimit:this.state.maxLimit,
                    orderBy:this.state.orderBy,
                    module:this.state.modulee
                }
                this.setRecmdInfo(data);
            },300)
           
            console.log(scrollTop,scrollHeight,clientHeight)
        }
       
    }
    //选择排序方式
    handListClick(e){
        const that = e.target.dataset;
        const index = parseInt(that.index,10);
        const item = that.item + '' || '' ;
        let minLimit ='' , maxLimit ='' , orderBy ='' , modulee  = '';
        
        if(this.state.activeIndex===1){
            if(item!=='不限额度'){
                minLimit = parseInt(item.split('-')[0]);
                maxLimit = item.indexOf('-') >-1 ? item.split('-')[1] : parseInt(item)
            }   
        }else if(this.state.activeIndex===2){
            orderBy = that.index || '';
        }else{
            modulee = that.id || '';
        }
        const data = {
            isPagin:1,
            pageNo:1,
            pageSize:this.state.pageSize,
            minLimit:minLimit,
            maxLimit:maxLimit,
            orderBy:orderBy,
            module:modulee
        }
        console.log(maxLimit,modulee)
        this.setRecmdInfo(data)
        this.setState({
            Tabindex:index,
            MoveOpen:false,
            minLimit:minLimit,
            maxLimit:maxLimit,
            orderBy:orderBy,
            module:modulee
        })
    }
    //顶部Tab点击事件
    handTabClick(e){
        const index = parseInt(e.target.dataset.index,10);
        if(index!==this.state.activeIndex){
            this.setState({
                Tabindex:0
            })
        }
        this.setState({
            activeIndex:index,
            MoveOpen:true,
            minLimit:'',
            maxLimit:'',
            orderBy:'',
            module:'',
        })
        
        if(index===1){
            this.setState({
                opendata:['不限额度','0-5000','5000-10000','10000-50000','50000以上']
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
    //调用产品接口
    setRecmdInfo(data){
        getRecmdInfo(data).then(res=>{
            this.setState({
                recmdData:this.state.recmdData.concat(res.data.result.proRecommendList),
                loding:false ,
                total:res.data.result.total
            })
            console.log(res.data)
        })
    }
    componentDidMount(){
        const data = {
            isPagin:1,
            pageNo:1,
            pageSize:this.state.pageSize,
            minLimit:this.state.minLimit,
            maxLimit:this.state.maxLimit,
            orderBy:this.state.orderBy,
            module:this.state.modulee
        }
        this.setModuleInfo()
        this.setRecmdInfo(data);
        document.onscroll = ()=>{
            this.handBoydScroll()
        }
    }
    componentWillUnmount(){
        document.onscroll = null;
        this.times = null
    }
    render(){
        const Tab = this.state.Tab;
        const indexs = this.state.activeIndex;
        const recmdData = this.state.recmdData;
        return(
            <div className="move main">
                {this.state.MoveOpen?  <MoveOpen data={this.state.opendata} Tabindex={this.state.Tabindex} handListClick={this.handListClick.bind(this)}></MoveOpen> : ''}
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
                <div className="move-lamp flex-conter">
                    <img alt="" src={require('../../images/horn.jpg')}></img>
                    <span>温馨提示：同时申请多个不同产品，可提高贷款通过率！</span>
                </div>
                <div className="home-list">
                        <div>
                            <ul>
                                {recmdData.map((item,index)=>{
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
                                                        <p>{item.minLendRate}</p>
                                                        <p>{item.recommend}</p>
                                                    </div>
                                                    <div className="home-item-btn"><a href={item.h5Link}>立即申请</a></div>
                                            </div>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <Loding text={this.text} isimg = {this.state.isimg}></Loding>
                        {/* {this.state.loding ?  <Loding text={this.text} IsImg={this.state.have}></Loding>: ''} */}
                    </div>
            </div>
        )
    }
}