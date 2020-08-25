import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const TextAreaFieldGroup = ({
  name,
  onChange,
  error,
  info,
  placeholder,
  value,
}) => {
  return (
    <div className="form-group">
      <textarea
        className={classnames("form-control form-control-lg", {
          "is-invalid": error,
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error.msg}</div>}
    </div>
  );
};

TextAreaFieldGroup.propTypes = {
  onChange: PropTypes.func.isRequired,
  error: PropTypes.object,
  name: PropTypes.string.isRequired,
  info: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default TextAreaFieldGroup;
