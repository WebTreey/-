import React from 'react';
import {} from '../../utils/config'
import {Encrypt} from '../../utils/AES'
import Title from'../../components/title/index'
export default class BlacklistDetails extends React.Component{
    constructor(props){
        super(props);
        
    }
    
    render(){
        return(
            <div className="blacklist">
                <Title  text="检测结果" history = {this.props.history}></Title>
            </div>
        )
    }
}