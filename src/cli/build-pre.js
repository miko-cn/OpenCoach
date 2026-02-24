#!/usr/bin/env node

/**
 * Pre-build script for opencoach-cli
 * Copies workflows from src/workflows to cli/workflows before npm pack
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.join(__dirname, '../..');
const SOURCE_WORKFLOWS = path.join(PROJECT_ROOT, 'src', 'workflows');
const TARGET_WORKFLOWS = path.join(__dirname, 'workflows');

console.log('Pre-build: Copying workflows...');
console.log(`  Source: ${SOURCE_WORKFLOWS}`);
console.log(`  Target: ${TARGET_WORKFLOWS}`);

// Remove existing workflows directory if it exists
if (fs.existsSync(TARGET_WORKFLOWS)) {
  console.log('  Removing existing workflows directory...');
  fs.rmSync(TARGET_WORKFLOWS, { recursive: true, force: true });
}

// Copy workflows directory
fs.cpSync(SOURCE_WORKFLOWS, TARGET_WORKFLOWS, { recursive: true });

console.log('  Workflows copied successfully!');