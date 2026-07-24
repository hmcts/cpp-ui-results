// custom jest configuration should go in here

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'test';
}

module.exports = {
  testRunner: 'jest-jasmine2',
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 50, // TODO: Update unit test to 70
      lines: 80,
      statements: 80
    }
  },
  moduleNameMapper: {
    '^lodash-es$': 'lodash',
    '^@test-helpers$': '<rootDir>/mock-test/test-helper'
  },
  watchPathIgnorePatterns: ['/node_modules/']
};
