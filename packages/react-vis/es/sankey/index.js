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

import React from 'react';
import PropTypes from 'prop-types';
import { sankey, sankeyLinkHorizontal, sankeyLeft, sankeyRight, sankeyCenter, sankeyJustify } from 'd3-sankey';
import XYPlot from "../plot/xy-plot";
import { MarginPropType, getInnerDimensions } from "../utils/chart-utils";
import { getCombinedClassName } from "../utils/styling-utils";
import VerticalRectSeries from "../plot/series/vertical-rect-series";
import LabelSeries from "../plot/series/label-series";
import Voronoi from "../plot/voronoi";
import { DISCRETE_COLOR_RANGE } from "../theme";
import SankeyLink from "./sankey-link";

var NOOP = function NOOP(f) {
  return f;
};

var ALIGNMENTS = {
  justify: sankeyJustify,
  center: sankeyCenter,
  left: sankeyLeft,
  right: sankeyRight
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

  var _getInnerDimensions = getInnerDimensions({
    margin: margin,
    height: height,
    width: width
  }, DEFAULT_MARGINS),
      marginLeft = _getInnerDimensions.marginLeft,
      marginTop = _getInnerDimensions.marginTop,
      marginRight = _getInnerDimensions.marginRight,
      marginBottom = _getInnerDimensions.marginBottom;

  var sankeyInstance = sankey().extent([[marginLeft, marginTop], [width - marginRight, height - marginBottom - marginTop]]).nodeWidth(nodeWidth).nodePadding(nodePadding).nodes(nodesCopy).links(linksCopy).nodeAlign(ALIGNMENTS[align]).iterations(layout);
  sankeyInstance(nodesCopy);
  var nWidth = sankeyInstance.nodeWidth();
  var path = sankeyLinkHorizontal();
  return /*#__PURE__*/React.createElement(XYPlot, _extends({}, props, {
    yType: "literal",
    className: getCombinedClassName('rv-sankey', className)
  }), linksCopy.map(function (link, i) {
    return /*#__PURE__*/React.createElement(SankeyLink, {
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
  }), /*#__PURE__*/React.createElement(VerticalRectSeries, {
    animation: animation,
    className: getCombinedClassName(className, 'rv-sankey__node'),
    data: nodesCopy.map(function (node) {
      return _objectSpread(_objectSpread({}, node), {}, {
        y: node.y1 - marginTop,
        y0: node.y0 - marginTop,
        x: node.x1,
        x0: node.x0,
        color: node.color || DISCRETE_COLOR_RANGE[0],
        sourceLinks: null,
        targetLinks: null
      });
    }),
    style: style.rects,
    onValueClick: onValueClick,
    onValueMouseOver: onValueMouseOver,
    onValueMouseOut: onValueMouseOut,
    colorType: "literal"
  }), !hideLabels && /*#__PURE__*/React.createElement(LabelSeries, {
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
  }), hasVoronoi && /*#__PURE__*/React.createElement(Voronoi, {
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
  align: PropTypes.oneOf(['justify', 'left', 'right', 'center']),
  className: PropTypes.string,
  hasVoronoi: PropTypes.bool,
  height: PropTypes.number.isRequired,
  hideLabels: PropTypes.bool,
  labelRotation: PropTypes.number,
  layout: PropTypes.number,
  links: PropTypes.arrayOf(PropTypes.shape({
    source: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
    target: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired
  })).isRequired,
  margin: MarginPropType,
  nodePadding: PropTypes.number,
  nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  nodeWidth: PropTypes.number,
  onValueMouseOver: PropTypes.func,
  onValueClick: PropTypes.func,
  onValueMouseOut: PropTypes.func,
  onLinkClick: PropTypes.func,
  onLinkMouseOver: PropTypes.func,
  onLinkMouseOut: PropTypes.func,
  style: PropTypes.shape({
    links: PropTypes.object,
    rects: PropTypes.object,
    labels: PropTypes.object
  }),
  width: PropTypes.number.isRequired
};
export default Sankey;