// Copyright (c) 2017 Uber Technologies, Inc.
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
import {
  XYPlot,
  MarkSeries,
  HeatmapSeries,
  XAxis,
  YAxis,
  Hint,
  LabelSeries
} from 'react-vis';

import {
  filterFeatures,
  computeRadius,
  getPPP,
  transformToBinData,
  manicureData
} from './responsive-vis-utils';

// range constants
const SUPER_LOW_RANGE = [0, 1e-4];
const VERY_LOW_RANGE = [0, 8e-4];
const LOW_RANGE = [0, 5e-3];
const MED_LOW_RANGE = [1e-4, 5e-3];
const MED_RANGE = [5e-3, 1e-2];
const HIGH_RANGE = [1e-2, Infinity];
const MED_HIGH_RANGE = [MED_RANGE[0], HIGH_RANGE[1]];

export const SCATTERPLOT_FEATURES = [
  {min: -Infinity, max: Infinity, name: 'axes', group: 0},
  {min: SUPER_LOW_RANGE[0], max: SUPER_LOW_RANGE[1], name: 'labels', group: 1},
  {
    min: VERY_LOW_RANGE[0],
    max: VERY_LOW_RANGE[1],
    name: 'pointSelection',
    group: 1
  },
  {min: LOW_RANGE[0], max: LOW_RANGE[1], name: 'points', group: 3},
  {min: MED_LOW_RANGE[0], max: MED_LOW_RANGE[1], name: 'tooltips', group: 2},
  {min: MED_HIGH_RANGE[0], max: MED_HIGH_RANGE[1], name: 'bins', group: 3},
  {min: MED_HIGH_RANGE[0], max: MED_HIGH_RANGE[1], name: 'bintips', group: 2},
  {
    min: MED_HIGH_RANGE[0],
    max: MED_HIGH_RANGE[1],
    name: 'binSelection',
    group: 1
  }
];

export function getFeatures(props) {
  const {data, height, margin, width} = props;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const ppp = getPPP(innerWidth, innerHeight, data, 'HEIGHT');
  return filterFeatures(SCATTERPLOT_FEATURES, ppp);
}

export default function ResponsiveScatterplot(props) {
  const {data, height, margin, width} = props;
  const [binData, setBinData] = useState([]);
  const [hoveredPoint, setHoveredPoint] = useState(false);
  const [selectedPoints, setSelectedPoints] = useState([]);
  useEffect(() => {
    setBinData(transformToBinData(data, width, height));
  }, [data, width, height]);
  // const {binData, hoveredPoint, selectedPoints} = this.state;
  function select(accessor) {
    return (value, e) => {
      e.event.stopPropagation();
      let foundValue = false;

      const updatedSelectedPoints = selectedPoints.filter(row => {
        if (accessor(row) === accessor(value)) {
          foundValue = true;
        }
        return accessor(row) !== accessor(value);
      });

      if (!foundValue) {
        updatedSelectedPoints.push(value);
      }
      setSelectedPoints(updatedSelectedPoints);
    };
  }

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const ppp = getPPP(innerWidth, innerHeight, data, 'TWOD');
  const featuresToRender = filterFeatures(SCATTERPLOT_FEATURES, ppp);
  const rememberVal =
    featuresToRender.pointSelection || featuresToRender.tooltips;
  const rememberBin = featuresToRender.bintips || featuresToRender.binSelection;

  const pointRadii = computeRadius(data, innerWidth, innerHeight);

  const showHint =
    (featuresToRender.tooltips || featuresToRender.bintips) && hoveredPoint;
  return (
    <div className="responsive-vis">
      <XYPlot height={height} margin={margin} width={width}>
        {featuresToRender.axes && <XAxis />}
        {featuresToRender.axes && <YAxis />}
        {featuresToRender.bins && (
          <HeatmapSeries
            className="responsive-vis-heatmap"
            colorType="literal"
            onValueMouseOver={
              rememberBin ? value => setHoveredPoint(value) : null
            }
            onValueMouseOut={rememberBin ? () => setHoveredPoint(null) : null}
            onValueClick={
              featuresToRender.binSelection
                ? select(d => `${d.x}-${d.y}`)
                : null
            }
            data={manicureData(binData, hoveredPoint, selectedPoints, true)}
          />
        )}
        {featuresToRender.points && (
          <MarkSeries
            className="responsive-vis-scatterplot"
            colorType="literal"
            size={pointRadii}
            onValueMouseOver={
              rememberVal ? value => setHoveredPoint(value) : null
            }
            onValueMouseOut={rememberVal ? () => setHoveredPoint(null) : null}
            onValueClick={
              featuresToRender.pointSelection ? select(d => d.label) : null
            }
            data={manicureData(data, hoveredPoint, selectedPoints, false)}
          />
        )}
        {showHint && <Hint value={hoveredPoint} />}
        {featuresToRender.labels && (
          <LabelSeries
            allowOffsetToBeReversed
            data={data}
            yOffset={-1 * pointRadii}
          />
        )}
      </XYPlot>
    </div>
  );
}
