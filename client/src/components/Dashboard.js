import React, { Component } from 'react';
import Posts from './Posts';
import PostForm from './PostForm';
import { Switch, Route, Link } from 'react-router-dom';
import AuthService from "../services/Authservice";

import './../styles/dashboard.css';
import './../styles/form.css';

class Dashboard extends Component {
    signout() {
        AuthService.setToken('');
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <div className="dashboard-header">
                    <Link to="/dashboard" className="dashboard-header__link">Dashboard</Link>
                    <Link to="/dashboard/create" className="dashboard-header__link">Create Post</Link>

                    <div className="dashboard-header__signout">
                        <a className="dashboard-header__link--signout"
                           onClick={this.signout.bind(this)}>Sign out</a>

                    </div>
                </div>
                <div className="dashboard-content">
                    <Switch>
                        <Route exact path="/dashboard" component={Posts} />
                        <Route exact path="/dashboard/create" component={PostForm} />
                        <Route exact path="/dashboard/update/:id" component={PostForm} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default Dashboard;