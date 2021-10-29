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

import {scaleLinear} from 'd3-scale';
import {range} from 'd3-array';

import {
  getTicksTotalFromSize,
  getTickValues,
  getAxisAngle,
  generateFit,
  generatePoints
} from 'utils/axis-utils';

describe('axis-utils', () => {
  test('getTicksTotalFromSize', () => {
    expect(getTicksTotalFromSize(0) === 5).toBeTruthy();
    expect(getTicksTotalFromSize(301) === 10).toBeTruthy();
    expect(getTicksTotalFromSize(701) === 20).toBeTruthy();
  });

  test('getTickValues', () => {
    const scale = scaleLinear()
      .domain([0, 1])
      .range(['red', 'blue']);
    expect(
      getTickValues(scale, 10, false).map(d => Math.round(d * 1000) / 1000)
    ).toEqual([0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]);

    const predefinedVals = ['got dang', 1, undefined, 'lolz'];
    expect(getTickValues(scale, 10, predefinedVals)).toEqual(predefinedVals);
  });

  test('getAxisAngle', () => {
    expect(getAxisAngle({x: 0, y: 0}, {x: 1, y: 1})).toBe(Math.PI / 4);
    expect(getAxisAngle({x: 0, y: 0}, {x: 0, y: 1})).toBe(Math.PI / 2);
    expect(getAxisAngle({x: 0, y: 0}, {x: 0, y: -1})).toBe((3 * Math.PI) / 2);
  });

  test('generateFit', () => {
    expect(generateFit({x: 0, y: 0}, {x: 1, y: 1})).toEqual({
      left: 0,
      offset: 0,
      right: 1,
      slope: 1
    });
    expect(generateFit({x: 0, y: 0}, {x: 0, y: 1})).toEqual({
      left: 0,
      offset: 0,
      right: 1,
      slope: 0
    });
    expect(generateFit({x: 0, y: 0}, {x: 0, y: -1})).toEqual({
      left: 0,
      offset: 0,
      right: -1,
      slope: 0
    });
    const result = generateFit(
      {x: 175, y: 125},
      {x: 17.33044811707665, y: 179.23546738969475}
    );
    const numberOfTicks = 5;
    const left = result.left;
    const right = result.right;
    const pointSlope = (right - left) / numberOfTicks;
    const lengthOfGeneratedPoints = range(left, right + pointSlope, pointSlope)
      .length;
    expect(lengthOfGeneratedPoints).toBe(7);
  });

  test('generatePoints', () => {
    const result = generatePoints({
      axisStart: {x: 0, y: 1},
      axisEnd: {x: 1, y: 1},
      numberOfTicks: 5,
      axisDomain: [10, 100]
    });
    const expectedResult = {
      points: [
        {text: 10, y: 1, x: 0},
        {text: 28, y: 1, x: 0.2},
        {text: 46, y: 1, x: 0.4},
        {text: 64, y: 1, x: 0.6000000000000001},
        {text: 82, y: 1, x: 0.8},
        {text: 100, y: 1, x: 1}
      ],
      slope: -0
    };
    // const result2 = generatePoints({
    //   axisStart: {x: 175, y: 125},
    //   axisEnd: {x: 17.33044811707665, y: 179.23546738969475},
    //   numberOfTicks: 5,
    //   axisDomain: [0, 100]
    // });
    const expectedResult2 = {
      points: [
        {text: 0, y: 125.00000000000001, x: 175},
        {text: 20, y: 135.84709347793896, x: 143.46608962341534},
        {text: 40, y: 146.6941869558779, x: 111.93217924683066},
        {text: 59.99999999999999, y: 157.54128043381687, x: 80.398268870246},
        {text: 80, y: 168.38837391175582, x: 48.86435849366133},
        {text: 100, y: 179.23546738969478, x: 17.330448117076656}
      ],
      slope: -0.34398187057680607
    };
    const result3 = generatePoints({
      axisStart: {x: 175, y: 125},
      axisEnd: {x: 175, y: 250},
      numberOfTicks: 5,
      axisDomain: [0, 100]
    });
    const expectedResult3 = {
      points: [
        {text: 0, y: 125, x: 175},
        {text: 20, y: 150, x: 175},
        {text: 40, y: 175, x: 175},
        {text: 60, y: 200, x: 175},
        {text: 80, y: 225, x: 175},
        {text: 100, y: 250, x: 175}
      ],
      slope: Infinity
    };
    const result4 = generatePoints({
      axisStart: {x: 175, y: 125},
      axisEnd: {x: 174.99999999999997, y: 250},
      numberOfTicks: 5,
      axisDomain: [0, 100]
    });
    const expectedResult4 = {
      points: [
        {text: 0, y: 128, x: 175},
        {text: 0, y: 128, x: 175},
        {text: 0, y: 128, x: 175},
        {text: 100, y: 256, x: 174.99999999999997},
        {text: 100, y: 256, x: 174.99999999999997}
      ],
      slope: -4398046511104000
    };
    expect(result).toEqual(expectedResult);

    // Relies on testing library to handle differences in floating point numbers.
    // t.deepEqual(result2, expectedResult2);
    expect(expectedResult2.points.length).toBe(6);
    expect(result3).toEqual(expectedResult3);
    expect(result4).toEqual(expectedResult4);
  });
});
