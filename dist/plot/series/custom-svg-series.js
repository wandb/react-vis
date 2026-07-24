"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; } // Copyright (c) 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
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
          var outerAngle = angle - Math.PI / 10;
          // ratio of inner polygon to outer polgyon
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
  }
  // if default component is a function
  if (!innerComponent) {
    return defaultType(customComponent, positionInPixels, aggStyle, positionFunctions);
  }
  if (typeof innerComponent === 'string') {
    return predefinedComponents(innerComponent || defaultType, size, aggStyle);
  }
  // if inner component is a function
  return innerComponent(customComponent, positionInPixels, aggStyle, positionFunctions);
}
var CustomSVGSeries = /*#__PURE__*/function (_AbstractSeries) {
  function CustomSVGSeries() {
    _classCallCheck(this, CustomSVGSeries);
    return _callSuper(this, CustomSVGSeries, arguments);
  }
  _inherits(CustomSVGSeries, _AbstractSeries);
  return _createClass(CustomSVGSeries, [{
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
var _default = exports["default"] = CustomSVGSeries;