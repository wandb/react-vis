"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var STROKE_STYLES = {
  dashed: '6, 2',
  solid: null
};

function DiscreteColorLegendItem(_ref) {
  var color = _ref.color,
      strokeDasharray = _ref.strokeDasharray,
      strokeStyle = _ref.strokeStyle,
      strokeWidth = _ref.strokeWidth,
      disabled = _ref.disabled,
      onClick = _ref.onClick,
      orientation = _ref.orientation,
      onMouseEnter = _ref.onMouseEnter,
      onMouseLeave = _ref.onMouseLeave,
      title = _ref.title;
  var className = "rv-discrete-color-legend-item ".concat(orientation);

  if (disabled) {
    className += ' disabled';
  }

  if (onClick) {
    className += ' clickable';
  }

  var strokeDasharrayStyle = STROKE_STYLES[strokeStyle] || strokeDasharray;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: className,
    onClick: onClick,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "rv-discrete-color-legend-item__color",
    height: 2,
    width: 14
  }, /*#__PURE__*/_react["default"].createElement("path", {
    className: "rv-discrete-color-legend-item__color__path",
    d: "M 0, 1 L 14, 1",
    style: _objectSpread(_objectSpread(_objectSpread({}, strokeWidth ? {
      strokeWidth: strokeWidth
    } : {}), strokeDasharrayStyle ? {
      strokeDasharray: strokeDasharrayStyle
    } : {}), {}, {
      stroke: disabled ? null : color
    })
  })), /*#__PURE__*/_react["default"].createElement("span", {
    className: "rv-discrete-color-legend-item__title"
  }, title));
}

DiscreteColorLegendItem.propTypes = {
  color: _propTypes["default"].string.isRequired,
  disabled: _propTypes["default"].bool,
  title: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].element]).isRequired,
  onClick: _propTypes["default"].func,
  onMouseEnter: _propTypes["default"].func,
  onMouseLeave: _propTypes["default"].func,
  orientation: _propTypes["default"].oneOf(['vertical', 'horizontal']).isRequired,
  strokeDasharray: _propTypes["default"].string,
  strokeWidth: _propTypes["default"].number,
  strokeStyle: _propTypes["default"].oneOf(Object.keys(STROKE_STYLES))
};
DiscreteColorLegendItem.defaultProps = {
  disabled: false,
  strokeStyle: 'solid'
};
DiscreteColorLegendItem.displayName = 'DiscreteColorLegendItem';
var _default = DiscreteColorLegendItem;
exports["default"] = _default;