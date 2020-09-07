import React, { Component } from "react";
import { connect } from "react-redux";
import { addComment } from "../../actions/postActions";
import PropTypes from "prop-types";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class CommentForm extends Component {
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
    const newComment = {
        ...this.state
    };
    delete newComment.errors;
    this.props.addComment(newComment, this.props.postId);
    this.setState({
        text: ""
    });
  }
  render() {
    const { errors } = this.state;  
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Make a Comment...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
              <TextAreaFieldGroup 
                  name="text"
                  onChange={this.onChange}
                  error={errors.find(error=> error.param==="text")}
                  placeholder="Reply to post"
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

CommentForm.propTypes = {
    errors: PropTypes.array.isRequired,
    addComment: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
    return {
        errors: state.errors
    };
}

export default connect(mapStateToProps, { addComment })(CommentForm);
