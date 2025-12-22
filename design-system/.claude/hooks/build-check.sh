#!/bin/bash
# Stop Hook - Build Verification on Session End

echo "🏁 세션 종료 - 빌드 검증" >&2

# Change to project root directory
cd "$CLAUDE_PROJECT_DIR" || exit 1

if ! grep -q '"compile"' package.json 2>/dev/null; then
    echo "ℹ️  빌드 스크립트 없음. 검증 생략." >&2
    exit 0
fi

echo "🔨 빌드 실행 중..." >&2

if npm run compile 2>&1 | tee /tmp/build.log >&2; then
    echo "✅ 빌드 성공" >&2
    exit 0
else
    echo "" >&2
    echo "❌ 빌드 실패 - 반드시 수정해야 합니다" >&2
    exit 2
fi
