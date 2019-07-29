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
                    <Route path="/"  exact render={ ()=><Redirect to='/index/all' /> } />
                    <Route path="/index/:child"  exact component={Index} />
                    <Route path="/about"  exact component={About} />
                    <Route path="/admin"  exact component={Admin} />
                    <Route path="/user"  exact component={User} />
                    <Route path="/details"  exact component={Details} />
                </Switch>
            </BrowserRouter>
            
        );
    }
}