import React from 'react';
export default function ContentClipPath(props) {
  var _props$id = props.id,
      id = _props$id === void 0 ? 'content-area' : _props$id,
      innerWidth = props.innerWidth,
      innerHeight = props.innerHeight;
  return /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("clipPath", {
    id: id
  }, /*#__PURE__*/React.createElement("rect", {
    x: 0,
    y: 0,
    width: innerWidth,
    height: innerHeight
  })));
}
ContentClipPath.requiresSVG = true;
ContentClipPath.displayName = 'ContentClipPath';