import React from 'react';
import { node } from 'prop-types';

import './sand.scss';

const Sand = ({ children }) => (
  <div className={'sand-container'}>
    { children }
  </div>
);

Sand.propTypes = {
  children: node,
};

Sand.defaultProps = {
  children: undefined,
};

export default Sand;
