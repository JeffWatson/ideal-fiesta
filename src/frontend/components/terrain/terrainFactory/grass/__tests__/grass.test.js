import React from 'react';
import { shallow } from 'enzyme';
import Grass from './../grass';

const props = {
  children: (<div>Children</div>),
};

describe('frontend/components/terrain/grass component', () => {
  it('renders correctly', () => {
    const component = shallow(<Grass {...props} />);

    expect(component).toMatchSnapshot();
  });
});
