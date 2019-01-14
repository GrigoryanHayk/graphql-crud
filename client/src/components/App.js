import React, { Component } from 'react';
import AuthService from "../services/Authservice";
import { Route, Redirect } from 'react-router'
import Dashboard from "./Dashboard";
import { Switch } from "react-router-dom";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { withRouter } from "react-router";

class App extends Component {
  render() {
      const isAuthorized = AuthService.getToken();

      return (
        <div>
            <Route exact path="/" render={() => (
                isAuthorized ? (
                    <Redirect to="/dashboard" />
                ) : (
                    <Redirect to="/login" />
                )
            )}/>
            <div >
                <Switch>
                    <Route exact path="/login" component={LoginForm} />
                    <Route exact path="/signup" component={SignupForm} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/dashboard/create" component={Dashboard} />
                    <Route exact path="/dashboard/update/:id" component={Dashboard} />
                    <Route exact path="/dashboard/post/:id" component={Dashboard} />
                </Switch>
            </div>
        </div>
    );
  }
}

export default withRouter(App);
