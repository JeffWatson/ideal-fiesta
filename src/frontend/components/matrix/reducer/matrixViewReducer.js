import initialState from './initialState';

export default function matrixViewReducer(state, action) {
  switch (action.type) {
  case 'CELL_CLICK':
    return state.setIn(['matrix'], action.matrix);
  // case 'LAND_FACTORY_CLICK':
  //   return state.setIn(['matrix', 'grid', action.row, action.column, 'unit'], action.unit);
  default:
    return state || initialState;
  }
}
