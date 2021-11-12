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
import Animation from "../../animation";
import { ANIMATED_SERIES_PROPS } from "../../utils/series-utils";
import { warning } from "../../utils/react-utils";
import { getCombinedClassName } from "../../utils/styling-utils";
import { DEFAULT_SIZE, DEFAULT_OPACITY } from "../../theme";
import AbstractSeries from "./abstract-series";
var predefinedClassName = 'rv-xy-plot__series rv-xy-plot__series--mark';
var DEFAULT_STROKE_WIDTH = 1;

var MarkSeries = /*#__PURE__*/function (_AbstractSeries) {
  _inherits(MarkSeries, _AbstractSeries);

  var _super = _createSuper(MarkSeries);

  function MarkSeries() {
    _classCallCheck(this, MarkSeries);

    return _super.apply(this, arguments);
  }

  _createClass(MarkSeries, [{
    key: "_renderCircle",
    value: function _renderCircle(d, i, strokeWidth, style, scalingFunctions) {
      var _this = this;

      var fill = scalingFunctions.fill,
          opacity = scalingFunctions.opacity,
          size = scalingFunctions.size,
          stroke = scalingFunctions.stroke,
          x = scalingFunctions.x,
          y = scalingFunctions.y;
      var attrs = {
        r: size ? size(d) : DEFAULT_SIZE,
        cx: x(d),
        cy: y(d),
        style: _objectSpread({
          opacity: opacity ? opacity(d) : DEFAULT_OPACITY,
          stroke: stroke && stroke(d),
          fill: fill && fill(d),
          strokeWidth: strokeWidth || DEFAULT_STROKE_WIDTH
        }, style),
        key: i,
        onClick: function onClick(e) {
          return _this._valueClickHandler(d, e);
        },
        onContextMenu: function onContextMenu(e) {
          return _this._valueRightClickHandler(d, e);
        },
        onMouseOver: function onMouseOver(e) {
          return _this._valueMouseOverHandler(d, e);
        },
        onMouseOut: function onMouseOut(e) {
          return _this._valueMouseOutHandler(d, e);
        }
      };
      return /*#__PURE__*/React.createElement("circle", attrs);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          animation = _this$props.animation,
          className = _this$props.className,
          data = _this$props.data,
          marginLeft = _this$props.marginLeft,
          marginTop = _this$props.marginTop,
          strokeWidth = _this$props.strokeWidth,
          style = _this$props.style;

      if (this.props.nullAccessor) {
        warning('nullAccessor has been renamed to getNull', true);
      }

      var getNull = this.props.nullAccessor || this.props.getNull;

      if (!data) {
        return null;
      }

      if (animation) {
        return /*#__PURE__*/React.createElement(Animation, _extends({}, this.props, {
          animatedProps: ANIMATED_SERIES_PROPS
        }), /*#__PURE__*/React.createElement(MarkSeries, _extends({}, this.props, {
          animation: null
        })));
      }

      var scalingFunctions = {
        fill: this._getAttributeFunctor('fill') || this._getAttributeFunctor('color'),
        opacity: this._getAttributeFunctor('opacity'),
        size: this._getAttributeFunctor('size'),
        stroke: this._getAttributeFunctor('stroke') || this._getAttributeFunctor('color'),
        x: this._getAttributeFunctor('x'),
        y: this._getAttributeFunctor('y')
      };
      return /*#__PURE__*/React.createElement("g", {
        className: getCombinedClassName(predefinedClassName, className),
        transform: "translate(".concat(marginLeft, ",").concat(marginTop, ")")
      }, data.map(function (d, i) {
        return getNull(d) && _this2._renderCircle(d, i, strokeWidth, style, scalingFunctions);
      }));
    }
  }]);

  return MarkSeries;
}(AbstractSeries);

MarkSeries.displayName = 'MarkSeries';
MarkSeries.propTypes = _objectSpread(_objectSpread({}, AbstractSeries.propTypes), {}, {
  getNull: PropTypes.func,
  strokeWidth: PropTypes.number
});
MarkSeries.defaultProps = {
  getNull: function getNull() {
    return true;
  }
};
export default MarkSeries;