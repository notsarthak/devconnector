import React, { Component } from "react";
import { connect } from "react-redux";
import { addPost } from "../../actions/postActions";
import PropTypes from "prop-types";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
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
    const newPost = {
        ...this.state
    };
    delete newPost.errors;
    this.props.addPost(newPost);
    this.setState({
        text: ""
    });
  }
  render() {
    const { errors } = this.state;  
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
              <TextAreaFieldGroup 
                  name="text"
                  onChange={this.onChange}
                  error={errors.find(error=> error.param==="text")}
                  placeholder="Create a post"
                  value={this.state.text}
              />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
    errors: PropTypes.array.isRequired,
    addPost: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        errors: state.errors
    };
}

export default connect(mapStateToProps, { addPost })(PostForm);
