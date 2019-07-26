import React, { Component } from "react";
import { Switch,BrowserRouter,Route,Redirect } from 'react-router-dom';
import Index from '@components/home/home';
import About from '@components/about/about';
import Admin from '@components/admin/admin';
import User from '@components/user/user';
import Details from '@components/details/details';


export default class RouterIndex extends Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact render={ ()=> (<Redirect to="/index" />)} />
                    <Route path="/index" component={Index} />
                    <Route path="/about" component={About} />
                    <Route path="/admin" component={Admin} />
                    <Route path="/user" component={User} />
                    <Route path="/details" component={Details} />
                </Switch>
            </BrowserRouter>
            
        );
    }
}