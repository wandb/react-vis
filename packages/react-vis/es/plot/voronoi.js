function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import { voronoi } from 'd3-voronoi';
import { getAttributeFunctor } from "../utils/scales-utils";
import { getCombinedClassName } from "../utils/styling-utils";

var NOOP = function NOOP(f) {
  return f;
}; // Find the index of the node at coordinates of a touch point


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
  var className = props.className,
      extent = props.extent,
      nodes = props.nodes,
      onBlur = props.onBlur,
      _onClick = props.onClick,
      _onMouseUp = props.onMouseUp,
      _onMouseDown = props.onMouseDown,
      onHover = props.onHover,
      polygonStyle = props.polygonStyle,
      style = props.style,
      x = props.x,
      y = props.y; // Create a voronoi with each node center points

  var voronoiInstance = voronoi().x(x || getAttributeFunctor(props, 'x')).y(y || getAttributeFunctor(props, 'y')).extent(extent || getExtent(props)); // Create an array of polygons corresponding to the cells in voronoi

  var polygons = voronoiInstance.polygons(nodes); // Create helper function to handle special logic for touch events

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

  return /*#__PURE__*/React.createElement("g", {
    className: getCombinedClassName(className, 'rv-voronoi'),
    style: style // Because of the nature of how touch events, and more specifically touchmove
    // and how it differs from mouseover, we must manage touch events on the parent
    ,
    onTouchEnd: handleTouchEvent(_onMouseUp),
    onTouchStart: handleTouchEvent(_onMouseDown),
    onTouchMove: handleTouchEvent(onHover),
    onTouchCancel: handleTouchEvent(onBlur)
  }, polygons.map(function (d, i) {
    return /*#__PURE__*/React.createElement("path", {
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
Voronoi.defaultProps = {
  className: '',
  onBlur: NOOP,
  onClick: NOOP,
  onHover: NOOP,
  onMouseDown: NOOP,
  onMouseUp: NOOP
};
Voronoi.propTypes = {
  className: PropTypes.string,
  extent: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onHover: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  x: PropTypes.func,
  y: PropTypes.func
};
export default Voronoi;