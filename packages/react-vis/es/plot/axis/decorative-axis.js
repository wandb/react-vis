function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

// Copyright (c) 2017 Uber Technologies, Inc.
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
import { format } from 'd3-format';
import PropTypes from 'prop-types';
import AbstractSeries from "../series/abstract-series";
import DecorativeAxisTicks from "./decorative-axis-ticks";
import Animation from "../../animation";
import { getCombinedClassName } from "../../utils/styling-utils";
var predefinedClassName = 'rv-xy-manipulable-axis rv-xy-plot__axis';
var animatedProps = ['xRange', 'yRange', 'xDomain', 'yDomain', 'width', 'height', 'marginLeft', 'marginTop', 'marginRight', 'marginBottom', 'tickSize', 'tickTotal', 'tickSizeInner', 'tickSizeOuter'];

var DecorativeAxis = /*#__PURE__*/function (_AbstractSeries) {
  _inherits(DecorativeAxis, _AbstractSeries);

  var _super = _createSuper(DecorativeAxis);

  function DecorativeAxis() {
    _classCallCheck(this, DecorativeAxis);

    return _super.apply(this, arguments);
  }

  _createClass(DecorativeAxis, [{
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
        return /*#__PURE__*/React.createElement(Animation, _extends({}, this.props, {
          animatedProps: animatedProps
        }), /*#__PURE__*/React.createElement(DecorativeAxis, _extends({}, this.props, {
          animation: null
        })));
      }

      var x = this._getAttributeFunctor('x');

      var y = this._getAttributeFunctor('y');

      return /*#__PURE__*/React.createElement("g", {
        className: getCombinedClassName(predefinedClassName, className),
        transform: "translate(".concat(marginLeft, ",").concat(marginTop, ")")
      }, /*#__PURE__*/React.createElement("line", _extends({}, _objectSpread({
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
      })), /*#__PURE__*/React.createElement("g", {
        className: "rv-xy-manipulable-axis__ticks"
      }, DecorativeAxisTicks({
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

  return DecorativeAxis;
}(AbstractSeries);

var DEFAULT_FORMAT = format('.2r');
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
DecorativeAxis.propTypes = _objectSpread(_objectSpread({}, AbstractSeries.propTypes), {}, {
  axisDomain: PropTypes.arrayOf(PropTypes.number).isRequired,
  axisEnd: PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    y: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }).isRequired,
  axisStart: PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    y: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }).isRequired,
  className: PropTypes.string,
  numberOfTicks: PropTypes.number,
  tickValue: PropTypes.func,
  tickSize: PropTypes.number,
  style: PropTypes.shape({
    line: PropTypes.object,
    ticks: PropTypes.object,
    text: PropTypes.object
  })
});
DecorativeAxis.displayName = 'DecorativeAxis';
export default DecorativeAxis;