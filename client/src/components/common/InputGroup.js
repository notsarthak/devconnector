import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const InputGroup = ({
  name,
  type,
  onChange,
  error,
  icon,
  placeholder,
  value,
}) => {
  return (
    <div className="input-group mb-3">
    <div className="input-group-prepend">
        <span className="input-group-text">
            <i className={icon} />
        </span>
    </div>
      <input
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error,
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error.msg}</div>}
    </div>
  );
};

InputGroup.propTypes = {
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.object,
  name: PropTypes.string.isRequired,
  icon: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

InputGroup.defaultProps = {
  type: "text",
};

export default InputGroup;
