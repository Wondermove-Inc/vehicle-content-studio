#!/usr/bin/env node
// TypeScript Type Check - Project-wide check with tsconfig.json

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const filePath = process.argv[2];

if (!filePath || !fs.existsSync(filePath) || !filePath.match(/\.tsx?$/)) {
    process.exit(0);
}

try {
    // 전체 프로젝트 타입 체크 (tsconfig.json 기반)
    execSync(`npx tsc --noEmit --project tsconfig.json`, {
        stdio: 'pipe',
        timeout: 15000
    });
    process.exit(0);
} catch (error) {
    const output = error.stdout?.toString() || '';
    const normalizedPath = path.resolve(filePath);

    // 수정된 파일과 관련된 에러만 표시
    const relevantErrors = output
        .split('\n')
        .filter(line => line.includes(filePath) || line.includes(normalizedPath))
        .join('\n')
        .trim();

    if (relevantErrors) {
        console.error(relevantErrors);
        process.exit(1);
    }

    // 관련 에러가 없으면 통과 (다른 파일의 에러는 무시)
    process.exit(0);
}
