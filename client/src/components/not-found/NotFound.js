import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { clearErrors } from "../../actions/postActions";
import { connect } from "react-redux";

const NotFound = ({ clearErrors }) => {
  useEffect(() => {
    clearErrors();
  });
  return (
    <div>
      <h1 className="dispay-4">404 NOT-FOUND</h1>
      <p>The page you're looking for does not exist, sorry :(</p>
    </div>
  );
};

NotFound.propTypes = {
  clearErrors: PropTypes.func.isRequired
};

export default connect(null, { clearErrors })(NotFound);
