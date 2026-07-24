"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _discreteColorLegendItem = _interopRequireDefault(require("./discrete-color-legend-item"));
var _theme = require("../theme");
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
function DiscreteColorLegend(_ref) {
  var _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$colors = _ref.colors,
    colors = _ref$colors === void 0 ? _theme.DISCRETE_COLOR_RANGE : _ref$colors,
    height = _ref.height,
    items = _ref.items,
    onItemClick = _ref.onItemClick,
    onItemMouseEnter = _ref.onItemMouseEnter,
    onItemMouseLeave = _ref.onItemMouseLeave,
    _ref$orientation = _ref.orientation,
    orientation = _ref$orientation === void 0 ? 'vertical' : _ref$orientation,
    style = _ref.style,
    width = _ref.width;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _stylingUtils.getCombinedClassName)('rv-discrete-color-legend', orientation, className),
    style: _objectSpread({
      width: width,
      height: height
    }, style)
  }, items.map(function (item, i) {
    return /*#__PURE__*/_react["default"].createElement(_discreteColorLegendItem["default"], {
      title: item.title ? item.title : item,
      color: item.color ? item.color : colors[i % colors.length],
      strokeDasharray: item.strokeDasharray,
      strokeStyle: item.strokeStyle,
      strokeWidth: item.strokeWidth,
      disabled: Boolean(item.disabled),
      orientation: orientation,
      key: i,
      onClick: onItemClick ? function (e) {
        return onItemClick(item, i, e);
      } : null,
      onMouseEnter: onItemMouseEnter ? function (e) {
        return onItemMouseEnter(item, i, e);
      } : null,
      onMouseLeave: onItemMouseEnter ? function (e) {
        return onItemMouseLeave(item, i, e);
      } : null
    });
  }));
}
DiscreteColorLegend.displayName = 'DiscreteColorLegendItem';
DiscreteColorLegend.propTypes = {
  className: _propTypes["default"].string,
  items: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].shape({
    title: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].element]).isRequired,
    color: _propTypes["default"].string,
    disabled: _propTypes["default"].bool
  }), _propTypes["default"].string.isRequired, _propTypes["default"].element])).isRequired,
  onItemClick: _propTypes["default"].func,
  onItemMouseEnter: _propTypes["default"].func,
  onItemMouseLeave: _propTypes["default"].func,
  height: _propTypes["default"].number,
  width: _propTypes["default"].number,
  orientation: _propTypes["default"].oneOf(['vertical', 'horizontal'])
};
var _default = exports["default"] = DiscreteColorLegend;