import React from 'react';

import './mountain.scss';

const Mountain = ({ terrain, children }) => (
  <div className={'mountain-container'}>
    { children }
  </div>
);

export default Mountain;
