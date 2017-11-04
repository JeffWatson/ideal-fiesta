import React from 'react';
import { bool, func, node, number, oneOfType, string } from 'prop-types';
import classnames from 'classnames';

import './button.scss';

const Button = ({ className, onClick, text, children, disabled, tabIndex }) => {
  const buttonClassName = classnames('button', className);
  return (<button
    className={buttonClassName}
    onClick={onClick}
    disabled={disabled}
    tabIndex={tabIndex}
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
  tabIndex: oneOfType([
    number,
    string,
  ]),
};

Button.defaultProps = {
  className: undefined,
  text: undefined,
  children: undefined,
  disabled: false,
  tabIndex: 0,
};

export default Button;
