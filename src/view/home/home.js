import React from 'react';
import {Route} from 'react-router-dom';
import './home.scss';
import {GetQueryString} from '../../utils/API';
import {getCommonClickLog} from '../../utils/config'
import Nav from '../../components/nav/nav';
import HomeContent from './homeContent';
import Login from '../loginandregister/login';
import Move from '../home/move';
import InfoIndex from '../infomation/infoIndex';
import Myinfo from '../infomation/Myinfo';
import SetPassword from '../infomation/setPassword';
import Certification from '../infomation/certification';
import RetrievePass from '../infomation/RetrievePass'

const GetBaidu = props => {
    let children = props.children;
    let _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?d6fd9017a337e2cad391b7e772cb452a";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
    return children;
  };

export default class Home extends React.Component{
   
    setCommonClickLog(data){
        getCommonClickLog(data).then(res=>{
            console.log(res.data)
        })
    }
    
    handSetTab(e){
        const Tabindex = parseInt(GetQueryString('nav')) || 0 ;
        const index = parseInt(e.target.dataset.index,10);
        if(index===Tabindex) return false;
        if(index===0){
            this.setCommonClickLog({
                clickType:5320,
                reserve1:'底部Tab首页'
            })
            this.props.history.push('/home');
        }else if(index===1){
            this.setCommonClickLog({
                clickType:5320,
                reserve1:'底部Tab贷款'
            })
            this.props.history.push('/home/move?nav=1');
        }else if(index===2){
            this.setCommonClickLog({
                clickType:5320,
                reserve1:'底部Tab我的'
            })
            this.props.history.push('/home/infoindex?nav=2');
        }
    }
    render(){
        return(
            <GetBaidu>
                <Route exact path="/home" component={HomeContent}></Route>
                <Route path="/home/Login" component={Login}></Route>
                <Route path="/home/Move" component={Move}></Route>
                <Route path="/home/InfoIndex" component={InfoIndex}></Route>
                <Route path="/home/Myinfo" component={Myinfo}></Route>
                <Route path="/home/SetPassword" component={SetPassword}></Route>
                <Route path="/home/Certification" component={Certification}></Route>
                <Route path="/home/RetrievePass" component={RetrievePass}></Route>
                <Nav handSetTab={this.handSetTab.bind(this)}></Nav>
            </GetBaidu>
        )
    }
}