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

// Copyright (c) 2016 - 2017 Uber Technologies, Inc.
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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';
import { format } from 'd3-format';
import { AnimationPropType } from "../animation";
import XYPlot from "../plot/xy-plot";
import { DISCRETE_COLOR_RANGE } from "../theme";
import { MarginPropType, getInnerDimensions, DEFAULT_MARGINS } from "../utils/chart-utils";
import { getCombinedClassName } from "../utils/styling-utils";
import LineSeries from "../plot/series/line-series";
import LineMarkSeries from "../plot/series/line-mark-series";
import LabelSeries from "../plot/series/label-series";
import DecorativeAxis from "../plot/axis/decorative-axis";
import Highlight from "../plot/highlight";
var predefinedClassName = 'rv-parallel-coordinates-chart';
var DEFAULT_FORMAT = format('.2r');
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

    return /*#__PURE__*/React.createElement(DecorativeAxis, {
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
    acc[name] = scaleLinear().domain(domain).range([0, 1]);
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

    return showMarks ? /*#__PURE__*/React.createElement(LineMarkSeries, lineProps) : /*#__PURE__*/React.createElement(LineSeries, lineProps);
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
      var labelSeries = /*#__PURE__*/React.createElement(LabelSeries, {
        animation: true,
        key: className,
        className: "".concat(predefinedClassName, "-label"),
        data: getLabels({
          domains: domains,
          style: style.labels
        })
      });

      var _getInnerDimensions = getInnerDimensions(this.props, DEFAULT_MARGINS),
          marginLeft = _getInnerDimensions.marginLeft,
          marginRight = _getInnerDimensions.marginRight;

      return /*#__PURE__*/React.createElement(XYPlot, {
        height: height,
        width: width,
        margin: margin,
        dontCheckIfEmpty: true,
        className: getCombinedClassName(className, predefinedClassName),
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

        return /*#__PURE__*/React.createElement(Highlight, {
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
}(Component);

ParallelCoordinates.displayName = 'ParallelCoordinates';
ParallelCoordinates.propTypes = {
  animation: AnimationPropType,
  brushing: PropTypes.bool,
  className: PropTypes.string,
  colorType: PropTypes.string,
  colorRange: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  domains: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    domain: PropTypes.arrayOf(PropTypes.number).isRequired,
    tickFormat: PropTypes.func
  })).isRequired,
  height: PropTypes.number.isRequired,
  margin: MarginPropType,
  style: PropTypes.shape({
    axes: PropTypes.object,
    labels: PropTypes.object,
    lines: PropTypes.object
  }),
  showMarks: PropTypes.bool,
  tickFormat: PropTypes.func,
  width: PropTypes.number.isRequired
};
ParallelCoordinates.defaultProps = {
  className: '',
  colorType: 'category',
  colorRange: DISCRETE_COLOR_RANGE,
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
export default ParallelCoordinates;