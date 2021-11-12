"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _gridLines = _interopRequireDefault(require("./grid-lines"));

var _axisUtils = require("../utils/axis-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VERTICAL = _axisUtils.DIRECTION.VERTICAL;

var propTypes = _objectSpread(_objectSpread({}, _gridLines["default"].propTypes), {}, {
  direction: _propTypes["default"].oneOf([VERTICAL])
});

var defaultProps = {
  direction: VERTICAL,
  attr: 'x'
};

function VerticalGridLines(props) {
  return /*#__PURE__*/_react["default"].createElement(_gridLines["default"], props);
}

VerticalGridLines.displayName = 'VerticalGridLines';
VerticalGridLines.propTypes = propTypes;
VerticalGridLines.defaultProps = defaultProps;
VerticalGridLines.requiresSVG = true;
var _default = VerticalGridLines;
exports["default"] = _default;