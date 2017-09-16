import { fromJS } from 'immutable';

const initialState = {
  matrix: {
    columns: 5,
    grid: [
      [{ terrain: 'sand', unit: 'SOLDIER' },
        { terrain: 'sand' },
        { terrain: 'sand' },
        { terrain: 'sand', unit: 'SMALL_TANK' },
        { terrain: 'sand' }],
      [{ terrain: 'ocean' },
        { terrain: 'ocean' },
        { terrain: 'ocean' },
        { terrain: 'ocean' },
        { terrain: 'ocean' }],
      [{ terrain: 'grass', unit: 'SOLDIER' },
        { terrain: 'sand' },
        { terrain: 'grass' },
        { terrain: 'sand' },
        { terrain: 'sand' }],
      [{ terrain: 'sand' },
        { terrain: 'sand' },
        { terrain: 'sand' },
        { terrain: 'grass', unit: 'SMALL_TANK' },
        { terrain: 'sand' }],
      [{ terrain: 'sand' },
        { terrain: 'grass' },
        { terrain: 'sand' },
        { terrain: 'sand' },
        { terrain: 'sand', unit: 'SOLDIER' }],
    ],
    rows: 5,
  },
};

export default fromJS(initialState);
