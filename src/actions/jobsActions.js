import axios from 'axios';

import {
	ERRORS_GET,
    ERRORS_CLEAR,
    JOB_UPDATE,
    JOB_UPDATE_TYPE,
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
        dispatch(alert_set ("Failed to create a job, please retry", 'danger'));
    })
}

export const job_update_type = (payload) => dispatch => {
    axios.post(`/api/jeeves/jobs/${payload.id}/config`, {
        type: payload.type
    }).then((res) => {
        dispatch({
            type: JOB_UPDATE,
            payload: payload.type
        })
        // dispatch(job_get_by_id(payload.id));
    }).catch(err => {
        dispatch ({
            type: JOB_GET,
            payload: null
        });
    })
}

export const job_upload = (payload) => dispatch => {
    let formData = new FormData();
    payload.files.forEach((f,i) => {
        formData.append(`f-${i}`, f[0], f[0].name);
    }) 
    dispatch(jobs_set_loading());
    axios.post(`/api/jeeves/jobs/${payload.id}/upload`, formData)
    .then(() => {
        window.location.href = "/jobs";
        dispatch({
            type: JOB_GET,
            payload: null
        })
    }).catch(err => {
        console.error(err);
        dispatch({
            type: JOB_GET,
            payload: null
        })
        dispatch(alert_set ("Failed to upload photos, retry later", 'danger'));
    });
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

export const job_start = id => dispatch => {
    dispatch(jobs_set_loading)
    axios.get(`/api/jeeves/jobs/${id}/start`)
    .then(res => {
        window.location.href = "/jobs";
    }).catch(err => {
        console.error(err);
        dispatch({
            type: JOB_GET,
            payload: null
        });
        dispatch(alert_set ("Failed to start job, retry later", 'danger'));
    })
}

export const jobs_set_loading = () => {
    return { type: JOB_LOADING };
};