"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _dataUtils = require("../utils/data-utils");
var _scalesUtils = require("../utils/scales-utils");
var _stylingUtils = require("../utils/styling-utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); } // Copyright (c) 2016 - 2017 Uber Technologies, Inc.
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
      value: (0, _dataUtils.transformValueToString)(value.x)
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
  function Crosshair() {
    _classCallCheck(this, Crosshair);
    return _callSuper(this, Crosshair, arguments);
  }
  _inherits(Crosshair, _PureComponent);
  return _createClass(Crosshair, [{
    key: "_renderCrosshairItems",
    value:
    /**
     * Render crosshair items (title + value for each series).
     * @returns {*} Array of React classes with the crosshair values.
     * @private
     */
    function _renderCrosshairItems() {
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
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "rv-crosshair__item",
          key: "item".concat(i)
        }, /*#__PURE__*/_react["default"].createElement("span", {
          className: "rv-crosshair__item__title"
        }, item.title), ': ', /*#__PURE__*/_react["default"].createElement("span", {
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
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "rv-crosshair__title",
        key: "title",
        style: style.title
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "rv-crosshair__title__title"
      }, titleItem.title), ': ', /*#__PURE__*/_react["default"].createElement("span", {
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
      var x = (0, _scalesUtils.getAttributeFunctor)(this.props, 'x');
      var innerLeft = x(value);
      var _this$props$orientati = this.props.orientation,
        orientation = _this$props$orientati === void 0 ? innerLeft > innerWidth / 2 ? 'left' : 'right' : _this$props$orientati;
      var left = marginLeft + innerLeft;
      var top = marginTop;
      var innerClassName = "rv-crosshair__inner rv-crosshair__inner--".concat(orientation);
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _stylingUtils.getCombinedClassName)('rv-crosshair', className),
        style: {
          left: "".concat(left, "px"),
          top: "".concat(top, "px")
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "rv-crosshair__line",
        style: _objectSpread({
          height: "".concat(innerHeight, "px")
        }, style.line)
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: innerClassName
      }, children ? children : /*#__PURE__*/_react["default"].createElement("div", {
        className: "rv-crosshair__inner__content",
        style: style.box
      }, /*#__PURE__*/_react["default"].createElement("div", null, this._renderCrosshairTitle(), this._renderCrosshairItems()))));
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
        className: _propTypes["default"].string,
        values: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string, _propTypes["default"].object, _propTypes["default"].bool])),
        series: _propTypes["default"].object,
        innerWidth: _propTypes["default"].number,
        innerHeight: _propTypes["default"].number,
        marginLeft: _propTypes["default"].number,
        marginTop: _propTypes["default"].number,
        orientation: _propTypes["default"].oneOf(['left', 'right']),
        itemsFormat: _propTypes["default"].func,
        titleFormat: _propTypes["default"].func,
        style: _propTypes["default"].shape({
          line: _propTypes["default"].object,
          title: _propTypes["default"].object,
          box: _propTypes["default"].object
        })
      };
    }
  }]);
}(_react.PureComponent);
Crosshair.displayName = 'Crosshair';
var _default = exports["default"] = Crosshair;