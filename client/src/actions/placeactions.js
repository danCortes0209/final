import axios from 'axios';

import {GET_PLACE, GET_PLACES, PLACE_LOADING, ADD_PLACE, DELETE_PLACE, GET_ERRORS, GET_POSTS} from "./types";

export const addPlace = (placeData) => dispatch => {
    axios.post("/api/places", placeData).then(res => {
        dispatch({
            type: ADD_PLACE,
            payload: res.data
        });
        //console.log(res.data)
    }).catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
        console.log(err)
    })
};

export const getPlaces = () => dispatch => {
    dispatch(setLoadingState());
    axios.get("/api/places").then(res => {
        dispatch({
            type: GET_PLACES,
            payload: res.data
        });
        //console.log(res.data);
    }).catch(err => {
        dispatch({
            type: GET_PLACES,
            payload: null
        });
        console.log(err);
    })
};

export const getPlace = (id) => dispatch => {
    dispatch(setLoadingState());
    axios.get(`/api/places/${id}`).then(res=> {
        dispatch({
            type: GET_PLACE,
            payload: res.data
        });
        //console.log(res.data)
    }).catch(err => {
        dispatch({
            type: GET_PLACE,
            payload: null
        });
        console.log(err);
    })
};

export const getCriticsByPlace = id => dispatch => {
    dispatch(setLoadingState());
    axios.get(`/api/critics/place/${id}`).then(res=>{
        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
        //console.log(res.data)
    }).catch(err=>{
        dispatch({
            type: GET_POSTS,
            payload: null
        });
        console.log(err)
    })
};

export const deletePlace = id => dispatch => {
    axios.delete(`/api/places/${id}`).then(res => {
        dispatch({
            type: DELETE_PLACE,
            payload: id
        });
        console.log(res.data)
    }).catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
        console.log(err);
    })
};

export const setLoadingState = () => {
    return {
        type: PLACE_LOADING
    }
};