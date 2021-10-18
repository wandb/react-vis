import React from 'react';
import {mount} from 'enzyme';
import Borders from 'plot/borders';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';
import GradientExample from '../../../showcase/misc/gradient-example';

testRenderWithProps(
  Borders,
  {
    ...GENERIC_XYPLOT_SERIES_PROPS,
    marginLeft: 0,
    marginRight: 0,
    innerWidth: 100,
    marginTop: 0,
    marginBottom: 0,
    innerHeight: 100
  },
  true
);

describe('Borders', () => {
  test('GradientExample', () => {
    const $ = mount(<GradientExample />);
    expect($.find('.rv-xy-plot__borders').length).toBe(1);
    expect($.find('.rv-xy-plot__borders rect').length).toBe(4);
  });
});
