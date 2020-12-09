import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import sha256 from 'crypto-js/sha256';

// my actions
import { user_login } from '../../actions/authActions';

// my components 
import Navbar from '../main/Navbar';
import Footer from '../main/Footer';
import TextField from '../input/TextField';

import isEmpty from '../../utils/isEmpty';

class Login extends Component {

    constructor () {
        super ();
        this.state = {
            email: '',
            password: '',

            errors: {}
        }

        this.onChange = this.onChange.bind (this);
        this.onSubmit = this.onSubmit.bind (this);
    }

    componentDidMount () {
        if (this.props.auth.isAuthenticated)
            this.props.history.push ('/dashboard');
    }

    componentWillReceiveProps (nextProps) {
        // if (nextProps.auth.isAuthenticated) this.props.history.push ('/dashboard');
        if (nextProps.auth.isAuthenticated) this.props.history.push ('/');
        if (nextProps.errors) this.setState({ errors: nextProps.errors });
    }

    onChange (e) { this.setState ({ [e.target.name]: e.target.value }); }

    onSubmit (e) {
        e.preventDefault ();

        let password_hash = isEmpty (this.state.password) ? '' : sha256 (this.state.password).toString ();

        let user_data = {
            email: this.state.email,
            password: password_hash
        };

        this.props.user_login (user_data);
    }

    render () {
        let { errors } = this.state;

        return (
        <div>
            <Navbar />
            
            <div className="register-area d-flex">
                <div className="register-content-wrapper d-flex align-items-center">
                    <div className="register-content">
                        <h1 className="main-blue">Good to see you back!</h1>
                        <hr></hr>
                        <p>Don't have an account? <Link className="main-blue" to="/register" target="_top">Sign Up!</Link></p>

                        <div className="register-form">
                            <form noValidate onSubmit={ this.onSubmit }>
                                <TextField 
                                    icon="fas fa-at"
                                    placeholder="Email"
                                    name="email"
                                    type="email"
                                    value={ this.state.email }
                                    onChange={ this.onChange }
                                    error={ errors.email }
                                />
                                <TextField 
                                    icon="fas fa-lock"
                                    placeholder="Password"
                                    name="password"
                                    type="password"
                                    value={ this.state.password }
                                    onChange={ this.onChange }
                                    error={ errors.password }
                                />

                                <button type="submit" className="m-btn m-btn-theme m-btn-radius btn-lg w-100"><i className="fas fa-sign-in-alt"></i> Login</button>
                                
                                <Link className="forgot-password" to="/forgot" target="_top">Forgot Password?</Link>
                            </form>
                        </div>
                    </div>
                    
                </div>

                <div className="register-side-content bg-img login-bg"></div> 
            </div>

            <Footer />
        </div>
        );
    }

}

Login.propTypes = {
    user_login: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
  
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
  
export default connect (mapStateToProps, { user_login }) (Login);