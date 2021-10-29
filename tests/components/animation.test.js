// Copyright (c) 2016 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React from 'react';
import {mount} from 'enzyme';

import Animation from 'animation';
import Axis from 'plot/axis/axis';
import AxisTicks from 'plot/axis/axis-ticks';
import VerticalBarSeries from 'plot/series/vertical-bar-series';
import XYPlot from 'plot/xy-plot';

describe('Animation', () => {
  test('interpolates xDomain when specified', () => {
    const wrapper = mount(
      <XYPlot width={300} height={300}>
        <VerticalBarSeries data={[{x: 1, y: 0}]} />
        <Axis
          attr={'x'}
          animation={{nonAnimatedProps: ['xDomain']}}
          xDomain={['Black']}
        />
      </XYPlot>
    );

    const renderedAnimationWrapper = wrapper.find(Animation);

    expect(renderedAnimationWrapper.find(AxisTicks).prop('xDomain')).toEqual([
      'Black'
    ]);
  });
});
