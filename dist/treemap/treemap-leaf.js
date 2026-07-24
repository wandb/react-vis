"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _animation = _interopRequireWildcard(require("../animation"));
var _scalesUtils = require("../utils/scales-utils");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
var ANIMATED_PROPS = ['colorRange', 'colorDomain', 'color', 'opacityRange', 'opacityDomain', 'opacity', 'x0', 'x1', 'y0', 'y1', 'r'];
function TreemapLeaf(props) {
  var animation = props.animation,
    getLabel = props.getLabel,
    mode = props.mode,
    node = props.node,
    onLeafClick = props.onLeafClick,
    onLeafMouseOver = props.onLeafMouseOver,
    onLeafMouseOut = props.onLeafMouseOut,
    r = props.r,
    scales = props.scales,
    x0 = props.x0,
    x1 = props.x1,
    y0 = props.y0,
    y1 = props.y1,
    style = props.style;
  if (animation) {
    return /*#__PURE__*/_react["default"].createElement(_animation["default"], _extends({}, props, {
      animatedProps: ANIMATED_PROPS
    }), /*#__PURE__*/_react["default"].createElement(TreemapLeaf, _extends({}, props, {
      animation: null
    })));
  }
  var useCirclePacking = mode === 'circlePack';
  var background = scales.color(node);
  var opacity = scales.opacity(node);
  var color = (0, _scalesUtils.getFontColorFromBackground)(background);
  var data = node.data;
  var title = getLabel(data);
  var leafStyle = _objectSpread(_objectSpread({
    top: useCirclePacking ? y0 - r : y0,
    left: useCirclePacking ? x0 - r : x0,
    width: useCirclePacking ? r * 2 : x1 - x0,
    height: useCirclePacking ? r * 2 : y1 - y0,
    background: background,
    opacity: opacity,
    color: color
  }, style), node.data.style);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "rv-treemap__leaf ".concat(useCirclePacking ? 'rv-treemap__leaf--circle' : ''),
    onMouseEnter: function onMouseEnter(event) {
      return onLeafMouseOver(node, event);
    },
    onMouseLeave: function onMouseLeave(event) {
      return onLeafMouseOut(node, event);
    },
    onClick: function onClick(event) {
      return onLeafClick(node, event);
    },
    style: leafStyle
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "rv-treemap__leaf__content"
  }, title));
}
TreemapLeaf.propTypes = {
  animation: _animation.AnimationPropType,
  height: _propTypes["default"].number.isRequired,
  mode: _propTypes["default"].string,
  node: _propTypes["default"].object.isRequired,
  onLeafClick: _propTypes["default"].func,
  onLeafMouseOver: _propTypes["default"].func,
  onLeafMouseOut: _propTypes["default"].func,
  scales: _propTypes["default"].object.isRequired,
  width: _propTypes["default"].number.isRequired,
  r: _propTypes["default"].number.isRequired,
  x0: _propTypes["default"].number.isRequired,
  x1: _propTypes["default"].number.isRequired,
  y0: _propTypes["default"].number.isRequired,
  y1: _propTypes["default"].number.isRequired
};
var _default = exports["default"] = TreemapLeaf;