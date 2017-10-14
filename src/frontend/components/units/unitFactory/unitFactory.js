import React from 'react';
import { extend, toLower } from 'lodash';
import { UNITS } from 'shared/sharedConstants';

import Health from './../../health';
import Soldier from './../soldier';
import SmallTank from './../smallTank';
import Artillery from './../artillery';

import './units.scss';

export default class UnitFactory {
  static createUnit({ unit, disabled }) {
    const unitProps = extend(UNITS[unit.get('actor')], { player: toLower(unit.get('player')), disabled });

    return (<div>
      {UnitFactory.renderUnit(unitProps)}
      <Health health={unit.get('health')} className={'unit'} />
    </div>);
  }

  static renderUnit(unitProps) {
    switch (unitProps.name) {
    case UNITS.SOLDIER.name: return (<Soldier {...unitProps} />);
    case UNITS.SMALL_TANK.name: return (<SmallTank {...unitProps} />);
    case UNITS.ARTILLERY.name: return (<Artillery {...unitProps} />);
    default: return null;
    }
  }
}
