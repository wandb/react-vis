"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _d3Color = require("d3-color");

var _theme = require("../../theme");

var _scalesUtils = require("../../utils/scales-utils");

var _seriesUtils = require("../../utils/series-utils");

var _abstractSeries = _interopRequireDefault(require("./abstract-series"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

function getScaleDistance(props, attr) {
  var scaleObject = (0, _scalesUtils.getScaleObjectFromProps)(props, attr);
  return scaleObject ? scaleObject.distance : 0;
}

var BarSeriesCanvas = /*#__PURE__*/function (_AbstractSeries) {
  _inherits(BarSeriesCanvas, _AbstractSeries);

  var _super = _createSuper(BarSeriesCanvas);

  function BarSeriesCanvas() {
    _classCallCheck(this, BarSeriesCanvas);

    return _super.apply(this, arguments);
  }

  _createClass(BarSeriesCanvas, [{
    key: "render",
    value: function render() {
      return null;
    }
  }], [{
    key: "renderLayer",
    value: function renderLayer(props, ctx) {
      var data = props.data,
          linePosAttr = props.linePosAttr,
          lineSizeAttr = props.lineSizeAttr,
          valuePosAttr = props.valuePosAttr,
          marginTop = props.marginTop,
          marginBottom = props.marginBottom;

      if (!data || data.length === 0) {
        return;
      }

      var distance = getScaleDistance(props, linePosAttr);
      var line = (0, _scalesUtils.getAttributeFunctor)(props, linePosAttr);
      var value = (0, _scalesUtils.getAttributeFunctor)(props, valuePosAttr);
      var value0 = (0, _scalesUtils.getAttr0Functor)(props, valuePosAttr);
      var fill = (0, _scalesUtils.getAttributeFunctor)(props, 'fill') || (0, _scalesUtils.getAttributeFunctor)(props, 'color');
      var stroke = (0, _scalesUtils.getAttributeFunctor)(props, 'stroke') || (0, _scalesUtils.getAttributeFunctor)(props, 'color');
      var opacity = (0, _scalesUtils.getAttributeFunctor)(props, 'opacity');
      var halfSpace = distance / 2 * 0.85; // totalSpaceAvailable is the space we have available to draw all the
      // bars of a same 'linePosAttr' value (a.k.a. sameTypeTotal)

      var totalSpaceAvailable = halfSpace * 2;

      var _getStackParams = (0, _seriesUtils.getStackParams)(props),
          sameTypeTotal = _getStackParams.sameTypeTotal,
          sameTypeIndex = _getStackParams.sameTypeIndex;

      data.forEach(function (row) {
        var totalSpaceCenter = line(row); // totalSpaceStartingPoint is the first pixel were we can start drawing

        var totalSpaceStartingPoint = totalSpaceCenter - halfSpace; // spaceTakenByInterBarsPixels has the overhead space consumed by each bar of sameTypeTotal

        var spaceTakenByInterBarsPixels = (sameTypeTotal - 1) / sameTypeTotal; // lineSize is the space we have available to draw sameTypeIndex bar

        var lineSize = totalSpaceAvailable / sameTypeTotal - spaceTakenByInterBarsPixels;
        var fillColor = (0, _d3Color.rgb)(fill(row));
        var strokeColor = (0, _d3Color.rgb)(stroke(row));

        var rowOpacity = opacity(row) || _theme.DEFAULT_OPACITY; // linePos is the first pixel were we can start drawing sameTypeIndex bar


        var linePos = totalSpaceStartingPoint + lineSize * sameTypeIndex + sameTypeIndex;
        var valuePos = Math.min(value0(row), value(row));
        var x = valuePosAttr === 'x' ? valuePos : linePos;
        var y = valuePosAttr === 'y' ? valuePos : linePos;
        var valueSize = Math.abs(-value0(row) + value(row));
        var height = lineSizeAttr === 'height' ? lineSize : valueSize;
        var width = lineSizeAttr === 'width' ? lineSize : valueSize;
        ctx.beginPath();
        ctx.rect(x + marginBottom, y + marginTop, width, height);
        ctx.fillStyle = "rgba(".concat(fillColor.r, ", ").concat(fillColor.g, ", ").concat(fillColor.b, ", ").concat(rowOpacity, ")");
        ctx.fill();
        ctx.strokeStyle = "rgba(".concat(strokeColor.r, ", ").concat(strokeColor.g, ", ").concat(strokeColor.b, ", ").concat(rowOpacity, ")");
        ctx.stroke();
      });
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

  return BarSeriesCanvas;
}(_abstractSeries["default"]);

BarSeriesCanvas.displayName = 'BarSeriesCanvas';
BarSeriesCanvas.defaultProps = _objectSpread(_objectSpread({}, _abstractSeries["default"].defaultProps), {}, {
  linePosAttr: _propTypes["default"].string.isRequired,
  valuePosAttr: _propTypes["default"].string.isRequired,
  lineSizeAttr: _propTypes["default"].string.isRequired,
  valueSizeAttr: _propTypes["default"].string.isRequired
});
BarSeriesCanvas.propTypes = _objectSpread({}, _abstractSeries["default"].propTypes);
var _default = BarSeriesCanvas;
exports["default"] = _default;