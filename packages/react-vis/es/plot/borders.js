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
import { getCombinedClassName } from "../utils/styling-utils";
var propTypes = {
  style: PropTypes.shape({
    bottom: PropTypes.object,
    left: PropTypes.object,
    right: PropTypes.object,
    top: PropTypes.object
  }),
  // supplied by xyplot
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  innerWidth: PropTypes.number,
  innerHeight: PropTypes.number
};
var CLASSES = {
  bottom: 'rv-xy-plot__borders-bottom',
  container: 'rv-xy-plot__borders',
  left: 'rv-xy-plot__borders-left',
  right: 'rv-xy-plot__borders-right',
  top: 'rv-xy-plot__borders-top'
};

function Borders(props) {
  var marginTop = props.marginTop,
      marginBottom = props.marginBottom,
      marginLeft = props.marginLeft,
      marginRight = props.marginRight,
      innerWidth = props.innerWidth,
      innerHeight = props.innerHeight,
      style = props.style,
      className = props.className;
  var height = innerHeight + marginTop + marginBottom;
  var width = innerWidth + marginLeft + marginRight;
  return /*#__PURE__*/React.createElement("g", {
    className: getCombinedClassName(CLASSES.container, className)
  }, /*#__PURE__*/React.createElement("rect", {
    className: getCombinedClassName(CLASSES.bottom, "".concat(className, "-bottom")),
    style: _objectSpread(_objectSpread({}, style.all), style.bottom),
    x: 0,
    y: height - marginBottom,
    width: width,
    height: marginBottom
  }), /*#__PURE__*/React.createElement("rect", {
    className: getCombinedClassName(CLASSES.left, "".concat(className, "-left")),
    style: _objectSpread(_objectSpread({}, style.all), style.left),
    x: 0,
    y: 0,
    width: marginLeft,
    height: height
  }), /*#__PURE__*/React.createElement("rect", {
    className: getCombinedClassName(CLASSES.right, "".concat(className, "-right")),
    style: _objectSpread(_objectSpread({}, style.all), style.right),
    x: width - marginRight,
    y: 0,
    width: marginRight,
    height: height
  }), /*#__PURE__*/React.createElement("rect", {
    className: getCombinedClassName(CLASSES.top, "".concat(className, "-top")),
    style: _objectSpread(_objectSpread({}, style.all), style.top),
    x: 0,
    y: 0,
    width: width,
    height: marginTop
  }));
}

Borders.displayName = 'Borders';
Borders.defaultProps = {
  className: '',
  style: {
    all: {},
    bottom: {},
    left: {},
    right: {},
    top: {}
  }
};
Borders.propTypes = propTypes;
Borders.requiresSVG = true;
export default Borders;