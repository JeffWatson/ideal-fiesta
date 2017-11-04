import React from 'react';
import { bool, func, number, shape } from 'prop-types';
import Dialog from 'components/controls/dialog';

import './terrainInfoDialog.scss';

// TODO add terrain modifiers...
const TerrainInfoDialog = ({ terrain, onDialogClose }) => (<Dialog onClose={() => onDialogClose()}>
  <div className="terrain-info-dialog">
    <div className="defense">
      DEF: { terrain.defenseBonus }
    </div>
  </div>
</Dialog>);

TerrainInfoDialog.propTypes = {
  onDialogClose: func.isRequired,
  terrain: shape({
    defenseBonus: number.isRequired,
    actionable: bool.isRequired,
    selectable: bool.isRequired,
  }).isRequired,
};

export default TerrainInfoDialog;
