import React from 'react';
import './info.scss';
import {withRouter} from 'react-router';
import {myStorage,BaiDuHm,ISFirstWeb,HideConter} from '../../utils/API'
import {getIsAuth,getSms,getExistCheckReport,getSaveOpenLog,getLinkUrl,HOST} from '../../utils/config';
import {PromptBox} from '../../components/prompt/prompt'
import Title from'../../components/title/index'
class InfoIndex extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            city:myStorage.get('city') || '重新获取定位',
            data:{},
            prompt:false,
            infoData:[],
            showBtn:false,
            rzText:''
        }
        BaiDuHm()
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
    //通过百度api获取地址
    getBaiDuAPI(){
        const that = this
        var BMap = window.BMap;
        var map = new BMap.Map("allmap");
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
            var point = new BMap.Point(r.point.lng,r.point.lat);
            map.centerAndZoom(point,12);
            var gc = new BMap.Geocoder();  //初始化，Geocoder类
            gc.getLocation(point, function (rs) {   //getLocation函数用来解析地址信息，分别返回省市区街等
                var addComp = rs.addressComponents;
                that.setState({
                    city: addComp.city
                })
                myStorage.set('city',addComp.city);
        });
    })
    }
    //个人资料
    setIsAuth(data){
        getIsAuth(data).then(res=>{
            console.log(res.data)
            if(res.data.code==='yes'){
                this.setState({
                    rzText:'已认证',
                    data:res.data
                })
            }else if(res.data.code==='no'){
                this.setState({
                    rzText:'去认证',
                    data:res.data
                })
            }
        })
    }
    //拉取消息列表
    setSms(data){
        getSms(data).then(res=>{
            if(res.data.data){
                this.setState({
                    infoData:res.data.data,
                    showBtn:true
                })
            }else if(res.data.code ==='login_outtime'){
                this.setState({
                    showBtn:false
                })
            }
            console.log(res.data)
        })
    }
    
    //查询是否存在检测结果
    setExistCheckReport(data,index){
        getExistCheckReport(data).then(res=>{
            console.log(res.data)
            if(res.data.code==='ok'){
                if(index===2){
                     //跳转到运营商检测
                    if(res.data.data.operatorCheck===1){
                        this.props.history.push('/TestResult')
                    }else{
                        this.props.history.push('/CarrProving')
                    }
                }else{
                    //跳转到黑名单检测
                    if(res.data.data.blacklistCheckNew===1){
                        this.props.history.push('/BlacklistDetails');
                    }else{
                        this.props.history.push('/Blacklist');
                    }
                }
               
            }
        })
    }
    //打开日志
    setSaveOpenLog(){
        getSaveOpenLog().then(res=>{
            console.log(res.data)
        })
    }
    handBaidu(){
        this.getBaiDuAPI();
    }
    handLinkMyinfo(){
        if(this.state.data.code==='yes' || this.state.data.code==='no'){
            this.props.history.push('/home/myinfo?nav=2')
        }else{
            this.props.history.push('/home/login?nav=2')
        }
    }
    handLinkCertification(){
        this.props.history.push('/home/certification?nav=2')
    }
    handLinkCarrProving(){
        if(this.state.data.code==='yes' || this.state.data.code==='no'){
            this.setExistCheckReport({},2)
        }else{
            this.props.history.push('/home/login?nav=2')
        }
    }
    handLinkBlacklist(){
        if(this.state.data.code==='yes' || this.state.data.code==='no'){
            this.setExistCheckReport({},1)
        }else{
            this.props.history.push('/home/login?nav=2')
        }
    }
    handLoginBtn(){
        this.props.history.push('/home/login?nav=2')
    }
    handSetPassword(){
        if(this.state.data.code==='yes' || this.state.data.code==='no'){
            this.props.history.push('/home/setPassword?nav=2');
        }else{
            this.props.history.push('/home/login?nav=2')
        }
    }
    //跳转到消息列表
    handLinkInfoList(){
        if(this.state.data.code==='yes' || this.state.data.code==='no'){
            this.props.history.push('/infolist')
        }else{
            this.props.history.push('/home/login?nav=2')
        }
    }
    handLinkHref(param){
        const url = getLinkUrl()
        
        if(param===1){
            const url2 = getLinkUrl(1)
            window.location.href = `${HOST}/about/agreement_about.html${url2}`
        }else if(param===2){
            window.location.href = `${HOST}/f/zghcp.html${url}`
        }else{
            window.location.href = `${HOST}/open/userFeedback-index#/${url}`
        }
    }
    componentDidMount(){
        this.setIsAuth({token:myStorage.get('token')});
        this.setSms({token:myStorage.get('token')});
        if(ISFirstWeb()){
            this.setSaveOpenLog();
        }
    }
    componentWillUnmount(){
        clearTimeout(this.times)
        this.times = null ;
    }
    render(){
        let yd = 0;
        const phone = myStorage.get('phone')
        if(myStorage.get(phone)){
            yd = (myStorage.get(phone)+'').split('-').length
        }
       
        const len = this.state.infoData.length - yd;
        const onClick= this.state.data.code==='no' ? this.handLinkCertification.bind(this) : null
        console.log(myStorage.get('city'))
        return(
            <div className="info">
                <Title  text="我的" history = {this.props.history}></Title>
                {this.state.prompt ? <PromptBox text={this.text}></PromptBox> :''}
                <div id="allmap" style={{display:'none'}}></div>
                <div className="info-header">
                    <div className="info-position flex-content">
                    <img alt="闪电贷" src={require('../../images/dingwei.png')}></img>
                    <span onClick={this.handBaidu.bind(this)}>{this.state.city}</span>
                    </div>
                    <div className="info-xx" onClick={this.handLinkInfoList.bind(this)}>
                        <img alt="闪电贷" src={require('../../images/xiaoxi.png')}></img>
                        {(this.state.data.code==='yes' || this.state.data.code==='no') && len !==0 ? <span>{len}</span> : ''}
                    </div>
                    <div className="info-grxx flex-column">
                        {this.state.showBtn ? <img alt="闪电贷" src={require('../../images/my-photo.jpg')}></img> : <img alt="闪电贷" src={require('../../images/my-photo-1.jpg')}></img>}
                        
                        {this.state.showBtn ? <div><span className="flex-content"><em>{HideConter(myStorage.get('phone'))}</em><img alt="" src={require("../../images/right-icon.jpg")}></img></span>
                        <button onClick={onClick} className="info-grxx-btn" >{this.state.rzText}</button></div> : <button onClick={this.handLoginBtn.bind(this)} className="info-grxx-btn" style={{margin:'.2rem 0 0 0'}}>登录</button>}
                        
                    </div>
                </div>
                <div className="info-main">
                    <div className="info-main-1">
                        <ul>
                            <li className="flex-conter" onClick={this.handLinkMyinfo.bind(this)}>
                                <i className="icon icon-1"></i>
                                <h3>个人信息</h3>
                                <span className="flex-content"><img alt="闪电贷" src={require('../../images/right-icon.jpg')}></img></span>
                            </li>
                            <li className="flex-conter" onClick={this.handLinkBlacklist.bind(this)}>
                                <i className="icon icon-2"></i>
                                <h3>黑名单检测</h3>
                                <span className="flex-content"><em>去查询</em><img alt="闪电贷" src={require('../../images/right-icon.jpg')}></img></span>
                            </li>
                            <li className="flex-conter" onClick={this.handLinkCarrProving.bind(this)}>
                                <i className="icon icon-3"></i>
                                <h3>运营商检测</h3>
                                <span className="flex-content"><em>去查询</em><img alt="闪电贷" src={require('../../images/right-icon.jpg')}></img></span>
                            </li>
                            <li className="flex-conter" onClick={this.handSetPassword.bind(this)}>
                                <i className="icon icon-4"></i>
                                <h3>设置密码</h3>
                                <span className="flex-content"><em>去设置</em><img alt="闪电贷" src={require('../../images/right-icon.jpg')}></img></span>
                            </li>
                        </ul>
                    </div>
                    <div className="info-main-2">
                        <ul>
                            <li className="flex-conter" onClick={this.handLinkHref.bind(this,1)}>
                                <i className="icon icon-5"></i>
                                <h3>关于我们</h3>
                                <span className="flex-content"><em></em><img alt="闪电贷" src={require('../../images/right-icon.jpg')}></img></span>
                            </li>
                            <li className="flex-conter" onClick={this.handLinkHref.bind(this,3)}>
                                <i className="icon icon-6"></i>
                                <h3>帮助中心</h3>
                                <span className="flex-content"><em></em><img alt="闪电贷" src={require('../../images/right-icon.jpg')}></img></span>
                            </li>
                            <li className="flex-conter" onClick={this.handLinkHref.bind(this,2)}>
                                <i className="icon icon-7"></i>
                                <h3>关注微信</h3>
                                <span className="flex-content"><em></em><img alt="闪电贷" src={require('../../images/right-icon.jpg')}></img></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(InfoIndex)