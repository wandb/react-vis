"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.AnimationPropType = void 0;
exports.extractAnimatedPropValues = extractAnimatedPropValues;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _d3Interpolate = require("d3-interpolate");
var _reactMotion = require("react-motion");
var _excluded = ["animatedProps"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ANIMATION_PROPTYPES = _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].shape({
  stiffness: _propTypes["default"].number,
  nonAnimatedProps: _propTypes["default"].arrayOf(_propTypes["default"].string),
  damping: _propTypes["default"].number
}), _propTypes["default"].bool]);
var propTypes = {
  animatedProps: _propTypes["default"].arrayOf(_propTypes["default"].string).isRequired,
  animation: ANIMATION_PROPTYPES,
  onStart: _propTypes["default"].func,
  onEnd: _propTypes["default"].func
};

/**
 * Format the animation style object
 * @param {Object|String} animationStyle - The animation style property, either the name of a
 * presets are one of noWobble, gentle, wobbly, stiff
 */
function getAnimationStyle() {
  var animationStyle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _reactMotion.presets.noWobble;
  if (typeof animationStyle === 'string') {
    return _reactMotion.presets[animationStyle] || _reactMotion.presets.noWobble;
  }
  var damping = animationStyle.damping,
    stiffness = animationStyle.stiffness;
  return _objectSpread(_objectSpread({}, animationStyle), {}, {
    damping: damping || _reactMotion.presets.noWobble.damping,
    stiffness: stiffness || _reactMotion.presets.noWobble.stiffness
  });
}

/**
 * Extract the animated props from the entire props object.
 * @param {Object} props Props.
 * @returns {Object} Object of animated props.
 */
function extractAnimatedPropValues(props) {
  var animatedProps = props.animatedProps,
    otherProps = _objectWithoutProperties(props, _excluded);
  return animatedProps.reduce(function (result, animatedPropName) {
    if (Object.prototype.hasOwnProperty.call(otherProps, animatedPropName)) {
      result[animatedPropName] = otherProps[animatedPropName];
    }
    return result;
  }, {});
}
var Animation = /*#__PURE__*/function (_PureComponent) {
  function Animation(props) {
    var _this;
    _classCallCheck(this, Animation);
    _this = _callSuper(this, Animation, [props]);
    _defineProperty(_this, "_motionEndHandler", function () {
      if (_this.props.onEnd) {
        _this.props.onEnd();
      }
    });
    /**
     * Render the child into the parent.
     * @param {Number} i Number generated by the spring.
     * @returns {React.Component} Rendered react element.
     * @private
     */
    _defineProperty(_this, "_renderChildren", function (_ref) {
      var i = _ref.i;
      var children = _this.props.children;
      var interpolator = _this._interpolator;
      var child = _react["default"].Children.only(children);
      var interpolatedProps = interpolator ? interpolator(i) : interpolator;

      // interpolator doesnt play nice with deeply nested objected
      // so we expose an additional prop for situations like these, soit _data,
      // which stores the full tree and can be recombined with the sanitized version
      // after interpolation
      var data = interpolatedProps && interpolatedProps.data || null;
      if (data && child.props._data) {
        data = data.map(function (row, index) {
          var correspondingCell = child.props._data[index];
          return _objectSpread(_objectSpread({}, row), {}, {
            parent: correspondingCell.parent,
            children: correspondingCell.children
          });
        });
      }
      return /*#__PURE__*/_react["default"].cloneElement(child, _objectSpread(_objectSpread(_objectSpread({}, child.props), interpolatedProps), {}, {
        data: data || child.props.data || null,
        // enforce re-rendering
        _animation: Math.random()
      }));
    });
    _this._updateInterpolator(props);
    return _this;
  }
  _inherits(Animation, _PureComponent);
  return _createClass(Animation, [{
    key: "UNSAFE_componentWillUpdate",
    value: function UNSAFE_componentWillUpdate(props) {
      this._updateInterpolator(this.props, props);
      if (props.onStart) {
        props.onStart();
      }
    }
  }, {
    key: "_updateInterpolator",
    value:
    /**
     * Update the interpolator function and assign it to this._interpolator.
     * @param {Object} oldProps Old props.
     * @param {Object} newProps New props.
     * @private
     */
    function _updateInterpolator(oldProps, newProps) {
      this._interpolator = (0, _d3Interpolate.interpolate)(extractAnimatedPropValues(oldProps), newProps ? extractAnimatedPropValues(newProps) : null);
    }
  }, {
    key: "render",
    value: function render() {
      var animationStyle = getAnimationStyle(this.props.animation);
      var defaultStyle = {
        i: 0
      };
      var style = {
        i: (0, _reactMotion.spring)(1, animationStyle)
      };
      // In order to make Motion re-run animations each time, the random key is
      // always passed.
      // TODO: find a better solution for the spring.
      var key = Math.random();
      return /*#__PURE__*/_react["default"].createElement(_reactMotion.Motion, {
        defaultStyle: defaultStyle,
        style: style,
        key: key,
        onRest: this._motionEndHandler
      }, this._renderChildren);
    }
  }]);
}(_react.PureComponent);
Animation.propTypes = propTypes;
Animation.displayName = 'Animation';
var _default = exports["default"] = Animation;
var AnimationPropType = exports.AnimationPropType = ANIMATION_PROPTYPES;