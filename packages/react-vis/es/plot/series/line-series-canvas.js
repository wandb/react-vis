function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

// Copyright (c) 2017 Uber Technologies, Inc.
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
import PropTypes from 'prop-types';
import { rgb } from 'd3-color';
import * as d3Shape from 'd3-shape';
import React from 'react';
import { DEFAULT_OPACITY } from "../../theme";
import { getAttributeFunctor, getAttributeValue } from "../../utils/scales-utils";
import AbstractSeries from "./abstract-series";

var LineSeriesCanvas = /*#__PURE__*/function (_AbstractSeries) {
  _inherits(LineSeriesCanvas, _AbstractSeries);

  var _super = _createSuper(LineSeriesCanvas);

  function LineSeriesCanvas() {
    _classCallCheck(this, LineSeriesCanvas);

    return _super.apply(this, arguments);
  }

  _createClass(LineSeriesCanvas, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null);
    }
  }], [{
    key: "renderLayer",
    value: function renderLayer(props, ctx) {
      var curve = props.curve,
          data = props.data,
          innerWidth = props.innerWidth,
          innerHeight = props.innerHeight,
          marginLeft = props.marginLeft,
          marginTop = props.marginTop,
          marginBottom = props.marginBottom,
          marginRight = props.marginRight,
          strokeWidth = props.strokeWidth,
          strokeDasharray = props.strokeDasharray;

      if (!data || data.length === 0) {
        return;
      }

      var height = innerHeight + marginTop + marginBottom;
      var width = innerWidth + marginLeft + marginRight;
      var x = getAttributeFunctor(props, 'x');
      var y = getAttributeFunctor(props, 'y');
      var stroke = getAttributeValue(props, 'stroke') || getAttributeValue(props, 'color');
      var strokeColor = rgb(stroke);
      var newOpacity = getAttributeValue(props, 'opacity');
      var opacity = Number.isFinite(newOpacity) ? newOpacity : DEFAULT_OPACITY;
      var line = d3Shape.line().x(function (row) {
        return x(row) + marginLeft;
      }).y(function (row) {
        return y(row) + marginTop;
      });

      if (typeof curve === 'string' && d3Shape[curve]) {
        line = line.curve(d3Shape[curve]);
      } else if (typeof curve === 'function') {
        line = line.curve(curve);
      }

      var preAlpha = ctx.globalAlpha;
      ctx.globalAlpha = opacity;
      ctx.globalAlpha = preAlpha;
      ctx.beginPath();
      ctx.strokeStyle = "rgba(".concat(strokeColor.r, ", ").concat(strokeColor.g, ", ").concat(strokeColor.b, ", ").concat(opacity, ")");
      ctx.lineWidth = strokeWidth;

      if (strokeDasharray) {
        ctx.setLineDash(strokeDasharray);
      }

      line.context(ctx)(data);
      ctx.stroke();
      ctx.closePath(); // set back to default

      ctx.lineWidth = 1;
      ctx.setLineDash([]); // NOTE: We have to perform clipping gradients/borders
      // In the canvas renderer because the canvas layer is always on top of the svg.
      // In the future the renderer could be change to allow mixed layering between svg
      // and canvas
      //
      // Add a border fade that is cached(drawing gradients every frame
      // is too expensive)
      // const ctx = borderCanvas.getContext('2d');
      // left
      // borderCtx.fillStyle = 'rgba(0,0,0,0)';

      ctx.clearRect(0, 0, marginLeft, height); // right

      ctx.clearRect(width, 0, -marginRight, height); // top

      ctx.clearRect(0, 0, width, marginTop); // bottom

      ctx.clearRect(0, height, width, -marginBottom);
    }
  }, {
    key: "requiresSVG",
    get: function get() {
      return false;
    }
  }, {
    key: "isCanvas",
    get: function get() {
      return true;
    }
  }]);

  return LineSeriesCanvas;
}(AbstractSeries);

LineSeriesCanvas.displayName = 'LineSeriesCanvas';
LineSeriesCanvas.defaultProps = _objectSpread(_objectSpread({}, AbstractSeries.defaultProps), {}, {
  strokeWidth: 2
});
LineSeriesCanvas.propTypes = _objectSpread(_objectSpread({}, AbstractSeries.propTypes), {}, {
  strokeWidth: PropTypes.number
});
export default LineSeriesCanvas;