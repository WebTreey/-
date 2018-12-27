import React from 'react';
import './nav.scss'
import { withRouter } from 'react-router-dom';
import {GetQueryString} from '../../utils/API'
class Nav extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            Tab:[
                {id:1,label:'首页'},
                {id:2,label:'贷款'},
                {id:3,label:'我的'}
            ]
        }
    }
    render(){
        const nav = this.state.Tab;
        const Tabindex = parseInt(GetQueryString('nav')) || 0 ;
        return(
            <div className="nav">
                <ul className="flex-around">
                    {nav.map((item,index)=>{
                        const spancolor = Tabindex === index ? 'spancolor' :''
                        const classname = Tabindex === index ? '-active' :''
                        return(
                            <li key={index} className="flex-column" data-index={index} onClick={this.props.handSetTab}>
                                <em className={`icon icon-${index+1}${classname}`} data-index={index}></em>
                                <span className={spancolor} data-index={index}>{item.label}</span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}
export default withRouter(Nav)