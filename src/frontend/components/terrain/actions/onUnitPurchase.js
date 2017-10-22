import { fromJS } from 'immutable';
import { MAX_HEALTH } from 'shared/sharedConstants';
import { UNIT_PURCHASE } from 'actions';

export default function onUnitPurchase({ unit, row, column, currentPlayer }) {
  return {
    unit: fromJS({ actor: unit.name, health: MAX_HEALTH, player: currentPlayer }),
    row,
    column,
    type: UNIT_PURCHASE,
  };
}
