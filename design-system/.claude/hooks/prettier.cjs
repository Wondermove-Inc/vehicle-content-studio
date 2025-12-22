#!/usr/bin/env node
// Prettier Formatter - Auto-formats modified file (non-blocking)

const { execSync } = require('child_process');
const fs = require('fs');

const filePath = process.argv[2];

if (!filePath || !fs.existsSync(filePath)) {
    process.exit(0);
}

try {
    execSync(`npx prettier --write "${filePath}"`, {
        stdio: 'pipe',
        timeout: 5000
    });
    process.exit(0);
} catch (error) {
    // Prettier 오류는 차단하지 않음
    process.exit(0);
}
