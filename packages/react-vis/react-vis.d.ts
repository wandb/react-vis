/* oxlint-disable @typescript-eslint/no-empty-interface */
declare module 'react-vis' {
  import {
    Component,
    type CSSProperties,
    type FC,
    type FocusEventHandler,
    type MouseEvent,
    type MouseEventHandler,
    PureComponent,
    type ReactNode,
    type TouchEventHandler,
    type WheelEventHandler,
  } from 'react';

  export interface AbstractSeriesPoint {
    [key: string]: any;
  }

  export type RVMouseEventHandler = MouseEventHandler<HTMLElement>;
  export type RVTouchEventHandler = TouchEventHandler<HTMLElement>;
  export type RVWheelEventHandler = WheelEventHandler<HTMLElement>;
  export type RVFocusEventHandler = FocusEventHandler<HTMLElement>;

  export type RVBrushEventHandler = (e?: {
    left: number;
    top: number;
    right: number;
    bottom: number;
  }) => void;

  export type RVSearchChangeEventHandler = (value: string) => void;

  export type RVItemEventHandler = (
    item: any,
    index: number,
    event: MouseEvent<HTMLElement>
  ) => void;

  export type RVValueEventHandler<T extends AbstractSeriesPoint> = (
    datapoint: T,
    event: MouseEvent<HTMLElement>
  ) => void;

  export type RVNearestXData<T extends AbstractSeriesPoint> = {
    event: MouseEvent<HTMLElement>;
    innerX: T['x'];
    index: number;
  };
  export type RVNearestXEventHandler<T extends AbstractSeriesPoint> = (
    datapoint: T,
    data: RVNearestXData<T>
  ) => void;

  export type RVNearestXYData<T extends AbstractSeriesPoint> = {
    event: MouseEvent<HTMLElement>;
    innerX: T['x'];
    innerY: T['y'];
    index: number;
  };
  export type RVNearestXYEventHandler<T extends AbstractSeriesPoint> = (
    datapoint: T,
    data: RVNearestXYData<T>
  ) => void;

  export type RVGet<T extends AbstractSeriesPoint, K extends keyof T> = (
    datapoint: T
  ) => T[K];
  export type RVGetNull<T extends AbstractSeriesPoint> = (datapoint: T) => any;
  export type RVGetAlignStyle = (
    align: {horizontal: string; vertical: string},
    x: number,
    y: number
  ) => CSSProperties;

  export type RVTickFormat = (tick: any) => string;

  export type RVItemsFormat = (values: Array<any>) => {value: any; title: any};
  export type RVTitleFormat = (
    values: Array<any>
  ) => {value: any; title: any} | undefined;

  export type RVHintFormat = (value: {
    [key: string]: any;
  }) => Array<{value: any; title: any}>;

  export type RVPadAngle = (...args: Array<any>) => number | undefined;

  export type RVSearchFn = (
    items: Array<any>,
    searchText: string
  ) => Array<any>;

  export type RVSortFn<T extends AbstractSeriesPoint> = (
    a: T,
    b: T,
    accessor: (val: T) => number
  ) => number;

  export interface LineSeriesPoint extends AbstractSeriesPoint {
    x: number;
    y: number;
    color?: string;
  }

  export interface LineMarkSeriesPoint extends AbstractSeriesPoint {
    x: string | number | Date;
    y: string | number | Date;
    color?: string;
    opacity?: string | number;
    stroke?: string | number;
    fill?: string | number;
    size?: string | number;
  }

  export interface MarkSeriesPoint extends AbstractSeriesPoint {
    x: string | number | Date;
    y: string | number | Date;
    color?: string;
    opacity?: string | number;
    stroke?: string | number;
    fill?: string | number;
    size?: string | number;
  }

  export interface HorizontalBarSeriesPoint extends AbstractSeriesPoint {
    x: string | number;
    y: string | number;
    color?: string;
    opacity?: string | number;
    stroke?: string | number;
    fill?: string | number;
  }

  export interface VerticalBarSeriesPoint extends AbstractSeriesPoint {
    x: string | number;
    y: number;
    color?: string;
    opacity?: string | number;
    stroke?: string | number;
    fill?: string | number;
  }

  export interface ArcSeriesPoint extends AbstractSeriesPoint {
    angle0: number;
    angle: number;
    radius0: number;
    radius: number;
    color?: string | number;
    opacity?: string | number;
    stroke?: string | number;
    fill?: string | number;
  }

  export interface AreaSeriesPoint extends AbstractSeriesPoint {
    x: number;
    y: number;
    y0?: number;
  }

  export interface ContourSeriesPoint extends AbstractSeriesPoint {
    x: number;
    y: number;
  }

  export interface HeatmapSeriesPoint extends AbstractSeriesPoint {
    x: number;
    y: number;
    color?: string | number;
  }

  export interface LabelSeriesPoint extends AbstractSeriesPoint {
    x: number;
    y: number;
    label: string;
    xOffset?: number;
    yOffset?: number;
    rotation?: number;
  }

  export interface CustomSVGSeriesPoint extends AbstractSeriesPoint {
    x: number;
    y: number;
  }

  export interface PolygonSeriesPoint extends AbstractSeriesPoint {
    x: number;
    y: number;
  }

  export interface RectSeriesPoint extends AbstractSeriesPoint {
    x: string | number | Date;
    x0: string | number | Date;
    y: string | number | Date;
    y0: string | number | Date;
    color?: string | number;
    opacity?: string | number;
    stroke?: string | number;
    fill?: string | number;
  }
  export type HorizontalRectSeriesPoint = RectSeriesPoint;
  export interface VerticalRectSeriesPoint extends RectSeriesPoint {}

  export interface WhiskerSeriesPoint extends AbstractSeriesPoint {
    x: string | number | Date;
    y: string | number | Date;
    color?: string | number;
    opacity?: string | number;
    stroke?: string | number;
    size?: string | number;
    xVariance?: string | number;
    yVariance?: string | number;
  }

  export interface TreemapPoint extends AbstractSeriesPoint {
    title: string;
    size: number;
    opacity?: number;
    color?: string | number;
    style: CSSProperties;
    children: Array<TreemapPoint>;
  }

  export interface ParallelCoordinatesPoint extends AbstractSeriesPoint {
    [key: string]: number;
  }

  export interface RadialChartPoint extends AbstractSeriesPoint {
    angle: number;
    radius?: number;
    label?: string;
    subLabel?: string;
    color?: string;
    style?: object;
    className?: string;
  }

  export interface SankeyPoint extends AbstractSeriesPoint {
    name: string;
    color?: string;
    opacity?: number;
    key?: string;
  }

  export interface SunburstPoint extends AbstractSeriesPoint {
    title: string;
    size: number;
    color?: number;
    label?: string;
    labelStyle?: CSSProperties;
    dontRotateLabel?: boolean;
    children?: Array<SunburstPoint>;
  }

  export interface VoronoiPoint extends AbstractSeriesPoint {
    x: number;
    y: number;
  }

  export interface HexbinSeriesPoint extends AbstractSeriesPoint {
    x: number;
    y: number;
  }

  export interface DecorativeAxisPoint extends AbstractSeriesPoint {}
  export interface RadarChartPoint extends AbstractSeriesPoint {}
  export interface HighlightPoint extends AbstractSeriesPoint {}

  export function makeHeightFlexible(component: Component): Component;
  export function makeVisFlexible(component: Component): Component;
  export function makeWidthFlexible(component: Component): Component;

  export const AxisUtils: {
    DIRECTION: {
      VERTICAL: 'vertical';
      HORIZONTAL: 'horizontal';
    };
    ORIENTATION: {
      TOP: 'top';
      LEFT: 'left';
      RIGHT: 'right';
      BOTTOM: 'bottom';
      VERTICAL: 'vertical';
      HORIZONTAL: 'horizontal';
    };
    getTicksTotalFromSize: (size: number) => number;
    getTickValues: (
      scale: Function,
      tickTotal: number,
      tickValues?: Array<number | string>
    ) => Array<number | string>;
  };

  export const ScaleUtils: {
    extractScalePropsFromProps: (
      props: AbstractSeriesProps<AbstractSeriesPoint>,
      attributes: Array<string>
    ) => {[key: string]: any};
    getAttributeScale: (
      props: AbstractSeriesProps<AbstractSeriesPoint>,
      attr: string
    ) => Function;
    getAttributeFunctor: (
      props: AbstractSeriesProps<AbstractSeriesPoint>,
      attr: string
    ) => any;
    getAttr0Functor: (
      props: AbstractSeriesProps<AbstractSeriesPoint>,
      attr: string
    ) => any;
    getAttributeValue: (
      props: AbstractSeriesProps<AbstractSeriesPoint>,
      attr: string
    ) => any;
    getDomainByAccessor: (
      allData: Array<any>,
      accessor: Function,
      accessor0: Function,
      type: string
    ) => Array<any>;
    getFontColorFromBackground: (background?: string | null) => string | null;
    getMissingScaleProps: (
      props: AbstractSeriesProps<AbstractSeriesPoint>,
      data: Array<any>,
      attributes: Array<string>
    ) => {[key: string]: any};
    getOptionalScaleProps: (
      props: AbstractSeriesProps<AbstractSeriesPoint>
    ) => {[key: string]: any};
    getScaleObjectFromProps: (
      props: AbstractSeriesProps<AbstractSeriesPoint>,
      attr: string
    ) => any;
    getScalePropTypesByAttribute: (attr: string) => {[key: string]: any};
    getXYPlotValues: (
      props: AbstractSeriesProps<AbstractSeriesPoint>,
      children: ReactNode
    ) => {[key: string]: any};
    literalScale: (defaultValue: any) => Function;
  };

  export interface AbstractSeriesProps<T extends AbstractSeriesPoint> {
    _xValue?: T['_x'];
    xDomain?: Array<T['x']>;
    getX?: RVGet<T, 'x'>;
    getX0?: RVGet<T, 'x0'>;
    getNull?: RVGetNull<LineSeriesPoint>;
    xRange?: Array<T['x']>;
    size?: number | string;
    xType?:
      | 'linear'
      | 'ordinal'
      | 'category'
      | 'literal'
      | 'log'
      | 'time'
      | 'time-utc';
    xDistance?: number;
    xBaseValue?: T['x'];
    _yValue?: T['_y'];
    yDomain?: Array<T['y']>;
    getY?: RVGet<T, 'y'>;
    getY0?: RVGet<T, 'y0'>;
    yRange?: Array<T['y']>;
    yType?:
      | 'linear'
      | 'ordinal'
      | 'category'
      | 'literal'
      | 'log'
      | 'time'
      | 'time-utc';
    yDistance?: number;
    yBaseValue?: T['y'];
    _sizeValue?: T['_size'];
    sizeDomain?: Array<T['size']>;
    getSize?: RVGet<T, 'size'>;
    getSize0?: RVGet<T, 'size0'>;
    sizeRange?: Array<T['size']>;
    sizeType?:
      | 'linear'
      | 'ordinal'
      | 'category'
      | 'literal'
      | 'log'
      | 'time'
      | 'time-utc';
    sizeDistance?: number;
    sizeBaseValue?: T['size'];
    _opacityValue?: T['_opacity'];
    opacityDomain?: Array<T['opacity']>;
    getOpacity?: RVGet<T, 'opacity'>;
    getOpacity0?: RVGet<T, 'opacity0'>;
    opacityRange?: Array<T['opacity']>;
    opacityType?:
      | 'linear'
      | 'ordinal'
      | 'category'
      | 'literal'
      | 'log'
      | 'time'
      | 'time-utc';
    opacityDistance?: number;
    opacityBaseValue?: T['opacity'];
    _colorValue?: T['_color'];
    colorDomain?: Array<T['color']> | Array<number>;
    getColor?: RVGet<T, 'color'>;
    getColor0?: RVGet<T, 'color0'>;
    colorRange?: Array<T['color']>;
    colorType?:
      | 'linear'
      | 'ordinal'
      | 'category'
      | 'literal'
      | 'log'
      | 'time'
      | 'time-utc';
    colorDistance?: number;
    colorBaseValue?: T['color'];
    width?: number;
    height?: number;
    data?: Array<T | Array<any>>;
    onValueMouseOver?: RVValueEventHandler<T>;
    onValueMouseOut?: RVValueEventHandler<T>;
    onValueClick?: RVValueEventHandler<T>;
    onValueRightClick?: RVValueEventHandler<T>;
    onSeriesMouseOver?: RVMouseEventHandler;
    onSeriesMouseOut?: RVMouseEventHandler;
    onSeriesClick?: RVMouseEventHandler;
    onSeriesRightClick?: RVMouseEventHandler;
    onNearestX?: RVNearestXEventHandler<T>;
    onNearestXY?: RVNearestXEventHandler<T>;
    style?: CSSProperties;
    animation?:
      | string
      | {
      stiffness?: number;
      nonAnimatedProps?: Array<string>;
      damping?: number;
    }
      | boolean;
    stack?: boolean;
    color?: string | number;
    stroke?: string | number;
    fill?: string | number;
    opacity?: number;
    fillDomain?: number[];
    fillRange?: string[];
  }
  export class AbstractSeries<T> extends PureComponent<T> {}

  export interface LineSeriesProps
    extends AbstractSeriesProps<LineSeriesPoint> {
    strokeStyle?: 'dashed' | 'solid';
    curve?: string | Function;
    strokeDasharray?: string;
    strokeWidth?: number;
  }
  export class LineSeries extends AbstractSeries<LineSeriesProps> {}

  export interface LineSeriesCanvasProps
    extends AbstractSeriesProps<LineSeriesPoint> {
    strokeStyle?: 'dashed' | 'solid';
    curve?: string | Function;
    getNull?: RVGetNull<LineSeriesPoint>;
    strokeDasharray?: number[];
    strokeWidth?: number;
    size: number;
  }
  export class LineSeriesCanvas extends AbstractSeries<LineSeriesCanvasProps> {}

  export interface HorizontalBarSeriesProps
    extends AbstractSeriesProps<HorizontalBarSeriesPoint> {}
  export class HorizontalBarSeries extends AbstractSeries<HorizontalBarSeriesProps> {}

  export interface HorizontalBarSeriesCanvasProps
    extends AbstractSeriesProps<HorizontalBarSeriesPoint> {}
  export class HorizontalBarSeriesCanvas extends AbstractSeries<HorizontalBarSeriesCanvasProps> {}

  export interface VerticalBarSeriesProps
    extends AbstractSeriesProps<VerticalBarSeriesPoint> {}
  export class VerticalBarSeries extends AbstractSeries<VerticalBarSeriesProps> {}

  export interface VerticalBarSeriesCanvasProps
    extends AbstractSeriesProps<VerticalBarSeriesPoint> {}
  export class VerticalBarSeriesCanvas extends AbstractSeries<VerticalBarSeriesCanvasProps> {}

  export interface VerticalRectSeriesProps
    extends AbstractSeriesProps<VerticalRectSeriesPoint> {}
  export class VerticalRectSeries extends AbstractSeries<VerticalRectSeriesProps> {}

  export interface VerticalRectSeriesCanvasProps
    extends AbstractSeriesProps<VerticalRectSeriesPoint> {}
  export class VerticalRectSeriesCanvas extends AbstractSeries<VerticalRectSeriesCanvasProps> {}

  export interface HorizontalRectSeriesProps
    extends AbstractSeriesProps<HorizontalRectSeriesPoint> {}
  export class HorizontalRectSeries extends AbstractSeries<HorizontalRectSeriesProps> {}

  export interface HorizontalRectSeriesCanvasProps
    extends AbstractSeriesProps<HorizontalRectSeriesPoint> {}
  export class HorizontalRectSeriesCanvas extends AbstractSeries<HorizontalRectSeriesCanvasProps> {}

  export interface LabelSeriesProps
    extends AbstractSeriesProps<LabelSeriesPoint> {
    allowOffsetToBeReversed?: boolean;
    marginLeft?: number;
    marginTop?: number;
    rotation?: number;
    labelAnchorX?: string;
    labelAnchorY?: string;
  }
  export class LabelSeries extends AbstractSeries<LabelSeriesProps> {}

  export interface PolygonSeriesProps
    extends AbstractSeriesProps<PolygonSeriesPoint> {}
  export class PolygonSeries extends AbstractSeries<PolygonSeriesProps> {}

  export interface RectSeriesProps
    extends AbstractSeriesProps<RectSeriesPoint> {
    linePosAttr?: string;
    valuePosAttr?: string;
    lineSizeAttr?: string;
    valueSizeAttr?: string;
  }
  export class RectSeries extends AbstractSeries<RectSeriesProps> {}

  export interface RectSeriesCanvasProps
    extends AbstractSeriesProps<RectSeriesPoint> {}
  export class RectSeriesCanvas extends AbstractSeries<RectSeriesCanvasProps> {}

  export interface MarkSeriesProps
    extends AbstractSeriesProps<MarkSeriesPoint> {
    getNull?: RVGetNull<MarkSeriesPoint>;
    strokeWidth?: number;
    size?: string | number;
  }
  export class MarkSeries extends AbstractSeries<MarkSeriesProps> {}

  export interface MarkSeriesCanvasProps
    extends AbstractSeriesProps<MarkSeriesPoint> {}
  export class MarkSeriesCanvas extends AbstractSeries<MarkSeriesCanvasProps> {}

  export interface WhiskerSeriesProps
    extends AbstractSeriesProps<WhiskerSeriesPoint> {
    strokeWidth?: number;
  }
  export class WhiskerSeries extends AbstractSeries<WhiskerSeriesProps> {}

  export interface HeatmapSeriesProps
    extends AbstractSeriesProps<HeatmapSeriesPoint> {}
  export class HeatmapSeries extends AbstractSeries<HeatmapSeriesProps> {}

  export interface HexbinSeriesProps
    extends AbstractSeriesProps<HexbinSeriesPoint> {
    radius?: number;
  }
  export class HexbinSeries extends AbstractSeries<HexbinSeriesProps> {}

  export interface ContourSeriesProps
    extends AbstractSeriesProps<ContourSeriesPoint> {
    bandwidth?: number;
    marginLeft?: number;
    marginTop?: number;
  }
  export class ContourSeries extends AbstractSeries<ContourSeriesProps> {}

  export interface CustomSVGSeriesProps
    extends AbstractSeriesProps<CustomSVGSeriesPoint> {
    customComponent?: string | Function;
    marginLeft?: number;
    marginTop?: number;
  }
  export class CustomSVGSeries extends AbstractSeries<CustomSVGSeriesProps> {}

  type AreaSeriesProps = AbstractSeriesProps<AreaSeriesPoint>;

  export class AreaSeries extends AbstractSeries<AreaSeriesProps> {}

  export interface ArcSeriesProps extends AbstractSeriesProps<ArcSeriesPoint> {
    _radiusValue?: ArcSeriesPoint['_radius'];
    radiusDomain?: Array<ArcSeriesPoint['radius']>;
    getRadius?: RVGet<ArcSeriesPoint, 'radius'>;
    getRadius0?: RVGet<ArcSeriesPoint, 'radius0'>;
    radiusRange?: Array<ArcSeriesPoint['radius']>;
    radiusType?:
      | 'linear'
      | 'ordinal'
      | 'category'
      | 'literal'
      | 'log'
      | 'time'
      | 'time-utc';
    radiusDistance?: number;
    radiusBaseValue?: ArcSeriesPoint['radius'];
    _angleValue?: ArcSeriesPoint['_angle'];
    angleDomain?: Array<ArcSeriesPoint['angle']>;
    getAngle?: RVGet<ArcSeriesPoint, 'angle'>;
    getAngle0?: RVGet<ArcSeriesPoint, 'angle0'>;
    angleRange?: Array<ArcSeriesPoint['angle']>;
    angleType?:
      | 'linear'
      | 'ordinal'
      | 'category'
      | 'literal'
      | 'log'
      | 'time'
      | 'time-utc';
    angleDistance?: number;
    angleBaseValue?: ArcSeriesPoint['angle'];
    center?: {
      x?: number;
      y?: number;
    };
    arcClassName?: string;
    padAngle?: RVPadAngle | number;
  }
  export class ArcSeries extends AbstractSeries<ArcSeriesProps> {}

  export interface LineMarkSeriesProps
    extends AbstractSeriesProps<LineMarkSeriesPoint> {
    strokeStyle?: 'dashed' | 'solid';
    curve?: string | Function;
    getNull?: RVGetNull<LineMarkSeriesPoint>;
    lineStyle?: CSSProperties;
    markStyle?: CSSProperties;
  }
  export class LineMarkSeries extends AbstractSeries<LineMarkSeriesProps> {}

  export interface LineMarkSeriesCanvasProps
    extends AbstractSeriesProps<LineMarkSeriesPoint> {}
  export class LineMarkSeriesCanvas extends AbstractSeries<LineMarkSeriesCanvasProps> {}

  export interface HintProps {
    marginTop?: number;
    marginLeft?: number;
    innerWidth?: number;
    innerHeight?: number;
    scales?: {[key: string]: any};
    value?: {[key: string]: any};
    format?: RVHintFormat;
    style?: CSSProperties;
    align?: {
      horizontal?: 'auto' | 'left' | 'right' | 'leftEdge' | 'rightEdge';
      vertical?: 'auto' | 'bottom' | 'top' | 'bottomEdge' | 'topEdge';
    };
    getAlignStyle?: RVGetAlignStyle;
    orientation?: 'bottomleft' | 'bottomright' | 'topleft' | 'topright';
  }
  export class Hint<T = any> extends PureComponent<HintProps & T> {}

  export interface BordersProps {
    style?: {
      bottom?: CSSProperties;
      left?: CSSProperties;
      right?: CSSProperties;
      top?: CSSProperties;
    };
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    innerWidth?: number;
    innerHeight?: number;
  }
  export class Borders<T = any> extends PureComponent<BordersProps & T> {}

  export interface CrosshairProps {
    className?: string;
    values?: Array<number | string | {[key: string]: any}>;
    series?: {[key: string]: any};
    innerWidth?: number;
    innerHeight?: number;
    marginLeft?: number;
    marginTop?: number;
    orientation?: 'left' | 'right';
    itemsFormat?: RVItemsFormat;
    titleFormat?: RVTitleFormat;
    style?: {
      line?: CSSProperties;
      title?: CSSProperties;
      box?: CSSProperties;
    };
  }
  export class Crosshair<T = any> extends PureComponent<CrosshairProps & T> {}

  export interface XYPlotProps {
    animation?:
      | string
      | {
      stiffness?: number;
      nonAnimatedProps?: Array<string>;
      damping?: number;
    }
      | boolean;
    className?: string;
    dontCheckIfEmpty?: boolean;
    height: number;
    margin?:
      | {
      left?: number;
      top?: number;
      right?: number;
      bottom?: number;
    }
      | number;
    onClick?: RVMouseEventHandler;
    onDoubleClick?: RVMouseEventHandler;
    onMouseDown?: RVMouseEventHandler;
    onMouseUp?: RVMouseEventHandler;
    onMouseEnter?: RVMouseEventHandler;
    onMouseLeave?: RVMouseEventHandler;
    onMouseMove?: RVMouseEventHandler;
    onTouchStart?: RVTouchEventHandler;
    onTouchMove?: RVTouchEventHandler;
    onTouchEnd?: RVTouchEventHandler;
    onTouchCancel?: RVTouchEventHandler;
    onWheel?: RVWheelEventHandler;
    stackBy?:
      | 'x'
      | 'y'
      | 'radius'
      | 'angle'
      | 'color'
      | 'fill'
      | 'stroke'
      | 'opacity'
      | 'size';
    style?: CSSProperties;
    width: number;
  }
  export class XYPlot<T = any> extends Component<XYPlotProps & T> {}

  export interface DecorativeAxisProps
    extends AbstractSeriesProps<DecorativeAxisPoint> {
    axisDomain: Array<number>;
    axisEnd: {
      x?: number | string;
      y?: number | string;
    };
    axisStart: {
      x?: number | string;
      y?: number | string;
    };
    numberOfTicks?: number;
    tickValue?: RVTickFormat;
    tickSize?: number;
  }
  export class DecorativeAxis extends AbstractSeries<DecorativeAxisProps> {}

  export interface XAxisProps {
    orientation?: 'top' | 'bottom';
    attr?: string;
    attrAxis?: string;
    width?: number;
    height?: number;
    top?: number;
    left?: number;
    title?: string;
    style?: {[key: string]: string | CSSProperties};
    className?: string;
    hideTicks?: boolean;
    hideLine?: boolean;
    on0?: boolean;
    tickLabelAngle?: number;
    tickSize?: number;
    tickSizeInner?: number;
    tickSizeOuter?: number;
    tickPadding?: number;
    tickValues?: Array<number | string>;
    tickFormat?: RVTickFormat;
    tickTotal?: number;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    innerWidth?: number;
    innerHeight?: number;
  }
  export const XAxis: FC<XAxisProps>;

  export interface YAxisProps {
    orientation?: 'left' | 'right';
    attr?: string;
    attrAxis?: string;
    width?: number;
    height?: number;
    top?: number;
    left?: number;
    title?: string;
    style?: {[key: string]: string | CSSProperties};
    className?: string;
    hideTicks?: boolean;
    hideLine?: boolean;
    on0?: boolean;
    tickLabelAngle?: number;
    tickSize?: number;
    tickSizeInner?: number;
    tickSizeOuter?: number;
    tickPadding?: number;
    tickValues?: Array<number | string>;
    tickFormat?: RVTickFormat;
    tickTotal?: number;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    innerWidth?: number;
    innerHeight?: number;
  }
  export const YAxis: FC<YAxisProps>;

  export interface CircularGridLinesProps {
    centerX?: number;
    centerY?: number;
    width?: number;
    height?: number;
    top?: number;
    left?: number;
    rRange?: Array<number>;
    style?: CSSProperties;
    tickValues?: Array<number>;
    tickTotal?: number;
    animation?:
      | string
      | {
      stiffness?: number;
      nonAnimatedProps?: Array<string>;
      damping?: number;
    }
      | boolean;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    innerWidth?: number;
    innerHeight?: number;
  }
  export class CircularGridLines<T = any> extends PureComponent<
    CircularGridLinesProps & T
  > {}

  export interface GridLinesProps {
    direction?: 'vertical' | 'horizontal';
    attr: string;
    width?: number;
    height?: number;
    top?: number;
    left?: number;
    style?: CSSProperties;
    tickValues?: Array<number | string>;
    tickTotal?: number;
    animation?:
      | string
      | {
      stiffness?: number;
      nonAnimatedProps?: Array<string>;
      damping?: number;
    }
      | boolean;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    innerWidth?: number;
    innerHeight?: number;
  }
  export class GridLines<T = any> extends PureComponent<GridLinesProps & T> {}

  export interface GradientDefsProps {
    className?: string;
  }
  export class GradientDefs<T = any> extends PureComponent<
    GradientDefsProps & T
  > {}

  export interface VerticalGridLinesProps {
    direction?: 'vertical';
    attr?: string;
    width?: number;
    height?: number;
    top?: number;
    left?: number;
    style?: CSSProperties;
    tickValues?: Array<number | string>;
    tickTotal?: number;
    animation?:
      | string
      | {
      stiffness?: number;
      nonAnimatedProps?: Array<string>;
      damping?: number;
    }
      | boolean;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    innerWidth?: number;
    innerHeight?: number;
  }
  export const VerticalGridLines: FC<VerticalGridLinesProps>;

  export interface HorizontalGridLinesProps {
    direction?: 'horizontal';
    attr?: string;
    width?: number;
    height?: number;
    top?: number;
    left?: number;
    style?: CSSProperties;
    tickValues?: Array<number | string>;
    tickTotal?: number;
    animation?:
      | string
      | {
      stiffness?: number;
      nonAnimatedProps?: Array<string>;
      damping?: number;
    }
      | boolean;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    innerWidth?: number;
    innerHeight?: number;
  }
  export const HorizontalGridLines: FC<HorizontalGridLinesProps>;

  export interface VoronoiProps {
    className?: string;
    extent?: Array<Array<number>>;
    nodes: Array<VoronoiPoint>;
    onBlur?: RVFocusEventHandler;
    onClick?: RVMouseEventHandler;
    onHover?: RVMouseEventHandler;
    onMouseDown?: RVMouseEventHandler;
    onMouseUp?: RVMouseEventHandler;
    x?: Function;
    y?: Function;
  }
  export const Voronoi: FC<VoronoiProps>;

  export interface HighlightProps extends AbstractSeriesProps<HighlightPoint> {
    enableX?: boolean;
    enableY?: boolean;
    highlightHeight?: number;
    highlightWidth?: number;
    highlightX?: string | number;
    highlightY?: string | number;
    isDrawing?: boolean;
    setIsDrawing?: (isDrawing: boolean) => void;
    onBrushStart?: RVMouseEventHandler;
    onDragStart?: RVMouseEventHandler;
    onBrush?: RVBrushEventHandler;
    onDrag?: RVBrushEventHandler;
    onBrushEnd?: RVBrushEventHandler;
    onDragEnd?: RVBrushEventHandler;
  }
  export class Highlight extends AbstractSeries<HighlightProps> {}

  export interface DiscreteColorLegendProps {
    className?: string;
    items: Array<
      | {
      title: string;
      color?: string;
      disabled?: boolean;
    }
      | string
      | ReactNode
    >;
    onItemClick?: RVMouseEventHandler;
    onItemMouseEnter?: RVItemEventHandler;
    onItemMouseLeave?: RVItemEventHandler;
    height?: number;
    width?: number;
    orientation?: 'vertical' | 'horizontal';
  }
  export const DiscreteColorLegend: FC<DiscreteColorLegendProps>;

  export interface SearchableDiscreteColorLegendProps {
    className?: string;
    items: Array<
      | {
      title: string;
      color?: string;
      disabled?: boolean;
    }
      | string
      | ReactNode
    >;
    onItemClick?: RVMouseEventHandler;
    onItemMouseEnter?: RVItemEventHandler;
    onItemMouseLeave?: RVItemEventHandler;
    height?: number;
    width?: number;
    orientation?: 'vertical' | 'horizontal';
    searchText?: string;
    onSearchChange?: RVSearchChangeEventHandler;
    searchPlaceholder?: string;
    searchFn?: RVSearchFn;
  }
  export const SearchableDiscreteColorLegend: FC<SearchableDiscreteColorLegendProps>;

  export interface ContinuousColorLegendProps {
    className?: string;
    height?: number;
    endColor?: string;
    endTitle: number | string;
    midColor?: string;
    midTitle?: number | string;
    startColor?: string;
    startTitle: number | string;
    width?: number;
  }
  export const ContinuousColorLegend: FC<ContinuousColorLegendProps>;

  export interface ContinuousSizeLegendProps {
    className?: string;
    circlesTotal?: number;
    endSize?: number;
    endTitle: number | string;
    height?: number;
    startSize?: number;
    startTitle: number | string;
    width?: number;
  }
  export const ContinuousSizeLegend: FC<ContinuousSizeLegendProps>;

  export interface TreemapProps {
    animation?:
      | string
      | {
      stiffness?: number;
      nonAnimatedProps?: Array<string>;
      damping?: number;
    }
      | boolean;
    className?: string;
    data?: TreemapPoint;
    height: number;
    hideRootNode?: boolean;
    margin?:
      | {
      left?: number;
      top?: number;
      right?: number;
      bottom?: number;
    }
      | number;
    mode?:
      | 'squarify'
      | 'resquarify'
      | 'slice'
      | 'dice'
      | 'slicedice'
      | 'binary'
      | 'circlePack'
      | 'partition'
      | 'partition-pivot';
    onLeafClick?: RVValueEventHandler<TreemapPoint>;
    onLeafMouseOver?: RVValueEventHandler<TreemapPoint>;
    onLeafMouseOut?: RVValueEventHandler<TreemapPoint>;
    useCirclePacking?: boolean;
    padding?: number;
    sortFunction?: RVSortFn<TreemapPoint>;
    width: number;
    getSize?: RVGet<TreemapPoint, 'size'>;
    getColor?: RVGet<TreemapPoint, 'color'>;
  }
  export class Treemap<T = any> extends Component<TreemapProps & T> {}

  export interface RadialChartProps {
    animation?:
      | string
      | {
      stiffness?: number;
      nonAnimatedProps?: Array<string>;
      damping?: number;
    }
      | boolean;
    className?: string;
    colorType?: string;
    data: Array<{
      angle?: number;
      className?: string;
      label?: string;
      radius?: number;
      style?: CSSProperties;
    }>;
    getAngle?: RVGet<RadialChartPoint, 'angle'>;
    getAngle0?: RVGet<RadialChartPoint, 'angle0'>;
    padAngle?: RVPadAngle | number;
    getRadius?: RVGet<RadialChartPoint, 'radius'>;
    getRadius0?: RVGet<RadialChartPoint, 'radius0'>;
    getLabel?: RVGet<RadialChartPoint, 'label'>;
    height: number;
    labelsAboveChildren?: boolean;
    labelsStyle?: CSSProperties;
    margin?:
      | {
      left?: number;
      top?: number;
      right?: number;
      bottom?: number;
    }
      | number;
    onValueClick?: RVValueEventHandler<RadialChartPoint>;
    onValueMouseOver?: RVValueEventHandler<RadialChartPoint>;
    onValueMouseOut?: RVValueEventHandler<RadialChartPoint>;
    showLabels?: boolean;
    style?: CSSProperties;
    subLabel?: Function;
    width: number;
  }
  export class RadialChart<T = any> extends Component<RadialChartProps & T> {}

  export interface RadarChartProps {
    animation?:
      | string
      | {
      stiffness?: number;
      nonAnimatedProps?: Array<string>;
      damping?: number;
    }
      | boolean;
    className?: string;
    colorType?: string;
    colorRange?: Array<string>;
    data: Array<RadarChartPoint>;
    domains: Array<{
      name: string;
      domain: Array<number>;
      tickFormat?: RVTickFormat;
    }>;
    height: number;
    hideInnerMostValues?: boolean;
    margin?:
      | {
      left?: number;
      top?: number;
      right?: number;
      bottom?: number;
    }
      | number;
    startingAngle?: number;
    style?: {
      axes?: CSSProperties;
      labels?: CSSProperties;
      polygons?: CSSProperties;
    };
    tickFormat?: RVTickFormat;
    width: number;
  }
  export class RadarChart<T = any> extends Component<RadarChartProps & T> {}

  export interface ParallelCoordinatesProps {
    animation?:
      | string
      | {
      stiffness?: number;
      nonAnimatedProps?: Array<string>;
      damping?: number;
    }
      | boolean;
    brushing?: boolean;
    className?: string;
    colorType?: string;
    colorRange?: Array<string>;
    data: Array<ParallelCoordinatesPoint>;
    domains: Array<{
      name: string;
      domain: Array<number>;
      tickFormat?: RVTickFormat;
    }>;
    height: number;
    margin?:
      | {
      left?: number;
      top?: number;
      right?: number;
      bottom?: number;
    }
      | number;
    style?: {
      axes?: CSSProperties;
      labels?: CSSProperties;
      lines?: CSSProperties;
    };
    showMarks?: boolean;
    tickFormat?: RVTickFormat;
    width: number;
  }
  export class ParallelCoordinates<T = any> extends Component<
    ParallelCoordinatesProps & T
  > {}

  export interface SankeyProps {
    align?: 'justify' | 'left' | 'right' | 'center';
    className?: string;
    hasVoronoi?: boolean;
    height: number;
    hideLabels?: boolean;
    labelRotation?: number;
    layout?: number;
    links: Array<{
      source: number | {[key: string]: any};
      target: number | {[key: string]: any};
    }>;
    margin?:
      | {
      left?: number;
      top?: number;
      right?: number;
      bottom?: number;
    }
      | number;
    nodePadding?: number;
    nodes: Array<SankeyPoint>;
    nodeWidth?: number;
    onValueMouseOver?: RVValueEventHandler<SankeyPoint>;
    onValueClick?: RVValueEventHandler<SankeyPoint>;
    onValueMouseOut?: RVValueEventHandler<SankeyPoint>;
    onLinkClick?: RVValueEventHandler<SankeyPoint>;
    onLinkMouseOver?: RVValueEventHandler<SankeyPoint>;
    onLinkMouseOut?: RVValueEventHandler<SankeyPoint>;
    style?: {
      links?: CSSProperties;
      rects?: CSSProperties;
      labels?: CSSProperties;
    };
    width: number;
  }
  export class Sankey<T = any> extends Component<SankeyProps & T> {}

  export interface SunburstProps {
    animation?:
      | string
      | {
      stiffness?: number;
      nonAnimatedProps?: Array<string>;
      damping?: number;
    }
      | boolean;
    getAngle?: RVGet<SunburstPoint, 'angle'>;
    getAngle0?: RVGet<SunburstPoint, 'angle0'>;
    className?: string;
    colorType?: string;
    data: SunburstPoint;
    height: number;
    hideRootNode?: boolean;
    getLabel?: RVGet<SunburstPoint, 'label'>;
    onValueClick?: RVValueEventHandler<SunburstPoint>;
    onValueMouseOver?: RVValueEventHandler<SunburstPoint>;
    onValueMouseOut?: RVValueEventHandler<SunburstPoint>;
    getSize?: RVGet<SunburstPoint, 'size'>;
    width: number;
    padAngle?: RVPadAngle | number;
  }
  export class Sunburst<T = any> extends Component<SunburstProps & T> {}

  export interface FlexibleXYPlotProps {
    animation?:
      | string
      | {
      stiffness?: number;
      nonAnimatedProps?: Array<string>;
      damping?: number;
    }
      | boolean;
    className?: string;
    dontCheckIfEmpty?: boolean;
    margin?:
      | {
      left?: number;
      top?: number;
      right?: number;
      bottom?: number;
    }
      | number;
    onClick?: RVMouseEventHandler;
    onDoubleClick?: RVMouseEventHandler;
    onMouseDown?: RVMouseEventHandler;
    onMouseUp?: RVMouseEventHandler;
    onMouseEnter?: RVMouseEventHandler;
    onMouseLeave?: RVMouseEventHandler;
    onMouseMove?: RVMouseEventHandler;
    onTouchStart?: RVTouchEventHandler;
    onTouchMove?: RVTouchEventHandler;
    onTouchEnd?: RVTouchEventHandler;
    onTouchCancel?: RVTouchEventHandler;
    onWheel?: RVWheelEventHandler;
    stackBy?:
      | 'x'
      | 'y'
      | 'radius'
      | 'angle'
      | 'color'
      | 'fill'
      | 'stroke'
      | 'opacity'
      | 'size';
    style?: CSSProperties;
  }
  export class FlexibleXYPlot<T = any> extends Component<
    FlexibleXYPlotProps & T
  > {}

  export interface FlexibleWidthXYPlotProps {
    animation?:
      | string
      | {
      stiffness?: number;
      nonAnimatedProps?: Array<string>;
      damping?: number;
    }
      | boolean;
    className?: string;
    dontCheckIfEmpty?: boolean;
    margin?:
      | {
      left?: number;
      top?: number;
      right?: number;
      bottom?: number;
    }
      | number;
    onClick?: RVMouseEventHandler;
    onDoubleClick?: RVMouseEventHandler;
    onMouseDown?: RVMouseEventHandler;
    onMouseUp?: RVMouseEventHandler;
    onMouseEnter?: RVMouseEventHandler;
    onMouseLeave?: RVMouseEventHandler;
    onMouseMove?: RVMouseEventHandler;
    onTouchStart?: RVTouchEventHandler;
    onTouchMove?: RVTouchEventHandler;
    onTouchEnd?: RVTouchEventHandler;
    onTouchCancel?: RVTouchEventHandler;
    onWheel?: RVWheelEventHandler;
    stackBy?:
      | 'x'
      | 'y'
      | 'radius'
      | 'angle'
      | 'color'
      | 'fill'
      | 'stroke'
      | 'opacity'
      | 'size';
    style?: CSSProperties;
  }
  export class FlexibleWidthXYPlot<T = any> extends Component<
    FlexibleWidthXYPlotProps & T
  > {}

  export interface FlexibleHeightXYPlotProps {
    animation?:
      | string
      | {
      stiffness?: number;
      nonAnimatedProps?: Array<string>;
      damping?: number;
    }
      | boolean;
    className?: string;
    dontCheckIfEmpty?: boolean;
    margin?:
      | {
      left?: number;
      top?: number;
      right?: number;
      bottom?: number;
    }
      | number;
    onClick?: RVMouseEventHandler;
    onDoubleClick?: RVMouseEventHandler;
    onMouseDown?: RVMouseEventHandler;
    onMouseUp?: RVMouseEventHandler;
    onMouseEnter?: RVMouseEventHandler;
    onMouseLeave?: RVMouseEventHandler;
    onMouseMove?: RVMouseEventHandler;
    onTouchStart?: RVTouchEventHandler;
    onTouchMove?: RVTouchEventHandler;
    onTouchEnd?: RVTouchEventHandler;
    onTouchCancel?: RVTouchEventHandler;
    onWheel?: RVWheelEventHandler;
    stackBy?:
      | 'x'
      | 'y'
      | 'radius'
      | 'angle'
      | 'color'
      | 'fill'
      | 'stroke'
      | 'opacity'
      | 'size';
    style?: CSSProperties;
  }
  export class FlexibleHeightXYPlot<T = any> extends Component<
    FlexibleHeightXYPlotProps & T
  > {}
}

declare module 'react-vis/es/plot/series/abstract-series' {
  import {AbstractSeries} from 'react-vis';
  export default AbstractSeries;
}

declare module 'react-vis/es/plot/series/line-series' {
  import {LineSeries} from 'react-vis';
  export default LineSeries;
}

declare module 'react-vis/es/plot/series/line-series-canvas' {
  import {LineSeriesCanvas} from 'react-vis';
  export default LineSeriesCanvas;
}

declare module 'react-vis/es/plot/series/horizontal-bar-series' {
  import {HorizontalBarSeries} from 'react-vis';
  export default HorizontalBarSeries;
}

declare module 'react-vis/es/plot/series/horizontal-bar-series-canvas' {
  import {HorizontalBarSeriesCanvas} from 'react-vis';
  export default HorizontalBarSeriesCanvas;
}

declare module 'react-vis/es/plot/series/vertical-bar-series' {
  import {VerticalBarSeries} from 'react-vis';
  export default VerticalBarSeries;
}

declare module 'react-vis/es/plot/series/vertical-bar-series-canvas' {
  import {VerticalBarSeriesCanvas} from 'react-vis';
  export default VerticalBarSeriesCanvas;
}

declare module 'react-vis/es/plot/series/vertical-rect-series' {
  import {VerticalRectSeries} from 'react-vis';
  export default VerticalRectSeries;
}

declare module 'react-vis/es/plot/series/vertical-rect-series-canvas' {
  import {VerticalRectSeriesCanvas} from 'react-vis';
  export default VerticalRectSeriesCanvas;
}

declare module 'react-vis/es/plot/series/horizontal-rect-series' {
  import {HorizontalRectSeries} from 'react-vis';
  export default HorizontalRectSeries;
}

declare module 'react-vis/es/plot/series/horizontal-rect-series-canvas' {
  import {HorizontalRectSeriesCanvas} from 'react-vis';
  export default HorizontalRectSeriesCanvas;
}

declare module 'react-vis/es/plot/series/label-series' {
  import {LabelSeries} from 'react-vis';
  export default LabelSeries;
}

declare module 'react-vis/es/plot/series/polygon-series' {
  import {PolygonSeries} from 'react-vis';
  export default PolygonSeries;
}

declare module 'react-vis/es/plot/series/rect-series' {
  import {RectSeries} from 'react-vis';
  export default RectSeries;
}

declare module 'react-vis/es/plot/series/rect-series-canvas' {
  import {RectSeriesCanvas} from 'react-vis';
  export default RectSeriesCanvas;
}

declare module 'react-vis/es/plot/series/mark-series' {
  import {MarkSeries} from 'react-vis';
  export default MarkSeries;
}

declare module 'react-vis/es/plot/series/mark-series-canvas' {
  import {MarkSeriesCanvas} from 'react-vis';
  export default MarkSeriesCanvas;
}

declare module 'react-vis/es/plot/series/whisker-series' {
  import {WhiskerSeries} from 'react-vis';
  export default WhiskerSeries;
}

declare module 'react-vis/es/plot/series/heatmap-series' {
  import {HeatmapSeries} from 'react-vis';
  export default HeatmapSeries;
}

declare module 'react-vis/es/plot/series/hexbin-series' {
  import {HexbinSeries} from 'react-vis';
  export default HexbinSeries;
}

declare module 'react-vis/es/plot/series/contour-series' {
  import {ContourSeries} from 'react-vis';
  export default ContourSeries;
}

declare module 'react-vis/es/plot/series/custom-svg-series' {
  import {CustomSVGSeries} from 'react-vis';
  export default CustomSVGSeries;
}

declare module 'react-vis/es/plot/series/area-series' {
  import {AreaSeries} from 'react-vis';
  export default AreaSeries;
}

declare module 'react-vis/es/plot/series/arc-series' {
  import {ArcSeries} from 'react-vis';
  export default ArcSeries;
}

declare module 'react-vis/es/plot/series/line-mark-series' {
  import {LineMarkSeries} from 'react-vis';
  export default LineMarkSeries;
}

declare module 'react-vis/es/plot/series/line-mark-series-canvas' {
  import {LineMarkSeriesCanvas} from 'react-vis';
  export default LineMarkSeriesCanvas;
}

declare module 'react-vis/es/plot/hint' {
  import {Hint} from 'react-vis';
  export default Hint;
}

declare module 'react-vis/es/plot/borders' {
  import {Borders} from 'react-vis';
  export default Borders;
}

declare module 'react-vis/es/plot/crosshair' {
  import {Crosshair} from 'react-vis';
  export default Crosshair;
}

declare module 'react-vis/es/plot/xy-plot' {
  import {XYPlot} from 'react-vis';
  export default XYPlot;
}

declare module 'react-vis/es/plot/axis/decorative-axis' {
  import {DecorativeAxis} from 'react-vis';
  export default DecorativeAxis;
}

declare module 'react-vis/es/plot/axis/x-axis' {
  import {XAxis} from 'react-vis';
  export default XAxis;
}

declare module 'react-vis/es/plot/axis/y-axis' {
  import {YAxis} from 'react-vis';
  export default YAxis;
}

declare module 'react-vis/es/plot/circular-grid-lines' {
  import {CircularGridLines} from 'react-vis';
  export default CircularGridLines;
}

declare module 'react-vis/es/plot/grid-lines' {
  import {GridLines} from 'react-vis';
  export default GridLines;
}

declare module 'react-vis/es/plot/gradient-defs' {
  import {GradientDefs} from 'react-vis';
  export default GradientDefs;
}

declare module 'react-vis/es/plot/vertical-grid-lines' {
  import {VerticalGridLines} from 'react-vis';
  export default VerticalGridLines;
}

declare module 'react-vis/es/plot/horizontal-grid-lines' {
  import {HorizontalGridLines} from 'react-vis';
  export default HorizontalGridLines;
}

declare module 'react-vis/es/plot/voronoi' {
  import {Voronoi} from 'react-vis';
  export default Voronoi;
}

declare module 'react-vis/es/plot/highlight' {
  import {Highlight} from 'react-vis';
  export default Highlight;
}

declare module 'react-vis/es/legends/discrete-color-legend' {
  import {DiscreteColorLegend} from 'react-vis';
  export default DiscreteColorLegend;
}

declare module 'react-vis/es/legends/searchable-discrete-color-legend' {
  import {SearchableDiscreteColorLegend} from 'react-vis';
  export default SearchableDiscreteColorLegend;
}

declare module 'react-vis/es/legends/continuous-color-legend' {
  import {ContinuousColorLegend} from 'react-vis';
  export default ContinuousColorLegend;
}

declare module 'react-vis/es/legends/continuous-size-legend' {
  import {ContinuousSizeLegend} from 'react-vis';
  export default ContinuousSizeLegend;
}

declare module 'react-vis/es/treemap' {
  import {Treemap} from 'react-vis';
  export default Treemap;
}

declare module 'react-vis/es/radial-chart' {
  import {RadialChart} from 'react-vis';
  export default RadialChart;
}

declare module 'react-vis/es/radar-chart' {
  import {RadarChart} from 'react-vis';
  export default RadarChart;
}

declare module 'react-vis/es/parallel-coordinates' {
  import {ParallelCoordinates} from 'react-vis';
  export default ParallelCoordinates;
}

declare module 'react-vis/es/sankey' {
  import {Sankey} from 'react-vis';
  export default Sankey;
}

declare module 'react-vis/es/sunburst' {
  import {Sunburst} from 'react-vis';
  export default Sunburst;
}

declare module 'react-vis/es/utils/axis-utils' {
  import {AxisUtils} from 'react-vis';
  export default AxisUtils;
}

declare module 'react-vis/es/utils/scales-utils' {
  import {ScaleUtils} from 'react-vis';
  export default ScaleUtils;
}

declare module 'react-vis/es/make-vis-flexible' {
  export {
    FlexibleHeightXYPlot,
    FlexibleWidthXYPlot,
    FlexibleXYPlot,
    makeHeightFlexible,
    makeVisFlexible,
    makeWidthFlexible,
  } from 'react-vis';
}
