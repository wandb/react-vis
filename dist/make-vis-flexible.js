"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeHeightFlexible = makeHeightFlexible;
exports.makeVisFlexible = makeVisFlexible;
exports.makeWidthFlexible = makeWidthFlexible;
exports.FlexibleXYPlot = exports.FlexibleHeightXYPlot = exports.FlexibleWidthXYPlot = void 0;

var _react = _interopRequireDefault(require("react"));

var _window = _interopRequireDefault(require("global/window"));

var _xyPlot = _interopRequireDefault(require("./plot/xy-plot"));

var _reactUtils = require("./utils/react-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CONTAINER_REF = 'container'; // As a performance enhancement, we want to only listen once

var resizeSubscribers = [];
var DEBOUNCE_DURATION = 100;
var timeoutId = null;
/**
 * Calls each subscriber, debounced to the
 */

function debounceEmitResize() {
  _window["default"].clearTimeout(timeoutId);

  timeoutId = _window["default"].setTimeout(emitResize, DEBOUNCE_DURATION);
}
/**
 * Calls each subscriber once syncronously.
 */


function emitResize() {
  resizeSubscribers.forEach(function (cb) {
    return cb();
  });
}
/**
 * Add the given callback to the list of subscribers to be caled when the
 * window resizes. Returns a function that, when called, removes the given
 * callback from the list of subscribers. This function is also resposible for
 * adding and removing the resize listener on `window`.
 *
 * @param {Function} cb - Subscriber callback function
 * @returns {Function} Unsubscribe function
 */


function subscribeToDebouncedResize(cb) {
  resizeSubscribers.push(cb); // if we go from zero to one Flexible components instances, add the listener

  if (resizeSubscribers.length === 1) {
    _window["default"].addEventListener('resize', debounceEmitResize);
  }

  return function unsubscribe() {
    removeSubscriber(cb); // if we have no Flexible components, remove the listener

    if (resizeSubscribers.length === 0) {
      _window["default"].clearTimeout(timeoutId);

      _window["default"].removeEventListener('resize', debounceEmitResize);
    }
  };
}
/**
 * Helper for removing the given callback from the list of subscribers.
 *
 * @param {Function} cb - Subscriber callback function
 */


function removeSubscriber(cb) {
  var index = resizeSubscribers.indexOf(cb);

  if (index > -1) {
    resizeSubscribers.splice(index, 1);
  }
}
/**
 * Helper for getting a display name for the child component
 * @param {*} Component React class for the child component.
 * @returns {String} The child components name
 */


function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}
/**
 * Add the ability to stretch the visualization on window resize.
 * @param {*} Component React class for the child component.
 * @returns {*} Flexible component.
 */


function makeFlexible(Component, isWidthFlexible, isHeightFlexible) {
  var _temp;

  var ResultClass = (_temp = /*#__PURE__*/function (_React$Component) {
    _inherits(ResultClass, _React$Component);

    var _super = _createSuper(ResultClass);

    _createClass(ResultClass, null, [{
      key: "propTypes",
      get: function get() {
        var _Component$propTypes = Component.propTypes,
            height = _Component$propTypes.height,
            width = _Component$propTypes.width,
            otherPropTypes = _objectWithoutProperties(_Component$propTypes, ["height", "width"]); // eslint-disable-line no-unused-vars


        return otherPropTypes;
      }
    }]);

    function ResultClass(props) {
      var _this;

      _classCallCheck(this, ResultClass);

      _this = _super.call(this, props);

      _defineProperty(_assertThisInitialized(_this), "_onResize", function () {
        var containerElement = (0, _reactUtils.getDOMNode)(_this[CONTAINER_REF]);
        var offsetHeight = containerElement.offsetHeight,
            offsetWidth = containerElement.offsetWidth;
        var newHeight = _this.state.height === offsetHeight ? {} : {
          height: offsetHeight
        };
        var newWidth = _this.state.width === offsetWidth ? {} : {
          width: offsetWidth
        };

        _this.setState(_objectSpread(_objectSpread({}, newHeight), newWidth));
      });

      _this.state = {
        height: null,
        width: null
      };
      return _this;
    }
    /**
     * Get the width of the container and assign the width.
     * @private
     */


    _createClass(ResultClass, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this._onResize();

        this.cancelSubscription = subscribeToDebouncedResize(this._onResize);
      }
    }, {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps() {
        this._onResize();
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.cancelSubscription();
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var _this$state = this.state,
            height = _this$state.height,
            width = _this$state.width;

        var props = _objectSpread(_objectSpread({}, this.props), {}, {
          animation: height === null && width === null ? null : this.props.animation
        });

        var updatedDimensions = _objectSpread(_objectSpread({}, isHeightFlexible ? {
          height: height
        } : {}), isWidthFlexible ? {
          width: width
        } : {});

        return /*#__PURE__*/_react["default"].createElement("div", {
          ref: function ref(_ref) {
            return _this2[CONTAINER_REF] = _ref;
          },
          style: {
            width: '100%',
            height: '100%'
          }
        }, this.state.height === null || this.state.width === null ? null : /*#__PURE__*/_react["default"].createElement(Component, _extends({}, updatedDimensions, props)));
      }
    }]);

    return ResultClass;
  }(_react["default"].Component), _temp);
  ResultClass.displayName = "Flexible".concat(getDisplayName(Component));
  return ResultClass;
}

function makeHeightFlexible(component) {
  return makeFlexible(component, false, true);
}

function makeVisFlexible(component) {
  return makeFlexible(component, true, true);
}

function makeWidthFlexible(component) {
  return makeFlexible(component, true, false);
}

var FlexibleWidthXYPlot = makeWidthFlexible(_xyPlot["default"]);
exports.FlexibleWidthXYPlot = FlexibleWidthXYPlot;
var FlexibleHeightXYPlot = makeHeightFlexible(_xyPlot["default"]);
exports.FlexibleHeightXYPlot = FlexibleHeightXYPlot;
var FlexibleXYPlot = makeVisFlexible(_xyPlot["default"]);
exports.FlexibleXYPlot = FlexibleXYPlot;