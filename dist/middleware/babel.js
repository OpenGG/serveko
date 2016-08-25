'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _babelCore = require('babel-core');

var _babelPresetEs = require('babel-preset-es2015');

var _babelPresetEs2 = _interopRequireDefault(_babelPresetEs);

var _babelPresetEs3 = require('babel-preset-es2016');

var _babelPresetEs4 = _interopRequireDefault(_babelPresetEs3);

var _babelPresetStage = require('babel-preset-stage-0');

var _babelPresetStage2 = _interopRequireDefault(_babelPresetStage);

var _promisify = require('../modules/promisify');

var _promisify2 = _interopRequireDefault(_promisify);

var _setExtname = require('../modules/setExtname');

var _setExtname2 = _interopRequireDefault(_setExtname);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

const transformFileWrapped = (0, _promisify2.default)(_babelCore.transformFile);

const babelMiddleware = (base = process.cwd(), {
  extname = '.es6',
  presets = [_babelPresetEs2.default, _babelPresetEs4.default, _babelPresetStage2.default]
} = {}) => (() => {
  var _ref = _asyncToGenerator(function* (ctx, next) {
    const {
      state: {
        extname: _extname
      },
      path
    } = ctx;
    if (_extname === extname) {
      const code = (yield transformFileWrapped((0, _path.join)(base, path), {
        ast: false,
        presets
      })).code;
      ctx.body = code;
      const extname = '.js';
      ctx.state.extname = extname;
      ctx.path = (0, _setExtname2.default)(ctx.path, extname);
    }
    yield next();
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

exports.default = babelMiddleware;