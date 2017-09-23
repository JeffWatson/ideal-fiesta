import { fromJS } from 'immutable';

const initialState = {
  matrix: {
    columns: 5,
    rows: 5,
    grid: [
      [{ terrain: 'SAND', unit: 'SOLDIER' },
        { terrain: 'SAND' },
        { terrain: 'SAND' },
        { terrain: 'SAND', unit: 'SMALL_TANK' },
        { terrain: 'SAND' }],
      [{ terrain: 'OCEAN' },
        { terrain: 'OCEAN' },
        { terrain: 'OCEAN' },
        { terrain: 'OCEAN' },
        { terrain: 'LAND_FACTORY' }],
      [{ terrain: 'GRASS', unit: 'SOLDIER' },
        { terrain: 'SAND' },
        { terrain: 'MOUNTAIN' },
        { terrain: 'SAND' },
        { terrain: 'SAND' }],
      [{ terrain: 'SAND' },
        { terrain: 'SAND' },
        { terrain: 'SAND' },
        { terrain: 'GRASS', unit: 'SMALL_TANK' },
        { terrain: 'SAND' }],
      [{ terrain: 'SAND' },
        { terrain: 'GRASS' },
        { terrain: 'SAND' },
        { terrain: 'SAND' },
        { terrain: 'SAND', unit: 'SOLDIER' }],
    ],
  },
};

export default fromJS(initialState);
