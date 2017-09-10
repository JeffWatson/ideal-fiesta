import appInitialState from './appInitialState';

export default function matrixViewReducer(state, action) {
  switch (action.type) {
  default:
    return state || appInitialState;
  }
}
