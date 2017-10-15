import React from 'react';
import { shallow } from 'enzyme';
import { UNIT_TYPES } from 'shared/sharedConstants';
import FactoryPurchaseDialog from './../factoryPurchaseDialog';

const props = {
  onUnitClick: () => {},
  onDialogClose: () => {},
};

describe('frontend/components/terrain/buildings/FactoryPurchaseDialog component', () => {
  it('renders correctly; AIR', () => {
    props.type = UNIT_TYPES.AIR;
    const component = shallow(<FactoryPurchaseDialog {...props} />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly; LAND', () => {
    props.type = UNIT_TYPES.LAND;
    const component = shallow(<FactoryPurchaseDialog {...props} />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly; SEA', () => {
    props.type = UNIT_TYPES.SEA;
    const component = shallow(<FactoryPurchaseDialog {...props} />);

    expect(component).toMatchSnapshot();
  });
});
