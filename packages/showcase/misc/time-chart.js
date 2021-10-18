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

import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries
} from 'react-vis';

const MSEC_DAILY = 86400000;

export default function Example() {
  const timestamp = new Date('September 9 2017').getTime();
  return (
    <XYPlot xType="time" width={300} height={300}>
      <HorizontalGridLines />
      <VerticalGridLines />
      <XAxis title="X Axis" />
      <YAxis title="Y Axis" />
      <LineSeries
        data={[
          {x: timestamp + MSEC_DAILY, y: 3},
          {x: timestamp + MSEC_DAILY * 2, y: 5},
          {x: timestamp + MSEC_DAILY * 3, y: 15},
          {x: timestamp + MSEC_DAILY * 4, y: 12}
        ]}
      />
      <LineSeries data={null} />
      <LineSeries
        data={[
          {x: timestamp + MSEC_DAILY, y: 10},
          {x: timestamp + MSEC_DAILY * 2, y: 4},
          {x: timestamp + MSEC_DAILY * 3, y: 2},
          {x: timestamp + MSEC_DAILY * 4, y: 15}
        ]}
      />
    </XYPlot>
  );
}
