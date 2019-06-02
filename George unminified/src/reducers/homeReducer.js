import { GET_HOMESEER, SET_ORDER, HOME_LOADING, GET_DEFAULT_VIEW, SET_VIEW, SET_HOMESEER } from '../actions/types';

const initialState = {
    devices: [],
    defaultView: [],
    view: 0,
    loading: false,
    order: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_HOMESEER:
            return {
                ...state,
                devices: action.payload,
                loading: false
            };
        case SET_HOMESEER:
            return {
                ...state,
                devices: action.payload,
                loading: false
            };
        case GET_DEFAULT_VIEW:
            return {
                ...state,
                defaultView: action.payload,
                loading: false
            };
        case SET_VIEW:
            return {
                ...state,
                view: action.payload
            }
        case HOME_LOADING:
            return {
                ...state,
                loading: true
            };
        case SET_ORDER:
            return {
                ...state,
                order: action.payload
            }
        default:
            return state;
    }
}
