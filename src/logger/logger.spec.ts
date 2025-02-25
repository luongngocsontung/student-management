import { LoggerMiddleware } from './logger.middleware';
import { ConfigService } from '@nestjs/config';
import { NodeEnv } from 'src/types/common';
import * as morgan from 'morgan';

// Mock the morgan function
jest.mock('morgan', () => jest.fn(() => (req, res, next) => next()));

describe('LoggerMiddleware', () => {
  let middleware: LoggerMiddleware;
  let configService: ConfigService;

  beforeEach(() => {
    // Create a mock instance of ConfigService
    configService = { get: jest.fn() } as unknown as ConfigService;
    // Instantiate the middleware with the mocked ConfigService
    middleware = new LoggerMiddleware(configService);
  });

  it('should use "dev" format in development environment', () => {
    // Mock the return value of configService.get
    (configService.get as jest.Mock).mockReturnValue(NodeEnv.DEV);

    // Create mock request, response, and next function
    const req = {};
    const res = {};
    const next = jest.fn();

    // Call the middleware's use function
    middleware.use(req, res, next);

    // Assert that morgan was called with 'dev' format
    expect(morgan).toHaveBeenCalledWith('dev');
    // Assert that the next function was called
    expect(next).toHaveBeenCalled();
  });

  it('should use "combined" format in non-development environment', () => {
    // Mock the return value of configService.get
    (configService.get as jest.Mock).mockReturnValue('production');

    // Create mock request, response, and next function
    const req = {};
    const res = {};
    const next = jest.fn();

    // Call the middleware's use function
    middleware.use(req, res, next);

    // Assert that morgan was called with 'combined' format
    expect(morgan).toHaveBeenCalledWith('combined');
    // Assert that the next function was called
    expect(next).toHaveBeenCalled();
  });
});