import { exec } from 'child_process';
import promisify from '../modules/promisify';

const promisifyExec = promisify(exec);

export default command =>
  async (ctx, next) => {
    await promisifyExec(command);
    await next();
  };
