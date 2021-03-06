'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = (path, extname) => {
  const index = path.lastIndexOf('.');
  if (index === -1) {
    return path + extname;
  } else {
    return path.slice(0, index) + extname;
  }
};