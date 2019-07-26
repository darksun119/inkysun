import React, { Component } from 'react';
import MainHeader from '@components/common/header';
export default class Admin extends Component {
    render(){
        return (
            <div className="pageContainer">
                <MainHeader />
                Admin
            </div>
        );
    }
}