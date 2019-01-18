import React from 'react';
import {MoneyFormat , ISFirstWeb,ISFirstWebJH,IOSRoAndriod,myStorage} from '../../utils/API'
import {getHomeInof,getCommonClickLog,getSaveOpenLog,getMobileDetect,getSaveHardLog,getAddBannerClickLog} from '../../utils/config'
import {Loading} from '../../components/loading/loading'
import { withRouter } from 'react-router';
import ReactSwiper from 'reactjs-swiper'
import './home.scss';
class HomeContent extends React.Component{
    constructor() {
        super();
        this.state = {
            have:true,
            bannerList:[],//banner数据
            creditDetectionList:[],//黑名单风险检测数据
            proModuleList:[],
            isdata:false,
            hyh:0,
            footerIS: true,
            home:'0 0 1rem',
            loading:false
        }
        this.i = 0;
      }
    //获取基本信息
    setMobileDetect(){
        getMobileDetect()
    }
    //通过百度api获取地址
    getBaiDuAPI(){
        var BMap = window.BMap;
        var map = new BMap.Map("allmap");
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
            if(this.getStatus() == window.BMAP_STATUS_SUCCESS){
                var mk = new BMap.Marker(r.point);
                map.addOverlay(mk);
                map.panTo(r.point);
                var point = new BMap.Point(r.point.lng,r.point.lat);
                map.centerAndZoom(point,12);
                var gc = new BMap.Geocoder();  //初始化，Geocoder类
                gc.getLocation(point, function (rs) {   //getLocation函数用来解析地址信息，分别返回省市区街等
                    if(r.accuracy!==null){
                        var addComp = rs.addressComponents;
                        myStorage.set('city',addComp.city)
                    }else{
                       
                    }
                    
                });
            }
            
        },{enableHighAccuracy: true})
    }
    
    //获取数据
    setHomeinfo(){
        this.setState({
            isdata:false,
            loading:true
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
            }
            if(res.data.result){
                this.setState({
                    bannerList:res.data.result.homeBannerList,
                    creditDetectionList:res.data.result.creditDetectionList.sort((a,b)=>{return a.creditModuleType - b.creditModuleType}),
                    proModuleList:res.data.result.proModuleList,
                    isdata:true
                })
            }
            this.setState({
                loading:false
            })
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
    //判断是否显示底部图片
    IsFooterImg(){
        if(!myStorage.get('footer')){
            this.setState({
                footerIS: true,
                home:'0 0 2.1rem'
            })
        }else{
            const strdate = myStorage.get('footer');
            const oldDate = new Date(strdate);
            const newDate = new Date();
            if(newDate.getFullYear()>oldDate.getFullYear || newDate.getMonth() > oldDate.getMonth() || newDate.getDate()> oldDate.getDate()){
                myStorage.set('footer', newDate)
                this.setState({
                    footerIS: true,
                    home:'0 0 2.1rem'
                })
            }else{
                this.setState({
                    footerIS: false
                })
            }
        }
    }
    //底部点击事件
    handFooterClose(){
        const date =  Date();
        myStorage.set('footer',date);
        this.setState({
            footerIS: false,
            home:'0 0 1rem '
        })
        return false;
    }
    handFooter(){
        if(IOSRoAndriod()){
            this.setCommonClickLog({
                clickType:5320,
                reserve1:'app下载'
            })
        }else{
            this.setCommonClickLog({
                clickType:5320,
                reserve1:'关注公众号'
            })
        }
        
    }
    //点击统计
    handCount(data){
        this.setCommonClickLog(data)
    }
    //跳转详情页面
    handLinkMoves(){
        this.props.history.push('/home/Move?nav=1');
        this.setCommonClickLog({
            clickType:5320,
            reserve1:'首页贷款产品更多'
        })
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
        this.setCommonClickLog({
            clickType:5320,
            reserve1:'刷新接口产品模块点击'
        })
    }
    componentDidMount(){
        this.getBaiDuAPI()
        if(ISFirstWeb()){
            this.setSaveOpenLog()
        }
        if(ISFirstWebJH()){
            this.setSaveHardLog()
        }
        this.IsFooterImg();
        this.setHomeinfo();
        this.setMobileDetect()
    }
    componentWillUnmount(){
        clearTimeout(this.tiems);
        document.onscroll = null
    }
    render(){
        if(this.state.isdata){
            const bannerList = this.state.bannerList;
            let creditDetectionList = this.state.creditDetectionList || [];
            let proModuleList = this.state.proModuleList;
            //banner数据
            let items =  bannerList.map((item,index)=>{
                let obj = {};
                obj.image = item.smallBannerImg;
                obj.title = item.bannerName;
                obj.link = item.linkUrl;
                return(obj)
            })
            return(
                <div style={{padding:this.state.home}}>
                <div id="allmap" style={{display:'none'}}></div>
                {this.state.loading ? <Loading></Loading> : '' }
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
                            {creditDetectionList.length ? <ul className="flex-between">
                                    
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
                                        
                                </ul>:<p></p>}
                                
                            </div>
                            <div className="home-recommend">
                                {proModuleList.length===0 ? <p></p>:
                                    <div>
                                        <div className="home-recommend-header flex-between">
                                        <div className="home-recommend-icon"><img alt="闪电贷" src={proModuleList[0].proList[this.state.hyh].proIcon}></img></div>
                                        <div className="home-recommend-title flex-defualt">
                                            <h3>{proModuleList[0].proList[this.state.hyh].backName}</h3>
                                            <span>{proModuleList[0].proList[this.state.hyh].proRecom}</span>
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
                                        }><a href={proModuleList[0].proList[this.state.hyh].detailLink ? proModuleList[0].proList[this.state.hyh].detailLink: proModuleList[0].proList[this.state.hyh].h5Link }>立即申请</a></div>
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
                                                                        <span>{MoneyFormat(item.maxLimit)}</span>
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
                                                }><a href={item.detailLink ? item.detailLink  : item.h5Link}>立即申请</a></div>
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
                            {this.state.footerIS ? <div className="home-footer" onClick={this.handFooter.bind(this)}>
                                <div className="close" onClick = {this.handFooterClose.bind(this)}></div>
                                {IOSRoAndriod()?<img alt="闪电贷" src={require('../../images/bottom-gg.png')}></img>:<img alt="闪电贷" src={require('../../images/footer_iso.png')}></img>}
                            </div>:''}
                            
                        </div>
                    </div>
                </div>
            )
        }
        return(
            <div>
                 <div id="allmap" style={{display:'none'}}></div>
                 {this.state.loading ? <Loading></Loading> : '' }
            </div>
        )
    }
} 
  
export default withRouter(HomeContent)