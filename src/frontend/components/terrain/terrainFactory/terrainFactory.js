import React from 'react';
import { TERRAIN, TERRAIN_TYPES } from '../../../../shared/sharedConstants';

import Grass from './../grass';
import Sand from './../sand';
import Ocean from './../ocean';
import Mountain from './../mountain';
import LandFactory from './../landFactory';

import Health from './health';

export default class UnitFactory {
  static createTerrain({ terrain, children, player, row, column, health }) { // TODO convert to arg?
    const props = { terrain: TERRAIN[terrain], player, row, column };

    const healthMarker = health ? (<Health health={health} />) : null;

    switch (TERRAIN_TYPES[terrain]) {
    case TERRAIN_TYPES.GRASS: return (<Grass {...props} >{ children }{ healthMarker }</Grass>);
    case TERRAIN_TYPES.SAND: return (<Sand {...props} >{ children }{ healthMarker }</Sand>);
    case TERRAIN_TYPES.OCEAN: return (<Ocean {...props} >{ children }{ healthMarker }</Ocean>);
    case TERRAIN_TYPES.MOUNTAIN: return (<Mountain {...props} >{ children }{ healthMarker }</Mountain>);

    case TERRAIN_TYPES.LAND_FACTORY: return (<LandFactory {...props}>{ children }{ healthMarker }</LandFactory>);
    default: return null;
    }
  }
}
