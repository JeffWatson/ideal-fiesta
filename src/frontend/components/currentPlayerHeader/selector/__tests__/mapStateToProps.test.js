import { fromJS } from 'immutable';
import mapStateToProps from '../mapStateToProps';

describe('frontend/components/currentPlayerHeader/selector/mapStateToProps', () => {
  it('should select state correctly', () => {
    const selectedState = mapStateToProps({ currentPlayerHeader: fromJS({ currentPlayer: 'currentPlayer' }) });

    expect(selectedState.currentPlayer).toEqual('currentPlayer');
  });
});
