export default {
  testEnvironment: 'node',
  transform: {},
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testMatch: ['**/*.test.js'],
  setupFiles: ['<rootDir>/tests/setup.js'],
  testTimeout: 10000,
  maxWorkers: 1,
  collectCoverageFrom: [
    'data/**/*.js',
    'routes/**/*.js',
    'middlewares.js',
    'validation.js',
    '!**/node_modules/**',
    '!**/tests/**',
  ],
  coverageThreshold: {
    global: {
      branches: 68,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
