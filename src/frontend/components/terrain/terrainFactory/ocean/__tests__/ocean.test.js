import React from 'react';
import { shallow } from 'enzyme';
import Ocean from './../ocean';

const props = {
  children: (<div>Children</div>),
};

describe('frontend/components/terrain/ocean component', () => {
  it('renders correctly', () => {
    const component = shallow(<Ocean {...props} />);

    expect(component).toMatchSnapshot();
  });
});