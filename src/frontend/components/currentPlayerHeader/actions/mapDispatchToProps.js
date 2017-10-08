import endTurn from './endTurn';

export default function mapDispatchToProps(dispatch) {
  return {
    endTurn: args => dispatch(endTurn(args)),
  };
}
