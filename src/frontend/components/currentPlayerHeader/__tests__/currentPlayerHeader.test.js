import React from 'react';
import { shallow } from 'enzyme';
import { CurrentPlayerHeader } from './../currentPlayerHeader';
import initialState from './../reducer/initialState';

const props = {
  currentPlayer: initialState.get('currentPlayer'),
  endTurn: () => {},
};

describe('frontend/components/CurrentPlayerHeader component', () => {
  it('renders correctly', () => {
    const component = shallow(<CurrentPlayerHeader {...props} />);

    expect(component).toMatchSnapshot();
  });
});
