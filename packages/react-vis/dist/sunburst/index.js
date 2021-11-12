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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

function Sunburst(props) {
  var getAngle = props.getAngle,
      getAngle0 = props.getAngle0,
      animation = props.animation,
      className = props.className,
      children = props.children,
      data = props.data,
      height = props.height,
      hideRootNode = props.hideRootNode,
      getLabel = props.getLabel,
      width = props.width,
      getSize = props.getSize,
      colorType = props.colorType;
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
Sunburst.defaultProps = {
  getAngle: function getAngle(d) {
    return d.angle;
  },
  getAngle0: function getAngle0(d) {
    return d.angle0;
  },
  className: '',
  colorType: 'literal',
  getColor: function getColor(d) {
    return d.color;
  },
  hideRootNode: false,
  getLabel: function getLabel(d) {
    return d.label;
  },
  getSize: function getSize(d) {
    return d.size;
  },
  padAngle: 0
};
var _default = Sunburst;
exports["default"] = _default;