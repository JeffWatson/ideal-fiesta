import React from 'react';

import './sand.scss';

const Sand = ({ terrain, children }) => (
  <div className={'sand-container'}>
    { children }
  </div>
);

export default Sand;
