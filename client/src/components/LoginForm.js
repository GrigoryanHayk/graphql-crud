import React, { Component } from 'react';
import './../styles/auth.css';
import './../styles/form.css';
import { Mutation } from "react-apollo";
import { LOGIN_MUTATION } from "../gql-queries";
import AuthService from './../services/Authservice';
import { Link } from "react-router-dom";

class LoginForm extends Component {
    state = {
        email: '',
        password: '',
        errorMessage: ''
    };

    emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    login(data) {
        console.log(data);
        if (data) {
            const { login } = data;

            if (login.token) {
                AuthService.setToken(login.token);

                this.props.history.push('/dashboard');
            }
        }
    }

    handleLogin(callback) {
        if (this.isValidForm()) {
            callback();
        }
    }

    isValidForm() {
        const { email, password } = this.state;
        const isValidEmail = this.emailRegexp.test(email),
              isValidPassword = password.length;

        if (!isValidEmail) {
            this.setState({
                errorMessage: 'Please type a valid email.'
            });
        } else if (!isValidPassword) {
            this.setState({
                errorMessage: 'The password field must not be empty.'
            });
        } else {
            return true;
        }

        return false;
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
                <h2 className="form-header">Login</h2>

                <div className="auth-form__error-bar">
                    <p>{ this.state.errorMessage }</p>
                </div>

                <div className="auth-form__content">
                    <div>
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

                        <div className="auth-form__link">
                            <Link to="/signup">Don't have an account yet?</Link>
                        </div>

                        <Mutation mutation={LOGIN_MUTATION}
                                  variables={{email: this.state.email, password: this.state.password}}
                                  onError={error =>  this.handleError(error)}
                                  onCompleted={data => this.login(data)}
                        >
                            {postMutation => <button className="form-control__buttons" onClick={() => this.handleLogin(postMutation)}>Login</button>}
                        </Mutation>
                    </div>
                </div>
            </div>
        );
    }
}
export default LoginForm;
