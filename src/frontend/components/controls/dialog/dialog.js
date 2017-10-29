import React from 'react';
import { func, string, node } from 'prop-types';
import classnames from 'classnames';
import Button from 'components/controls/button/button';

import './dialog.scss';

// TODO should only be allowed to have 1 dialog...
const Dialog = ({ children, onClose, className }) => {
  const dialogClassName = classnames('dialog', className);

  return (<div className="dialog-outside">
    <div className={dialogClassName}>
      <Button className="close" onClick={() => onClose()} text="close" />
      { children }
    </div>
  </div>);
};

Dialog.propTypes = {
  className: string,
  children: node.isRequired,
  onClose: func.isRequired,
};

Dialog.defaultProps = {
  className: 'default',
};

export default Dialog;
