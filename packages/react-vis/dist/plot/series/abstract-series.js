"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _d3Voronoi = require("d3-voronoi");

var _react = require("react");

var _animation = require("../../animation");

var _scalesUtils = require("../../utils/scales-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var propTypes = _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, (0, _scalesUtils.getScalePropTypesByAttribute)('x')), (0, _scalesUtils.getScalePropTypesByAttribute)('y')), (0, _scalesUtils.getScalePropTypesByAttribute)('size')), (0, _scalesUtils.getScalePropTypesByAttribute)('opacity')), (0, _scalesUtils.getScalePropTypesByAttribute)('color')), {}, {
  width: _propTypes["default"].number,
  height: _propTypes["default"].number,
  data: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].array])),
  onValueMouseOver: _propTypes["default"].func,
  onValueMouseOut: _propTypes["default"].func,
  onValueClick: _propTypes["default"].func,
  onValueRightClick: _propTypes["default"].func,
  onSeriesMouseOver: _propTypes["default"].func,
  onSeriesMouseOut: _propTypes["default"].func,
  onSeriesClick: _propTypes["default"].func,
  onSeriesRightClick: _propTypes["default"].func,
  onNearestX: _propTypes["default"].func,
  onNearestXY: _propTypes["default"].func,
  style: _propTypes["default"].object,
  animation: _animation.AnimationPropType,
  stack: _propTypes["default"].bool
});

var defaultProps = {
  className: '',
  stack: false,
  style: {}
};

var AbstractSeries = /*#__PURE__*/function (_PureComponent) {
  _inherits(AbstractSeries, _PureComponent);

  var _super = _createSuper(AbstractSeries);

  function AbstractSeries() {
    var _this;

    _classCallCheck(this, AbstractSeries);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_seriesClickHandler", function (event) {
      var onSeriesClick = _this.props.onSeriesClick;

      if (onSeriesClick) {
        onSeriesClick({
          event: event
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_seriesMouseOutHandler", function (event) {
      var onSeriesMouseOut = _this.props.onSeriesMouseOut;

      if (onSeriesMouseOut) {
        onSeriesMouseOut({
          event: event
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_seriesMouseOverHandler", function (event) {
      var onSeriesMouseOver = _this.props.onSeriesMouseOver;

      if (onSeriesMouseOver) {
        onSeriesMouseOver({
          event: event
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_seriesRightClickHandler", function (event) {
      var onSeriesRightClick = _this.props.onSeriesRightClick;

      if (onSeriesRightClick) {
        onSeriesRightClick({
          event: event
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_valueClickHandler", function (d, event) {
      var _this$props = _this.props,
          onValueClick = _this$props.onValueClick,
          onSeriesClick = _this$props.onSeriesClick;

      if (onValueClick) {
        onValueClick(d, {
          event: event
        });
      }

      if (onSeriesClick) {
        onSeriesClick({
          event: event
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_valueMouseOutHandler", function (d, event) {
      var _this$props2 = _this.props,
          onValueMouseOut = _this$props2.onValueMouseOut,
          onSeriesMouseOut = _this$props2.onSeriesMouseOut;

      if (onValueMouseOut) {
        onValueMouseOut(d, {
          event: event
        });
      }

      if (onSeriesMouseOut) {
        onSeriesMouseOut({
          event: event
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_valueMouseOverHandler", function (d, event) {
      var _this$props3 = _this.props,
          onValueMouseOver = _this$props3.onValueMouseOver,
          onSeriesMouseOver = _this$props3.onSeriesMouseOver;

      if (onValueMouseOver) {
        onValueMouseOver(d, {
          event: event
        });
      }

      if (onSeriesMouseOver) {
        onSeriesMouseOver({
          event: event
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_valueRightClickHandler", function (d, event) {
      var _this$props4 = _this.props,
          onValueRightClick = _this$props4.onValueRightClick,
          onSeriesRightClick = _this$props4.onSeriesRightClick;

      if (onValueRightClick) {
        onValueRightClick(d, {
          event: event
        });
      }

      if (onSeriesRightClick) {
        onSeriesRightClick({
          event: event
        });
      }
    });

    return _this;
  }

  _createClass(AbstractSeries, [{
    key: "onParentMouseMove",
    value: function onParentMouseMove(event) {
      var _this$props5 = this.props,
          onNearestX = _this$props5.onNearestX,
          onNearestXY = _this$props5.onNearestXY,
          data = _this$props5.data;

      if (!onNearestX && !onNearestXY || !data) {
        return;
      }

      if (onNearestXY) {
        this._handleNearestXY(event);
      } else {
        this._handleNearestX(event);
      }
    }
  }, {
    key: "onParentTouchMove",
    value: function onParentTouchMove(e) {
      e.preventDefault();
      this.onParentMouseMove(e);
    }
  }, {
    key: "onParentTouchStart",
    value: function onParentTouchStart(e) {
      // prevent mouse event emulation
      e.preventDefault();
    }
    /**
     * Get the attr0 functor.
     * @param {string} attr Attribute name.
     * @returns {*} Functor.
     * @private
     */

  }, {
    key: "_getAttr0Functor",
    value: function _getAttr0Functor(attr) {
      return (0, _scalesUtils.getAttr0Functor)(this.props, attr);
    }
    /**
     * Get attribute functor.
     * @param {string} attr Attribute name
     * @returns {*} Functor.
     * @protected
     */

  }, {
    key: "_getAttributeFunctor",
    value: function _getAttributeFunctor(attr) {
      return (0, _scalesUtils.getAttributeFunctor)(this.props, attr);
    }
    /**
     * Get the attribute value if it is available.
     * @param {string} attr Attribute name.
     * @returns {*} Attribute value if available, fallback value or undefined
     * otherwise.
     * @protected
     */

  }, {
    key: "_getAttributeValue",
    value: function _getAttributeValue(attr) {
      return (0, _scalesUtils.getAttributeValue)(this.props, attr);
    }
    /**
     * Get the scale object distance by the attribute from the list of properties.
     * @param {string} attr Attribute name.
     * @returns {number} Scale distance.
     * @protected
     */

  }, {
    key: "_getScaleDistance",
    value: function _getScaleDistance(attr) {
      var scaleObject = (0, _scalesUtils.getScaleObjectFromProps)(this.props, attr);
      return scaleObject ? scaleObject.distance : 0;
    }
  }, {
    key: "_getXYCoordinateInContainer",
    value: function _getXYCoordinateInContainer(event) {
      var _this$props6 = this.props,
          _this$props6$marginTo = _this$props6.marginTop,
          marginTop = _this$props6$marginTo === void 0 ? 0 : _this$props6$marginTo,
          _this$props6$marginLe = _this$props6.marginLeft,
          marginLeft = _this$props6$marginLe === void 0 ? 0 : _this$props6$marginLe;
      var evt = event.nativeEvent,
          currentTarget = event.currentTarget;
      var rect = currentTarget.getBoundingClientRect();
      var x = evt.clientX;
      var y = evt.clientY;

      if (evt.type === 'touchmove') {
        x = evt.touches[0].pageX;
        y = evt.touches[0].pageY;
      }

      return {
        x: x - rect.left - currentTarget.clientLeft - marginLeft,
        y: y - rect.top - currentTarget.clientTop - marginTop
      };
    }
  }, {
    key: "_handleNearestX",
    value: function _handleNearestX(event) {
      var _this$props7 = this.props,
          onNearestX = _this$props7.onNearestX,
          data = _this$props7.data;
      var minDistance = Number.POSITIVE_INFINITY;
      var value = null;
      var valueIndex = null;

      var coordinate = this._getXYCoordinateInContainer(event);

      var xScaleFn = this._getAttributeFunctor('x');

      data.forEach(function (item, i) {
        var currentCoordinate = xScaleFn(item);
        var newDistance = Math.abs(coordinate.x - currentCoordinate);

        if (newDistance < minDistance) {
          minDistance = newDistance;
          value = item;
          valueIndex = i;
        }
      });

      if (!value) {
        return;
      }

      onNearestX(value, {
        innerX: xScaleFn(value),
        index: valueIndex,
        event: event.nativeEvent
      });
    }
  }, {
    key: "_handleNearestXY",
    value: function _handleNearestXY(event) {
      var _this$props8 = this.props,
          onNearestXY = _this$props8.onNearestXY,
          data = _this$props8.data;

      var coordinate = this._getXYCoordinateInContainer(event);

      var xScaleFn = this._getAttributeFunctor('x');

      var yScaleFn = this._getAttributeFunctor('y'); // Create a voronoi with each node center points


      var voronoiInstance = (0, _d3Voronoi.voronoi)().x(xScaleFn).y(yScaleFn);
      var foundPoint = voronoiInstance(data).find(coordinate.x, coordinate.y);
      var value = foundPoint.data;

      if (!value) {
        return;
      }

      onNearestXY(value, {
        innerX: foundPoint[0],
        innerY: foundPoint[1],
        index: foundPoint.index,
        event: event.nativeEvent
      });
    }
    /**
     * Click handler for the entire series.
     * @param {Object} event Event.
     * @protected
     */

  }], [{
    key: "getParentConfig",

    /**
     * Get a default config for the parent.
     * @returns {Object} Empty config.
     */
    value: function getParentConfig() {
      return {};
    }
    /**
     * Tells the rest of the world that it requires SVG to work.
     * @returns {boolean} Result.
     */

  }, {
    key: "requiresSVG",
    get: function get() {
      return true;
    }
  }]);

  return AbstractSeries;
}(_react.PureComponent);

AbstractSeries.displayName = 'AbstractSeries';
AbstractSeries.propTypes = propTypes;
AbstractSeries.defaultProps = defaultProps;
var _default = AbstractSeries;
exports["default"] = _default;