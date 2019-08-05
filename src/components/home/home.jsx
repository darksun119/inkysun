import React, { Component } from 'react';
import {Link,Switch,Route}   from 'react-router-dom';
import { Layout,Menu} from 'antd';
const {Sider,Content} = Layout;
import AllArticle from "@components/home/allArticles";
import Good from "@components/home/good";
import Ask from "@components/home/Ask";
import Share from "@components/home/share";
import Job from "@components/home/job";


export default class Home extends Component {
    constructor(){
        super();
        this.state={
            leftNav:[
                {
                    text:'全部',
                    url:'/index/all'
                },
                {
                    text:'精华',
                    url:'/index/good'
                },
                {
                    text:'问题',
                    url:'/index/ask'
                },
                {
                    text:'分享',
                    url:'/index/share'
                },
                {
                    text:'招聘',
                    url:'/index/job'
                },
            ]
        };
    }
    render(){
        return (
            <Layout className="MainContent">
                    <Content>
                        <Menu theme="light" className="leftNav">
                            { 
                                this.state.leftNav.map((item,i)=>(
                                    <Menu.Item key={item.url}>
                                        <Link to={item.url}>{item.text}</Link>
                                    </Menu.Item>
                                ))
                            }
                        </Menu> 
                        <Switch>
                            <Route path='/index/all'  exact component={ AllArticle } />   
                            <Route path='/index/good'  exact component={ Good } />   
                            <Route path='/index/ask'  exact component={ Ask } />   
                            <Route path='/index/share'  exact component={ Share } />   
                            <Route path='/index/job'  exact component={ Job } />   
                        </Switch>
                    </Content>
                </Layout>
        );
    }
}