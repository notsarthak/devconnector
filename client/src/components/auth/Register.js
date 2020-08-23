import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";

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
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.errors !== prevProps.errors) {
      const { errors } = this.props;
      if (errors) {
        this.setState({
          errors: errors,
        });
      }
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
                <TextFieldGroup
                  name="name"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={this.onChange}
                  type="text"
                  error={errors.find((err) => err.param === "name")}
                />
                <TextFieldGroup
                  name="email"
                  placeholder="Email Address"
                  value={this.state.email}
                  onChange={this.onChange}
                  type="email"
                  error={errors.find((err) => err.param === "email")}
                  info="This site uses Gravatar so if you want a profile image, use
                    a Gravatar email"
                />
                <TextFieldGroup
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                  type="password"
                  error={errors.find((err) => err.param === "password")}
                />
                <TextFieldGroup
                  name="password2"
                  placeholder="Re-enter Password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  type="password"
                  error={errors.find((err) => err.param === "password2")}
                />
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
