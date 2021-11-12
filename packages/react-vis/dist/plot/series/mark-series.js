"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _animation = _interopRequireDefault(require("../../animation"));

var _seriesUtils = require("../../utils/series-utils");

var _reactUtils = require("../../utils/react-utils");

var _stylingUtils = require("../../utils/styling-utils");

var _theme = require("../../theme");

var _abstractSeries = _interopRequireDefault(require("./abstract-series"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var predefinedClassName = 'rv-xy-plot__series rv-xy-plot__series--mark';
var DEFAULT_STROKE_WIDTH = 1;

var MarkSeries = /*#__PURE__*/function (_AbstractSeries) {
  _inherits(MarkSeries, _AbstractSeries);

  var _super = _createSuper(MarkSeries);

  function MarkSeries() {
    _classCallCheck(this, MarkSeries);

    return _super.apply(this, arguments);
  }

  _createClass(MarkSeries, [{
    key: "_renderCircle",
    value: function _renderCircle(d, i, strokeWidth, style, scalingFunctions) {
      var _this = this;

      var fill = scalingFunctions.fill,
          opacity = scalingFunctions.opacity,
          size = scalingFunctions.size,
          stroke = scalingFunctions.stroke,
          x = scalingFunctions.x,
          y = scalingFunctions.y;
      var attrs = {
        r: size ? size(d) : _theme.DEFAULT_SIZE,
        cx: x(d),
        cy: y(d),
        style: _objectSpread({
          opacity: opacity ? opacity(d) : _theme.DEFAULT_OPACITY,
          stroke: stroke && stroke(d),
          fill: fill && fill(d),
          strokeWidth: strokeWidth || DEFAULT_STROKE_WIDTH
        }, style),
        key: i,
        onClick: function onClick(e) {
          return _this._valueClickHandler(d, e);
        },
        onContextMenu: function onContextMenu(e) {
          return _this._valueRightClickHandler(d, e);
        },
        onMouseOver: function onMouseOver(e) {
          return _this._valueMouseOverHandler(d, e);
        },
        onMouseOut: function onMouseOut(e) {
          return _this._valueMouseOutHandler(d, e);
        }
      };
      return /*#__PURE__*/_react["default"].createElement("circle", attrs);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          animation = _this$props.animation,
          className = _this$props.className,
          data = _this$props.data,
          marginLeft = _this$props.marginLeft,
          marginTop = _this$props.marginTop,
          strokeWidth = _this$props.strokeWidth,
          style = _this$props.style;

      if (this.props.nullAccessor) {
        (0, _reactUtils.warning)('nullAccessor has been renamed to getNull', true);
      }

      var getNull = this.props.nullAccessor || this.props.getNull;

      if (!data) {
        return null;
      }

      if (animation) {
        return /*#__PURE__*/_react["default"].createElement(_animation["default"], _extends({}, this.props, {
          animatedProps: _seriesUtils.ANIMATED_SERIES_PROPS
        }), /*#__PURE__*/_react["default"].createElement(MarkSeries, _extends({}, this.props, {
          animation: null
        })));
      }

      var scalingFunctions = {
        fill: this._getAttributeFunctor('fill') || this._getAttributeFunctor('color'),
        opacity: this._getAttributeFunctor('opacity'),
        size: this._getAttributeFunctor('size'),
        stroke: this._getAttributeFunctor('stroke') || this._getAttributeFunctor('color'),
        x: this._getAttributeFunctor('x'),
        y: this._getAttributeFunctor('y')
      };
      return /*#__PURE__*/_react["default"].createElement("g", {
        className: (0, _stylingUtils.getCombinedClassName)(predefinedClassName, className),
        transform: "translate(".concat(marginLeft, ",").concat(marginTop, ")")
      }, data.map(function (d, i) {
        return getNull(d) && _this2._renderCircle(d, i, strokeWidth, style, scalingFunctions);
      }));
    }
  }]);

  return MarkSeries;
}(_abstractSeries["default"]);

MarkSeries.displayName = 'MarkSeries';
MarkSeries.propTypes = _objectSpread(_objectSpread({}, _abstractSeries["default"].propTypes), {}, {
  getNull: _propTypes["default"].func,
  strokeWidth: _propTypes["default"].number
});
MarkSeries.defaultProps = {
  getNull: function getNull() {
    return true;
  }
};
var _default = MarkSeries;
exports["default"] = _default;