#!/usr/bin/env node
// ESLint Check - Runs ESLint with --fix on modified file

const { execSync } = require('child_process');
const fs = require('fs');

const filePath = process.argv[2];

if (!filePath || !fs.existsSync(filePath) || !filePath.match(/\.(js|jsx|ts|tsx)$/)) {
    process.exit(0);
}

try {
    execSync(`npx eslint "${filePath}" --fix`, {
        stdio: 'pipe',
        timeout: 10000
    });
    process.exit(0);
} catch (error) {
    console.error((error.stdout || error.stderr || '').toString().trim());
    process.exit(1);
}
