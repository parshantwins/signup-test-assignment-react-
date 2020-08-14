import React, { Component } from 'react';
class Errors extends Component {
    state = {}
    openHome = () => {

        this.props.history.push('/login');
    }
    render() {
        return (<section className="innerPage" >
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="error-template">
                            <h1>
                                Oops!</h1>
                            <h2>
                                404 Not Found</h2>
                            <div className="error-details">
                                Sorry, an error has occured, Requested page not found!
                </div>
                            <div className="error-actions">
                                <button
                                    type="button"
                                    className="btn btn-primary btn-lg"
                                    onClick={() => this.openHome()}>
                                    <span className="fa fa-sign-in"></span> Back to Login
                    </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>);
    }
}

export default Errors;