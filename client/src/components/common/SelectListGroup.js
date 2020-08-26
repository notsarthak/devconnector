import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const SelectListGroup = ({ name, onChange, error, info, value, options }) => {
  const selectOptions = options.map((option) => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="form-group">
      <select
        className={classnames("form-control form-control-lg", {
          "is-invalid": error,
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error.msg}</div>}
    </div>
  );
};

SelectListGroup.propTypes = {
  onChange: PropTypes.func.isRequired,
  error: PropTypes.object,
  name: PropTypes.string.isRequired,
  info: PropTypes.string,
  value: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

export default SelectListGroup;
