import { fromJS } from 'immutable';

const initialState = {
  matrix: {
    columns: 5,
    grid: [
      [{ terrain: 'sand', unit: 'SOLDIER' },
        { terrain: 'sand', unit: 'foot' },
        { terrain: 'sand', unit: 'foot' },
        { terrain: 'sand', unit: 'SMALL_TANK' },
        { terrain: 'sand', unit: 'foot' }],
      [{ terrain: 'ocean', unit: 'sub' },
        { terrain: 'ocean', unit: 'sub' },
        { terrain: 'ocean', unit: 'sub' },
        { terrain: 'ocean', unit: 'sub' },
        { terrain: 'ocean', unit: 'sub' }],
      [{ terrain: 'grass', unit: 'SOLDIER' },
        { terrain: 'sand', unit: 'foot' },
        { terrain: 'grass', unit: 'foot' },
        { terrain: 'sand', unit: 'foot' },
        { terrain: 'sand', unit: 'foot' }],
      [{ terrain: 'sand', unit: 'foot' },
        { terrain: 'sand', unit: 'foot' },
        { terrain: 'sand', unit: 'foot' },
        { terrain: 'grass', unit: 'SMALL_TANK' },
        { terrain: 'sand', unit: 'foot' }],
      [{ terrain: 'sand', unit: 'foot' },
        { terrain: 'grass', unit: 'foot' },
        { terrain: 'sand', unit: 'foot' },
        { terrain: 'sand', unit: 'foot' },
        { terrain: 'sand', unit: 'SOLDIER' }],
    ],
    rows: 5,
  },
};

export default fromJS(initialState);
