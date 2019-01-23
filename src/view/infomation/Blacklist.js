import React from 'react';
import './info.scss'
import Swiper from 'swiper';
import {getUserInfo,getBlackListCheck} from '../../utils/config'
import {Encrypt} from '../../utils/AES'
import Title from'../../components/title/index'

// import { withRouter } from 'react-router';
export default class Blacklist extends React.Component{
    constructor(props){
        super(props);
        document.body.style.overflow = 'hidden'
        document.body.style.height = '100%'
    }
    getSwiper(){
        this.mswiper = new Swiper(this.refs.lun,{
            loop: false,  //循环
            direction: 'vertical',
            speed:600
        })
    }
    setBlackListCheck(data){
        getBlackListCheck(data).then(res=>{
            console.log(res.data)
            if(res.data.code==="noPay"){
                this.props.history.push('/payment/0')
            }else if(res.data.code==='hasPay'){
                this.props.history.push('/BlacklistDetails');
            }
        })
    }
    //判断是否实名认证
    setUserInfo(data){
        getUserInfo(data).then(res=>{
            console.log(res.data);
            if(res.data.result){
                //已认证
                var data = res.data.result
                this.setBlackListCheck({name:Encrypt(data.name),card:Encrypt(data.idCardNo)});
                
            }else{
                this.props.history.push('/home/certification?nav=2')
            }
        })
    }
    handLinkBlacklistDetails(){
        this.setUserInfo({})
    }
    componentDidMount(){
        this.getSwiper()
    }
    componentWillUnmount(){
        document.body.style.overflow = ''
    }
    render(){
        return(
            <div className='blacklist'>
               <Title  text="黑名单风险监测" history = {this.props.history}></Title>
              
                    <div className="swiper-container" ref="lun">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide" >
                                <div className="swiper-content"> 
                                <img className="spimg" alt="" src={require('../../images/1.png')}></img>
                                    <div onClick={this.handLinkBlacklistDetails.bind(this)}>
                                        <img className="bk-iconbottom" src={require('../../images/h_botton.png')}></img>
                                        <img  className="bk-btn" src={require('../../images/h_btn.png')}></img>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="swiper-content">
                                    <img className="spimg" alt="" src={require('../../images/2.png')}></img>
                                    <div onClick={this.handLinkBlacklistDetails.bind(this)}>
                                        <img className="bk-iconbottom" src={require('../../images/h_botton.png')}></img>
                                        <img  className="bk-btn" src={require('../../images/h_btn.png')}></img>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="swiper-content">
                                    <img className="spimg" alt="" src={require('../../images/3.png')}></img>
                                    <div onClick={this.handLinkBlacklistDetails.bind(this)}>
                                        <img className="bk-iconbottom" src={require('../../images/h_botton.png')}></img>
                                        <img className="bk-btn" src={require('../../images/h_btn.png')}></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
               
            </div>
        )
    }
}