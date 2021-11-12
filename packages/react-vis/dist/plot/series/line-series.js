"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var d3Shape = _interopRequireWildcard(require("d3-shape"));

var _animation = _interopRequireDefault(require("../../animation"));

var _theme = require("../../theme");

var _seriesUtils = require("../../utils/series-utils");

var _reactUtils = require("../../utils/react-utils");

var _stylingUtils = require("../../utils/styling-utils");

var _abstractSeries = _interopRequireDefault(require("./abstract-series"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var predefinedClassName = 'rv-xy-plot__series rv-xy-plot__series--line';
var STROKE_STYLES = {
  dashed: '6, 2',
  solid: null
};

var LineSeries = /*#__PURE__*/function (_AbstractSeries) {
  _inherits(LineSeries, _AbstractSeries);

  var _super = _createSuper(LineSeries);

  function LineSeries() {
    _classCallCheck(this, LineSeries);

    return _super.apply(this, arguments);
  }

  _createClass(LineSeries, [{
    key: "_renderLine",
    value: function _renderLine(data, x, y, curve, getNull) {
      var line = d3Shape.line();

      if (curve !== null) {
        if (typeof curve === 'string' && d3Shape[curve]) {
          line = line.curve(d3Shape[curve]);
        } else if (typeof curve === 'function') {
          line = line.curve(curve);
        }
      }

      line = line.defined(getNull);
      line = line.x(x).y(y);
      return line(data);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          animation = _this$props.animation,
          className = _this$props.className,
          data = _this$props.data;

      if (this.props.nullAccessor) {
        (0, _reactUtils.warning)('nullAccessor has been renamed to getNull', true);
      }

      if (!data) {
        return null;
      }

      if (animation) {
        return /*#__PURE__*/_react["default"].createElement(_animation["default"], _extends({}, this.props, {
          animatedProps: _seriesUtils.ANIMATED_SERIES_PROPS
        }), /*#__PURE__*/_react["default"].createElement(LineSeries, _extends({}, this.props, {
          animation: null
        })));
      }

      var _this$props2 = this.props,
          curve = _this$props2.curve,
          marginLeft = _this$props2.marginLeft,
          marginTop = _this$props2.marginTop,
          strokeDasharray = _this$props2.strokeDasharray,
          strokeStyle = _this$props2.strokeStyle,
          strokeWidth = _this$props2.strokeWidth,
          style = _this$props2.style;

      var x = this._getAttributeFunctor('x');

      var y = this._getAttributeFunctor('y');

      var stroke = this._getAttributeValue('stroke') || this._getAttributeValue('color');

      var newOpacity = this._getAttributeValue('opacity');

      var opacity = Number.isFinite(newOpacity) ? newOpacity : _theme.DEFAULT_OPACITY;
      var getNull = this.props.nullAccessor || this.props.getNull;

      var d = this._renderLine(data, x, y, curve, getNull);

      return /*#__PURE__*/_react["default"].createElement("path", {
        d: d,
        className: (0, _stylingUtils.getCombinedClassName)(predefinedClassName, className),
        transform: "translate(".concat(marginLeft, ",").concat(marginTop, ")"),
        onMouseOver: this._seriesMouseOverHandler,
        onMouseOut: this._seriesMouseOutHandler,
        onClick: this._seriesClickHandler,
        onContextMenu: this._seriesRightClickHandler,
        style: _objectSpread({
          opacity: opacity,
          strokeDasharray: STROKE_STYLES[strokeStyle] || strokeDasharray,
          strokeWidth: strokeWidth,
          stroke: stroke
        }, style)
      });
    }
  }]);

  return LineSeries;
}(_abstractSeries["default"]);

LineSeries.displayName = 'LineSeries';
LineSeries.propTypes = _objectSpread(_objectSpread({}, _abstractSeries["default"].propTypes), {}, {
  strokeStyle: _propTypes["default"].oneOf(Object.keys(STROKE_STYLES)),
  curve: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
  getNull: _propTypes["default"].func
});
LineSeries.defaultProps = _objectSpread(_objectSpread({}, _abstractSeries["default"].defaultProps), {}, {
  strokeStyle: 'solid',
  style: {},
  opacity: 1,
  curve: null,
  className: '',
  getNull: function getNull() {
    return true;
  }
});
var _default = LineSeries;
exports["default"] = _default;