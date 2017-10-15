import React from 'react';
import { map } from 'lodash';
import { func, string } from 'prop-types';
import Button from 'components/controls/button/button';
import { UNITS, UNITS_BY_TYPE } from 'shared/sharedConstants';

const FactoryPurchaseDialog = ({ type, onUnitClick, onDialogClose }) => (<div className="land-factory-purchase-dialog">
  <div className="dialog-close">
    <Button className="close" onClick={() => onDialogClose()} text="Close" />
  </div>
  {map(UNITS_BY_TYPE[type], (unit) => {
    const unitProps = UNITS[unit.name];
    return (<div className="purchase-unit" >
      <Button onClick={() => onUnitClick(unit)}>
        Purchase dialog {unitProps.name}
      </Button>
    </div>);
  })}
</div>);

FactoryPurchaseDialog.propTypes = {
  onUnitClick: func.isRequired,
  onDialogClose: func.isRequired,
  type: string.isRequired,
};

export default FactoryPurchaseDialog;
