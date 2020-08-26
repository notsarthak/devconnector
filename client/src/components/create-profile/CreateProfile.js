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
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    console.log("submit");
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;

    //Select options for status
    const options = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructor or Teacher", value: "Instructor or Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" },
    ];

    let socialInputs;

    if(displaySocialInputs)
    {
      socialInputs = (
        <div>
        <InputGroup
          name="twitter"
          placeholder="Twitter Profile URL"
          value={this.state.twitter}
          onChange={this.onChange}
          icon="fab fa-twitter"
          error={errors.find(error=>error.param==="twitter")}
        />
        <InputGroup
          name="facebook"
          placeholder="Facebook Page URL"
          value={this.state.facebook}
          onChange={this.onChange}
          icon="fab fa-facebook"
          error={errors.find(error=>error.param==="facebook")}
        />
        <InputGroup
          name="linkedin"
          placeholder="Linkedin Profile URL"
          value={this.state.linkedin}
          onChange={this.onChange}
          icon="fab fa-linkedin"
          error={errors.find(error=>error.param==="linkedin")}
        />
        <InputGroup
          name="youtube"
          placeholder="YouTube Channel URL"
          value={this.state.youtube}
          onChange={this.onChange}
          icon="fab fa-youtube"
          error={errors.find(error=>error.param==="youtube")}
        />
        <InputGroup
          name="instagram"
          placeholder="Instagram Page URL"
          value={this.state.instagram}
          onChange={this.onChange}
          icon="fab fa-instagram"
          error={errors.find(error=>error.param==="instagram")}
        />
        </div>
      )
    }

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
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile handle"
                  name="handle"
                  onChange={this.onChange}
                  value={this.state.handle}
                  error={errors.find((error) => error.param === "handle")}
                  info="A unique handle for your profile URL. Your full name, company name, nickname"
                />
                <SelectListGroup
                  name="status"
                  placeholder="Status"
                  options={options}
                  onChange={this.onChange}
                  value={this.state.status}
                  error={errors.find((error) => error.param === "status")}
                  info="Give us an idea of where you are at in your career"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  onChange={this.onChange}
                  value={this.state.company}
                  error={errors.find((error) => error.param === "company")}
                  info="Could be your own company or one you work for"
                />
                <TextFieldGroup
                  name="website"
                  placeholder="Website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.find((error) => error.param === "website")}
                  info="Could be your own website or a company one"
                />
                <TextFieldGroup
                  name="location"
                  placeholder="Location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.find((error) => error.param === "location")}
                  info="City & state suggested (eg. East-Delhi, Delhi)"
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.find((error) => error.param === "skills")}
                  info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                />
                <TextFieldGroup
                  name="githubusername"
                  placeholder="Github Username"
                  onChange={this.onChange}
                  value={this.state.githubusername}
                  error={errors.find(
                    (error) => error.param === "githubusername"
                  )}
                  info="If you want your latest repos and a Github link, include your username"
                />
                <TextAreaFieldGroup
                  name="bio"
                  placeholder="A short bio of yourself"
                  value={this.state.bio}
                  onChange={this.onChange}
                  info="Tell us a little about yourself"
                  error={errors.find((error) => error.param === "bio")}
                />
                <div className="mb-3">
                  <button
                    onClick={() => {
                      this.setState((prevState) => ({
                        displaySocialInputs: !prevState.displaySocialInputs, //toogle displaysocialmedialinks property of state
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted"> Optional</span>
                </div>
                {socialInputs}
                <input type="submit" value="Submit" className="btn btn-info mt-4 btn-block"/>
              </form>
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
