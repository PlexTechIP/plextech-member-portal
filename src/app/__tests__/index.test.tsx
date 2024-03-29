/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import { App } from '../index';

const renderer = createRenderer();

describe('<App />', () => {
  // test that does nothing
  it('should render and match the snapshot', () => {
    renderer.render(<App />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
