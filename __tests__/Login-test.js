/**
 * @format
 */

import 'react-native';
import React from 'react';
import {Login} from '../src/Screens';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly login', () => {
  const tree = renderer.create(<Login />).toJSON();
  expect(tree).toMatchSnapshot();
});
