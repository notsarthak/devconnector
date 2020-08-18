import { GET_ERRORS } from "./types";
import axios from "axios";

export const registerUser = (userData, history) => async(dispatch) => {
  try{
    const res = await axios.post("/api/users", userData);
    return history.push('/login');
  }catch(e){
    return dispatch({
        type: GET_ERRORS,
        payload: e.response.data.errors
    })
  }
};
