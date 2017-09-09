import { Map } from 'immutable';

const initialState = Map({
  matrix: Map({
    columns: 1,
    grid: [
      [{ terrain: 'sand', unit: 'foot' }],
      [{ terrain: 'ocean', unit: 'sub' }],
    ],
    rows: 2,
  }),
});


export default initialState;
