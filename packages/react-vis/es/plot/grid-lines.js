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
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getAttributeScale } from "../utils/scales-utils";
import { getCombinedClassName } from "../utils/styling-utils";
import Animation, { AnimationPropType } from "../animation";
import { getTicksTotalFromSize, getTickValues, DIRECTION } from "../utils/axis-utils";
var VERTICAL = DIRECTION.VERTICAL,
    HORIZONTAL = DIRECTION.HORIZONTAL;
var propTypes = {
  direction: PropTypes.oneOf([VERTICAL, HORIZONTAL]),
  attr: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  top: PropTypes.number,
  left: PropTypes.number,
  style: PropTypes.object,
  tickValues: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
  tickTotal: PropTypes.number,
  animation: AnimationPropType,
  // generally supplied by xyplot
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  innerWidth: PropTypes.number,
  innerHeight: PropTypes.number
};
var defaultProps = {
  direction: VERTICAL
};
var animatedProps = ['xRange', 'yRange', 'xDomain', 'yDomain', 'width', 'height', 'marginLeft', 'marginTop', 'marginRight', 'marginBottom', 'tickTotal'];

var GridLines = /*#__PURE__*/function (_PureComponent) {
  _inherits(GridLines, _PureComponent);

  var _super = _createSuper(GridLines);

  function GridLines() {
    _classCallCheck(this, GridLines);

    return _super.apply(this, arguments);
  }

  _createClass(GridLines, [{
    key: "_getDefaultProps",
    value: function _getDefaultProps() {
      var _this$props = this.props,
          innerWidth = _this$props.innerWidth,
          innerHeight = _this$props.innerHeight,
          marginTop = _this$props.marginTop,
          marginLeft = _this$props.marginLeft,
          direction = _this$props.direction;
      return {
        left: marginLeft,
        top: marginTop,
        width: innerWidth,
        height: innerHeight,
        tickTotal: getTicksTotalFromSize(direction === VERTICAL ? innerWidth : innerHeight)
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          animation = _this$props2.animation,
          className = _this$props2.className;

      if (animation) {
        return /*#__PURE__*/React.createElement(Animation, _extends({}, this.props, {
          animatedProps: animatedProps
        }), /*#__PURE__*/React.createElement(GridLines, _extends({}, this.props, {
          animation: null
        })));
      }

      var props = _objectSpread(_objectSpread({}, this._getDefaultProps()), this.props);

      var attr = props.attr,
          direction = props.direction,
          width = props.width,
          height = props.height,
          style = props.style,
          tickTotal = props.tickTotal,
          tickValues = props.tickValues,
          top = props.top,
          left = props.left;
      var isVertical = direction === VERTICAL;
      var tickXAttr = isVertical ? 'y' : 'x';
      var tickYAttr = isVertical ? 'x' : 'y';
      var length = isVertical ? height : width;
      var scale = getAttributeScale(props, attr);
      var values = getTickValues(scale, tickTotal, tickValues);
      return /*#__PURE__*/React.createElement("g", {
        transform: "translate(".concat(left, ",").concat(top, ")"),
        className: getCombinedClassName('rv-xy-plot__grid-lines', className)
      }, values.map(function (v, i) {
        var _pathProps;

        var pos = scale(v);
        var pathProps = (_pathProps = {}, _defineProperty(_pathProps, "".concat(tickYAttr, "1"), pos), _defineProperty(_pathProps, "".concat(tickYAttr, "2"), pos), _defineProperty(_pathProps, "".concat(tickXAttr, "1"), 0), _defineProperty(_pathProps, "".concat(tickXAttr, "2"), length), _pathProps);
        return /*#__PURE__*/React.createElement("line", _extends({}, pathProps, {
          key: i,
          className: "rv-xy-plot__grid-lines__line",
          style: style
        }));
      }));
    }
  }]);

  return GridLines;
}(PureComponent);

GridLines.displayName = 'GridLines';
GridLines.defaultProps = defaultProps;
GridLines.propTypes = propTypes;
GridLines.requiresSVG = true;
export default GridLines;