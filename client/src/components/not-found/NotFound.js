import React, { useEffect } from "react";
import { GET_ERRORS } from "../../actions/types";
import { connect } from "react-redux";

const NotFound = ({ dispatch }) => {
  useEffect(() => {
    dispatch({
      type: GET_ERRORS,
      payload: [],
    });
  });
  return (
    <div>
      <h1 className="dispay-4">404 NOT-FOUND</h1>
      <p>The page you're looking for does not exist, sorry :(</p>
    </div>
  );
};

export default connect()(NotFound);
