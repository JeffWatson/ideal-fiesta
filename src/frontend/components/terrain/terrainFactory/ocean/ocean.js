import React from 'react';
import { node } from 'prop-types';

import './ocean.scss';

const Ocean = ({ children }) => (
  <div className={'ocean-container'}>
    { children }
  </div>
);

Ocean.propTypes = {
  children: node,
};

Ocean.defaultProps = {
  children: undefined,
};

export default Ocean;
