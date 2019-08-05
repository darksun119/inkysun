import React,{ Component } from 'react';
import logo from '@images/tfans.jpg';
import { Link } from 'react-router-dom';
import {Layout,Col,Row,Menu,Dropdown,Button,Icon } from 'antd';
const {Header} = Layout;
const DropdownList=navlist=>{
     return(<Menu className="topNav">
                {navlist.map((item,i) =>( 
                    <Menu.Item key={item.url}>
                            <Link to={item.url}>{item.text}</Link>
                    </Menu.Item>))
                } 
            </Menu>);
}
export default class MainHeader extends Component{
    constructor(){
        super();
        this.state={
            selectedKey:'',
            logo:{
                url:'/index/all',
                text:'Logo',
                src:''
            },
            navlist:[
                {
                    text:'首页',
                    url:'/index/all',
                    icon:'home'
                },
                {
                    text:'关于',
                    url:'/about',
                    icon:'about'
                },
                {
                    text:'用户',
                    url:'/user',
                    icon:'user'
                },
                {
                    text:'管理',
                    url:'/admin',
                    icon:'admin'
                },
            ]
        }
    };
    static getDerivedStateFromProps(props, state){
        console.log(props,state)
        if(props.match){
            this.setState({
                selectedKey:this.props.match.path
            })
        }
        return null;
    }
    render(){
        return (
            <Header className='mainheader'>
                <Row className="headerRow">
                    <Col xs={18} sm={20} md={4} >
                        <a href={this.state.logo.url}>
                            <img src={this.state.logo.src} alt={this.state.logo.text} className="logo"/>
                        </a>
                    </Col>
                    <Col xs={0} sm={0} md={20}>
                        <Menu className="navList" theme="light" mode="horizontal" >
                            {this.state.navlist.map((item,i) =>(
                            <Menu.Item key={item.url} >
                                <Link to={item.url} >
                                    <Icon type={item.icon}></Icon>
                                    {item.text}
                                </Link>
                            </Menu.Item>))}
                        </Menu>
                    </Col>
                    <Col xs={6} sm={4} md={0} className="dropdownDiv">
                        <Dropdown overlay={DropdownList(this.state.navlist)} placement="bottomCenter" trigger={["click","touchend"]} >
                            <Button ><Icon type="menu"></Icon></Button>
                        </Dropdown>
                    </Col>
                </Row>
            </Header>
        );
    }
}