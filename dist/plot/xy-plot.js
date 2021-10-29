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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
  }); // it's hard to say if this function is reasonable?


  return (0, _deepEqual["default"])(newMixins, oldMixins);
}

var XYPlot = /*#__PURE__*/function (_React$Component) {
  _inherits(XYPlot, _React$Component);

  var _super = _createSuper(XYPlot);

  _createClass(XYPlot, null, [{
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

  function XYPlot(props) {
    var _this;

    _classCallCheck(this, XYPlot);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "_clickHandler", function (event) {
      var onClick = _this.props.onClick;

      if (onClick) {
        onClick(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_doubleClickHandler", function (event) {
      var onDoubleClick = _this.props.onDoubleClick;

      if (onDoubleClick) {
        onDoubleClick(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_mouseDownHandler", function (event) {
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

    _defineProperty(_assertThisInitialized(_this), "_mouseEnterHandler", function (event) {
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

    _defineProperty(_assertThisInitialized(_this), "_mouseLeaveHandler", function (event) {
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

    _defineProperty(_assertThisInitialized(_this), "_mouseMoveHandler", function (event) {
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

    _defineProperty(_assertThisInitialized(_this), "_mouseUpHandler", function (event) {
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

    _defineProperty(_assertThisInitialized(_this), "_touchCancelHandler", function (event) {
      var onTouchCancel = _this.props.onTouchCancel;

      if (onTouchCancel) {
        onTouchCancel(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_touchEndHandler", function (event) {
      var onTouchEnd = _this.props.onTouchEnd;

      if (onTouchEnd) {
        onTouchEnd(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_touchMoveHandler", function (event) {
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

    _defineProperty(_assertThisInitialized(_this), "_touchStartHandler", function (event) {
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

  _createClass(XYPlot, [{
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
    /**
     * Trigger click related callbacks if they are available.
     * @param {React.SyntheticEvent} event Click event.
     * @private
     */

  }, {
    key: "_getClonedChildComponents",

    /**
     * Prepare the child components (including series) for rendering.
     * @returns {Array} Array of child components.
     * @private
     */
    value: function _getClonedChildComponents() {
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

        return _react["default"].cloneElement(child, _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, dimensions), {}, {
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
    /**
     * Trigger mouse-down related callbacks if they are available.
     * @param {React.SyntheticEvent} event Mouse down event.
     * @private
     */

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
  }]);

  return XYPlot;
}(_react["default"].Component);

XYPlot.displayName = 'XYPlot';
var _default = XYPlot;
exports["default"] = _default;