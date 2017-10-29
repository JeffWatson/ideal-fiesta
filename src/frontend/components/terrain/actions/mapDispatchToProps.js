import onLandFactoryClick from './onLandFactoryClick';
import onUnitPurchase from './onUnitPurchase';
import onCellSelected from './onCellSelected';
import onCellUnselected from './onCellUnselected';

export default function mapDispatchToProps(dispatch) {
  return {
    onLandFactoryClick: args => dispatch(onLandFactoryClick(args)),
    onUnitPurchase: args => dispatch(onUnitPurchase(args)),
    onCellSelected: args => dispatch(onCellSelected(args)),
    onCellUnselected: args => dispatch(onCellUnselected(args)),
  };
}
