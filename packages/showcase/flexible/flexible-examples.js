// Copyright (c) 2016 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React from 'react';

import {
  VerticalBarSeries,
  FlexibleWidthXYPlot,
  FlexibleHeightXYPlot,
  FlexibleXYPlot
} from 'react-vis';

const data = [
  {x: 0, y: 8},
  {x: 1, y: 5},
  {x: 2, y: 4},
  {x: 3, y: 9},
  {x: 4, y: 1},
  {x: 5, y: 7},
  {x: 6, y: 6},
  {x: 7, y: 3},
  {x: 8, y: 2}
];

const defaultProps = {
  margin: {top: 10, left: 10, right: 10, bottom: 10}
};

export const FlexibleCharts = ({height, width}) => (
  <div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
        width: width || '60vw'
      }}
    >
      <div style={{width: '30%'}}>Flexible width - fixed height</div>
      <div style={{width: '30%'}}>Flexible height - fixed width</div>
      <div style={{width: '30%'}}>Flexible width and height</div>
    </div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
        width: width || '60vw',
        height: height || '30vh'
      }}
    >
      <div
        className="flexible-width"
        style={{width: '30%', height: '100%', border: '1px solid #ccc'}}
      >
        <FlexibleWidthXYPlot {...defaultProps} height={100}>
          <VerticalBarSeries data={data} />
        </FlexibleWidthXYPlot>
      </div>
      <div
        className="flexible-height"
        style={{width: '30%', height: '100%', border: '1px solid #ccc'}}
      >
        <FlexibleHeightXYPlot {...defaultProps} width={100}>
          <VerticalBarSeries data={data} />
        </FlexibleHeightXYPlot>
      </div>
      <div
        className="flexible-vis"
        style={{width: '30%', height: '100%', border: '1px solid #ccc'}}
      >
        <FlexibleXYPlot {...defaultProps}>
          <VerticalBarSeries data={data} />
        </FlexibleXYPlot>
      </div>
    </div>
  </div>
);
