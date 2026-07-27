// Same repro as react19-canvas.test.js, but against the built dist output
// (what the wandb app actually consumes from the release branch).
import 'regenerator-runtime/runtime';
import React from 'react';
import {createRoot} from 'react-dom/client';

import XYPlot from '../dist/plot/xy-plot';
import LineSeriesCanvas from '../dist/plot/series/line-series-canvas';

const DATA = [{x: 1, y: 3}, {x: 2, y: 5}, {x: 3, y: 15}, {x: 4, y: 12}];
const DATA2 = DATA.map(d => ({...d, y: d.y * 0.5}));

function makeMockContext(canvas) {
  const target = {canvas, calls: []};
  return new Proxy(target, {
    get(t, prop) {
      if (prop in t) {
        return t[prop];
      }
      return (...args) => {
        t.calls.push([prop, ...args]);
      };
    },
    set(t, prop, value) {
      t[prop] = value;
      return true;
    }
  });
}

const origGetContext = HTMLCanvasElement.prototype.getContext;

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  HTMLCanvasElement.prototype.getContext = function getContext() {
    if (!this.__mockCtx) {
      this.__mockCtx = makeMockContext(this);
    }
    return this.__mockCtx;
  };
});

afterAll(() => {
  HTMLCanvasElement.prototype.getContext = origGetContext;
});

beforeEach(() => {
  jest.restoreAllMocks();
});

async function mount(node) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  await React.act(async () => {
    root.render(node);
  });
  return {
    container,
    root,
    render: node2 =>
      React.act(async () => {
        root.render(node2);
      }),
    unmount: () =>
      React.act(async () => {
        root.unmount();
      }).then(() => container.remove())
  };
}

function plot(children) {
  return (
    <XYPlot width={300} height={300}>
      {children}
    </XYPlot>
  );
}

describe('React 19 canvas repaint (dist build)', () => {
  test('data update repaints with new data on the connected canvas', async () => {
    const spy = jest.spyOn(LineSeriesCanvas, 'renderLayer');
    const rig = await mount(plot(<LineSeriesCanvas data={DATA} />));
    spy.mockClear();

    await rig.render(plot(<LineSeriesCanvas data={DATA2} />));

    expect(spy).toHaveBeenCalled();
    const [props, ctx] = spy.mock.calls[spy.mock.calls.length - 1];
    expect(props.data).toEqual(DATA2);
    expect(document.body.contains(ctx.canvas)).toBe(true);
    expect(ctx.canvas).toBe(rig.container.querySelector('canvas'));

    await rig.unmount();
  });

  test('series count 1 -> 2 with data change (app smoothing shape)', async () => {
    const spy = jest.spyOn(LineSeriesCanvas, 'renderLayer');
    const rig = await mount(plot(<LineSeriesCanvas key="raw" data={DATA} />));
    spy.mockClear();

    await rig.render(
      plot([
        <LineSeriesCanvas key="smoothed" data={DATA2} />,
        <LineSeriesCanvas key="raw-aux" data={DATA} opacity={0.2} />
      ])
    );

    expect(spy.mock.calls.length).toBeGreaterThanOrEqual(2);
    const drawnData = spy.mock.calls.map(([props]) => props.data);
    expect(drawnData).toContainEqual(DATA2);
    for (const [, ctx] of spy.mock.calls) {
      expect(document.body.contains(ctx.canvas)).toBe(true);
    }

    await rig.unmount();
  });
});
