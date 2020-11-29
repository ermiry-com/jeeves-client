import { SUCCESS_CLEAR, SUCCESS_GET } from '../actions/types';

let initialState = {};

export default function (state = initialState, action) {

    switch (action.type) {
        case SUCCESS_CLEAR: return {};

        case SUCCESS_GET: return action.payload;

        default: return state;
    }

}