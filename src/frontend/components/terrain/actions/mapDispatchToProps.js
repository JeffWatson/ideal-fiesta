import onLandFactoryClick from './onLandFactoryClick';
import onUnitPurchase from './onUnitPurchase';

export default function mapDispatchToProps(dispatch) {
  return {
    onLandFactoryClick: args => dispatch(onLandFactoryClick(args)),
    onUnitPurchase: args => dispatch(onUnitPurchase(args)),
  };
}
