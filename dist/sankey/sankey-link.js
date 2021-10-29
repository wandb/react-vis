"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _theme = require("../theme");

var _animation = _interopRequireDefault(require("../animation"));

var _seriesUtils = require("../utils/series-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var DEFAULT_LINK_COLOR = _theme.DISCRETE_COLOR_RANGE[1];
var DEFAULT_LINK_OPACITY = 0.7;

function SankeyLink(props) {
  var animation = props.animation,
      data = props.data,
      node = props.node,
      opacity = props.opacity,
      color = props.color,
      strokeWidth = props.strokeWidth,
      style = props.style,
      onLinkClick = props.onLinkClick,
      onLinkMouseOver = props.onLinkMouseOver,
      onLinkMouseOut = props.onLinkMouseOut;

  if (animation) {
    return /*#__PURE__*/_react["default"].createElement(_animation["default"], _extends({}, props, {
      animatedProps: _seriesUtils.ANIMATED_SERIES_PROPS
    }), /*#__PURE__*/_react["default"].createElement(SankeyLink, _extends({}, props, {
      animation: null
    })));
  }

  return /*#__PURE__*/_react["default"].createElement("path", _extends({
    d: data
  }, style, {
    className: "rv-sankey__link",
    opacity: Number.isFinite(opacity) ? opacity : DEFAULT_LINK_OPACITY,
    stroke: color || DEFAULT_LINK_COLOR,
    onClick: function onClick(e) {
      return onLinkClick(node, e);
    },
    onMouseOver: function onMouseOver(e) {
      return onLinkMouseOver(node, e);
    },
    onMouseOut: function onMouseOut(e) {
      return onLinkMouseOut(node, e);
    },
    strokeWidth: strokeWidth,
    fill: "none"
  }));
}

SankeyLink.displayName = 'SankeyLink';
SankeyLink.requiresSVG = true;
var _default = SankeyLink;
exports["default"] = _default;