import BattleMatrix from './../data/battleMatrix';

export default function onCellClick({ column, dispatch, row, matrix, currentPlayer }) {
  return dispatch({
    grid: new BattleMatrix({ matrix }).onCellClick({ column, row, currentPlayer }),
    type: 'CELL_CLICK',
  });
}
