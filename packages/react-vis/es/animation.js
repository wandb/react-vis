function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { interpolate } from 'd3-interpolate';
import { spring, Motion, presets } from 'react-motion';
var ANIMATION_PROPTYPES = PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
  stiffness: PropTypes.number,
  nonAnimatedProps: PropTypes.arrayOf(PropTypes.string),
  damping: PropTypes.number
}), PropTypes.bool]);
var propTypes = {
  animatedProps: PropTypes.arrayOf(PropTypes.string).isRequired,
  animation: ANIMATION_PROPTYPES,
  onStart: PropTypes.func,
  onEnd: PropTypes.func
};
/**
 * Format the animation style object
 * @param {Object|String} animationStyle - The animation style property, either the name of a
 * presets are one of noWobble, gentle, wobbly, stiff
 */

function getAnimationStyle() {
  var animationStyle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : presets.noWobble;

  if (typeof animationStyle === 'string') {
    return presets[animationStyle] || presets.noWobble;
  }

  var damping = animationStyle.damping,
      stiffness = animationStyle.stiffness;
  return _objectSpread(_objectSpread({}, animationStyle), {}, {
    damping: damping || presets.noWobble.damping,
    stiffness: stiffness || presets.noWobble.stiffness
  });
}
/**
 * Extract the animated props from the entire props object.
 * @param {Object} props Props.
 * @returns {Object} Object of animated props.
 */


export function extractAnimatedPropValues(props) {
  var animatedProps = props.animatedProps,
      otherProps = _objectWithoutProperties(props, ["animatedProps"]);

  return animatedProps.reduce(function (result, animatedPropName) {
    if (Object.prototype.hasOwnProperty.call(otherProps, animatedPropName)) {
      result[animatedPropName] = otherProps[animatedPropName];
    }

    return result;
  }, {});
}

var Animation = /*#__PURE__*/function (_PureComponent) {
  _inherits(Animation, _PureComponent);

  var _super = _createSuper(Animation);

  function Animation(props) {
    var _this;

    _classCallCheck(this, Animation);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "_motionEndHandler", function () {
      if (_this.props.onEnd) {
        _this.props.onEnd();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_renderChildren", function (_ref) {
      var i = _ref.i;
      var children = _this.props.children;
      var interpolator = _this._interpolator;
      var child = React.Children.only(children);
      var interpolatedProps = interpolator ? interpolator(i) : interpolator; // interpolator doesnt play nice with deeply nested objected
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

      return React.cloneElement(child, _objectSpread(_objectSpread(_objectSpread({}, child.props), interpolatedProps), {}, {
        data: data || child.props.data || null,
        // enforce re-rendering
        _animation: Math.random()
      }));
    });

    _this._updateInterpolator(props);

    return _this;
  }

  _createClass(Animation, [{
    key: "UNSAFE_componentWillUpdate",
    value: function UNSAFE_componentWillUpdate(props) {
      this._updateInterpolator(this.props, props);

      if (props.onStart) {
        props.onStart();
      }
    }
  }, {
    key: "_updateInterpolator",

    /**
     * Update the interpolator function and assign it to this._interpolator.
     * @param {Object} oldProps Old props.
     * @param {Object} newProps New props.
     * @private
     */
    value: function _updateInterpolator(oldProps, newProps) {
      this._interpolator = interpolate(extractAnimatedPropValues(oldProps), newProps ? extractAnimatedPropValues(newProps) : null);
    }
  }, {
    key: "render",
    value: function render() {
      var animationStyle = getAnimationStyle(this.props.animation);
      var defaultStyle = {
        i: 0
      };
      var style = {
        i: spring(1, animationStyle)
      }; // In order to make Motion re-run animations each time, the random key is
      // always passed.
      // TODO: find a better solution for the spring.

      var key = Math.random();
      return /*#__PURE__*/React.createElement(Motion, _extends({
        defaultStyle: defaultStyle,
        style: style,
        key: key
      }, {
        onRest: this._motionEndHandler
      }), this._renderChildren);
    }
  }]);

  return Animation;
}(PureComponent);

Animation.propTypes = propTypes;
Animation.displayName = 'Animation';
export default Animation;
export var AnimationPropType = ANIMATION_PROPTYPES;