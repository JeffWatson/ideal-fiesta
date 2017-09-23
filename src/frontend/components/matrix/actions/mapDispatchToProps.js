import onCellClick from './onCellClick';

export default function mapDispatchToProps(dispatch) {
  return {
    onCellClick: ({ terrain, column, row, unit, matrix, currentPlayer }) => onCellClick({ column, dispatch, row, matrix, currentPlayer }),
  };
}
