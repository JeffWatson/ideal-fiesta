import React from 'react';
import { string } from 'prop-types';

const Artillery = ({ player }) => (<div className={`unit artillery ${player}`}>
  Artillery!
</div>);

Artillery.propTypes = {
  player: string.isRequired,
};

export default Artillery;
