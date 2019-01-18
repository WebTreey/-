import React from 'react';

export default class Title extends React.Component{
    constructor(props){
        super(props);
    }
    handImgClick(){
        this.props.history.go(-1)
    }
    render(){
        return(
            <div className="title"  style={{
                height:'.88rem', 
                lineHeight:'.88rem',
                background:'#fff',
                width:'100%',
                position:'fixed',
                top:'0',
                left:'0',
                zIndex:10
                }}>
                <img onClick={this.handImgClick.bind(this)} src={require('../../images/left-icon.jpg')} style={{
                    float:"left",
                    width:'.21rem',
                    position:'absolute',
                    top:'.23rem',
                    left:'.5rem'
                }}></img>
                <h3 className="titleh3" style={{
                    fontWeight:'normal',
                    fontSize:'.40rem',
                    fontFamily:'宋体',
                    textAlign:'center'
                }}>{this.props.text}</h3>
            </div>
        )
    }
}