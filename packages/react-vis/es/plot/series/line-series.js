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
import * as d3Shape from 'd3-shape';
import Animation from "../../animation";
import { DEFAULT_OPACITY } from "../../theme";
import { ANIMATED_SERIES_PROPS } from "../../utils/series-utils";
import { warning } from "../../utils/react-utils";
import { getCombinedClassName } from "../../utils/styling-utils";
import AbstractSeries from "./abstract-series";
var predefinedClassName = 'rv-xy-plot__series rv-xy-plot__series--line';
var STROKE_STYLES = {
  dashed: '6, 2',
  solid: null
};

var LineSeries = /*#__PURE__*/function (_AbstractSeries) {
  _inherits(LineSeries, _AbstractSeries);

  var _super = _createSuper(LineSeries);

  function LineSeries() {
    _classCallCheck(this, LineSeries);

    return _super.apply(this, arguments);
  }

  _createClass(LineSeries, [{
    key: "_renderLine",
    value: function _renderLine(data, x, y, curve, getNull) {
      var line = d3Shape.line();

      if (curve !== null) {
        if (typeof curve === 'string' && d3Shape[curve]) {
          line = line.curve(d3Shape[curve]);
        } else if (typeof curve === 'function') {
          line = line.curve(curve);
        }
      }

      line = line.defined(getNull);
      line = line.x(x).y(y);
      return line(data);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          animation = _this$props.animation,
          className = _this$props.className,
          data = _this$props.data;

      if (this.props.nullAccessor) {
        warning('nullAccessor has been renamed to getNull', true);
      }

      if (!data) {
        return null;
      }

      if (animation) {
        return /*#__PURE__*/React.createElement(Animation, _extends({}, this.props, {
          animatedProps: ANIMATED_SERIES_PROPS
        }), /*#__PURE__*/React.createElement(LineSeries, _extends({}, this.props, {
          animation: null
        })));
      }

      var _this$props2 = this.props,
          curve = _this$props2.curve,
          marginLeft = _this$props2.marginLeft,
          marginTop = _this$props2.marginTop,
          strokeDasharray = _this$props2.strokeDasharray,
          strokeStyle = _this$props2.strokeStyle,
          strokeWidth = _this$props2.strokeWidth,
          style = _this$props2.style;

      var x = this._getAttributeFunctor('x');

      var y = this._getAttributeFunctor('y');

      var stroke = this._getAttributeValue('stroke') || this._getAttributeValue('color');

      var newOpacity = this._getAttributeValue('opacity');

      var opacity = Number.isFinite(newOpacity) ? newOpacity : DEFAULT_OPACITY;
      var getNull = this.props.nullAccessor || this.props.getNull;

      var d = this._renderLine(data, x, y, curve, getNull);

      return /*#__PURE__*/React.createElement("path", {
        d: d,
        className: getCombinedClassName(predefinedClassName, className),
        transform: "translate(".concat(marginLeft, ",").concat(marginTop, ")"),
        onMouseOver: this._seriesMouseOverHandler,
        onMouseOut: this._seriesMouseOutHandler,
        onClick: this._seriesClickHandler,
        onContextMenu: this._seriesRightClickHandler,
        style: _objectSpread({
          opacity: opacity,
          strokeDasharray: STROKE_STYLES[strokeStyle] || strokeDasharray,
          strokeWidth: strokeWidth,
          stroke: stroke
        }, style)
      });
    }
  }]);

  return LineSeries;
}(AbstractSeries);

LineSeries.displayName = 'LineSeries';
LineSeries.propTypes = _objectSpread(_objectSpread({}, AbstractSeries.propTypes), {}, {
  strokeStyle: PropTypes.oneOf(Object.keys(STROKE_STYLES)),
  curve: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  getNull: PropTypes.func
});
LineSeries.defaultProps = _objectSpread(_objectSpread({}, AbstractSeries.defaultProps), {}, {
  strokeStyle: 'solid',
  style: {},
  opacity: 1,
  curve: null,
  className: '',
  getNull: function getNull() {
    return true;
  }
});
export default LineSeries;