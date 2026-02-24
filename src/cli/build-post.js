#!/usr/bin/env node

/**
 * Post-build script for opencoach-cli
 * Removes workflows from cli/workflows after npm pack
 */

const fs = require('fs');
const path = require('path');

const WORKFLOWS_DIR = path.join(__dirname, 'workflows');

console.log('Post-build: Cleaning up workflows...');
console.log(`  Removing: ${WORKFLOWS_DIR}`);

// Remove workflows directory if it exists
if (fs.existsSync(WORKFLOWS_DIR)) {
  fs.rmSync(WORKFLOWS_DIR, { recursive: true, force: true });
  console.log('  Workflows removed successfully!');
} else {
  console.log('  No workflows directory to remove.');
}