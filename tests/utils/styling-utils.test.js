// Copyright (c) 2016 - 2019 Uber Technologies, Inc.
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

import {getCombinedClassName} from 'utils/styling-utils';

describe('styling-utils', () => {
  test('getCombinedClassName', () => {
    const allValidStringParams = [
      'test_class--1',
      'test_class--2',
      'test_class--3'
    ];
    const expectedAllValidStringParamsCombined =
      'test_class--1 test_class--2 test_class--3';
    const falsyValues = [null, undefined, false, '', 0, NaN];
    const nonStringValues = [
      ['invalid_class--1', 'invalid_class--2'],
      {foo: 'bar'},
      123,
      () => {
        return 'invalid_class--3';
      }
    ];

    expect(getCombinedClassName(...allValidStringParams)).toBe(
      expectedAllValidStringParamsCombined
    );

    expect(getCombinedClassName(...allValidStringParams, ...falsyValues)).toBe(
      expectedAllValidStringParamsCombined
    );

    expect(
      getCombinedClassName(...allValidStringParams, ...nonStringValues)
    ).toBe(expectedAllValidStringParamsCombined);
  });
});
