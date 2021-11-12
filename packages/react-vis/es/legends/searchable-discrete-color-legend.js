function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Copyright (c) 2016 - 2017 Uber Technologies, Inc.
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
import React from 'react';
import PropTypes from 'prop-types';
import DiscreteColorLegend from "./discrete-color-legend";
import { getCombinedClassName } from "../utils/styling-utils";

var propTypes = _objectSpread(_objectSpread({}, DiscreteColorLegend.propTypes), {}, {
  searchText: PropTypes.string,
  onSearchChange: PropTypes.func,
  searchPlaceholder: PropTypes.string,
  searchFn: PropTypes.func
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
  return /*#__PURE__*/React.createElement("div", {
    className: getCombinedClassName('rv-search-wrapper', className),
    style: {
      width: width,
      height: height
    }
  }, /*#__PURE__*/React.createElement("form", {
    className: "rv-search-wrapper__form"
  }, /*#__PURE__*/React.createElement("input", {
    type: "search",
    placeholder: searchPlaceholder,
    className: "rv-search-wrapper__form__input",
    value: searchText,
    onChange: onChange
  })), /*#__PURE__*/React.createElement("div", {
    className: "rv-search-wrapper__contents"
  }, /*#__PURE__*/React.createElement(DiscreteColorLegend, {
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
export default SearchableDiscreteColorLegend;