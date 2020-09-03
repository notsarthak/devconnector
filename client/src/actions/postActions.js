import axios from "axios";
import { ADD_POST, GET_ERRORS, GET_POSTS, POST_LOADING, DELETE_POST } from "./types";

//create a post
export const addPost = (postData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/posts", postData);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data.errors,
    });
  }
};

//get all posts
export const getPosts = () => async (dispatch) => {
  try{
    dispatch(setPostLoading());
    const res = await axios.get("/api/posts");
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch(e) {
    dispatch({
      type: GET_POSTS,
      payload: null
    });
  }
}

//delete post
export const deletePost = (id) => async (dispatch) => {
  try{
    await axios.delete(`/api/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id
    });
  } catch(e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data.errors
    });
  }  
}

//like a post
export const addLike = (id) => async (dispatch) => {
  try{
    await axios.put(`/api/posts/like/${id}`);
    dispatch(getPosts());
  } catch(e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data.errors
    });
  }
}

//unlike a post
export const removeLike = (id) => async (dispatch) => {
  try{
    await axios.put(`/api/posts/unlike/${id}`);
    dispatch(getPosts());
  } catch(e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data.errors
    });
  }
}

//set the loading property in post state of store to true
const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
} 