import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { history } from "../../helpers/history";
import PrivateRoute from '../components/functional/PrivateRoute';
import * as actions from '../../store/actions';


import appRoutes from '../../routes/app.routes';
import { bindActionCreators } from 'redux';

class AppLayout extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        history.listen((location, action) => {
            this.setState({ showMenu: false });
            window.scrollTo(0, 0);
        });
    }

    render() {
        const { auth } = this.props;
        console.log(process.env.REACT_APP_PUBLIC_URL)
        return (
            <Fragment>
                <Router history={history} basename={process.env.REACT_APP_PUBLIC_URL}  >
                    <main id="main">
                        <Switch>
                            {
                                appRoutes.map((prop, key) => {
                                    if (prop.redirect)
                                        return <Redirect from={prop.path} to={prop.to} key={key} />;

                                    return (
                                        prop.auth ?
                                            <PrivateRoute {...prop} key={key} />
                                            : <Route {...prop} key={key} />
                                    );
                                })
                            }
                        </Switch>
                    </main>
                </Router>
            </Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            logout: bindActionCreators(
                actions.logout,
                dispatch
            )
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);
// export default AppLayout;