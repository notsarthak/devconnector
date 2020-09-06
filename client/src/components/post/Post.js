import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PostItem from "../posts/PostItem";
import { getPost } from "../../actions/postActions";
import Spinner from "../common/Spinner";

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }
  render() {
    const { post, loading } = this.props.post;
    let postContent;
    if (post === null || loading || Object.keys(post).length === 0)
      postContent = <Spinner />;
    else
      postContent = (
        <div>
          <PostItem post={post} showActions={false} />
        </div>
      );
    return (
      <div className="post">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
                <Link to="/feed" className="btn btn-light mb-3">
                    Back To Posts
                </Link>
                {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    post: state.post,
  };
};

export default connect(mapStateToProps, { getPost })(Post);
