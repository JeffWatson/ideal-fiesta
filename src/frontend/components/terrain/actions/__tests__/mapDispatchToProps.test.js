// TODO mock functions, figure out relative mocking...
import mapDispatchToProps from '../mapDispatchToProps';

let dispatch;
describe('frontend/components/terrain/actions/mapDispatchToProps', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('should map dispatch to props correctly', () => {
    const mapped = mapDispatchToProps(dispatch);

    expect(mapped.onLandFactoryClick).toBeTruthy();
    expect(mapped.onUnitPurchase).toBeTruthy();
    expect(mapped.onCellSelected).toBeTruthy();
    expect(mapped.onCellUnselected).toBeTruthy();
    expect(mapped.onMovementInitiated).toBeTruthy();
    expect(mapped.onRangeCheck).toBeTruthy();
  });

  it('should dispatch onUnitPurchase', () => {
    const mapped = mapDispatchToProps(dispatch);
    const args = { unit: { name: 'name' } };

    mapped.onUnitPurchase(args);

    expect(dispatch.mock.calls.length).toEqual(1);
  });

  it('should dispatch onCellSelected', () => {
    const mapped = mapDispatchToProps(dispatch);
    const args = { arg: 'arg' };

    mapped.onCellSelected(args);

    expect(dispatch.mock.calls.length).toEqual(1);
  });

  it('should dispatch onCellUnselected', () => {
    const mapped = mapDispatchToProps(dispatch);
    const args = { arg: 'arg' };

    mapped.onCellUnselected(args);

    expect(dispatch.mock.calls.length).toEqual(1);
  });

  it('should dispatch onMovementInitiated', () => {
    const mapped = mapDispatchToProps(dispatch);
    const args = { arg: 'arg' };

    mapped.onMovementInitiated(args);

    expect(dispatch.mock.calls.length).toEqual(1);
  });

  it('should dispatch onRangeCheck', () => {
    const mapped = mapDispatchToProps(dispatch);
    const args = { arg: 'arg' };

    mapped.onRangeCheck(args);

    expect(dispatch.mock.calls.length).toEqual(1);
  });
});
