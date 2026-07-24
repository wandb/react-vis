"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _d3Color = require("d3-color");
var _theme = require("../../theme");
var _scalesUtils = require("../../utils/scales-utils");
var _seriesUtils = require("../../utils/series-utils");
var _abstractSeries = _interopRequireDefault(require("./abstract-series"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
function getScaleDistance(props, attr) {
  var scaleObject = (0, _scalesUtils.getScaleObjectFromProps)(props, attr);
  return scaleObject ? scaleObject.distance : 0;
}
var BarSeriesCanvas = /*#__PURE__*/function (_AbstractSeries) {
  function BarSeriesCanvas() {
    _classCallCheck(this, BarSeriesCanvas);
    return _callSuper(this, BarSeriesCanvas, arguments);
  }
  _inherits(BarSeriesCanvas, _AbstractSeries);
  return _createClass(BarSeriesCanvas, [{
    key: "render",
    value: function render() {
      return null;
    }
  }], [{
    key: "requiresSVG",
    get: function get() {
      return false;
    }
  }, {
    key: "isCanvas",
    get: function get() {
      return true;
    }
  }, {
    key: "renderLayer",
    value: function renderLayer(props, ctx) {
      var data = props.data,
        linePosAttr = props.linePosAttr,
        lineSizeAttr = props.lineSizeAttr,
        valuePosAttr = props.valuePosAttr,
        marginTop = props.marginTop,
        marginBottom = props.marginBottom;
      if (!data || data.length === 0) {
        return;
      }
      var distance = getScaleDistance(props, linePosAttr);
      var line = (0, _scalesUtils.getAttributeFunctor)(props, linePosAttr);
      var value = (0, _scalesUtils.getAttributeFunctor)(props, valuePosAttr);
      var value0 = (0, _scalesUtils.getAttr0Functor)(props, valuePosAttr);
      var fill = (0, _scalesUtils.getAttributeFunctor)(props, 'fill') || (0, _scalesUtils.getAttributeFunctor)(props, 'color');
      var stroke = (0, _scalesUtils.getAttributeFunctor)(props, 'stroke') || (0, _scalesUtils.getAttributeFunctor)(props, 'color');
      var opacity = (0, _scalesUtils.getAttributeFunctor)(props, 'opacity');
      var halfSpace = distance / 2 * 0.85;
      // totalSpaceAvailable is the space we have available to draw all the
      // bars of a same 'linePosAttr' value (a.k.a. sameTypeTotal)
      var totalSpaceAvailable = halfSpace * 2;
      var _getStackParams = (0, _seriesUtils.getStackParams)(props),
        sameTypeTotal = _getStackParams.sameTypeTotal,
        sameTypeIndex = _getStackParams.sameTypeIndex;
      data.forEach(function (row) {
        var totalSpaceCenter = line(row);
        // totalSpaceStartingPoint is the first pixel were we can start drawing
        var totalSpaceStartingPoint = totalSpaceCenter - halfSpace;

        // spaceTakenByInterBarsPixels has the overhead space consumed by each bar of sameTypeTotal
        var spaceTakenByInterBarsPixels = (sameTypeTotal - 1) / sameTypeTotal;
        // lineSize is the space we have available to draw sameTypeIndex bar
        var lineSize = totalSpaceAvailable / sameTypeTotal - spaceTakenByInterBarsPixels;
        var fillColor = (0, _d3Color.rgb)(fill(row));
        var strokeColor = (0, _d3Color.rgb)(stroke(row));
        var rowOpacity = opacity(row) || _theme.DEFAULT_OPACITY;

        // linePos is the first pixel were we can start drawing sameTypeIndex bar
        var linePos = totalSpaceStartingPoint + lineSize * sameTypeIndex + sameTypeIndex;
        var valuePos = Math.min(value0(row), value(row));
        var x = valuePosAttr === 'x' ? valuePos : linePos;
        var y = valuePosAttr === 'y' ? valuePos : linePos;
        var valueSize = Math.abs(-value0(row) + value(row));
        var height = lineSizeAttr === 'height' ? lineSize : valueSize;
        var width = lineSizeAttr === 'width' ? lineSize : valueSize;
        ctx.beginPath();
        ctx.rect(x + marginBottom, y + marginTop, width, height);
        ctx.fillStyle = "rgba(".concat(fillColor.r, ", ").concat(fillColor.g, ", ").concat(fillColor.b, ", ").concat(rowOpacity, ")");
        ctx.fill();
        ctx.strokeStyle = "rgba(".concat(strokeColor.r, ", ").concat(strokeColor.g, ", ").concat(strokeColor.b, ", ").concat(rowOpacity, ")");
        ctx.stroke();
      });
    }
  }]);
}(_abstractSeries["default"]);
BarSeriesCanvas.displayName = 'BarSeriesCanvas';
BarSeriesCanvas.defaultProps = _objectSpread(_objectSpread({}, _abstractSeries["default"].defaultProps), {}, {
  linePosAttr: _propTypes["default"].string.isRequired,
  valuePosAttr: _propTypes["default"].string.isRequired,
  lineSizeAttr: _propTypes["default"].string.isRequired,
  valueSizeAttr: _propTypes["default"].string.isRequired
});
BarSeriesCanvas.propTypes = _objectSpread({}, _abstractSeries["default"].propTypes);
var _default = exports["default"] = BarSeriesCanvas;