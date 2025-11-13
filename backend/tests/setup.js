/**
 * Jest Setup File
 * Sets environment variables before any tests run
 */

// Set test environment variables BEFORE any modules are imported
process.env.NODE_ENV = 'test';
process.env.DB_NAME = 'peer-tutor-connect-test';
