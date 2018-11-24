import { GET_PLACE, GET_PLACES, PLACE_LOADING, ADD_PLACE, DELETE_PLACE } from "../actions/types";

const initialState = {
    places: [],
    place: {},
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type){
        case PLACE_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_PLACES:
            return {
                ...state,
                places: action.payload,
                loading: false
            };
        case GET_PLACE:
            return {
                ...state,
                place: action.payload,
                loading: false
            };
        case ADD_PLACE:
            return {
                ...state,
                places: [action.payload,...state.places]
            };
        case DELETE_PLACE:
            return {
                ...state,
                places: state.places.filter(place => place._id !== action.payload)
            };
        default:
            return state;
    }
}