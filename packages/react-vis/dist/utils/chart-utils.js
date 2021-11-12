"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInnerDimensions = getInnerDimensions;
exports.getRadialLayoutMargin = getRadialLayoutMargin;
exports.DEFAULT_MARGINS = exports.MarginPropType = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Get the dimensions of the component for the future use.
 * @param {Object} props Props.
 * @param {Object} defaultMargins Object with default margins.
 * @returns {Object} Dimensions of the component.
 */
function getInnerDimensions(props, defaultMargins) {
  var margin = props.margin,
      width = props.width,
      height = props.height;

  var marginProps = _objectSpread(_objectSpread({}, defaultMargins), typeof margin === 'number' ? {
    left: margin,
    right: margin,
    top: margin,
    bottom: margin
  } : margin);

  var _marginProps$left = marginProps.left,
      marginLeft = _marginProps$left === void 0 ? 0 : _marginProps$left,
      _marginProps$top = marginProps.top,
      marginTop = _marginProps$top === void 0 ? 0 : _marginProps$top,
      _marginProps$right = marginProps.right,
      marginRight = _marginProps$right === void 0 ? 0 : _marginProps$right,
      _marginProps$bottom = marginProps.bottom,
      marginBottom = _marginProps$bottom === void 0 ? 0 : _marginProps$bottom;
  return {
    marginLeft: marginLeft,
    marginTop: marginTop,
    marginRight: marginRight,
    marginBottom: marginBottom,
    innerHeight: height - marginBottom - marginTop,
    innerWidth: width - marginLeft - marginRight
  };
}
/**
 * Calculate the margin of the sunburst,
 * so it can be at the center of the container
 * @param  {Number} width - the width of the container
 * @param  {Number} height - the height of the container
 * @param  {Number} radius - the max radius of the sunburst
 * @return {Object} an object includes {bottom, left, right, top}
 */


function getRadialLayoutMargin(width, height, radius) {
  var marginX = width / 2 - radius;
  var marginY = height / 2 - radius;
  return {
    bottom: marginY,
    left: marginX,
    right: marginX,
    top: marginY
  };
}

var MarginPropType = _propTypes["default"].oneOfType([_propTypes["default"].shape({
  left: _propTypes["default"].number,
  top: _propTypes["default"].number,
  right: _propTypes["default"].number,
  bottom: _propTypes["default"].number
}), _propTypes["default"].number]);

exports.MarginPropType = MarginPropType;
var DEFAULT_MARGINS = {
  left: 40,
  right: 10,
  top: 10,
  bottom: 40
};
exports.DEFAULT_MARGINS = DEFAULT_MARGINS;