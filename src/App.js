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
import TestResult from './view/infomation/TextResult'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path="/" component={Guide}></Route>
            <Route path="/Home" component={Home}></Route>
            <Route path="/CarrProving" component={CarrProving}></Route>
            <Route path="/ErrIndex/:id" component={ErrIndex}></Route>
            <Route path="/InfoList" component={InfoList}></Route>
            <Route path="/infoContent/:index" component={infoContent}></Route>
            <Route path="/index" component={Index}></Route>
            <Route path="/TestResult" component={TestResult}></Route>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
