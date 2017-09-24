import React from 'react';
import { string } from 'prop-types';

const SmallTank = ({ player }) => (<div className={`unit soldier ${player}`}>
  SmallTank!
</div>);

SmallTank.propTypes = {
  player: string.isRequired,
};

export default SmallTank;
