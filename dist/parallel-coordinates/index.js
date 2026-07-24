"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _d3Scale = require("d3-scale");
var _d3Format = require("d3-format");
var _animation = require("../animation");
var _xyPlot = _interopRequireDefault(require("../plot/xy-plot"));
var _theme = require("../theme");
var _chartUtils = require("../utils/chart-utils");
var _stylingUtils = require("../utils/styling-utils");
var _lineSeries = _interopRequireDefault(require("../plot/series/line-series"));
var _lineMarkSeries = _interopRequireDefault(require("../plot/series/line-mark-series"));
var _labelSeries = _interopRequireDefault(require("../plot/series/label-series"));
var _decorativeAxis = _interopRequireDefault(require("../plot/axis/decorative-axis"));
var _highlight = _interopRequireDefault(require("../plot/highlight"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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
var predefinedClassName = 'rv-parallel-coordinates-chart';
var DEFAULT_FORMAT = (0, _d3Format.format)('.2r');
/**
 * Generate axes for each of the domains
 * @param {Object} props
 - props.animation {Boolean}
 - props.domains {Array} array of object specifying the way each axis is to be plotted
 - props.style {object} style object for the whole chart
 - props.tickFormat {Function} formatting function for axes
 * @return {Array} the plotted axis components
 */
function getAxes(props) {
  var animation = props.animation,
    domains = props.domains,
    style = props.style,
    tickFormat = props.tickFormat;
  return domains.map(function (domain, index) {
    var sortedDomain = domain.domain;
    var domainTickFormat = function domainTickFormat(t) {
      return domain.tickFormat ? domain.tickFormat(t) : tickFormat(t);
    };
    return /*#__PURE__*/_react["default"].createElement(_decorativeAxis["default"], {
      animation: animation,
      key: "".concat(index, "-axis"),
      axisStart: {
        x: domain.name,
        y: 0
      },
      axisEnd: {
        x: domain.name,
        y: 1
      },
      axisDomain: sortedDomain,
      numberOfTicks: 5,
      tickValue: domainTickFormat,
      style: style.axes
    });
  });
}

/**
 * Generate labels for the ends of the axes
 * @param {Object} props
 - props.domains {Array} array of object specifying the way each axis is to be plotted
 - props.style {object} style object for just the labels
 * @return {Array} the prepped data for the labelSeries
 */
function getLabels(props) {
  var domains = props.domains,
    style = props.style;
  return domains.map(function (domain) {
    return {
      x: domain.name,
      y: 1.1,
      label: domain.name,
      style: style
    };
  });
}

/**
 * Generate the actual lines to be plotted
 * @param {Object} props
 - props.animation {Boolean}
 - props.data {Array} array of object specifying what values are to be plotted
 - props.domains {Array} array of object specifying the way each axis is to be plotted
 - props.style {object} style object for the whole chart
 - props.showMarks {Bool} whether or not to use the line mark series
 * @return {Array} the plotted axis components
 */
function getLines(props) {
  var animation = props.animation,
    brushFilters = props.brushFilters,
    colorRange = props.colorRange,
    domains = props.domains,
    data = props.data,
    style = props.style,
    showMarks = props.showMarks;
  var scales = domains.reduce(function (acc, _ref) {
    var domain = _ref.domain,
      name = _ref.name;
    acc[name] = (0, _d3Scale.scaleLinear)().domain(domain).range([0, 1]);
    return acc;
  }, {});
  // const

  return data.map(function (row, rowIndex) {
    var withinFilteredRange = true;
    var mappedData = domains.map(function (domain) {
      var getValue = domain.getValue,
        name = domain.name;

      // watch out! Gotcha afoot
      // yVal after being scale is in [0, 1] range
      var yVal = scales[name](getValue ? getValue(row) : row[name]);
      var filter = brushFilters[name];
      // filter value after being scale back from pixel space is also in [0, 1]
      if (filter && (yVal < filter.min || yVal > filter.max)) {
        withinFilteredRange = false;
      }
      return {
        x: name,
        y: yVal
      };
    });
    var selectedName = "".concat(predefinedClassName, "-line");
    var unselectedName = "".concat(selectedName, " ").concat(predefinedClassName, "-line-unselected");
    var lineProps = {
      animation: animation,
      className: withinFilteredRange ? selectedName : unselectedName,
      key: "".concat(rowIndex, "-polygon"),
      data: mappedData,
      color: row.color || colorRange[rowIndex % colorRange.length],
      style: _objectSpread(_objectSpread({}, style.lines), row.style || {})
    };
    if (!withinFilteredRange) {
      lineProps.style = _objectSpread(_objectSpread({}, lineProps.style), style.deselectedLineStyle);
    }
    return showMarks ? /*#__PURE__*/_react["default"].createElement(_lineMarkSeries["default"], lineProps) : /*#__PURE__*/_react["default"].createElement(_lineSeries["default"], lineProps);
  });
}
var ParallelCoordinates = /*#__PURE__*/function (_Component) {
  function ParallelCoordinates() {
    var _this;
    _classCallCheck(this, ParallelCoordinates);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, ParallelCoordinates, [].concat(args));
    _defineProperty(_this, "state", {
      brushFilters: {}
    });
    return _this;
  }
  _inherits(ParallelCoordinates, _Component);
  return _createClass(ParallelCoordinates, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var brushFilters = this.state.brushFilters;
      var _this$props = this.props,
        animation = _this$props.animation,
        brushing = _this$props.brushing,
        className = _this$props.className,
        children = _this$props.children,
        colorRange = _this$props.colorRange,
        data = _this$props.data,
        domains = _this$props.domains,
        height = _this$props.height,
        hideInnerMostValues = _this$props.hideInnerMostValues,
        margin = _this$props.margin,
        onMouseLeave = _this$props.onMouseLeave,
        onMouseEnter = _this$props.onMouseEnter,
        showMarks = _this$props.showMarks,
        style = _this$props.style,
        tickFormat = _this$props.tickFormat,
        width = _this$props.width;
      var axes = getAxes({
        domains: domains,
        animation: animation,
        hideInnerMostValues: hideInnerMostValues,
        style: style,
        tickFormat: tickFormat
      });
      var lines = getLines({
        animation: animation,
        brushFilters: brushFilters,
        colorRange: colorRange,
        domains: domains,
        data: data,
        showMarks: showMarks,
        style: style
      });
      var labelSeries = /*#__PURE__*/_react["default"].createElement(_labelSeries["default"], {
        animation: true,
        key: className,
        className: "".concat(predefinedClassName, "-label"),
        data: getLabels({
          domains: domains,
          style: style.labels
        })
      });
      var _getInnerDimensions = (0, _chartUtils.getInnerDimensions)(this.props, _chartUtils.DEFAULT_MARGINS),
        marginLeft = _getInnerDimensions.marginLeft,
        marginRight = _getInnerDimensions.marginRight;
      return /*#__PURE__*/_react["default"].createElement(_xyPlot["default"], {
        height: height,
        width: width,
        margin: margin,
        dontCheckIfEmpty: true,
        className: (0, _stylingUtils.getCombinedClassName)(className, predefinedClassName),
        onMouseLeave: onMouseLeave,
        onMouseEnter: onMouseEnter,
        xType: "ordinal",
        yDomain: [0, 1]
      }, children, axes.concat(lines).concat(labelSeries), brushing && domains.map(function (d) {
        var trigger = function trigger(row) {
          _this2.setState({
            brushFilters: _objectSpread(_objectSpread({}, brushFilters), {}, _defineProperty({}, d.name, row ? {
              min: row.bottom,
              max: row.top
            } : null))
          });
        };
        return /*#__PURE__*/_react["default"].createElement(_highlight["default"], {
          key: d.name,
          drag: true,
          highlightX: d.name,
          onBrushEnd: trigger,
          onDragEnd: trigger,
          highlightWidth: (width - marginLeft - marginRight) / domains.length,
          enableX: false
        });
      }));
    }
  }]);
}(_react.Component);
ParallelCoordinates.displayName = 'ParallelCoordinates';
ParallelCoordinates.propTypes = {
  animation: _animation.AnimationPropType,
  brushing: _propTypes["default"].bool,
  className: _propTypes["default"].string,
  colorType: _propTypes["default"].string,
  colorRange: _propTypes["default"].arrayOf(_propTypes["default"].string),
  data: _propTypes["default"].arrayOf(_propTypes["default"].object).isRequired,
  domains: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    name: _propTypes["default"].string.isRequired,
    domain: _propTypes["default"].arrayOf(_propTypes["default"].number).isRequired,
    tickFormat: _propTypes["default"].func
  })).isRequired,
  height: _propTypes["default"].number.isRequired,
  margin: _chartUtils.MarginPropType,
  style: _propTypes["default"].shape({
    axes: _propTypes["default"].object,
    labels: _propTypes["default"].object,
    lines: _propTypes["default"].object
  }),
  showMarks: _propTypes["default"].bool,
  tickFormat: _propTypes["default"].func,
  width: _propTypes["default"].number.isRequired
};
ParallelCoordinates.defaultProps = {
  className: '',
  colorType: 'category',
  colorRange: _theme.DISCRETE_COLOR_RANGE,
  style: {
    axes: {
      line: {},
      ticks: {},
      text: {}
    },
    labels: {
      fontSize: 10,
      textAnchor: 'middle'
    },
    lines: {
      strokeWidth: 1,
      strokeOpacity: 1
    },
    deselectedLineStyle: {
      strokeOpacity: 0.1
    }
  },
  tickFormat: DEFAULT_FORMAT
};
var _default = exports["default"] = ParallelCoordinates;