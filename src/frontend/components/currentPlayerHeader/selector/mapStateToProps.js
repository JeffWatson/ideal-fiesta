export default function mapStateToProps(state) {
  return {
    currentPlayer: state.currentPlayerHeader.get('currentPlayer'),
  };
}
