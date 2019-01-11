import React from 'react';
import './info.scss';
import {myStorage,BaiDuHm} from '../../utils/API'
import {getSms} from '../../utils/config';
import Log from '../../components/log/log';
import Title from'../../components/title/index';
export default class infoContent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            infoData:[]
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
    componentDidMount(){
        this.setSms({token:myStorage.get('token')})
    }
    render(){
        console.log(this.props)
        const index = this.props.match.params.index;
        const data = this.state.infoData[index] || []
        return(
            <div className="info ">
                <Title  text="我的消息" history = {this.props.history}></Title>
                <div className='info-content'>
                <Log></Log>
                <h3>{data.sms_title}</h3>
                <span>{data.create_time}</span>
                <p>{data.sms_detail}</p>
                </div>
            </div>
           
        )
    }
}