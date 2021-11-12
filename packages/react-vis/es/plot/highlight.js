function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import AbstractSeries from "./series/abstract-series";
import { getAttributeScale } from "../utils/scales-utils";
import { getCombinedClassName } from "../utils/styling-utils";

function getLocs(evt) {
  var xLoc = evt.type === 'touchstart' ? evt.pageX : evt.offsetX;
  var yLoc = evt.type === 'touchstart' ? evt.pageY : evt.offsetY;
  return {
    xLoc: xLoc,
    yLoc: yLoc
  };
}

var Highlight = /*#__PURE__*/function (_AbstractSeries) {
  _inherits(Highlight, _AbstractSeries);

  var _super = _createSuper(Highlight);

  function Highlight() {
    var _this;

    _classCallCheck(this, Highlight);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
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

  _createClass(Highlight, [{
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
      var xScale = getAttributeScale(this.props, 'x');
      var yScale = getAttributeScale(this.props, 'y'); // Ensure that users wishes are being respected about which scales are evaluated
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
          brushArea = _this$state4.brushArea; // Quickly short-circuit if the user isn't brushing in our component

      if (!brushing && !dragging) {
        return;
      }

      var _this$props6 = this.props,
          onBrushEnd = _this$props6.onBrushEnd,
          onDragEnd = _this$props6.onDragEnd,
          drag = _this$props6.drag;
      var noHorizontal = Math.abs(brushArea.right - brushArea.left) < 5;
      var noVertical = Math.abs(brushArea.top - brushArea.bottom) < 5; // Invoke the callback with null if the selected area was < 5px

      var isNulled = noVertical || noHorizontal; // Clear the draw area

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
        var xScale = getAttributeScale(this.props, 'x');
        leftPos = xScale(highlightX);
      }

      var topPos = 0;

      if (highlightY) {
        var yScale = getAttributeScale(this.props, 'y');
        topPos = yScale(highlightY);
      }

      var plotWidth = marginLeft + marginRight + innerWidth;
      var plotHeight = marginTop + marginBottom + innerHeight;
      var touchWidth = highlightWidth || plotWidth;
      var touchHeight = highlightHeight || plotHeight;
      return /*#__PURE__*/React.createElement("g", {
        transform: "translate(".concat(leftPos, ", ").concat(topPos, ")"),
        className: getCombinedClassName(className, 'rv-highlight-container')
      }, /*#__PURE__*/React.createElement("rect", {
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
        } // preventDefault() so that mouse event emulation does not happen
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
      }), /*#__PURE__*/React.createElement("rect", {
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

  return Highlight;
}(AbstractSeries);

Highlight.displayName = 'HighlightOverlay';
Highlight.defaultProps = {
  color: 'rgb(77, 182, 172)',
  className: '',
  enableX: true,
  enableY: true,
  opacity: 0.3
};
Highlight.propTypes = _objectSpread(_objectSpread({}, AbstractSeries.propTypes), {}, {
  enableX: PropTypes.bool,
  enableY: PropTypes.bool,
  highlightHeight: PropTypes.number,
  highlightWidth: PropTypes.number,
  highlightX: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  highlightY: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onBrushStart: PropTypes.func,
  onDragStart: PropTypes.func,
  onBrush: PropTypes.func,
  onDrag: PropTypes.func,
  onBrushEnd: PropTypes.func,
  onDragEnd: PropTypes.func
});
export default Highlight;