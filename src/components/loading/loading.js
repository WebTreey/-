import React from 'react'
export const Loading = () =>{
    return(
        <div style={{
            position:"fixed",
            top:'50%',
            left:'50%',
            transform:'translate(-50%,-50%)',
            height:'1.5rem',
            width:'2.5rem',
            borderRadius:'.1rem',
            background:'rgba(0,0,0,0.75)',
            display:'flex',
            justifyContent:'center',
            alignContent:'center',
            alignItems:'center',
            flexDirection:'column',
            color:'#fff'
        }}>
        <img src={require('../../images/loding1.gif')} style={{width:'.6rem',height:'.6rem'}}></img>
        <span>数据加载中...</span>
        </div>
    )
}
