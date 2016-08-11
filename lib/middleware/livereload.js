import LiveReload from 'tiny-lr';
import gaze from 'gaze';

import { stat } from 'fs';

import promisify from '../modules/promisify';

const promisifyStat = promisify(stat);

const middleware = (ctx, next) => (
  base = process.cwd(),
  {
    extname = '.html',
    port = 35729,
  } = {}
) => {
  const lr = new LiveReload();

  lr.listen(port);

  gaze(base + '/**/*', (err, watcher) => {
    watcher.on('all', async (event, path) => {
      const stat = await promisifyStat(path);
      if (stat.size === 0) {
        return;
      }
      lr.changed({
        body: {
          files: escape(path)
        }
      })
    })
  });

  return async (ctx, next) => {
    await next();
    const {
      state: {
        extname: _extname
      },
      path,
    } = ctx;
    if (_extname === extname) {
      const snippet = `<!--livereload snippet --><script>document.write('<script src="http://" + (location.host||'localhost').split(':')[0] + ':${port}/livereload.js?snipver=1"><\\/script>')</script>`;
      ctx.body += snippet;
    }
  };
};

export default middleware;
