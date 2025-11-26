module.exports = {
  testEnvironment: "node",
  testMatch: ["**/test/**/*.spec.js"],
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/index.js",
    "!src/config/**",
    "!src/models/**",
    "!src/scripts/**",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  testTimeout: 10000,
  verbose: true,
};
