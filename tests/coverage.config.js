/**
 * Test configuration and coverage setup for new architecture
 */

module.exports = {
  // Coverage collection patterns
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!src/**/*.d.ts',
    '!src/**/index.ts', // Index files are usually just exports
    '!src/**/*.test.ts'
  ],

  // Coverage thresholds to maintain quality
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95
    },
    // Specific thresholds for core modules
    'src/core/': {
      branches: 95,
      functions: 100,
      lines: 100,
      statements: 100
    },
    'src/algorithms/': {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95
    }
  },

  // Coverage reporters
  coverageReporters: [
    'text',        // Console output
    'text-summary', // Brief summary
    'html',        // Detailed HTML report
    'lcov',        // For CI/CD integration
    'json'         // Machine readable
  ],

  // Test environment setup
  testEnvironment: 'node',
  
  // Test patterns
  testMatch: [
    '**/tests/**/*.test.{ts,js}',
    '**/__tests__/**/*.test.{ts,js}',
    '**/src/**/*.test.{ts,js}'
  ],

  // Setup files
  setupFilesAfterEnv: [
    '<rootDir>/tests/setup.ts'
  ]
};
