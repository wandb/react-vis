"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _discreteColorLegend = _interopRequireDefault(require("./discrete-color-legend"));
var _stylingUtils = require("../utils/styling-utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // Copyright (c) 2016 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
var propTypes = _objectSpread(_objectSpread({}, _discreteColorLegend["default"].propTypes), {}, {
  searchText: _propTypes["default"].string,
  onSearchChange: _propTypes["default"].func,
  searchPlaceholder: _propTypes["default"].string,
  searchFn: _propTypes["default"].func
});
var defaultSearchFn = function defaultSearchFn(items, s) {
  return items.filter(function (item) {
    return String(item.title || item).toLowerCase().indexOf(s) !== -1;
  });
};
function SearchableDiscreteColorLegend(props) {
  var _props$className = props.className,
    className = _props$className === void 0 ? '' : _props$className,
    colors = props.colors,
    height = props.height,
    items = props.items,
    onItemClick = props.onItemClick,
    onItemMouseEnter = props.onItemMouseEnter,
    onItemMouseLeave = props.onItemMouseLeave,
    onSearchChange = props.onSearchChange,
    orientation = props.orientation,
    _props$searchFn = props.searchFn,
    searchFn = _props$searchFn === void 0 ? defaultSearchFn : _props$searchFn,
    searchPlaceholder = props.searchPlaceholder,
    _props$searchText = props.searchText,
    searchText = _props$searchText === void 0 ? '' : _props$searchText,
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
SearchableDiscreteColorLegend.displayName = 'SearchableDiscreteColorLegend';
var _default = exports["default"] = SearchableDiscreteColorLegend;