import { END_TURN } from 'actions';
import endTurn from '../endTurn';

describe('frontend/components/currentPlayerHeader/actions/endTurn action', () => {
  it('should return a proper action', () => {
    expect(endTurn()).toEqual({ type: END_TURN });
  });
});
