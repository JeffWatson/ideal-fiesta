export default function mapStateToProps(state) {
  return {
    isMovementMode: state.terrain.get('isMovementMode'),
  };
}
