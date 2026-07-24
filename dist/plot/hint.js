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
/*
 * Hint provides two options for placement of hint:
 * a) around a data point in one of four quadrants (imagine the point bisected
 *    by two axes -vertical, horizontal- creating 4 quadrants around a data
 *    point).
 * b) **New** pin to an edge of chart/plot area and position along that edge
 *    using data point's other dimension value.
 *
 * To support these two options, deprecate one Hint props (orientation) with two
 * new Hint align prop object (horizontal, vertical) with following values:
 *
 *   horizontal: auto, left, right, leftEdge, rightEdge
 *   vertical: auto, bottom, top, bottomEdge, topEdge
 *
 * Thus, the following ALIGN constants are the values for horizontal
 * and vertical
 */
var ALIGN = {
  AUTO: 'auto',
  LEFT: 'left',
  RIGHT: 'right',
  LEFT_EDGE: 'leftEdge',
  RIGHT_EDGE: 'rightEdge',
  BOTTOM: 'bottom',
  TOP: 'top',
  BOTTOM_EDGE: 'bottomEdge',
  TOP_EDGE: 'topEdge'
};

/**
 * For backwards support, retain the ORIENTATION prop constants
 */
var ORIENTATION = {
  BOTTOM_LEFT: 'bottomleft',
  BOTTOM_RIGHT: 'bottomright',
  TOP_LEFT: 'topleft',
  TOP_RIGHT: 'topright'
};

/**
 * Default format function for the value.
 * @param {Object} value Value.
 * @returns {Array} title-value pairs.
 */
function defaultFormat(value) {
  return Object.keys(value).map(function getProp(key) {
    return {
      title: key,
      value: (0, _dataUtils.transformValueToString)(value[key])
    };
  });
}
var Hint = /*#__PURE__*/function (_PureComponent) {
  function Hint() {
    _classCallCheck(this, Hint);
    return _callSuper(this, Hint, arguments);
  }
  _inherits(Hint, _PureComponent);
  return _createClass(Hint, [{
    key: "_getAlign",
    value:
    /**
     * Obtain align object with horizontal and vertical settings
     * but convert any AUTO values to the non-auto ALIGN depending on the
     * values of x and y.
     * @param {number} x X value.
     * @param {number} y Y value.
     * @returns {Object} Align object w/ horizontal, vertical prop strings.
     * @private
     */
    function _getAlign(x, y) {
      var _this$props = this.props,
        innerWidth = _this$props.innerWidth,
        innerHeight = _this$props.innerHeight,
        orientation = _this$props.orientation,
        _this$props$align = _this$props.align,
        horizontal = _this$props$align.horizontal,
        vertical = _this$props$align.vertical;
      var align = orientation ? this._mapOrientationToAlign(orientation) : {
        horizontal: horizontal,
        vertical: vertical
      };
      if (horizontal === ALIGN.AUTO) {
        align.horizontal = x > innerWidth / 2 ? ALIGN.LEFT : ALIGN.RIGHT;
      }
      if (vertical === ALIGN.AUTO) {
        align.vertical = y > innerHeight / 2 ? ALIGN.TOP : ALIGN.BOTTOM;
      }
      return align;
    }

    /**
     * Get the class names from align values.
     * @param {Object} align object with horizontal and vertical prop strings.
     * @returns {string} Class names.
     * @private
     */
  }, {
    key: "_getAlignClassNames",
    value: function _getAlignClassNames(align) {
      var orientation = this.props.orientation;
      var orientationClass = orientation ? "rv-hint--orientation-".concat(orientation) : '';
      return "".concat(orientationClass, " rv-hint--horizontalAlign-").concat(align.horizontal, "\n     rv-hint--verticalAlign-").concat(align.vertical);
    }

    /**
     * Get a CSS mixin for a proper positioning of the element.
     * @param {Object} align object with horizontal and vertical prop strings.
     * @param {number} x X position.
     * @param {number} y Y position.
     * @returns {Object} Object, that may contain `left` or `right, `top` or
     * `bottom` properties.
     * @private
     */
  }, {
    key: "_getAlignStyle",
    value: function _getAlignStyle(align, x, y) {
      return _objectSpread(_objectSpread({}, this._getXCSS(align.horizontal, x)), this._getYCSS(align.vertical, y));
    }

    /**
     * Get the bottom coordinate of the hint.
     * When y undefined or null, edge case, pin bottom.
     * @param {number} y Y.
     * @returns {{bottom: *}} Mixin.
     * @private
     */
  }, {
    key: "_getCSSBottom",
    value: function _getCSSBottom(y) {
      if (y === undefined || y === null) {
        return {
          bottom: 0
        };
      }
      var _this$props2 = this.props,
        innerHeight = _this$props2.innerHeight,
        marginBottom = _this$props2.marginBottom;
      return {
        bottom: marginBottom + innerHeight - y
      };
    }

    /**
     * Get the left coordinate of the hint.
     * When x undefined or null, edge case, pin left.
     * @param {number} x X.
     * @returns {{left: *}} Mixin.
     * @private
     */
  }, {
    key: "_getCSSLeft",
    value: function _getCSSLeft(x) {
      if (x === undefined || x === null) {
        return {
          left: 0
        };
      }
      var marginLeft = this.props.marginLeft;
      return {
        left: marginLeft + x
      };
    }

    /**
     * Get the right coordinate of the hint.
     * When x undefined or null, edge case, pin right.
     * @param {number} x X.
     * @returns {{right: *}} Mixin.
     * @private
     */
  }, {
    key: "_getCSSRight",
    value: function _getCSSRight(x) {
      if (x === undefined || x === null) {
        return {
          right: 0
        };
      }
      var _this$props3 = this.props,
        innerWidth = _this$props3.innerWidth,
        marginRight = _this$props3.marginRight;
      return {
        right: marginRight + innerWidth - x
      };
    }

    /**
     * Get the top coordinate of the hint.
     * When y undefined or null, edge case, pin top.
     * @param {number} y Y.
     * @returns {{top: *}} Mixin.
     * @private
     */
  }, {
    key: "_getCSSTop",
    value: function _getCSSTop(y) {
      if (y === undefined || y === null) {
        return {
          top: 0
        };
      }
      var marginTop = this.props.marginTop;
      return {
        top: marginTop + y
      };
    }

    /**
     * Get the position for the hint and the appropriate class name.
     * @returns {{style: Object, positionClassName: string}} Style and className for the
     * hint.
     * @private
     */
  }, {
    key: "_getPositionInfo",
    value: function _getPositionInfo() {
      var _this$props4 = this.props,
        value = _this$props4.value,
        getAlignStyle = _this$props4.getAlignStyle;
      var x = (0, _scalesUtils.getAttributeFunctor)(this.props, 'x')(value);
      var y = (0, _scalesUtils.getAttributeFunctor)(this.props, 'y')(value);
      var align = this._getAlign(x, y);
      return {
        position: getAlignStyle ? getAlignStyle(align, x, y) : this._getAlignStyle(align, x, y),
        positionClassName: this._getAlignClassNames(align)
      };
    }
  }, {
    key: "_getXCSS",
    value: function _getXCSS(horizontal, x) {
      // obtain xCSS
      switch (horizontal) {
        case ALIGN.LEFT_EDGE:
          // this pins x to left edge
          return this._getCSSLeft(null);
        case ALIGN.RIGHT_EDGE:
          // this pins x to left edge
          return this._getCSSRight(null);
        case ALIGN.LEFT:
          // this places hint text to the left of center, so set its right edge
          return this._getCSSRight(x);
        case ALIGN.RIGHT:
        default:
          // this places hint text to the right of center, so set its left edge
          // default case should not be possible but if it happens set to RIGHT
          return this._getCSSLeft(x);
      }
    }
  }, {
    key: "_getYCSS",
    value: function _getYCSS(verticalAlign, y) {
      // obtain yCSS
      switch (verticalAlign) {
        case ALIGN.TOP_EDGE:
          // this pins x to top edge
          return this._getCSSTop(null);
        case ALIGN.BOTTOM_EDGE:
          // this pins x to bottom edge
          return this._getCSSBottom(null);
        case ALIGN.BOTTOM:
          // this places hint text to the bottom of center, so set its top edge
          return this._getCSSTop(y);
        case ALIGN.TOP:
        default:
          // this places hint text to the top of center, so set its bottom edge
          // default case should not be possible but if it happens set to BOTTOM
          return this._getCSSBottom(y);
      }
    }
  }, {
    key: "_mapOrientationToAlign",
    value: function _mapOrientationToAlign(orientation) {
      // TODO: print warning that this feature is deprecated and support will be
      // removed in next major release.
      switch (orientation) {
        case ORIENTATION.BOTTOM_LEFT:
          return {
            horizontal: ALIGN.LEFT,
            vertical: ALIGN.BOTTOM
          };
        case ORIENTATION.BOTTOM_RIGHT:
          return {
            horizontal: ALIGN.RIGHT,
            vertical: ALIGN.BOTTOM
          };
        case ORIENTATION.TOP_LEFT:
          return {
            horizontal: ALIGN.LEFT,
            vertical: ALIGN.TOP
          };
        case ORIENTATION.TOP_RIGHT:
          return {
            horizontal: ALIGN.RIGHT,
            vertical: ALIGN.TOP
          };
        default:
          // fall back to horizontalAlign, verticalAlign that are either
          // provided or defaulted to AUTO.  So, don't change things
          break;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
        value = _this$props5.value,
        format = _this$props5.format,
        children = _this$props5.children,
        style = _this$props5.style,
        className = _this$props5.className;
      var _this$_getPositionInf = this._getPositionInfo(),
        position = _this$_getPositionInf.position,
        positionClassName = _this$_getPositionInf.positionClassName;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _stylingUtils.getCombinedClassName)('rv-hint', positionClassName, className),
        style: _objectSpread(_objectSpread(_objectSpread({}, style), position), {}, {
          position: 'absolute'
        })
      }, children ? children : /*#__PURE__*/_react["default"].createElement("div", {
        className: "rv-hint__content",
        style: style.content
      }, format(value).map(function (formattedProp, i) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          key: "rv-hint".concat(i),
          style: style.row
        }, /*#__PURE__*/_react["default"].createElement("span", {
          className: "rv-hint__title",
          style: style.title
        }, formattedProp.title), ': ', /*#__PURE__*/_react["default"].createElement("span", {
          className: "rv-hint__value",
          style: style.value
        }, formattedProp.value));
      })));
    }
  }], [{
    key: "defaultProps",
    get: function get() {
      return {
        format: defaultFormat,
        align: {
          horizontal: ALIGN.AUTO,
          vertical: ALIGN.AUTO
        },
        style: {}
      };
    }
  }, {
    key: "propTypes",
    get: function get() {
      return {
        marginTop: _propTypes["default"].number,
        marginLeft: _propTypes["default"].number,
        innerWidth: _propTypes["default"].number,
        innerHeight: _propTypes["default"].number,
        scales: _propTypes["default"].object,
        value: _propTypes["default"].object,
        format: _propTypes["default"].func,
        style: _propTypes["default"].object,
        className: _propTypes["default"].string,
        align: _propTypes["default"].shape({
          horizontal: _propTypes["default"].oneOf([ALIGN.AUTO, ALIGN.LEFT, ALIGN.RIGHT, ALIGN.LEFT_EDGE, ALIGN.RIGHT_EDGE]),
          vertical: _propTypes["default"].oneOf([ALIGN.AUTO, ALIGN.BOTTOM, ALIGN.TOP, ALIGN.BOTTOM_EDGE, ALIGN.TOP_EDGE])
        }),
        getAlignStyle: _propTypes["default"].func,
        orientation: _propTypes["default"].oneOf([ORIENTATION.BOTTOM_LEFT, ORIENTATION.BOTTOM_RIGHT, ORIENTATION.TOP_LEFT, ORIENTATION.TOP_RIGHT])
      };
    }
  }]);
}(_react.PureComponent);
Hint.displayName = 'Hint';
Hint.ORIENTATION = ORIENTATION;
Hint.ALIGN = ALIGN;
var _default = exports["default"] = Hint;