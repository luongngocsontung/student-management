import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!**/main.ts',
    '!**/app.module.ts',
    '!**/config/*',
    '!**/database/**/**/*',
    '!**/filters/*',
    '!**/pipes/*',
    '!**/modules/*',
    '!**/dtos/**/*',
    '!**/entities/*',
    '**/utils/*',
    '!**/decorators/**/*',
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/$1',
  },
};

export default config;
