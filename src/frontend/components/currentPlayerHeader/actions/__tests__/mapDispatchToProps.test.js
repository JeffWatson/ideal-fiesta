import mapDispatchToProps from '../mapDispatchToProps';

let dispatch;
describe('frontend/components/currentPlayerHeader/actions/mapDispatchToProps', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('should map dispatch to props correctly', () => {
    const mapped = mapDispatchToProps(dispatch);

    expect(mapped.endTurn).toBeTruthy();
  });

  it('should dispatch endTurn', () => {
    const mapped = mapDispatchToProps(dispatch);
    const args = { arg: 'arg' };

    mapped.endTurn(args);

    expect(dispatch.mock.calls.length).toEqual(1);
    expect(dispatch.mock.calls[0][0].type).toEqual('END_TURN');
  });
});
