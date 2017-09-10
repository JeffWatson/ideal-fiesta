import React from 'react';

import './ocean.scss';

const Ocean = ({ terrain, children }) => (
  <div className={'ocean-container'}>
    { children }
  </div>
);

export default Ocean;
