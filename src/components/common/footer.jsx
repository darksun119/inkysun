import {Layout} from 'antd';
import React, { Component } from 'react';
const {Footer} =Layout;

export default class MainFooter extends Component{
    render(){
        return (<Footer className="commonFooter">
            inkysun 版权所有 Weber @2019
        </Footer>);
    }
}