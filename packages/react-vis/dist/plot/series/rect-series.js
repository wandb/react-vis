"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _animation = _interopRequireDefault(require("../../animation"));

var _seriesUtils = require("../../utils/series-utils");

var _stylingUtils = require("../../utils/styling-utils");

var _abstractSeries = _interopRequireDefault(require("./abstract-series"));

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

var predefinedClassName = 'rv-xy-plot__series rv-xy-plot__series--rect';

var RectSeries = /*#__PURE__*/function (_AbstractSeries) {
  _inherits(RectSeries, _AbstractSeries);

  var _super = _createSuper(RectSeries);

  function RectSeries() {
    _classCallCheck(this, RectSeries);

    return _super.apply(this, arguments);
  }

  _createClass(RectSeries, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          animation = _this$props.animation,
          className = _this$props.className,
          data = _this$props.data,
          linePosAttr = _this$props.linePosAttr,
          lineSizeAttr = _this$props.lineSizeAttr,
          marginLeft = _this$props.marginLeft,
          marginTop = _this$props.marginTop,
          style = _this$props.style,
          valuePosAttr = _this$props.valuePosAttr,
          valueSizeAttr = _this$props.valueSizeAttr;

      if (!data) {
        return null;
      }

      if (animation) {
        return /*#__PURE__*/_react["default"].createElement(_animation["default"], _extends({}, this.props, {
          animatedProps: _seriesUtils.ANIMATED_SERIES_PROPS
        }), /*#__PURE__*/_react["default"].createElement(RectSeries, _extends({}, this.props, {
          animation: null
        })));
      }

      var lineFunctor = this._getAttributeFunctor(linePosAttr);

      var line0Functor = this._getAttr0Functor(linePosAttr);

      var valueFunctor = this._getAttributeFunctor(valuePosAttr);

      var value0Functor = this._getAttr0Functor(valuePosAttr);

      var fillFunctor = this._getAttributeFunctor('fill') || this._getAttributeFunctor('color');

      var strokeFunctor = this._getAttributeFunctor('stroke') || this._getAttributeFunctor('color');

      var opacityFunctor = this._getAttributeFunctor('opacity');

      return /*#__PURE__*/_react["default"].createElement("g", {
        className: (0, _stylingUtils.getCombinedClassName)(predefinedClassName, className),
        transform: "translate(".concat(marginLeft, ",").concat(marginTop, ")")
      }, data.map(function (d, i) {
        var _attrs;

        var attrs = (_attrs = {
          style: _objectSpread({
            opacity: opacityFunctor && opacityFunctor(d),
            stroke: strokeFunctor && strokeFunctor(d),
            fill: fillFunctor && fillFunctor(d)
          }, style)
        }, _defineProperty(_attrs, linePosAttr, line0Functor(d)), _defineProperty(_attrs, lineSizeAttr, Math.abs(lineFunctor(d) - line0Functor(d))), _defineProperty(_attrs, valuePosAttr, Math.min(value0Functor(d), valueFunctor(d))), _defineProperty(_attrs, valueSizeAttr, Math.abs(-value0Functor(d) + valueFunctor(d))), _defineProperty(_attrs, "onClick", function onClick(e) {
          return _this._valueClickHandler(d, e);
        }), _defineProperty(_attrs, "onContextMenu", function onContextMenu(e) {
          return _this._valueRightClickHandler(d, e);
        }), _defineProperty(_attrs, "onMouseOver", function onMouseOver(e) {
          return _this._valueMouseOverHandler(d, e);
        }), _defineProperty(_attrs, "onMouseOut", function onMouseOut(e) {
          return _this._valueMouseOutHandler(d, e);
        }), _attrs);
        return /*#__PURE__*/_react["default"].createElement("rect", _extends({
          key: String(i)
        }, attrs));
      }));
    }
  }], [{
    key: "propTypes",
    get: function get() {
      return _objectSpread(_objectSpread({}, _abstractSeries["default"].propTypes), {}, {
        linePosAttr: _propTypes["default"].string,
        valuePosAttr: _propTypes["default"].string,
        lineSizeAttr: _propTypes["default"].string,
        valueSizeAttr: _propTypes["default"].string
      });
    }
  }]);

  return RectSeries;
}(_abstractSeries["default"]);

RectSeries.displayName = 'RectSeries';
var _default = RectSeries;
exports["default"] = _default;