import axios from 'axios';

import {
	ERRORS_GET,
    ERRORS_CLEAR,

	JOB_LOADING,
	JOBS_GET,
    JOB_GET,
    JOB_INFO,
} from './types';

import {alert_set} from './alertsActions';

// get all jobs for current job
export const jobs_get_all = () => (dispatch) => {

    dispatch (jobs_set_loading ());
    axios.get ('/api/jeeves/jobs')
        .then (res => {
            dispatch ({
                type: JOBS_GET,
                payload: res.data.jobs
            })
        })
        .catch (err => {
            if (err.response !== undefined) {
                dispatch ({
                    type: ERRORS_GET,
                    payload: err.response.data
                });
            }
            
            else{
                dispatch({
                    type: ERRORS_GET,
                    payload: err.message
                });
            }
        });

};

export const jobs_create  = (payload) => dispatch => {
    
    dispatch (jobs_set_loading ());
    axios.post("/api/jeeves/jobs", {
        "name": payload.name,
        "description": payload.description,
    }).then(() => {
        dispatch(jobs_get_all());
    }).catch(err => {
        console.error(err.response.data);
        dispatch(alert_set ("Fail on job creation, please retry", 'danger'));
    })
}

export const job_update_type = (payload) => dispatch => {
    dispatch(jobs_set_loading());
    console.log(payload);
    axios.post(`/api/jeeves/jobs/${payload.id}/config`, {
        type: payload.type
    }).then((res) => {
        // dispatch(job_get_by_id(payload.id));
    }).catch(err => {
        dispatch ({
            type: JOB_GET,
            payload: null
        });
    })
}

// get single job info by its id
export const job_get_by_id = id => dispatch => {

    dispatch (jobs_set_loading ());
    axios.get (`/api/jeeves/jobs/${id}/info`)
        .then (res => {
            dispatch ({
                type: JOB_GET,
                payload: res.data
            });
        })
        .catch (err => {
            dispatch ({
                type: JOB_GET,
                payload: null
            });
        });

}

export const jobs_set_loading = () => {
    return { type: JOB_LOADING };
};