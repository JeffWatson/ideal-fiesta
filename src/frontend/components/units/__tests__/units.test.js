import React from 'react';
import { shallow } from 'enzyme';

import Artillery from '../artillery';
import SmallTank from '../smallTank';
import Soldier from '../soldier';

const props = {
  player: 'BLUE',
};

describe('frontend/components/units ALL UNIT tests', () => {
  it('should render Artillery correctly', () => {
    const unit = shallow(<Artillery {...props} />);

    expect(unit).toMatchSnapshot();
  });

  it('should render SmallTank correctly', () => {
    const unit = shallow(<SmallTank {...props} />);

    expect(unit).toMatchSnapshot();
  });

  it('should render Soldier correctly', () => {
    const unit = shallow(<Soldier {...props} />);

    expect(unit).toMatchSnapshot();
  });
});
