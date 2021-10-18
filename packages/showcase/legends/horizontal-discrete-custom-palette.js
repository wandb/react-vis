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

import React, {Component} from 'react';

import DiscreteColorLegend from 'react-vis/legends/discrete-color-legend';

const ITEMS = [
  'Options',
  'Buttons',
  'Select boxes',
  'Date inputs',
  'Password inputs',
  'Forms',
  'Other'
];

const COLORS = [
  '#6588cd',
  '#66b046',
  '#a361c7',
  '#ad953f',
  '#c75a87',
  '#55a47b',
  '#cb6141'
];

export default class HorizontalDiscreteColorPalette extends Component {
  state = {
    hoveredItem: false
  };
  render() {
    const {hoveredItem} = this.state;
    return (
      <DiscreteColorLegend
        colors={COLORS}
        onItemMouseEnter={i => this.setState({hoveredItem: i})}
        onItemMouseLeave={() => this.setState({hoveredItem: false})}
        orientation="horizontal"
        width={300}
        items={ITEMS.map((item, key) =>
          hoveredItem === item ? (
            <div key={key}>
              {item}
              <br />
              {'SELECTED'}
            </div>
          ) : (
            item
          )
        )}
      />
    );
  }
}
