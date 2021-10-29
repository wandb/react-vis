"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _stylingUtils = require("../utils/styling-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var propTypes = {
  style: _propTypes["default"].shape({
    bottom: _propTypes["default"].object,
    left: _propTypes["default"].object,
    right: _propTypes["default"].object,
    top: _propTypes["default"].object
  }),
  // supplied by xyplot
  marginTop: _propTypes["default"].number,
  marginBottom: _propTypes["default"].number,
  marginLeft: _propTypes["default"].number,
  marginRight: _propTypes["default"].number,
  innerWidth: _propTypes["default"].number,
  innerHeight: _propTypes["default"].number
};
var CLASSES = {
  bottom: 'rv-xy-plot__borders-bottom',
  container: 'rv-xy-plot__borders',
  left: 'rv-xy-plot__borders-left',
  right: 'rv-xy-plot__borders-right',
  top: 'rv-xy-plot__borders-top'
};

function Borders(props) {
  var marginTop = props.marginTop,
      marginBottom = props.marginBottom,
      marginLeft = props.marginLeft,
      marginRight = props.marginRight,
      innerWidth = props.innerWidth,
      innerHeight = props.innerHeight,
      style = props.style,
      className = props.className;
  var height = innerHeight + marginTop + marginBottom;
  var width = innerWidth + marginLeft + marginRight;
  return /*#__PURE__*/_react["default"].createElement("g", {
    className: (0, _stylingUtils.getCombinedClassName)(CLASSES.container, className)
  }, /*#__PURE__*/_react["default"].createElement("rect", {
    className: (0, _stylingUtils.getCombinedClassName)(CLASSES.bottom, "".concat(className, "-bottom")),
    style: _objectSpread(_objectSpread({}, style.all), style.bottom),
    x: 0,
    y: height - marginBottom,
    width: width,
    height: marginBottom
  }), /*#__PURE__*/_react["default"].createElement("rect", {
    className: (0, _stylingUtils.getCombinedClassName)(CLASSES.left, "".concat(className, "-left")),
    style: _objectSpread(_objectSpread({}, style.all), style.left),
    x: 0,
    y: 0,
    width: marginLeft,
    height: height
  }), /*#__PURE__*/_react["default"].createElement("rect", {
    className: (0, _stylingUtils.getCombinedClassName)(CLASSES.right, "".concat(className, "-right")),
    style: _objectSpread(_objectSpread({}, style.all), style.right),
    x: width - marginRight,
    y: 0,
    width: marginRight,
    height: height
  }), /*#__PURE__*/_react["default"].createElement("rect", {
    className: (0, _stylingUtils.getCombinedClassName)(CLASSES.top, "".concat(className, "-top")),
    style: _objectSpread(_objectSpread({}, style.all), style.top),
    x: 0,
    y: 0,
    width: width,
    height: marginTop
  }));
}

Borders.displayName = 'Borders';
Borders.defaultProps = {
  className: '',
  style: {
    all: {},
    bottom: {},
    left: {},
    right: {},
    top: {}
  }
};
Borders.propTypes = propTypes;
Borders.requiresSVG = true;
var _default = Borders;
exports["default"] = _default;