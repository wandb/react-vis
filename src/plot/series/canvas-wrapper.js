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

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {interpolate} from 'd3-interpolate';
import {extractAnimatedPropValues} from 'animation';
import {ANIMATED_SERIES_PROPS} from 'utils/series-utils';

const MAX_DRAWS = 30;

/**
 * Draw loop draws each of the layers until it should draw more
 * @param {CanvasContext} ctx - the context where the drawing will take place
 * @param {Number} height - height of the canvas
 * @param {Number} width - width of the canvas
 * @param {Array} layers - the layer objects to render
 */
function engageDrawLoop(ctx, props, layers) {
  let drawIteration = 0;
  // using setInterval because request animation frame goes too fast
  const drawCycle = setInterval(() => {
    if (!ctx) {
      clearInterval(drawCycle);
      return;
    }
    drawLayers(ctx, props, layers, drawIteration);
    if (drawIteration > MAX_DRAWS) {
      clearInterval(drawCycle);
    }
    drawIteration += 1;
  }, 1);
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
  const {width, height, pixelRatio} = props;
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.clearRect(0, 0, width, height);
  layers.forEach(layer => {
    const {interpolator, newProps, animation} = layer;
    // return an empty object if dont need to be animating
    const interpolatedProps = animation
      ? interpolator
        ? interpolator(drawIteration / MAX_DRAWS)
        : interpolator
      : () => ({});
    layer.renderLayer(
      {
        ...newProps,
        ...interpolatedProps
      },
      ctx
    );
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
  return newChildren.map((child, index) => {
    const oldProps = oldChildren[index] ? oldChildren[index].props : {};
    const newProps = child.props;

    const oldAnimatedProps = extractAnimatedPropValues({
      ...oldProps,
      animatedProps: ANIMATED_SERIES_PROPS
    });
    const newAnimatedProps = newProps
      ? extractAnimatedPropValues({
          ...newProps,
          animatedProps: ANIMATED_SERIES_PROPS
        })
      : null;
    const interpolator = interpolate(oldAnimatedProps, newAnimatedProps);

    return {
      renderLayer: child.type.renderLayer,
      newProps: child.props,
      animation: child.props.animation,
      interpolator
    };
  });
}
class CanvasWrapper extends Component {
  static get defaultProps() {
    return {
      pixelRatio: (window && window.devicePixelRatio) || 1
    };
  }

  componentDidMount() {
    const ctx = this.canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    this.drawChildren(null, this.props, ctx);
  }

  componentDidUpdate(oldProps) {
    const ctx = this.canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    this.drawChildren(oldProps, this.props, this.canvas.getContext('2d'));
  }

  /**
   * Check that we can and should be animating, then kick off animations as apporpriate
   * @param {Object} newProps the new props to be interpolated to
   * @param {Object} oldProps the old props to be interpolated against
   * @param {DomRef} ctx the canvas context to be drawn on.
   * @returns {Array} Object for rendering
   */
  drawChildren(oldProps, newProps, ctx) {
    const {
      children,
      innerHeight,
      innerWidth,
      marginBottom,
      marginLeft,
      marginRight,
      marginTop
    } = newProps;
    if (!ctx) {
      return;
    }

    const childrenShouldAnimate = children.find(child => child.props.animation);

    const height = innerHeight + marginTop + marginBottom;
    const width = innerWidth + marginLeft + marginRight;

    const renderProps = {
      ...newProps,
      height,
      width
    };

    const layers = buildLayers(
      newProps.children,
      oldProps ? oldProps.children : []
    );
    // if we don't need to be animating, dont! cut short
    if (!childrenShouldAnimate) {
      drawLayers(ctx, renderProps, layers);
      return;
    }

    engageDrawLoop(ctx, renderProps, layers);
  }

  render() {
    const {
      innerHeight,
      innerWidth,
      marginBottom,
      marginLeft,
      marginRight,
      marginTop,
      pixelRatio
    } = this.props;

    const height = innerHeight + marginTop + marginBottom;
    const width = innerWidth + marginLeft + marginRight;

    return (
      <div style={{left: 0, top: 0}} className="rv-xy-canvas">
        <canvas
          className="rv-xy-canvas-element"
          height={height * pixelRatio}
          width={width * pixelRatio}
          style={{
            height: `${height}px`,
            width: `${width}px`
          }}
          ref={ref => (this.canvas = ref)}
        />
        {this.props.children}
      </div>
    );
  }
}

CanvasWrapper.displayName = 'CanvasWrapper';
CanvasWrapper.propTypes = {
  marginBottom: PropTypes.number.isRequired,
  marginLeft: PropTypes.number.isRequired,
  marginRight: PropTypes.number.isRequired,
  marginTop: PropTypes.number.isRequired,
  innerHeight: PropTypes.number.isRequired,
  innerWidth: PropTypes.number.isRequired,
  pixelRatio: PropTypes.number.isRequired
};

export default CanvasWrapper;
