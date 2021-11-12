"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _d3Sankey = require("d3-sankey");

var _xyPlot = _interopRequireDefault(require("../plot/xy-plot"));

var _chartUtils = require("../utils/chart-utils");

var _stylingUtils = require("../utils/styling-utils");

var _verticalRectSeries = _interopRequireDefault(require("../plot/series/vertical-rect-series"));

var _labelSeries = _interopRequireDefault(require("../plot/series/label-series"));

var _voronoi = _interopRequireDefault(require("../plot/voronoi"));

var _theme = require("../theme");

var _sankeyLink = _interopRequireDefault(require("./sankey-link"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var NOOP = function NOOP(f) {
  return f;
};

var ALIGNMENTS = {
  justify: _d3Sankey.sankeyJustify,
  center: _d3Sankey.sankeyCenter,
  left: _d3Sankey.sankeyLeft,
  right: _d3Sankey.sankeyRight
};
var DEFAULT_MARGINS = {
  top: 20,
  left: 20,
  right: 20,
  bottom: 20
};

function Sankey(props) {
  var align = props.align,
      animation = props.animation,
      children = props.children,
      className = props.className,
      hasVoronoi = props.hasVoronoi,
      height = props.height,
      hideLabels = props.hideLabels,
      labelRotation = props.labelRotation,
      layout = props.layout,
      links = props.links,
      linkOpacity = props.linkOpacity,
      margin = props.margin,
      nodePadding = props.nodePadding,
      nodes = props.nodes,
      nodeWidth = props.nodeWidth,
      onValueClick = props.onValueClick,
      onValueMouseOver = props.onValueMouseOver,
      onValueMouseOut = props.onValueMouseOut,
      onLinkClick = props.onLinkClick,
      onLinkMouseOver = props.onLinkMouseOver,
      onLinkMouseOut = props.onLinkMouseOut,
      style = props.style,
      width = props.width;

  var nodesCopy = _toConsumableArray(new Array(nodes.length)).map(function (e, i) {
    return _objectSpread({}, nodes[i]);
  });

  var linksCopy = _toConsumableArray(new Array(links.length)).map(function (e, i) {
    return _objectSpread({}, links[i]);
  });

  var _getInnerDimensions = (0, _chartUtils.getInnerDimensions)({
    margin: margin,
    height: height,
    width: width
  }, DEFAULT_MARGINS),
      marginLeft = _getInnerDimensions.marginLeft,
      marginTop = _getInnerDimensions.marginTop,
      marginRight = _getInnerDimensions.marginRight,
      marginBottom = _getInnerDimensions.marginBottom;

  var sankeyInstance = (0, _d3Sankey.sankey)().extent([[marginLeft, marginTop], [width - marginRight, height - marginBottom - marginTop]]).nodeWidth(nodeWidth).nodePadding(nodePadding).nodes(nodesCopy).links(linksCopy).nodeAlign(ALIGNMENTS[align]).iterations(layout);
  sankeyInstance(nodesCopy);
  var nWidth = sankeyInstance.nodeWidth();
  var path = (0, _d3Sankey.sankeyLinkHorizontal)();
  return /*#__PURE__*/_react["default"].createElement(_xyPlot["default"], _extends({}, props, {
    yType: "literal",
    className: (0, _stylingUtils.getCombinedClassName)('rv-sankey', className)
  }), linksCopy.map(function (link, i) {
    return /*#__PURE__*/_react["default"].createElement(_sankeyLink["default"], {
      style: style.links,
      data: path(link),
      opacity: link.opacity || linkOpacity,
      color: link.color,
      onLinkClick: onLinkClick,
      onLinkMouseOver: onLinkMouseOver,
      onLinkMouseOut: onLinkMouseOut,
      strokeWidth: Math.max(link.width, 1),
      node: link,
      nWidth: nWidth,
      key: "link-".concat(i)
    });
  }), /*#__PURE__*/_react["default"].createElement(_verticalRectSeries["default"], {
    animation: animation,
    className: (0, _stylingUtils.getCombinedClassName)(className, 'rv-sankey__node'),
    data: nodesCopy.map(function (node) {
      return _objectSpread(_objectSpread({}, node), {}, {
        y: node.y1 - marginTop,
        y0: node.y0 - marginTop,
        x: node.x1,
        x0: node.x0,
        color: node.color || _theme.DISCRETE_COLOR_RANGE[0],
        sourceLinks: null,
        targetLinks: null
      });
    }),
    style: style.rects,
    onValueClick: onValueClick,
    onValueMouseOver: onValueMouseOver,
    onValueMouseOut: onValueMouseOut,
    colorType: "literal"
  }), !hideLabels && /*#__PURE__*/_react["default"].createElement(_labelSeries["default"], {
    animation: animation,
    className: className,
    rotation: labelRotation,
    labelAnchorY: "text-before-edge",
    data: nodesCopy.map(function (node, i) {
      return _objectSpread({
        x: node.x0 + (node.x0 < width / 2 ? nWidth + 10 : -10),
        y: (node.y0 + node.y1) / 2 - marginTop,
        label: node.name,
        style: _objectSpread({
          textAnchor: node.x0 < width / 2 ? 'start' : 'end',
          dy: '-.5em'
        }, style.labels)
      }, nodes[i]);
    })
  }), hasVoronoi && /*#__PURE__*/_react["default"].createElement(_voronoi["default"], {
    className: "rv-sankey__voronoi",
    extent: [[-marginLeft, -marginTop], [width + marginRight, height + marginBottom]],
    nodes: nodesCopy,
    onClick: onValueClick,
    onHover: onValueMouseOver,
    onBlur: onValueMouseOut,
    x: function x(d) {
      return d.x0 + (d.x1 - d.x0) / 2;
    },
    y: function y(d) {
      return d.y0 + (d.y1 - d.y0) / 2;
    }
  }), children);
}

Sankey.defaultProps = {
  align: 'justify',
  className: '',
  hasVoronoi: false,
  hideLabels: false,
  labelRotation: 0,
  layout: 50,
  margin: DEFAULT_MARGINS,
  nodePadding: 10,
  nodeWidth: 10,
  onValueMouseOver: NOOP,
  onValueClick: NOOP,
  onValueMouseOut: NOOP,
  onLinkClick: NOOP,
  onLinkMouseOver: NOOP,
  onLinkMouseOut: NOOP,
  style: {
    links: {},
    rects: {},
    labels: {}
  }
};
Sankey.propTypes = {
  align: _propTypes["default"].oneOf(['justify', 'left', 'right', 'center']),
  className: _propTypes["default"].string,
  hasVoronoi: _propTypes["default"].bool,
  height: _propTypes["default"].number.isRequired,
  hideLabels: _propTypes["default"].bool,
  labelRotation: _propTypes["default"].number,
  layout: _propTypes["default"].number,
  links: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    source: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].object]).isRequired,
    target: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].object]).isRequired
  })).isRequired,
  margin: _chartUtils.MarginPropType,
  nodePadding: _propTypes["default"].number,
  nodes: _propTypes["default"].arrayOf(_propTypes["default"].object).isRequired,
  nodeWidth: _propTypes["default"].number,
  onValueMouseOver: _propTypes["default"].func,
  onValueClick: _propTypes["default"].func,
  onValueMouseOut: _propTypes["default"].func,
  onLinkClick: _propTypes["default"].func,
  onLinkMouseOver: _propTypes["default"].func,
  onLinkMouseOut: _propTypes["default"].func,
  style: _propTypes["default"].shape({
    links: _propTypes["default"].object,
    rects: _propTypes["default"].object,
    labels: _propTypes["default"].object
  }),
  width: _propTypes["default"].number.isRequired
};
var _default = Sankey;
exports["default"] = _default;