import serveIndex from 'serve-index';

import promisify from '../modules/promisify';

export default (...args) => {
  const index = serveIndex(...args);
  const promisifyIndex = promisify(index);
  return async (ctx, next) => {
    await next();
    const {
      status,
      req,
      res,
    } = ctx;
    if (status === 404) {
      ctx.status = 200;
      await promisifyIndex(ctx.req, ctx.res);
    }
  };
};
