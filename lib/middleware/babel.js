import { join } from 'path';

import { transformFile } from 'babel-core';

import preset2015 from 'babel-preset-es2015';
import preset2016 from 'babel-preset-es2016';
import preset0 from 'babel-preset-stage-0';

import promisify from '../modules/promisify';

import setExtname from '../modules/setExtname';

const transformFileWrapped = promisify(transformFile);

const babelMiddleware = (
  base = process.cwd(),
  {
    extname = '.es6',
    presets = [
      preset2015,
      preset2016,
      preset0,
    ]
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
      const code = (
        await transformFileWrapped(
          join(base, path),
          {
            ast: false,
            presets
          }
        )
      ).code;
      ctx.body = code;
      const extname = '.js';
      ctx.state.extname = extname;
      ctx.path = setExtname(ctx.path, extname);
    }
    await next();
  };

export default babelMiddleware;
