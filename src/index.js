/**
 * Module dependencies.
 */
import { resolve, join } from 'path';
import URL from 'url';
import fs from 'fs';

import chalk from 'chalk';

import program from 'commander';
import Koa from 'koa';
import opener from 'opener';

import basicAuth from 'koa-basic-auth';
import favicon from 'koa-favicon';
import logger from 'koa-logger';
import serveStatic from 'koa-static';

// import less from 'koa-less';

import compress from 'koa-compress';
// import cors from 'koa-cors';

import extname from './middleware/extname';
import babel from './middleware/babel';
import pug from './middleware/pug';
import stylus from './middleware/stylus';
import livereload from './middleware/livereload';
import exec from './middleware/exec';
import directory from './middleware/serve-index';

import {
  version
} from '../package.json';

// CLI
program
  .version(version)
  .usage('[options] dir')
  .description('\tServe from directory dir')
  .option('-a, --auth <user>:<pass>', 'specify basic auth credentials')
  .option('-F, --format <fmt>', 'specify the log format string', 'dev')
  .option('-p, --port <port>', 'specify the port [3000]', Number, 3000)
  .option('-H, --hidden', 'enable hidden file serving')
  .option('-b, --no-babel', 'disable babel rendering')
  .option('-J, --no-pug', 'disable pug rendering')
  .option('-S, --no-stylus', 'disable stylus rendering')
  // .option('    --no-less', 'disable less css rendering')
  .option('-o, --open', 'open with your browser')
  .option('-I, --no-icons', 'disable icons')
  .option('-L, --no-logs', 'disable request logging')
  .option('-D, --no-dirs', 'disable directory serving')
  .option('-f, --favicon <path>', 'serve the given favicon')
  // .option('-C, --cors', 'allows cross origin access serving')
  .option('    --compress', 'gzip or deflate the response')
  .option('-R, --livereload', 'refresh your CSS (or page) with each save')
  .option('    --exec <cmd>', 'execute command on each request')
  .parse(process.argv);

if (program.args.length === 0) {
  program.help();
}

// base
const base = resolve(program.args[0]);

const getFilePath = path => join(base, path);

// Setup the app
const app = new Koa();

app.use(extname());

// Basic auth
if (program.auth) {
  const name = program.auth.split(':')[0];
  const pass = program.auth.split(':')[1];
  if (!name || !pass) throw new Error('user and pass required');
  app.use(
    basicAuth({
      name,
      pass
    })
  );
}

// Ignore favicon
app.use(favicon(program.favicon));

// Logger
if (program.logs) app.use(logger(program.format));

// Babel
if (program.babel) {
  app.use(
    babel(base, {
      extname: '.jsx'
    })
  );
}

// pug
if (program.pug) {
  app.use(
    pug(base, {
      extname: '.pug'
    })
  );
}

// stylus
if (program.stylus) {
  app.use(
    stylus(base, {
      extname: '.styl'
    })
  );
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
if (program.compress) {
  app.use(compress());
}

// Livereload
if (program.livereload) {
  const port = 35729
  app.use(livereloadlivereload(
    base,
    {
      port,
    }
  ));
}

// Exec command
const command = program.exec;
if (command) {
  app.use(exec(command))
}

// Static files
app.use(serveStatic(base, {
  hidden: program.hidden
}));

// Directory serving
if (program.dirs) {
  app.use(directory(base, {
    hidden: program.hidden,
    icons: program.icons
  }));
}

// Start the app
app.listen(program.port, function () {
  console.log('Serving %s on port %s', chalk.green(base), chalk.green(String(program.port)))
  if (program.open) opener('http://localhost' + ':' + program.port)
});
