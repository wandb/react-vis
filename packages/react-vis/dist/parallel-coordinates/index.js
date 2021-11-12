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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  }, {}); // const

  return data.map(function (row, rowIndex) {
    var withinFilteredRange = true;
    var mappedData = domains.map(function (domain) {
      var getValue = domain.getValue,
          name = domain.name; // watch out! Gotcha afoot
      // yVal after being scale is in [0, 1] range

      var yVal = scales[name](getValue ? getValue(row) : row[name]);
      var filter = brushFilters[name]; // filter value after being scale back from pixel space is also in [0, 1]

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
  _inherits(ParallelCoordinates, _Component);

  var _super = _createSuper(ParallelCoordinates);

  function ParallelCoordinates() {
    var _this;

    _classCallCheck(this, ParallelCoordinates);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      brushFilters: {}
    });

    return _this;
  }

  _createClass(ParallelCoordinates, [{
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

  return ParallelCoordinates;
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
var _default = ParallelCoordinates;
exports["default"] = _default;