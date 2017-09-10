import { fromJS } from 'immutable';

export default function onCellClick({ column, dispatch, row, matrix }) {
  console.log(`cell ${row}-${column} was just clicked! can you believe it?`);
  console.log('and he got of:', matrix);


  // TODO needs to come from server
  const newState = fromJS({
    matrix: {
      columns: 1,
      grid: [
        [{ terrain: 'teeth', unit: 'ankle' }],
        [{ terrain: 'banana', unit: 'whiskey' }],
      ],
      rows: 2,
    },
  });

  return dispatch({
    newState,
    type: 'CELL_CLICK',
  });
}

