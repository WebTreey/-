import React from 'react';
import './info.scss'
import {withRouter} from 'react-router';
import { Picker, List , DatePicker } from 'antd-mobile';
import {myStorage ,HideConter} from '../../utils/API';
import {getIsAuth,getSubUsrInfo,getUserInfo} from '../../utils/config';
import {Encrypt,Decrypt} from '../../utils/AES'
const seasons = [
    {
        label: '男',
        value: '男',
      },
      {
        label: '女',
        value: '女',
    }
  ];

const Prompt = (props) =>{
    return(
       <div className=" info-prompt">
            <div className="tran-conter info-box">
                <p>您确认要退出当前账号？</p>
                <div className="flex-between">
                    <span onClick={props.handEndNo}>取消</span>
                    <i onClick={props.handEndYes}>确定</i>
                </div>
            </div>
       </div>
    )
}

class Myinfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sValue:[],
            date: '',
            AuthData:{
                name:'立即去实名认证',
                card:'立即去实名认证'
            },
            PromptEnd:false
        }
    }
    //提示框隐藏显示
    setPromptHide(text){
        this.text = text;
        this.setState({
            prompt:true
        })
        clearTimeout(this.times)
        this.times = setTimeout(()=>{
            this.setState({
                prompt:false
            })
        },2000)
    }
    //个人资料
    setIsAuth(data){
        getIsAuth(data).then(res=>{
            if(res.data.data){
                this.setState({
                    AuthData:res.data.data
                })
            }
            console.log(res.data);
        })
    }
    //保存用户信息或者查询用户信息
    setSubUsrInfo(data){
        getSubUsrInfo(data).then(res=>{
            console.log(res.data)
        })
    }
    //获取用户基本信息
    setUserInfo(data){
        getUserInfo(data).then(res=>{
            console.log(res.data);
        })
    }
    handLinkCertification(){
        this.props.history.push('/home/certification')
    }
    handSex(value){
        this.setState({
            sValue:value
        })
        this.setSubUsrInfo({type:2,sex:value[0],birthday:''})
    }
    handDate(value){
        console.log(value)
        const v = value;
        let date = new Date(v);
        let y = date.getFullYear();
        let m = date.getMonth()+1;
        this.setState({
            date: value
        })
        this.setSubUsrInfo({type:2,sex:'',birthday:`${y}-${m}`})
    }
    handEnd(){
        this.setState({
            PromptEnd:true
        })
    }
    handEndYes(){
        this.setState({
            PromptEnd:false
        })
        myStorage.remove('token');

    }
    handEndNo(){
        this.setState({
            PromptEnd:false
        })
    }
    componentDidMount(){
        this.setIsAuth({phone:Encrypt(myStorage.get('phone')),token:myStorage.get('token')});
        this.setUserInfo({})
    }
    render(){
        const data = this.state.AuthData;
        const minDate = new Date('1930/01/01');
        const maxDate = new Date();
        const IshandLinkCertification = !data ? this.handLinkCertification.bind(this) : null;
        return(
            <div className="info-me">
            {this.state.PromptEnd ? <Prompt handEndYes={this.handEndYes.bind(this)} handEndNo={this.handEndNo.bind(this)}></Prompt> : ''}
                <div className="info-main">
                    <ul className="info-me-ul">
                        <li className="flex-conter" onClick={IshandLinkCertification}>
                            <label>姓名</label>
                            <input type="text" placeholder={HideConter(Decrypt(data.name))} readOnly></input>
                            <span><img src={require('../../images/right-icon.jpg')}></img></span>
                        </li>
                        <li className="flex-conter">
                            {/* <label>性别</label> */}
                            <div className="Picker">
                                <Picker
                                data={seasons}
                                cols={1}
                                title="性别"
                                value={this.state.sValue}
                                onChange={this.handSex.bind(this)}
                                onOk={this.handSex.bind(this)}
                                >
                                <List.Item arrow="horizontal">性别</List.Item>
                                </Picker>
                            </div>
                            {/* <input type="text" placeholder="请选择" readOnly></input> */}
                            {/* <span><img src={require('../../images/right-icon.jpg')}></img></span> */}
                        </li>
                        <li className="flex-conter" onClick={IshandLinkCertification}>
                            <label>身份证号</label>
                            <input type="text" placeholder={HideConter(Decrypt(data.card))} readOnly></input>
                            <span><img src={require('../../images/right-icon.jpg')} ></img></span>
                        </li>
                        <li className="flex-conter">
                            <label>手机号码</label>
                            <input type="text" placeholder="158****1251" readOnly></input>
                            <span><img src={require('../../images/right-icon.jpg')}></img></span>
                        </li>
                        <li className="flex-conter">
                            <div className="Picker">
                            <DatePicker
                            mode="date"
                            minDate= {minDate}
                            maxDate = {maxDate}
                            title="选择出生日期"
                            value={this.state.date}
                            onChange={this.handDate.bind(this)}
                            >
                            <List.Item arrow="horizontal">出生年月</List.Item>
                            </DatePicker>
                            </div>
                            {/* <label>出生年月</label>
                            <input type="text" placeholder="请选择" readOnly></input>
                            <span><img src={require('../../images/right-icon.jpg')}></img></span> */}
                        </li>
                    </ul>
                </div>
                <button className="info-btn" onClick={this.handEnd.bind(this)}>安全退出</button>
            </div>
        )
    }
}
export default withRouter(Myinfo)