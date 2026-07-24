"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _abstractSeries = _interopRequireDefault(require("./series/abstract-series"));
var _scalesUtils = require("../utils/scales-utils");
var _stylingUtils = require("../utils/styling-utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _readOnlyError(r) { throw new TypeError('"' + r + '" is read-only'); }
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
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function getLocs(evt) {
  var xLoc = evt.type === 'touchstart' ? evt.pageX : evt.offsetX;
  var yLoc = evt.type === 'touchstart' ? evt.pageY : evt.offsetY;
  return {
    xLoc: xLoc,
    yLoc: yLoc
  };
}
var Highlight = /*#__PURE__*/function (_AbstractSeries) {
  function Highlight() {
    var _this;
    _classCallCheck(this, Highlight);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, Highlight, [].concat(args));
    _defineProperty(_this, "state", {
      dragging: false,
      brushArea: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      brushing: false,
      startLocX: 0,
      startLocY: 0,
      dragArea: null
    });
    return _this;
  }
  _inherits(Highlight, _AbstractSeries);
  return _createClass(Highlight, [{
    key: "_getDrawArea",
    value: function _getDrawArea(xLoc, yLoc) {
      var _this$state = this.state,
        startLocX = _this$state.startLocX,
        startLocY = _this$state.startLocY;
      var _this$props = this.props,
        enableX = _this$props.enableX,
        enableY = _this$props.enableY,
        highlightWidth = _this$props.highlightWidth,
        highlightHeight = _this$props.highlightHeight,
        innerWidth = _this$props.innerWidth,
        innerHeight = _this$props.innerHeight,
        marginLeft = _this$props.marginLeft,
        marginRight = _this$props.marginRight,
        marginBottom = _this$props.marginBottom,
        marginTop = _this$props.marginTop;
      var plotHeight = innerHeight + marginTop + marginBottom;
      var plotWidth = innerWidth + marginLeft + marginRight;
      var touchWidth = highlightWidth || plotWidth;
      var touchHeight = highlightHeight || plotHeight;
      return {
        bottom: enableY ? Math.max(startLocY, yLoc) : touchHeight,
        right: enableX ? Math.max(startLocX, xLoc) : touchWidth,
        left: enableX ? Math.min(xLoc, startLocX) : 0,
        top: enableY ? Math.min(yLoc, startLocY) : 0
      };
    }
  }, {
    key: "_getDragArea",
    value: function _getDragArea(xLoc, yLoc) {
      var _this$props2 = this.props,
        enableX = _this$props2.enableX,
        enableY = _this$props2.enableY;
      var _this$state2 = this.state,
        startLocX = _this$state2.startLocX,
        startLocY = _this$state2.startLocY,
        dragArea = _this$state2.dragArea;
      return {
        bottom: dragArea.bottom + (enableY ? yLoc - startLocY : 0),
        left: dragArea.left + (enableX ? xLoc - startLocX : 0),
        right: dragArea.right + (enableX ? xLoc - startLocX : 0),
        top: dragArea.top + (enableY ? yLoc - startLocY : 0)
      };
    }
  }, {
    key: "_clickedOutsideDrag",
    value: function _clickedOutsideDrag(xLoc, yLoc) {
      var _this$props3 = this.props,
        enableX = _this$props3.enableX,
        enableY = _this$props3.enableY;
      var _this$state3 = this.state,
        dragArea = _this$state3.dragArea,
        _this$state3$brushAre = _this$state3.brushArea,
        left = _this$state3$brushAre.left,
        right = _this$state3$brushAre.right,
        top = _this$state3$brushAre.top,
        bottom = _this$state3$brushAre.bottom;
      var clickedOutsideDragX = dragArea && (xLoc < left || xLoc > right);
      var clickedOutsideDragY = dragArea && (yLoc < top || yLoc > bottom);
      if (enableX && enableY) {
        return clickedOutsideDragX || clickedOutsideDragY;
      }
      if (enableX) {
        return clickedOutsideDragX;
      }
      if (enableY) {
        return clickedOutsideDragY;
      }
      return true;
    }
  }, {
    key: "_convertAreaToCoordinates",
    value: function _convertAreaToCoordinates(brushArea) {
      // NOTE only continuous scales are supported for brushing/getting coordinates back
      var _this$props4 = this.props,
        enableX = _this$props4.enableX,
        enableY = _this$props4.enableY,
        marginLeft = _this$props4.marginLeft,
        marginTop = _this$props4.marginTop;
      var xScale = (0, _scalesUtils.getAttributeScale)(this.props, 'x');
      var yScale = (0, _scalesUtils.getAttributeScale)(this.props, 'y');

      // Ensure that users wishes are being respected about which scales are evaluated
      // this is specifically enabled to ensure brushing on mixed categorical and linear
      // charts will run as expected

      if (enableX && enableY) {
        return {
          bottom: yScale.invert(brushArea.bottom - marginTop),
          left: xScale.invert(brushArea.left - marginLeft),
          right: xScale.invert(brushArea.right - marginLeft),
          top: yScale.invert(brushArea.top - marginTop)
        };
      }
      if (enableY) {
        return {
          bottom: yScale.invert(brushArea.bottom - marginTop),
          top: yScale.invert(brushArea.top - marginTop)
        };
      }
      if (enableX) {
        return {
          left: xScale.invert(brushArea.left - marginLeft),
          right: xScale.invert(brushArea.right - marginLeft)
        };
      }
      return {};
    }
  }, {
    key: "startBrushing",
    value: function startBrushing(e) {
      var _this2 = this;
      var _this$props5 = this.props,
        onBrushStart = _this$props5.onBrushStart,
        onDragStart = _this$props5.onDragStart,
        drag = _this$props5.drag;
      var dragArea = this.state.dragArea;
      var _getLocs = getLocs(e.nativeEvent),
        xLoc = _getLocs.xLoc,
        yLoc = _getLocs.yLoc;
      var startArea = function startArea(dragging, resetDrag) {
        var emptyBrush = {
          bottom: yLoc,
          left: xLoc,
          right: xLoc,
          top: yLoc
        };
        _this2.setState({
          dragging: dragging,
          brushArea: dragArea && !resetDrag ? dragArea : emptyBrush,
          brushing: !dragging,
          startLocX: xLoc,
          startLocY: yLoc
        });
      };
      var clickedOutsideDrag = this._clickedOutsideDrag(xLoc, yLoc);
      if (drag && !dragArea || !drag || clickedOutsideDrag) {
        startArea(false, clickedOutsideDrag);
        if (onBrushStart) {
          onBrushStart(e);
        }
        return;
      }
      if (drag && dragArea) {
        startArea(true, clickedOutsideDrag);
        if (onDragStart) {
          onDragStart(e);
        }
      }
    }
  }, {
    key: "stopBrushing",
    value: function stopBrushing() {
      var _this$state4 = this.state,
        brushing = _this$state4.brushing,
        dragging = _this$state4.dragging,
        brushArea = _this$state4.brushArea;
      // Quickly short-circuit if the user isn't brushing in our component
      if (!brushing && !dragging) {
        return;
      }
      var _this$props6 = this.props,
        onBrushEnd = _this$props6.onBrushEnd,
        onDragEnd = _this$props6.onDragEnd,
        drag = _this$props6.drag;
      var noHorizontal = Math.abs(brushArea.right - brushArea.left) < 5;
      var noVertical = Math.abs(brushArea.top - brushArea.bottom) < 5;
      // Invoke the callback with null if the selected area was < 5px
      var isNulled = noVertical || noHorizontal;
      // Clear the draw area
      this.setState({
        brushing: false,
        dragging: false,
        brushArea: drag ? brushArea : {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
        startLocX: 0,
        startLocY: 0,
        dragArea: drag && !isNulled && brushArea
      });
      if (brushing && onBrushEnd) {
        onBrushEnd(!isNulled ? this._convertAreaToCoordinates(brushArea) : null);
      }
      if (drag && onDragEnd) {
        onDragEnd(!isNulled ? this._convertAreaToCoordinates(brushArea) : null);
      }
    }
  }, {
    key: "onBrush",
    value: function onBrush(e) {
      var _this$props7 = this.props,
        onBrush = _this$props7.onBrush,
        onDrag = _this$props7.onDrag,
        drag = _this$props7.drag;
      var _this$state5 = this.state,
        brushing = _this$state5.brushing,
        dragging = _this$state5.dragging;
      var _getLocs2 = getLocs(e.nativeEvent),
        xLoc = _getLocs2.xLoc,
        yLoc = _getLocs2.yLoc;
      if (brushing) {
        var brushArea = this._getDrawArea(xLoc, yLoc);
        this.setState({
          brushArea: brushArea
        });
        if (onBrush) {
          onBrush(this._convertAreaToCoordinates(brushArea));
        }
      }
      if (drag && dragging) {
        var _brushArea = this._getDragArea(xLoc, yLoc);
        this.setState({
          brushArea: _brushArea
        });
        if (onDrag) {
          onDrag(this._convertAreaToCoordinates(_brushArea));
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var _this$props8 = this.props,
        color = _this$props8.color,
        className = _this$props8.className,
        highlightHeight = _this$props8.highlightHeight,
        highlightWidth = _this$props8.highlightWidth,
        highlightX = _this$props8.highlightX,
        highlightY = _this$props8.highlightY,
        innerWidth = _this$props8.innerWidth,
        innerHeight = _this$props8.innerHeight,
        marginLeft = _this$props8.marginLeft,
        marginRight = _this$props8.marginRight,
        marginTop = _this$props8.marginTop,
        marginBottom = _this$props8.marginBottom,
        opacity = _this$props8.opacity;
      var _this$state$brushArea = this.state.brushArea,
        left = _this$state$brushArea.left,
        right = _this$state$brushArea.right,
        top = _this$state$brushArea.top,
        bottom = _this$state$brushArea.bottom;
      var leftPos = 0;
      if (highlightX) {
        var xScale = (0, _scalesUtils.getAttributeScale)(this.props, 'x');
        leftPos = xScale(highlightX);
      }
      var topPos = 0;
      if (highlightY) {
        var yScale = (0, _scalesUtils.getAttributeScale)(this.props, 'y');
        topPos = yScale(highlightY);
      }
      var plotWidth = marginLeft + marginRight + innerWidth;
      var plotHeight = marginTop + marginBottom + innerHeight;
      var touchWidth = highlightWidth || plotWidth;
      var touchHeight = highlightHeight || plotHeight;
      return /*#__PURE__*/_react["default"].createElement("g", {
        transform: "translate(".concat(leftPos, ", ").concat(topPos, ")"),
        className: (0, _stylingUtils.getCombinedClassName)(className, 'rv-highlight-container')
      }, /*#__PURE__*/_react["default"].createElement("rect", {
        className: "rv-mouse-target",
        fill: "black",
        opacity: "0",
        x: "0",
        y: "0",
        width: Math.max(touchWidth, 0),
        height: Math.max(touchHeight, 0),
        onMouseDown: function onMouseDown(e) {
          return _this3.startBrushing(e);
        },
        onMouseMove: function onMouseMove(e) {
          return _this3.onBrush(e);
        },
        onMouseUp: function onMouseUp(e) {
          return _this3.stopBrushing(e);
        },
        onMouseLeave: function onMouseLeave(e) {
          return _this3.stopBrushing(e);
        }
        // preventDefault() so that mouse event emulation does not happen
        ,
        onTouchEnd: function onTouchEnd(e) {
          e.preventDefault();
          _this3.stopBrushing(e);
        },
        onTouchCancel: function onTouchCancel(e) {
          e.preventDefault();
          _this3.stopBrushing(e);
        },
        onContextMenu: function onContextMenu(e) {
          return e.preventDefault();
        },
        onContextMenuCapture: function onContextMenuCapture(e) {
          return e.preventDefault();
        }
      }), /*#__PURE__*/_react["default"].createElement("rect", {
        className: "rv-highlight",
        pointerEvents: "none",
        opacity: opacity,
        fill: color,
        x: left,
        y: top,
        width: Math.min(Math.max(0, right - left), touchWidth),
        height: Math.min(Math.max(0, bottom - top), touchHeight)
      }));
    }
  }]);
}(_abstractSeries["default"]);
Highlight.displayName = 'HighlightOverlay';
Highlight.defaultProps = {
  color: 'rgb(77, 182, 172)',
  className: '',
  enableX: true,
  enableY: true,
  opacity: 0.3
};
Highlight.propTypes = _objectSpread(_objectSpread({}, _abstractSeries["default"].propTypes), {}, {
  enableX: _propTypes["default"].bool,
  enableY: _propTypes["default"].bool,
  highlightHeight: _propTypes["default"].number,
  highlightWidth: _propTypes["default"].number,
  highlightX: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  highlightY: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  onBrushStart: _propTypes["default"].func,
  onDragStart: _propTypes["default"].func,
  onBrush: _propTypes["default"].func,
  onDrag: _propTypes["default"].func,
  onBrushEnd: _propTypes["default"].func,
  onDragEnd: _propTypes["default"].func
});
var _default = exports["default"] = Highlight;