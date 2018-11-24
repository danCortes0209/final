import { combineReducers } from 'redux';

import authReducer from './authreducer';
import errorReducer from './errorreducer';
import profileReducer from './profilereducer';
import criticReducer from './criticreducer';
import placeReducer from "./placereducer";

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer,
    critic: criticReducer,
    place: placeReducer
});