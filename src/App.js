import React, { Component } from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import './App.scss';
import Home from './view/home/home';
import Guide from './view/guide/guide';
import CarrProving from './view/infomation/carrProving';
import ErrIndex from './view/guide/Errindex';
import InfoList from './view/infomation/infoList'
import infoContent from './view/infomation/infoContent'
import Index from './view/guide/index';
import TestResult from './view/infomation/TestResult'
import Payment from './view/infomation/payment';
import Blacklist from './view/infomation/Blacklist';
import PayTransfer from './view/infomation/paytransfer';
import BlacklistDetails from './view/infomation/BlacklistDetails';
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


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <GetBaidu>
            <Route exact path="/" component={Guide}></Route>
            <Route path="/Home" component={Home}></Route>
            <Route path="/CarrProving" component={CarrProving}></Route>
            <Route path="/ErrIndex/:id" component={ErrIndex}></Route>
            <Route path="/InfoList" component={InfoList}></Route>
            <Route path="/infoContent/:index" component={infoContent}></Route>
            <Route path="/index" component={Index}></Route>
            <Route path="/TestResult" component={TestResult}></Route>
            <Route path="/Payment/:id" component={Payment}></Route>
            <Route path="/Blacklist" component={Blacklist}></Route>
            <Route path="/PayTransfer" component={PayTransfer}></Route>
            <Route path="/BlacklistDetails" component={BlacklistDetails}></Route>
          </GetBaidu>
        </Router>
      </div>
    );
  }
}

export default App;
