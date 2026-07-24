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
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); } // Copyright (c) 2017 Uber Technologies, Inc.
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
var predefinedClassName = 'rv-xy-plot__series rv-xy-plot__series--label';
var getTextAnchor = function getTextAnchor(labelAnchorX, leftOfMiddle) {
  return labelAnchorX ? labelAnchorX : leftOfMiddle ? 'start' : 'end';
};
var getDominantBaseline = function getDominantBaseline(labelAnchorY, aboveMiddle) {
  return labelAnchorY ? labelAnchorY : aboveMiddle ? 'text-before-edge' : 'text-after-edge';
};
var LabelSeries = /*#__PURE__*/function (_AbstractSeries) {
  function LabelSeries() {
    _classCallCheck(this, LabelSeries);
    return _callSuper(this, LabelSeries, arguments);
  }
  _inherits(LabelSeries, _AbstractSeries);
  return _createClass(LabelSeries, [{
    key: "render",
    value: function render() {
      var _this = this;
      var _this$props = this.props,
        animation = _this$props.animation,
        allowOffsetToBeReversed = _this$props.allowOffsetToBeReversed,
        className = _this$props.className,
        data = _this$props.data,
        _data = _this$props._data,
        getLabel = _this$props.getLabel,
        marginLeft = _this$props.marginLeft,
        marginTop = _this$props.marginTop,
        rotation = _this$props.rotation,
        style = _this$props.style,
        xRange = _this$props.xRange,
        yRange = _this$props.yRange,
        labelAnchorX = _this$props.labelAnchorX,
        labelAnchorY = _this$props.labelAnchorY;
      if (!data) {
        return null;
      }
      if (animation) {
        return /*#__PURE__*/_react["default"].createElement(_animation["default"], _extends({}, this.props, {
          animatedProps: _seriesUtils.ANIMATED_SERIES_PROPS
        }), /*#__PURE__*/_react["default"].createElement(LabelSeries, _extends({}, this.props, {
          animation: null,
          _data: data
        })));
      }
      var xFunctor = this._getAttributeFunctor('x');
      var yFunctor = this._getAttributeFunctor('y');
      return /*#__PURE__*/_react["default"].createElement("g", {
        className: (0, _stylingUtils.getCombinedClassName)(predefinedClassName, className),
        transform: "translate(".concat(marginLeft, ",").concat(marginTop, ")"),
        style: style
      }, data.reduce(function (res, d, i) {
        var markStyle = d.style,
          xOffset = d.xOffset,
          yOffset = d.yOffset;
        if (!getLabel(d)) {
          return res;
        }
        var xVal = xFunctor(d);
        var yVal = yFunctor(d);
        var leftOfMiddle = xVal < (xRange[1] - xRange[0]) / 2;
        var aboveMiddle = yVal < Math.abs(yRange[1] - yRange[0]) / 2;
        var x = xVal + (allowOffsetToBeReversed && leftOfMiddle ? -1 : 1) * (xOffset || 0);
        var y = yVal + (allowOffsetToBeReversed && aboveMiddle ? -1 : 1) * (yOffset || 0);
        var hasRotationValueSet = d.rotation === 0 || d.rotation;
        var labelRotation = hasRotationValueSet ? d.rotation : rotation;
        var attrs = _objectSpread({
          dominantBaseline: getDominantBaseline(labelAnchorY, aboveMiddle),
          className: 'rv-xy-plot__series--label-text',
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
          },
          textAnchor: getTextAnchor(labelAnchorX, leftOfMiddle),
          x: x,
          y: y,
          transform: "rotate(".concat(labelRotation, ",").concat(x, ",").concat(y, ")")
        }, markStyle);
        var textContent = getLabel(_data ? _data[i] : d);
        return res.concat([/*#__PURE__*/_react["default"].createElement("text", _extends({
          key: String(i)
        }, attrs), textContent)]);
      }, []));
    }
  }]);
}(_abstractSeries["default"]);
LabelSeries.propTypes = {
  animation: _propTypes["default"].bool,
  allowOffsetToBeReversed: _propTypes["default"].bool,
  className: _propTypes["default"].string,
  data: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    x: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
    y: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
    angle: _propTypes["default"].number,
    radius: _propTypes["default"].number,
    label: _propTypes["default"].string,
    xOffset: _propTypes["default"].number,
    yOffset: _propTypes["default"].number,
    style: _propTypes["default"].object
  })).isRequired,
  marginLeft: _propTypes["default"].number,
  marginTop: _propTypes["default"].number,
  rotation: _propTypes["default"].number,
  style: _propTypes["default"].object,
  xRange: _propTypes["default"].arrayOf(_propTypes["default"].number),
  yRange: _propTypes["default"].arrayOf(_propTypes["default"].number),
  labelAnchorX: _propTypes["default"].string,
  labelAnchorY: _propTypes["default"].string
};
LabelSeries.defaultProps = _objectSpread(_objectSpread({}, _abstractSeries["default"].defaultProps), {}, {
  animation: false,
  rotation: 0,
  getLabel: function getLabel(d) {
    return d.label;
  }
});
LabelSeries.displayName = 'LabelSeries';
var _default = exports["default"] = LabelSeries;