import React from 'react';
import { shallow } from 'enzyme';
import configuration from 'configuration.json';
import { MyApp } from '../index';

test('MyApp renders', () => {
  global.configuration = configuration;
  const mockGTMComponent = () => <div></div>;
  shallow(<MyApp GTMComponent={mockGTMComponent} />);
});
