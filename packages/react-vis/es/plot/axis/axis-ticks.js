function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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
import React from 'react';
import PropTypes from 'prop-types';
import { ORIENTATION, getTickValues } from "../../utils/axis-utils";
import { getAttributeScale } from "../../utils/scales-utils";
var LEFT = ORIENTATION.LEFT,
    RIGHT = ORIENTATION.RIGHT,
    TOP = ORIENTATION.TOP,
    BOTTOM = ORIENTATION.BOTTOM;
var propTypes = {
  height: PropTypes.number.isRequired,
  orientation: PropTypes.oneOf([LEFT, RIGHT, TOP, BOTTOM]).isRequired,
  style: PropTypes.object,
  width: PropTypes.number.isRequired
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
  _inherits(AxisTicks, _React$Component);

  var _super = _createSuper(AxisTicks);

  function AxisTicks() {
    _classCallCheck(this, AxisTicks);

    return _super.apply(this, arguments);
  }

  _createClass(AxisTicks, [{
    key: "_areTicksWrapped",

    /**
     * Check if axis ticks should be mirrored (for the right and top positions.
     * @returns {boolean} True if mirrored.
     * @private
     */
    value: function _areTicksWrapped() {
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
          tickPadding = _this$props$tickPaddi === void 0 ? tickSize : _this$props$tickPaddi; // Assign the text orientation inside the label of the tick mark.

      var textAnchor;

      if (orientation === LEFT || orientation === BOTTOM && tickLabelAngle) {
        textAnchor = 'end';
      } else if (orientation === RIGHT || orientation === TOP && tickLabelAngle) {
        textAnchor = 'start';
      } else {
        textAnchor = 'middle';
      } // The label's position is translated to the given padding and then the
      // label is rotated to the given angle.


      var isVertical = this._isAxisVertical();

      var wrap = this._areTicksWrapped() ? -1 : 1;
      var labelOffset = wrap * (tickSizeOuter + tickPadding);
      var transform = (isVertical ? "translate(".concat(labelOffset, ", 0)") : "translate(0, ".concat(labelOffset, ")")) + (tickLabelAngle ? " rotate(".concat(tickLabelAngle, ")") : ''); // Set the vertical offset of the label according to the position of
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
      var _ref;

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
      return _ref = {}, _defineProperty(_ref, "".concat(tickXAttr, "1"), 0), _defineProperty(_ref, "".concat(tickXAttr, "2"), 0), _defineProperty(_ref, "".concat(tickYAttr, "1"), -wrap * tickSizeInner), _defineProperty(_ref, "".concat(tickYAttr, "2"), wrap * tickSizeOuter), _ref;
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
      var scale = getAttributeScale(this.props, attr);
      var values = getTickValues(scale, tickTotal, tickValues);

      var tickFormatFn = _getTickFormatFn(scale, tickTotal, tickFormat);

      var translateFn = this._getTickContainerPropsGetterFn();

      var pathProps = this._getTickLineProps();

      var textProps = this._getTickLabelProps();

      var ticks = values.map(function (v, i) {
        var pos = scale(v);
        var labelNode = tickFormatFn(v, i, scale, tickTotal);
        var shouldRenderAsOwnNode = React.isValidElement(labelNode) && !['tspan', 'textPath'].includes(labelNode.type);
        var shouldAddProps = labelNode && typeof labelNode.type !== 'string';
        return /*#__PURE__*/React.createElement("g", _extends({
          key: i
        }, translateFn(pos, 0), {
          className: "rv-xy-plot__axis__tick",
          style: style
        }), /*#__PURE__*/React.createElement("line", _extends({}, pathProps, {
          className: "rv-xy-plot__axis__tick__line",
          style: _objectSpread(_objectSpread({}, style), style.line)
        })), shouldRenderAsOwnNode ? React.cloneElement(labelNode, shouldAddProps ? _objectSpread(_objectSpread({}, textProps), {}, {
          containerWidth: width,
          tickCount: values.length
        }) : undefined) : /*#__PURE__*/React.createElement("text", _extends({}, textProps, {
          className: "rv-xy-plot__axis__tick__text",
          style: _objectSpread(_objectSpread({}, style), style.text)
        }), labelNode));
      });
      return /*#__PURE__*/React.createElement("g", {
        transform: "translate(".concat(x, ", ").concat(y, ")"),
        className: "rv-xy-plot__axis__ticks"
      }, ticks);
    }
  }]);

  return AxisTicks;
}(React.Component);

AxisTicks.defaultProps = defaultProps;
AxisTicks.displayName = 'AxisTicks';
AxisTicks.propTypes = propTypes;
AxisTicks.requiresSVG = true;
export default AxisTicks;