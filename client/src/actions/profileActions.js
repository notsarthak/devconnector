import axios from "axios";
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS } from "./types";

//Get current user's profile
export const getCurrentProfile = () => async (dispatch) => {
  dispatch(setProfileLoading());
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: GET_PROFILE,
      payload: {},
    });
  }
};

//Create user's profile
export const createProfile = (profileData, history) => async(dispatch) => {
  try{
    console.log(profileData)
    await axios.post("/api/profile/", profileData);
    history.push("/dashboard");
  }catch(e){
    console.log(e.response.data)
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data.errors
    })
  }
}

//Set the loading property in profile state as true
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

//Clearing current profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};
