import React from 'react';
const Page404 = () =>{
    return(
        <div className="err-box-404 tran-conter">
            <img alt="" src={require('../../images/404.jpg')}></img>
            <h3>404</h3>
            <p>页面不知道去哪儿了</p>
            <div><i>5s</i> 后带您回 <span>首页</span></div>
        </div>
    )
}
export default class ErrIndex extends React.Component{
    constructor(props){
        super(props)
        document.body.style.background = "#fff";
    }
    render(){
       const id = parseInt(this.props.match.params.id,10);
       let comContent = null
        if(id===1){
            comContent =  <Page404></Page404>
        }
        return(
            <div className="err">
            {comContent}
            </div>
        )
    }
}