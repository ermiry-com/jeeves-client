import {
	JOB_LOADING,
	JOBS_GET,
	JOB_GET,
	JOB_UPDATE_TYPE,
	JOB_ADMIN_ADD,
	JOB_UPDATE,
	JOB_UPLOAD,
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
		case JOB_UPLOAD: 
			return {
				...state,
				loading: false
			};
		case JOBS_GET:
			return {
				...state,
				jobs: action.payload,
				loading: false
			};
		case JOB_UPDATE:
			return {
				...state,
				loading: false
			};
		case JOB_UPDATE_TYPE: 
			return {
				...state,
				[state.job.type]: action.payload
			}
		case JOB_GET:
			return {
				...state,
				job: action.payload,
				loading: false
			}
		
		default: return state;
	}

}