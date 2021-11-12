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
import PropTypes from 'prop-types';
import AbstractSeries from "./abstract-series";
import Animation from "../../animation";
import { ANIMATED_SERIES_PROPS } from "../../utils/series-utils";
import { getCombinedClassName } from "../../utils/styling-utils";
var predefinedClassName = 'rv-xy-plot__series rv-xy-plot__series--label';

var getTextAnchor = function getTextAnchor(labelAnchorX, leftOfMiddle) {
  return labelAnchorX ? labelAnchorX : leftOfMiddle ? 'start' : 'end';
};

var getDominantBaseline = function getDominantBaseline(labelAnchorY, aboveMiddle) {
  return labelAnchorY ? labelAnchorY : aboveMiddle ? 'text-before-edge' : 'text-after-edge';
};

var LabelSeries = /*#__PURE__*/function (_AbstractSeries) {
  _inherits(LabelSeries, _AbstractSeries);

  var _super = _createSuper(LabelSeries);

  function LabelSeries() {
    _classCallCheck(this, LabelSeries);

    return _super.apply(this, arguments);
  }

  _createClass(LabelSeries, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          animation = _this$props.animation,
          allowOffsetToBeReversed = _this$props.allowOffsetToBeReversed,
          className = _this$props.className,
          data = _this$props.data,
          _data = _this$props._data,
          getLabel = _this$props.getLabel,
          marginLeft = _this$props.marginLeft,
          marginTop = _this$props.marginTop,
          rotation = _this$props.rotation,
          style = _this$props.style,
          xRange = _this$props.xRange,
          yRange = _this$props.yRange,
          labelAnchorX = _this$props.labelAnchorX,
          labelAnchorY = _this$props.labelAnchorY;

      if (!data) {
        return null;
      }

      if (animation) {
        return /*#__PURE__*/React.createElement(Animation, _extends({}, this.props, {
          animatedProps: ANIMATED_SERIES_PROPS
        }), /*#__PURE__*/React.createElement(LabelSeries, _extends({}, this.props, {
          animation: null,
          _data: data
        })));
      }

      var xFunctor = this._getAttributeFunctor('x');

      var yFunctor = this._getAttributeFunctor('y');

      return /*#__PURE__*/React.createElement("g", {
        className: getCombinedClassName(predefinedClassName, className),
        transform: "translate(".concat(marginLeft, ",").concat(marginTop, ")"),
        style: style
      }, data.reduce(function (res, d, i) {
        var markStyle = d.style,
            xOffset = d.xOffset,
            yOffset = d.yOffset;

        if (!getLabel(d)) {
          return res;
        }

        var xVal = xFunctor(d);
        var yVal = yFunctor(d);
        var leftOfMiddle = xVal < (xRange[1] - xRange[0]) / 2;
        var aboveMiddle = yVal < Math.abs(yRange[1] - yRange[0]) / 2;
        var x = xVal + (allowOffsetToBeReversed && leftOfMiddle ? -1 : 1) * (xOffset || 0);
        var y = yVal + (allowOffsetToBeReversed && aboveMiddle ? -1 : 1) * (yOffset || 0);
        var hasRotationValueSet = d.rotation === 0 || d.rotation;
        var labelRotation = hasRotationValueSet ? d.rotation : rotation;

        var attrs = _objectSpread({
          dominantBaseline: getDominantBaseline(labelAnchorY, aboveMiddle),
          className: 'rv-xy-plot__series--label-text',
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
          },
          textAnchor: getTextAnchor(labelAnchorX, leftOfMiddle),
          x: x,
          y: y,
          transform: "rotate(".concat(labelRotation, ",").concat(x, ",").concat(y, ")")
        }, markStyle);

        var textContent = getLabel(_data ? _data[i] : d);
        return res.concat([/*#__PURE__*/React.createElement("text", _extends({
          key: String(i)
        }, attrs), textContent)]);
      }, []));
    }
  }]);

  return LabelSeries;
}(AbstractSeries);

LabelSeries.propTypes = {
  animation: PropTypes.bool,
  allowOffsetToBeReversed: PropTypes.bool,
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    angle: PropTypes.number,
    radius: PropTypes.number,
    label: PropTypes.string,
    xOffset: PropTypes.number,
    yOffset: PropTypes.number,
    style: PropTypes.object
  })).isRequired,
  marginLeft: PropTypes.number,
  marginTop: PropTypes.number,
  rotation: PropTypes.number,
  style: PropTypes.object,
  xRange: PropTypes.arrayOf(PropTypes.number),
  yRange: PropTypes.arrayOf(PropTypes.number),
  labelAnchorX: PropTypes.string,
  labelAnchorY: PropTypes.string
};
LabelSeries.defaultProps = _objectSpread(_objectSpread({}, AbstractSeries.defaultProps), {}, {
  animation: false,
  rotation: 0,
  getLabel: function getLabel(d) {
    return d.label;
  }
});
LabelSeries.displayName = 'LabelSeries';
export default LabelSeries;