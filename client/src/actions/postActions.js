import axios from "axios";
import { ADD_POST, GET_ERRORS } from "./types";

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
