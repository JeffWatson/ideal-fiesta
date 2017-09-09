import { Map } from 'immutable';

export function onCellClick({ column, dispatch, row, matrix }) {
  console.log(`cell ${row}-${column} was just clicked! can you believe it?`);
  console.log('and he got of:', matrix);

  // maybe this should be a data structure/ service? would be easier... or, should come from server.
  const newState = Map({
    matrix: Map({
      columns: 1,
      grid: [
        [{ terrain: 'teeth', unit: 'ankle' }],
        [{ terrain: 'banana', unit: 'whiskey' }],
      ],
      rows: 2,
    }),
  });

  return dispatch({
    newState,
    type: 'CELL_CLICK',
  });
}

