import React from 'react';
import { func, string } from 'prop-types';

// TODO implement when adding terrain modifiers...
const TerrainInfoDialog = ({ type, onDialogClose }) => (<div className="terrain-info-dialog">
  Info Dialog for {type}
</div>);

TerrainInfoDialog.propTypes = {
  onDialogClose: func.isRequired,
  type: string.isRequired,
};

export default TerrainInfoDialog;
