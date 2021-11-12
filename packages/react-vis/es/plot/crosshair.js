function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { transformValueToString } from "../utils/data-utils";
import { getAttributeFunctor } from "../utils/scales-utils";
import { getCombinedClassName } from "../utils/styling-utils";
/**
 * Format title by detault.
 * @param {Array} values List of values.
 * @returns {*} Formatted value or undefined.
 */

function defaultTitleFormat(values) {
  var value = getFirstNonEmptyValue(values);

  if (value) {
    return {
      title: 'x',
      value: transformValueToString(value.x)
    };
  }
}
/**
 * Format items by default.
 * @param {Array} values Array of values.
 * @returns {*} Formatted list of items.
 */


function defaultItemsFormat(values) {
  return values.map(function (v, i) {
    if (v) {
      return {
        value: v.y,
        title: i
      };
    }
  });
}
/**
 * Get the first non-empty item from an array.
 * @param {Array} values Array of values.
 * @returns {*} First non-empty value or undefined.
 */


function getFirstNonEmptyValue(values) {
  return (values || []).find(function (v) {
    return Boolean(v);
  });
}

var Crosshair = /*#__PURE__*/function (_PureComponent) {
  _inherits(Crosshair, _PureComponent);

  var _super = _createSuper(Crosshair);

  function Crosshair() {
    _classCallCheck(this, Crosshair);

    return _super.apply(this, arguments);
  }

  _createClass(Crosshair, [{
    key: "_renderCrosshairItems",

    /**
     * Render crosshair items (title + value for each series).
     * @returns {*} Array of React classes with the crosshair values.
     * @private
     */
    value: function _renderCrosshairItems() {
      var _this$props = this.props,
          values = _this$props.values,
          itemsFormat = _this$props.itemsFormat;
      var items = itemsFormat(values);

      if (!items) {
        return null;
      }

      return items.filter(function (i) {
        return i;
      }).map(function renderValue(item, i) {
        return /*#__PURE__*/React.createElement("div", {
          className: "rv-crosshair__item",
          key: "item".concat(i)
        }, /*#__PURE__*/React.createElement("span", {
          className: "rv-crosshair__item__title"
        }, item.title), ': ', /*#__PURE__*/React.createElement("span", {
          className: "rv-crosshair__item__value"
        }, item.value));
      });
    }
    /**
     * Render crosshair title.
     * @returns {*} Container with the crosshair title.
     * @private
     */

  }, {
    key: "_renderCrosshairTitle",
    value: function _renderCrosshairTitle() {
      var _this$props2 = this.props,
          values = _this$props2.values,
          titleFormat = _this$props2.titleFormat,
          style = _this$props2.style;
      var titleItem = titleFormat(values);

      if (!titleItem) {
        return null;
      }

      return /*#__PURE__*/React.createElement("div", {
        className: "rv-crosshair__title",
        key: "title",
        style: style.title
      }, /*#__PURE__*/React.createElement("span", {
        className: "rv-crosshair__title__title"
      }, titleItem.title), ': ', /*#__PURE__*/React.createElement("span", {
        className: "rv-crosshair__title__value"
      }, titleItem.value));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          children = _this$props3.children,
          className = _this$props3.className,
          values = _this$props3.values,
          marginTop = _this$props3.marginTop,
          marginLeft = _this$props3.marginLeft,
          innerWidth = _this$props3.innerWidth,
          innerHeight = _this$props3.innerHeight,
          style = _this$props3.style;
      var value = getFirstNonEmptyValue(values);

      if (!value) {
        return null;
      }

      var x = getAttributeFunctor(this.props, 'x');
      var innerLeft = x(value);
      var _this$props$orientati = this.props.orientation,
          orientation = _this$props$orientati === void 0 ? innerLeft > innerWidth / 2 ? 'left' : 'right' : _this$props$orientati;
      var left = marginLeft + innerLeft;
      var top = marginTop;
      var innerClassName = "rv-crosshair__inner rv-crosshair__inner--".concat(orientation);
      return /*#__PURE__*/React.createElement("div", {
        className: getCombinedClassName('rv-crosshair', className),
        style: {
          left: "".concat(left, "px"),
          top: "".concat(top, "px")
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "rv-crosshair__line",
        style: _objectSpread({
          height: "".concat(innerHeight, "px")
        }, style.line)
      }), /*#__PURE__*/React.createElement("div", {
        className: innerClassName
      }, children ? children : /*#__PURE__*/React.createElement("div", {
        className: "rv-crosshair__inner__content",
        style: style.box
      }, /*#__PURE__*/React.createElement("div", null, this._renderCrosshairTitle(), this._renderCrosshairItems()))));
    }
  }], [{
    key: "defaultProps",
    get: function get() {
      return {
        titleFormat: defaultTitleFormat,
        itemsFormat: defaultItemsFormat,
        style: {
          line: {},
          title: {},
          box: {}
        }
      };
    }
  }, {
    key: "propTypes",
    get: function get() {
      return {
        className: PropTypes.string,
        values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object, PropTypes.bool])),
        series: PropTypes.object,
        innerWidth: PropTypes.number,
        innerHeight: PropTypes.number,
        marginLeft: PropTypes.number,
        marginTop: PropTypes.number,
        orientation: PropTypes.oneOf(['left', 'right']),
        itemsFormat: PropTypes.func,
        titleFormat: PropTypes.func,
        style: PropTypes.shape({
          line: PropTypes.object,
          title: PropTypes.object,
          box: PropTypes.object
        })
      };
    }
  }]);

  return Crosshair;
}(PureComponent);

Crosshair.displayName = 'Crosshair';
export default Crosshair;