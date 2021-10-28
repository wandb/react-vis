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

import React, {useState, useEffect} from 'react';

import {XYPlot, ArcSeries} from 'react-vis';

import {EXTENDED_DISCRETE_COLOR_RANGE} from 'react-vis/theme';

const PI = Math.PI;

function getSeconds() {
  return Math.floor(new Date().getTime() / 1000);
}

export default function ClockExample() {
  const [time, setTime] = useState(getSeconds());
  useEffect(() => {
    const handle = setInterval(() => setTime(getSeconds()), 100);
    return () => clearInterval(handle);
  }, []);
  const seconds = time % 60;
  const minutes = (time / 60) % 60;
  const hours = (time / (60 * 24)) % 24;
  return (
    <XYPlot
      xDomain={[-3, 3]}
      yDomain={[-3, 3]}
      width={300}
      getAngle={d => d.time}
      getAngle0={() => 0}
      height={300}
    >
      <ArcSeries
        animation={{
          damping: 9,
          stiffness: 300
        }}
        radiusDomain={[0, 3]}
        data={[
          {time: (seconds / 60) * 2 * PI, radius0: 1, radius: 1.5, color: 0},
          {
            time: (minutes / 60) * 2 * PI,
            radius0: 1.6,
            radius: 2.1,
            color: 1
          },
          {time: (hours / 24) * 2 * PI, radius0: 2.2, radius: 2.7, color: 2}
        ]}
        colorRange={EXTENDED_DISCRETE_COLOR_RANGE}
      />
    </XYPlot>
  );
}
