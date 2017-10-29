import React from 'react';
import { node } from 'prop-types';

import './landFactory.scss';

const LandFactory = ({ children }) => {
  return (<div className={'land-factory-container'}>
    { children }
  </div>);
};

LandFactory.propTypes = {
  children: node,
};

LandFactory.defaultProps = {
  children: undefined,
};

export default LandFactory;
