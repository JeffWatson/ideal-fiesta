import React from 'react';
import { TERRAIN, TERRAIN_TYPES } from '../../../../shared/sharedConstants';

import Grass from './../grass';
import Sand from './../sand';
import Ocean from './../ocean';
import Mountain from './../mountain';
import LandFactory from './../landFactory';

import Health from './health';
import MovePath from './movePath';

export default class UnitFactory {
  static createTerrain({ terrain, children, player, row, column, health, moveDirection }) { // TODO convert to arg?
    const terrainProps = { terrain: TERRAIN[terrain], player, row, column };

    const healthMarker = health ? (<Health health={health} />) : null;
    const pathMarker = moveDirection ? (<MovePath direction={moveDirection} />) : null;

    const contents = (<div>{ children }{ pathMarker }{ healthMarker }</div>);

    switch (TERRAIN_TYPES[terrain]) {
    case TERRAIN_TYPES.GRASS: return (<Grass {...terrainProps} >{ contents }</Grass>);
    case TERRAIN_TYPES.SAND: return (<Sand {...terrainProps} >{ contents }</Sand>);
    case TERRAIN_TYPES.OCEAN: return (<Ocean {...terrainProps} >{ contents }</Ocean>);
    case TERRAIN_TYPES.MOUNTAIN: return (<Mountain {...terrainProps} >{ contents }</Mountain>);

    case TERRAIN_TYPES.LAND_FACTORY: return (<LandFactory {...terrainProps}>{ contents }</LandFactory>);
    default: return null;
    }
  }
}
