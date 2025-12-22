#!/bin/bash
# PostToolUse Hook - Quality Check Entry Point
# Extracts file path from tool_input and runs parallel checks

# Change to project root directory
cd "$CLAUDE_PROJECT_DIR" || exit 1

json_input=$(cat)

file_path=$(echo "$json_input" | jq -r '.tool_input.file_path // empty')

# TypeScript/JavaScript 파일만 검사
if [[ ! "$file_path" =~ \.(ts|tsx|js|jsx)$ ]] || [[ ! -f "$file_path" ]]; then
    exit 0
fi

echo "🔍 품질 검사: $file_path" >&2

node .claude/hooks/parallel-check.cjs "$file_path"
exit_code=$?

if [ $exit_code -ne 0 ]; then
    echo "" >&2
    echo "❌ 코드 품질 기준을 충족하지 못했습니다. 위 오류를 반드시 수정한 후 작업을 계속하세요." >&2
fi

exit $exit_code
