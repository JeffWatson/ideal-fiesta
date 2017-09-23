import React from 'react';
import { fromJS } from 'immutable';
import { TERRAIN, TERRAIN_TYPES } from '../../../../shared/sharedConstants';

import Grass from './../grass';
import Sand from './../sand';
import Ocean from './../ocean';
import Mountain from './../mountain';

export default class UnitFactory {
  static createTerrain({ terrain, children }) {
    const props = fromJS(TERRAIN[terrain]);

    switch (TERRAIN_TYPES[terrain]) {
    case TERRAIN_TYPES.GRASS: return (<Grass {...props} >{ children }</Grass>);
    case TERRAIN_TYPES.SAND: return (<Sand {...props} >{ children }</Sand>);
    case TERRAIN_TYPES.OCEAN: return (<Ocean {...props} >{ children }</Ocean>);
    case TERRAIN_TYPES.MOUNTAIN: return (<Mountain {...props} >{ children }</Mountain>);
    default: return null;
    }
  }
}
