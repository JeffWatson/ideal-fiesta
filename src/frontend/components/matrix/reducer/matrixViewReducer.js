import {
  CELL_SELECTED,
  CELL_UNSELECTED,
  UNIT_PURCHASE,
  RANGE_CHECK,
} from 'actions';
import initialState from './initialState';
import BattleMatrix from '../data/battleMatrix';

export default function matrixViewReducer(state, action) {
  switch (action.type) {
  case CELL_SELECTED:
    return state.set('matrix', new BattleMatrix({ matrix: state.get('matrix') }).onCellSelected({ row: action.row, column: action.column }));
  case CELL_UNSELECTED:
    return state.set('matrix', new BattleMatrix({ matrix: state.get('matrix') }).deselectAllCells());
  case RANGE_CHECK:
    return state.set('matrix', new BattleMatrix({ matrix: state.get('matrix') }).rangeCheck({ row: action.row, column: action.column }));
  case UNIT_PURCHASE:
    return state.setIn(['matrix', 'grid', action.row, action.column, 'unit'], action.unit);
  default:
    return state || initialState;
  }
}
