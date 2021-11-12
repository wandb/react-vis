"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _abstractSeries = _interopRequireDefault(require("./abstract-series"));

var _animation = _interopRequireDefault(require("../../animation"));

var _seriesUtils = require("../../utils/series-utils");

var _stylingUtils = require("../../utils/styling-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var predefinedClassName = 'rv-xy-plot__series rv-xy-plot__series--custom-svg-wrapper';
var DEFAULT_STYLE = {
  stroke: 'blue',
  fill: 'blue'
};

function predefinedComponents(type) {
  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var style = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_STYLE;

  switch (type) {
    case 'diamond':
      return /*#__PURE__*/_react["default"].createElement("polygon", {
        style: style,
        points: "0 0 ".concat(size / 2, " ").concat(size / 2, " 0 ").concat(size, " ").concat(-size / 2, " ").concat(size / 2, " 0 0")
      });

    case 'star':
      {
        var starPoints = _toConsumableArray(new Array(5)).map(function (c, index) {
          var angle = index / 5 * Math.PI * 2;
          var innerAngle = angle + Math.PI / 10;
          var outerAngle = angle - Math.PI / 10; // ratio of inner polygon to outer polgyon

          var innerRadius = size / 2.61;
          return "\n        ".concat(Math.cos(outerAngle) * size, " ").concat(Math.sin(outerAngle) * size, "\n        ").concat(Math.cos(innerAngle) * innerRadius, " ").concat(Math.sin(innerAngle) * innerRadius, "\n      ");
        }).join(' ');

        return /*#__PURE__*/_react["default"].createElement("polygon", {
          points: starPoints,
          x: "0",
          y: "0",
          height: size,
          width: size,
          style: style
        });
      }

    case 'square':
      return /*#__PURE__*/_react["default"].createElement("rect", {
        x: "".concat(-size / 2),
        y: "".concat(-size / 2),
        height: size,
        width: size,
        style: style
      });

    default:
    case 'circle':
      return /*#__PURE__*/_react["default"].createElement("circle", {
        cx: "0",
        cy: "0",
        r: size / 2,
        style: style
      });
  }
}

function getInnerComponent(_ref) {
  var customComponent = _ref.customComponent,
      defaultType = _ref.defaultType,
      positionInPixels = _ref.positionInPixels,
      positionFunctions = _ref.positionFunctions,
      style = _ref.style,
      propsSize = _ref.propsSize;
  var size = customComponent.size;

  var aggStyle = _objectSpread(_objectSpread({}, style), customComponent.style || {});

  var innerComponent = customComponent.customComponent;

  if (!innerComponent && typeof defaultType === 'string') {
    return predefinedComponents(defaultType, size || propsSize, aggStyle);
  } // if default component is a function


  if (!innerComponent) {
    return defaultType(customComponent, positionInPixels, aggStyle, positionFunctions);
  }

  if (typeof innerComponent === 'string') {
    return predefinedComponents(innerComponent || defaultType, size, aggStyle);
  } // if inner component is a function


  return innerComponent(customComponent, positionInPixels, aggStyle, positionFunctions);
}

var CustomSVGSeries = /*#__PURE__*/function (_AbstractSeries) {
  _inherits(CustomSVGSeries, _AbstractSeries);

  var _super = _createSuper(CustomSVGSeries);

  function CustomSVGSeries() {
    _classCallCheck(this, CustomSVGSeries);

    return _super.apply(this, arguments);
  }

  _createClass(CustomSVGSeries, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          animation = _this$props.animation,
          className = _this$props.className,
          customComponent = _this$props.customComponent,
          data = _this$props.data,
          innerHeight = _this$props.innerHeight,
          innerWidth = _this$props.innerWidth,
          marginLeft = _this$props.marginLeft,
          marginTop = _this$props.marginTop,
          style = _this$props.style,
          size = _this$props.size;

      if (!data || !innerWidth || !innerHeight) {
        return null;
      }

      if (animation) {
        return /*#__PURE__*/_react["default"].createElement(_animation["default"], _extends({}, this.props, {
          animatedProps: _seriesUtils.ANIMATED_SERIES_PROPS
        }), /*#__PURE__*/_react["default"].createElement(CustomSVGSeries, _extends({}, this.props, {
          animation: false
        })));
      }

      var x = this._getAttributeFunctor('x');

      var y = this._getAttributeFunctor('y');

      var contents = data.map(function (seriesComponent, index) {
        var positionInPixels = {
          x: x(seriesComponent),
          y: y(seriesComponent)
        };
        var innerComponent = getInnerComponent({
          customComponent: seriesComponent,
          positionInPixels: positionInPixels,
          defaultType: customComponent,
          positionFunctions: {
            x: x,
            y: y
          },
          style: style,
          propsSize: size
        });
        return /*#__PURE__*/_react["default"].createElement("g", {
          className: "rv-xy-plot__series--custom-svg",
          key: "rv-xy-plot__series--custom-svg-".concat(index),
          transform: "translate(".concat(positionInPixels.x, ",").concat(positionInPixels.y, ")"),
          onMouseEnter: function onMouseEnter(e) {
            return _this._valueMouseOverHandler(seriesComponent, e);
          },
          onMouseLeave: function onMouseLeave(e) {
            return _this._valueMouseOutHandler(seriesComponent, e);
          }
        }, innerComponent);
      });
      return /*#__PURE__*/_react["default"].createElement("g", {
        className: (0, _stylingUtils.getCombinedClassName)(predefinedClassName, className),
        transform: "translate(".concat(marginLeft, ",").concat(marginTop, ")")
      }, contents);
    }
  }]);

  return CustomSVGSeries;
}(_abstractSeries["default"]);

CustomSVGSeries.propTypes = {
  animation: _propTypes["default"].bool,
  className: _propTypes["default"].string,
  customComponent: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
  data: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    x: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]).isRequired,
    y: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]).isRequired
  })).isRequired,
  marginLeft: _propTypes["default"].number,
  marginTop: _propTypes["default"].number,
  style: _propTypes["default"].object,
  size: _propTypes["default"].number,
  onValueMouseOver: _propTypes["default"].func,
  onValueMouseOut: _propTypes["default"].func
};
CustomSVGSeries.defaultProps = _objectSpread(_objectSpread({}, _abstractSeries["default"].defaultProps), {}, {
  animation: false,
  customComponent: 'circle',
  style: {},
  size: 2
});
var _default = CustomSVGSeries;
exports["default"] = _default;