"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _animation = _interopRequireDefault(require("../../animation"));
var _d3Shape = require("d3-shape");
var _seriesUtils = require("../../utils/series-utils");
var _abstractSeries = _interopRequireDefault(require("./abstract-series"));
var _scalesUtils = require("../../utils/scales-utils");
var _stylingUtils = require("../../utils/styling-utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
var predefinedClassName = 'rv-xy-plot__series rv-xy-plot__series--arc';
var ATTRIBUTES = ['radius', 'angle'];
var defaultProps = _objectSpread(_objectSpread({}, _abstractSeries["default"].defaultProps), {}, {
  center: {
    x: 0,
    y: 0
  },
  arcClassName: '',
  className: '',
  style: {},
  padAngle: 0
});

/**
 * Prepare the internal representation of row for real use.
 * This is necessary because d3 insists on starting at 12 oclock and moving
 * clockwise, rather than starting at 3 oclock and moving counter clockwise
 * as one might expect from polar
 * @param {Object} row - coordinate object to be modifed
 * @return {Object} angle corrected object
 */
function modifyRow(row) {
  var radius = row.radius,
    angle = row.angle,
    angle0 = row.angle0;
  var truedAngle = -1 * angle + Math.PI / 2;
  var truedAngle0 = -1 * angle0 + Math.PI / 2;
  return _objectSpread(_objectSpread({}, row), {}, {
    x: radius * Math.cos(truedAngle),
    y: radius * Math.sin(truedAngle),
    angle: truedAngle,
    angle0: truedAngle0
  });
}
var ArcSeries = /*#__PURE__*/function (_AbstractSeries) {
  function ArcSeries(props) {
    var _this;
    _classCallCheck(this, ArcSeries);
    _this = _callSuper(this, ArcSeries, [props]);
    var scaleProps = _this._getAllScaleProps(props);
    _this.state = {
      scaleProps: scaleProps
    };
    return _this;
  }
  _inherits(ArcSeries, _AbstractSeries);
  return _createClass(ArcSeries, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      this.setState({
        scaleProps: this._getAllScaleProps(nextProps)
      });
    }

    /**
     * Get the map of scales from the props.
     * @param {Object} props Props.
     * @param {Array} data Array of all data.
     * @returns {Object} Map of scales.
     * @private
     */
  }, {
    key: "_getAllScaleProps",
    value: function _getAllScaleProps(props) {
      var defaultScaleProps = this._getDefaultScaleProps(props);
      var userScaleProps = (0, _scalesUtils.extractScalePropsFromProps)(props, ATTRIBUTES);
      var missingScaleProps = (0, _scalesUtils.getMissingScaleProps)(_objectSpread(_objectSpread({}, defaultScaleProps), userScaleProps), props.data, ATTRIBUTES);
      return _objectSpread(_objectSpread(_objectSpread({}, defaultScaleProps), userScaleProps), missingScaleProps);
    }

    /**
     * Get the list of scale-related settings that should be applied by default.
     * @param {Object} props Object of props.
     * @returns {Object} Defaults.
     * @private
     */
  }, {
    key: "_getDefaultScaleProps",
    value: function _getDefaultScaleProps(props) {
      var innerWidth = props.innerWidth,
        innerHeight = props.innerHeight;
      var radius = Math.min(innerWidth / 2, innerHeight / 2);
      return {
        radiusRange: [0, radius],
        _radiusValue: radius,
        angleType: 'literal'
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        arcClassName = _this$props.arcClassName,
        animation = _this$props.animation,
        className = _this$props.className,
        center = _this$props.center,
        data = _this$props.data,
        disableSeries = _this$props.disableSeries,
        hideSeries = _this$props.hideSeries,
        marginLeft = _this$props.marginLeft,
        marginTop = _this$props.marginTop,
        padAngle = _this$props.padAngle,
        style = _this$props.style;
      if (!data) {
        return null;
      }
      if (animation) {
        var cloneData = data.map(function (d) {
          return _objectSpread({}, d);
        });
        return /*#__PURE__*/_react["default"].createElement("g", {
          className: "rv-xy-plot__series--arc__animation-wrapper"
        }, /*#__PURE__*/_react["default"].createElement(_animation["default"], _extends({}, this.props, {
          animatedProps: _seriesUtils.ANIMATED_SERIES_PROPS,
          data: cloneData
        }), /*#__PURE__*/_react["default"].createElement(ArcSeries, _extends({}, this.props, {
          animation: null,
          disableSeries: true,
          data: cloneData
        }))), /*#__PURE__*/_react["default"].createElement(ArcSeries, _extends({}, this.props, {
          animation: null,
          hideSeries: true,
          style: {
            stroke: 'red'
          }
        })));
      }
      var scaleProps = this.state.scaleProps;
      var radiusDomain = scaleProps.radiusDomain;
      // need to generate our own functors as abstract series doesnt have anythign for us
      var radius = (0, _scalesUtils.getAttributeFunctor)(scaleProps, 'radius');
      var radius0 = (0, _scalesUtils.getAttr0Functor)(scaleProps, 'radius');
      var angle = (0, _scalesUtils.getAttributeFunctor)(scaleProps, 'angle');
      var angle0 = (0, _scalesUtils.getAttr0Functor)(scaleProps, 'angle');
      // but it does have good color support!
      var fill = this._getAttributeFunctor('fill') || this._getAttributeFunctor('color');
      var stroke = this._getAttributeFunctor('stroke') || this._getAttributeFunctor('color');
      var opacity = this._getAttributeFunctor('opacity');
      var x = this._getAttributeFunctor('x');
      var y = this._getAttributeFunctor('y');
      return /*#__PURE__*/_react["default"].createElement("g", {
        className: (0, _stylingUtils.getCombinedClassName)(predefinedClassName, className),
        onMouseOver: this._seriesMouseOverHandler,
        onMouseOut: this._seriesMouseOutHandler,
        onClick: this._seriesClickHandler,
        onContextMenu: this._seriesRightClickHandler,
        opacity: hideSeries ? 0 : 1,
        pointerEvents: disableSeries ? 'none' : 'all',
        transform: "translate(".concat(marginLeft + x(center), ",").concat(marginTop + y(center), ")")
      }, data.map(function (row, i) {
        var noRadius = radiusDomain[1] === radiusDomain[0];
        var arcArg = {
          innerRadius: noRadius ? 0 : radius0(row),
          outerRadius: radius(row),
          startAngle: angle0(row) || 0,
          endAngle: angle(row)
        };
        var arcedData = (0, _d3Shape.arc)().padAngle(padAngle);
        var rowStyle = row.style || {};
        var rowClassName = row.className || '';
        return /*#__PURE__*/_react["default"].createElement("path", {
          key: "path-".concat(i),
          style: _objectSpread(_objectSpread({
            opacity: opacity && opacity(row),
            stroke: stroke && stroke(row),
            fill: fill && fill(row)
          }, style), rowStyle),
          onClick: function onClick(e) {
            return _this2._valueClickHandler(modifyRow(row), e);
          },
          onContextMenu: function onContextMenu(e) {
            return _this2._valueRightClickHandler(modifyRow(row), e);
          },
          onMouseOver: function onMouseOver(e) {
            return _this2._valueMouseOverHandler(modifyRow(row), e);
          },
          onMouseOut: function onMouseOut(e) {
            return _this2._valueMouseOutHandler(modifyRow(row), e);
          },
          className: "".concat(predefinedClassName, "-path ").concat(arcClassName, " ").concat(rowClassName),
          d: arcedData(arcArg)
        });
      }));
    }
  }]);
}(_abstractSeries["default"]);
ArcSeries.propTypes = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, _abstractSeries["default"].propTypes), (0, _scalesUtils.getScalePropTypesByAttribute)('radius')), (0, _scalesUtils.getScalePropTypesByAttribute)('angle')), {}, {
  center: _propTypes["default"].shape({
    x: _propTypes["default"].number,
    y: _propTypes["default"].number
  }),
  arcClassName: _propTypes["default"].string,
  padAngle: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].number])
});
ArcSeries.defaultProps = defaultProps;
ArcSeries.displayName = 'ArcSeries';
var _default = exports["default"] = ArcSeries;