// TODO move to only be used in tests!
import { fromJS } from 'immutable';

const initialState = {
  matrix: {
    currentPlayer: 'BLUE',
    columns: 5,
    rows: 5,
    players: ['BLUE', 'GREEN', 'RED', 'YELLOW'],
    grid: [
      [{ terrain: 'SAND', unit: { actor: 'SOLDIER', health: 20, player: 'GREEN' } },
        { terrain: 'SAND' },
        { terrain: 'SAND' },
        { terrain: 'SAND', unit: { actor: 'SMALL_TANK', health: 20, player: 'RED' } },
        { terrain: 'SAND' }],
      [{ terrain: 'OCEAN' },
        { terrain: 'OCEAN' },
        { terrain: 'OCEAN' },
        { terrain: 'OCEAN' },
        { terrain: 'LAND_FACTORY', building: { health: 20, player: 'RED' } }],
      [{ terrain: 'GRASS' },
        { terrain: 'SAND' },
        { terrain: 'MOUNTAIN' },
        { terrain: 'GRASS', unit: { actor: 'SOLDIER', health: 20, player: 'BLUE' } },
        { terrain: 'SAND' }],
      [{ terrain: 'LAND_FACTORY', building: { health: 20, player: 'BLUE' } },
        { terrain: 'SAND' },
        { terrain: 'SAND' },
        { terrain: 'GRASS', unit: { actor: 'SOLDIER', health: 20, player: 'BLUE' } },
        { terrain: 'SAND' }],
      [{ terrain: 'SAND' },
        { terrain: 'GRASS' },
        { terrain: 'SAND', unit: { actor: 'SMALL_TANK', health: 20, player: 'BLUE' } },
        { terrain: 'SAND' },
        { terrain: 'SAND', unit: { actor: 'SOLDIER', health: 20, player: 'YELLOW' } }],
    ],
  },
};

export default fromJS(initialState);
