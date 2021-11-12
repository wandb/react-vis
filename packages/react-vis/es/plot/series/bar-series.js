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
import Animation from "../../animation";
import { ANIMATED_SERIES_PROPS, getStackParams } from "../../utils/series-utils";
import { getCombinedClassName } from "../../utils/styling-utils";
import AbstractSeries from "./abstract-series";
var predefinedClassName = 'rv-xy-plot__series rv-xy-plot__series--bar';

var BarSeries = /*#__PURE__*/function (_AbstractSeries) {
  _inherits(BarSeries, _AbstractSeries);

  var _super = _createSuper(BarSeries);

  function BarSeries() {
    _classCallCheck(this, BarSeries);

    return _super.apply(this, arguments);
  }

  _createClass(BarSeries, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          animation = _this$props.animation,
          className = _this$props.className,
          data = _this$props.data,
          linePosAttr = _this$props.linePosAttr,
          lineSizeAttr = _this$props.lineSizeAttr,
          marginLeft = _this$props.marginLeft,
          marginTop = _this$props.marginTop,
          style = _this$props.style,
          valuePosAttr = _this$props.valuePosAttr,
          valueSizeAttr = _this$props.valueSizeAttr,
          barWidth = _this$props.barWidth;

      if (!data) {
        return null;
      }

      if (animation) {
        return /*#__PURE__*/React.createElement(Animation, _extends({}, this.props, {
          animatedProps: ANIMATED_SERIES_PROPS
        }), /*#__PURE__*/React.createElement(BarSeries, _extends({}, this.props, {
          animation: null
        })));
      }

      var _getStackParams = getStackParams(this.props),
          sameTypeTotal = _getStackParams.sameTypeTotal,
          sameTypeIndex = _getStackParams.sameTypeIndex;

      var distance = this._getScaleDistance(linePosAttr);

      var lineFunctor = this._getAttributeFunctor(linePosAttr);

      var valueFunctor = this._getAttributeFunctor(valuePosAttr);

      var value0Functor = this._getAttr0Functor(valuePosAttr);

      var fillFunctor = this._getAttributeFunctor('fill') || this._getAttributeFunctor('color');

      var strokeFunctor = this._getAttributeFunctor('stroke') || this._getAttributeFunctor('color');

      var opacityFunctor = this._getAttributeFunctor('opacity');

      var halfSpace = distance / 2 * barWidth;
      return /*#__PURE__*/React.createElement("g", {
        className: getCombinedClassName(predefinedClassName, className),
        transform: "translate(".concat(marginLeft, ",").concat(marginTop, ")")
      }, data.map(function (d, i) {
        var _attrs;

        // totalSpaceAvailable is the space we have available to draw all the
        // bars of a same 'linePosAttr' value (a.k.a. sameTypeTotal)
        var totalSpaceAvailable = halfSpace * 2;
        var totalSpaceCenter = lineFunctor(d); // totalSpaceStartingPoint is the first pixel were we can start drawing

        var totalSpaceStartingPoint = totalSpaceCenter - halfSpace; // spaceTakenByInterBarsPixels has the overhead space consumed by each bar of sameTypeTotal

        var spaceTakenByInterBarsPixels = (sameTypeTotal - 1) / sameTypeTotal; // spacePerBar is the space we have available to draw sameTypeIndex bar

        var spacePerBar = totalSpaceAvailable / sameTypeTotal - spaceTakenByInterBarsPixels; // barStartingPoint is the first pixel were we can start drawing sameTypeIndex bar

        var barStartingPoint = totalSpaceStartingPoint + spacePerBar * sameTypeIndex + sameTypeIndex;
        var attrs = (_attrs = {
          style: _objectSpread({
            opacity: opacityFunctor && opacityFunctor(d),
            stroke: strokeFunctor && strokeFunctor(d),
            fill: fillFunctor && fillFunctor(d)
          }, style)
        }, _defineProperty(_attrs, linePosAttr, barStartingPoint), _defineProperty(_attrs, lineSizeAttr, spacePerBar), _defineProperty(_attrs, valuePosAttr, Math.min(value0Functor(d), valueFunctor(d))), _defineProperty(_attrs, valueSizeAttr, Math.abs(-value0Functor(d) + valueFunctor(d))), _defineProperty(_attrs, "onClick", function onClick(e) {
          return _this._valueClickHandler(d, e);
        }), _defineProperty(_attrs, "onContextMenu", function onContextMenu(e) {
          return _this._valueRightClickHandler(d, e);
        }), _defineProperty(_attrs, "onMouseOver", function onMouseOver(e) {
          return _this._valueMouseOverHandler(d, e);
        }), _defineProperty(_attrs, "onMouseOut", function onMouseOut(e) {
          return _this._valueMouseOutHandler(d, e);
        }), _attrs);
        return /*#__PURE__*/React.createElement("rect", _extends({
          key: "".concat(i)
        }, attrs));
      }));
    }
  }], [{
    key: "propTypes",
    get: function get() {
      return _objectSpread(_objectSpread({}, AbstractSeries.propTypes), {}, {
        linePosAttr: PropTypes.string,
        valuePosAttr: PropTypes.string,
        lineSizeAttr: PropTypes.string,
        valueSizeAttr: PropTypes.string,
        cluster: PropTypes.string,
        barWidth: PropTypes.number
      });
    }
  }, {
    key: "defaultProps",
    get: function get() {
      return {
        barWidth: 0.85
      };
    }
  }]);

  return BarSeries;
}(AbstractSeries);

BarSeries.displayName = 'BarSeries';
export default BarSeries;