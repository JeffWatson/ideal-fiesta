import React from 'react';
import { func, string } from 'prop-types';
import Dialog from 'components/controls/dialog';

// TODO implement when adding terrain modifiers...
const TerrainInfoDialog = ({ type, onDialogClose }) => (<Dialog onClose={() => onDialogClose()}>
  <div className="terrain-info-dialog">
  Info Dialog for {type}
  </div>
</Dialog>);

TerrainInfoDialog.propTypes = {
  onDialogClose: func.isRequired,
  type: string.isRequired,
};

export default TerrainInfoDialog;
