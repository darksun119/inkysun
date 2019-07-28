import React, { Component } from 'react';
import MainHeader from '@components/common/header';
import MainFooter from '@components/common/footer';
import { Layout} from 'antd'
export default class Home extends Component {
    render(){
        return (
            <div className="pageContainer">
                <MainHeader />
                <Layout.Content className="MainContent">
                    HomePage
                </Layout.Content>
                <MainFooter />
            </div>
        );
    }
}