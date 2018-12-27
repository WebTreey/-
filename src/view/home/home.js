import React from 'react';
import {Route} from 'react-router-dom';
import './home.scss';
import {GetQueryString} from '../../utils/API'
import Nav from '../../components/nav/nav'
import HomeContent from './homeContent'
import Login from '../loginandregister/login';
import Move from '../home/move';
import InfoIndex from '../infomation/infoIndex'
import Myinfo from '../infomation/Myinfo'
import SetPassword from '../infomation/setPassword'
import Certification from '../infomation/certification'

export default class Home extends React.Component{
    constructor(props){
        super(props);
    }
    handSetTab(e){
        const Tabindex = parseInt(GetQueryString('nav')) || 0 ;
        const index = parseInt(e.target.dataset.index,10);
        if(index===Tabindex) return false;
        if(index===0){
            this.props.history.push('/home')
        }else if(index===1){
            this.props.history.push('/home/move?nav=1')
        }else if(index===2){
            this.props.history.push('/home/infoindex?nav=2')
        }
    }
    render(){
        return(
            <div>
                <Route exact path="/home" component={HomeContent}></Route>
                <Route path="/home/Login" component={Login}></Route>
                <Route path="/home/Move" component={Move}></Route>
                <Route path="/home/InfoIndex" component={InfoIndex}></Route>
                <Route path="/home/Myinfo" component={Myinfo}></Route>
                <Route path="/home/SetPassword" component={SetPassword}></Route>
                <Route path="/home/Certification" component={Certification}></Route>
                <Nav handSetTab={this.handSetTab.bind(this)}></Nav>
            </div>
        )
    }
}