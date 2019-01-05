import React from 'react';
import {MoneyFormat } from '../../utils/API'
import {setCommparams,getHomeInof} from '../../utils/config'
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
            hyh:0
        }
        this.i = 0;
      }
    //获取数据
    setHomeinfo(){
        this.setState({
            isdata:false
        })
        const param = Object.assign({},{isGroup:1},setCommparams)
        getHomeInof(param).then((res)=>{
            console.log(res.data)
            this.setState({
                bannerList:res.data.result.homeBannerList,
                creditDetectionList:res.data.result.creditDetectionList,
                proModuleList:res.data.result.proModuleList,
                isdata:true
            })
        });
        
    }
    //滚动加载数据
    // handBoydScroll(){
    //     const scrollHeight = document.documentElement.scrollHeight;
    //     const scrollTop = document.documentElement.scrollTop 
    //     const clientHeight = document.documentElement.clientHeight;
       
    //     if((scrollTop+clientHeight)>=scrollHeight){
    //         this.setState((NewStart)=>({
    //                 loding: true
    //             }
    //         ))
    //         clearTimeout(this.tiems)
    //         this.tiems = setTimeout(()=>{
    //             this.setState((NewStart)=>({
    //                 loding: false,
    //                 list:NewStart.list.concat([2,3])
                    
    //             }))
    //         },3000)
    //         if(this.state.count===3){
    //             this.setState((NewStart)=>({
    //                 loding: true,
    //                 have:false
    //             }
    //         ))
    //         }
    //         console.log(scrollTop,scrollHeight,clientHeight)
    //     }
       
    // }
    
    //跳转详情页面
    handLinkMoves(){
        this.props.history.push('/home/Move?nav=1')
    }
    //换一换
    handChange(){
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
    componentDidMount(){
        this.setHomeinfo()
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
            let proList = [];
            for(var i=0;i<proModuleList.length;i++){
                if(proModuleList[i].proList.length===0){
                    proModuleList.splice(i,1);
                    i--
                }
            }
            // proModuleList.map((item,index)=>{
            //     debugger
            //     indexs ++ 
            //     if(item.proList.length===0){
            //         proModuleList.splice(indexs,1);
            //         indexs--
            //     }else{
                   
            //     }
            // })
            if(proModuleList[0]){
                proList = this.state.proModuleList[0].proList || []
                this.proListlength = proList.length;
            }
            //banner数据
            let items =  bannerList.map((item,index)=>{
                let obj = {};
                obj.image = item.bannerImg;
                obj.title = item.bannerName;
                obj.link = item.linkUrl;
                return(obj)
            })
            //配置banner滚动方式
            const swiperOptions = {
                preloadImages: true,
                autoplay: 3000,
                disableOnInteraction: false,
            };
            return(
                <div className="home">
                  <div>
                        <ReactSwiper swiperOptions={swiperOptions} showPagination items={items}
                        className="swiper-example" />
                        <div className="main">
                            <div className="home-header ">
                                <ul className="flex-between">
                                    <li><a href={creditDetectionList[0].h5Link}><img alt="闪电贷" src={creditDetectionList[0].img}></img></a></li>
                                    <li><a href={creditDetectionList[1].h5Link}><img alt="闪电贷" src={creditDetectionList[1].img}></img></a></li>
                                </ul>
                            </div>
                            <div className="home-recommend">
                                {proModuleList.length===0 ? <p className="nodata">暂无数据</p>:
                                    <div>
                                        <div className="home-recommend-header flex-between">
                                        <div className="home-recommend-icon"><img alt="闪电贷" src={proModuleList[0].proList[this.state.hyh].proIcon}></img></div>
                                        <div className="home-recommend-title flex-defualt">
                                            <h3>{proModuleList[0].proList[this.state.hyh].backName}</h3>
                                            <span>无需下载APP</span>
                                        </div>
                                        <div className="home-recommend-replace flex-content">
                                            <img alt="闪电贷" alt="闪电贷" src={require('../../images/reload.png')}></img>
                                            <span onClick={this.handChange.bind(this)}>换一换</span>
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
                                        <div className="home-recommend-btn"><a href={proModuleList[0].proList[this.state.hyh].h5Link}>立即申请</a></div>
                                    </div>
                                }
                                
                               
                            </div>
                            <div className="home-list">
                                {proModuleList.length===0 ? <p className="nodata">暂无数据</p>: 
                                <div>
                                     <div className="home-list-header flex-between">
                                    <h3>{proModuleList[1].name}</h3>
                                    <span onClick={this.handLinkMoves.bind(this)}>更多 ></span>
                                </div>
                                <div>
                                    <ul>
                                        {proModuleList[1].proList.map((item,index)=>{
                                            var item = Object.keys(item).length ? item : {}
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
                                                            <div className="home-item-btn"><a href={item.h5Link}>立即申请</a></div>
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
                            <div className="home-footer">
                                <img alt="闪电贷" src={require('../../images/bottom-gg.png')}></img>
                            </div>
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