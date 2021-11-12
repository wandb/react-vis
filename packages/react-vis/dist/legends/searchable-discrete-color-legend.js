"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _discreteColorLegend = _interopRequireDefault(require("./discrete-color-legend"));

var _stylingUtils = require("../utils/styling-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var propTypes = _objectSpread(_objectSpread({}, _discreteColorLegend["default"].propTypes), {}, {
  searchText: _propTypes["default"].string,
  onSearchChange: _propTypes["default"].func,
  searchPlaceholder: _propTypes["default"].string,
  searchFn: _propTypes["default"].func
});

var defaultProps = {
  className: '',
  searchText: '',
  searchFn: function searchFn(items, s) {
    return items.filter(function (item) {
      return String(item.title || item).toLowerCase().indexOf(s) !== -1;
    });
  }
};

function SearchableDiscreteColorLegend(props) {
  var className = props.className,
      colors = props.colors,
      height = props.height,
      items = props.items,
      onItemClick = props.onItemClick,
      onItemMouseEnter = props.onItemMouseEnter,
      onItemMouseLeave = props.onItemMouseLeave,
      onSearchChange = props.onSearchChange,
      orientation = props.orientation,
      searchFn = props.searchFn,
      searchPlaceholder = props.searchPlaceholder,
      searchText = props.searchText,
      width = props.width;
  var onChange = onSearchChange ? function (_ref) {
    var value = _ref.target.value;
    return onSearchChange(value);
  } : null;
  var filteredItems = searchFn(items, searchText);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _stylingUtils.getCombinedClassName)('rv-search-wrapper', className),
    style: {
      width: width,
      height: height
    }
  }, /*#__PURE__*/_react["default"].createElement("form", {
    className: "rv-search-wrapper__form"
  }, /*#__PURE__*/_react["default"].createElement("input", {
    type: "search",
    placeholder: searchPlaceholder,
    className: "rv-search-wrapper__form__input",
    value: searchText,
    onChange: onChange
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "rv-search-wrapper__contents"
  }, /*#__PURE__*/_react["default"].createElement(_discreteColorLegend["default"], {
    colors: colors,
    items: filteredItems,
    onItemClick: onItemClick,
    onItemMouseEnter: onItemMouseEnter,
    onItemMouseLeave: onItemMouseLeave,
    orientation: orientation
  })));
}

SearchableDiscreteColorLegend.propTypes = propTypes;
SearchableDiscreteColorLegend.defaultProps = defaultProps;
SearchableDiscreteColorLegend.displayName = 'SearchableDiscreteColorLegend';
var _default = SearchableDiscreteColorLegend;
exports["default"] = _default;