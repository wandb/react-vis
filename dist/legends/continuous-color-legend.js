"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _theme = require("../theme");
var _stylingUtils = require("../utils/styling-utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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

var propTypes = {
  className: _propTypes["default"].string,
  height: _propTypes["default"].number,
  endColor: _propTypes["default"].string,
  endTitle: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]).isRequired,
  midColor: _propTypes["default"].string,
  midTitle: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  startColor: _propTypes["default"].string,
  startTitle: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]).isRequired,
  width: _propTypes["default"].number
};
function ContinuousColorLegend(_ref) {
  var _ref$startColor = _ref.startColor,
    startColor = _ref$startColor === void 0 ? _theme.CONTINUOUS_COLOR_RANGE[0] : _ref$startColor,
    midColor = _ref.midColor,
    _ref$endColor = _ref.endColor,
    endColor = _ref$endColor === void 0 ? _theme.CONTINUOUS_COLOR_RANGE[1] : _ref$endColor,
    startTitle = _ref.startTitle,
    midTitle = _ref.midTitle,
    endTitle = _ref.endTitle,
    height = _ref.height,
    width = _ref.width,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className;
  var colors = [startColor];
  if (midColor) {
    colors.push(midColor);
  }
  colors.push(endColor);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _stylingUtils.getCombinedClassName)('rv-continuous-color-legend', className),
    style: {
      width: width,
      height: height
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "rv-gradient",
    style: {
      background: "linear-gradient(to right, ".concat(colors.join(','), ")")
    }
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "rv-legend-titles"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "rv-legend-titles__left"
  }, startTitle), /*#__PURE__*/_react["default"].createElement("span", {
    className: "rv-legend-titles__right"
  }, endTitle), midTitle ? /*#__PURE__*/_react["default"].createElement("span", {
    className: "rv-legend-titles__center"
  }, midTitle) : null));
}
ContinuousColorLegend.displayName = 'ContinuousColorLegend';
ContinuousColorLegend.propTypes = propTypes;
var _default = exports["default"] = ContinuousColorLegend;