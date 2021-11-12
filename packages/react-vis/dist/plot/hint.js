"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _dataUtils = require("../utils/data-utils");

var _scalesUtils = require("../utils/scales-utils");

var _stylingUtils = require("../utils/styling-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
  _inherits(Hint, _PureComponent);

  var _super = _createSuper(Hint);

  function Hint() {
    _classCallCheck(this, Hint);

    return _super.apply(this, arguments);
  }

  _createClass(Hint, [{
    key: "_getAlign",

    /**
     * Obtain align object with horizontal and vertical settings
     * but convert any AUTO values to the non-auto ALIGN depending on the
     * values of x and y.
     * @param {number} x X value.
     * @param {number} y Y value.
     * @returns {Object} Align object w/ horizontal, vertical prop strings.
     * @private
     */
    value: function _getAlign(x, y) {
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

  return Hint;
}(_react.PureComponent);

Hint.displayName = 'Hint';
Hint.ORIENTATION = ORIENTATION;
Hint.ALIGN = ALIGN;
var _default = Hint;
exports["default"] = _default;