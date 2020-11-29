import axios from 'axios';

import { ERRORS_GET, SUCCESS_GET } from './types';

import { errors_clear } from './errorActions';
import { success_clear } from './successActions';
import { alert_set } from './alertsActions';

// post a new bug report message
export const bug_report_post = (data) => dispatch => {

    dispatch (errors_clear ());
    dispatch (success_clear ());

    axios.post ('/api/common/bugreport', data,)
        .then (res => {
            console.log ("Success!");
            dispatch (alert_set ('Bug Report has been submitted!', 'success'));
            dispatch ({
                type: SUCCESS_GET,
                payload: {"success": "success"}
            });
        })
        .catch (err => 
            dispatch ({
                type: ERRORS_GET,
                payload: err.response.data
            }));

}