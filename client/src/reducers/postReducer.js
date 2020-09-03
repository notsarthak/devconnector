import { ADD_POST, GET_POSTS, POST_LOADING } from "../actions/types"; 

const initialState = {
    post: {},
    posts: [],
    loading: false
}

export default function(state = initialState, action) {
    switch (action.type)
    {
        case GET_POSTS: 
            return {
                ...state,
                posts: action.payload,
                loading: false
            };
        case POST_LOADING:
            return {
                ...state,
                loading: true
            };
        case ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            };
        default:
            return state;
    }
}