import React from 'react';
import { shallow } from 'enzyme';
import TerrainInfoDialog from '../terrainInfoDialog';

const props = {
  onDialogClose: jest.fn(),
  terrain: {
    defenseBonus: 10,
    actionable: true,
    selectable: true,
  },
};

describe('frontend/components/terrain/terrainInfoDialog component', () => {
  it('renders correctly', () => {
    const component = shallow(<TerrainInfoDialog {...props} />);

    expect(component).toMatchSnapshot();
  });
});
