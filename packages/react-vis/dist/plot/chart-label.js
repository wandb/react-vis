"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _stylingUtils = require("../utils/styling-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var ChartLabel = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(ChartLabel, _React$PureComponent);

  var _super = _createSuper(ChartLabel);

  function ChartLabel() {
    _classCallCheck(this, ChartLabel);

    return _super.apply(this, arguments);
  }

  _createClass(ChartLabel, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          innerHeight = _this$props.innerHeight,
          innerWidth = _this$props.innerWidth,
          marginBottom = _this$props.marginBottom,
          marginLeft = _this$props.marginLeft,
          marginRight = _this$props.marginRight,
          marginTop = _this$props.marginTop,
          className = _this$props.className,
          includeMargin = _this$props.includeMargin,
          style = _this$props.style,
          text = _this$props.text,
          xPercent = _this$props.xPercent,
          yPercent = _this$props.yPercent;
      var width = innerWidth + (includeMargin ? marginLeft + marginRight : 0);
      var height = innerHeight + (includeMargin ? marginTop + marginBottom : 0);
      var xPos = width * xPercent + (includeMargin ? 0 : marginLeft);
      var yPos = height * yPercent + (includeMargin ? marginTop : 0);
      return /*#__PURE__*/_react["default"].createElement("g", {
        transform: "translate(".concat(xPos, ", ").concat(yPos, ")"),
        className: (0, _stylingUtils.getCombinedClassName)('rv-xy-plot__axis__title', className)
      }, /*#__PURE__*/_react["default"].createElement("text", style, text));
    }
  }], [{
    key: "requiresSVG",
    get: function get() {
      return true;
    }
  }]);

  return ChartLabel;
}(_react["default"].PureComponent);

ChartLabel.displayName = 'ChartLabel';
ChartLabel.propTypes = {
  className: _propTypes["default"].string,
  includeMargin: _propTypes["default"].bool,
  style: _propTypes["default"].object,
  text: _propTypes["default"].string.isRequired,
  xPercent: _propTypes["default"].number.isRequired,
  yPercent: _propTypes["default"].number.isRequired
};
ChartLabel.defaultProps = {
  className: '',
  includeMargin: true,
  text: '',
  xPercent: 0,
  yPercent: 0,
  style: {}
};
var _default = ChartLabel;
exports["default"] = _default;