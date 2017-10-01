import React from 'react';
import { bool, string } from 'prop-types';
import classnames from 'classnames';

const SmallTank = ({ player, disabled }) => {
  const className = classnames('unit smallTank', player, { disabled });
  return (<div className={className}>
    SmallTank!
  </div>);
};

SmallTank.propTypes = {
  player: string.isRequired,
  disabled: bool,
};

SmallTank.defaultProps = {
  disabled: false,
};

export default SmallTank;
