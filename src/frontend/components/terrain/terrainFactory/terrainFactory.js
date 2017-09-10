import React from 'react';
import { extend, upperCase } from 'lodash';
import { fromJS } from 'immutable';
import { TERRAIN } from '../../../../shared/sharedConstants';

import Grass from './../grass';
import Sand from './../sand';
import Ocean from './../ocean';

export default class UnitFactory {
  static createTerrain({ terrain, children }) {
    const props = fromJS(extend(TERRAIN[upperCase(terrain)]));

    switch (props.get('name')) {
    case TERRAIN.GRASS.name: return (<Grass {...props} >{ children }</Grass>);
    case TERRAIN.SAND.name: return (<Sand {...props} >{ children }</Sand>);
    case TERRAIN.OCEAN.name: return (<Ocean {...props} >{ children }</Ocean>);
    default: return null;
    }
  }
}
