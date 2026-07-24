"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _axisUtils = require("../../utils/axis-utils");
var _scalesUtils = require("../../utils/scales-utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
var LEFT = _axisUtils.ORIENTATION.LEFT,
  RIGHT = _axisUtils.ORIENTATION.RIGHT,
  TOP = _axisUtils.ORIENTATION.TOP,
  BOTTOM = _axisUtils.ORIENTATION.BOTTOM;
var propTypes = {
  height: _propTypes["default"].number.isRequired,
  orientation: _propTypes["default"].oneOf([LEFT, RIGHT, TOP, BOTTOM]).isRequired,
  style: _propTypes["default"].object,
  width: _propTypes["default"].number.isRequired
};
var defaultProps = {
  style: {}
};
function _getTickFormatFn(scale, tickTotal, tickFormat) {
  return !tickFormat ? scale.tickFormat ? scale.tickFormat(tickTotal) : function (v) {
    return v;
  } : tickFormat;
}
var AxisTicks = /*#__PURE__*/function (_React$Component) {
  function AxisTicks() {
    _classCallCheck(this, AxisTicks);
    return _callSuper(this, AxisTicks, arguments);
  }
  _inherits(AxisTicks, _React$Component);
  return _createClass(AxisTicks, [{
    key: "_areTicksWrapped",
    value:
    /**
     * Check if axis ticks should be mirrored (for the right and top positions.
     * @returns {boolean} True if mirrored.
     * @private
     */
    function _areTicksWrapped() {
      var orientation = this.props.orientation;
      return orientation === LEFT || orientation === TOP;
    }
  }, {
    key: "_getTickContainerPropsGetterFn",
    value: function _getTickContainerPropsGetterFn() {
      if (this._isAxisVertical()) {
        return function (pos) {
          return {
            transform: "translate(0, ".concat(pos, ")")
          };
        };
      }
      return function (pos) {
        return {
          transform: "translate(".concat(pos, ", 0)")
        };
      };
    }

    /**
     * Get attributes for the label of the tick.
     * @returns {Object} Object with properties.
     * @private
     */
  }, {
    key: "_getTickLabelProps",
    value: function _getTickLabelProps() {
      var _this$props = this.props,
        orientation = _this$props.orientation,
        tickLabelAngle = _this$props.tickLabelAngle,
        tickSize = _this$props.tickSize,
        _this$props$tickSizeO = _this$props.tickSizeOuter,
        tickSizeOuter = _this$props$tickSizeO === void 0 ? tickSize : _this$props$tickSizeO,
        _this$props$tickPaddi = _this$props.tickPadding,
        tickPadding = _this$props$tickPaddi === void 0 ? tickSize : _this$props$tickPaddi;

      // Assign the text orientation inside the label of the tick mark.
      var textAnchor;
      if (orientation === LEFT || orientation === BOTTOM && tickLabelAngle) {
        textAnchor = 'end';
      } else if (orientation === RIGHT || orientation === TOP && tickLabelAngle) {
        textAnchor = 'start';
      } else {
        textAnchor = 'middle';
      }

      // The label's position is translated to the given padding and then the
      // label is rotated to the given angle.
      var isVertical = this._isAxisVertical();
      var wrap = this._areTicksWrapped() ? -1 : 1;
      var labelOffset = wrap * (tickSizeOuter + tickPadding);
      var transform = (isVertical ? "translate(".concat(labelOffset, ", 0)") : "translate(0, ".concat(labelOffset, ")")) + (tickLabelAngle ? " rotate(".concat(tickLabelAngle, ")") : '');

      // Set the vertical offset of the label according to the position of
      // the axis.
      var dy = orientation === TOP || tickLabelAngle ? '0' : orientation === BOTTOM ? '0.72em' : '0.32em';
      return {
        textAnchor: textAnchor,
        dy: dy,
        transform: transform
      };
    }

    /**
     * Get the props of the tick line.
     * @returns {Object} Props.
     * @private
     */
  }, {
    key: "_getTickLineProps",
    value: function _getTickLineProps() {
      var _this$props2 = this.props,
        tickSize = _this$props2.tickSize,
        _this$props2$tickSize = _this$props2.tickSizeOuter,
        tickSizeOuter = _this$props2$tickSize === void 0 ? tickSize : _this$props2$tickSize,
        _this$props2$tickSize2 = _this$props2.tickSizeInner,
        tickSizeInner = _this$props2$tickSize2 === void 0 ? tickSize : _this$props2$tickSize2;
      var isVertical = this._isAxisVertical();
      var tickXAttr = isVertical ? 'y' : 'x';
      var tickYAttr = isVertical ? 'x' : 'y';
      var wrap = this._areTicksWrapped() ? -1 : 1;
      return _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(tickXAttr, "1"), 0), "".concat(tickXAttr, "2"), 0), "".concat(tickYAttr, "1"), -wrap * tickSizeInner), "".concat(tickYAttr, "2"), wrap * tickSizeOuter);
    }

    /**
     * Gets if the axis is vertical.
     * @returns {boolean} True if vertical.
     * @private
     */
  }, {
    key: "_isAxisVertical",
    value: function _isAxisVertical() {
      var orientation = this.props.orientation;
      return orientation === LEFT || orientation === RIGHT;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
        attr = _this$props3.attr,
        orientation = _this$props3.orientation,
        width = _this$props3.width,
        height = _this$props3.height,
        style = _this$props3.style,
        tickFormat = _this$props3.tickFormat,
        tickTotal = _this$props3.tickTotal,
        tickValues = _this$props3.tickValues;
      var x = orientation === LEFT ? width : 0;
      var y = orientation === TOP ? height : 0;
      var scale = (0, _scalesUtils.getAttributeScale)(this.props, attr);
      var values = (0, _axisUtils.getTickValues)(scale, tickTotal, tickValues);
      var tickFormatFn = _getTickFormatFn(scale, tickTotal, tickFormat);
      var translateFn = this._getTickContainerPropsGetterFn();
      var pathProps = this._getTickLineProps();
      var textProps = this._getTickLabelProps();
      var ticks = values.map(function (v, i) {
        var pos = scale(v);
        var labelNode = tickFormatFn(v, i, scale, tickTotal);
        var shouldRenderAsOwnNode = /*#__PURE__*/_react["default"].isValidElement(labelNode) && !['tspan', 'textPath'].includes(labelNode.type);
        var shouldAddProps = labelNode && typeof labelNode.type !== 'string';
        return /*#__PURE__*/_react["default"].createElement("g", _extends({
          key: i
        }, translateFn(pos, 0), {
          className: "rv-xy-plot__axis__tick",
          style: style
        }), /*#__PURE__*/_react["default"].createElement("line", _extends({}, pathProps, {
          className: "rv-xy-plot__axis__tick__line",
          style: _objectSpread(_objectSpread({}, style), style.line)
        })), shouldRenderAsOwnNode ? (/*#__PURE__*/_react["default"].cloneElement(labelNode, shouldAddProps ? _objectSpread(_objectSpread({}, textProps), {}, {
          containerWidth: width,
          tickCount: values.length
        }) : undefined)) : /*#__PURE__*/_react["default"].createElement("text", _extends({}, textProps, {
          className: "rv-xy-plot__axis__tick__text",
          style: _objectSpread(_objectSpread({}, style), style.text)
        }), labelNode));
      });
      return /*#__PURE__*/_react["default"].createElement("g", {
        transform: "translate(".concat(x, ", ").concat(y, ")"),
        className: "rv-xy-plot__axis__ticks"
      }, ticks);
    }
  }]);
}(_react["default"].Component);
AxisTicks.defaultProps = defaultProps;
AxisTicks.displayName = 'AxisTicks';
AxisTicks.propTypes = propTypes;
AxisTicks.requiresSVG = true;
var _default = exports["default"] = AxisTicks;