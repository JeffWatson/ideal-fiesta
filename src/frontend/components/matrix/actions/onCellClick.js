import BattleMatrix from './../data/battleMatrix';

export default function onCellClick({ column, dispatch, row, matrix }) {
  return dispatch({
    grid: new BattleMatrix({ matrix }).onCellClick({ column, row }),
    type: 'CELL_CLICK',
  });
}
