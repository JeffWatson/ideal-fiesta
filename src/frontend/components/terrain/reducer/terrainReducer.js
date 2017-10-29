import { fromJS } from 'immutable';
import { CELL_UNSELECTED, CELL_SELECTED } from 'actions';

export default function terrainReducer(state, action) {
  switch (action.type) {
  case CELL_UNSELECTED:
    return state.set({ showDialog: false });
  case CELL_SELECTED:
    return state.set({ showDialog: true });
  default:
    return state || fromJS({ showDialog: true });
  }
}
