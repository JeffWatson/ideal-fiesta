import React from 'react';
import { func, node, string } from 'prop-types';
import classnames from 'classnames';

const Button = ({ className, onClick, text, children }) => {
  const buttonClassName = classnames('button', className);
  return (<button
    className={buttonClassName}
    onClick={onClick}
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
};

Button.defaultProps = {
  className: undefined,
  onClick: undefined,
  text: undefined,
  children: undefined,
};

export default Button;
