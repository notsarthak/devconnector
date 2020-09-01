import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_PROFILES
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

//get all profiles
export const getProfiles = _ => async dispatch => {
    try{
      dispatch({
        type: PROFILE_LOADING
      });
      const res = await axios.get("/api/profile");
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      });
    } catch(e) {
      dispatch({
        type: GET_PROFILES,
        payload: null
      });
    }   
}

//get profile by handle
export const getProfileByHandle = (handle) => async (dispatch) => {
  try{
    dispatch({
      type: PROFILE_LOADING
    });
    const res = await axios.get(`/api/profile/handle/${handle}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  }
  catch(e){
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data.errors
    });
  }
}

//Create user's profile
export const createProfile = (profileData, history) => async (dispatch) => {
  try {
    await axios.post("/api/profile/", profileData);
    history.push("/dashboard");
  } catch (e) {
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

//Add education
export const addEducation = (eduData, history) => async (dispatch) => {
  try {
    await axios.put("/api/profile/education", eduData);
    history.push("/dashboard");
  } catch(e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data.errors
    });
  }
}

//delete user's account
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

//delete experience
export const deleteExperience = id => async dispatch => {
  const res = await axios.delete(`/api/profile/experience/${id}`)
  dispatch({
    type: GET_PROFILE,
    payload: res.data
  })
}

//delete education
export const deleteEducation = id => async dispatch => {
  const res = await axios.delete(`/api/profile/education/${id}`);
  dispatch({
    type: GET_PROFILE,
    payload: res.data
  })
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
