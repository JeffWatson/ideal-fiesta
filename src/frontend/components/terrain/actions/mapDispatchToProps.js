import onLandFactoryClick from './onLandFactoryClick'; // TODO is this used anymore?
import onUnitPurchase from './onUnitPurchase';
import onCellSelected from './onCellSelected';
import onCellUnselected from './onCellUnselected';
import onMovementInitiated from './onMovementInitiated';
import onRangeCheck from './onRangeCheck';

export default function mapDispatchToProps(dispatch) {
  return {
    onLandFactoryClick: args => dispatch(onLandFactoryClick(args)),
    onUnitPurchase: args => dispatch(onUnitPurchase(args)),
    onCellSelected: args => dispatch(onCellSelected(args)),
    onCellUnselected: args => dispatch(onCellUnselected(args)),
    onMovementInitiated: args => dispatch(onMovementInitiated(args)),
    onRangeCheck: args => dispatch(onRangeCheck(args)),
  };
}
