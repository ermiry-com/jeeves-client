import { v4 as uuidv4 } from 'uuid';

import { SET_ALERT, REMOVE_ALERT } from './types';

export const alert_set = (msg, alert_type, timeout = 5000) => dispatch => {

    const id = uuidv4.v4 ();
    dispatch ({
        type: SET_ALERT,
        payload: { msg, alert_type, id }
    });

    setTimeout (() => dispatch ({ type: REMOVE_ALERT, payload: id }), timeout);
    
};