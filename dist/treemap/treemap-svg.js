"use strict";

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var MARGIN_ADJUST = 1.2;

var TreemapSVG = /*#__PURE__*/function (_React$Component) {
  _inherits(TreemapSVG, _React$Component);

  var _super = _createSuper(TreemapSVG);

  function TreemapSVG() {
    _classCallCheck(this, TreemapSVG);

    return _super.apply(this, arguments);
  }

  _createClass(TreemapSVG, [{
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

  return TreemapSVG;
}(_react["default"].Component);

TreemapSVG.displayName = 'TreemapSVG';
var _default = TreemapSVG;
exports["default"] = _default;