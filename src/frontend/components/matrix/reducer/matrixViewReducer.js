import initialState from './initialState';

export default function matrixViewReducer(state, action) {
  switch (action.type) {
  case 'CELL_CLICK':
    return state.merge(action.newState);
  default:
    return state || initialState;
  }
}
