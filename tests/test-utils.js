/* eslint-disable jest/no-export */
import React from 'react';
import {mount} from 'enzyme';

const NOOP = f => f;

export const GENERIC_XYPLOT_SERIES_PROPS = {
  xDomain: [0, 1],
  xRange: [0, 1],
  xType: 'linear',
  xDistance: 1,
  yDomain: [0, 1],
  yRange: [0, 1],
  yDistance: 1,
  yType: 'linear',
  data: [
    {x: 1, y: 1},
    {x: 2, y: 2}
  ],
  _allData: [
    [
      {x: 1, y: 1},
      {x: 2, y: 2}
    ]
  ],
  onSeriesMouseOver: NOOP,
  onSeriesMouseOut: NOOP,
  onSeriesClick: NOOP,
  onSeriesRightClick: NOOP,
  onValueMouseOver: NOOP,
  onValueMouseOut: NOOP,
  onValueClick: NOOP,
  onValueRightClick: NOOP
};

export const testRenderWithProps = (Component, props, wrapWithSvg = false) =>
  // eslint-disable-next-line jest/require-top-level-describe
  test(`Rendering ${Component.displayName}`, () => {
    const wrapper = mount(
      wrapWithSvg ? (
        <svg>
          <Component {...props} />
        </svg>
      ) : (
        <Component {...props} />
      )
    );

    const component = wrapper.find(Component);
    expect(component).toHaveLength(1);

    const componentProps = component.props();
    Object.keys(props).forEach(propName => {
      expect(componentProps[propName]).toEqual(props[propName]);
    });
  });
