import { fromJS } from 'immutable';


// TODO need to refactor units... they should have health. Buildings too.
const initialState = {
  matrix: {
    columns: 5,
    rows: 5,
    grid: [
      [{ terrain: 'SAND', unit: 'SOLDIER', health: 20 },
        { terrain: 'SAND' },
        { terrain: 'SAND' },
        { terrain: 'SAND', unit: 'SMALL_TANK', health: 20 },
        { terrain: 'SAND' }],
      [{ terrain: 'OCEAN' },
        { terrain: 'OCEAN' },
        { terrain: 'OCEAN' },
        { terrain: 'OCEAN' },
        { terrain: 'LAND_FACTORY', health: 20 }],
      [{ terrain: 'GRASS', unit: 'SOLDIER', health: 20 },
        { terrain: 'SAND' },
        { terrain: 'MOUNTAIN' },
        { terrain: 'SAND' },
        { terrain: 'SAND' }],
      [{ terrain: 'SAND' },
        { terrain: 'SAND' },
        { terrain: 'SAND' },
        { terrain: 'GRASS', unit: 'SMALL_TANK', health: 20 },
        { terrain: 'SAND' }],
      [{ terrain: 'SAND' },
        { terrain: 'GRASS' },
        { terrain: 'SAND' },
        { terrain: 'SAND' },
        { terrain: 'SAND', unit: 'SOLDIER', health: 20 }],
    ],
  },
};

export default fromJS(initialState);
