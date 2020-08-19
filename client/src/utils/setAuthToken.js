import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    //setting it as default header for axios
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
      //remove the auth header
      delete axios.defaults.headers.common['x-auth-token'];  
  }
};

export default setAuthToken;
