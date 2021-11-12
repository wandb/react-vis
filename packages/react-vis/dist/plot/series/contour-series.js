"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _d3Contour = require("d3-contour");

var _d3Geo = require("d3-geo");

var _d3Scale = require("d3-scale");

var _abstractSeries = _interopRequireDefault(require("./abstract-series"));

var _animation = _interopRequireDefault(require("../../animation"));

var _seriesUtils = require("../../utils/series-utils");

var _stylingUtils = require("../../utils/styling-utils");

var _theme = require("../../theme");

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

var predefinedClassName = 'rv-xy-plot__series rv-xy-plot__series--contour';

function getDomain(data) {
  return data.reduce(function (acc, row) {
    return {
      min: Math.min(acc.min, row.value),
      max: Math.max(acc.max, row.value)
    };
  }, {
    min: Infinity,
    max: -Infinity
  });
}

var ContourSeries = /*#__PURE__*/function (_AbstractSeries) {
  _inherits(ContourSeries, _AbstractSeries);

  var _super = _createSuper(ContourSeries);

  function ContourSeries() {
    _classCallCheck(this, ContourSeries);

    return _super.apply(this, arguments);
  }

  _createClass(ContourSeries, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          animation = _this$props.animation,
          bandwidth = _this$props.bandwidth,
          className = _this$props.className,
          colorRange = _this$props.colorRange,
          data = _this$props.data,
          innerHeight = _this$props.innerHeight,
          innerWidth = _this$props.innerWidth,
          marginLeft = _this$props.marginLeft,
          marginTop = _this$props.marginTop,
          style = _this$props.style;

      if (!data || !innerWidth || !innerHeight) {
        return null;
      }

      if (animation) {
        return /*#__PURE__*/_react["default"].createElement(_animation["default"], _extends({}, this.props, {
          animatedProps: _seriesUtils.ANIMATED_SERIES_PROPS
        }), /*#__PURE__*/_react["default"].createElement(ContourSeries, _extends({}, this.props, {
          animation: null
        })));
      }

      var x = this._getAttributeFunctor('x');

      var y = this._getAttributeFunctor('y');

      var contouredData = (0, _d3Contour.contourDensity)().x(function (d) {
        return x(d);
      }).y(function (d) {
        return y(d);
      }).size([innerWidth, innerHeight]).bandwidth(bandwidth)(data);
      var geo = (0, _d3Geo.geoPath)();

      var _getDomain = getDomain(contouredData),
          min = _getDomain.min,
          max = _getDomain.max;

      var colorScale = (0, _d3Scale.scaleLinear)().domain([min, max]).range(colorRange || _theme.CONTINUOUS_COLOR_RANGE);
      return /*#__PURE__*/_react["default"].createElement("g", {
        className: (0, _stylingUtils.getCombinedClassName)(predefinedClassName, className),
        transform: "translate(".concat(marginLeft, ",").concat(marginTop, ")")
      }, contouredData.map(function (polygon, index) {
        return /*#__PURE__*/_react["default"].createElement("path", {
          className: "rv-xy-plot__series--contour-line",
          key: "rv-xy-plot__series--contour-line-".concat(index),
          d: geo(polygon),
          style: _objectSpread({
            fill: colorScale(polygon.value)
          }, style)
        });
      }));
    }
  }]);

  return ContourSeries;
}(_abstractSeries["default"]);

ContourSeries.propTypes = _objectSpread(_objectSpread({}, _abstractSeries["default"].propTypes), {}, {
  animation: _propTypes["default"].bool,
  bandwidth: _propTypes["default"].number,
  className: _propTypes["default"].string,
  marginLeft: _propTypes["default"].number,
  marginTop: _propTypes["default"].number,
  style: _propTypes["default"].object
});
ContourSeries.defaultProps = _objectSpread(_objectSpread({}, _abstractSeries["default"].defaultProps), {}, {
  bandwidth: 40,
  style: {}
});
var _default = ContourSeries;
exports["default"] = _default;