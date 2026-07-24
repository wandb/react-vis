"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _d3Hierarchy = require("d3-hierarchy");
var _d3Scale = require("d3-scale");
var _animation = require("../animation");
var _labelSeries = _interopRequireDefault(require("../plot/series/label-series"));
var _arcSeries = _interopRequireDefault(require("../plot/series/arc-series"));
var _xyPlot = _interopRequireDefault(require("../plot/xy-plot"));
var _seriesUtils = require("../utils/series-utils");
var _chartUtils = require("../utils/chart-utils");
var _stylingUtils = require("../utils/styling-utils");
var _excluded = ["getAngle", "getAngle0", "animation", "className", "children", "colorType", "data", "getColor", "height", "hideRootNode", "getLabel", "width", "getSize", "padAngle"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
var predefinedClassName = 'rv-sunburst';
var LISTENERS_TO_OVERWRITE = ['onValueMouseOver', 'onValueMouseOut', 'onValueClick', 'onValueRightClick', 'onSeriesMouseOver', 'onSeriesMouseOut', 'onSeriesClick', 'onSeriesRightClick'];

/**
 * Create the list of nodes to render.
 * @param {Object} props
   props.data {Object} - tree structured data (each node has a name anc an array of children)
   props.height {number} - the height of the graphic to be rendered
   props.hideRootNode {boolean} - whether or not to hide the root node
   props.width {number} - the width of the graphic to be rendered
   props.getSize {function} - accessor for the size
 * @returns {Array} Array of nodes.
 */
function getNodesToRender(_ref) {
  var data = _ref.data,
    height = _ref.height,
    hideRootNode = _ref.hideRootNode,
    width = _ref.width,
    getSize = _ref.getSize;
  var partitionFunction = (0, _d3Hierarchy.partition)();
  var structuredInput = (0, _d3Hierarchy.hierarchy)(data).sum(getSize);
  var radius = Math.min(width, height) / 2 - 10;
  var x = (0, _d3Scale.scaleLinear)().range([0, 2 * Math.PI]);
  var y = (0, _d3Scale.scaleSqrt)().range([0, radius]);
  return partitionFunction(structuredInput).descendants().reduce(function (res, cell, index) {
    if (hideRootNode && index === 0) {
      return res;
    }
    return res.concat([_objectSpread({
      angle0: Math.max(0, Math.min(2 * Math.PI, x(cell.x0))),
      angle: Math.max(0, Math.min(2 * Math.PI, x(cell.x1))),
      radius0: Math.max(0, y(cell.y0)),
      radius: Math.max(0, y(cell.y1)),
      depth: cell.depth,
      parent: cell.parent
    }, cell.data)]);
  }, []);
}

/**
 * Convert arc nodes into label rows.
 * Important to use mappedData rather than regular data, bc it is already unrolled
 * @param {Array} mappedData - Array of nodes.
 * @param {Object} accessors - object of accessors
 * @returns {Array} array of node for rendering as labels
 */
function buildLabels(mappedData, accessors) {
  var getAngle = accessors.getAngle,
    getAngle0 = accessors.getAngle0,
    getLabel = accessors.getLabel,
    getRadius0 = accessors.getRadius0;
  return mappedData.filter(getLabel).map(function (row) {
    var truedAngle = -1 * getAngle(row) + Math.PI / 2;
    var truedAngle0 = -1 * getAngle0(row) + Math.PI / 2;
    var angle = (truedAngle0 + truedAngle) / 2;
    var rotateLabels = !row.dontRotateLabel;
    var rotAngle = -angle / (2 * Math.PI) * 360;
    return _objectSpread(_objectSpread({}, row), {}, {
      children: null,
      angle: null,
      radius: null,
      x: getRadius0(row) * Math.cos(angle),
      y: getRadius0(row) * Math.sin(angle),
      style: _objectSpread({
        textAnchor: rotAngle > 90 ? 'end' : 'start'
      }, row.labelStyle),
      rotation: rotateLabels ? rotAngle > 90 ? rotAngle + 180 : rotAngle === 90 ? 90 : rotAngle : null
    });
  });
}
var NOOP = function NOOP() {};
function Sunburst(_ref2) {
  var _ref2$getAngle = _ref2.getAngle,
    getAngle = _ref2$getAngle === void 0 ? function (d) {
      return d.angle;
    } : _ref2$getAngle,
    _ref2$getAngle2 = _ref2.getAngle0,
    getAngle0 = _ref2$getAngle2 === void 0 ? function (d) {
      return d.angle0;
    } : _ref2$getAngle2,
    animation = _ref2.animation,
    _ref2$className = _ref2.className,
    className = _ref2$className === void 0 ? '' : _ref2$className,
    children = _ref2.children,
    _ref2$colorType = _ref2.colorType,
    colorType = _ref2$colorType === void 0 ? 'literal' : _ref2$colorType,
    data = _ref2.data,
    _ref2$getColor = _ref2.getColor,
    getColor = _ref2$getColor === void 0 ? function (d) {
      return d.color;
    } : _ref2$getColor,
    height = _ref2.height,
    _ref2$hideRootNode = _ref2.hideRootNode,
    hideRootNode = _ref2$hideRootNode === void 0 ? false : _ref2$hideRootNode,
    _ref2$getLabel = _ref2.getLabel,
    getLabel = _ref2$getLabel === void 0 ? function (d) {
      return d.label;
    } : _ref2$getLabel,
    width = _ref2.width,
    _ref2$getSize = _ref2.getSize,
    getSize = _ref2$getSize === void 0 ? function (d) {
      return d.size;
    } : _ref2$getSize,
    _ref2$padAngle = _ref2.padAngle,
    padAngle = _ref2$padAngle === void 0 ? 0 : _ref2$padAngle,
    restProps = _objectWithoutProperties(_ref2, _excluded);
  var props = _objectSpread({
    getAngle: getAngle,
    getAngle0: getAngle0,
    animation: animation,
    className: className,
    children: children,
    colorType: colorType,
    data: data,
    getColor: getColor,
    height: height,
    hideRootNode: hideRootNode,
    getLabel: getLabel,
    width: width,
    getSize: getSize,
    padAngle: padAngle
  }, restProps);
  var mappedData = getNodesToRender({
    data: data,
    height: height,
    hideRootNode: hideRootNode,
    width: width,
    getSize: getSize
  });
  var radialDomain = (0, _seriesUtils.getRadialDomain)(mappedData);
  var margin = (0, _chartUtils.getRadialLayoutMargin)(width, height, radialDomain);
  var labelData = buildLabels(mappedData, {
    getAngle: getAngle,
    getAngle0: getAngle0,
    getLabel: getLabel,
    getRadius0: function getRadius0(d) {
      return d.radius0;
    }
  });
  var hofBuilder = function hofBuilder(f) {
    return function (e, i) {
      return f ? f(mappedData[e.index], i) : NOOP;
    };
  };
  return /*#__PURE__*/_react["default"].createElement(_xyPlot["default"], {
    height: height,
    hasTreeStructure: true,
    width: width,
    className: (0, _stylingUtils.getCombinedClassName)(predefinedClassName, className),
    margin: margin,
    xDomain: [-radialDomain, radialDomain],
    yDomain: [-radialDomain, radialDomain]
  }, /*#__PURE__*/_react["default"].createElement(_arcSeries["default"], _objectSpread(_objectSpread({
    colorType: colorType
  }, props), {}, {
    animation: animation,
    radiusDomain: [0, radialDomain],
    // need to present a stripped down version for interpolation
    data: animation ? mappedData.map(function (row, index) {
      return _objectSpread(_objectSpread({}, row), {}, {
        parent: null,
        children: null,
        index: index
      });
    }) : mappedData,
    _data: animation ? mappedData : null,
    arcClassName: "".concat(predefinedClassName, "__series--radial__arc")
  }, LISTENERS_TO_OVERWRITE.reduce(function (acc, propName) {
    var prop = props[propName];
    acc[propName] = animation ? hofBuilder(prop) : prop;
    return acc;
  }, {}))), labelData.length > 0 && /*#__PURE__*/_react["default"].createElement(_labelSeries["default"], {
    data: labelData,
    getLabel: getLabel
  }), children);
}
Sunburst.displayName = 'Sunburst';
Sunburst.propTypes = {
  animation: _animation.AnimationPropType,
  getAngle: _propTypes["default"].func,
  getAngle0: _propTypes["default"].func,
  className: _propTypes["default"].string,
  colorType: _propTypes["default"].string,
  data: _propTypes["default"].object.isRequired,
  height: _propTypes["default"].number.isRequired,
  hideRootNode: _propTypes["default"].bool,
  getLabel: _propTypes["default"].func,
  onValueClick: _propTypes["default"].func,
  onValueMouseOver: _propTypes["default"].func,
  onValueMouseOut: _propTypes["default"].func,
  getSize: _propTypes["default"].func,
  width: _propTypes["default"].number.isRequired,
  padAngle: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].number])
};
var _default = exports["default"] = Sunburst;