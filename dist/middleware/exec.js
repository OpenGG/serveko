'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _child_process = require('child_process');

var _promisify = require('../modules/promisify');

var _promisify2 = _interopRequireDefault(_promisify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

const promisifyExec = (0, _promisify2.default)(_child_process.exec);

exports.default = command => (() => {
  var _ref = _asyncToGenerator(function* (ctx, next) {
    yield promisifyExec(command);
    yield next();
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();