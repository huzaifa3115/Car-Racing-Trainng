/**
 * @format
 */

import 'react-native';
import React from 'react';
import {Input} from '../src/Components';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {render, cleanup} from 'react-native-testing-library';

afterEach(cleanup);

describe('<Input />', () => {
  it('should match snapshot', () => {
    const rendered = render(<Input label={'name'} />).toJSON();

    expect(rendered).toMatchSnapshot();
  });
});
