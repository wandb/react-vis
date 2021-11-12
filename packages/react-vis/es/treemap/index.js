function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
import React from 'react';
import PropTypes from 'prop-types';
import { hierarchy, pack, partition, treemapSquarify, treemapResquarify, treemapSlice, treemapDice, treemapSliceDice, treemapBinary, treemap } from 'd3-hierarchy';
import { CONTINUOUS_COLOR_RANGE, DEFAULT_COLOR, DEFAULT_OPACITY, OPACITY_TYPE } from "../theme";
import { AnimationPropType } from "../animation";
import { getAttributeFunctor, getMissingScaleProps } from "../utils/scales-utils";
import { MarginPropType, getInnerDimensions } from "../utils/chart-utils";
import TreemapDOM from "./treemap-dom";
import TreemapSVG from "./treemap-svg";
var TREEMAP_TILE_MODES = {
  squarify: treemapSquarify,
  resquarify: treemapResquarify,
  slice: treemapSlice,
  dice: treemapDice,
  slicedice: treemapSliceDice,
  binary: treemapBinary
};
var TREEMAP_LAYOUT_MODES = ['circlePack', 'partition', 'partition-pivot'];

var NOOP = function NOOP(d) {
  return d;
};

var ATTRIBUTES = ['opacity', 'color'];
var DEFAULT_MARGINS = {
  left: 40,
  right: 10,
  top: 10,
  bottom: 40
};
/**
 * Get the map of scale functions from the given props.
 * @param {Object} props Props for the component.
 * @returns {Object} Map of scale functions.
 * @private
 */

function _getScaleFns(props) {
  var data = props.data;
  var allData = data.children || []; // Adding _allData property to the object to reuse the existing
  // getAttributeFunctor function.

  var compatibleProps = _objectSpread(_objectSpread(_objectSpread({}, props), getMissingScaleProps(props, allData, ATTRIBUTES)), {}, {
    _allData: allData
  });

  return {
    opacity: getAttributeFunctor(compatibleProps, 'opacity'),
    color: getAttributeFunctor(compatibleProps, 'color')
  };
}

function Treemap(props) {
  var scales = _getScaleFns(props);

  var innerDimensions = getInnerDimensions(props, props.margin);
  /**
   * Create the list of nodes to render.
   * @returns {Array} Array of nodes.
   * @private
   */

  function _getNodesToRender() {
    var innerWidth = innerDimensions.innerWidth,
        innerHeight = innerDimensions.innerHeight;
    var data = props.data,
        mode = props.mode,
        padding = props.padding,
        sortFunction = props.sortFunction,
        getSize = props.getSize;

    if (!data) {
      return [];
    }

    if (mode === 'partition' || mode === 'partition-pivot') {
      var partitionFunction = partition().size(mode === 'partition-pivot' ? [innerHeight, innerWidth] : [innerWidth, innerHeight]).padding(padding);

      var _structuredInput = hierarchy(data).sum(getSize).sort(function (a, b) {
        return sortFunction(a, b, getSize);
      });

      var mappedNodes = partitionFunction(_structuredInput).descendants();

      if (mode === 'partition-pivot') {
        return mappedNodes.map(function (node) {
          return _objectSpread(_objectSpread({}, node), {}, {
            x0: node.y0,
            x1: node.y1,
            y0: node.x0,
            y1: node.x1
          });
        });
      }

      return mappedNodes;
    }

    if (mode === 'circlePack') {
      var packingFunction = pack().size([innerWidth, innerHeight]).padding(padding);

      var _structuredInput2 = hierarchy(data).sum(getSize).sort(function (a, b) {
        return sortFunction(a, b, getSize);
      });

      return packingFunction(_structuredInput2).descendants();
    }

    var tileFn = TREEMAP_TILE_MODES[mode];
    var treemapingFunction = treemap(tileFn).tile(tileFn).size([innerWidth, innerHeight]).padding(padding);
    var structuredInput = hierarchy(data).sum(getSize).sort(function (a, b) {
      return sortFunction(a, b, getSize);
    });
    return treemapingFunction(structuredInput).descendants();
  }

  var renderMode = props.renderMode;

  var nodes = _getNodesToRender();

  var TreemapElement = renderMode === 'SVG' ? TreemapSVG : TreemapDOM;
  return /*#__PURE__*/React.createElement(TreemapElement, _extends({}, props, {
    nodes: nodes,
    scales: scales
  }));
}

Treemap.displayName = 'Treemap';
Treemap.propTypes = {
  animation: AnimationPropType,
  className: PropTypes.string,
  data: PropTypes.object.isRequired,
  height: PropTypes.number.isRequired,
  hideRootNode: PropTypes.bool,
  margin: MarginPropType,
  mode: PropTypes.oneOf(Object.keys(TREEMAP_TILE_MODES).concat(TREEMAP_LAYOUT_MODES)),
  onLeafClick: PropTypes.func,
  onLeafMouseOver: PropTypes.func,
  onLeafMouseOut: PropTypes.func,
  useCirclePacking: PropTypes.bool,
  padding: PropTypes.number.isRequired,
  sortFunction: PropTypes.func,
  width: PropTypes.number.isRequired,
  getSize: PropTypes.func,
  getColor: PropTypes.func
};
Treemap.defaultProps = {
  className: '',
  colorRange: CONTINUOUS_COLOR_RANGE,
  _colorValue: DEFAULT_COLOR,
  data: {
    children: []
  },
  hideRootNode: false,
  margin: DEFAULT_MARGINS,
  mode: 'squarify',
  onLeafClick: NOOP,
  onLeafMouseOver: NOOP,
  onLeafMouseOut: NOOP,
  opacityType: OPACITY_TYPE,
  _opacityValue: DEFAULT_OPACITY,
  padding: 1,
  sortFunction: function sortFunction(a, b, accessor) {
    if (!accessor) {
      return 0;
    }

    return accessor(a) - accessor(b);
  },
  getSize: function getSize(d) {
    return d.size;
  },
  getColor: function getColor(d) {
    return d.color;
  },
  getLabel: function getLabel(d) {
    return d.title;
  }
};
export default Treemap;