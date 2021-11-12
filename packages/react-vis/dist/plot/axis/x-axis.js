"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _axisUtils = require("../../utils/axis-utils");

var _axis = _interopRequireDefault(require("./axis"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TOP = _axisUtils.ORIENTATION.TOP,
    BOTTOM = _axisUtils.ORIENTATION.BOTTOM;

var propTypes = _objectSpread(_objectSpread({}, _axis["default"].propTypes), {}, {
  orientation: _propTypes["default"].oneOf([TOP, BOTTOM])
});

var defaultProps = {
  orientation: BOTTOM,
  attr: 'x',
  attrAxis: 'y'
};

function XAxis(props) {
  return /*#__PURE__*/_react["default"].createElement(_axis["default"], props);
}

XAxis.displayName = 'XAxis';
XAxis.propTypes = propTypes;
XAxis.defaultProps = defaultProps;
XAxis.requiresSVG = true;
var _default = XAxis;
exports["default"] = _default;