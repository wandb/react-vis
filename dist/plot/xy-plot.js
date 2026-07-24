"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _deepEqual = _interopRequireDefault(require("deep-equal"));
var _stylingUtils = require("../utils/styling-utils");
var _scalesUtils = require("../utils/scales-utils");
var _seriesUtils = require("../utils/series-utils");
var _chartUtils = require("../utils/chart-utils");
var _animation = require("../animation");
var _theme = require("../theme");
var _canvasWrapper = _interopRequireDefault(require("./series/canvas-wrapper"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
var ATTRIBUTES = ['x', 'y', 'radius', 'angle', 'color', 'fill', 'stroke', 'opacity', 'size'];

/**
 * Remove parents from tree formatted data. deep-equal doesnt play nice with data
 * that has circular structures, so we make every node single directional by pruning the parents.
 * @param {Array} data - the data object to have circular deps resolved in
 * @returns {Array} the sanitized data
 */
function cleanseData(data) {
  return data.map(function (series) {
    if (!Array.isArray(series)) {
      return series;
    }
    return series.map(function (row) {
      return _objectSpread(_objectSpread({}, row), {}, {
        parent: null
      });
    });
  });
}

/**
 * Wrapper on the deep-equal method for checking equality of next props vs current props
 * @param {Object} scaleMixins - Scale object.
 * @param {Object} nextScaleMixins - Scale object.
 * @param {Boolean} hasTreeStructure - Whether or not to cleanse the data of possible cyclic structures
 * @returns {Boolean} whether or not the two mixins objects are equal
 */
function checkIfMixinsAreEqual(nextScaleMixins, scaleMixins, hasTreeStructure) {
  var newMixins = _objectSpread(_objectSpread({}, nextScaleMixins), {}, {
    _allData: hasTreeStructure ? cleanseData(nextScaleMixins._allData) : nextScaleMixins._allData
  });
  var oldMixins = _objectSpread(_objectSpread({}, scaleMixins), {}, {
    _allData: hasTreeStructure ? cleanseData(scaleMixins._allData) : scaleMixins._allData
  });
  // it's hard to say if this function is reasonable?
  return (0, _deepEqual["default"])(newMixins, oldMixins);
}
var XYPlot = /*#__PURE__*/function (_React$Component) {
  function XYPlot(props) {
    var _this;
    _classCallCheck(this, XYPlot);
    _this = _callSuper(this, XYPlot, [props]);
    /**
     * Trigger click related callbacks if they are available.
     * @param {React.SyntheticEvent} event Click event.
     * @private
     */
    _defineProperty(_this, "_clickHandler", function (event) {
      var onClick = _this.props.onClick;
      if (onClick) {
        onClick(event);
      }
    });
    /**
     * Trigger doule-click related callbacks if they are available.
     * @param {React.SyntheticEvent} event Double-click event.
     * @private
     */
    _defineProperty(_this, "_doubleClickHandler", function (event) {
      var onDoubleClick = _this.props.onDoubleClick;
      if (onDoubleClick) {
        onDoubleClick(event);
      }
    });
    /**
     * Trigger mouse-down related callbacks if they are available.
     * @param {React.SyntheticEvent} event Mouse down event.
     * @private
     */
    _defineProperty(_this, "_mouseDownHandler", function (event) {
      var _this$props = _this.props,
        onMouseDown = _this$props.onMouseDown,
        children = _this$props.children;
      if (onMouseDown) {
        onMouseDown(event);
      }
      var seriesChildren = (0, _seriesUtils.getSeriesChildren)(children);
      seriesChildren.forEach(function (child, index) {
        var component = _this["series".concat(index)];
        if (component && component.onParentMouseDown) {
          component.onParentMouseDown(event);
        }
      });
    });
    /**
     * Trigger onMouseEnter handler if it was passed in props.
     * @param {React.SyntheticEvent} event Mouse enter event.
     * @private
     */
    _defineProperty(_this, "_mouseEnterHandler", function (event) {
      var _this$props2 = _this.props,
        onMouseEnter = _this$props2.onMouseEnter,
        children = _this$props2.children;
      if (onMouseEnter) {
        onMouseEnter(event);
      }
      var seriesChildren = (0, _seriesUtils.getSeriesChildren)(children);
      seriesChildren.forEach(function (child, index) {
        var component = _this["series".concat(index)];
        if (component && component.onParentMouseEnter) {
          component.onParentMouseEnter(event);
        }
      });
    });
    /**
     * Trigger onMouseLeave handler if it was passed in props.
     * @param {React.SyntheticEvent} event Mouse leave event.
     * @private
     */
    _defineProperty(_this, "_mouseLeaveHandler", function (event) {
      var _this$props3 = _this.props,
        onMouseLeave = _this$props3.onMouseLeave,
        children = _this$props3.children;
      if (onMouseLeave) {
        onMouseLeave(event);
      }
      var seriesChildren = (0, _seriesUtils.getSeriesChildren)(children);
      seriesChildren.forEach(function (child, index) {
        var component = _this["series".concat(index)];
        if (component && component.onParentMouseLeave) {
          component.onParentMouseLeave(event);
        }
      });
    });
    /**
     * Trigger movement-related callbacks if they are available.
     * @param {React.SyntheticEvent} event Mouse move event.
     * @private
     */
    _defineProperty(_this, "_mouseMoveHandler", function (event) {
      var _this$props4 = _this.props,
        onMouseMove = _this$props4.onMouseMove,
        children = _this$props4.children;
      if (onMouseMove) {
        onMouseMove(event);
      }
      var seriesChildren = (0, _seriesUtils.getSeriesChildren)(children);
      seriesChildren.forEach(function (child, index) {
        var component = _this["series".concat(index)];
        if (component && component.onParentMouseMove) {
          component.onParentMouseMove(event);
        }
      });
    });
    /**
     * Trigger mouse-up related callbacks if they are available.
     * @param {React.SyntheticEvent} event Mouse up event.
     * @private
     */
    _defineProperty(_this, "_mouseUpHandler", function (event) {
      var _this$props5 = _this.props,
        onMouseUp = _this$props5.onMouseUp,
        children = _this$props5.children;
      if (onMouseUp) {
        onMouseUp(event);
      }
      var seriesChildren = (0, _seriesUtils.getSeriesChildren)(children);
      seriesChildren.forEach(function (child, index) {
        var component = _this["series".concat(index)];
        if (component && component.onParentMouseUp) {
          component.onParentMouseUp(event);
        }
      });
    });
    /**
     * Trigger onTouchCancel handler if it was passed in props.
     * @param {React.SyntheticEvent} event Touch Cancel event.
     * @private
     */
    _defineProperty(_this, "_touchCancelHandler", function (event) {
      var onTouchCancel = _this.props.onTouchCancel;
      if (onTouchCancel) {
        onTouchCancel(event);
      }
    });
    /**
     * Trigger onTouchEnd handler if it was passed in props.
     * @param {React.SyntheticEvent} event Touch End event.
     * @private
     */
    _defineProperty(_this, "_touchEndHandler", function (event) {
      var onTouchEnd = _this.props.onTouchEnd;
      if (onTouchEnd) {
        onTouchEnd(event);
      }
    });
    /**
     * Trigger touch movement-related callbacks if they are available.
     * @param {React.SyntheticEvent} event Touch move event.
     * @private
     */
    _defineProperty(_this, "_touchMoveHandler", function (event) {
      var _this$props6 = _this.props,
        onTouchMove = _this$props6.onTouchMove,
        children = _this$props6.children;
      if (onTouchMove) {
        onTouchMove(event);
      }
      var seriesChildren = (0, _seriesUtils.getSeriesChildren)(children);
      seriesChildren.forEach(function (child, index) {
        var component = _this["series".concat(index)];
        if (component && component.onParentTouchMove) {
          component.onParentTouchMove(event);
        }
      });
    });
    /**
     * Trigger touch-start related callbacks if they are available.
     * @param {React.SyntheticEvent} event Touch start event.
     * @private
     */
    _defineProperty(_this, "_touchStartHandler", function (event) {
      var _this$props7 = _this.props,
        onTouchStart = _this$props7.onTouchStart,
        children = _this$props7.children;
      if (onTouchStart) {
        onTouchStart(event);
      }
      var seriesChildren = (0, _seriesUtils.getSeriesChildren)(children);
      seriesChildren.forEach(function (child, index) {
        var component = _this["series".concat(index)];
        if (component && component.onParentTouchStart) {
          component.onParentTouchStart(event);
        }
      });
    });
    var stackBy = props.stackBy;
    var _children = (0, _seriesUtils.getSeriesChildren)(props.children);
    var data = (0, _seriesUtils.getStackedData)(_children, stackBy);
    _this.state = {
      scaleMixins: _this._getScaleMixins(data, props),
      data: data
    };
    return _this;
  }
  _inherits(XYPlot, _React$Component);
  return _createClass(XYPlot, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var children = (0, _seriesUtils.getSeriesChildren)(nextProps.children);
      var nextData = (0, _seriesUtils.getStackedData)(children, nextProps.stackBy);
      var scaleMixins = this.state.scaleMixins;
      var nextScaleMixins = this._getScaleMixins(nextData, nextProps);
      if (!checkIfMixinsAreEqual(nextScaleMixins, scaleMixins, nextProps.hasTreeStructure)) {
        this.setState({
          scaleMixins: nextScaleMixins,
          data: nextData
        });
      }
    }
  }, {
    key: "_getClonedChildComponents",
    value:
    /**
     * Prepare the child components (including series) for rendering.
     * @returns {Array} Array of child components.
     * @private
     */
    function _getClonedChildComponents() {
      var _this2 = this;
      var props = this.props;
      var animation = this.props.animation;
      var _this$state = this.state,
        scaleMixins = _this$state.scaleMixins,
        data = _this$state.data;
      var dimensions = (0, _chartUtils.getInnerDimensions)(this.props, _chartUtils.DEFAULT_MARGINS);
      var children = _react["default"].Children.toArray(this.props.children);
      var seriesProps = (0, _seriesUtils.getSeriesPropsFromChildren)(children);
      var XYPlotValues = (0, _scalesUtils.getXYPlotValues)(props, children);
      return children.map(function (child, index) {
        var dataProps = null;
        if (seriesProps[index]) {
          // Get the index of the series in the list of props and retrieve
          // the data property from it.
          var seriesIndex = seriesProps[index].seriesIndex;
          dataProps = {
            data: data[seriesIndex]
          };
        }
        return /*#__PURE__*/_react["default"].cloneElement(child, _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, dimensions), {}, {
          animation: animation
        }, dataProps && child.type.prototype && child.type.prototype.render ? {
          ref: function ref(_ref) {
            return _this2["series".concat(seriesProps[index].seriesIndex)] = _ref;
          }
        } : {}), seriesProps[index]), scaleMixins), child.props), XYPlotValues[index]), dataProps));
      });
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
      var _getInnerDimensions = (0, _chartUtils.getInnerDimensions)(props, _chartUtils.DEFAULT_MARGINS),
        innerWidth = _getInnerDimensions.innerWidth,
        innerHeight = _getInnerDimensions.innerHeight;
      var colorRanges = ['color', 'fill', 'stroke'].reduce(function (acc, attr) {
        var range = props["".concat(attr, "Type")] === 'category' ? _theme.EXTENDED_DISCRETE_COLOR_RANGE : _theme.CONTINUOUS_COLOR_RANGE;
        return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, "".concat(attr, "Range"), range));
      }, {});
      return _objectSpread(_objectSpread({
        xRange: [0, innerWidth],
        yRange: [innerHeight, 0]
      }, colorRanges), {}, {
        opacityType: _theme.OPACITY_TYPE,
        sizeRange: _theme.SIZE_RANGE
      });
    }

    /**
     * Get the map of scales from the props, apply defaults to them and then pass
     * them further.
     * @param {Object} data Array of all data.
     * @param {Object} props Props of the component.
     * @returns {Object} Map of scale-related props.
     * @private
     */
  }, {
    key: "_getScaleMixins",
    value: function _getScaleMixins(data, props) {
      var _ref2;
      var filteredData = data.filter(function (d) {
        return d;
      });
      var allData = (_ref2 = []).concat.apply(_ref2, _toConsumableArray(filteredData));
      var defaultScaleProps = this._getDefaultScaleProps(props);
      var optionalScaleProps = (0, _scalesUtils.getOptionalScaleProps)(props);
      var userScaleProps = (0, _scalesUtils.extractScalePropsFromProps)(props, ATTRIBUTES);
      var missingScaleProps = (0, _scalesUtils.getMissingScaleProps)(_objectSpread(_objectSpread(_objectSpread({}, defaultScaleProps), optionalScaleProps), userScaleProps), allData, ATTRIBUTES);
      var children = (0, _seriesUtils.getSeriesChildren)(props.children);
      var zeroBaseProps = {};
      var adjustBy = new Set();
      var adjustWhat = new Set();
      children.forEach(function (child, index) {
        if (!child || !data[index]) {
          return;
        }
        ATTRIBUTES.forEach(function (attr) {
          var _child$type$getParent = child.type.getParentConfig(attr, child.props),
            isDomainAdjustmentNeeded = _child$type$getParent.isDomainAdjustmentNeeded,
            zeroBaseValue = _child$type$getParent.zeroBaseValue;
          if (isDomainAdjustmentNeeded) {
            adjustBy.add(attr);
            adjustWhat.add(index);
          }
          if (zeroBaseValue) {
            var specifiedDomain = props["".concat(attr, "Domain")];
            zeroBaseProps["".concat(attr, "BaseValue")] = specifiedDomain ? specifiedDomain[0] : 0;
          }
        });
      });
      return _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, defaultScaleProps), zeroBaseProps), userScaleProps), missingScaleProps), {}, {
        _allData: data,
        _adjustBy: Array.from(adjustBy),
        _adjustWhat: Array.from(adjustWhat),
        _stackBy: props.stackBy
      });
    }

    /**
     * Checks if the plot is empty or not.
     * Currently checks the data only.
     * @returns {boolean} True for empty.
     * @private
     */
  }, {
    key: "_isPlotEmpty",
    value: function _isPlotEmpty() {
      var data = this.state.data;
      return !data || !data.length || !data.some(function (series) {
        return series && series.some(function (d) {
          return d;
        });
      });
    }
  }, {
    key: "renderCanvasComponents",
    value: function renderCanvasComponents(components) {
      var componentsToRender = components.filter(function (c) {
        return c && !c.type.requiresSVG && c.type.isCanvas;
      });
      if (componentsToRender.length === 0) {
        return null;
      }
      var _componentsToRender$ = componentsToRender[0].props,
        marginLeft = _componentsToRender$.marginLeft,
        marginTop = _componentsToRender$.marginTop,
        marginBottom = _componentsToRender$.marginBottom,
        marginRight = _componentsToRender$.marginRight,
        innerHeight = _componentsToRender$.innerHeight,
        innerWidth = _componentsToRender$.innerWidth;
      return /*#__PURE__*/_react["default"].createElement(_canvasWrapper["default"], {
        innerHeight: innerHeight,
        innerWidth: innerWidth,
        marginLeft: marginLeft,
        marginTop: marginTop,
        marginBottom: marginBottom,
        marginRight: marginRight
      }, componentsToRender);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props8 = this.props,
        className = _this$props8.className,
        dontCheckIfEmpty = _this$props8.dontCheckIfEmpty,
        style = _this$props8.style,
        width = _this$props8.width,
        height = _this$props8.height,
        onWheel = _this$props8.onWheel;
      if (!dontCheckIfEmpty && this._isPlotEmpty()) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: (0, _stylingUtils.getCombinedClassName)('rv-xy-plot', className),
          style: _objectSpread({
            width: "".concat(width, "px"),
            height: "".concat(height, "px")
          }, this.props.style)
        });
      }
      var components = this._getClonedChildComponents();
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          width: "".concat(width, "px"),
          height: "".concat(height, "px")
        },
        className: (0, _stylingUtils.getCombinedClassName)('rv-xy-plot', className)
      }, /*#__PURE__*/_react["default"].createElement("svg", {
        className: "rv-xy-plot__inner",
        width: width,
        height: height,
        style: style,
        onClick: this._clickHandler,
        onDoubleClick: this._doubleClickHandler,
        onMouseDown: this._mouseDownHandler,
        onMouseUp: this._mouseUpHandler,
        onMouseMove: this._mouseMoveHandler,
        onMouseLeave: this._mouseLeaveHandler,
        onMouseEnter: this._mouseEnterHandler,
        onTouchStart: this._mouseDownHandler,
        onTouchMove: this._touchMoveHandler,
        onTouchEnd: this._touchEndHandler,
        onTouchCancel: this._touchCancelHandler,
        onWheel: onWheel
      }, components.filter(function (c) {
        return c && c.type.requiresSVG;
      })), this.renderCanvasComponents(components), components.filter(function (c) {
        return c && !c.type.requiresSVG && !c.type.isCanvas;
      }));
    }
  }], [{
    key: "defaultProps",
    get: function get() {
      return {
        className: ''
      };
    }
  }, {
    key: "propTypes",
    get: function get() {
      return {
        animation: _animation.AnimationPropType,
        className: _propTypes["default"].string,
        dontCheckIfEmpty: _propTypes["default"].bool,
        height: _propTypes["default"].number.isRequired,
        margin: _chartUtils.MarginPropType,
        onClick: _propTypes["default"].func,
        onDoubleClick: _propTypes["default"].func,
        onMouseDown: _propTypes["default"].func,
        onMouseUp: _propTypes["default"].func,
        onMouseEnter: _propTypes["default"].func,
        onMouseLeave: _propTypes["default"].func,
        onMouseMove: _propTypes["default"].func,
        onTouchStart: _propTypes["default"].func,
        onTouchMove: _propTypes["default"].func,
        onTouchEnd: _propTypes["default"].func,
        onTouchCancel: _propTypes["default"].func,
        onWheel: _propTypes["default"].func,
        stackBy: _propTypes["default"].oneOf(ATTRIBUTES),
        style: _propTypes["default"].object,
        width: _propTypes["default"].number.isRequired
      };
    }
  }]);
}(_react["default"].Component);
XYPlot.displayName = 'XYPlot';
var _default = exports["default"] = XYPlot;