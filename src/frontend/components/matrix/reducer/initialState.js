import { fromJS } from 'immutable';

const initialState = {
  matrix: {
    columns: 5,
    grid: [
      [{ terrain: 'sand', unit: 'foot' },
        { terrain: 'sand', unit: 'foot' },
        { terrain: 'sand', unit: 'foot' },
        { terrain: 'sand', unit: 'foot' },
        { terrain: 'sand', unit: 'foot' }],
      [{ terrain: 'ocean', unit: 'sub' },
        { terrain: 'ocean', unit: 'sub' },
        { terrain: 'ocean', unit: 'sub' },
        { terrain: 'ocean', unit: 'sub' },
        { terrain: 'ocean', unit: 'sub' }],
      [{ terrain: 'sand', unit: 'foot' },
        { terrain: 'sand', unit: 'foot' },
        { terrain: 'sand', unit: 'foot' },
        { terrain: 'sand', unit: 'foot' },
        { terrain: 'sand', unit: 'foot' }],
      [{ terrain: 'sand', unit: 'foot' },
        { terrain: 'sand', unit: 'foot' },
        { terrain: 'sand', unit: 'foot' },
        { terrain: 'sand', unit: 'foot' },
        { terrain: 'sand', unit: 'foot' }],
      [{ terrain: 'sand', unit: 'foot' },
        { terrain: 'sand', unit: 'foot' },
        { terrain: 'sand', unit: 'foot' },
        { terrain: 'sand', unit: 'foot' },
        { terrain: 'sand', unit: 'foot' }],
    ],
    rows: 5,
  },
};

export default fromJS(initialState);
