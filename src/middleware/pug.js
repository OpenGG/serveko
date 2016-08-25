import { render } from 'pug';
import { readFile } from 'fs';
import { join } from 'path';

import promisify from '../modules/promisify';

import setExtname from '../modules/setExtname';

const readFileWrapped = promisify(readFile);

const pugMiddleware = (
  base = process.cwd(),
  {
    extname = '.pug',
    options = {},
    locals = {}
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
      const promise = readFileWrapped(
        join(base, path),
        {
          encoding: 'utf8',
        }
      );
      const str = await promise;
      ctx.body = render(str, options, locals);
      const extname = '.html';
      ctx.state.extname = extname;
      ctx.path = setExtname(ctx.path, extname);
    }
    await next();
  };

export default pugMiddleware;
