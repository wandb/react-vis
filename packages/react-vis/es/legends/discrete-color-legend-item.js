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
var STROKE_STYLES = {
  dashed: '6, 2',
  solid: null
};

function DiscreteColorLegendItem(_ref) {
  var color = _ref.color,
      strokeDasharray = _ref.strokeDasharray,
      strokeStyle = _ref.strokeStyle,
      strokeWidth = _ref.strokeWidth,
      disabled = _ref.disabled,
      onClick = _ref.onClick,
      orientation = _ref.orientation,
      onMouseEnter = _ref.onMouseEnter,
      onMouseLeave = _ref.onMouseLeave,
      title = _ref.title;
  var className = "rv-discrete-color-legend-item ".concat(orientation);

  if (disabled) {
    className += ' disabled';
  }

  if (onClick) {
    className += ' clickable';
  }

  var strokeDasharrayStyle = STROKE_STYLES[strokeStyle] || strokeDasharray;
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    onClick: onClick,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave
  }, /*#__PURE__*/React.createElement("svg", {
    className: "rv-discrete-color-legend-item__color",
    height: 2,
    width: 14
  }, /*#__PURE__*/React.createElement("path", {
    className: "rv-discrete-color-legend-item__color__path",
    d: "M 0, 1 L 14, 1",
    style: _objectSpread(_objectSpread(_objectSpread({}, strokeWidth ? {
      strokeWidth: strokeWidth
    } : {}), strokeDasharrayStyle ? {
      strokeDasharray: strokeDasharrayStyle
    } : {}), {}, {
      stroke: disabled ? null : color
    })
  })), /*#__PURE__*/React.createElement("span", {
    className: "rv-discrete-color-legend-item__title"
  }, title));
}

DiscreteColorLegendItem.propTypes = {
  color: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  orientation: PropTypes.oneOf(['vertical', 'horizontal']).isRequired,
  strokeDasharray: PropTypes.string,
  strokeWidth: PropTypes.number,
  strokeStyle: PropTypes.oneOf(Object.keys(STROKE_STYLES))
};
DiscreteColorLegendItem.defaultProps = {
  disabled: false,
  strokeStyle: 'solid'
};
DiscreteColorLegendItem.displayName = 'DiscreteColorLegendItem';
export default DiscreteColorLegendItem;