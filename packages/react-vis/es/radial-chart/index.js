function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
import PropTypes from 'prop-types';
import { pie as pieBuilder } from 'd3-shape';
import { AnimationPropType } from "../animation";
import ArcSeries from "../plot/series/arc-series";
import LabelSeries from "../plot/series/label-series";
import XYPlot from "../plot/xy-plot";
import { DISCRETE_COLOR_RANGE } from "../theme";
import { MarginPropType, getRadialLayoutMargin } from "../utils/chart-utils";
import { getRadialDomain } from "../utils/series-utils";
import { getCombinedClassName } from "../utils/styling-utils";
var predefinedClassName = 'rv-radial-chart';
var DEFAULT_RADIUS_MARGIN = 15;
/**
 * Create the list of wedges to render.
 * @param {Object} props
   props.data {Object} - tree structured data (each node has a name anc an array of children)
 * @returns {Array} Array of nodes.
 */

function getWedgesToRender(_ref) {
  var data = _ref.data,
      getAngle = _ref.getAngle;
  var pie = pieBuilder().sort(null).value(getAngle);
  var pieData = pie(data).reverse();
  return pieData.map(function (row, index) {
    return _objectSpread(_objectSpread({}, row.data), {}, {
      angle0: row.startAngle,
      angle: row.endAngle,
      radius0: row.data.innerRadius || 0,
      radius: row.data.radius || 1,
      color: row.data.color || index
    });
  });
}

function generateLabels(mappedData, accessors) {
  var labelsRadiusMultiplier = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1.1;
  var getLabel = accessors.getLabel,
      getSubLabel = accessors.getSubLabel;
  return mappedData.reduce(function (res, row) {
    var angle = row.angle,
        angle0 = row.angle0,
        radius = row.radius;
    var centeredAngle = (angle + angle0) / 2; // unfortunate, but true fact: d3 starts its radians at 12 oclock rather than 3
    // and move clockwise rather than counter clockwise. why why why!

    var updatedAngle = -1 * centeredAngle + Math.PI / 2;
    var newLabels = [];

    if (getLabel(row)) {
      newLabels.push({
        angle: updatedAngle,
        radius: radius * labelsRadiusMultiplier,
        label: getLabel(row)
      });
    }

    if (getSubLabel(row)) {
      newLabels.push({
        angle: updatedAngle,
        radius: radius * labelsRadiusMultiplier,
        label: getSubLabel(row),
        style: {
          fontSize: 10
        },
        yOffset: 12
      });
    }

    return res.concat(newLabels);
  }, []); // could add force direction here to make sure the labels dont overlap
}
/**
 * Get the max radius so the chart can extend to the margin.
 * @param  {Number} width - container width
 * @param  {Number} height - container height
 * @return {Number} radius
 */


function getMaxRadius(width, height) {
  return Math.min(width, height) / 2 - DEFAULT_RADIUS_MARGIN;
}

function RadialChart(props) {
  var animation = props.animation,
      className = props.className,
      children = props.children,
      colorType = props.colorType,
      data = props.data,
      getAngle = props.getAngle,
      getLabel = props.getLabel,
      getSubLabel = props.getSubLabel,
      height = props.height,
      hideRootNode = props.hideRootNode,
      innerRadius = props.innerRadius,
      labelsAboveChildren = props.labelsAboveChildren,
      labelsRadiusMultiplier = props.labelsRadiusMultiplier,
      labelsStyle = props.labelsStyle,
      margin = props.margin,
      onMouseLeave = props.onMouseLeave,
      onMouseEnter = props.onMouseEnter,
      radius = props.radius,
      showLabels = props.showLabels,
      style = props.style,
      width = props.width;
  var mappedData = getWedgesToRender({
    data: data,
    height: height,
    hideRootNode: hideRootNode,
    width: width,
    getAngle: getAngle
  });
  var radialDomain = getRadialDomain(mappedData);

  var arcProps = _objectSpread(_objectSpread({
    colorType: colorType
  }, props), {}, {
    animation: animation,
    radiusDomain: [0, radialDomain],
    data: mappedData,
    radiusNoFallBack: true,
    style: style,
    arcClassName: 'rv-radial-chart__series--pie__slice'
  });

  if (radius) {
    arcProps.radiusDomain = [0, 1];
    arcProps.radiusRange = [innerRadius || 0, radius];
    arcProps.radiusType = 'linear';
  }

  var maxRadius = radius ? radius : getMaxRadius(width, height);
  var defaultMargin = getRadialLayoutMargin(width, height, maxRadius);
  var labels = generateLabels(mappedData, {
    getLabel: getLabel,
    getSubLabel: getSubLabel
  }, labelsRadiusMultiplier);
  return /*#__PURE__*/React.createElement(XYPlot, {
    height: height,
    width: width,
    margin: _objectSpread(_objectSpread({}, defaultMargin), margin),
    className: getCombinedClassName(className, predefinedClassName),
    onMouseLeave: onMouseLeave,
    onMouseEnter: onMouseEnter,
    xDomain: [-radialDomain, radialDomain],
    yDomain: [-radialDomain, radialDomain]
  }, /*#__PURE__*/React.createElement(ArcSeries, _extends({}, arcProps, {
    getAngle: function getAngle(d) {
      return d.angle;
    }
  })), showLabels && !labelsAboveChildren && /*#__PURE__*/React.createElement(LabelSeries, {
    data: labels,
    style: labelsStyle
  }), children, showLabels && labelsAboveChildren && /*#__PURE__*/React.createElement(LabelSeries, {
    data: labels,
    style: labelsStyle
  }));
}

RadialChart.displayName = 'RadialChart';
RadialChart.propTypes = {
  animation: AnimationPropType,
  className: PropTypes.string,
  colorType: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({
    angle: PropTypes.number,
    className: PropTypes.string,
    label: PropTypes.string,
    radius: PropTypes.number,
    style: PropTypes.object
  })).isRequired,
  getAngle: PropTypes.func,
  getAngle0: PropTypes.func,
  padAngle: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  getRadius: PropTypes.func,
  getRadius0: PropTypes.func,
  getLabel: PropTypes.func,
  height: PropTypes.number.isRequired,
  labelsAboveChildren: PropTypes.bool,
  labelsStyle: PropTypes.object,
  margin: MarginPropType,
  onValueClick: PropTypes.func,
  onValueMouseOver: PropTypes.func,
  onValueMouseOut: PropTypes.func,
  showLabels: PropTypes.bool,
  style: PropTypes.object,
  subLabel: PropTypes.func,
  width: PropTypes.number.isRequired
};
RadialChart.defaultProps = {
  className: '',
  colorType: 'category',
  colorRange: DISCRETE_COLOR_RANGE,
  padAngle: 0,
  getAngle: function getAngle(d) {
    return d.angle;
  },
  getAngle0: function getAngle0(d) {
    return d.angle0;
  },
  getRadius: function getRadius(d) {
    return d.radius;
  },
  getRadius0: function getRadius0(d) {
    return d.radius0;
  },
  getLabel: function getLabel(d) {
    return d.label;
  },
  getSubLabel: function getSubLabel(d) {
    return d.subLabel;
  }
};
export default RadialChart;