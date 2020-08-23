import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";

import { setCurrentUser, sanitizeDecodedToken, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";
import setAuthToken from "./utils/setAuthToken";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";

import "./App.css";

if(localStorage.getItem("jwtToken")){
  const token = localStorage.getItem("jwtToken");
  //set auth headers
  setAuthToken(token);
  //decode the token
  const decoded = jwt_decode(token);
  //set current user and isAuthenticated
  sanitizeDecodedToken(decoded);
  store.dispatch(setCurrentUser(decoded));
  //logout user if token is expired
  const currentTime = Date.now()/1000;
  if(decoded.exp < currentTime){
    //removing user from state and setting isAuthenticated to false
    store.dispatch(logoutUser());
    //remove profile from state
    store.dispatch(clearCurrentProfile());
    //redirect to login page
    window.location.href = '/login';
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
