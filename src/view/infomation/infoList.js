import React from 'react';

import {myStorage} from '../../utils/API'
import {getSms} from '../../utils/config';
import Log from '../../components/log/log';
import Title from'../../components/title/index'
export default class InfoList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            infoData:[],
            iden:1,
            indexList:-1
        }
        
    }
     //拉取消息列表
    setSms(data){
        getSms(data).then(res=>{
            this.setState({
                infoData:res.data.data
            })
            console.log(res.data)
        })
    }
    handLinkInfoContent(e){
        const phone = myStorage.get('phone');
        if(myStorage.get(phone)){
            const idenchlidarr = (myStorage.get(phone)+'').split('-');
            if(idenchlidarr.indexOf(e.target.dataset.id)===-1){
                myStorage.set(phone,`${myStorage.get(phone)}-${e.target.dataset.id}`);
            }
        }else{
            myStorage.set(phone,`${e.target.dataset.id}`);
        }
        console.log(myStorage.get(phone))
        this.props.history.push('/infoContent/'+ e.target.dataset.index);
    }
    componentDidMount(){
       
        this.setSms({token:myStorage.get('token')})
    }
    render(){
        const data = this.state.infoData || []
        const phone = myStorage.get('phone')+'';
        return(
            <div className="info">
                <div className="info-list ">
                <Log></Log>
                <Title  text="我的消息" history = {this.props.history}></Title>
                <ul>
                    {data.map((item,index)=>{
                        const arr = (myStorage.get(phone)+'').split('-');
                        const hidden = arr.indexOf((item.id+'')) > -1 ? 'hidden' :''
                        console.log(arr,hidden)
                        return(
                            <li key={index} data-id={item.id} data-index={index} onClick={this.handLinkInfoContent.bind(this)}>
                                <h3 data-index={index} data-id={item.id} className="flex-between">
                                    <span data-id={item.id} data-index={index}>{item.sms_title}</span>
                                    <i data-id={item.id} data-index={index}>{item.create_time.split(' ')[0]}</i>
                                    <em data-index={index} style={{visibility:hidden}}></em>
                                </h3>
                                <p className="info-subtitle" data-id={item.id} data-index={index}>{item.sms_detail}</p>
                            </li>
                        )
                    })}
                </ul>
                </div>
            </div>
            
        )
    }
}