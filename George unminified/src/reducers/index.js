import { combineReducers } from 'redux';
import homeReducer from './homeReducer';
import userReducer from './userReducer';

export default combineReducers({
    home: homeReducer,
    user: userReducer
})
