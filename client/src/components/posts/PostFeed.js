import React from "react";
import PostItem from "./PostItem";
import PropTypes from "prop-types";

const PostFeed = ({ posts }) => {
    return (posts.map(post=> <PostItem post={post} key={post._id}/>));
}

PostFeed.propTypes = {
    posts: PropTypes.array.isRequired
}

export default PostFeed;