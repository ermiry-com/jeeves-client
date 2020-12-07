import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Alert from '../common/Alert';

// my actions
import { user_logout } from '../../actions/authActions';

class Navbar extends Component {

    onLogOutClick (e) {

        e.preventDefault ();
        this.props.user_logout ();

    }

    render () {
        let { isAuthenticated } = this.props.auth;

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown">
                    <a className="navbar-brand dropdown-toggle text-white" 
                    data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false" target="_top">
                        My Account
                    </a>
                    <div className="dropdown-menu dropdown-menu-right main-red-background">
                        <a className="font-20px dropdown-item text-white" 
                            href={process.env.NODE_ENV === "production" ? 
                            "https://ermiry.com/profile" : "http://localhost.com/profile"}>
                            Profile <i class="fas fa-user float-right"></i>
                        </a>

                        <a className="font-20px dropdown-item text-white" 
                            href={process.env.NODE_ENV === "production" ? 
                            "https://ermiry.com/dashboard" : "http://localhost.com/dashboard"}>
                            Dashboard <i class="fas fa-home float-right"></i>
                        </a>

                        <a className="font-20px dropdown-item text-white" 
                            href={process.env.NODE_ENV === "production" ? 
                            "https://ermiry.com/settings" : "http://localhost.com/settings"}>
                            Settings <i class="fas fa-cog float-right"></i>
                        </a>

                        <div className="dropdown-divider"></div>
                        <div className="nav-item">
                            <a className="font-20px dropdown-item text-white"
                                href={process.env.NODE_ENV === "production" ? 
                                "https://ermiry.com/settings" : "http://localhost.com/settings"} 
                                onClick={ this.onLogOutClick.bind (this) }>
                                Logout <i class="fas fa-sign-out-alt float-right"></i>
                            </a>
                        </div>
                    </div>
                </li>

                <li className="nav-item">
                    <a className="navbar-brand text-white" 
                        href={process.env.NODE_ENV === "production" ? 
                        "https://ermiry.com" : "http://localhost.com"}>Back to Ermiry
                    </a>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a className="navbar-brand text-white" target="_top" 
                        href={process.env.NODE_ENV === "production" ? 
                        "https://ermiry.com/register" : "http://localhost.com/register"}>Sign Up</a>
                </li>
                <li className="nav-item">
                    <a className="navbar-brand text-white" target="_top" 
                    href={process.env.NODE_ENV === "production" ? 
                    "https://ermiry.com/login" : "http://localhost.com/login"}>Login</a>
                </li>

                <li className="nav-item">
                    <a className="navbar-brand text-white" target="_top" 
                        href={process.env.NODE_ENV === "production" ? 
                        "https://ermiry.com" : "http://localhost.com"}>Back to Ermiry</a>
                </li>
            </ul>
        );

        return (
        <div className="sticky-top">
            <nav className="navbar navbar-expand-lg navbar-dark main-blue-background">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Jeeves</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                
                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="navbar-brand text-white" href="/jobs" target="_top">Jobs</a>
                            </li>
                        </ul>

                        { isAuthenticated ? authLinks : guestLinks }
                    </div>
                </div>
          </nav>

          <Alert />
        </div>
        );
    }

}

Navbar.propTypes = {
    user_logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
  
const mapStateToProps = state => ({
    auth: state.auth
});
  
export default connect (mapStateToProps, { user_logout }) (
    Navbar
);