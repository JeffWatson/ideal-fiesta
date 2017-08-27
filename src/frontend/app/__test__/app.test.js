import React from 'react';
import renderer from 'react-test-renderer';
import App from '../app';

describe('frontend/app', () => {
  it('renders correctly', () => {
    const app = renderer.create(<App />);
    expect(app).toMatchSnapshot();
  });
});

