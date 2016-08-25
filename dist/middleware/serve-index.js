'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _serveIndex = require('serve-index');

var _serveIndex2 = _interopRequireDefault(_serveIndex);

var _promisify = require('../modules/promisify');

var _promisify2 = _interopRequireDefault(_promisify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

exports.default = (...args) => {
  const index = (0, _serveIndex2.default)(...args);
  const promisifyIndex = (0, _promisify2.default)(index);
  return (() => {
    var _ref = _asyncToGenerator(function* (ctx, next) {
      yield next();
      const {
        status,
        req,
        res
      } = ctx;
      if (status === 404) {
        ctx.status = 200;
        yield promisifyIndex(ctx.req, ctx.res);
      }
    });

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  })();
};