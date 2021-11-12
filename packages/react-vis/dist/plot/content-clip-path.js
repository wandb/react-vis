"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ContentClipPath;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ContentClipPath(props) {
  var _props$id = props.id,
      id = _props$id === void 0 ? 'content-area' : _props$id,
      innerWidth = props.innerWidth,
      innerHeight = props.innerHeight;
  return /*#__PURE__*/_react["default"].createElement("defs", null, /*#__PURE__*/_react["default"].createElement("clipPath", {
    id: id
  }, /*#__PURE__*/_react["default"].createElement("rect", {
    x: 0,
    y: 0,
    width: innerWidth,
    height: innerHeight
  })));
}

ContentClipPath.requiresSVG = true;
ContentClipPath.displayName = 'ContentClipPath';