module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.js'],
  collectCoverageFrom: ['*.js'],
  coverageDirectory: 'coverage',
  verbose: true,
  setupFilesAfterEnv: ['./test/teardown-global.js']
};
