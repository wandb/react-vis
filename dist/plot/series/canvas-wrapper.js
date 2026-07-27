"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _d3Interpolate = require("d3-interpolate");
var _animation = require("../../animation");
var _seriesUtils = require("../../utils/series-utils");
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
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // Copyright (c) 2017 Uber Technologies, Inc.
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
var MAX_DRAWS = 30;

/**
 * Draw loop draws each of the layers until it should draw more
 * @param {CanvasContext} ctx - the context where the drawing will take place
 * @param {Number} height - height of the canvas
 * @param {Number} width - width of the canvas
 * @param {Array} layers - the layer objects to render
 * @returns {Number} the interval handle, so the loop can be cancelled
 */
function engageDrawLoop(ctx, props, layers) {
  var drawIteration = 0;
  // using setInterval because request animation frame goes too fast
  var drawCycle = setInterval(function () {
    // the canvas can be unmounted (or replaced) while the loop is running
    if (!ctx || ctx.canvas && ctx.canvas.isConnected === false) {
      clearInterval(drawCycle);
      return;
    }
    drawLayers(ctx, props, layers, drawIteration);
    if (drawIteration > MAX_DRAWS) {
      clearInterval(drawCycle);
    }
    drawIteration += 1;
  }, 1);
  return drawCycle;
}

/**
 * Loops across each of the layers to be drawn and draws them
 * @param {CanvasContext} ctx - the context where the drawing will take place
 * @param {Number} height - height of the canvas
 * @param {Number} width - width of the canvas
 * @param {Array} layers - the layer objects to render
 * @param {Number} drawIteration - width of the canvas
 */
function drawLayers(ctx, props, layers, drawIteration) {
  var width = props.width,
    height = props.height,
    pixelRatio = props.pixelRatio;
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.clearRect(0, 0, width, height);
  layers.forEach(function (layer) {
    var interpolator = layer.interpolator,
      newProps = layer.newProps,
      animation = layer.animation;
    // return an empty object if dont need to be animating
    var interpolatedProps = animation ? interpolator ? interpolator(drawIteration / MAX_DRAWS) : interpolator : function () {
      return {};
    };
    layer.renderLayer(_objectSpread(_objectSpread({}, newProps), interpolatedProps), ctx);
  });

  // NOTE: Re-enable or change layering in canvas/svg hybrids
  // We have to perform clipping gradients/borders
  // In the canvas renderer because the canvas layer is always on top of the svg.
  // In the future the renderer could be change to allow mixed layering between svg
  // and canvas
  //
  // Add a border fade that is cached(drawing gradients every frame
  // is too expensive)
  // if (this.cachedBorders) {
  //   console.log('cache/hit');
  //   const cache = this.cachedBorders;
  //   if (
  //     cache.height === height &&
  //     cache.marginTop === marginTop &&
  //     cache.marginBottom === marginBottom &&
  //     cache.marginLeft === marginLeft &&
  //     cache.marginRight === marginRight
  //   ) {
  //     ctx.drawImage(cache.canvas, 0, 0);
  //   }
  // } else {
  //   console.log('cache/miss');
  //   const borderCanvas = document.createElement('canvas');
  //   borderCanvas.width = width;
  //   borderCanvas.height = height;
  //   const borderCtx = borderCanvas.getContext('2d');

  //   // left
  //   // borderCtx.fillStyle = 'rgba(0,0,0,0)';
  //   borderCtx.fillRect(0, 0, marginLeft, height);

  //   // right
  //   borderCtx.fillRect(width, 0, -marginRight, height);

  //   // top
  //   borderCtx.fillRect(0, 0, width, marginTop);

  //   // bottom
  //   borderCtx.fillRect(0, height, width, -marginBottom);

  //   NOTE: Gradient code for later
  //   const grad = ctx.createLinearGradient(
  //     0,
  //     height,
  //     0,
  //     height - marginBottom
  //   );
  //   grad.addColorStop(1, 'rgba(255,255,255,0.8)');
  //   grad.addColorStop(0.75, 'rgba(255,255,255,0.8)');
  //   grad.addColorStop(0, 'rgba(255,255,255,1)');
  //   borderCtx.fillStyle = grad;
  //   borderCtx.fillRect(0, height, width, -marginBottom);
  //   ctx.globalCompositeOperation = 'source-atop';
  //   ctx.drawImage(borderCanvas, 0, 0);
  //   ctx.globalCompositeOperation = 'source-over';
  //   ctx.drawImage(borderCanvas, 0, 0);
  //   this.cachedBorders = {
  //     height,
  //     marginTop,
  //     marginBottom,
  //     marginLeft,
  //     marginRight,
  //     canvas: borderCanvas
  //   };
  // }
}

/**
 * Build an array of layer of objects the contain the method for drawing each series
 * as well as an interpolar (specifically a d3-interpolate interpolator)
 * @param {Object} newChildren the new children to be rendered.
 * @param {Object} oldChildren the old children to be rendered.
 * @returns {Array} Object for rendering
 */
function buildLayers(newChildren, oldChildren) {
  return newChildren.map(function (child, index) {
    var oldProps = oldChildren[index] ? oldChildren[index].props : {};
    var newProps = child.props;
    var oldAnimatedProps = (0, _animation.extractAnimatedPropValues)(_objectSpread(_objectSpread({}, oldProps), {}, {
      animatedProps: _seriesUtils.ANIMATED_SERIES_PROPS
    }));
    var newAnimatedProps = newProps ? (0, _animation.extractAnimatedPropValues)(_objectSpread(_objectSpread({}, newProps), {}, {
      animatedProps: _seriesUtils.ANIMATED_SERIES_PROPS
    })) : null;
    var interpolator = (0, _d3Interpolate.interpolate)(oldAnimatedProps, newAnimatedProps);
    return {
      renderLayer: child.type.renderLayer,
      newProps: child.props,
      animation: child.props.animation,
      interpolator: interpolator
    };
  });
}
var CanvasWrapper = /*#__PURE__*/function (_Component) {
  function CanvasWrapper() {
    _classCallCheck(this, CanvasWrapper);
    return _callSuper(this, CanvasWrapper, arguments);
  }
  _inherits(CanvasWrapper, _Component);
  return _createClass(CanvasWrapper, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var ctx = this.canvas.getContext('2d');
      if (!ctx) {
        return;
      }
      this.drawChildren(null, this.props, ctx);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(oldProps) {
      var ctx = this.canvas.getContext('2d');
      if (!ctx) {
        return;
      }
      this.drawChildren(oldProps, this.props, ctx);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._cancelDrawLoop();
    }
  }, {
    key: "_cancelDrawLoop",
    value: function _cancelDrawLoop() {
      if (this.drawCycle !== undefined) {
        clearInterval(this.drawCycle);
        this.drawCycle = undefined;
      }
    }

    /**
     * Check that we can and should be animating, then kick off animations as apporpriate
     * @param {Object} newProps the new props to be interpolated to
     * @param {Object} oldProps the old props to be interpolated against
     * @param {DomRef} ctx the canvas context to be drawn on.
     * @returns {Array} Object for rendering
     */
  }, {
    key: "drawChildren",
    value: function drawChildren(oldProps, newProps, ctx) {
      var children = newProps.children,
        innerHeight = newProps.innerHeight,
        innerWidth = newProps.innerWidth,
        marginBottom = newProps.marginBottom,
        marginLeft = newProps.marginLeft,
        marginRight = newProps.marginRight,
        marginTop = newProps.marginTop;
      if (!ctx) {
        return;
      }
      var childrenShouldAnimate = children.find(function (child) {
        return child.props.animation;
      });
      var height = innerHeight + marginTop + marginBottom;
      var width = innerWidth + marginLeft + marginRight;
      var renderProps = _objectSpread(_objectSpread({}, newProps), {}, {
        height: height,
        width: width
      });
      var layers = buildLayers(newProps.children, oldProps ? oldProps.children : []);
      // a draw loop from a previous update must not keep painting stale layers
      this._cancelDrawLoop();
      // if we don't need to be animating, dont! cut short
      if (!childrenShouldAnimate) {
        drawLayers(ctx, renderProps, layers);
        return;
      }
      this.drawCycle = engageDrawLoop(ctx, renderProps, layers);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;
      var _this$props = this.props,
        innerHeight = _this$props.innerHeight,
        innerWidth = _this$props.innerWidth,
        marginBottom = _this$props.marginBottom,
        marginLeft = _this$props.marginLeft,
        marginRight = _this$props.marginRight,
        marginTop = _this$props.marginTop,
        pixelRatio = _this$props.pixelRatio;
      var height = innerHeight + marginTop + marginBottom;
      var width = innerWidth + marginLeft + marginRight;
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          left: 0,
          top: 0
        },
        className: "rv-xy-canvas"
      }, /*#__PURE__*/_react["default"].createElement("canvas", {
        className: "rv-xy-canvas-element",
        height: height * pixelRatio,
        width: width * pixelRatio,
        style: {
          height: "".concat(height, "px"),
          width: "".concat(width, "px")
        },
        ref: function ref(_ref) {
          return _this.canvas = _ref;
        }
      }), this.props.children);
    }
  }], [{
    key: "defaultProps",
    get: function get() {
      return {
        pixelRatio: window && window.devicePixelRatio || 1
      };
    }
  }]);
}(_react.Component);
CanvasWrapper.displayName = 'CanvasWrapper';
CanvasWrapper.propTypes = {
  marginBottom: _propTypes["default"].number.isRequired,
  marginLeft: _propTypes["default"].number.isRequired,
  marginRight: _propTypes["default"].number.isRequired,
  marginTop: _propTypes["default"].number.isRequired,
  innerHeight: _propTypes["default"].number.isRequired,
  innerWidth: _propTypes["default"].number.isRequired,
  pixelRatio: _propTypes["default"].number.isRequired
};
var _default = exports["default"] = CanvasWrapper;