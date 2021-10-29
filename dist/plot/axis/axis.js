"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _animation = _interopRequireDefault(require("../../animation"));

var _axisUtils = require("../../utils/axis-utils");

var _scalesUtils = require("../../utils/scales-utils");

var _stylingUtils = require("../../utils/styling-utils");

var _axisLine = _interopRequireDefault(require("./axis-line"));

var _axisTicks = _interopRequireDefault(require("./axis-ticks"));

var _axisTitle = _interopRequireDefault(require("./axis-title"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var defaultAnimatedProps = ['xRange', 'yRange', 'xDomain', 'yDomain', 'width', 'height', 'marginLeft', 'marginTop', 'marginRight', 'marginBottom', 'tickSize', 'tickTotal', 'tickSizeInner', 'tickSizeOuter'];
var LEFT = _axisUtils.ORIENTATION.LEFT,
    RIGHT = _axisUtils.ORIENTATION.RIGHT,
    TOP = _axisUtils.ORIENTATION.TOP,
    BOTTOM = _axisUtils.ORIENTATION.BOTTOM;
var propTypes = {
  orientation: _propTypes["default"].oneOf([LEFT, RIGHT, TOP, BOTTOM]),
  attr: _propTypes["default"].string.isRequired,
  attrAxis: _propTypes["default"].string,
  width: _propTypes["default"].number,
  height: _propTypes["default"].number,
  top: _propTypes["default"].number,
  left: _propTypes["default"].number,
  title: _propTypes["default"].string,
  style: _propTypes["default"].object,
  className: _propTypes["default"].string,
  hideTicks: _propTypes["default"].bool,
  hideLine: _propTypes["default"].bool,
  on0: _propTypes["default"].bool,
  tickLabelAngle: _propTypes["default"].number,
  tickSize: _propTypes["default"].number,
  tickSizeInner: _propTypes["default"].number,
  tickSizeOuter: _propTypes["default"].number,
  tickPadding: _propTypes["default"].number,
  tickValues: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string])),
  tickFormat: _propTypes["default"].func,
  tickTotal: _propTypes["default"].number,
  // Not expected to be used by the users.
  // TODO: Add underscore to these properties later.
  marginTop: _propTypes["default"].number,
  marginBottom: _propTypes["default"].number,
  marginLeft: _propTypes["default"].number,
  marginRight: _propTypes["default"].number,
  innerWidth: _propTypes["default"].number,
  innerHeight: _propTypes["default"].number
};
var defaultProps = {
  className: '',
  on0: false,
  style: {},
  tickSize: 6,
  tickPadding: 8,
  orientation: BOTTOM
};
var predefinedClassName = 'rv-xy-plot__axis';
var VERTICAL_CLASS_NAME = 'rv-xy-plot__axis--vertical';
var HORIZONTAL_CLASS_NAME = 'rv-xy-plot__axis--horizontal';

var Axis = /*#__PURE__*/function (_PureComponent) {
  _inherits(Axis, _PureComponent);

  var _super = _createSuper(Axis);

  function Axis() {
    _classCallCheck(this, Axis);

    return _super.apply(this, arguments);
  }

  _createClass(Axis, [{
    key: "_getDefaultAxisProps",

    /**
     * Define the default values depending on the data passed from the outside.
     * @returns {*} Object of default properties.
     * @private
     */
    value: function _getDefaultAxisProps() {
      var _this$props = this.props,
          innerWidth = _this$props.innerWidth,
          innerHeight = _this$props.innerHeight,
          marginTop = _this$props.marginTop,
          marginBottom = _this$props.marginBottom,
          marginLeft = _this$props.marginLeft,
          marginRight = _this$props.marginRight,
          orientation = _this$props.orientation;

      if (orientation === BOTTOM) {
        return {
          tickTotal: (0, _axisUtils.getTicksTotalFromSize)(innerWidth),
          top: innerHeight + marginTop,
          left: marginLeft,
          width: innerWidth,
          height: marginBottom
        };
      } else if (orientation === TOP) {
        return {
          tickTotal: (0, _axisUtils.getTicksTotalFromSize)(innerWidth),
          top: 0,
          left: marginLeft,
          width: innerWidth,
          height: marginTop
        };
      } else if (orientation === LEFT) {
        return {
          tickTotal: (0, _axisUtils.getTicksTotalFromSize)(innerHeight),
          top: marginTop,
          left: 0,
          width: marginLeft,
          height: innerHeight
        };
      }

      return {
        tickTotal: (0, _axisUtils.getTicksTotalFromSize)(innerHeight),
        top: marginTop,
        left: marginLeft + innerWidth,
        width: marginRight,
        height: innerHeight
      };
    }
  }, {
    key: "render",
    value: function render() {
      var animation = this.props.animation;

      if (animation) {
        var animatedProps = animation.nonAnimatedProps ? defaultAnimatedProps.filter(function (prop) {
          return animation.nonAnimatedProps.indexOf(prop) < 0;
        }) : defaultAnimatedProps;
        return /*#__PURE__*/_react["default"].createElement(_animation["default"], _extends({}, this.props, {
          animatedProps: animatedProps
        }), /*#__PURE__*/_react["default"].createElement(Axis, _extends({}, this.props, {
          animation: null
        })));
      }

      var props = _objectSpread(_objectSpread({}, this._getDefaultAxisProps()), this.props);

      var attrAxis = props.attrAxis,
          className = props.className,
          height = props.height,
          hideLine = props.hideLine,
          hideTicks = props.hideTicks,
          left = props.left,
          marginTop = props.marginTop,
          on0 = props.on0,
          orientation = props.orientation,
          position = props.position,
          style = props.style,
          title = props.title,
          top = props.top,
          width = props.width;
      var isVertical = [LEFT, RIGHT].indexOf(orientation) > -1;
      var axisClassName = isVertical ? VERTICAL_CLASS_NAME : HORIZONTAL_CLASS_NAME;
      var leftPos = left;
      var topPos = top;

      if (on0) {
        var scale = (0, _scalesUtils.getAttributeScale)(props, attrAxis);

        if (isVertical) {
          leftPos = scale(0);
        } else {
          topPos = marginTop + scale(0);
        }
      }

      return /*#__PURE__*/_react["default"].createElement("g", {
        transform: "translate(".concat(leftPos, ",").concat(topPos, ")"),
        className: (0, _stylingUtils.getCombinedClassName)(predefinedClassName, axisClassName, className),
        style: style
      }, !hideLine && /*#__PURE__*/_react["default"].createElement(_axisLine["default"], {
        height: height,
        width: width,
        orientation: orientation,
        style: _objectSpread(_objectSpread({}, style), style.line)
      }), !hideTicks && /*#__PURE__*/_react["default"].createElement(_axisTicks["default"], _extends({}, props, {
        style: _objectSpread(_objectSpread({}, style), style.ticks)
      })), title ? /*#__PURE__*/_react["default"].createElement(_axisTitle["default"], {
        position: position,
        title: title,
        height: height,
        width: width,
        style: _objectSpread(_objectSpread({}, style), style.title),
        orientation: orientation
      }) : null);
    }
  }]);

  return Axis;
}(_react.PureComponent);

Axis.displayName = 'Axis';
Axis.propTypes = propTypes;
Axis.defaultProps = defaultProps;
Axis.requiresSVG = true;
var _default = Axis;
exports["default"] = _default;