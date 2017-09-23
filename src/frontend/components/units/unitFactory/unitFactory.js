import React from 'react';
import { extend, toLower } from 'lodash';
import { UNITS } from '../../../../shared/sharedConstants';

import Soldier from './../soldier';
import SmallTank from './../smallTank';
import Artillery from './../artillery';

import './units.scss';

export default class UnitFactory {
  static createUnit({ unit, player }) {
    const unitProps = extend(UNITS[unit], { player: toLower(player) });

    switch (unitProps.name) {
    case UNITS.SOLDIER.name: return (<Soldier {...unitProps} />);
    case UNITS.SMALL_TANK.name: return (<SmallTank {...unitProps} />);
    case UNITS.ARTILLERY.name: return (<Artillery {...unitProps} />);
    default: return null;
    }
  }
}
