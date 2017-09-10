import { fromJS } from 'immutable';

const initialState = {
  matrix: {
    columns: 1,
    grid: [
      [{ terrain: 'sand', unit: 'foot' }],
      [{ terrain: 'ocean', unit: 'sub' }],
    ],
    rows: 2,
  },
};

export default fromJS(initialState);
