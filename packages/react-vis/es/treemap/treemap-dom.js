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
import TreemapLeaf from "./treemap-leaf";
import { getCombinedClassName } from "../utils/styling-utils";

function TreemapDOM(props) {
  var animation = props.animation,
      className = props.className,
      height = props.height,
      hideRootNode = props.hideRootNode,
      getLabel = props.getLabel,
      mode = props.mode,
      nodes = props.nodes,
      width = props.width,
      scales = props.scales,
      style = props.style;
  var useCirclePacking = mode === 'circlePack';
  return /*#__PURE__*/React.createElement("div", {
    className: getCombinedClassName('rv-treemap', useCirclePacking && 'rv-treemap-circle-paked', className),
    style: {
      height: height,
      width: width
    }
  }, nodes.map(function (node, index) {
    // throw out the rootest node
    if (hideRootNode && !index) {
      return null;
    }

    var nodeProps = _objectSpread(_objectSpread({
      animation: animation,
      node: node,
      getLabel: getLabel
    }, props), {}, {
      x0: useCirclePacking ? node.x : node.x0,
      x1: useCirclePacking ? node.x : node.x1,
      y0: useCirclePacking ? node.y : node.y0,
      y1: useCirclePacking ? node.y : node.y1,
      r: useCirclePacking ? node.r : 1,
      scales: scales,
      style: style
    });

    return /*#__PURE__*/React.createElement(TreemapLeaf, _extends({}, nodeProps, {
      key: "leaf-".concat(index)
    }));
  }));
}

TreemapDOM.displayName = 'TreemapDOM';
export default TreemapDOM;