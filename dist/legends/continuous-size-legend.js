"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _stylingUtils = require("../utils/styling-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
  circlesTotal: _propTypes["default"].number,
  endSize: _propTypes["default"].number,
  endTitle: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]).isRequired,
  height: _propTypes["default"].number,
  startSize: _propTypes["default"].number,
  startTitle: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]).isRequired,
  width: _propTypes["default"].number
};
var defaultProps = {
  circlesTotal: 10,
  className: '',
  endSize: 20,
  startSize: 2
};

function ContinuousSizeLegend(_ref) {
  var startTitle = _ref.startTitle,
      endTitle = _ref.endTitle,
      startSize = _ref.startSize,
      endSize = _ref.endSize,
      circlesTotal = _ref.circlesTotal,
      height = _ref.height,
      width = _ref.width,
      className = _ref.className;
  var circles = [];
  var step = (endSize - startSize) / (circlesTotal - 1);

  for (var i = 0; i < circlesTotal; i++) {
    var size = step * i + startSize;
    circles.push( /*#__PURE__*/_react["default"].createElement("div", {
      key: i,
      className: "rv-bubble",
      style: {
        width: size,
        height: size,
        borderRadius: size / 2
      }
    })); // Add the separator in order to justify the content (otherwise the tags
    // will be stacked together without any margins around).

    circles.push(' ');
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _stylingUtils.getCombinedClassName)('rv-continuous-size-legend', className),
    style: {
      width: width,
      height: height
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "rv-bubbles",
    style: {
      height: endSize
    }
  }, circles, /*#__PURE__*/_react["default"].createElement("div", {
    className: "rv-spacer"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "rv-legend-titles"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "rv-legend-titles__left"
  }, startTitle), /*#__PURE__*/_react["default"].createElement("span", {
    className: "rv-legend-titles__right"
  }, endTitle)));
}

ContinuousSizeLegend.displayName = 'ContinuousSizeLegend';
ContinuousSizeLegend.propTypes = propTypes;
ContinuousSizeLegend.defaultProps = defaultProps;
var _default = ContinuousSizeLegend;
exports["default"] = _default;