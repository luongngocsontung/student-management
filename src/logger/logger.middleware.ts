import morgan from 'morgan';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NodeEnv } from 'src/types/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  use(req: any, res: any, next: () => void) {
    morgan(this.configService.get('env') === NodeEnv.DEV ? 'dev' : 'combined')(
      req,
      res,
      next,
    );
  }
}
