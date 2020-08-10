module.exports = {
  preset: "ts-jest",

  testEnvironment: "node",

  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  testPathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/node_modules/"],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
