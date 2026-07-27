// Repro rig for the React 19 canvas repaint investigation.
// Discriminates three candidate failure modes in CanvasWrapper:
//   (a) componentDidUpdate never fires  -> renderLayer not called on update
//   (b) stale layer data                -> renderLayer called with old props
//   (c) detached canvas                 -> renderLayer's ctx belongs to a canvas
//                                          that is no longer in the document
import 'regenerator-runtime/runtime';
import React from 'react';
import {createRoot} from 'react-dom/client';

import XYPlot from 'plot/xy-plot';
import LineSeriesCanvas from 'plot/series/line-series-canvas';

const DATA = [{x: 1, y: 3}, {x: 2, y: 5}, {x: 3, y: 15}, {x: 4, y: 12}];
const DATA2 = DATA.map(d => ({...d, y: d.y * 0.5}));

// jsdom has no real 2d context; return a recording stub whose `canvas`
// points back at the element so connectivity can be asserted.
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

let contexts = [];
const origGetContext = HTMLCanvasElement.prototype.getContext;

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  HTMLCanvasElement.prototype.getContext = function getContext() {
    if (!this.__mockCtx) {
      this.__mockCtx = makeMockContext(this);
      contexts.push(this.__mockCtx);
    }
    return this.__mockCtx;
  };
});

afterAll(() => {
  HTMLCanvasElement.prototype.getContext = origGetContext;
});

beforeEach(() => {
  contexts = [];
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

describe('React 19 canvas repaint', () => {
  test('mount paints the connected canvas', async () => {
    const spy = jest.spyOn(LineSeriesCanvas, 'renderLayer');
    const rig = await mount(plot(<LineSeriesCanvas data={DATA} />));

    expect(spy).toHaveBeenCalled();
    const [props, ctx] = spy.mock.calls[spy.mock.calls.length - 1];
    expect(props.data).toEqual(DATA);
    expect(document.body.contains(ctx.canvas)).toBe(true);

    await rig.unmount();
  });

  test('data update repaints with new data on the connected canvas', async () => {
    const spy = jest.spyOn(LineSeriesCanvas, 'renderLayer');
    const rig = await mount(plot(<LineSeriesCanvas data={DATA} />));
    spy.mockClear();

    await rig.render(plot(<LineSeriesCanvas data={DATA2} />));

    // (a): did the update draw at all?
    expect(spy).toHaveBeenCalled();
    const [props, ctx] = spy.mock.calls[spy.mock.calls.length - 1];
    // (b): did it draw the new data?
    expect(props.data).toEqual(DATA2);
    // (c): did it draw onto the canvas that is actually in the DOM?
    expect(document.body.contains(ctx.canvas)).toBe(true);
    const domCanvas = rig.container.querySelector('canvas');
    expect(ctx.canvas).toBe(domCanvas);

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

  test('unmount cancels a pending animated draw loop', async () => {
    jest.useFakeTimers();
    try {
      const spy = jest.spyOn(LineSeriesCanvas, 'renderLayer');
      const rig = await mount(plot(<LineSeriesCanvas animation data={DATA} />));

      spy.mockClear();
      await rig.unmount();
      jest.advanceTimersByTime(500);

      // without cleanup the loop keeps drawing ~MAX_DRAWS frames on the
      // detached canvas after unmount
      expect(spy).not.toHaveBeenCalled();
    } finally {
      jest.useRealTimers();
    }
  });

  test('a new update cancels the previous animated draw loop', async () => {
    jest.useFakeTimers();
    try {
      const spy = jest.spyOn(LineSeriesCanvas, 'renderLayer');
      // mount starts an animated loop; before it runs a single frame,
      // update to a non-animated series with new data (synchronous paint)
      const rig = await mount(plot(<LineSeriesCanvas animation data={DATA} />));
      await rig.render(plot(<LineSeriesCanvas data={DATA2} />));

      spy.mockClear();
      jest.advanceTimersByTime(500);

      // without cancellation, the stale loop from mount repaints the OLD
      // data over the fresh synchronous paint
      expect(spy).not.toHaveBeenCalled();

      await rig.unmount();
    } finally {
      jest.useRealTimers();
    }
  });

  test('rapid animated updates do not stack draw loops', async () => {
    jest.useFakeTimers();
    try {
      const spy = jest.spyOn(LineSeriesCanvas, 'renderLayer');
      const rig = await mount(plot(<LineSeriesCanvas animation data={DATA} />));
      jest.advanceTimersByTime(500); // let the mount loop finish
      spy.mockClear();

      await rig.render(plot(<LineSeriesCanvas animation data={DATA2} />));
      await rig.render(
        plot(<LineSeriesCanvas animation data={DATA.map(d => ({...d, y: 0}))} />)
      );
      jest.advanceTimersByTime(500);

      // one loop's worth of frames, not two loops interleaving
      expect(spy.mock.calls.length).toBeLessThanOrEqual(35);
      expect(spy.mock.calls.length).toBeGreaterThan(0);

      spy.mockClear();
      jest.advanceTimersByTime(500);
      expect(spy).not.toHaveBeenCalled();

      await rig.unmount();
    } finally {
      jest.useRealTimers();
    }
  });

  test('StrictMode: update repaints the connected canvas', async () => {
    const spy = jest.spyOn(LineSeriesCanvas, 'renderLayer');
    const rig = await mount(
      <React.StrictMode>{plot(<LineSeriesCanvas data={DATA} />)}</React.StrictMode>
    );
    spy.mockClear();

    await rig.render(
      <React.StrictMode>{plot(<LineSeriesCanvas data={DATA2} />)}</React.StrictMode>
    );

    expect(spy).toHaveBeenCalled();
    const [props, ctx] = spy.mock.calls[spy.mock.calls.length - 1];
    expect(props.data).toEqual(DATA2);
    expect(document.body.contains(ctx.canvas)).toBe(true);
    expect(ctx.canvas).toBe(rig.container.querySelector('canvas'));

    await rig.unmount();
  });
});
