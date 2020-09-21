/**
 * @format
 */

import 'react-native';
import React from 'react';
import {Register} from '../src/Screens';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly Register', () => {
  renderer.create(<Register />);
});
