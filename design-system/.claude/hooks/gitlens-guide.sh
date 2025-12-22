#!/bin/bash
# PreToolUse Hook - GitLens Base Code Reference Guide
# This hook provides development guidelines when modifying TypeScript files

json_input=$(cat)
file_path=$(echo "$json_input" | jq -r '.tool_input.file_path // empty')

# Only show guidelines for TypeScript files
if [[ "$file_path" =~ \.(ts|tsx)$ ]]; then
  echo "📚 개발 지침: GitLens 베이스 코드 참고 필수"
  echo "- 소스: /Users/tw.kim/Documents/AGA/test/vscode-gitlens/src/"
  echo "- 패턴: Container DI, ViewBase, Disposable"
  echo "- 스타일: Tabs, Single quotes, Arrow functions"
fi

exit 0  # No blocking, just provide guidance
