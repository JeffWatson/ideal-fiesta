import React from 'react';
import { node } from 'prop-types';

import './mountain.scss';

const Mountain = ({ children }) => (
  <div className={'mountain-container'}>
    { children }
  </div>
);

Mountain.propTypes = {
  children: node,
};

Mountain.defaultProps = {
  children: undefined,
};

export default Mountain;
