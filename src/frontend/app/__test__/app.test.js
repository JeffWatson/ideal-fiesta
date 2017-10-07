import React from 'react';
import { shallow } from 'enzyme';
import App from '../app';

describe('frontend/app', () => {
  it('renders correctly', () => {
    const app = shallow(<App />);
    expect(app).toMatchSnapshot();
  });
});

