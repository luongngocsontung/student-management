import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import path from 'path';
import { NodeEnv } from 'src/types/common';

export default (): TypeOrmModuleOptions => ({
  type: 'mysql',
  url: process.env.DATABASE_URL as string,
  entities: [path.resolve(__dirname, '..') + '/**/*.entity{.ts,.js}'],
  synchronize: process.env.NODE_ENV === NodeEnv.DEV, // Automatically sync database schema (for development only)
});
