"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _animation = _interopRequireDefault(require("../../animation"));
var _axisUtils = require("../../utils/axis-utils");
var _scalesUtils = require("../../utils/scales-utils");
var _stylingUtils = require("../../utils/styling-utils");
var _axisLine = _interopRequireDefault(require("./axis-line"));
var _axisTicks = _interopRequireDefault(require("./axis-ticks"));
var _axisTitle = _interopRequireDefault(require("./axis-title"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); } // Copyright (c) 2016 - 2017 Uber Technologies, Inc.
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
var defaultAnimatedProps = ['xRange', 'yRange', 'xDomain', 'yDomain', 'width', 'height', 'marginLeft', 'marginTop', 'marginRight', 'marginBottom', 'tickSize', 'tickTotal', 'tickSizeInner', 'tickSizeOuter'];
var LEFT = _axisUtils.ORIENTATION.LEFT,
  RIGHT = _axisUtils.ORIENTATION.RIGHT,
  TOP = _axisUtils.ORIENTATION.TOP,
  BOTTOM = _axisUtils.ORIENTATION.BOTTOM;
var propTypes = {
  orientation: _propTypes["default"].oneOf([LEFT, RIGHT, TOP, BOTTOM]),
  attr: _propTypes["default"].string.isRequired,
  attrAxis: _propTypes["default"].string,
  width: _propTypes["default"].number,
  height: _propTypes["default"].number,
  top: _propTypes["default"].number,
  left: _propTypes["default"].number,
  title: _propTypes["default"].string,
  style: _propTypes["default"].object,
  className: _propTypes["default"].string,
  hideTicks: _propTypes["default"].bool,
  hideLine: _propTypes["default"].bool,
  on0: _propTypes["default"].bool,
  tickLabelAngle: _propTypes["default"].number,
  tickSize: _propTypes["default"].number,
  tickSizeInner: _propTypes["default"].number,
  tickSizeOuter: _propTypes["default"].number,
  tickPadding: _propTypes["default"].number,
  tickValues: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string])),
  tickFormat: _propTypes["default"].func,
  tickTotal: _propTypes["default"].number,
  // Not expected to be used by the users.
  // TODO: Add underscore to these properties later.
  marginTop: _propTypes["default"].number,
  marginBottom: _propTypes["default"].number,
  marginLeft: _propTypes["default"].number,
  marginRight: _propTypes["default"].number,
  innerWidth: _propTypes["default"].number,
  innerHeight: _propTypes["default"].number
};
var defaultProps = {
  className: '',
  on0: false,
  style: {},
  tickSize: 6,
  tickPadding: 8,
  orientation: BOTTOM
};
var predefinedClassName = 'rv-xy-plot__axis';
var VERTICAL_CLASS_NAME = 'rv-xy-plot__axis--vertical';
var HORIZONTAL_CLASS_NAME = 'rv-xy-plot__axis--horizontal';
var Axis = /*#__PURE__*/function (_PureComponent) {
  function Axis() {
    _classCallCheck(this, Axis);
    return _callSuper(this, Axis, arguments);
  }
  _inherits(Axis, _PureComponent);
  return _createClass(Axis, [{
    key: "_getDefaultAxisProps",
    value:
    /**
     * Define the default values depending on the data passed from the outside.
     * @returns {*} Object of default properties.
     * @private
     */
    function _getDefaultAxisProps() {
      var _this$props = this.props,
        innerWidth = _this$props.innerWidth,
        innerHeight = _this$props.innerHeight,
        marginTop = _this$props.marginTop,
        marginBottom = _this$props.marginBottom,
        marginLeft = _this$props.marginLeft,
        marginRight = _this$props.marginRight,
        orientation = _this$props.orientation;
      if (orientation === BOTTOM) {
        return {
          tickTotal: (0, _axisUtils.getTicksTotalFromSize)(innerWidth),
          top: innerHeight + marginTop,
          left: marginLeft,
          width: innerWidth,
          height: marginBottom
        };
      } else if (orientation === TOP) {
        return {
          tickTotal: (0, _axisUtils.getTicksTotalFromSize)(innerWidth),
          top: 0,
          left: marginLeft,
          width: innerWidth,
          height: marginTop
        };
      } else if (orientation === LEFT) {
        return {
          tickTotal: (0, _axisUtils.getTicksTotalFromSize)(innerHeight),
          top: marginTop,
          left: 0,
          width: marginLeft,
          height: innerHeight
        };
      }
      return {
        tickTotal: (0, _axisUtils.getTicksTotalFromSize)(innerHeight),
        top: marginTop,
        left: marginLeft + innerWidth,
        width: marginRight,
        height: innerHeight
      };
    }
  }, {
    key: "render",
    value: function render() {
      var animation = this.props.animation;
      if (animation) {
        var animatedProps = animation.nonAnimatedProps ? defaultAnimatedProps.filter(function (prop) {
          return animation.nonAnimatedProps.indexOf(prop) < 0;
        }) : defaultAnimatedProps;
        return /*#__PURE__*/_react["default"].createElement(_animation["default"], _extends({}, this.props, {
          animatedProps: animatedProps
        }), /*#__PURE__*/_react["default"].createElement(Axis, _extends({}, this.props, {
          animation: null
        })));
      }
      var props = _objectSpread(_objectSpread({}, this._getDefaultAxisProps()), this.props);
      var attrAxis = props.attrAxis,
        className = props.className,
        height = props.height,
        hideLine = props.hideLine,
        hideTicks = props.hideTicks,
        left = props.left,
        marginTop = props.marginTop,
        on0 = props.on0,
        orientation = props.orientation,
        position = props.position,
        style = props.style,
        title = props.title,
        top = props.top,
        width = props.width;
      var isVertical = [LEFT, RIGHT].indexOf(orientation) > -1;
      var axisClassName = isVertical ? VERTICAL_CLASS_NAME : HORIZONTAL_CLASS_NAME;
      var leftPos = left;
      var topPos = top;
      if (on0) {
        var scale = (0, _scalesUtils.getAttributeScale)(props, attrAxis);
        if (isVertical) {
          leftPos = scale(0);
        } else {
          topPos = marginTop + scale(0);
        }
      }
      return /*#__PURE__*/_react["default"].createElement("g", {
        transform: "translate(".concat(leftPos, ",").concat(topPos, ")"),
        className: (0, _stylingUtils.getCombinedClassName)(predefinedClassName, axisClassName, className),
        style: style
      }, !hideLine && /*#__PURE__*/_react["default"].createElement(_axisLine["default"], {
        height: height,
        width: width,
        orientation: orientation,
        style: _objectSpread(_objectSpread({}, style), style.line)
      }), !hideTicks && /*#__PURE__*/_react["default"].createElement(_axisTicks["default"], _extends({}, props, {
        style: _objectSpread(_objectSpread({}, style), style.ticks)
      })), title ? /*#__PURE__*/_react["default"].createElement(_axisTitle["default"], {
        position: position,
        title: title,
        height: height,
        width: width,
        style: _objectSpread(_objectSpread({}, style), style.title),
        orientation: orientation
      }) : null);
    }
  }]);
}(_react.PureComponent);
Axis.displayName = 'Axis';
Axis.propTypes = propTypes;
Axis.defaultProps = defaultProps;
Axis.requiresSVG = true;
var _default = exports["default"] = Axis;