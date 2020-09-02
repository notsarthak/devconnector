import { ADD_POST } from "../actions/types"; 

const initialState = {
    post: {},
    posts: [],
    loading: false
}

export default function(state = initialState, action) {
    switch (action.type)
    {
        case ADD_POST:
            return {
                ...state,
                post: action.payload
            }
        default:
            return state;
    }
}