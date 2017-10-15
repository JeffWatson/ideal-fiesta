import React from 'react';
import { map } from 'lodash';
import { func, string } from 'prop-types';
import Button from 'components/controls/button/button';

// TODO implement when adding terrain modifiers...
const TerrainInfoDialog = ({ type, onDialogClose }) => (<div className="terrain-info-dialog">
  <Button onClick={() => onDialogClose()} text="close" />
  Info Dialog for {type}
</div>);

TerrainInfoDialog.propTypes = {
  onDialogClose: func.isRequired,
  type: string.isRequired,
};

export default TerrainInfoDialog;
