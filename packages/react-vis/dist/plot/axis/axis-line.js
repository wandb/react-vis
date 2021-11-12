"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _axisUtils = require("../../utils/axis-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var LEFT = _axisUtils.ORIENTATION.LEFT,
    RIGHT = _axisUtils.ORIENTATION.RIGHT,
    TOP = _axisUtils.ORIENTATION.TOP,
    BOTTOM = _axisUtils.ORIENTATION.BOTTOM;
var propTypes = {
  height: _propTypes["default"].number.isRequired,
  style: _propTypes["default"].object,
  orientation: _propTypes["default"].oneOf([LEFT, RIGHT, TOP, BOTTOM]).isRequired,
  width: _propTypes["default"].number.isRequired
};
var defaultProps = {
  style: {}
};

function AxisLine(_ref) {
  var orientation = _ref.orientation,
      width = _ref.width,
      height = _ref.height,
      style = _ref.style;
  var lineProps;

  if (orientation === LEFT) {
    lineProps = {
      x1: width,
      x2: width,
      y1: 0,
      y2: height
    };
  } else if (orientation === RIGHT) {
    lineProps = {
      x1: 0,
      x2: 0,
      y1: 0,
      y2: height
    };
  } else if (orientation === TOP) {
    lineProps = {
      x1: 0,
      x2: width,
      y1: height,
      y2: height
    };
  } else {
    lineProps = {
      x1: 0,
      x2: width,
      y1: 0,
      y2: 0
    };
  }

  return /*#__PURE__*/_react["default"].createElement("line", _extends({}, lineProps, {
    className: "rv-xy-plot__axis__line",
    style: style
  }));
}

AxisLine.defaultProps = defaultProps;
AxisLine.displayName = 'AxisLine';
AxisLine.propTypes = propTypes;
var _default = AxisLine;
exports["default"] = _default;