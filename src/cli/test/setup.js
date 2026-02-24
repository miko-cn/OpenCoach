/**
 * Test utilities - setup and teardown with temp directories
 */
const fs = require('fs');
const path = require('path');
const os = require('os');

const TMP_DIR = path.join(os.tmpdir(), 'opencoach-test');

// Setup before all tests
function setup() {
  // Create temp directory
  fs.mkdirSync(TMP_DIR, { recursive: true });

  // Mock homedir for tests
  process.env.OPENCOACH_DIR = TMP_DIR;
}

// Cleanup after all tests
function teardown() {
  // Remove temp directory
  if (fs.existsSync(TMP_DIR)) {
    fs.rmSync(TMP_DIR, { recursive: true, force: true });
  }

  // Clean env
  delete process.env.OPENCOACH_DIR;
}

module.exports = { setup, teardown, TMP_DIR };
