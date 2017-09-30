import React from 'react';
import { oneOf } from 'prop-types';
import classnames from 'classnames';
import { MOVE_PATH_TYPES } from '../../../../../shared/sharedConstants';

import './movePath.scss';

const MovePath = (props) => {
  const { direction } = props;
  const className = classnames('movePath', direction);

  return (<div className={className} />);
};

MovePath.propTypes = {
  direction: oneOf(MOVE_PATH_TYPES).isRequired,
};

export default MovePath;
