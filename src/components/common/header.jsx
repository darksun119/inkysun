import React,{ Component } from 'react';
// const logo =require('../../images/tfans.jpg');
import {Layout,Col,Row} from 'antd'
export default class MainHeader extends Component{
    constructor(){
        super();
        this.state={
            log:{
                url:'/index',
                text:'Logo',
                // img:logo
            },
            navlist:[
                {
                    text:'首页',
                    url:'index'
                },
                {
                    text:'详情',
                    url:'details'
                },
                {
                    text:'关于',
                    url:'about'
                },
                {
                    text:'用户',
                    url:'user'
                },
                {
                    text:'管理',
                    url:'admin'
                },
            ]
        }
    };
    render(){
        return (
            <Layout.Header className='mainheader'>
                <Row>
                    <Col sm={20} md={4} ></Col>
                    <Col sm={0} md={20}>
                        {this.state.navlist.map((item,i) =>( <h2 key={i}>
                            <a href={item.url} >{item.text}</a>
                        </h2>))}
                    </Col>
                    <Col sm={4} md={0}></Col>
                </Row>
            </Layout.Header>
        );
    }
}