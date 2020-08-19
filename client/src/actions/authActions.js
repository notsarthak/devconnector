import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

//Register user
export const registerUser = (userData, history) => async (dispatch) => {
  try {
    const res = await axios.post("/api/users", userData);
    return history.push("/login");
  } catch (e) {
    return dispatch({
      type: GET_ERRORS,
      payload: e.response.data.errors,
    });
  }
};

//Login user
export const loginUser = (userData) => async (dispatch) => {
  try {
    const res = await axios("/api/auth", userData);
    //saving token in local storage
    const { token } = res.data;
    //set token to local storage
    localStorage.setItem("jwtToken", token);
    //set token to auth headers
    setAuthToken(token);
    //decode token to get user
    const decoded = jwt_decode(token);
    //setting the the user object in auth state with the data obtained from the token
    return dispatch(setCurrentUser(decoded));
  } catch (e) {
    return dispatch({
      type: GET_ERRORS,
      payload: e.response.data.errors
    })
  }
};

const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded.user,
  };
};
