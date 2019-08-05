import ReactDOM from 'react-dom';
import React ,{Component} from 'react';
import { Switch,HashRouter,Route,Redirect } from 'react-router-dom';
import Index from '@components/home/home';
import About from '@components/about/about';
import Admin from '@components/admin/admin';
import User from '@components/user/user';
import Details from '@components/details/details';
import '@style/app.less';
import MainHeader from '@components/common/header';
import MainFooter from '@components/common/footer';
import { Layout } from 'antd';

class Routers extends Component{
    render(){
        return(
            <HashRouter>
                <Layout className="pageContainer">
                    <MainHeader />
                    <Switch>
                        <Route path="/" exact render={ ()=><Redirect to='/index/all' /> } />
                        <Route path="/index" exact render={ ()=><Redirect to='/index/all' /> } />
                        <Route path="/index/:child"  exact component={Index} />
                        <Route path="/about"   component={About} />
                        <Route path="/admin"   component={Admin} />
                        <Route path="/user"   component={User} />
                        <Route path="/details"   component={Details} />
                    </Switch>
                    <MainFooter />
                </Layout>
            </HashRouter>
            
        );
    }
}

ReactDOM.render(
    <Routers />,
    document.getElementById('root')
);