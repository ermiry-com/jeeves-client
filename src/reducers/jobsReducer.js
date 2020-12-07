import {
	JOB_LOADING,
	JOBS_GET,
	JOB_GET,
	JOB_ADMIN_ADD,
	JOB_UPDATE,
} from '../actions/types';

const initialState = {
	job: null,
	jobs: null,
	loading: false
};

export default function (state = initialState, action) {

	switch (action.type) {
		
		case JOB_LOADING:
			return {
				...state,
				loading: true
			};
		case JOBS_GET:
			return {
				...state,
				JOBs: action.payload,
				loading: false
			};
		case JOB_UPDATE:
			return {
				...state,
				loading: false
			}
		case JOB_GET:
			return {
				...state,
				JOB: action.payload,
				loading: false
			}
		
		default: return state;
	}

}