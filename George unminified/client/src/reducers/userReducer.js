import { USER_IS_LOGGED_IN, SET_USER_ORDER } from '../actions/types';

const initialState = {
    isLoggedIn: false,
    username: ''
}

export default function(state = initialState, action) {
    switch(action.type) {
        case USER_IS_LOGGED_IN:
            return {
                ...state,
                isLoggedIn: action.isLoggedIn,
                username: action.username
            };
        case SET_USER_ORDER:
            return {
                ...state,
                order: action.order
            }
        default:
            return state;
    }
}
