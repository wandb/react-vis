"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _d3Scale = require("d3-scale");
var _d3Format = require("d3-format");
var _animation = require("../animation");
var _xyPlot = _interopRequireDefault(require("../plot/xy-plot"));
var _theme = require("../theme");
var _chartUtils = require("../utils/chart-utils");
var _stylingUtils = require("../utils/styling-utils");
var _markSeries = _interopRequireDefault(require("../plot/series/mark-series"));
var _polygonSeries = _interopRequireDefault(require("../plot/series/polygon-series"));
var _labelSeries = _interopRequireDefault(require("../plot/series/label-series"));
var _decorativeAxis = _interopRequireDefault(require("../plot/axis/decorative-axis"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // Copyright (c) 2016 - 2017 Uber Technologies, Inc.
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
var predefinedClassName = 'rv-radar-chart';
var DEFAULT_FORMAT = (0, _d3Format.format)('.2r');
var DEFAULT_STYLE = {
  axes: {
    line: {},
    ticks: {},
    text: {}
  },
  labels: {
    fontSize: 10,
    textAnchor: 'middle'
  },
  polygons: {
    strokeWidth: 0.5,
    strokeOpacity: 1,
    fillOpacity: 0.1
  }
};
/**
 * Generate axes for each of the domains
 * @param {Object} props
 - props.animation {Boolean}
 - props.domains {Array} array of object specifying the way each axis is to be plotted
 - props.style {object} style object for the whole chart
 - props.tickFormat {Function} formatting function for axes
 - props.startingAngle {number} the initial angle offset
 * @return {Array} the plotted axis components
 */
function getAxes(props) {
  var animation = props.animation,
    domains = props.domains,
    startingAngle = props.startingAngle,
    style = props.style,
    tickFormat = props.tickFormat,
    hideInnerMostValues = props.hideInnerMostValues;
  return domains.map(function (domain, index) {
    var angle = index / domains.length * Math.PI * 2 + startingAngle;
    var sortedDomain = domain.domain;
    var domainTickFormat = function domainTickFormat(t) {
      if (hideInnerMostValues && t === sortedDomain[0]) {
        return '';
      }
      return domain.tickFormat ? domain.tickFormat(t) : tickFormat(t);
    };
    return /*#__PURE__*/_react["default"].createElement(_decorativeAxis["default"], {
      animation: animation,
      key: "".concat(index, "-axis"),
      axisStart: {
        x: 0,
        y: 0
      },
      axisEnd: {
        x: getCoordinate(Math.cos(angle)),
        y: getCoordinate(Math.sin(angle))
      },
      axisDomain: sortedDomain,
      numberOfTicks: 5,
      tickValue: domainTickFormat,
      style: style.axes
    });
  });
}

/**
 * Generate x or y coordinate for axisEnd
 * @param {Number} axisEndPoint
 - epsilon is an arbitrarily chosen small number to approximate axisEndPoints
 - to true values resulting from trigonometry functions (sin, cos) on angles
 * @return {Number} the x or y coordinate accounting for exact trig values
 */
function getCoordinate(axisEndPoint) {
  var epsilon = 10e-13;
  if (Math.abs(axisEndPoint) <= epsilon) {
    axisEndPoint = 0;
  } else if (axisEndPoint > 0) {
    if (Math.abs(axisEndPoint - 0.5) <= epsilon) {
      axisEndPoint = 0.5;
    }
  } else if (axisEndPoint < 0) {
    if (Math.abs(axisEndPoint + 0.5) <= epsilon) {
      axisEndPoint = -0.5;
    }
  }
  return axisEndPoint;
}

/**
 * Generate labels for the ends of the axes
 * @param {Object} props
 - props.domains {Array} array of object specifying the way each axis is to be plotted
  - props.startingAngle {number} the initial angle offset
 - props.style {object} style object for just the labels
 * @return {Array} the prepped data for the labelSeries
 */
function getLabels(props) {
  var domains = props.domains,
    startingAngle = props.startingAngle,
    style = props.style;
  return domains.map(function (_ref, index) {
    var name = _ref.name;
    var angle = index / domains.length * Math.PI * 2 + startingAngle;
    var radius = 1.2;
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
      label: name,
      style: style
    };
  });
}

/**
 * Generate the actual polygons to be plotted
 * @param {Object} props
 - props.animation {Boolean}
 - props.data {Array} array of object specifying what values are to be plotted
 - props.domains {Array} array of object specifying the way each axis is to be plotted
 - props.startingAngle {number} the initial angle offset
 - props.style {object} style object for the whole chart
 * @return {Array} the plotted axis components
 */
function getPolygons(props) {
  var animation = props.animation,
    colorRange = props.colorRange,
    domains = props.domains,
    data = props.data,
    style = props.style,
    startingAngle = props.startingAngle,
    onSeriesMouseOver = props.onSeriesMouseOver,
    onSeriesMouseOut = props.onSeriesMouseOut;
  var scales = domains.reduce(function (acc, _ref2) {
    var domain = _ref2.domain,
      name = _ref2.name;
    acc[name] = (0, _d3Scale.scaleLinear)().domain(domain).range([0, 1]);
    return acc;
  }, {});
  return data.map(function (row, rowIndex) {
    var mappedData = domains.map(function (_ref3, index) {
      var name = _ref3.name,
        getValue = _ref3.getValue;
      var dataPoint = getValue ? getValue(row) : row[name];
      // error handling if point doesn't exist
      var angle = index / domains.length * Math.PI * 2 + startingAngle;
      // dont let the radius become negative
      var radius = Math.max(scales[name](dataPoint), 0);
      return {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
        name: row.name
      };
    });
    return /*#__PURE__*/_react["default"].createElement(_polygonSeries["default"], {
      animation: animation,
      className: "".concat(predefinedClassName, "-polygon"),
      key: "".concat(rowIndex, "-polygon"),
      data: mappedData,
      style: _objectSpread({
        stroke: row.color || row.stroke || colorRange[rowIndex % colorRange.length],
        fill: row.color || row.fill || colorRange[rowIndex % colorRange.length]
      }, style.polygons),
      onSeriesMouseOver: onSeriesMouseOver,
      onSeriesMouseOut: onSeriesMouseOut
    });
  });
}

/**
 * Generate circles at the polygon points for Hover functionality
 * @param {Object} props
 - props.animation {Boolean}
 - props.data {Array} array of object specifying what values are to be plotted
 - props.domains {Array} array of object specifying the way each axis is to be plotted
 - props.startingAngle {number} the initial angle offset
 - props.style {object} style object for the whole chart
 - props.onValueMouseOver {function} function to call on mouse over a polygon point
 - props.onValueMouseOver {function} function to call when mouse leaves a polygon point
 * @return {Array} the plotted axis components
 */
function getPolygonPoints(props) {
  var animation = props.animation,
    domains = props.domains,
    data = props.data,
    startingAngle = props.startingAngle,
    style = props.style,
    onValueMouseOver = props.onValueMouseOver,
    onValueMouseOut = props.onValueMouseOut;
  if (!onValueMouseOver) {
    return;
  }
  var scales = domains.reduce(function (acc, _ref4) {
    var domain = _ref4.domain,
      name = _ref4.name;
    acc[name] = (0, _d3Scale.scaleLinear)().domain(domain).range([0, 1]);
    return acc;
  }, {});
  return data.map(function (row, rowIndex) {
    var mappedData = domains.map(function (_ref5, index) {
      var name = _ref5.name,
        getValue = _ref5.getValue;
      var dataPoint = getValue ? getValue(row) : row[name];
      // error handling if point doesn't exist
      var angle = index / domains.length * Math.PI * 2 + startingAngle;
      // dont let the radius become negative
      var radius = Math.max(scales[name](dataPoint), 0);
      return {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
        domain: name,
        value: dataPoint,
        dataName: row.name
      };
    });
    return /*#__PURE__*/_react["default"].createElement(_markSeries["default"], {
      animation: animation,
      className: "".concat(predefinedClassName, "-polygonPoint"),
      key: "".concat(rowIndex, "-polygonPoint"),
      data: mappedData,
      size: 10,
      style: _objectSpread(_objectSpread({}, style.polygons), {}, {
        fill: 'transparent',
        stroke: 'transparent'
      }),
      onValueMouseOver: onValueMouseOver,
      onValueMouseOut: onValueMouseOut
    });
  });
}
function RadarChart(_ref6) {
  var animation = _ref6.animation,
    _ref6$className = _ref6.className,
    className = _ref6$className === void 0 ? '' : _ref6$className,
    children = _ref6.children,
    _ref6$colorRange = _ref6.colorRange,
    colorRange = _ref6$colorRange === void 0 ? _theme.DISCRETE_COLOR_RANGE : _ref6$colorRange,
    data = _ref6.data,
    domains = _ref6.domains,
    height = _ref6.height,
    _ref6$hideInnerMostVa = _ref6.hideInnerMostValues,
    hideInnerMostValues = _ref6$hideInnerMostVa === void 0 ? true : _ref6$hideInnerMostVa,
    margin = _ref6.margin,
    onMouseLeave = _ref6.onMouseLeave,
    onMouseEnter = _ref6.onMouseEnter,
    _ref6$startingAngle = _ref6.startingAngle,
    startingAngle = _ref6$startingAngle === void 0 ? Math.PI / 2 : _ref6$startingAngle,
    _ref6$style = _ref6.style,
    style = _ref6$style === void 0 ? DEFAULT_STYLE : _ref6$style,
    _ref6$tickFormat = _ref6.tickFormat,
    tickFormat = _ref6$tickFormat === void 0 ? DEFAULT_FORMAT : _ref6$tickFormat,
    width = _ref6.width,
    _ref6$renderAxesOverP = _ref6.renderAxesOverPolygons,
    renderAxesOverPolygons = _ref6$renderAxesOverP === void 0 ? false : _ref6$renderAxesOverP,
    onValueMouseOver = _ref6.onValueMouseOver,
    onValueMouseOut = _ref6.onValueMouseOut,
    onSeriesMouseOver = _ref6.onSeriesMouseOver,
    onSeriesMouseOut = _ref6.onSeriesMouseOut;
  var axes = getAxes({
    domains: domains,
    animation: animation,
    hideInnerMostValues: hideInnerMostValues,
    startingAngle: startingAngle,
    style: style,
    tickFormat: tickFormat
  });
  var polygons = getPolygons({
    animation: animation,
    colorRange: colorRange,
    domains: domains,
    data: data,
    startingAngle: startingAngle,
    style: style,
    onSeriesMouseOver: onSeriesMouseOver,
    onSeriesMouseOut: onSeriesMouseOut
  });
  var polygonPoints = getPolygonPoints({
    animation: animation,
    colorRange: colorRange,
    domains: domains,
    data: data,
    startingAngle: startingAngle,
    style: style,
    onValueMouseOver: onValueMouseOver,
    onValueMouseOut: onValueMouseOut
  });
  var labelSeries = /*#__PURE__*/_react["default"].createElement(_labelSeries["default"], {
    animation: animation,
    key: className,
    className: "".concat(predefinedClassName, "-label"),
    data: getLabels({
      domains: domains,
      style: style.labels,
      startingAngle: startingAngle
    })
  });
  return /*#__PURE__*/_react["default"].createElement(_xyPlot["default"], {
    height: height,
    width: width,
    margin: margin,
    dontCheckIfEmpty: true,
    className: (0, _stylingUtils.getCombinedClassName)(className, predefinedClassName),
    onMouseLeave: onMouseLeave,
    onMouseEnter: onMouseEnter,
    xDomain: [-1, 1],
    yDomain: [-1, 1]
  }, children, !renderAxesOverPolygons && axes.concat(polygons).concat(labelSeries).concat(polygonPoints), renderAxesOverPolygons && polygons.concat(labelSeries).concat(axes).concat(polygonPoints));
}
RadarChart.displayName = 'RadarChart';
RadarChart.propTypes = {
  animation: _animation.AnimationPropType,
  className: _propTypes["default"].string,
  colorType: _propTypes["default"].string,
  colorRange: _propTypes["default"].arrayOf(_propTypes["default"].string),
  data: _propTypes["default"].arrayOf(_propTypes["default"].object).isRequired,
  domains: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    name: _propTypes["default"].string.isRequired,
    domain: _propTypes["default"].arrayOf(_propTypes["default"].number).isRequired,
    tickFormat: _propTypes["default"].func
  })).isRequired,
  height: _propTypes["default"].number.isRequired,
  hideInnerMostValues: _propTypes["default"].bool,
  margin: _chartUtils.MarginPropType,
  startingAngle: _propTypes["default"].number,
  style: _propTypes["default"].shape({
    axes: _propTypes["default"].object,
    labels: _propTypes["default"].object,
    polygons: _propTypes["default"].object
  }),
  tickFormat: _propTypes["default"].func,
  width: _propTypes["default"].number.isRequired,
  renderAxesOverPolygons: _propTypes["default"].bool,
  onValueMouseOver: _propTypes["default"].func,
  onValueMouseOut: _propTypes["default"].func,
  onSeriesMouseOver: _propTypes["default"].func,
  onSeriesMouseOut: _propTypes["default"].func
};
var _default = exports["default"] = RadarChart;