import React from 'react';
import { map } from 'lodash';
import { func, string } from 'prop-types';
import Button from 'components/controls/button';
import Dialog from 'components/controls/dialog';
import { UNITS, UNITS_BY_TYPE } from 'shared/sharedConstants';

const FactoryPurchaseDialog = ({ type, onUnitPurchase, onDialogClose }) => (<Dialog onClose={() => onDialogClose()}>
  <div className="land-factory-purchase-dialog">
    {map(UNITS_BY_TYPE[type], (unit) => {
      const unitProps = UNITS[unit.name];
      return (<div className="purchase-unit" key={`purchase-unit-${unit.name}`}>
        <Button onClick={() => onUnitPurchase(unit)}>
          {unitProps.name}
        </Button>
      </div>);
    })}
  </div>
</Dialog>);

FactoryPurchaseDialog.propTypes = {
  onUnitPurchase: func.isRequired,
  onDialogClose: func.isRequired,
  type: string.isRequired,
};

export default FactoryPurchaseDialog;
