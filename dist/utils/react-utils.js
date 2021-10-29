"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warning = warning;
exports.warnOnce = warnOnce;
exports.getDOMNode = exports.isReactDOMSupported = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _React$version$split = _react["default"].version.split('.'),
    _React$version$split2 = _slicedToArray(_React$version$split, 2),
    major = _React$version$split2[0],
    minor = _React$version$split2[1];

var versionHigherThanThirteen = Number(minor) > 13 || Number(major) > 13;

var isReactDOMSupported = function isReactDOMSupported() {
  return versionHigherThanThirteen;
};
/**
 * Support React 0.13 and greater where refs are React components, not DOM
 * nodes.
 * @param {*} ref React's ref.
 * @returns {Element} DOM element.
 */


exports.isReactDOMSupported = isReactDOMSupported;

var getDOMNode = function getDOMNode(ref) {
  if (!isReactDOMSupported()) {
    return ref && ref.getDOMNode();
  }

  return ref;
};

exports.getDOMNode = getDOMNode;
var USED_MESSAGES = {};
var HIDDEN_PROCESSES = {
  test: true,
  production: true
};
/**
 * Warn the user about something
 * @param {String} message - the message to be shown
 * @param {Boolean} onlyShowMessageOnce - whether or not we allow the
 - message to be show multiple times
 */

function warning(message) {
  var onlyShowMessageOnce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  /* eslint-disable no-undef, no-process-env */
  if (global.process && HIDDEN_PROCESSES[process.env.NODE_ENV]) {
    return;
  }
  /* eslint-enable no-undef, no-process-env */


  if (!onlyShowMessageOnce || !USED_MESSAGES[message]) {
    /* eslint-disable no-console */
    console.warn(message);
    /* eslint-enable no-console */

    USED_MESSAGES[message] = true;
  }
}
/**
 * Convience wrapper for warning
 * @param {String} message - the message to be shown
 */


function warnOnce(message) {
  warning(message, true);
}