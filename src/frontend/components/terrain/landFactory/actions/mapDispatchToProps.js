import onLandFactoryClick from './onLandFactoryClick';

export default function mapDispatchToProps(dispatch) {
  return {
    onLandFactoryClick: args => onLandFactoryClick(args, dispatch),
  };
}
