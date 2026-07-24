"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _axisUtils = require("../../utils/axis-utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // Copyright (c) 2016 - 2017 Uber Technologies, Inc.
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
var LEFT = _axisUtils.ORIENTATION.LEFT,
  RIGHT = _axisUtils.ORIENTATION.RIGHT,
  TOP = _axisUtils.ORIENTATION.TOP,
  BOTTOM = _axisUtils.ORIENTATION.BOTTOM;
var propTypes = {
  height: _propTypes["default"].number.isRequired,
  style: _propTypes["default"].object,
  orientation: _propTypes["default"].oneOf([LEFT, RIGHT, TOP, BOTTOM]).isRequired,
  width: _propTypes["default"].number.isRequired
};
function AxisLine(_ref) {
  var orientation = _ref.orientation,
    width = _ref.width,
    height = _ref.height,
    _ref$style = _ref.style,
    style = _ref$style === void 0 ? {} : _ref$style;
  var lineProps;
  if (orientation === LEFT) {
    lineProps = {
      x1: width,
      x2: width,
      y1: 0,
      y2: height
    };
  } else if (orientation === RIGHT) {
    lineProps = {
      x1: 0,
      x2: 0,
      y1: 0,
      y2: height
    };
  } else if (orientation === TOP) {
    lineProps = {
      x1: 0,
      x2: width,
      y1: height,
      y2: height
    };
  } else {
    lineProps = {
      x1: 0,
      x2: width,
      y1: 0,
      y2: 0
    };
  }
  return /*#__PURE__*/_react["default"].createElement("line", _extends({}, lineProps, {
    className: "rv-xy-plot__axis__line",
    style: style
  }));
}
AxisLine.displayName = 'AxisLine';
AxisLine.propTypes = propTypes;
var _default = exports["default"] = AxisLine;