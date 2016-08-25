'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pug = require('pug');

var _fs = require('fs');

var _path = require('path');

var _promisify = require('../modules/promisify');

var _promisify2 = _interopRequireDefault(_promisify);

var _setExtname = require('../modules/setExtname');

var _setExtname2 = _interopRequireDefault(_setExtname);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

const readFileWrapped = (0, _promisify2.default)(_fs.readFile);

const pugMiddleware = (base = process.cwd(), {
  extname = '.pug',
  options = {},
  locals = {}
} = {}) => (() => {
  var _ref = _asyncToGenerator(function* (ctx, next) {
    const {
      state: {
        extname: _extname
      },
      path
    } = ctx;
    if (_extname === extname) {
      const promise = readFileWrapped((0, _path.join)(base, path), {
        encoding: 'utf8'
      });
      const str = yield promise;
      ctx.body = (0, _pug.render)(str, options, locals);
      const extname = '.html';
      ctx.state.extname = extname;
      ctx.path = (0, _setExtname2.default)(ctx.path, extname);
    }
    yield next();
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

exports.default = pugMiddleware;