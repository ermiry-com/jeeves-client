import { ERRORS_CLEAR, ERRORS_GET } from '../actions/types';

let initialState = {};

export default function (state = initialState, action) {

    switch (action.type) {
        case ERRORS_CLEAR: return {};

        case ERRORS_GET: return action.payload;

        default: return state;
    }

}