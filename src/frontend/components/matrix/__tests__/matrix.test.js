import React from 'react';
import { shallow } from 'enzyme';
import { MatrixView } from './../matrix';
import initialState from './../reducer/initialState';

describe('frontend/components/matrix component', () => {
  it('renders correctly', () => {
    const component = shallow(<MatrixView matrix={initialState.get('matrix')} />);

    expect(component).toMatchSnapshot();
  });
});
