// Temporary smoke test for the React 19 upgrade experiment.
// Renders representative charts without enzyme to check whether the library
// itself is compatible with React 19 (server render + client createRoot).
import 'regenerator-runtime/runtime';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';

import XYPlot from 'plot/xy-plot';
import XAxis from 'plot/axis/x-axis';
import YAxis from 'plot/axis/y-axis';
import HorizontalGridLines from 'plot/horizontal-grid-lines';
import VerticalGridLines from 'plot/vertical-grid-lines';
import LineSeries from 'plot/series/line-series';
import MarkSeries from 'plot/series/mark-series';
import VerticalBarSeries from 'plot/series/vertical-bar-series';
import AreaSeries from 'plot/series/area-series';
import LabelSeries from 'plot/series/label-series';
import Crosshair from 'plot/crosshair';
import DiscreteColorLegend from 'legends/discrete-color-legend';
import ContinuousColorLegend from 'legends/continuous-color-legend';
import RadialChart from 'radial-chart';
import RadarChart from 'radar-chart';
import Sunburst from 'sunburst';
import Treemap from 'treemap';
import Sankey from 'sankey';

const DATA = [{x: 1, y: 3}, {x: 2, y: 5}, {x: 3, y: 15}, {x: 4, y: 12}];

describe('React 19 smoke tests (server render)', () => {
  test('React version under test is 19', () => {
    expect(React.version).toMatch(/^19\./);
  });

  test('XYPlot with axes, grid lines and series', () => {
    const html = renderToStaticMarkup(
      <XYPlot width={300} height={300}>
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis title="X" />
        <YAxis title="Y" />
        <LineSeries data={DATA} />
        <MarkSeries data={DATA} />
        <AreaSeries data={DATA} />
        <VerticalBarSeries data={DATA} />
        <LabelSeries data={DATA.map(d => ({...d, label: String(d.y)}))} />
        <Crosshair values={[DATA[1]]} />
      </XYPlot>
    );
    expect(html).toContain('rv-xy-plot');
    expect(html).toContain('rv-xy-plot__axis');
    expect(html).toContain('rv-xy-plot__grid-lines');
    expect(html).toContain('rv-xy-plot__series--line');
  });

  test('legends', () => {
    const legend = renderToStaticMarkup(
      <DiscreteColorLegend items={['a', 'b', 'c']} />
    );
    expect(legend).toContain('rv-discrete-color-legend-item');
    const continuous = renderToStaticMarkup(
      <ContinuousColorLegend startTitle={0} endTitle={100} />
    );
    expect(continuous).toContain('rv-gradient');
  });

  test('radial and radar charts', () => {
    const radial = renderToStaticMarkup(
      <RadialChart
        width={300}
        height={300}
        data={[{angle: 1}, {angle: 2}, {angle: 5}]}
      />
    );
    expect(radial).toContain('rv-radial-chart');
    const radar = renderToStaticMarkup(
      <RadarChart
        width={300}
        height={300}
        data={[{a: 1, b: 2, c: 3}]}
        domains={[
          {name: 'a', domain: [0, 4]},
          {name: 'b', domain: [0, 4]},
          {name: 'c', domain: [0, 4]}
        ]}
      />
    );
    expect(radar).toContain('rv-radar-chart');
  });

  test('sunburst, treemap and sankey', () => {
    const sunburst = renderToStaticMarkup(
      <Sunburst
        width={300}
        height={300}
        data={{title: 'root', children: [{title: 'a', size: 1}]}}
      />
    );
    expect(sunburst).toContain('rv-sunburst');
    const treemap = renderToStaticMarkup(
      <Treemap
        width={300}
        height={300}
        data={{title: 'root', children: [{title: 'a', size: 10}]}}
      />
    );
    expect(treemap).toContain('rv-treemap');
    const sankey = renderToStaticMarkup(
      <Sankey
        width={300}
        height={300}
        nodes={[{name: 'a'}, {name: 'b'}]}
        links={[{source: 0, target: 1, value: 10}]}
      />
    );
    expect(sankey).toContain('rv-sankey');
  });
});

describe('React 19 smoke tests (client render)', () => {
  test('createRoot mounts and updates an XYPlot', async () => {
    const {createRoot} = require('react-dom/client');
    global.IS_REACT_ACT_ENVIRONMENT = true;
    const {act} = React;
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <XYPlot width={300} height={300}>
          <XAxis />
          <YAxis />
          <LineSeries data={DATA} />
        </XYPlot>
      );
    });
    expect(container.innerHTML).toContain('rv-xy-plot');
    await act(async () => {
      root.render(
        <XYPlot width={300} height={300}>
          <XAxis />
          <YAxis />
          <LineSeries data={DATA.map(d => ({...d, y: d.y * 2}))} />
        </XYPlot>
      );
    });
    expect(container.innerHTML).toContain('rv-xy-plot__series--line');
    await act(async () => {
      root.unmount();
    });
  });

  test('animated series (react-motion) mounts and updates', async () => {
    const {createRoot} = require('react-dom/client');
    global.IS_REACT_ACT_ENVIRONMENT = true;
    const {act} = React;
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <XYPlot width={300} height={300}>
          <LineSeries animation data={DATA} />
        </XYPlot>
      );
    });
    expect(container.innerHTML).toContain('rv-xy-plot__series--line');
    await act(async () => {
      root.render(
        <XYPlot width={300} height={300}>
          <LineSeries
            animation
            data={DATA.map(d => ({...d, y: d.y + 1}))}
          />
        </XYPlot>
      );
    });
    expect(container.innerHTML).toContain('rv-xy-plot__series--line');
    await act(async () => {
      root.unmount();
    });
  });

  test('StrictMode mount with animation and data update', async () => {
    const {createRoot} = require('react-dom/client');
    global.IS_REACT_ACT_ENVIRONMENT = true;
    const {act, StrictMode} = React;
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <StrictMode>
          <XYPlot width={300} height={300}>
            <XAxis />
            <LineSeries animation data={DATA} />
          </XYPlot>
        </StrictMode>
      );
    });
    expect(container.innerHTML).toContain('rv-xy-plot__series--line');
    await act(async () => {
      root.render(
        <StrictMode>
          <XYPlot width={300} height={300}>
            <XAxis />
            <LineSeries
              animation
              data={DATA.map(d => ({...d, y: d.y * 3}))}
            />
          </XYPlot>
        </StrictMode>
      );
    });
    expect(container.innerHTML).toContain('rv-xy-plot__series--line');
    await act(async () => {
      root.unmount();
    });
  });
});
