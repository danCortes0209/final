import axios from 'axios';

import {ADD_POST, DELETE_POST, GET_ERRORS, GET_POSTS, POST_LOADING, GET_POST} from "./types";

export const addPost = postData => dispatch => {
    axios.post("api/critics", postData).then(res =>
        dispatch({
            type: ADD_POST,
            payload: res.data
        })).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const getPosts = () => dispatch => {
    dispatch(setLoadingState());
    axios
        .get("api/critics")
        .then(res => {
            dispatch({
                type: GET_POSTS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_POSTS,
                payload: null
            });
        }
    );
};

export const getPost = (id) => dispatch => {
    dispatch(setLoadingState());
    axios
        .get(`/api/critics/${id}`)
        .then(res => {
            dispatch({
                type: GET_POST,
                payload: res.data
            });
        })
        .catch(err => {
                dispatch({
                    type: GET_POST,
                    payload: null
                });
            }
        );
};

export const deletePost = id => dispatch => {
    axios.delete(`api/critics/${id}`).then(res =>
        dispatch({
            type: DELETE_POST,
            payload: id
        })).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );

};

export const likePost = id => dispatch => {
    axios.post(`/api/critics/like/${id}`)
        .then(res => dispatch(getPosts())).catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};


export const addComment = (commentData, postID) => dispatch => {
    axios.post(`/api/critics/comment/${postID}`, commentData).then(res =>
        dispatch({
            type: GET_POST,
            payload: res.data
        })).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const setLoadingState = () => {
    return {
        type: POST_LOADING
    }
};