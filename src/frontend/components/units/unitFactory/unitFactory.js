import React from 'react';
import { extend } from 'lodash';
import { fromJS } from 'immutable';
import { UNITS as UNIT_PROPS } from '../../../../shared/sharedConstants';

import Soldier from './../soldier';
import SmallTank from './../smallTank';
import Artillery from './../artillery';

export default class UnitFactory {
  static createUnit({ factoryType, unit, player }) {
    const props = fromJS(extend(UNIT_PROPS[unit], { player }));

    switch (props.get('name')) {
    case 'SOLDIER': return (<Soldier {...props} />);
    case 'SMALL_TANK': return (<SmallTank {...props} />);
    case 'ARTILLERY': return (<Artillery {...props} />);
    default: return null;
    }
  }
}