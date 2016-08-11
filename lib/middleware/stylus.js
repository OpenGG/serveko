import { join } from 'path';

import { readFile } from 'fs';

import { render } from 'stylus';

import promisify from '../modules/promisify';

import setExtname from '../modules/setExtname';

const readFileWrapped = promisify(readFile);

const renderWrapped = promisify(render);

const babelMiddleware = (
  base = process.cwd(),
  {
    extname = '.styl',
  } = {}
) =>
  async (ctx, next) => {
    const {
      state: {
        extname: _extname
      },
      path,
    } = ctx;
    if (_extname === extname) {
      const str = await readFileWrapped(
        join(base, path),
        {
          encoding: 'utf8',
        }
      );
      const result = await render(
        str,
        {
          filename: path,
        }
      );
      ctx.body = result;
      const extname = '.css';
      ctx.state.extname = extname;
      ctx.type = 'text/css';
      ctx.path = setExtname(ctx.path, extname);
    }
    await next();
  };

export default babelMiddleware;
