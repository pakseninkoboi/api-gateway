module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testEnvironmentOptions: {}, // Pastikan ini ada
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.base.json',
      },
    ],
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
};
