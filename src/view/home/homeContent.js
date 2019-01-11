import React from 'react';
import {MoneyFormat , ISFirstWeb,BaiDuHm,ISFirstWebJH} from '../../utils/API'
import {getHomeInof,getCommonClickLog,getSaveOpenLog,getMobileDetect,getSaveHardLog,getAddBannerClickLog} from '../../utils/config'
import { withRouter } from 'react-router';
import ReactSwiper from 'reactjs-swiper'
import './home.scss';

const Loding = (props)=>{
    return(
        <div className="home-loding flex-conter">
        {props.IsImg ? <img alt="闪电贷" src={require('../../images/loding.gif')}></img> : ''}
            <span>{props.text}</span>
        </div>
    )
}

class HomeContent extends React.Component{
    constructor() {
        super();
        this.state = {
            loding: false,
            list:[1],
            have:true,
            bannerList:[],//banner数据
            creditDetectionList:[],//黑名单风险检测数据
            proModuleList:[],
            isdata:false,
            hyh:0,
            footerIS: true
        }
        this.i = 0;
        BaiDuHm()
      }
    setMobileDetect(){
        getMobileDetect()
    }
    
    //获取数据
    setHomeinfo(){
        this.setState({
            isdata:false
        })
        const param = Object.assign({},{isGroup:1,filterApi:1})
        getHomeInof(param).then((res)=>{
            
            console.log(res.data);
            const proModuleList = res.data.result.proModuleList || [];
            // 筛选
            for(var i=0;i<proModuleList.length;i++){
                if(proModuleList[i].proList.length===0){
                    proModuleList.splice(i,1);
                    i--
                }
                // else{
                    
                //     for(var k=0;k<proModuleList[i].proList.length;k++){
                //         if(proModuleList[i].proList[k].proType===1){
                //             proModuleList[i].proList.splice(k,1);
                //             k--;
                //         }
                //     }
                // }
            }
            if(res.data.result){
                this.setState({
                    bannerList:res.data.result.homeBannerList,
                    creditDetectionList:res.data.result.creditDetectionList,
                    proModuleList:res.data.result.proModuleList,
                    isdata:true
                })
            }
        });
        
    }
    //激活日志
    setSaveHardLog(){
        getSaveHardLog().then(res=>{
            console.log(res.data)
        })
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
    //滚动统计
    setAddBannerClickLog(data){
        getAddBannerClickLog(data).then(res=>{
            console.log(res.data)
        })
    }
    
    //点击统计
    handCount(data){
        this.setCommonClickLog(data)
    }
    //跳转详情页面
    handLinkMoves(){
        this.props.history.push('/home/Move?nav=1')
    }
    //换一换
    handChange(){
        const data = this.state.proModuleList;
        if(data.length){
            this.proListlength = data[0].proList.length;
            if(this.i<this.proListlength-1){
                this.setState({
                    hyh: ++this.i
                })
            }else{
                this.i = 0;
                this.setState({
                    hyh: this.i
                })
            }
        }
    }
    componentDidMount(){
        
        if(ISFirstWeb()){
            this.setSaveOpenLog()
        }
        if(ISFirstWebJH()){
            this.setSaveHardLog()
        }
        this.setHomeinfo();
        this.setMobileDetect()
    }
    componentWillUnmount(){
        clearTimeout(this.tiems);
    }
    render(){
        if(this.state.isdata){
            this.text = this.state.have ? '正在加载更多数据' : '没有数据了';
            const bannerList = this.state.bannerList;
            const creditDetectionList = this.state.creditDetectionList || [];
            let proModuleList = this.state.proModuleList;
           
            /* ---------
            // let proList = [];
            
            // proModuleList.map((item,index)=>{
            //     debugger
            //     indexs ++ 
            //     if(item.proList.length===0){
            //         proModuleList.splice(indexs,1);
            //         indexs--
            //     }else{
                   
            //     }
            // })
            // if(proModuleList[0]){
            //     proList = this.state.proModuleList[0].proList || [];
            //     this.proListlength = proList.length;
            // }
            ---------*/
            

            //banner数据
            let items =  bannerList.map((item,index)=>{
                let obj = {};
                obj.image = item.smallBannerImg;
                obj.title = item.bannerName;
                // obj.link = item.linkUrl;
                return(obj)
            })
            
            
            return(
                <div className="home">
                  <div>
                        <ReactSwiper options={
                            {
                                preloadImages:true,
                                autoplay:3000,
                                
                                onClick:(swiper,event)=>{
                                    console.log(swiper.activeIndex)
                                    this.setAddBannerClickLog({
                                        bannerName:bannerList[swiper.activeIndex].bannerName
                                    })
                                }
                            }
                        } showPagination items={items}
                        />
                        
                        <div className="main">
                            <div className="home-header ">
                                <ul className="flex-between">
                                    <li onClick={
                                        this.handCount.bind(this,{
                                            clickType:5217,
                                            reserve1:creditDetectionList[0].moduleName,
                                            reserve2:creditDetectionList[0].creditModuleType
                                        })
                                        }><a href={creditDetectionList[0].h5Link}><img alt="闪电贷" src={creditDetectionList[0].img}></img></a></li>
                                    <li onClick={
                                        this.handCount.bind(this,{
                                            clickType:5217,
                                            reserve1:creditDetectionList[1].moduleName,
                                            reserve2:creditDetectionList[1].creditModuleType
                                        })
                                        }><a href={creditDetectionList[1].h5Link}><img alt="闪电贷" src={creditDetectionList[1].img}></img></a></li>
                                        
                                </ul>
                            </div>
                            <div className="home-recommend">
                                {proModuleList.length===0 ? <p></p>:
                                    <div>
                                        <div className="home-recommend-header flex-between">
                                        <div className="home-recommend-icon"><img alt="闪电贷" src={proModuleList[0].proList[this.state.hyh].proIcon}></img></div>
                                        <div className="home-recommend-title flex-defualt">
                                            <h3>{proModuleList[0].proList[this.state.hyh].backName}</h3>
                                            <span>无需下载APP</span>
                                        </div>
                                        <div className="home-recommend-replace flex-content">
                                            <img alt="闪电贷" src={require('../../images/reload.png')}></img>
                                            <span onClick={this.handChange.bind(this)}>换一个</span>
                                        </div>
                                        </div>
                                        <div className="home-recommend-content">
                                        <div className="home-recommend-money">
                                            <em>{MoneyFormat(proModuleList[0].proList[this.state.hyh].maxLimit)}</em>
                                            <p>最高可贷额度(元)</p>
                                        </div>
                                        <div className="home-recommend-adv">
                                            <ul className="flex-around">
                                                <li>{proModuleList[0].proList[this.state.hyh].termText}</li>
                                                <li>{proModuleList[0].proList[this.state.hyh].rateText}</li>
                                                <li>{proModuleList[0].proList[this.state.hyh].lendRate}</li>
                                            </ul>
                                        </div>
                                        </div>
                                        <div className="home-recommend-btn" onClick={
                                        this.handCount.bind(this,{
                                            clickType:5211,
                                            reserve1:proModuleList[0].proList.backName,
                                            reserve2:proModuleList[0].proList.apiProCode,
                                            reserve3:proModuleList[0].name
                                        })
                                        }><a href={proModuleList[0].proList[this.state.hyh].h5Link}>立即申请</a></div>
                                    </div>
                                }
                                
                               
                            </div>
                            <div className="home-list">
                                {proModuleList.length <= 1 ? <p></p>: 
                                <div>
                                     <div className="home-list-header flex-between">
                                        <h3>{proModuleList[1].name}</h3>
                                        <span onClick={this.handLinkMoves.bind(this)}>更多 ></span>
                                     </div>
                                        <div>
                                            <ul>
                                                {proModuleList[1].proList.map((item,index)=>{
                                                
                                                    return(
                                                        <li key={index}>
                                                            <div className="home-item">
                                                            <div className="home-item-icon flex-conter">
                                                                <span><img alt="闪电贷" src={item.proIcon}></img></span>
                                                                <h4>{item.backName}</h4>
                                                            </div>
                                                            <div className="flex-between home-item-bottom">
                                                                    <div className="home-item-money">
                                                                        <span>{item.maxLimit}</span>
                                                                        <p>最高可贷额度（元）</p>
                                                                    </div>
                                                                    <div className="home-item-conter">
                                                                        <p>{item.minLendRate}</p>
                                                                        <p>{item.lendRate}</p>
                                                                    </div>
                                                                    <div className="home-item-btn" onClick={
                                                                    this.handCount.bind(this,{
                                                                        clickType:5211,
                                                                        reserve1:proModuleList[1].proList.backName,
                                                                        reserve2:proModuleList[1].proList.apiProCode,
                                                                        reserve3:proModuleList[1].name
                                                                    })
                                                }><a href={item.h5Link}>立即申请</a></div>
                                                            </div>
                                                            </div>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                </div>
                            }
                            </div>
                            {this.state.loding ?  <Loding text={this.text} IsImg={this.state.have}></Loding>: ''}
                            {this.state.footerIS ? <div className="home-footer">
                                <div className="close" onClick = {()=>this.setState({footerIS:false})}></div>
                                <img alt="闪电贷" src={require('../../images/bottom-gg.png')}></img>
                            </div>:''}
                            
                        </div>
                    </div>
                </div>
            )
        }
        return(
            <div></div>
        )
    }
} 
  
export default withRouter(HomeContent)