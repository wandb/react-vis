"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
var _excluded = ["align", "animation", "children", "className", "hasVoronoi", "height", "hideLabels", "labelRotation", "layout", "links", "linkOpacity", "margin", "nodePadding", "nodes", "nodeWidth", "onValueClick", "onValueMouseOver", "onValueMouseOut", "onLinkClick", "onLinkMouseOver", "onLinkMouseOut", "style", "width"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
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
var DEFAULT_STYLE = {
  links: {},
  rects: {},
  labels: {}
};
function Sankey(_ref) {
  var _ref$align = _ref.align,
    align = _ref$align === void 0 ? 'justify' : _ref$align,
    animation = _ref.animation,
    children = _ref.children,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$hasVoronoi = _ref.hasVoronoi,
    hasVoronoi = _ref$hasVoronoi === void 0 ? false : _ref$hasVoronoi,
    height = _ref.height,
    _ref$hideLabels = _ref.hideLabels,
    hideLabels = _ref$hideLabels === void 0 ? false : _ref$hideLabels,
    _ref$labelRotation = _ref.labelRotation,
    labelRotation = _ref$labelRotation === void 0 ? 0 : _ref$labelRotation,
    _ref$layout = _ref.layout,
    layout = _ref$layout === void 0 ? 50 : _ref$layout,
    links = _ref.links,
    linkOpacity = _ref.linkOpacity,
    _ref$margin = _ref.margin,
    margin = _ref$margin === void 0 ? DEFAULT_MARGINS : _ref$margin,
    _ref$nodePadding = _ref.nodePadding,
    nodePadding = _ref$nodePadding === void 0 ? 10 : _ref$nodePadding,
    nodes = _ref.nodes,
    _ref$nodeWidth = _ref.nodeWidth,
    nodeWidth = _ref$nodeWidth === void 0 ? 10 : _ref$nodeWidth,
    _ref$onValueClick = _ref.onValueClick,
    onValueClick = _ref$onValueClick === void 0 ? NOOP : _ref$onValueClick,
    _ref$onValueMouseOver = _ref.onValueMouseOver,
    onValueMouseOver = _ref$onValueMouseOver === void 0 ? NOOP : _ref$onValueMouseOver,
    _ref$onValueMouseOut = _ref.onValueMouseOut,
    onValueMouseOut = _ref$onValueMouseOut === void 0 ? NOOP : _ref$onValueMouseOut,
    _ref$onLinkClick = _ref.onLinkClick,
    onLinkClick = _ref$onLinkClick === void 0 ? NOOP : _ref$onLinkClick,
    _ref$onLinkMouseOver = _ref.onLinkMouseOver,
    onLinkMouseOver = _ref$onLinkMouseOver === void 0 ? NOOP : _ref$onLinkMouseOver,
    _ref$onLinkMouseOut = _ref.onLinkMouseOut,
    onLinkMouseOut = _ref$onLinkMouseOut === void 0 ? NOOP : _ref$onLinkMouseOut,
    _ref$style = _ref.style,
    style = _ref$style === void 0 ? DEFAULT_STYLE : _ref$style,
    width = _ref.width,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var props = _objectSpread({
    align: align,
    animation: animation,
    children: children,
    className: className,
    hasVoronoi: hasVoronoi,
    height: height,
    hideLabels: hideLabels,
    labelRotation: labelRotation,
    layout: layout,
    links: links,
    linkOpacity: linkOpacity,
    margin: margin,
    nodePadding: nodePadding,
    nodes: nodes,
    nodeWidth: nodeWidth,
    onValueClick: onValueClick,
    onValueMouseOver: onValueMouseOver,
    onValueMouseOut: onValueMouseOut,
    onLinkClick: onLinkClick,
    onLinkMouseOver: onLinkMouseOver,
    onLinkMouseOut: onLinkMouseOut,
    style: style,
    width: width
  }, restProps);
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
var _default = exports["default"] = Sankey;