"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _d3Format = require("d3-format");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _abstractSeries = _interopRequireDefault(require("../series/abstract-series"));
var _decorativeAxisTicks = _interopRequireDefault(require("./decorative-axis-ticks"));
var _animation = _interopRequireDefault(require("../../animation"));
var _stylingUtils = require("../../utils/styling-utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); } // Copyright (c) 2017 Uber Technologies, Inc.
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
var predefinedClassName = 'rv-xy-manipulable-axis rv-xy-plot__axis';
var animatedProps = ['xRange', 'yRange', 'xDomain', 'yDomain', 'width', 'height', 'marginLeft', 'marginTop', 'marginRight', 'marginBottom', 'tickSize', 'tickTotal', 'tickSizeInner', 'tickSizeOuter'];
var DecorativeAxis = /*#__PURE__*/function (_AbstractSeries) {
  function DecorativeAxis() {
    _classCallCheck(this, DecorativeAxis);
    return _callSuper(this, DecorativeAxis, arguments);
  }
  _inherits(DecorativeAxis, _AbstractSeries);
  return _createClass(DecorativeAxis, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        animation = _this$props.animation,
        className = _this$props.className,
        marginLeft = _this$props.marginLeft,
        marginTop = _this$props.marginTop,
        axisStart = _this$props.axisStart,
        axisEnd = _this$props.axisEnd,
        axisDomain = _this$props.axisDomain,
        numberOfTicks = _this$props.numberOfTicks,
        tickValue = _this$props.tickValue,
        tickSize = _this$props.tickSize,
        style = _this$props.style;
      if (animation) {
        return /*#__PURE__*/_react["default"].createElement(_animation["default"], _extends({}, this.props, {
          animatedProps: animatedProps
        }), /*#__PURE__*/_react["default"].createElement(DecorativeAxis, _extends({}, this.props, {
          animation: null
        })));
      }
      var x = this._getAttributeFunctor('x');
      var y = this._getAttributeFunctor('y');
      return /*#__PURE__*/_react["default"].createElement("g", {
        className: (0, _stylingUtils.getCombinedClassName)(predefinedClassName, className),
        transform: "translate(".concat(marginLeft, ",").concat(marginTop, ")")
      }, /*#__PURE__*/_react["default"].createElement("line", _extends({}, _objectSpread({
        x1: x({
          x: axisStart.x
        }),
        x2: x({
          x: axisEnd.x
        }),
        y1: y({
          y: axisStart.y
        }),
        y2: y({
          y: axisEnd.y
        })
      }, style.line), {
        className: "rv-xy-plot__axis__line"
      })), /*#__PURE__*/_react["default"].createElement("g", {
        className: "rv-xy-manipulable-axis__ticks"
      }, (0, _decorativeAxisTicks["default"])({
        axisDomain: axisDomain,
        axisEnd: {
          x: x(axisEnd),
          y: y(axisEnd)
        },
        axisStart: {
          x: x(axisStart),
          y: y(axisStart)
        },
        numberOfTicks: numberOfTicks,
        tickValue: tickValue,
        tickSize: tickSize,
        style: style
      })));
    }
  }]);
}(_abstractSeries["default"]);
var DEFAULT_FORMAT = (0, _d3Format.format)('.2r');
DecorativeAxis.defaultProps = {
  className: '',
  numberOfTicks: 10,
  tickValue: function tickValue(d) {
    return DEFAULT_FORMAT(d);
  },
  tickSize: 5,
  style: {
    line: {
      strokeWidth: 1
    },
    ticks: {
      strokeWidth: 2
    },
    text: {}
  }
};
DecorativeAxis.propTypes = _objectSpread(_objectSpread({}, _abstractSeries["default"].propTypes), {}, {
  axisDomain: _propTypes["default"].arrayOf(_propTypes["default"].number).isRequired,
  axisEnd: _propTypes["default"].shape({
    x: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
    y: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string])
  }).isRequired,
  axisStart: _propTypes["default"].shape({
    x: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
    y: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string])
  }).isRequired,
  className: _propTypes["default"].string,
  numberOfTicks: _propTypes["default"].number,
  tickValue: _propTypes["default"].func,
  tickSize: _propTypes["default"].number,
  style: _propTypes["default"].shape({
    line: _propTypes["default"].object,
    ticks: _propTypes["default"].object,
    text: _propTypes["default"].object
  })
});
DecorativeAxis.displayName = 'DecorativeAxis';
var _default = exports["default"] = DecorativeAxis;