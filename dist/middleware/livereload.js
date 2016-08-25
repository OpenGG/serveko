'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tinyLr = require('tiny-lr');

var _tinyLr2 = _interopRequireDefault(_tinyLr);

var _gaze = require('gaze');

var _gaze2 = _interopRequireDefault(_gaze);

var _fs = require('fs');

var _promisify = require('../modules/promisify');

var _promisify2 = _interopRequireDefault(_promisify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

const promisifyStat = (0, _promisify2.default)(_fs.stat);

const middleware = (ctx, next) => (base = process.cwd(), {
  extname = '.html',
  port = 35729
} = {}) => {
  const lr = new _tinyLr2.default();

  lr.listen(port);

  (0, _gaze2.default)(base + '/**/*', (err, watcher) => {
    watcher.on('all', (() => {
      var _ref = _asyncToGenerator(function* (event, path) {
        const stat = yield promisifyStat(path);
        if (stat.size === 0) {
          return;
        }
        lr.changed({
          body: {
            files: escape(path)
          }
        });
      });

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    })());
  });

  return (() => {
    var _ref2 = _asyncToGenerator(function* (ctx, next) {
      yield next();
      const {
        state: {
          extname: _extname
        },
        path
      } = ctx;
      if (_extname === extname) {
        const snippet = `<!--livereload snippet --><script>document.write('<script src="http://" + (location.host||'localhost').split(':')[0] + ':${ port }/livereload.js?snipver=1"><\\/script>')</script>`;
        ctx.body += snippet;
      }
    });

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  })();
};

exports.default = middleware;