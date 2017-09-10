import initialState from './initialState';

export default function matrixViewReducer(state, action) {
  switch (action.type) {
  case 'CELL_CLICK':
    return state.setIn(['matrix', 'grid'], action.grid);
  default:
    return state || initialState;
  }
}
