import React from 'react';
import { shallow } from 'enzyme';
import Sand from './../sand';

const props = {
  children: (<div>Children</div>),
};

describe('frontend/components/terrain/sand component', () => {
  it('renders correctly', () => {
    const component = shallow(<Sand {...props} />);

    expect(component).toMatchSnapshot();
  });
});