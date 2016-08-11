import { extname } from 'path';

const extnameMiddleware = () =>
  async (ctx, next) => {
    ctx.state.extname = extname(ctx.path);
    await next();
  };
export default extnameMiddleware;
