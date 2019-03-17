import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  submit,
  onClick,
  isRequestSent,
  value,
  className
}) => (
  <button
    type={submit}
    className={className}
    onClick={onClick}
    disabled={isRequestSent}
  >
    {value}
  </button>
);

Button.propTypes = {
  submit: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isRequestSent: PropTypes.bool,
  value: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

Button.defaultProps = {
  onClick: '',
  isRequestSent: false
};

export default Button;
