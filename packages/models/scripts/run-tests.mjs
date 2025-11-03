#!/usr/bin/env node
import { run } from '../tests/index.test.js';

try {
  run();
  process.stdout.write('All model tests passed.\n');
} catch (error) {
  const message = error instanceof Error ? error.stack ?? error.message : String(error);
  process.stderr.write(`Test failure: ${message}\n`);
  process.exitCode = 1;
}
