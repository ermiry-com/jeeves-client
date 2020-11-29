import { combineReducers } from 'redux';

import errorReducer from './errorReducer';
import successReducer from './successReducer';
import alertReducer from './alertsReducer';

import authReducer from './authReducer';

export default combineReducers ({

    errors: errorReducer,
    success: successReducer,
    alert: alertReducer,

    auth: authReducer,

});