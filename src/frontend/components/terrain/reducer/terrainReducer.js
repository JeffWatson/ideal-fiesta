import { fromJS } from 'immutable';
import { CELL_UNSELECTED, MOVEMENT_INITIATED } from 'actions';

export default function terrainReducer(state, action) {
  switch (action.type) {
  case MOVEMENT_INITIATED:
    return state.set('isMovementMode', true);
  case CELL_UNSELECTED:
    return state.set('isMovementMode', false);
  default:
    return state || fromJS({ isMovementMode: false });
  }
}
