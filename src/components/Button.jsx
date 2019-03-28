import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  submit,
  onClick,
  disabled,
  value,
  className
}) => (
  <button
    type={submit}
    className={className}
    onClick={onClick}
    disabled={disabled}
  >
    {value}
  </button>
);

Button.propTypes = {
  submit: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  value: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};


export default Button;
