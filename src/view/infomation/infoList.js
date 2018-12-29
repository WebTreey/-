import React from 'react';
import './info.scss';
import {myStorage} from '../../utils/API'
import {getSms} from '../../utils/config';
export default class InfoList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            infoData:[]
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
        this.props.history.push('/infoContent/'+ e.target.dataset.index);
    }
    componentDidMount(){
        this.setSms({token:myStorage.get('token')})
    }
    render(){
        const data = this.state.infoData || []
        return(
            <div className="info-list">
                <ul>
                    {data.map((item,index)=>{
                        return(
                            <li key={index} data-index={index} onClick={this.handLinkInfoContent.bind(this)}>
                                <h3 data-index={index} className="flex-between"><span data-index={index}>{item.sms_title}</span><i data-index={index}>{item.create_time.split(' ')[0]}</i></h3>
                                <p className="info-subtitle" data-index={index}>{item.sms_detail}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}