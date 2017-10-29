import React from 'react';
import { shallow } from 'enzyme';
import Mountain from './../mountain';

const props = {
  children: (<div>Children</div>),
};

describe('frontend/components/terrain/mountain component', () => {
  it('renders correctly', () => {
    const component = shallow(<Mountain {...props} />);

    expect(component).toMatchSnapshot();
  });
});
