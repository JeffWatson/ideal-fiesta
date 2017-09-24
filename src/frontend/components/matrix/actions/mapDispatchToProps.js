import onCellClick from './onCellClick';

export default function mapDispatchToProps(dispatch) {
  return {
    onCellClick: args => onCellClick(args, dispatch),
  };
}
