import React, { Component } from 'react';import Home from './screens/Home';
import Login from'./screens/Login';
import ForgetPassword from'./screens/ForgetPassword'
import Dashboard from './screens/Dashboard';
import ResetPassword from './screens/ResetPassword'
import AuthenticateRouteRender from './utils/AuthenticateRouteRender'
import ChangePassword from './screens/ChangePassword'
import { Route,Switch } from 'react-router-dom';

export default class Main extends Component {
    render() {
        return( 
            <Switch>  
                 <Route path = "/" render={_ => {
                        return AuthenticateRouteRender(Home);
                    }} exact />
                <Route path = "/menus/:menuId/sub-menu/:subMenuId"  render={props => {
                    return AuthenticateRouteRender(Dashboard ,props);
                }} />
                {/* <Route path = "/" render={_ => {
                        return AuthenticateRouteRender(Home);
                    }} exact />
                <Route path = "/menus/:menuId/sub-menu/:subMenuId"  render={props => {
                    return AuthenticateRouteRender(Dashboard ,props);
                }} /> */}
                <Route path = "/login" component ={Login} exact />
                <Route path = "/password/reset/:code" component ={ResetPassword} exact />
                <Route path = "/forget-password" component ={ForgetPassword} exact />
                <Route path = "/change-password" component ={ChangePassword} exact />
                
            </Switch>      
        );
    }
}   