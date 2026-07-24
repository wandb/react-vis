"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlexibleXYPlot = exports.FlexibleWidthXYPlot = exports.FlexibleHeightXYPlot = void 0;
exports.makeHeightFlexible = makeHeightFlexible;
exports.makeVisFlexible = makeVisFlexible;
exports.makeWidthFlexible = makeWidthFlexible;
var _react = _interopRequireDefault(require("react"));
var _window = _interopRequireDefault(require("global/window"));
var _xyPlot = _interopRequireDefault(require("./plot/xy-plot"));
var _reactUtils = require("./utils/react-utils");
var _excluded = ["height", "width"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // Copyright (c) 2016 - 2017 Uber Technologies, Inc.
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
var CONTAINER_REF = 'container';

// As a performance enhancement, we want to only listen once
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
  resizeSubscribers.push(cb);

  // if we go from zero to one Flexible components instances, add the listener
  if (resizeSubscribers.length === 1) {
    _window["default"].addEventListener('resize', debounceEmitResize);
  }
  return function unsubscribe() {
    removeSubscriber(cb);

    // if we have no Flexible components, remove the listener
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
  var ResultClass = /*#__PURE__*/function (_React$Component) {
    function ResultClass(props) {
      var _this;
      _classCallCheck(this, ResultClass);
      _this = _callSuper(this, ResultClass, [props]);
      /**
       * Get the width of the container and assign the width.
       * @private
       */
      _defineProperty(_this, "_onResize", function () {
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
    _inherits(ResultClass, _React$Component);
    return _createClass(ResultClass, [{
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
    }], [{
      key: "propTypes",
      get: function get() {
        var _Component$propTypes = Component.propTypes,
          height = _Component$propTypes.height,
          width = _Component$propTypes.width,
          otherPropTypes = _objectWithoutProperties(_Component$propTypes, _excluded); // eslint-disable-line no-unused-vars
        return otherPropTypes;
      }
    }]);
  }(_react["default"].Component);
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
var FlexibleWidthXYPlot = exports.FlexibleWidthXYPlot = makeWidthFlexible(_xyPlot["default"]);
var FlexibleHeightXYPlot = exports.FlexibleHeightXYPlot = makeHeightFlexible(_xyPlot["default"]);
var FlexibleXYPlot = exports.FlexibleXYPlot = makeVisFlexible(_xyPlot["default"]);