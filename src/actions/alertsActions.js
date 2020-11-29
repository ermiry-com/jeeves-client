import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const alert_set = (msg, alert_type, timeout = 5000) => dispatch => {

    const id = uuid.v4 ();
    dispatch ({
        type: SET_ALERT,
        payload: { msg, alert_type, id }
    });

    setTimeout (() => dispatch ({ type: REMOVE_ALERT, payload: id }), timeout);
    
};