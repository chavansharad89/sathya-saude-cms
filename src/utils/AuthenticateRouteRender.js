import React from 'react';
import { isAuthenticated } from './Authentication';
import { Redirect } from 'react-router-dom';

export default function authenticateRouteRender(Component, props) {
    return isAuthenticated() ? <Component {...props} /> : <Component {...props} />; //<Redirect to='/login' />; 
}