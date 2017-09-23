import React from 'react';
import { TERRAIN, TERRAIN_TYPES } from '../../../../shared/sharedConstants';

import Grass from './../grass';
import Sand from './../sand';
import Ocean from './../ocean';
import Mountain from './../mountain';
import LandFactory from './../landFactory';

export default class UnitFactory {
  static createTerrain({ terrain, children, player, row, column }) {
    const props = { terrain: TERRAIN[terrain], player, row, column };

    switch (TERRAIN_TYPES[terrain]) {
    case TERRAIN_TYPES.GRASS: return (<Grass {...props} >{ children }</Grass>);
    case TERRAIN_TYPES.SAND: return (<Sand {...props} >{ children }</Sand>);
    case TERRAIN_TYPES.OCEAN: return (<Ocean {...props} >{ children }</Ocean>);
    case TERRAIN_TYPES.MOUNTAIN: return (<Mountain {...props} >{ children }</Mountain>);

    case TERRAIN_TYPES.LAND_FACTORY: return (<LandFactory {...props}>{ children }</LandFactory>);
    default: return null;
    }
  }
}
