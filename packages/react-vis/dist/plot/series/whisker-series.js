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

var _theme = require("../../theme");

var _abstractSeries = _interopRequireDefault(require("./abstract-series"));

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

var predefinedClassName = 'rv-xy-plot__series rv-xy-plot__series--whisker';
var DEFAULT_STROKE_WIDTH = 1;
var DEFAULT_CROSS_BAR_WIDTH = 6;
/**
 * Render whisker lines for a data point.
 * @param {Object} whiskerMarkProps All the properties of the whisker mark.
 * @private
 */

var renderWhiskerMark = function renderWhiskerMark(whiskerMarkProps) {
  return function (d, i) {
    var crossBarWidth = whiskerMarkProps.crossBarWidth,
        opacityFunctor = whiskerMarkProps.opacityFunctor,
        sizeFunctor = whiskerMarkProps.sizeFunctor,
        strokeFunctor = whiskerMarkProps.strokeFunctor,
        strokeWidth = whiskerMarkProps.strokeWidth,
        style = whiskerMarkProps.style,
        valueClickHandler = whiskerMarkProps.valueClickHandler,
        valueMouseOutHandler = whiskerMarkProps.valueMouseOutHandler,
        valueMouseOverHandler = whiskerMarkProps.valueMouseOverHandler,
        valueRightClickHandler = whiskerMarkProps.valueRightClickHandler,
        xFunctor = whiskerMarkProps.xFunctor,
        yFunctor = whiskerMarkProps.yFunctor;
    var r = sizeFunctor ? sizeFunctor(d) : 0;
    var cx = xFunctor(d);
    var cy = yFunctor(d);
    var positiveXVariance = xFunctor({
      x: d.x + d.xVariance / 2
    });
    var negativeXVariance = xFunctor({
      x: d.x - d.xVariance / 2
    });
    var positiveYVariance = yFunctor({
      y: d.y + d.yVariance / 2
    });
    var negativeYVariance = yFunctor({
      y: d.y - d.yVariance / 2
    });
    /**
     * Determine whether on not we should draw whiskers in each direction.
     * We need to see an actual variance value, and also have that value extend past the
     * radius "buffer" region in which we won't be drawing (if any).
     */

    var hasXWhiskers = positiveXVariance && cx + r < positiveXVariance;
    var hasYWhiskers = positiveYVariance && cy - r > positiveYVariance;

    if (!hasXWhiskers && !hasYWhiskers) {
      return null;
    }

    var styleAttr = _objectSpread({
      opacity: opacityFunctor ? opacityFunctor(d) : _theme.DEFAULT_OPACITY,
      stroke: strokeFunctor && strokeFunctor(d),
      strokeWidth: strokeWidth || DEFAULT_STROKE_WIDTH
    }, style);

    var crossBarExtension = crossBarWidth / 2;
    var rightLineAttrs = {
      x1: cx + r,
      y1: cy,
      x2: positiveXVariance,
      y2: cy,
      style: styleAttr
    };
    var leftLineAttrs = {
      x1: cx - r,
      y1: cy,
      x2: negativeXVariance,
      y2: cy,
      style: styleAttr
    };
    var rightCrossBarAttrs = {
      x1: positiveXVariance,
      y1: cy - crossBarExtension,
      x2: positiveXVariance,
      y2: cy + crossBarExtension,
      style: styleAttr
    };
    var leftCrossBarAttrs = {
      x1: negativeXVariance,
      y1: cy - crossBarExtension,
      x2: negativeXVariance,
      y2: cy + crossBarExtension,
      style: styleAttr
    };
    var upperLineAttrs = {
      x1: cx,
      y1: cy - r,
      x2: cx,
      y2: positiveYVariance,
      style: styleAttr
    };
    var lowerLineAttrs = {
      x1: cx,
      y1: cy + r,
      x2: cx,
      y2: negativeYVariance,
      style: styleAttr
    };
    var upperCrossBarAttrs = {
      x1: cx - crossBarExtension,
      y1: positiveYVariance,
      x2: cx + crossBarExtension,
      y2: positiveYVariance,
      style: styleAttr
    };
    var lowerCrossBarAttrs = {
      x1: cx - crossBarExtension,
      y1: negativeYVariance,
      x2: cx + crossBarExtension,
      y2: negativeYVariance,
      style: styleAttr
    };
    return /*#__PURE__*/_react["default"].createElement("g", {
      className: "mark-whiskers",
      key: i,
      onClick: function onClick(e) {
        return valueClickHandler(d, e);
      },
      onContextMenu: function onContextMenu(e) {
        return valueRightClickHandler(d, e);
      },
      onMouseOver: function onMouseOver(e) {
        return valueMouseOverHandler(d, e);
      },
      onMouseOut: function onMouseOut(e) {
        return valueMouseOutHandler(d, e);
      }
    }, hasXWhiskers ? /*#__PURE__*/_react["default"].createElement("g", {
      className: "x-whiskers"
    }, /*#__PURE__*/_react["default"].createElement("line", rightLineAttrs), /*#__PURE__*/_react["default"].createElement("line", leftLineAttrs), /*#__PURE__*/_react["default"].createElement("line", rightCrossBarAttrs), /*#__PURE__*/_react["default"].createElement("line", leftCrossBarAttrs)) : null, hasYWhiskers ? /*#__PURE__*/_react["default"].createElement("g", {
      className: "y-whiskers"
    }, /*#__PURE__*/_react["default"].createElement("line", upperLineAttrs), /*#__PURE__*/_react["default"].createElement("line", lowerLineAttrs), /*#__PURE__*/_react["default"].createElement("line", upperCrossBarAttrs), /*#__PURE__*/_react["default"].createElement("line", lowerCrossBarAttrs)) : null);
  };
};

var WhiskerSeries = /*#__PURE__*/function (_AbstractSeries) {
  _inherits(WhiskerSeries, _AbstractSeries);

  var _super = _createSuper(WhiskerSeries);

  function WhiskerSeries() {
    _classCallCheck(this, WhiskerSeries);

    return _super.apply(this, arguments);
  }

  _createClass(WhiskerSeries, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          animation = _this$props.animation,
          className = _this$props.className,
          crossBarWidth = _this$props.crossBarWidth,
          data = _this$props.data,
          marginLeft = _this$props.marginLeft,
          marginTop = _this$props.marginTop,
          strokeWidth = _this$props.strokeWidth,
          style = _this$props.style;

      if (!data) {
        return null;
      }

      if (animation) {
        return /*#__PURE__*/_react["default"].createElement(_animation["default"], _extends({}, this.props, {
          animatedProps: _seriesUtils.ANIMATED_SERIES_PROPS
        }), /*#__PURE__*/_react["default"].createElement(WhiskerSeries, _extends({}, this.props, {
          animation: null
        })));
      }

      var whiskerMarkProps = {
        crossBarWidth: crossBarWidth,
        opacityFunctor: this._getAttributeFunctor('opacity'),
        sizeFunctor: this._getAttributeFunctor('size'),
        strokeFunctor: this._getAttributeFunctor('stroke') || this._getAttributeFunctor('color'),
        strokeWidth: strokeWidth,
        style: style,
        xFunctor: this._getAttributeFunctor('x'),
        yFunctor: this._getAttributeFunctor('y'),
        valueClickHandler: this._valueClickHandler,
        valueRightClickHandler: this._valueRightClickHandler,
        valueMouseOverHandler: this._valueMouseOverHandler,
        valueMouseOutHandler: this._valueMouseOutHandler
      };
      return /*#__PURE__*/_react["default"].createElement("g", {
        className: (0, _stylingUtils.getCombinedClassName)(predefinedClassName, className),
        transform: "translate(".concat(marginLeft, ",").concat(marginTop, ")")
      }, data.map(renderWhiskerMark(whiskerMarkProps)));
    }
  }]);

  return WhiskerSeries;
}(_abstractSeries["default"]);

WhiskerSeries.displayName = 'WhiskerSeries';
WhiskerSeries.propTypes = _objectSpread(_objectSpread({}, _abstractSeries["default"].propTypes), {}, {
  strokeWidth: _propTypes["default"].number
});
WhiskerSeries.defaultProps = _objectSpread(_objectSpread({}, _abstractSeries["default"].defaultProps), {}, {
  crossBarWidth: DEFAULT_CROSS_BAR_WIDTH,
  size: 0,
  strokeWidth: DEFAULT_STROKE_WIDTH
});
var _default = WhiskerSeries;
exports["default"] = _default;