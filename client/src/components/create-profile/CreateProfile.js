import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import InputGroup from "../common/InputGroup";

class CreateProfile extends Component {
  constructor() {
    super();
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: [],
    };
  }
  render() {
    return (
      <div class="create-profile">
        <div class="container">
          <div class="row">
            <div class="col-md-8 m-auto">
              <Link to="/dashboard" class="btn btn-light">
                Go Back
              </Link>
              <h1 class="display-4 text-center">Create Your Profile</h1>
              <p class="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small class="d-block pb-3">* = required field</small>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    profile: state.profile,
  };
};

export default connect(mapStateToProps)(CreateProfile);
