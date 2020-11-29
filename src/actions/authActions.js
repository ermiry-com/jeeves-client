import axios from 'axios';
import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode';

import { SET_CURRENT_USER } from './types';

import { alert_set } from './alertsActions';

const cookies = new Cookies ();

// set logged user
const user_set_current = (decoded) => {

    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }

}

// log user out
export const user_logout = () => dispatch => {

    // const cookies = new Cookies ();
    // localStorage.removeItem ('jwtToken');
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