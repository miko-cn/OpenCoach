/**
 * Jest setup file - ensures cleanup even on test failure
 */
const fs = require('fs');
const path = require('path');
const os = require('os');

const TMP_DIR = path.join(os.tmpdir(), 'opencoach-test');

// Cleanup before tests run (in case previous run crashed)
beforeAll(() => {
  if (fs.existsSync(TMP_DIR)) {
    fs.rmSync(TMP_DIR, { recursive: true, force: true });
  }
});

// Cleanup after all tests
afterAll(() => {
  if (fs.existsSync(TMP_DIR)) {
    fs.rmSync(TMP_DIR, { recursive: true, force: true });
  }
});

// Also cleanup on process exit
process.on('exit', () => {
  if (fs.existsSync(TMP_DIR)) {
    fs.rmSync(TMP_DIR, { recursive: true, force: true });
  }
});
