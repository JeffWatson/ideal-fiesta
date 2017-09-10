import onCellClick from './onCellClick';

export default function mapDispatchToProps(dispatch) {
  return {
    onCellClick: ({ terrain, column, row, unit, matrix }) => onCellClick({ column, dispatch, row, matrix }),
  };
}
