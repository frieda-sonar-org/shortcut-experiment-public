#!/usr/bin/env node

/**
 * Post-install script to set up the sandbox environment
 *
 * This script runs automatically after `yarn install` to ensure
 * that gitignored files required for the app to run are created
 * from their templates if they don't exist.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SANDBOX_DIR = path.join(__dirname, '..', 'sandbox');
const TEMPLATE_FILE = path.join(SANDBOX_DIR, 'routes.tsx.template');
const TARGET_FILE = path.join(SANDBOX_DIR, 'routes.tsx');

// Check if routes.tsx already exists
if (fs.existsSync(TARGET_FILE)) {
  console.log('✓ sandbox/routes.tsx already exists');
  process.exit(0);
}

// Check if template exists
if (!fs.existsSync(TEMPLATE_FILE)) {
  console.error('✗ Error: sandbox/routes.tsx.template not found');
  process.exit(1);
}

// Copy template to create routes.tsx
try {
  fs.copyFileSync(TEMPLATE_FILE, TARGET_FILE);
  console.log('✓ Created sandbox/routes.tsx from template');
  console.log('  You can now start the dev server with: yarn dev');
} catch (error) {
  console.error('✗ Error creating sandbox/routes.tsx:', error.message);
  process.exit(1);
}
