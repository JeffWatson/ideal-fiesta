import React from 'react';
import { func, string, node } from 'prop-types';
import classnames from 'classnames';
import Button from 'components/controls/button/button';

import './dialog.scss';

const Dialog = ({ children, onClose, className }) => {
  const dialogClassName = classnames('dialog', className);

  return (<div className={dialogClassName}>
    <Button className="close" onClick={() => onClose()} text="close" />
    { children }
  </div>);
};

Dialog.propTypes = {
  className: string,
  children: node.isRequired,
  onClose: func.isRequired,
};

Dialog.defaultProps = {
  className: undefined,
};

export default Dialog;
