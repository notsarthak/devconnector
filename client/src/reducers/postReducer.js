import { ADD_POST, GET_POSTS, POST_LOADING, DELETE_POST, LIKE_POST, UNLIKE_POST } from "../actions/types"; 

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
        case DELETE_POST: 
            return {
                ...state,
                posts: state.posts.filter(post => post._id!==action.payload)
            };
        case LIKE_POST:
            let postsAfterLike = [
                ...state.posts.filter( post => post._id!==action.payload.id ),
                {
                    ...state.posts.find( post => post._id===action.payload.id ),
                    likes: action.payload.likes
                }
            ];
            postsAfterLike.sort((post1,post2)=>{
                const date1 = new Date(post1.date);
                const date2 = new Date(post2.date);
                return date2 - date1;
            })
            console.log(postsAfterLike)
            return {
                ...state,
                posts: postsAfterLike
            };
        case UNLIKE_POST:
            let postsAfterUnlike = [
                ...state.posts.filter( post => post._id!==action.payload.id ),
                {
                    ...state.posts.find( post => post._id===action.payload.id ),
                    likes: action.payload.likes
                }
            ];
            postsAfterUnlike.sort((post1,post2)=>{
                const date1 = new Date(post1.date);
                const date2 = new Date(post2.date);
                return date2 - date1;
            })
            console.log(postsAfterUnlike)
            return {
                ...state,
                posts: postsAfterUnlike
            };        
        default:
            return state;
    }
}