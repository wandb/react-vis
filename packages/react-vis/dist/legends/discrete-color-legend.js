"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _discreteColorLegendItem = _interopRequireDefault(require("./discrete-color-legend-item"));

var _theme = require("../theme");

var _stylingUtils = require("../utils/styling-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function DiscreteColorLegend(_ref) {
  var className = _ref.className,
      colors = _ref.colors,
      height = _ref.height,
      items = _ref.items,
      onItemClick = _ref.onItemClick,
      onItemMouseEnter = _ref.onItemMouseEnter,
      onItemMouseLeave = _ref.onItemMouseLeave,
      orientation = _ref.orientation,
      style = _ref.style,
      width = _ref.width;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _stylingUtils.getCombinedClassName)('rv-discrete-color-legend', orientation, className),
    style: _objectSpread({
      width: width,
      height: height
    }, style)
  }, items.map(function (item, i) {
    return /*#__PURE__*/_react["default"].createElement(_discreteColorLegendItem["default"], {
      title: item.title ? item.title : item,
      color: item.color ? item.color : colors[i % colors.length],
      strokeDasharray: item.strokeDasharray,
      strokeStyle: item.strokeStyle,
      strokeWidth: item.strokeWidth,
      disabled: Boolean(item.disabled),
      orientation: orientation,
      key: i,
      onClick: onItemClick ? function (e) {
        return onItemClick(item, i, e);
      } : null,
      onMouseEnter: onItemMouseEnter ? function (e) {
        return onItemMouseEnter(item, i, e);
      } : null,
      onMouseLeave: onItemMouseEnter ? function (e) {
        return onItemMouseLeave(item, i, e);
      } : null
    });
  }));
}

DiscreteColorLegend.displayName = 'DiscreteColorLegendItem';
DiscreteColorLegend.propTypes = {
  className: _propTypes["default"].string,
  items: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].shape({
    title: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].element]).isRequired,
    color: _propTypes["default"].string,
    disabled: _propTypes["default"].bool
  }), _propTypes["default"].string.isRequired, _propTypes["default"].element])).isRequired,
  onItemClick: _propTypes["default"].func,
  onItemMouseEnter: _propTypes["default"].func,
  onItemMouseLeave: _propTypes["default"].func,
  height: _propTypes["default"].number,
  width: _propTypes["default"].number,
  orientation: _propTypes["default"].oneOf(['vertical', 'horizontal'])
};
DiscreteColorLegend.defaultProps = {
  className: '',
  colors: _theme.DISCRETE_COLOR_RANGE,
  orientation: 'vertical'
};
var _default = DiscreteColorLegend;
exports["default"] = _default;