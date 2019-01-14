import React, { Component } from 'react';
import './../styles/auth.css';
import './../styles/form.css';
import { Mutation } from "react-apollo";
import { SIGN_UP_MUTATION } from "../gql-queries";
import AuthService from './../services/Authservice';
import { Link } from "react-router-dom";

class SignupForm extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        errorMessage: ''
    };

    emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    handleSignup(callback) {
        if (this.isValidForm()) {
            callback();
        }
    }

    isValidForm() {
        const { firstName, lastName, email, password, confirmPassword } = this.state;
        const isValidEmail = this.emailRegexp.test(email);

        if (!firstName.length || !lastName.length || !email.length || !password.length || !confirmPassword.length) {
            this.setState({
                errorMessage: 'Please fill all fields.'
            })
        } else if (!isValidEmail) {
            this.setState({
                errorMessage: 'Please type a valid email.'
            });
        } else if (password !== confirmPassword) {
            this.setState({
                errorMessage: 'The password and confirmPassword fields are not equal.'
            })
        } else {
            return true;
        }

        return false;
    }

    signup(data) {
        const { signup } = data;

        if (signup.token) {
            AuthService.setToken(signup.token);

            this.props.history.push('/dashboard');
        }
    }

    handleError(error) {
        const message = error.message;

        this.setState({
            errorMessage: message
        });
    }

    render() {
        return (
            <div className="auth-form">
                <h2 className="form-header">Sign Up</h2>

                <div className="auth-form__error-bar">
                    <p>{ this.state.errorMessage }</p>
                </div>

                <div className="auth-form__content">
                    <div>
                        <div className="form-group">
                            <label htmlFor="firstNameID">First Name:</label>
                            <input id="firstNameID"
                                   type="text"
                                   value={this.state.firstName}
                                   onChange={(e) => this.setState({firstName: e.target.value})}
                                   placeholder="e.g John"
                                   className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastNameID">Last Name:</label>
                            <input id="lastNameID"
                                   type="text"
                                   value={this.state.lastName}
                                   onChange={(e) => this.setState({lastName: e.target.value})}
                                   placeholder="e.g Doe"
                                   className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="emailID">Email:</label>
                            <input id="emailID"
                                   type="text"
                                   value={this.state.email}
                                   onChange={(e) => this.setState({email: e.target.value})}
                                   placeholder="e.g yourname@yourdomain.com"
                                   className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="passwordId">Password:</label>
                            <input id="passwordId"
                                   type="password"
                                   value={this.state.password}
                                   onChange={(e) => this.setState({password: e.target.value})}
                                   placeholder="Type password here"
                                   className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPasswordId">Confirm Password:</label>
                            <input id="confirmPasswordId"
                                   type="password"
                                   value={this.state.confirmPassword}
                                   onChange={(e) => this.setState({confirmPassword: e.target.value})}
                                   placeholder="Type confirm password here"
                                   className="form-control" />
                        </div>

                        <div className="auth-form__link">
                            <Link to="/login">Already have an account?</Link>
                        </div>

                        <Mutation mutation={SIGN_UP_MUTATION}
                                  variables={{
                                      firstName: this.state.firstName,
                                      lastName: this.state.lastName,
                                      email: this.state.email,
                                      password: this.state.password,
                                      confirmPassword: this.state.confirmPassword }}
                                  onError={error => this.handleError(error)}
                                  onCompleted={data => this.signup(data)}
                        >
                            {postMutation => <button className="form-control__buttons" onClick={() => this.handleSignup(postMutation)}>Sign Up</button>}
                        </Mutation>
                    </div>
                </div>
            </div>
        );
    }
}
export default SignupForm;
