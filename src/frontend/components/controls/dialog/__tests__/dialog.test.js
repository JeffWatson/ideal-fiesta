import React from 'react';
import { shallow } from 'enzyme';
import Dialog from '../dialog';

describe('frontend/components/dialog component', () => {
  const props = {
    className: 'class',
    onClose: jest.fn(),
    children: (<div>Children</div>),
  };

  it('renders correctly', () => {
    const button = shallow(<Dialog {...props} />);

    expect(button).toMatchSnapshot();
  });

  it('invokes onClick when clicked', () => {
    const button = shallow(<Dialog {...props} />);

    button.find('.close').simulate('click');
    expect(props.onClose.mock.calls.length).toEqual(1);
  });
});
