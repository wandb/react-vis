"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _d3Shape = require("d3-shape");
var _animation = require("../animation");
var _arcSeries = _interopRequireDefault(require("../plot/series/arc-series"));
var _labelSeries = _interopRequireDefault(require("../plot/series/label-series"));
var _xyPlot = _interopRequireDefault(require("../plot/xy-plot"));
var _theme = require("../theme");
var _chartUtils = require("../utils/chart-utils");
var _seriesUtils = require("../utils/series-utils");
var _stylingUtils = require("../utils/styling-utils");
var _excluded = ["animation", "className", "children", "colorType", "colorRange", "data", "getAngle", "getAngle0", "getLabel", "getRadius", "getRadius0", "getSubLabel", "height", "hideRootNode", "innerRadius", "labelsAboveChildren", "labelsRadiusMultiplier", "labelsStyle", "margin", "onMouseLeave", "onMouseEnter", "padAngle", "radius", "showLabels", "style", "width"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
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
var predefinedClassName = 'rv-radial-chart';
var DEFAULT_RADIUS_MARGIN = 15;

/**
 * Create the list of wedges to render.
 * @param {Object} props
   props.data {Object} - tree structured data (each node has a name anc an array of children)
 * @returns {Array} Array of nodes.
 */
function getWedgesToRender(_ref) {
  var data = _ref.data,
    getAngle = _ref.getAngle;
  var pie = (0, _d3Shape.pie)().sort(null).value(getAngle);
  var pieData = pie(data).reverse();
  return pieData.map(function (row, index) {
    return _objectSpread(_objectSpread({}, row.data), {}, {
      angle0: row.startAngle,
      angle: row.endAngle,
      radius0: row.data.innerRadius || 0,
      radius: row.data.radius || 1,
      color: row.data.color || index
    });
  });
}
function generateLabels(mappedData, accessors) {
  var labelsRadiusMultiplier = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1.1;
  var getLabel = accessors.getLabel,
    getSubLabel = accessors.getSubLabel;
  return mappedData.reduce(function (res, row) {
    var angle = row.angle,
      angle0 = row.angle0,
      radius = row.radius;
    var centeredAngle = (angle + angle0) / 2;

    // unfortunate, but true fact: d3 starts its radians at 12 oclock rather than 3
    // and move clockwise rather than counter clockwise. why why why!
    var updatedAngle = -1 * centeredAngle + Math.PI / 2;
    var newLabels = [];
    if (getLabel(row)) {
      newLabels.push({
        angle: updatedAngle,
        radius: radius * labelsRadiusMultiplier,
        label: getLabel(row)
      });
    }
    if (getSubLabel(row)) {
      newLabels.push({
        angle: updatedAngle,
        radius: radius * labelsRadiusMultiplier,
        label: getSubLabel(row),
        style: {
          fontSize: 10
        },
        yOffset: 12
      });
    }
    return res.concat(newLabels);
  }, []);
  // could add force direction here to make sure the labels dont overlap
}

/**
 * Get the max radius so the chart can extend to the margin.
 * @param  {Number} width - container width
 * @param  {Number} height - container height
 * @return {Number} radius
 */
function getMaxRadius(width, height) {
  return Math.min(width, height) / 2 - DEFAULT_RADIUS_MARGIN;
}
function RadialChart(_ref2) {
  var animation = _ref2.animation,
    _ref2$className = _ref2.className,
    className = _ref2$className === void 0 ? '' : _ref2$className,
    children = _ref2.children,
    _ref2$colorType = _ref2.colorType,
    colorType = _ref2$colorType === void 0 ? 'category' : _ref2$colorType,
    _ref2$colorRange = _ref2.colorRange,
    colorRange = _ref2$colorRange === void 0 ? _theme.DISCRETE_COLOR_RANGE : _ref2$colorRange,
    data = _ref2.data,
    _ref2$getAngle = _ref2.getAngle,
    getAngle = _ref2$getAngle === void 0 ? function (d) {
      return d.angle;
    } : _ref2$getAngle,
    _ref2$getAngle2 = _ref2.getAngle0,
    getAngle0 = _ref2$getAngle2 === void 0 ? function (d) {
      return d.angle0;
    } : _ref2$getAngle2,
    _ref2$getLabel = _ref2.getLabel,
    getLabel = _ref2$getLabel === void 0 ? function (d) {
      return d.label;
    } : _ref2$getLabel,
    _ref2$getRadius = _ref2.getRadius,
    getRadius = _ref2$getRadius === void 0 ? function (d) {
      return d.radius;
    } : _ref2$getRadius,
    _ref2$getRadius2 = _ref2.getRadius0,
    getRadius0 = _ref2$getRadius2 === void 0 ? function (d) {
      return d.radius0;
    } : _ref2$getRadius2,
    _ref2$getSubLabel = _ref2.getSubLabel,
    getSubLabel = _ref2$getSubLabel === void 0 ? function (d) {
      return d.subLabel;
    } : _ref2$getSubLabel,
    height = _ref2.height,
    hideRootNode = _ref2.hideRootNode,
    innerRadius = _ref2.innerRadius,
    labelsAboveChildren = _ref2.labelsAboveChildren,
    labelsRadiusMultiplier = _ref2.labelsRadiusMultiplier,
    labelsStyle = _ref2.labelsStyle,
    margin = _ref2.margin,
    onMouseLeave = _ref2.onMouseLeave,
    onMouseEnter = _ref2.onMouseEnter,
    _ref2$padAngle = _ref2.padAngle,
    padAngle = _ref2$padAngle === void 0 ? 0 : _ref2$padAngle,
    radius = _ref2.radius,
    showLabels = _ref2.showLabels,
    style = _ref2.style,
    width = _ref2.width,
    restProps = _objectWithoutProperties(_ref2, _excluded);
  var props = _objectSpread({
    animation: animation,
    className: className,
    children: children,
    colorType: colorType,
    colorRange: colorRange,
    data: data,
    getAngle: getAngle,
    getAngle0: getAngle0,
    getLabel: getLabel,
    getRadius: getRadius,
    getRadius0: getRadius0,
    getSubLabel: getSubLabel,
    height: height,
    hideRootNode: hideRootNode,
    innerRadius: innerRadius,
    labelsAboveChildren: labelsAboveChildren,
    labelsRadiusMultiplier: labelsRadiusMultiplier,
    labelsStyle: labelsStyle,
    margin: margin,
    onMouseLeave: onMouseLeave,
    onMouseEnter: onMouseEnter,
    padAngle: padAngle,
    radius: radius,
    showLabels: showLabels,
    style: style,
    width: width
  }, restProps);
  var mappedData = getWedgesToRender({
    data: data,
    height: height,
    hideRootNode: hideRootNode,
    width: width,
    getAngle: getAngle
  });
  var radialDomain = (0, _seriesUtils.getRadialDomain)(mappedData);
  var arcProps = _objectSpread(_objectSpread({
    colorType: colorType
  }, props), {}, {
    animation: animation,
    radiusDomain: [0, radialDomain],
    data: mappedData,
    radiusNoFallBack: true,
    style: style,
    arcClassName: 'rv-radial-chart__series--pie__slice'
  });
  if (radius) {
    arcProps.radiusDomain = [0, 1];
    arcProps.radiusRange = [innerRadius || 0, radius];
    arcProps.radiusType = 'linear';
  }
  var maxRadius = radius ? radius : getMaxRadius(width, height);
  var defaultMargin = (0, _chartUtils.getRadialLayoutMargin)(width, height, maxRadius);
  var labels = generateLabels(mappedData, {
    getLabel: getLabel,
    getSubLabel: getSubLabel
  }, labelsRadiusMultiplier);
  return /*#__PURE__*/_react["default"].createElement(_xyPlot["default"], {
    height: height,
    width: width,
    margin: _objectSpread(_objectSpread({}, defaultMargin), margin),
    className: (0, _stylingUtils.getCombinedClassName)(className, predefinedClassName),
    onMouseLeave: onMouseLeave,
    onMouseEnter: onMouseEnter,
    xDomain: [-radialDomain, radialDomain],
    yDomain: [-radialDomain, radialDomain]
  }, /*#__PURE__*/_react["default"].createElement(_arcSeries["default"], _extends({}, arcProps, {
    getAngle: function getAngle(d) {
      return d.angle;
    }
  })), showLabels && !labelsAboveChildren && /*#__PURE__*/_react["default"].createElement(_labelSeries["default"], {
    data: labels,
    style: labelsStyle
  }), children, showLabels && labelsAboveChildren && /*#__PURE__*/_react["default"].createElement(_labelSeries["default"], {
    data: labels,
    style: labelsStyle
  }));
}
RadialChart.displayName = 'RadialChart';
RadialChart.propTypes = {
  animation: _animation.AnimationPropType,
  className: _propTypes["default"].string,
  colorType: _propTypes["default"].string,
  data: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    angle: _propTypes["default"].number,
    className: _propTypes["default"].string,
    label: _propTypes["default"].string,
    radius: _propTypes["default"].number,
    style: _propTypes["default"].object
  })).isRequired,
  getAngle: _propTypes["default"].func,
  getAngle0: _propTypes["default"].func,
  padAngle: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].number]),
  getRadius: _propTypes["default"].func,
  getRadius0: _propTypes["default"].func,
  getLabel: _propTypes["default"].func,
  height: _propTypes["default"].number.isRequired,
  labelsAboveChildren: _propTypes["default"].bool,
  labelsStyle: _propTypes["default"].object,
  margin: _chartUtils.MarginPropType,
  onValueClick: _propTypes["default"].func,
  onValueMouseOver: _propTypes["default"].func,
  onValueMouseOut: _propTypes["default"].func,
  showLabels: _propTypes["default"].bool,
  style: _propTypes["default"].object,
  subLabel: _propTypes["default"].func,
  width: _propTypes["default"].number.isRequired
};
var _default = exports["default"] = RadialChart;