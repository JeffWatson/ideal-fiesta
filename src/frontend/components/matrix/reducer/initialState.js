import { fromJS } from 'immutable';


// TODO need to refactor units... they should have health. Buildings too.
const initialState = {
  matrix: {
    currentPlayer: 'BLUE',
    columns: 5,
    rows: 5,
    players: ['BLUE', 'GREEN', 'RED', 'YELLOW'],
    grid: [
      [{ terrain: 'SAND', unit: 'SOLDIER', health: 20, player: 'GREEN' },
        { terrain: 'SAND' },
        { terrain: 'SAND' },
        { terrain: 'SAND', unit: 'SMALL_TANK', health: 20, player: 'RED' },
        { terrain: 'SAND' }],
      [{ terrain: 'OCEAN' },
        { terrain: 'OCEAN' },
        { terrain: 'OCEAN' },
        { terrain: 'OCEAN' },
        { terrain: 'LAND_FACTORY', health: 20, player: 'RED' }],
      [{ terrain: 'GRASS' },
        { terrain: 'SAND' },
        { terrain: 'MOUNTAIN' },
        { terrain: 'SAND' },
        { terrain: 'SAND' }],
      [{ terrain: 'SAND' },
        { terrain: 'SAND' },
        { terrain: 'SAND' },
        { terrain: 'GRASS', unit: 'SMALL_TANK', health: 20, player: 'BLUE' },
        { terrain: 'SAND' }],
      [{ terrain: 'SAND' },
        { terrain: 'GRASS' },
        { terrain: 'SAND', unit: 'SOLDIER', health: 20, player: 'BLUE' },
        { terrain: 'SAND' },
        { terrain: 'SAND', unit: 'SOLDIER', health: 20, player: 'YELLOW' }],
    ],
  },
};

export default fromJS(initialState);
