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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  var allData = data.children || []; // Adding _allData property to the object to reuse the existing
  // getAttributeFunctor function.

  var compatibleProps = _objectSpread(_objectSpread(_objectSpread({}, props), (0, _scalesUtils.getMissingScaleProps)(props, allData, ATTRIBUTES)), {}, {
    _allData: allData
  });

  return {
    opacity: (0, _scalesUtils.getAttributeFunctor)(compatibleProps, 'opacity'),
    color: (0, _scalesUtils.getAttributeFunctor)(compatibleProps, 'color')
  };
}

function Treemap(props) {
  var scales = _getScaleFns(props);

  var innerDimensions = (0, _chartUtils.getInnerDimensions)(props, props.margin);
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
Treemap.defaultProps = {
  className: '',
  colorRange: _theme.CONTINUOUS_COLOR_RANGE,
  _colorValue: _theme.DEFAULT_COLOR,
  data: {
    children: []
  },
  hideRootNode: false,
  margin: DEFAULT_MARGINS,
  mode: 'squarify',
  onLeafClick: NOOP,
  onLeafMouseOver: NOOP,
  onLeafMouseOut: NOOP,
  opacityType: _theme.OPACITY_TYPE,
  _opacityValue: _theme.DEFAULT_OPACITY,
  padding: 1,
  sortFunction: function sortFunction(a, b, accessor) {
    if (!accessor) {
      return 0;
    }

    return accessor(a) - accessor(b);
  },
  getSize: function getSize(d) {
    return d.size;
  },
  getColor: function getColor(d) {
    return d.color;
  },
  getLabel: function getLabel(d) {
    return d.title;
  }
};
var _default = Treemap;
exports["default"] = _default;