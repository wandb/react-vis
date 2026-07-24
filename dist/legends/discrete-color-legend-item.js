"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
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
var STROKE_STYLES = {
  dashed: '6, 2',
  solid: null
};
function DiscreteColorLegendItem(_ref) {
  var color = _ref.color,
    strokeDasharray = _ref.strokeDasharray,
    _ref$strokeStyle = _ref.strokeStyle,
    strokeStyle = _ref$strokeStyle === void 0 ? 'solid' : _ref$strokeStyle,
    strokeWidth = _ref.strokeWidth,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
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
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: className,
    onClick: onClick,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "rv-discrete-color-legend-item__color",
    height: 2,
    width: 14
  }, /*#__PURE__*/_react["default"].createElement("path", {
    className: "rv-discrete-color-legend-item__color__path",
    d: "M 0, 1 L 14, 1",
    style: _objectSpread(_objectSpread(_objectSpread({}, strokeWidth ? {
      strokeWidth: strokeWidth
    } : {}), strokeDasharrayStyle ? {
      strokeDasharray: strokeDasharrayStyle
    } : {}), {}, {
      stroke: disabled ? null : color
    })
  })), /*#__PURE__*/_react["default"].createElement("span", {
    className: "rv-discrete-color-legend-item__title"
  }, title));
}
DiscreteColorLegendItem.propTypes = {
  color: _propTypes["default"].string.isRequired,
  disabled: _propTypes["default"].bool,
  title: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].element]).isRequired,
  onClick: _propTypes["default"].func,
  onMouseEnter: _propTypes["default"].func,
  onMouseLeave: _propTypes["default"].func,
  orientation: _propTypes["default"].oneOf(['vertical', 'horizontal']).isRequired,
  strokeDasharray: _propTypes["default"].string,
  strokeWidth: _propTypes["default"].number,
  strokeStyle: _propTypes["default"].oneOf(Object.keys(STROKE_STYLES))
};
DiscreteColorLegendItem.displayName = 'DiscreteColorLegendItem';
var _default = exports["default"] = DiscreteColorLegendItem;