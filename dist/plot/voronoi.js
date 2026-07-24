"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _d3Voronoi = require("d3-voronoi");
var _scalesUtils = require("../utils/scales-utils");
var _stylingUtils = require("../utils/styling-utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var NOOP = function NOOP(f) {
  return f;
};

// Find the index of the node at coordinates of a touch point
function getNodeIndex(evt) {
  var _evt$nativeEvent = evt.nativeEvent,
    pageX = _evt$nativeEvent.pageX,
    pageY = _evt$nativeEvent.pageY;
  var target = document.elementFromPoint(pageX, pageY);
  if (!target) {
    return -1;
  }
  var parentNode = target.parentNode;
  return Array.prototype.indexOf.call(parentNode.childNodes, target);
}
function getExtent(_ref) {
  var innerWidth = _ref.innerWidth,
    innerHeight = _ref.innerHeight,
    marginLeft = _ref.marginLeft,
    marginTop = _ref.marginTop;
  return [[marginLeft, marginTop], [innerWidth + marginLeft, innerHeight + marginTop]];
}
function Voronoi(props) {
  var _props$className = props.className,
    className = _props$className === void 0 ? '' : _props$className,
    extent = props.extent,
    nodes = props.nodes,
    _props$onBlur = props.onBlur,
    onBlur = _props$onBlur === void 0 ? NOOP : _props$onBlur,
    _props$onClick = props.onClick,
    _onClick = _props$onClick === void 0 ? NOOP : _props$onClick,
    _props$onMouseUp = props.onMouseUp,
    _onMouseUp = _props$onMouseUp === void 0 ? NOOP : _props$onMouseUp,
    _props$onMouseDown = props.onMouseDown,
    _onMouseDown = _props$onMouseDown === void 0 ? NOOP : _props$onMouseDown,
    _props$onHover = props.onHover,
    onHover = _props$onHover === void 0 ? NOOP : _props$onHover,
    polygonStyle = props.polygonStyle,
    style = props.style,
    x = props.x,
    y = props.y;
  // Create a voronoi with each node center points
  var voronoiInstance = (0, _d3Voronoi.voronoi)().x(x || (0, _scalesUtils.getAttributeFunctor)(props, 'x')).y(y || (0, _scalesUtils.getAttributeFunctor)(props, 'y')).extent(extent || getExtent(props));

  // Create an array of polygons corresponding to the cells in voronoi
  var polygons = voronoiInstance.polygons(nodes);

  // Create helper function to handle special logic for touch events
  var handleTouchEvent = function handleTouchEvent(handler) {
    return function (evt) {
      evt.preventDefault();
      var index = getNodeIndex(evt);
      if (index > -1 && index < polygons.length) {
        var d = polygons[index];
        handler(d.data);
      }
    };
  };
  return /*#__PURE__*/_react["default"].createElement("g", {
    className: (0, _stylingUtils.getCombinedClassName)(className, 'rv-voronoi'),
    style: style
    // Because of the nature of how touch events, and more specifically touchmove
    // and how it differs from mouseover, we must manage touch events on the parent
    ,
    onTouchEnd: handleTouchEvent(_onMouseUp),
    onTouchStart: handleTouchEvent(_onMouseDown),
    onTouchMove: handleTouchEvent(onHover),
    onTouchCancel: handleTouchEvent(onBlur)
  }, polygons.map(function (d, i) {
    return /*#__PURE__*/_react["default"].createElement("path", {
      className: "rv-voronoi__cell ".concat(d.data && d.data.className || ''),
      d: "M".concat(d.join('L'), "Z"),
      onClick: function onClick() {
        return _onClick(d.data);
      },
      onMouseUp: function onMouseUp() {
        return _onMouseUp(d.data);
      },
      onMouseDown: function onMouseDown() {
        return _onMouseDown(d.data);
      },
      onMouseOver: function onMouseOver() {
        return onHover(d.data);
      },
      onMouseOut: function onMouseOut() {
        return onBlur(d.data);
      },
      fill: "none",
      style: _objectSpread(_objectSpread({
        pointerEvents: 'all'
      }, polygonStyle), d.data && d.data.style),
      key: i
    });
  }));
}
Voronoi.requiresSVG = true;
Voronoi.displayName = 'Voronoi';
Voronoi.propTypes = {
  className: _propTypes["default"].string,
  extent: _propTypes["default"].arrayOf(_propTypes["default"].arrayOf(_propTypes["default"].number)),
  nodes: _propTypes["default"].arrayOf(_propTypes["default"].object).isRequired,
  onBlur: _propTypes["default"].func,
  onClick: _propTypes["default"].func,
  onHover: _propTypes["default"].func,
  onMouseDown: _propTypes["default"].func,
  onMouseUp: _propTypes["default"].func,
  x: _propTypes["default"].func,
  y: _propTypes["default"].func
};
var _default = exports["default"] = Voronoi;