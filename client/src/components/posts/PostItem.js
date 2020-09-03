import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deletePost, addLike, removeLike } from "../../actions/postActions";

const PostItem = ({ post, auth, deletePost, addLike, removeLike }) => {
    const onDeleteClick = (id) => {
        deletePost(id);
    }
    return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <Link to={`/profile/${post.userHandle}`}>
            <img
              className="rounded-circle d-none d-md-block"
              src={post.avatar}
              alt=""
            />
          </Link>
          <br />
          <p className="text-center">{post.name}</p>
        </div>
        <div className="col-md-10">
          <p className="lead">{post.text}</p>
          <button type="button" onClick={() => addLike(post._id)} className="btn btn-light mr-1">
            <i className="text-info fas fa-thumbs-up"></i>
            <span className="badge badge-light">{post.likes.length}</span>
          </button>
          <button type="button" onClick={() => removeLike(post._id)} className="btn btn-light mr-1">
            <i className="text-secondary fas fa-thumbs-down"></i>
          </button>
          <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
            Comments
          </Link>
          {auth.user.id === post.user ? (
            <button type="button" onClick={() => onDeleteClick(post._id)} className="btn btn-danger mr-1">
              <i className="fas fa-times" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem);
