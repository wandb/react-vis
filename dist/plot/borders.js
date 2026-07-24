"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _stylingUtils = require("../utils/styling-utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // Copyright (c) 2016 - 2017 Uber Technologies, Inc.
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
  style: _propTypes["default"].shape({
    bottom: _propTypes["default"].object,
    left: _propTypes["default"].object,
    right: _propTypes["default"].object,
    top: _propTypes["default"].object
  }),
  // supplied by xyplot
  marginTop: _propTypes["default"].number,
  marginBottom: _propTypes["default"].number,
  marginLeft: _propTypes["default"].number,
  marginRight: _propTypes["default"].number,
  innerWidth: _propTypes["default"].number,
  innerHeight: _propTypes["default"].number
};
var CLASSES = {
  bottom: 'rv-xy-plot__borders-bottom',
  container: 'rv-xy-plot__borders',
  left: 'rv-xy-plot__borders-left',
  right: 'rv-xy-plot__borders-right',
  top: 'rv-xy-plot__borders-top'
};
var DEFAULT_STYLE = {
  all: {},
  bottom: {},
  left: {},
  right: {},
  top: {}
};
function Borders(props) {
  var marginTop = props.marginTop,
    marginBottom = props.marginBottom,
    marginLeft = props.marginLeft,
    marginRight = props.marginRight,
    innerWidth = props.innerWidth,
    innerHeight = props.innerHeight,
    _props$style = props.style,
    style = _props$style === void 0 ? DEFAULT_STYLE : _props$style,
    _props$className = props.className,
    className = _props$className === void 0 ? '' : _props$className;
  var height = innerHeight + marginTop + marginBottom;
  var width = innerWidth + marginLeft + marginRight;
  return /*#__PURE__*/_react["default"].createElement("g", {
    className: (0, _stylingUtils.getCombinedClassName)(CLASSES.container, className)
  }, /*#__PURE__*/_react["default"].createElement("rect", {
    className: (0, _stylingUtils.getCombinedClassName)(CLASSES.bottom, "".concat(className, "-bottom")),
    style: _objectSpread(_objectSpread({}, style.all), style.bottom),
    x: 0,
    y: height - marginBottom,
    width: width,
    height: marginBottom
  }), /*#__PURE__*/_react["default"].createElement("rect", {
    className: (0, _stylingUtils.getCombinedClassName)(CLASSES.left, "".concat(className, "-left")),
    style: _objectSpread(_objectSpread({}, style.all), style.left),
    x: 0,
    y: 0,
    width: marginLeft,
    height: height
  }), /*#__PURE__*/_react["default"].createElement("rect", {
    className: (0, _stylingUtils.getCombinedClassName)(CLASSES.right, "".concat(className, "-right")),
    style: _objectSpread(_objectSpread({}, style.all), style.right),
    x: width - marginRight,
    y: 0,
    width: marginRight,
    height: height
  }), /*#__PURE__*/_react["default"].createElement("rect", {
    className: (0, _stylingUtils.getCombinedClassName)(CLASSES.top, "".concat(className, "-top")),
    style: _objectSpread(_objectSpread({}, style.all), style.top),
    x: 0,
    y: 0,
    width: width,
    height: marginTop
  }));
}
Borders.displayName = 'Borders';
Borders.propTypes = propTypes;
Borders.requiresSVG = true;
var _default = exports["default"] = Borders;