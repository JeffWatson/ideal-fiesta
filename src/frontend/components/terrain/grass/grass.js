import React from 'react';
import { node } from 'prop-types';

import './grass.scss';

const Grass = ({ children }) => (
  <div className={'grass-container'} >
    { children }
  </div>
);

Grass.propTypes = {
  children: node,
};

Grass.defaultProps = {
  children: undefined,
};

export default Grass;
