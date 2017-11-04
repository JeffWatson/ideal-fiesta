import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import MatrixViewConnected, { MatrixView } from './../matrix';
import initialState from './../reducer/initialState';

describe('frontend/components/matrix component', () => {
  it('renders correctly', () => {
    const component = shallow(<MatrixView matrix={initialState.get('matrix')} />);

    expect(component).toMatchSnapshot();
  });

  it('CONNECTED selects initial state properly', () => {
    const mockStore = configureStore()({ matrix: initialState });
    const component = shallow(<MatrixViewConnected store={mockStore} />);

    expect(component).toMatchSnapshot();
  });
});
