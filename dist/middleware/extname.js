'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

const extnameMiddleware = () => (() => {
  var _ref = _asyncToGenerator(function* (ctx, next) {
    ctx.state.extname = (0, _path.extname)(ctx.path);
    yield next();
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();
exports.default = extnameMiddleware;