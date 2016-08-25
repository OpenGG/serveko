'use strict';

var _path = require('path');

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _opener = require('opener');

var _opener2 = _interopRequireDefault(_opener);

var _koaBasicAuth = require('koa-basic-auth');

var _koaBasicAuth2 = _interopRequireDefault(_koaBasicAuth);

var _koaFavicon = require('koa-favicon');

var _koaFavicon2 = _interopRequireDefault(_koaFavicon);

var _koaLogger = require('koa-logger');

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koaCompress = require('koa-compress');

var _koaCompress2 = _interopRequireDefault(_koaCompress);

var _extname = require('./middleware/extname');

var _extname2 = _interopRequireDefault(_extname);

var _babel = require('./middleware/babel');

var _babel2 = _interopRequireDefault(_babel);

var _pug = require('./middleware/pug');

var _pug2 = _interopRequireDefault(_pug);

var _stylus = require('./middleware/stylus');

var _stylus2 = _interopRequireDefault(_stylus);

var _livereload = require('./middleware/livereload');

var _livereload2 = _interopRequireDefault(_livereload);

var _exec = require('./middleware/exec');

var _exec2 = _interopRequireDefault(_exec);

var _serveIndex = require('./middleware/serve-index');

var _serveIndex2 = _interopRequireDefault(_serveIndex);

var _package = require('../package.json');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// CLI

// import cors from 'koa-cors';

/**
 * Module dependencies.
 */
_commander2.default.version(_package.version).usage('[options] dir').description('\tServe from directory dir').option('-a, --auth <user>:<pass>', 'specify basic auth credentials').option('-F, --format <fmt>', 'specify the log format string', 'dev').option('-p, --port <port>', 'specify the port [3000]', Number, 3000).option('-H, --hidden', 'enable hidden file serving').option('-b, --no-babel', 'disable babel rendering').option('-J, --no-pug', 'disable pug rendering').option('-S, --no-stylus', 'disable stylus rendering')
// .option('    --no-less', 'disable less css rendering')
.option('-o, --open', 'open with your browser').option('-I, --no-icons', 'disable icons').option('-L, --no-logs', 'disable request logging').option('-D, --no-dirs', 'disable directory serving').option('-f, --favicon <path>', 'serve the given favicon')
// .option('-C, --cors', 'allows cross origin access serving')
.option('    --compress', 'gzip or deflate the response').option('-R, --livereload', 'refresh your CSS (or page) with each save').option('    --exec <cmd>', 'execute command on each request').parse(process.argv);

// import less from 'koa-less';

if (_commander2.default.args.length === 0) {
  _commander2.default.help();
}

// base
const base = (0, _path.resolve)(_commander2.default.args[0]);

const getFilePath = path => (0, _path.join)(base, path);

// Setup the app
const app = new _koa2.default();

app.use((0, _extname2.default)());

// Basic auth
if (_commander2.default.auth) {
  const name = _commander2.default.auth.split(':')[0];
  const pass = _commander2.default.auth.split(':')[1];
  if (!name || !pass) throw new Error('user and pass required');
  app.use((0, _koaBasicAuth2.default)({
    name,
    pass
  }));
}

// Ignore favicon
app.use((0, _koaFavicon2.default)(_commander2.default.favicon));

// Logger
if (_commander2.default.logs) app.use((0, _koaLogger2.default)(_commander2.default.format));

// Babel
if (_commander2.default.babel) {
  app.use((0, _babel2.default)(base, {
    extname: '.jsx'
  }));
}

// pug
if (_commander2.default.pug) {
  app.use((0, _pug2.default)(base, {
    extname: '.pug'
  }));
}

// stylus
if (_commander2.default.stylus) {
  app.use((0, _stylus2.default)(base, {
    extname: '.styl'
  }));
}

// Less
// if (program.less) {
//   app.use(less(base))
// }

// CORS access for files
// if (program.cors) {
//   app.use(cors());
// }

// Compression
if (_commander2.default.compress) {
  app.use((0, _koaCompress2.default)());
}

// Livereload
if (_commander2.default.livereload) {
  const port = 35729;
  app.use(livereloadlivereload(base, {
    port
  }));
}

// Exec command
const command = _commander2.default.exec;
if (command) {
  app.use((0, _exec2.default)(command));
}

// Static files
app.use((0, _koaStatic2.default)(base, {
  hidden: _commander2.default.hidden
}));

// Directory serving
if (_commander2.default.dirs) {
  app.use((0, _serveIndex2.default)(base, {
    hidden: _commander2.default.hidden,
    icons: _commander2.default.icons
  }));
}

// Start the app
app.listen(_commander2.default.port, function () {
  console.log('Serving %s on port %s', _chalk2.default.green(base), _chalk2.default.green(String(_commander2.default.port)));
  if (_commander2.default.open) (0, _opener2.default)('http://localhost' + ':' + _commander2.default.port);
});