import React from 'react';
import { bool, string } from 'prop-types';
import classnames from 'classnames';

const Soldier = ({ player, disabled }) => {
  const className = classnames('unit soldier', player, { disabled });
  return (<div className={className}>
    Soldier!
  </div>);
};

Soldier.propTypes = {
  player: string.isRequired,
  disabled: bool,
};

Soldier.defaultProps = {
  disabled: false,
};

export default Soldier;
