import React from 'react';
import { TERRAIN, TERRAIN_TYPES as TYPES } from '../../../../shared/sharedConstants';

import Grass from './../grass';
import Sand from './../sand';
import Ocean from './../ocean';
import Mountain from './../mountain';
import LandFactory from './../landFactory';

import Health from './health';
import MovePath from './movePath';

export default class UnitFactory {
  static createTerrain({ terrain, children, player, row, column, health, moveDirection }) {
    const terrainProps = { terrain: TERRAIN[terrain], player, row, column };

    const healthMarker = health ? (<Health health={health} />) : null;
    const pathMarker = moveDirection ? (<MovePath direction={moveDirection} />) : null;

    const contents = (<div>{ children }{ pathMarker }{ healthMarker }</div>);

    switch (TYPES[terrain]) {
    case TYPES.GRASS: return (<Grass {...terrainProps} >{ contents }</Grass>);
    case TYPES.SAND: return (<Sand {...terrainProps} >{ contents }</Sand>);
    case TYPES.OCEAN: return (<Ocean {...terrainProps} >{ contents }</Ocean>);
    case TYPES.MOUNTAIN: return (<Mountain {...terrainProps} >{ contents }</Mountain>);

    case TYPES.LAND_FACTORY: return (<LandFactory {...terrainProps}>{ contents }</LandFactory>);
    default: return null;
    }
  }
}
