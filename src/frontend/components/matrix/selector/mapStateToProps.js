export default function mapStateToProps(state) {
  return {
    matrix: state.matrix.get('matrix'),
  };
}
