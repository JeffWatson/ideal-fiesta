import React from 'react';
import { number, string } from 'prop-types';

import './health.scss';

const Health = ({ health, className }) => (<div className={`${className} health-container`}>
  { health }
</div>);

Health.propTypes = {
  health: number.isRequired,
  className: string.isRequired,
};

export default Health;
