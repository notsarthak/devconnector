import { ADD_POST, GET_POSTS, POST_LOADING, DELETE_POST, UPDATE_POST_LIKES, GET_POST, UPDATE_POST_COMMENTS } from "../actions/types";

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
        case GET_POST:
            return {
                ...state,
                post: action.payload,
                loading: false
            }
        case ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            };
        case DELETE_POST: 
            return {
                ...state,
                posts: state.posts.filter(post => post._id!==action.payload)
            };
        case UPDATE_POST_COMMENTS: 
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: [...action.payload]
                }
            };    
        case UPDATE_POST_LIKES:
            let newPosts = [
                ...state.posts.filter( post => post._id!==action.payload.id ),
                {
                    ...state.posts.find( post => post._id===action.payload.id ),
                    likes: action.payload.likes
                }
            ];
            newPosts.sort((post1,post2)=>{
                const date1 = new Date(post1.date);
                const date2 = new Date(post2.date);
                return date2 - date1;
            })
            return {
                ...state,
                posts: newPosts
            };       
        default:
            return state;
    }
}