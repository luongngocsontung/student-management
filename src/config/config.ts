import { NodeEnv } from 'src/types/common';

export default () => ({
  env: process.env.NODE_ENV as NodeEnv,
  port: Number(process.env.NODE_PORT) ?? 3000,
  db: {
    type: 'mysql',
    url: process.env.DATABASE_URL as string,
  },
});
