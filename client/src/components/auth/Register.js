import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import PropTypes from "prop-types";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: [], //will be used with redux
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this); //to bind the 'this' keyword to the regular functions
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  onSubmit(e) {
    //this is where we'll register the user and its gonna go thru redux. Right now, just logging whatev to be sent to backend, on the console
    e.preventDefault();
    const newUser = {
      ...this.state,
    };
    delete newUser.errors; //delete property from object
    /*axios
      .post("/api/users", newUser)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) =>{
        this.setState({ errors: e.response.data.errors });
        console.log(e.response.data.errors)
      });*/
    this.props.registerUser(newUser);  
    console.log(newUser);
  }
  render() {
    const { errors } = this.state;
    const { user } = this.props.auth;
    return (
      <div className="register">
      {user?user.name:null}
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.find(err=> err.param==='name'),
                    })}
                    placeholder="Name"
                    value={this.state.name}
                    name="name"
                    onChange={this.onChange}
                  />  
                {user.name?(user.name):(null)}                 
                {errors.find(err=> err.param==='name') && <div className="invalid-feedback">{errors.find(err=>err.param==='name').msg}</div>}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg",{
                      'is-invalid': errors.find(err=> err.param==='email')
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.find(err=> err.param==='email') && <div className="invalid-feedback">{errors.find(err=>err.param==='email').msg}</div>}
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg",{
                      'is-invalid': errors.find(err=> err.param==='password')
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                {errors.find(err=> err.param==='password') && <div className="invalid-feedback">{errors.find(err=>err.param==='password').msg}</div>}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg",{
                      'is-invalid': errors.find(err=> err.param==='password2')
                    })}
                    placeholder="Re-enter Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                  {errors.find(err=> err.param==='password2') && <div className="invalid-feedback">{errors.find(err=>err.param==='password2').msg}</div>}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const  mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { registerUser })(Register);
