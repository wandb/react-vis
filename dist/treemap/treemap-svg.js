"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _xyPlot = _interopRequireDefault(require("../plot/xy-plot"));
var _polygonSeries = _interopRequireDefault(require("../plot/series/polygon-series"));
var _markSeries = _interopRequireDefault(require("../plot/series/mark-series"));
var _labelSeries = _interopRequireDefault(require("../plot/series/label-series"));
var _stylingUtils = require("../utils/styling-utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); } // Copyright (c) 2016 - 2017 Uber Technologies, Inc.
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
var MARGIN_ADJUST = 1.2;
var TreemapSVG = /*#__PURE__*/function (_React$Component) {
  function TreemapSVG() {
    _classCallCheck(this, TreemapSVG);
    return _callSuper(this, TreemapSVG, arguments);
  }
  _inherits(TreemapSVG, _React$Component);
  return _createClass(TreemapSVG, [{
    key: "getCircularNodes",
    value: function getCircularNodes() {
      var _this$props = this.props,
        animation = _this$props.animation,
        hideRootNode = _this$props.hideRootNode,
        nodes = _this$props.nodes,
        onLeafMouseOver = _this$props.onLeafMouseOver,
        onLeafMouseOut = _this$props.onLeafMouseOut,
        onLeafClick = _this$props.onLeafClick,
        scales = _this$props.scales,
        style = _this$props.style;
      var _nodes$reduce = nodes.reduce(function (acc, node, index) {
          if (!index && hideRootNode) {
            return acc;
          }
          var x = node.x,
            y = node.y,
            r = node.r;
          return {
            maxY: Math.max(y + r, acc.maxY),
            minY: Math.min(y - r, acc.minY),
            maxX: Math.max(x + MARGIN_ADJUST * r, acc.maxX),
            minX: Math.min(x - MARGIN_ADJUST * r, acc.minX),
            rows: acc.rows.concat([{
              x: x,
              y: y,
              size: r,
              color: scales.color(node)
            }])
          };
        }, {
          rows: [],
          maxY: -Infinity,
          minY: Infinity,
          maxX: -Infinity,
          minX: Infinity
        }),
        rows = _nodes$reduce.rows,
        minY = _nodes$reduce.minY,
        maxY = _nodes$reduce.maxY,
        minX = _nodes$reduce.minX,
        maxX = _nodes$reduce.maxX;
      return {
        updatedNodes: /*#__PURE__*/_react["default"].createElement(_markSeries["default"], {
          animation: animation,
          className: "rv-treemap__leaf rv-treemap__leaf--circle",
          onSeriesMouseEnter: onLeafMouseOver,
          onSeriesMouseLeave: onLeafMouseOut,
          onSeriesClick: onLeafClick,
          data: rows,
          colorType: "literal",
          getColor: function getColor(d) {
            return d.color;
          },
          sizeType: "literal",
          getSize: function getSize(d) {
            return d.size;
          },
          style: style
        }),
        minY: minY,
        maxY: maxY,
        minX: minX,
        maxX: maxX
      };
    }
  }, {
    key: "getNonCircularNodes",
    value: function getNonCircularNodes() {
      var _this$props2 = this.props,
        animation = _this$props2.animation,
        hideRootNode = _this$props2.hideRootNode,
        nodes = _this$props2.nodes,
        onLeafMouseOver = _this$props2.onLeafMouseOver,
        onLeafMouseOut = _this$props2.onLeafMouseOut,
        onLeafClick = _this$props2.onLeafClick,
        scales = _this$props2.scales,
        style = _this$props2.style;
      var color = scales.color;
      return nodes.reduce(function (acc, node, index) {
        if (!index && hideRootNode) {
          return acc;
        }
        var x0 = node.x0,
          x1 = node.x1,
          y1 = node.y1,
          y0 = node.y0;
        var x = x0;
        var y = y0;
        var nodeHeight = y1 - y0;
        var nodeWidth = x1 - x0;
        acc.maxY = Math.max(y + nodeHeight, acc.maxY);
        acc.minY = Math.min(y, acc.minY);
        acc.maxX = Math.max(x + nodeWidth, acc.maxX);
        acc.minX = Math.min(x, acc.minX);
        var data = [{
          x: x,
          y: y
        }, {
          x: x,
          y: y + nodeHeight
        }, {
          x: x + nodeWidth,
          y: y + nodeHeight
        }, {
          x: x + nodeWidth,
          y: y
        }];
        acc.updatedNodes = acc.updatedNodes.concat([/*#__PURE__*/_react["default"].createElement(_polygonSeries["default"], {
          animation: animation,
          className: "rv-treemap__leaf",
          key: index,
          color: color(node),
          type: "literal",
          onSeriesMouseEnter: onLeafMouseOver,
          onSeriesMouseLeave: onLeafMouseOut,
          onSeriesClick: onLeafClick,
          data: data,
          style: _objectSpread(_objectSpread({}, style), node.style)
        })]);
        return acc;
      }, {
        updatedNodes: [],
        maxY: -Infinity,
        minY: Infinity,
        maxX: -Infinity,
        minX: Infinity
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
        className = _this$props3.className,
        height = _this$props3.height,
        mode = _this$props3.mode,
        nodes = _this$props3.nodes,
        width = _this$props3.width;
      var useCirclePacking = mode === 'circlePack';
      var _ref = useCirclePacking ? this.getCircularNodes() : this.getNonCircularNodes(),
        minY = _ref.minY,
        maxY = _ref.maxY,
        minX = _ref.minX,
        maxX = _ref.maxX,
        updatedNodes = _ref.updatedNodes;
      var labels = nodes.reduce(function (acc, node) {
        if (!node.data.title) {
          return acc;
        }
        return acc.concat(_objectSpread(_objectSpread({}, node.data), {}, {
          x: node.x0 || node.x,
          y: node.y0 || node.y,
          label: "".concat(node.data.title)
        }));
      }, []);
      return /*#__PURE__*/_react["default"].createElement(_xyPlot["default"], _extends({
        className: (0, _stylingUtils.getCombinedClassName)('rv-treemap', useCirclePacking && 'rv-treemap-circle-paked', className),
        width: width,
        height: height,
        yDomain: [maxY, minY],
        xDomain: [minX, maxX],
        colorType: "literal",
        hasTreeStructure: true
      }, this.props), updatedNodes, /*#__PURE__*/_react["default"].createElement(_labelSeries["default"], {
        data: labels
      }));
    }
  }]);
}(_react["default"].Component);
TreemapSVG.displayName = 'TreemapSVG';
var _default = exports["default"] = TreemapSVG;