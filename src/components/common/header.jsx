import React,{ Component } from 'react';
import logo from '@images/tfans.jpg';
import { Link } from 'react-router-dom';
import {Layout,Col,Row,Menu,Dropdown,Button,Icon } from 'antd';
const DropdownList=navlist=>{
     return(<Menu>
                {navlist.map((item,i) =>( 
                    <Menu.Item key={i}>
                            <Link to={item.url}>{item.text}</Link>
                    </Menu.Item>))
                } 
            </Menu>);
}
export default class MainHeader extends Component{
    constructor(){
        super();
        this.state={
            logo:{
                url:'/index',
                text:'Logo',
                src:''
            },
            navlist:[
                {
                    text:'首页',
                    url:'index',
                    icon:'home'
                },
                {
                    text:'详情',
                    url:'details',
                    icon:'details'
                },
                {
                    text:'关于',
                    url:'about',
                    icon:'about'
                },
                {
                    text:'用户',
                    url:'user',
                    icon:'user'
                },
                {
                    text:'管理',
                    url:'admin',
                    icon:'admin'
                },
            ]
        }
    };
    render(){
        return (
            <Layout.Header className='mainheader'>
                <Row className="headerRow">
                    <Col sm={20} md={4} >
                        <a href={this.state.logo.url}>
                            <img src={this.state.logo.src} alt={this.state.logo.text} className="logo"/>
                        </a>
                    </Col>
                    <Col sm={0} md={20}>
                        <Menu className="navList" theme="light" mode="horizontal">
                            {this.state.navlist.map((item,i) =>(
                            <Menu.Item key={i} className="navItem">
                                <Link to={item.url} >
                                    <Icon type={item.icon}></Icon>
                                    {item.text}
                                </Link>
                            </Menu.Item>))}
                        </Menu>
                    </Col>
                    <Col sm={4} md={0} className="dropdownDiv">
                        <Dropdown overlay={DropdownList(this.state.navlist)} placement="bottomCenter" trigger={["click","touchend"]} >
                            <Button ><Icon type="menu"></Icon></Button>
                        </Dropdown>
                    </Col>
                </Row>
            </Layout.Header>
        );
    }
}