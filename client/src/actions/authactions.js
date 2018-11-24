import axios from 'axios';
import jwt_decode from 'jwt-decode';

import setAuthToken from '../utils/setauthtoken';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

//register
export const registerUser = (userData,history) => dispatch =>{
    axios.post('api/users/register',userData)
        .then(res => {
            console.log(res.data);
            history.push("/login")
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

//register with FB
export const connectUserFb = (userData) => dispatch =>{
    axios.post('api/users/facebook', userData)
        .then(res => {
            //save token to local storage and set it to a header
            const { token } = res.data;
            localStorage.setItem('jwtToken',token);
            setAuthToken(token);
            //decode token and set current user
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

//login
export const loginUser = userData => dispatch => {
    axios.post('api/users/login',userData)
        .then(res => {
            //save token to local storage and set it to a header
            const { token } = res.data;
            localStorage.setItem('jwtToken',token);
            setAuthToken(token);
            //decode token and set current user
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch( err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

export const setCurrentUser =(decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
};

export const logoutUser = () => dispatch => {
    //remove token and auth header
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    //set user to {} and isAuthenticated false
    dispatch(setCurrentUser({}));
};