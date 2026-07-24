"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _d3Voronoi = require("d3-voronoi");
var _react = require("react");
var _animation = require("../../animation");
var _scalesUtils = require("../../utils/scales-utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // Copyright (c) 2016 - 2017 Uber Technologies, Inc.
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
var propTypes = _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, (0, _scalesUtils.getScalePropTypesByAttribute)('x')), (0, _scalesUtils.getScalePropTypesByAttribute)('y')), (0, _scalesUtils.getScalePropTypesByAttribute)('size')), (0, _scalesUtils.getScalePropTypesByAttribute)('opacity')), (0, _scalesUtils.getScalePropTypesByAttribute)('color')), {}, {
  width: _propTypes["default"].number,
  height: _propTypes["default"].number,
  data: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].array])),
  onValueMouseOver: _propTypes["default"].func,
  onValueMouseOut: _propTypes["default"].func,
  onValueClick: _propTypes["default"].func,
  onValueRightClick: _propTypes["default"].func,
  onSeriesMouseOver: _propTypes["default"].func,
  onSeriesMouseOut: _propTypes["default"].func,
  onSeriesClick: _propTypes["default"].func,
  onSeriesRightClick: _propTypes["default"].func,
  onNearestX: _propTypes["default"].func,
  onNearestXY: _propTypes["default"].func,
  style: _propTypes["default"].object,
  animation: _animation.AnimationPropType,
  stack: _propTypes["default"].bool
});
var defaultProps = {
  className: '',
  stack: false,
  style: {}
};
var AbstractSeries = /*#__PURE__*/function (_PureComponent) {
  function AbstractSeries() {
    var _this;
    _classCallCheck(this, AbstractSeries);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, AbstractSeries, [].concat(args));
    /**
     * Click handler for the entire series.
     * @param {Object} event Event.
     * @protected
     */
    _defineProperty(_this, "_seriesClickHandler", function (event) {
      var onSeriesClick = _this.props.onSeriesClick;
      if (onSeriesClick) {
        onSeriesClick({
          event: event
        });
      }
    });
    /**
     * Mouse out handler for the entire series.
     * @param {Object} event Event.
     * @protected
     */
    _defineProperty(_this, "_seriesMouseOutHandler", function (event) {
      var onSeriesMouseOut = _this.props.onSeriesMouseOut;
      if (onSeriesMouseOut) {
        onSeriesMouseOut({
          event: event
        });
      }
    });
    /**
     * Mouse over handler for the entire series.
     * @param {Object} event Event.
     * @protected
     */
    _defineProperty(_this, "_seriesMouseOverHandler", function (event) {
      var onSeriesMouseOver = _this.props.onSeriesMouseOver;
      if (onSeriesMouseOver) {
        onSeriesMouseOver({
          event: event
        });
      }
    });
    /**
     * Right Click handler for the entire series.
     * @param {Object} event Event.
     * @protected
     */
    _defineProperty(_this, "_seriesRightClickHandler", function (event) {
      var onSeriesRightClick = _this.props.onSeriesRightClick;
      if (onSeriesRightClick) {
        onSeriesRightClick({
          event: event
        });
      }
    });
    /**
     * Click handler for the specific series' value.
     * @param {Object} d Value object
     * @param {Object} event Event.
     * @protected
     */
    _defineProperty(_this, "_valueClickHandler", function (d, event) {
      var _this$props = _this.props,
        onValueClick = _this$props.onValueClick,
        onSeriesClick = _this$props.onSeriesClick;
      if (onValueClick) {
        onValueClick(d, {
          event: event
        });
      }
      if (onSeriesClick) {
        onSeriesClick({
          event: event
        });
      }
    });
    /**
     * Mouse out handler for the specific series' value.
     * @param {Object} d Value object
     * @param {Object} event Event.
     * @protected
     */
    _defineProperty(_this, "_valueMouseOutHandler", function (d, event) {
      var _this$props2 = _this.props,
        onValueMouseOut = _this$props2.onValueMouseOut,
        onSeriesMouseOut = _this$props2.onSeriesMouseOut;
      if (onValueMouseOut) {
        onValueMouseOut(d, {
          event: event
        });
      }
      if (onSeriesMouseOut) {
        onSeriesMouseOut({
          event: event
        });
      }
    });
    /**
     * Mouse over handler for the specific series' value.
     * @param {Object} d Value object
     * @param {Object} event Event.
     * @protected
     */
    _defineProperty(_this, "_valueMouseOverHandler", function (d, event) {
      var _this$props3 = _this.props,
        onValueMouseOver = _this$props3.onValueMouseOver,
        onSeriesMouseOver = _this$props3.onSeriesMouseOver;
      if (onValueMouseOver) {
        onValueMouseOver(d, {
          event: event
        });
      }
      if (onSeriesMouseOver) {
        onSeriesMouseOver({
          event: event
        });
      }
    });
    /**
     * Right Click handler for the specific series' value.
     * @param {Object} d Value object
     * @param {Object} event Event.
     * @protected
     */
    _defineProperty(_this, "_valueRightClickHandler", function (d, event) {
      var _this$props4 = _this.props,
        onValueRightClick = _this$props4.onValueRightClick,
        onSeriesRightClick = _this$props4.onSeriesRightClick;
      if (onValueRightClick) {
        onValueRightClick(d, {
          event: event
        });
      }
      if (onSeriesRightClick) {
        onSeriesRightClick({
          event: event
        });
      }
    });
    return _this;
  }
  _inherits(AbstractSeries, _PureComponent);
  return _createClass(AbstractSeries, [{
    key: "onParentMouseMove",
    value: function onParentMouseMove(event) {
      var _this$props5 = this.props,
        onNearestX = _this$props5.onNearestX,
        onNearestXY = _this$props5.onNearestXY,
        data = _this$props5.data;
      if (!onNearestX && !onNearestXY || !data) {
        return;
      }
      if (onNearestXY) {
        this._handleNearestXY(event);
      } else {
        this._handleNearestX(event);
      }
    }
  }, {
    key: "onParentTouchMove",
    value: function onParentTouchMove(e) {
      e.preventDefault();
      this.onParentMouseMove(e);
    }
  }, {
    key: "onParentTouchStart",
    value: function onParentTouchStart(e) {
      // prevent mouse event emulation
      e.preventDefault();
    }

    /**
     * Get the attr0 functor.
     * @param {string} attr Attribute name.
     * @returns {*} Functor.
     * @private
     */
  }, {
    key: "_getAttr0Functor",
    value: function _getAttr0Functor(attr) {
      return (0, _scalesUtils.getAttr0Functor)(this.props, attr);
    }

    /**
     * Get attribute functor.
     * @param {string} attr Attribute name
     * @returns {*} Functor.
     * @protected
     */
  }, {
    key: "_getAttributeFunctor",
    value: function _getAttributeFunctor(attr) {
      return (0, _scalesUtils.getAttributeFunctor)(this.props, attr);
    }

    /**
     * Get the attribute value if it is available.
     * @param {string} attr Attribute name.
     * @returns {*} Attribute value if available, fallback value or undefined
     * otherwise.
     * @protected
     */
  }, {
    key: "_getAttributeValue",
    value: function _getAttributeValue(attr) {
      return (0, _scalesUtils.getAttributeValue)(this.props, attr);
    }

    /**
     * Get the scale object distance by the attribute from the list of properties.
     * @param {string} attr Attribute name.
     * @returns {number} Scale distance.
     * @protected
     */
  }, {
    key: "_getScaleDistance",
    value: function _getScaleDistance(attr) {
      var scaleObject = (0, _scalesUtils.getScaleObjectFromProps)(this.props, attr);
      return scaleObject ? scaleObject.distance : 0;
    }
  }, {
    key: "_getXYCoordinateInContainer",
    value: function _getXYCoordinateInContainer(event) {
      var _this$props6 = this.props,
        _this$props6$marginTo = _this$props6.marginTop,
        marginTop = _this$props6$marginTo === void 0 ? 0 : _this$props6$marginTo,
        _this$props6$marginLe = _this$props6.marginLeft,
        marginLeft = _this$props6$marginLe === void 0 ? 0 : _this$props6$marginLe;
      var evt = event.nativeEvent,
        currentTarget = event.currentTarget;
      var rect = currentTarget.getBoundingClientRect();
      var x = evt.clientX;
      var y = evt.clientY;
      if (evt.type === 'touchmove') {
        x = evt.touches[0].pageX;
        y = evt.touches[0].pageY;
      }
      return {
        x: x - rect.left - currentTarget.clientLeft - marginLeft,
        y: y - rect.top - currentTarget.clientTop - marginTop
      };
    }
  }, {
    key: "_handleNearestX",
    value: function _handleNearestX(event) {
      var _this$props7 = this.props,
        onNearestX = _this$props7.onNearestX,
        data = _this$props7.data;
      var minDistance = Number.POSITIVE_INFINITY;
      var value = null;
      var valueIndex = null;
      var coordinate = this._getXYCoordinateInContainer(event);
      var xScaleFn = this._getAttributeFunctor('x');
      data.forEach(function (item, i) {
        var currentCoordinate = xScaleFn(item);
        var newDistance = Math.abs(coordinate.x - currentCoordinate);
        if (newDistance < minDistance) {
          minDistance = newDistance;
          value = item;
          valueIndex = i;
        }
      });
      if (!value) {
        return;
      }
      onNearestX(value, {
        innerX: xScaleFn(value),
        index: valueIndex,
        event: event.nativeEvent
      });
    }
  }, {
    key: "_handleNearestXY",
    value: function _handleNearestXY(event) {
      var _this$props8 = this.props,
        onNearestXY = _this$props8.onNearestXY,
        data = _this$props8.data;
      var coordinate = this._getXYCoordinateInContainer(event);
      var xScaleFn = this._getAttributeFunctor('x');
      var yScaleFn = this._getAttributeFunctor('y');

      // Create a voronoi with each node center points
      var voronoiInstance = (0, _d3Voronoi.voronoi)().x(xScaleFn).y(yScaleFn);
      var foundPoint = voronoiInstance(data).find(coordinate.x, coordinate.y);
      var value = foundPoint.data;
      if (!value) {
        return;
      }
      onNearestXY(value, {
        innerX: foundPoint[0],
        innerY: foundPoint[1],
        index: foundPoint.index,
        event: event.nativeEvent
      });
    }
  }], [{
    key: "getParentConfig",
    value:
    /**
     * Get a default config for the parent.
     * @returns {Object} Empty config.
     */
    function getParentConfig() {
      return {};
    }

    /**
     * Tells the rest of the world that it requires SVG to work.
     * @returns {boolean} Result.
     */
  }, {
    key: "requiresSVG",
    get: function get() {
      return true;
    }
  }]);
}(_react.PureComponent);
AbstractSeries.displayName = 'AbstractSeries';
AbstractSeries.propTypes = propTypes;
AbstractSeries.defaultProps = defaultProps;
var _default = exports["default"] = AbstractSeries;