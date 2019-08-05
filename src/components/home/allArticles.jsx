import React,{Component} from 'react';
import {List,Avatar } from 'antd';

 export default class AllArticle extends Component{
    constructor(){
        super();
        this.state={
        }
    }
    render(){
        return(
            <List
                className="articleList"
                size="large"
                bordered
                dataSource={this.state.data}
                renderItem={item => <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src="/"></Avatar>}
                        title={<h3>标题+{item}</h3>}
                        description={'标题'+item+'的摘要信息......'}
                    ></List.Item.Meta>
                </List.Item>}
            />)
    }
}