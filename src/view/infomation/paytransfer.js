import React from 'react';
import {GetQueryString} from '../../utils/API'
import {Encrypt} from '../../utils/AES'
import { getOperatorPayResult } from '../../utils/config'
export default class PayTransfer extends React.Component{
    setOperatorPayResult(data){
        getOperatorPayResult(data).then(res=>{
            console.log(res.data)
            if(res.data.code ==='payOk'){
                this.props.history.push('/TestResult')
            }
        })
    }
    componentDidMount(){
        if(parseInt(GetQueryString('type'))===1){
            this.setOperatorPayResult({
                phone:Encrypt(13823541918),
                payType:GetQueryString('pay'),
                orderNo:GetQueryString('orderNo')
            })
        }
        
    }
    render(){
        return(
            <div></div>
        )
    }
}