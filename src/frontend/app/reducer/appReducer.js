import appInitialState from './appInitialState';

// TODO handle timeout, etc...
export default function matrixViewReducer(state, action) {
  switch (action.type) {
  default:
    return state || appInitialState;
  }
}
