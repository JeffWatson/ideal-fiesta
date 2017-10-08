import React from 'react';
import { bool, func, node, string } from 'prop-types';
import classnames from 'classnames';

const Button = ({ className, onClick, text, children, disabled }) => {
  const buttonClassName = classnames('button', className);
  return (<button
    className={buttonClassName}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
    {children}
  </button>);
};

Button.propTypes = {
  className: string,
  onClick: func.isRequired,
  text: string,
  children: node,
  disabled: bool,
};

Button.defaultProps = {
  className: undefined,
  onClick: undefined,
  text: undefined,
  children: undefined,
  disabled: false,
};

export default Button;
