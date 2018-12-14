import React from 'react';
import {setCommparams , MoneyFormat } from '../../utils/API'
import {getHomeInof} from '../../utils/config'
import { withRouter } from 'react-router';
import ReactSwiper from 'reactjs-swiper'
import './home.scss';

const Loding = (props)=>{
    return(
        <div className="home-loding flex-conter">
        {props.IsImg ? <img src={require('../../images/loding.gif')}></img> : ''}
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
            bannerList:[],
            creditDetectionList:[],
            proModuleList:[],
            isdata:false,
            hyh:0
        }
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
    handBoydScroll(){
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop 
        const clientHeight = document.documentElement.clientHeight;
       
        if((scrollTop+clientHeight)>=scrollHeight){
            this.setState((NewStart)=>({
                    loding: true
                }
            ))
            clearTimeout(this.tiems)
            this.tiems = setTimeout(()=>{
                this.setState((NewStart)=>({
                    loding: false,
                    list:NewStart.list.concat([2,3])
                    
                }))
            },3000)
            if(this.state.count===3){
                this.setState((NewStart)=>({
                    loding: true,
                    have:false
                }
            ))
            }
            console.log(scrollTop,scrollHeight,clientHeight)
        }
       
    }
    //跳转详情页面
    handLinkMoves(){
        this.props.history.push('/home/Move')
    }
    componentDidMount(){
        this.setHomeinfo()
        document.addEventListener('scroll',()=>{
            this.handBoydScroll()
        })
    }
    componentWillUnmount(){
        clearTimeout(this.tiems);
    }
    render(){
        if(this.state.isdata){
            this.text = this.state.have ? '正在加载更多数据' : '没有数据了';
            const bannerList = this.state.bannerList;
            const creditDetectionList = this.state.creditDetectionList;
            let proModuleList = this.state.proModuleList;
            proModuleList.map((item,index)=>{
                if(item.proList.length===0){
                    proModuleList.splice(index,1);
                }
            })
            console.log(proModuleList)
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
                                    <li><a href={creditDetectionList[0].h5Link}><img src={creditDetectionList[0].img}></img></a></li>
                                    <li><a href={creditDetectionList[1].h5Link}><img src={creditDetectionList[1].img}></img></a></li>
                                </ul>
                            </div>
                            <div className="home-recommend">
                                <div className="home-recommend-header flex-between">
                                    <div className="home-recommend-icon"><img src={proModuleList[0].proList[this.state.hyh].proIcon}></img></div>
                                    <div className="home-recommend-title flex-defualt">
                                        <h3>{proModuleList[0].proList[this.state.hyh].backName}</h3>
                                        <span>无需下载APP</span>
                                    </div>
                                    <div className="home-recommend-replace flex-content">
                                        <img alt="闪电贷" src={require('../../images/reload.png')}></img>
                                        <span>换一换</span>
                                    </div>
                                </div>
                                <div className="home-recommend-content">
                                    <div className="home-recommend-money">
                                        <em>{MoneyFormat(5000000)}</em>
                                        <p>最高可贷额度(元)</p>
                                    </div>
                                    <div className="home-recommend-adv">
                                        <ul className="flex-around">
                                            <li>3分钟到账</li>
                                            <li>日利率0.05%</li>
                                            <li>期限20个月</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="home-recommend-btn" onClick={this.handBoydScroll}>立即申请</div>
                            </div>
                            <div className="home-list">
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
                                                        <span><img src={item.proIcon}></img></span>
                                                        <h4>{item.backName}</h4>
                                                    </div>
                                                    <div className="flex-between home-item-bottom">
                                                            <div className="home-item-money">
                                                                <span>{item.limitText}</span>
                                                                <p>最高可贷额度（元）</p>
                                                            </div>
                                                            <div className="home-item-conter">
                                                                <p>6-12个月</p>
                                                                <p>30秒极速放款</p>
                                                            </div>
                                                            <div className="home-item-btn">立即申请</div>
                                                    </div>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                            {this.state.loding ?  <Loding text={this.text} IsImg={this.state.have}></Loding>: ''}
                            <div className="home-footer">
                                <img src={require('../../images/bottom-gg.png')}></img>
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