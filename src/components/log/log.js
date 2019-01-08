import React from 'react';
import {ISFirstWeb,ISFirstWebJH} from '../../utils/API'
import {getSaveHardLog,getSaveOpenLog} from '../../utils/config'
export default class Log extends React.Component{
    setSaveHardLog(){
        getSaveHardLog().then(res=>{
            console.log(res.data);
        })
    }
    setSaveOpenLog(){
        getSaveOpenLog().then(res=>{
            console.log(res.data);
        })
    }
    componentDidMount(){
        if(ISFirstWeb()){
            this.setSaveOpenLog();
        }
        if(ISFirstWebJH()){
            this.setSaveHardLog();
        }
    }
    render(){
        return(
            <div></div>
        )
    }
}