import React from 'react';
import { string } from 'prop-types';

const Soldier = ({ player }) => (<div className={`unit soldier ${player}`}>
  Soldier!
</div>);

Soldier.propTypes = {
  player: string.isRequired,
};

export default Soldier;
