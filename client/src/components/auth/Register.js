import React, { Component } from "react";
import { withRouter } from "react-router-dom";
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
  componentWillReceiveProps(nextProps) {
    const { errors } = nextProps;
    if (errors) {
      this.setState({
        errors: errors,
      });
    }
  }
  onSubmit(e) {
    //this is where we'll register the user and its gonna go thru redux. Right now, just logging whatev to be sent to backend, on the console
    e.preventDefault();
    const newUser = {
      ...this.state,
    };
    delete newUser.errors; //delete property from object
    this.props.registerUser(newUser, this.props.history);
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="register">
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
                      "is-invalid": errors.find((err) => err.param === "name"),
                    })}
                    placeholder="Name"
                    value={this.state.name}
                    name="name"
                    onChange={this.onChange}
                  />
                  {errors.find((err) => err.param === "name") && (
                    <div className="invalid-feedback">
                      {errors.find((err) => err.param === "name").msg}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.find((err) => err.param === "email"),
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.find((err) => err.param === "email") && (
                    <div className="invalid-feedback">
                      {errors.find((err) => err.param === "email").msg}
                    </div>
                  )}
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.find(
                        (err) => err.param === "password"
                      ),
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.find((err) => err.param === "password") && (
                    <div className="invalid-feedback">
                      {errors.find((err) => err.param === "password").msg}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.find(
                        (err) => err.param === "password2"
                      ),
                    })}
                    placeholder="Re-enter Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                  {errors.find((err) => err.param === "password2") && (
                    <div className="invalid-feedback">
                      {errors.find((err) => err.param === "password2").msg}
                    </div>
                  )}
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
  auth: PropTypes.object.isRequired,
  errors: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    errors: state.errors,
  };
};

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
