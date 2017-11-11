import React from 'react';
import { shallow } from 'enzyme';
import { MyApp } from '../index';

test('MyApp renders', () => {
  shallow(<MyApp />);
});
