import {
  CELL_CLICK,
  UNIT_PURCHASE,
  CELL_SELECTED,
  CELL_UNSELECTED,
} from 'actions';
import initialState from './initialState';

export default function matrixViewReducer(state, action) {
  switch (action.type) {
  case CELL_SELECTED:
    return state.setIn(['matrix', 'grid', action.row, action.column, 'selected'], true);
  case CELL_UNSELECTED:
    return state.setIn(['matrix', 'grid', action.row, action.column, 'selected'], false);
  case CELL_CLICK:
    return state.setIn(['matrix'], action.matrix);
  case UNIT_PURCHASE:
    return state.setIn(['matrix', 'grid', action.row, action.column, 'unit'], action.unit);
  default:
    return state || initialState;
  }
}
