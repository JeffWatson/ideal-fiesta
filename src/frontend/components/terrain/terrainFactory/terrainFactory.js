import React from 'react';
import { TERRAIN, TERRAIN_TYPES as TYPES } from 'shared/sharedConstants';
import UnitFactory from 'components/units/unitFactory';

import Terrain from './../terrain';
import Grass from './grass';
import Sand from './sand';
import Ocean from './ocean';
import Mountain from './mountain';
import LandFactory from '../buildings/landFactory';

import Health from './../../health';
import MovePath from './movePath';

export default class TerrainFactory {
  static createTerrain({ terrain, unit, moveDirection, building, currentPlayer, row, column, selected, disabled }) {
    const player = building && building.get('player');
    const unitPlayer = unit && unit.get('player');
    const terrainProps = {
      terrain: TERRAIN[terrain],
      player,
      isCurrentPlayer: player === currentPlayer,
      row,
      column,
      currentPlayer,
      isOccupied: !!unit,
      isOccupiedByPlayer: unitPlayer === currentPlayer,
      selected,
      disabled,
    };

    const contents = (<div>
      { unit && UnitFactory.createUnit({ factoryType: 'LAND', unit, disabled }) }
      { moveDirection && (<MovePath direction={moveDirection} />) }
      { building && (<Health health={building.get('health')} className={'building'} />) }
    </div>);

    return (<Terrain {...terrainProps}>{ TerrainFactory.buildTerrainType({ terrain, terrainProps, contents }) }</Terrain>);
  }

  static buildTerrainType({ terrain, terrainProps, contents }) {
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
