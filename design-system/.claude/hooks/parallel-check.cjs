#!/usr/bin/env node
// Parallel Check Executor - Runs TypeScript, ESLint, Prettier in parallel

const { spawn } = require('child_process');

const filePath = process.argv[2];
if (!filePath) process.exit(0);

const checks = [
    { name: 'TypeScript', script: '.claude/hooks/typecheck.cjs' },
    { name: 'ESLint', script: '.claude/hooks/eslint.cjs' },
    { name: 'Prettier', script: '.claude/hooks/prettier.cjs' }
];

Promise.all(checks.map(check => runCheck(check, filePath)))
    .then(results => {
        const failures = results.filter(r => !r.success);

        if (failures.length > 0) {
            console.error('\n🚨 오류가 발견되었습니다. 프로젝트 절대 지침에 따라 아래 문제를 반드시 해결하고 다음 계획을 진행하세요:\n');
            failures.forEach(f => {
                console.error(`[${f.name}]`);
                console.error(f.details);
                console.error('');
            });
            process.exit(2);
        }

        console.error('✅ 모든 검사 통과');
        process.exit(0);
    });

function runCheck(check, filePath) {
    return new Promise(resolve => {
        const proc = spawn('node', [check.script, filePath], {
            stdio: ['ignore', 'pipe', 'pipe'],
            timeout: 10000
        });

        let output = '';
        proc.stdout.on('data', d => output += d);
        proc.stderr.on('data', d => output += d);

        proc.on('close', code => {
            resolve({
                name: check.name,
                success: code === 0,
                details: code === 0 ? null : output.trim()
            });
        });
    });
}
