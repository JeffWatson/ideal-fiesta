import React from 'react';
import { shallow } from 'enzyme';
import MovePath from '../movePath';

describe('frontend/components/terrain/terrainFactory/movePath component', () => {
  const props = {
    direction: 'NORTH_END',
  };

  it('renders correctly', () => {
    const button = shallow(<MovePath {...props} />);

    expect(button).toMatchSnapshot();
  });
});
