import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const SecureRoute = ({component: Component, isAuthenticated, ...rest}) => (
    <Route
        {...rest}
        render={props => (
            isAuthenticated
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/auth',
                    state: {from: props.location.pathname}
                }}/>
        )}
    />
);

export default SecureRoute;