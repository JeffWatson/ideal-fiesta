import React from 'react';
import { bool, func, number, shape } from 'prop-types';
import Dialog from 'components/controls/dialog';

// TODO implement when adding terrain modifiers...
const TerrainInfoDialog = ({ terrain, onDialogClose }) => (<Dialog onClose={() => onDialogClose()}>
  <div className="terrain-info-dialog">
    {JSON.stringify(terrain)}
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
