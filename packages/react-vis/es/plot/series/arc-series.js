function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
import { arc as arcBuilder } from 'd3-shape';
import { ANIMATED_SERIES_PROPS } from "../../utils/series-utils";
import AbstractSeries from "./abstract-series";
import { getAttributeFunctor, getAttr0Functor, extractScalePropsFromProps, getMissingScaleProps, getScalePropTypesByAttribute } from "../../utils/scales-utils";
import { getCombinedClassName } from "../../utils/styling-utils";
var predefinedClassName = 'rv-xy-plot__series rv-xy-plot__series--arc';
var ATTRIBUTES = ['radius', 'angle'];

var defaultProps = _objectSpread(_objectSpread({}, AbstractSeries.defaultProps), {}, {
  center: {
    x: 0,
    y: 0
  },
  arcClassName: '',
  className: '',
  style: {},
  padAngle: 0
});
/**
 * Prepare the internal representation of row for real use.
 * This is necessary because d3 insists on starting at 12 oclock and moving
 * clockwise, rather than starting at 3 oclock and moving counter clockwise
 * as one might expect from polar
 * @param {Object} row - coordinate object to be modifed
 * @return {Object} angle corrected object
 */


function modifyRow(row) {
  var radius = row.radius,
      angle = row.angle,
      angle0 = row.angle0;
  var truedAngle = -1 * angle + Math.PI / 2;
  var truedAngle0 = -1 * angle0 + Math.PI / 2;
  return _objectSpread(_objectSpread({}, row), {}, {
    x: radius * Math.cos(truedAngle),
    y: radius * Math.sin(truedAngle),
    angle: truedAngle,
    angle0: truedAngle0
  });
}

var ArcSeries = /*#__PURE__*/function (_AbstractSeries) {
  _inherits(ArcSeries, _AbstractSeries);

  var _super = _createSuper(ArcSeries);

  function ArcSeries(props) {
    var _this;

    _classCallCheck(this, ArcSeries);

    _this = _super.call(this, props);

    var scaleProps = _this._getAllScaleProps(props);

    _this.state = {
      scaleProps: scaleProps
    };
    return _this;
  }

  _createClass(ArcSeries, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      this.setState({
        scaleProps: this._getAllScaleProps(nextProps)
      });
    }
    /**
     * Get the map of scales from the props.
     * @param {Object} props Props.
     * @param {Array} data Array of all data.
     * @returns {Object} Map of scales.
     * @private
     */

  }, {
    key: "_getAllScaleProps",
    value: function _getAllScaleProps(props) {
      var defaultScaleProps = this._getDefaultScaleProps(props);

      var userScaleProps = extractScalePropsFromProps(props, ATTRIBUTES);
      var missingScaleProps = getMissingScaleProps(_objectSpread(_objectSpread({}, defaultScaleProps), userScaleProps), props.data, ATTRIBUTES);
      return _objectSpread(_objectSpread(_objectSpread({}, defaultScaleProps), userScaleProps), missingScaleProps);
    }
    /**
     * Get the list of scale-related settings that should be applied by default.
     * @param {Object} props Object of props.
     * @returns {Object} Defaults.
     * @private
     */

  }, {
    key: "_getDefaultScaleProps",
    value: function _getDefaultScaleProps(props) {
      var innerWidth = props.innerWidth,
          innerHeight = props.innerHeight;
      var radius = Math.min(innerWidth / 2, innerHeight / 2);
      return {
        radiusRange: [0, radius],
        _radiusValue: radius,
        angleType: 'literal'
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          arcClassName = _this$props.arcClassName,
          animation = _this$props.animation,
          className = _this$props.className,
          center = _this$props.center,
          data = _this$props.data,
          disableSeries = _this$props.disableSeries,
          hideSeries = _this$props.hideSeries,
          marginLeft = _this$props.marginLeft,
          marginTop = _this$props.marginTop,
          padAngle = _this$props.padAngle,
          style = _this$props.style;

      if (!data) {
        return null;
      }

      if (animation) {
        var cloneData = data.map(function (d) {
          return _objectSpread({}, d);
        });
        return /*#__PURE__*/React.createElement("g", {
          className: "rv-xy-plot__series--arc__animation-wrapper"
        }, /*#__PURE__*/React.createElement(Animation, _extends({}, this.props, {
          animatedProps: ANIMATED_SERIES_PROPS,
          data: cloneData
        }), /*#__PURE__*/React.createElement(ArcSeries, _extends({}, this.props, {
          animation: null,
          disableSeries: true,
          data: cloneData
        }))), /*#__PURE__*/React.createElement(ArcSeries, _extends({}, this.props, {
          animation: null,
          hideSeries: true,
          style: {
            stroke: 'red'
          }
        })));
      }

      var scaleProps = this.state.scaleProps;
      var radiusDomain = scaleProps.radiusDomain; // need to generate our own functors as abstract series doesnt have anythign for us

      var radius = getAttributeFunctor(scaleProps, 'radius');
      var radius0 = getAttr0Functor(scaleProps, 'radius');
      var angle = getAttributeFunctor(scaleProps, 'angle');
      var angle0 = getAttr0Functor(scaleProps, 'angle'); // but it does have good color support!

      var fill = this._getAttributeFunctor('fill') || this._getAttributeFunctor('color');

      var stroke = this._getAttributeFunctor('stroke') || this._getAttributeFunctor('color');

      var opacity = this._getAttributeFunctor('opacity');

      var x = this._getAttributeFunctor('x');

      var y = this._getAttributeFunctor('y');

      return /*#__PURE__*/React.createElement("g", {
        className: getCombinedClassName(predefinedClassName, className),
        onMouseOver: this._seriesMouseOverHandler,
        onMouseOut: this._seriesMouseOutHandler,
        onClick: this._seriesClickHandler,
        onContextMenu: this._seriesRightClickHandler,
        opacity: hideSeries ? 0 : 1,
        pointerEvents: disableSeries ? 'none' : 'all',
        transform: "translate(".concat(marginLeft + x(center), ",").concat(marginTop + y(center), ")")
      }, data.map(function (row, i) {
        var noRadius = radiusDomain[1] === radiusDomain[0];
        var arcArg = {
          innerRadius: noRadius ? 0 : radius0(row),
          outerRadius: radius(row),
          startAngle: angle0(row) || 0,
          endAngle: angle(row)
        };
        var arcedData = arcBuilder().padAngle(padAngle);
        var rowStyle = row.style || {};
        var rowClassName = row.className || '';
        return /*#__PURE__*/React.createElement("path", {
          key: "path-".concat(i),
          style: _objectSpread(_objectSpread({
            opacity: opacity && opacity(row),
            stroke: stroke && stroke(row),
            fill: fill && fill(row)
          }, style), rowStyle),
          onClick: function onClick(e) {
            return _this2._valueClickHandler(modifyRow(row), e);
          },
          onContextMenu: function onContextMenu(e) {
            return _this2._valueRightClickHandler(modifyRow(row), e);
          },
          onMouseOver: function onMouseOver(e) {
            return _this2._valueMouseOverHandler(modifyRow(row), e);
          },
          onMouseOut: function onMouseOut(e) {
            return _this2._valueMouseOutHandler(modifyRow(row), e);
          },
          className: "".concat(predefinedClassName, "-path ").concat(arcClassName, " ").concat(rowClassName),
          d: arcedData(arcArg)
        });
      }));
    }
  }]);

  return ArcSeries;
}(AbstractSeries);

ArcSeries.propTypes = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, AbstractSeries.propTypes), getScalePropTypesByAttribute('radius')), getScalePropTypesByAttribute('angle')), {}, {
  center: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  arcClassName: PropTypes.string,
  padAngle: PropTypes.oneOfType([PropTypes.func, PropTypes.number])
});
ArcSeries.defaultProps = defaultProps;
ArcSeries.displayName = 'ArcSeries';
export default ArcSeries;