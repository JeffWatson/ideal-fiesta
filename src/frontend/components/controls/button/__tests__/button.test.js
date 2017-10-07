import React from 'react';
import { shallow } from 'enzyme';
import Button from '../button';

describe('frontend/components/button component', () => {
  const props = {
    className: 'class',
    text: 'text',
    onClick: jest.fn(),
    children: (<div>Children</div>),
  };

  it('renders correctly', () => {
    const button = shallow(<Button {...props} />);

    expect(button).toMatchSnapshot();
  });

  it('invokes onClick when clicked', () => {
    const button = shallow(<Button {...props} />);

    button.find('.button').simulate('click');
    expect(props.onClick.mock.calls.length).toEqual(1);
  });
});
