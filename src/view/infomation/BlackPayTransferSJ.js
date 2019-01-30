import React from 'react';
import {GetQueryString} from '../../utils/API'
import {Encrypt} from '../../utils/AES'
import { getUserInfo , getPayResultNew} from '../../utils/config'
export default class BlackPayTransferSJ extends React.Component{

    setUserInfo(){
        getUserInfo().then(res=>{
            console.log(res.data)
            return res.data.result
        }).then(res=>{
            this.setPayResultNew({
                name:Encrypt(res.name),
                card:Encrypt(res.idCardNo),
                phone:Encrypt(res.phone),
                payType:GetQueryString('type'),
                orderNo:GetQueryString('out_trade_no') || GetQueryString('orderNo') ,
                tradeNo:GetQueryString('trade_no')
                // out_trade_no和trade_no
            })
        })
    }
    setPayResultNew(data){
        getPayResultNew(data).then(res=>{
            console.log(res.data)
            if(res.data.code==='payOk'){
                this.props.history.push('/BlacklistDetails')
            }else{
                this.props.history.push('/BlacklistDetails')
            }
        })
    }
    componentDidMount(){
        this.setUserInfo()
    }
    render(){
        return(
            <div></div>
        )
    }
}