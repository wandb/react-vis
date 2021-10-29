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

  return Crosshair;
}(_react.PureComponent);

Crosshair.displayName = 'Crosshair';
var _default = Crosshair;
exports["default"] = _default;