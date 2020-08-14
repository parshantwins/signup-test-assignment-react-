import React from 'react';
import { connect } from "react-redux";
import { Route, Redirect } from 'react-router-dom';

import { APP_URLS } from '../../../config/constants.config';
import { localStorageService } from '../../../services';

const PrivateRoute = ({ Component, path, auth, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            localStorageService.isAuthenticated
                ? <Component {...props} auth={auth} />
                : <Redirect to={{ pathname: APP_URLS.loginUrl, state: { from: props.location } }} />
        )} />
    );
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}


export default connect(mapStateToProps, null)(PrivateRoute);