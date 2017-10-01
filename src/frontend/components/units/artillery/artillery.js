import React from 'react';
import { bool, string } from 'prop-types';
import classnames from 'classnames';

const Artillery = ({ player, disabled }) => {
  const className = classnames('unit artillery', player, { disabled });
  return (<div className={className}>
    Artillery!
  </div>);
};

Artillery.propTypes = {
  player: string.isRequired,
  disabled: bool,
};

Artillery.defaultProps = {
  disabled: false,
};

export default Artillery;
