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
import ShowcaseButton from '../showcase-components/showcase-button';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalBarSeriesCanvas,
  LabelSeries
} from 'react-vis';

export default class Example extends React.Component {
  state = {
    useCanvas: false
  };
  render() {
    const {useCanvas} = this.state;
    const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;
    const content = useCanvas ? 'TOGGLE TO SVG' : 'TOGGLE TO CANVAS';
    const data = [
      [
        {x: 1, y: 8},
        {x: 3, y: 5},
        {x: 4, y: 15}
      ],
      [
        {x: 3, y: 9},
        {x: 4, y: 2},
        {x: 5, y: 7}
      ],
      [
        {x: 2, y: 11},
        {x: 3, y: 7},
        {x: 4, y: 9}
      ]
    ];
    const labelsData = data.map(value =>
      value.map(tuple => ({x: tuple.x, y: tuple.y, label: tuple.y.toString()}))
    );

    const bars = data.map((value, index) => (
      <BarSeries data={value} key={index} />
    ));
    const labels = labelsData.map((value, index) => (
      <LabelSeries
        data={value}
        key={index}
        labelAnchorY="hanging"
        style={{fill: '#ff8c00'}}
      />
    ));

    return (
      <div>
        <ShowcaseButton
          onClick={() => this.setState({useCanvas: !useCanvas})}
          buttonContent={content}
        />
        <XYPlot width={300} height={300} stackBy="y">
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          {bars}
          {labels}
        </XYPlot>
      </div>
    );
  }
}
