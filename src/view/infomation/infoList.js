import React from 'react';
import './info.scss';
import {myStorage,BaiDuHm} from '../../utils/API'
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
        BaiDuHm()
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
       
        if(myStorage.get('iden')){
            if((myStorage.get('iden')+'').split('-').indexOf(e.target.dataset.id)===-1){
                myStorage.set('iden',`${myStorage.get('iden')}-${e.target.dataset.id}`);
            }
        }else{
            myStorage.set('iden',e.target.dataset.id);
        }
        
        this.props.history.push('/infoContent/'+ e.target.dataset.index);
    }
    componentDidMount(){
        this.setSms({token:myStorage.get('token')})
    }
    render(){
        const data = this.state.infoData || []
        return(
            <div className="info">
                <div className="info-list ">
                <Log></Log>
                <Title  text="我的消息" history = {this.props.history}></Title>
                <ul>
                    {data.map((item,index)=>{
                        return(
                            <li key={index} data-id={item.id} data-index={index} onClick={this.handLinkInfoContent.bind(this)}>
                                <h3 data-index={index} data-id={item.id} className="flex-between"><span data-id={item.id} data-index={index}>{item.sms_title}</span><i data-id={item.id} data-index={index}>{item.create_time.split(' ')[0]}</i></h3>
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