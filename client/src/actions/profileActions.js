import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
} from "./types";

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
export const createProfile = (profileData, history) => async (dispatch) => {
  try {
    await axios.post("/api/profile/", profileData);
    history.push("/dashboard");
  } catch (e) {
    console.log(e.response.data);
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data.errors,
    });
  }
};

//Add experience
export const addExperience = (expData, history) => async (dispatch) => {
  try {
    await axios.put("/api/profile/experience", expData);
    history.push("/dashboard");
  } catch(e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data.errors
    });
  }
}

//delete user's aacount
export const deleteAccount = () => async (dispatch) => {
  if(window.confirm('Do you really want to delete your account? This cannot be undone!')){
    try{
      await axios.delete("/api/profile");
      localStorage.removeItem("jwtToken");
      dispatch({
        type: SET_CURRENT_USER,
        payload: {}
      });
    }catch(e){
      dispatch({
        type: GET_ERRORS,
        payload: e.response.data.errors 
      });
    }
  }
};

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
