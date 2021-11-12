function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
import React from 'react';
import { generatePoints, getAxisAngle } from "../../utils/axis-utils";
/**
 * Generate the actual polygons to be plotted
 * @param {Object} props
 - props.animation {Boolean}
 - props.axisDomain {Array} a pair of values specifying the domain of the axis
 - props.numberOfTicks{Number} the number of ticks on the axis
 - props.axisStart {Object} a object specify in cartesian space the start of the axis
 example: {x: 0, y: 0}
 - props.axisEnd {Object} a object specify in cartesian space the start of the axis
 - props.tickValue {Func} a formatting function for the tick values
 - props.tickSize {Number} a pixel size of the axis
 - props.style {Object} The style object for the axis
 * @return {Component} the plotted axis
 */

export default function decorativeAxisTick(props) {
  var axisDomain = props.axisDomain,
      numberOfTicks = props.numberOfTicks,
      axisStart = props.axisStart,
      axisEnd = props.axisEnd,
      tickValue = props.tickValue,
      tickSize = props.tickSize,
      style = props.style;

  var _generatePoints = generatePoints({
    axisStart: axisStart,
    axisEnd: axisEnd,
    numberOfTicks: numberOfTicks,
    axisDomain: axisDomain
  }),
      points = _generatePoints.points; // add a quarter rotation to make ticks orthogonal to axis


  var tickAngle = getAxisAngle(axisStart, axisEnd) + Math.PI / 2;
  return points.map(function (point, index) {
    var tickProps = _objectSpread({
      x1: 0,
      y1: 0,
      x2: tickSize * Math.cos(tickAngle),
      y2: tickSize * Math.sin(tickAngle)
    }, style.ticks);

    var textProps = _objectSpread({
      x: tickSize * Math.cos(tickAngle),
      y: tickSize * Math.sin(tickAngle),
      textAnchor: 'start'
    }, style.text);

    return /*#__PURE__*/React.createElement("g", {
      key: index,
      transform: "translate(".concat(point.x, ", ").concat(point.y, ")"),
      className: "rv-xy-plot__axis__tick"
    }, /*#__PURE__*/React.createElement("line", _extends({}, tickProps, {
      className: "rv-xy-plot__axis__tick__line"
    })), /*#__PURE__*/React.createElement("text", _extends({}, textProps, {
      className: "rv-xy-plot__axis__tick__text"
    }), tickValue(point.text)));
  });
}