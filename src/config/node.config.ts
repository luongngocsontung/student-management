import { NodeEnv } from 'src/types/common';

export default () => ({
  env: process.env.NODE_ENV as NodeEnv,
  port: Number(process.env.NODE_PORT),
});
