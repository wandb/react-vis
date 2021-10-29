"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _animation = _interopRequireWildcard(require("../animation"));

var _scalesUtils = require("../utils/scales-utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var ANIMATED_PROPS = ['colorRange', 'colorDomain', 'color', 'opacityRange', 'opacityDomain', 'opacity', 'x0', 'x1', 'y0', 'y1', 'r'];

function TreemapLeaf(props) {
  var animation = props.animation,
      getLabel = props.getLabel,
      mode = props.mode,
      node = props.node,
      onLeafClick = props.onLeafClick,
      onLeafMouseOver = props.onLeafMouseOver,
      onLeafMouseOut = props.onLeafMouseOut,
      r = props.r,
      scales = props.scales,
      x0 = props.x0,
      x1 = props.x1,
      y0 = props.y0,
      y1 = props.y1,
      style = props.style;

  if (animation) {
    return /*#__PURE__*/_react["default"].createElement(_animation["default"], _extends({}, props, {
      animatedProps: ANIMATED_PROPS
    }), /*#__PURE__*/_react["default"].createElement(TreemapLeaf, _extends({}, props, {
      animation: null
    })));
  }

  var useCirclePacking = mode === 'circlePack';
  var background = scales.color(node);
  var opacity = scales.opacity(node);
  var color = (0, _scalesUtils.getFontColorFromBackground)(background);
  var data = node.data;
  var title = getLabel(data);

  var leafStyle = _objectSpread(_objectSpread({
    top: useCirclePacking ? y0 - r : y0,
    left: useCirclePacking ? x0 - r : x0,
    width: useCirclePacking ? r * 2 : x1 - x0,
    height: useCirclePacking ? r * 2 : y1 - y0,
    background: background,
    opacity: opacity,
    color: color
  }, style), node.data.style);

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "rv-treemap__leaf ".concat(useCirclePacking ? 'rv-treemap__leaf--circle' : ''),
    onMouseEnter: function onMouseEnter(event) {
      return onLeafMouseOver(node, event);
    },
    onMouseLeave: function onMouseLeave(event) {
      return onLeafMouseOut(node, event);
    },
    onClick: function onClick(event) {
      return onLeafClick(node, event);
    },
    style: leafStyle
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "rv-treemap__leaf__content"
  }, title));
}

TreemapLeaf.propTypes = {
  animation: _animation.AnimationPropType,
  height: _propTypes["default"].number.isRequired,
  mode: _propTypes["default"].string,
  node: _propTypes["default"].object.isRequired,
  onLeafClick: _propTypes["default"].func,
  onLeafMouseOver: _propTypes["default"].func,
  onLeafMouseOut: _propTypes["default"].func,
  scales: _propTypes["default"].object.isRequired,
  width: _propTypes["default"].number.isRequired,
  r: _propTypes["default"].number.isRequired,
  x0: _propTypes["default"].number.isRequired,
  x1: _propTypes["default"].number.isRequired,
  y0: _propTypes["default"].number.isRequired,
  y1: _propTypes["default"].number.isRequired
};
var _default = TreemapLeaf;
exports["default"] = _default;