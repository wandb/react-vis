"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _d3Hierarchy = require("d3-hierarchy");
var _theme = require("../theme");
var _animation = require("../animation");
var _scalesUtils = require("../utils/scales-utils");
var _chartUtils = require("../utils/chart-utils");
var _treemapDom = _interopRequireDefault(require("./treemap-dom"));
var _treemapSvg = _interopRequireDefault(require("./treemap-svg"));
var _excluded = ["className", "colorRange", "_colorValue", "data", "hideRootNode", "margin", "mode", "onLeafClick", "onLeafMouseOver", "onLeafMouseOut", "opacityType", "_opacityValue", "padding", "sortFunction", "getSize", "getColor", "getLabel"];
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
var TREEMAP_TILE_MODES = {
  squarify: _d3Hierarchy.treemapSquarify,
  resquarify: _d3Hierarchy.treemapResquarify,
  slice: _d3Hierarchy.treemapSlice,
  dice: _d3Hierarchy.treemapDice,
  slicedice: _d3Hierarchy.treemapSliceDice,
  binary: _d3Hierarchy.treemapBinary
};
var TREEMAP_LAYOUT_MODES = ['circlePack', 'partition', 'partition-pivot'];
var NOOP = function NOOP(d) {
  return d;
};
var ATTRIBUTES = ['opacity', 'color'];
var DEFAULT_MARGINS = {
  left: 40,
  right: 10,
  top: 10,
  bottom: 40
};

/**
 * Get the map of scale functions from the given props.
 * @param {Object} props Props for the component.
 * @returns {Object} Map of scale functions.
 * @private
 */
function _getScaleFns(props) {
  var data = props.data;
  var allData = data.children || [];

  // Adding _allData property to the object to reuse the existing
  // getAttributeFunctor function.
  var compatibleProps = _objectSpread(_objectSpread(_objectSpread({}, props), (0, _scalesUtils.getMissingScaleProps)(props, allData, ATTRIBUTES)), {}, {
    _allData: allData
  });
  return {
    opacity: (0, _scalesUtils.getAttributeFunctor)(compatibleProps, 'opacity'),
    color: (0, _scalesUtils.getAttributeFunctor)(compatibleProps, 'color')
  };
}
var defaultSortFunction = function defaultSortFunction(a, b, accessor) {
  if (!accessor) {
    return 0;
  }
  return accessor(a) - accessor(b);
};
function Treemap(_ref) {
  var _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$colorRange = _ref.colorRange,
    colorRange = _ref$colorRange === void 0 ? _theme.CONTINUOUS_COLOR_RANGE : _ref$colorRange,
    _ref$_colorValue = _ref._colorValue,
    _colorValue = _ref$_colorValue === void 0 ? _theme.DEFAULT_COLOR : _ref$_colorValue,
    _ref$data = _ref.data,
    data = _ref$data === void 0 ? {
      children: []
    } : _ref$data,
    _ref$hideRootNode = _ref.hideRootNode,
    hideRootNode = _ref$hideRootNode === void 0 ? false : _ref$hideRootNode,
    _ref$margin = _ref.margin,
    margin = _ref$margin === void 0 ? DEFAULT_MARGINS : _ref$margin,
    _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? 'squarify' : _ref$mode,
    _ref$onLeafClick = _ref.onLeafClick,
    onLeafClick = _ref$onLeafClick === void 0 ? NOOP : _ref$onLeafClick,
    _ref$onLeafMouseOver = _ref.onLeafMouseOver,
    onLeafMouseOver = _ref$onLeafMouseOver === void 0 ? NOOP : _ref$onLeafMouseOver,
    _ref$onLeafMouseOut = _ref.onLeafMouseOut,
    onLeafMouseOut = _ref$onLeafMouseOut === void 0 ? NOOP : _ref$onLeafMouseOut,
    _ref$opacityType = _ref.opacityType,
    opacityType = _ref$opacityType === void 0 ? _theme.OPACITY_TYPE : _ref$opacityType,
    _ref$_opacityValue = _ref._opacityValue,
    _opacityValue = _ref$_opacityValue === void 0 ? _theme.DEFAULT_OPACITY : _ref$_opacityValue,
    _ref$padding = _ref.padding,
    padding = _ref$padding === void 0 ? 1 : _ref$padding,
    _ref$sortFunction = _ref.sortFunction,
    sortFunction = _ref$sortFunction === void 0 ? defaultSortFunction : _ref$sortFunction,
    _ref$getSize = _ref.getSize,
    getSize = _ref$getSize === void 0 ? function (d) {
      return d.size;
    } : _ref$getSize,
    _ref$getColor = _ref.getColor,
    getColor = _ref$getColor === void 0 ? function (d) {
      return d.color;
    } : _ref$getColor,
    _ref$getLabel = _ref.getLabel,
    getLabel = _ref$getLabel === void 0 ? function (d) {
      return d.title;
    } : _ref$getLabel,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var props = _objectSpread({
    className: className,
    colorRange: colorRange,
    _colorValue: _colorValue,
    data: data,
    hideRootNode: hideRootNode,
    margin: margin,
    mode: mode,
    onLeafClick: onLeafClick,
    onLeafMouseOver: onLeafMouseOver,
    onLeafMouseOut: onLeafMouseOut,
    opacityType: opacityType,
    _opacityValue: _opacityValue,
    padding: padding,
    sortFunction: sortFunction,
    getSize: getSize,
    getColor: getColor,
    getLabel: getLabel
  }, restProps);
  var scales = _getScaleFns(props);
  var innerDimensions = (0, _chartUtils.getInnerDimensions)(props, margin);

  /**
   * Create the list of nodes to render.
   * @returns {Array} Array of nodes.
   * @private
   */
  function _getNodesToRender() {
    var innerWidth = innerDimensions.innerWidth,
      innerHeight = innerDimensions.innerHeight;
    var data = props.data,
      mode = props.mode,
      padding = props.padding,
      sortFunction = props.sortFunction,
      getSize = props.getSize;
    if (!data) {
      return [];
    }
    if (mode === 'partition' || mode === 'partition-pivot') {
      var partitionFunction = (0, _d3Hierarchy.partition)().size(mode === 'partition-pivot' ? [innerHeight, innerWidth] : [innerWidth, innerHeight]).padding(padding);
      var _structuredInput = (0, _d3Hierarchy.hierarchy)(data).sum(getSize).sort(function (a, b) {
        return sortFunction(a, b, getSize);
      });
      var mappedNodes = partitionFunction(_structuredInput).descendants();
      if (mode === 'partition-pivot') {
        return mappedNodes.map(function (node) {
          return _objectSpread(_objectSpread({}, node), {}, {
            x0: node.y0,
            x1: node.y1,
            y0: node.x0,
            y1: node.x1
          });
        });
      }
      return mappedNodes;
    }
    if (mode === 'circlePack') {
      var packingFunction = (0, _d3Hierarchy.pack)().size([innerWidth, innerHeight]).padding(padding);
      var _structuredInput2 = (0, _d3Hierarchy.hierarchy)(data).sum(getSize).sort(function (a, b) {
        return sortFunction(a, b, getSize);
      });
      return packingFunction(_structuredInput2).descendants();
    }
    var tileFn = TREEMAP_TILE_MODES[mode];
    var treemapingFunction = (0, _d3Hierarchy.treemap)(tileFn).tile(tileFn).size([innerWidth, innerHeight]).padding(padding);
    var structuredInput = (0, _d3Hierarchy.hierarchy)(data).sum(getSize).sort(function (a, b) {
      return sortFunction(a, b, getSize);
    });
    return treemapingFunction(structuredInput).descendants();
  }
  var renderMode = props.renderMode;
  var nodes = _getNodesToRender();
  var TreemapElement = renderMode === 'SVG' ? _treemapSvg["default"] : _treemapDom["default"];
  return /*#__PURE__*/_react["default"].createElement(TreemapElement, _extends({}, props, {
    nodes: nodes,
    scales: scales
  }));
}
Treemap.displayName = 'Treemap';
Treemap.propTypes = {
  animation: _animation.AnimationPropType,
  className: _propTypes["default"].string,
  data: _propTypes["default"].object.isRequired,
  height: _propTypes["default"].number.isRequired,
  hideRootNode: _propTypes["default"].bool,
  margin: _chartUtils.MarginPropType,
  mode: _propTypes["default"].oneOf(Object.keys(TREEMAP_TILE_MODES).concat(TREEMAP_LAYOUT_MODES)),
  onLeafClick: _propTypes["default"].func,
  onLeafMouseOver: _propTypes["default"].func,
  onLeafMouseOut: _propTypes["default"].func,
  useCirclePacking: _propTypes["default"].bool,
  padding: _propTypes["default"].number.isRequired,
  sortFunction: _propTypes["default"].func,
  width: _propTypes["default"].number.isRequired,
  getSize: _propTypes["default"].func,
  getColor: _propTypes["default"].func
};
var _default = exports["default"] = Treemap;