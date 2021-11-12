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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    var centeredAngle = (angle + angle0) / 2; // unfortunate, but true fact: d3 starts its radians at 12 oclock rather than 3
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
  }, []); // could add force direction here to make sure the labels dont overlap
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

function RadialChart(props) {
  var animation = props.animation,
      className = props.className,
      children = props.children,
      colorType = props.colorType,
      data = props.data,
      getAngle = props.getAngle,
      getLabel = props.getLabel,
      getSubLabel = props.getSubLabel,
      height = props.height,
      hideRootNode = props.hideRootNode,
      innerRadius = props.innerRadius,
      labelsAboveChildren = props.labelsAboveChildren,
      labelsRadiusMultiplier = props.labelsRadiusMultiplier,
      labelsStyle = props.labelsStyle,
      margin = props.margin,
      onMouseLeave = props.onMouseLeave,
      onMouseEnter = props.onMouseEnter,
      radius = props.radius,
      showLabels = props.showLabels,
      style = props.style,
      width = props.width;
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
RadialChart.defaultProps = {
  className: '',
  colorType: 'category',
  colorRange: _theme.DISCRETE_COLOR_RANGE,
  padAngle: 0,
  getAngle: function getAngle(d) {
    return d.angle;
  },
  getAngle0: function getAngle0(d) {
    return d.angle0;
  },
  getRadius: function getRadius(d) {
    return d.radius;
  },
  getRadius0: function getRadius0(d) {
    return d.radius0;
  },
  getLabel: function getLabel(d) {
    return d.label;
  },
  getSubLabel: function getSubLabel(d) {
    return d.subLabel;
  }
};
var _default = RadialChart;
exports["default"] = _default;