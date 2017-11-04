import { fromJS } from 'immutable';
import mapStateToProps from '../mapStateToProps';

describe('frontend/components/terrain/selector/mapStateToProps', () => {
  it('should select state correctly', () => {
    const selectedState = mapStateToProps({ terrain: fromJS({ isMovementMode: 'isMovementMode' }) });

    expect(selectedState.isMovementMode).toEqual('isMovementMode');
  });
});
