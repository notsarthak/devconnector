import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import PropTypes from "prop-types";
import { addExperience } from "../../actions/profileActions";

class AddExperience extends Component {
  constructor(props) {
    //constructor mainly used to initialize state of component. It is called before the component is rendered
    super(props); //need this statement i.e. super(props); in the constructor before any other statement else 'this.props' would be undefined within the contructor in the proceeding lines
    this.state = {
      title: "",
      company: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: "",
      disabled: false,
      errors: [],
    };
  }

  componentDidUpdate(prevProps){
    if(this.props.errors !== prevProps.errors)
      this.setState({
        errors: this.props.errors
      });
  }

  onChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      });
  }

  onSubmit = (e) => {
      e.preventDefault();
      const expData = {
        ...this.state
      };
      delete expData.errors;
      delete expData.disabled;
      this.props.addExperience(expData, this.props.history);
  }

  onCheck = () => {
      this.setState({
          to:'',
          disabled: !this.state.disabled,
          current: !this.state.current 
      });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="section add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Experience</h1>
              <p className="lead text-center">
                Add any developer/programming positions that you have had in the
                past
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Job Title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.find((error) => error.param === "title")}
                  name="title"
                />
                <TextFieldGroup
                  name="company"
                  placeholder="* Company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.find((error) => error.param === "company")}
                />
                <TextFieldGroup
                  name="location"
                  placeholder="Location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.find((error) => error.param === "location")}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  type="date"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.find(error=>error.param==="from")}
                  name="from"
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={this.onChange}
                  disabled={this.state.disabled ? "disabled" : ''}
                />
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="current"
                    //value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label className="form-check-label" htmlFor="current">
                    Current Job
                  </label>
                </div>
                <TextAreaFieldGroup 
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                    info="Some of your responsibilities, etc"
                    error={errors.find(error=>error.param==="description")}
                    placeholder="Job Description"
                />
                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    errors: state.errors,
  };
};

export default connect(mapStateToProps, { addExperience })(AddExperience);
