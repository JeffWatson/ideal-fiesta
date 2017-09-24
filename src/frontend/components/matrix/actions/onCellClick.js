import BattleMatrix from './../data/battleMatrix';

export default function onCellClick({ column, row, matrix, currentPlayer }, dispatch) {
  return dispatch({
    grid: new BattleMatrix({ matrix }).onCellClick({ column, row, currentPlayer }),
    type: 'CELL_CLICK',
  });
}
