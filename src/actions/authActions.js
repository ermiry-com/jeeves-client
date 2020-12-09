import axios from 'axios';
import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode';

import { SET_CURRENT_USER, ERRORS_GET, SUCCESS_GET } from './types';

import { errors_clear } from './errorActions';
import { success_clear } from './successActions';
import { alert_set } from './alertsActions';

const cookies = new Cookies ();

// register a new user
export const user_register = (userData, history) => dispatch => {

    dispatch (errors_clear ());

    // make the request to the server
    axios.post ('/api/users/register', userData)
        .then (res => {
            history.push ('/login');
            dispatch (alert_set ('Your account has been created!', 'success', 10000));
        })
        .catch (err =>
            dispatch ({
                type: ERRORS_GET,
                payload: err.response.data
            }));

}

export const user_login = (userData) => dispatch => {

    dispatch (errors_clear ());

    axios.post ('/api/users/login', userData)
        .then (res => {
            let { token } = res.data;

            // console.log(token);

            // const cookies = new Cookies ();
            process.env.NODE_ENV === "production" ?
                cookies.set ('ermiry-jwt', token, {
                    path: "/", 
                    domain: ".ermiry.com", 
                    secure: true}) :
                cookies.set ('ermiry-jwt', token, {
                    path: "/", 
                    domain: ".localhost.com", 
                    // maxAge: 1800,
                    });
            
            auth_token_set (token);             // set token to auth header
            let decoded = jwt_decode (token);   // decode token to get user data
            dispatch (user_set_current (decoded));  // set current user

            dispatch (alert_set (`Welcome back ${decoded.username}!`, 'success'));
        })
        .catch (err =>
            dispatch ({
                type: ERRORS_GET,
                payload: err.response.data
            }));

};

// set logged user
export const user_set_current = (decoded) => {

    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }

}

// log user out
export const user_logout = () => dispatch => {

    // const cookies = new Cookies ();
    process.env.NODE_ENV === "production" ?
        cookies.remove ('ermiry-jwt', {
            path: "/", 
            domain: ".ermiry.com"}) :
        cookies.remove ('ermiry-jwt', {
            path: "/", 
            domain: ".localhost.com"});
    
    // remove auth header for future requests
    auth_token_set (null);
    dispatch (user_set_current ({}));
    dispatch (alert_set ('You have logged out!', 'success'));

};

// check for user token
export const user_token_check = (store) => {

    // const cookies = new Cookies ();
    let jwt = cookies.get ("ermiry-jwt");

    // localStorage.jwtToken
    if (jwt) {
        // decode token and get user info
        // let decoded = jwt_decode (localStorage.jwtToken);
        // check for expired token
        let decoded = jwt_decode (jwt);
        let currentTime = Date.now () / 1000;
        if (decoded.exp < currentTime) {
            // logout the user
            store.dispatch (user_logout ());
    
            // redirect to the landing page
            window.location.href = '/';
        }

        else {
            auth_token_set (jwt);           // set auth token header auth
            store.dispatch (user_set_current (decoded));
        }
    }

}

// set auth token for each request
const auth_token_set = token => {

	// Apply to every request
	if (token) axios.defaults.headers.common['Authorization'] = token;
	else delete axios.defaults.headers.common['Authorization'];
	
};