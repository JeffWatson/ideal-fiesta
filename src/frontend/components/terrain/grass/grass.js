import React from 'react';

import './grass.scss';

const Grass = ({ terrain, children }) => (
  <div className={'grass-container'} >
    { children }
  </div>
);

export default Grass;
