import initialState from './initialState';

export default function matrixViewReducer(state, action) {
  switch (action.type) {
  // case 'INITIAL_LOAD':
  //   return state.merge(action.body);
  // case 'UNIT_PURCHASED':
  //   return state.merge(action.body);
  // case 'TURN_ENDED':
  //   return state.merge(action.body);
  default:
    return state || initialState;
  }
}
