import React from 'react';
import { number } from 'prop-types';

import './health.scss';

const Health = ({ health }) => (<div className={'health-container'}>
  { health }
</div>);

Health.propTypes = {
  health: number.isRequired,
};

export default Health;
