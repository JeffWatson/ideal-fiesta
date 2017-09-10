import BattleMatrix from './../data/battleMatrix';

export default function onCellClick({ column, dispatch, row, matrix }) {
  // const newState = {
  //   grid:
  // };

  return dispatch({
    grid: new BattleMatrix({ matrix }).selectCell({ column, row }),
    type: 'CELL_CLICK',
  });
}
