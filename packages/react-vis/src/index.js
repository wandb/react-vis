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

export AbstractSeries from 'plot/series/abstract-series';
export ArcSeries from 'plot/series/arc-series';
export AreaSeries from 'plot/series/area-series';
export Borders from 'plot/borders';
export ChartLabel from 'plot/chart-label';
export CircularGridLines from 'plot/circular-grid-lines';
export ContourSeries from 'plot/series/contour-series';
export Crosshair from 'plot/crosshair';
export CustomSVGSeries from 'plot/series/custom-svg-series';
export DecorativeAxis from 'plot/axis/decorative-axis';
export GradientDefs from 'plot/gradient-defs';
export GridLines from 'plot/grid-lines';
export HeatmapSeries from 'plot/series/heatmap-series';
export HexbinSeries from 'plot/series/hexbin-series';
export Highlight from 'plot/highlight';
export Hint from 'plot/hint';
export HorizontalBarSeries from 'plot/series/horizontal-bar-series';
export HorizontalBarSeriesCanvas from 'plot/series/horizontal-bar-series-canvas';
export HorizontalGridLines from 'plot/horizontal-grid-lines';
export HorizontalRectSeries from 'plot/series/horizontal-rect-series';
export HorizontalRectSeriesCanvas from 'plot/series/horizontal-rect-series-canvas';
export LabelSeries from 'plot/series/label-series';
export LineMarkSeries from 'plot/series/line-mark-series';
export LineMarkSeriesCanvas from 'plot/series/line-mark-series-canvas';
export LineSeries from 'plot/series/line-series';
export LineSeriesCanvas from 'plot/series/line-series-canvas';
export MarkSeries from 'plot/series/mark-series';
export MarkSeriesCanvas from 'plot/series/mark-series-canvas';
export PolygonSeries from 'plot/series/polygon-series';
export VerticalBarSeries from 'plot/series/vertical-bar-series';
export VerticalBarSeriesCanvas from 'plot/series/vertical-bar-series-canvas';
export VerticalGridLines from 'plot/vertical-grid-lines';
export VerticalRectSeries from 'plot/series/vertical-rect-series';
export VerticalRectSeriesCanvas from 'plot/series/vertical-rect-series-canvas';
export Voronoi from 'plot/voronoi';
export RectSeries from 'plot/series/rect-series';
export RectSeriesCanvas from 'plot/series/rect-series-canvas';
export WhiskerSeries from 'plot/series/whisker-series';
export XYPlot from 'plot/xy-plot';
export XAxis from 'plot/axis/x-axis';
export YAxis from 'plot/axis/y-axis';

export ContinuousColorLegend from 'legends/continuous-color-legend';
export ContinuousSizeLegend from 'legends/continuous-size-legend';
export DiscreteColorLegend from 'legends/discrete-color-legend';
export SearchableDiscreteColorLegend from 'legends/searchable-discrete-color-legend';

export ParallelCoordinates from 'parallel-coordinates';
export RadarChart from 'radar-chart';
export RadialChart from 'radial-chart';
export Sankey from 'sankey';
export Sunburst from 'sunburst';
export Treemap from 'treemap';

export ContentClipPath from './plot/content-clip-path';

export {
  makeHeightFlexible,
  makeVisFlexible,
  makeWidthFlexible,
  FlexibleXYPlot,
  FlexibleWidthXYPlot,
  FlexibleHeightXYPlot
} from './make-vis-flexible';

export AxisUtils from 'utils/axis-utils';
export ScaleUtils from 'utils/scales-utils';
