import React, { Fragment, Component } from "react";
import TextValidator from '../../shared/components/ui/form/text-validator';
import { ValidatorForm } from 'react-form-validator-core';
import { apiService } from '../../services';
import Alert from 'react-bootstrap/Alert';
import logo from '../../assets/images/logo.png';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signupform: {
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                confirmPassword: '',
                emailVerified: false,
                loading: false,
                alertMessage: "",
                submitted: false,
                messageType: ""
            }
        };
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.signupform.password) {
                return false;
            }
            return true;
        });
        ValidatorForm.addValidationRule('passwordMinLength', (value) => {
            if (value.trim() !== "") {
                if (value.trim().length < 6) {
                    return false;
                }
            }
            return true;
        });
        ValidatorForm.addValidationRule('emailRegistered', async (value) => {
            const { signupform } = this.state;
            let valid = true;
            var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            if (!signupform.emailVerified && value.trim() !== "" && expr.test(value)) {
                valid = await this.verifyEmail(value);
            }

            this.setState({ signupform: { ...signupform, emailVerified: valid } });
            return valid;
        });
    }

    handleChange = (e) => {
        const { signupform } = this.state;
        const { name } = e.target;
        signupform[name] = e.target.value;

        if (name == "email") {
            this.setState({ signupform: { ...signupform, emailVerified: false } });
        } else {
            this.setState({ signupform });
        }
    }

    verifyEmail = async (email) => {
        const requestPayload = {
            "campaignUuid": "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
            "data": {
                "email": email,
            }
        }

        try {
            const response = await apiService.post('VERIFYEMAIL', requestPayload);
            return response.data.status == "OK";
        } catch (error) {
            return false;
        }
    }

    handleCloseAlert = (e) => {
        this.setState({ signupform: { ...this.state.signupform, alertMessage: "" } });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { signupform } = this.state;
        this.setState({ signupform: { ...this.state.signupform, loading: true } });
        let requestPayload = {
            "campaignUuid": "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
            "data": {
                "firstName": signupform.firstname,
                "lastName": signupform.lastname,
                "email": signupform.email,
                "password": signupform.confirmPassword
            }
        }

        apiService.post('SIGNUP', requestPayload).then(response => {
            if (response.data) {
                this.setState({ signupform: { ...this.state.signupform, messageType: "success", loading: false, email: "", password: "", confirmPassword: "", alertMessage: response.message } });
            } else {
                this.setState({ signupform: { ...this.state.signupform, messageType: "danger", loading: false, alertMessage: response.message } });
            }
        }, error => {
            this.setState(prevState => {
                this.setState({ signupform: { ...this.state.signupform, messageType: "danger", loading: false, alertMessage: error } });
            })
        }
        );
    }



    render() {
        const { signupform } = this.state;

        return (
            <Fragment>
                <section className="commonImage">
                    <div className="login">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 offset-md-12">
                                    <div className="loginSection">
                                        <div className="logo"><img src={logo} alt="image" title="logo" /></div>
                                        <div className="loginFormInner">
                                            <h1>Sign Up</h1>
                                            {
                                                signupform.alertMessage &&
                                                <Alert variant={signupform.messageType} onClose={() => this.handleCloseAlert(false)} dismissible>{signupform.alertMessage}</Alert>
                                            }
                                            <ValidatorForm
                                                onSubmit={(e) => this.handleSubmit(e)}
                                                className="form-horizontal">
                                                <div className="form-group loginField">
                                                    <i className="fa fa-user" aria-hidden="true"></i>
                                                    <TextValidator
                                                        onChange={(e) => this.handleChange(e)}
                                                        name="firstname"
                                                        type="text"
                                                        validators={['required']}
                                                        errorMessages={['First Name is Required.']}
                                                        value={signupform.firstname}
                                                        className="form-control"
                                                        placeholder="First Name"
                                                    />
                                                </div>
                                                <div className="form-group loginField">
                                                    <i className="fa fa-user" aria-hidden="true"></i>
                                                    <TextValidator
                                                        onChange={(e) => this.handleChange(e)}
                                                        name="lastname"
                                                        type="text"
                                                        validators={['required']}
                                                        errorMessages={['Last Name is Required.']}
                                                        value={signupform.lastname}
                                                        className="form-control"
                                                        placeholder="Last Name"
                                                    />
                                                </div>
                                                <div className="form-group loginField">
                                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                                    <TextValidator
                                                        onChange={(e) => this.handleChange(e)}
                                                        name="email"
                                                        type="text"
                                                        validators={['required', 'isEmail', 'emailRegistered']}
                                                        errorMessages={['Email is Required.', 'Email is not valid', 'Email is already registered.']}
                                                        value={signupform.email}
                                                        className="form-control"
                                                        placeholder="Email"
                                                    />
                                                </div>
                                                <div className="form-group loginField">
                                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                                    <TextValidator
                                                        onChange={(e) => this.handleChange(e)}
                                                        name="password"
                                                        type="password"
                                                        validators={['required', 'passwordMinLength']}
                                                        errorMessages={['Password is Required.', 'Password should be atleast 6 characters']}
                                                        value={signupform.password}
                                                        className="form-control"
                                                        placeholder="Password"
                                                    />
                                                </div>
                                                <div className="form-group loginField">
                                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                                    <TextValidator
                                                        onChange={(e) => this.handleChange(e)}
                                                        name="confirmPassword"
                                                        type="password"
                                                        validators={['required', 'isPasswordMatch']}
                                                        errorMessages={[' Confirm Password is Required.', 'Password Mismatch.']}
                                                        value={signupform.confirmPassword}
                                                        className="form-control"
                                                        placeholder="Confirm Password"
                                                    />
                                                </div>
                                                <div className="form-group col-md-12 offset-md-12">
                                                    <button className="btn btn-primary form-control" disabled={signupform.loading} >Create Account</button>
                                                </div>
                                            </ValidatorForm>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Fragment>
        );
    }
}