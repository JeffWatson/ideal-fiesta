export default function mapStateToProps(state) {
  return {
    showDialog: state.terrain.get('showDialog'),
  };
}
