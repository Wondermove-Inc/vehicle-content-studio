---
title: 'Shadcn Storybook QA - Quality Assurance & Completion Verification'
read_only: true
type: 'command'
version: '1.0.0'
---

# 🎯 '/qa' - Execute comprehensive quality assurance with completion verification

Purpose: Perform systematic verification of planned vs actual deliverables with practical code-based quality gates
User Instruction: $ARGUMENTS

## 🚨 MANDATORY QA PRINCIPLES - NEVER VIOLATE

### ⛔ Three Core QA Principles

```
🚫 실용적 QA 원칙 - 검증 가능한 것만 🚫
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. 💥 계획 vs 실제 비교 원칙
   원래 계획과 실제 결과물을 1:1 대조 검증
   ⛔ 모든 차이점을 문서화하고 대응 방안 제시

2. 🔍 소스코드 검증 원칙
   코드로 확인 가능한 것만 검증 (빌드/테스트/린트)
   ⛔ 추측이나 주관적 판단 배제

3. 🧹 불필요 코드 제거 원칙
   데드코드, 미사용 의존성, 불필요 문서 식별
   ⛔ 유지보수 부담 증가 요소 제거
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 🚨 Enhanced QA Protocol

```
🚨 MANDATORY QA VERIFICATION PROCEDURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Step 1: STOP immediately → Analyze original plan vs actual completion
Step 2: First verification (Hard Think based analysis)
Step 3: If gaps found → Second verification (different approach)
Step 4: If still gaps → MANDATORY 5 web searches:
        - Exact issue pattern search
        - Similar completion verification cases
        - Best practices for quality assurance
        - Code cleanup and deadcode removal
        - Documentation accuracy verification
Step 5: Apply findings and create comprehensive report
Step 6: If gaps remain → Report to user with detailed action plans

⛔ NEVER skip this procedure and mark as complete
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Step 1: Mandatory Hard Think Pre-Analysis

### 🧠 Hard Think QA Verification Checklist:
```
🧠 HARD THINK MANDATORY QA CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ 원래 계획 완전 검토: 모든 요구사항을 빠짐없이 체크했는가?
□ 실제 코드 동작 확인: 주요 기능들이 실제로 작동하는가?
□ 불필요한 것들 식별: 데드코드, 미사용 패키지, 임시 파일 존재하는가?
□ 테스트 결과 분석: 실패 원인과 영향 범위를 파악했는가?
□ 문서 정확성 점검: 코드 변경사항이 문서에 반영되었는가?
□ Git 상태 검토: 커밋되지 않은 변경사항이나 불필요한 파일은 없는가?
□ 성급한 완료 방지: 충분한 검토 시간을 확보했는가?
□ CLAUDE.md 준수: shadcn-storybook-registry 표준 충족했는가?

⛔ DO NOT proceed until ALL checkboxes complete
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Step 2: QA Verification Execution

### QA Hard Think + 4-Stage Verification Cycle:
```
🧠 QA HARD THINK + 4-STAGE VERIFICATION CYCLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ HARD THINK: 계획 대비 완료도 체크 - 원래 TODO/요구사항 vs 실제 구현 상세 비교
□ VERIFY: 코드 품질 검증 - 빌드/테스트/린트 통과 확인
□ CLEANUP: 불필요 코드/문서 정리 - 데드코드, 미사용 의존성 제거
□ REPORT: 완료 보고서 및 계획 제시 - 필수 vs 옵션 구분하여 대응 방안 제시

🚨 If error at any stage → Apply QA Protocol immediately
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Step 3: Shadcn Storybook Quality Gates Verification

### Code Quality Verification Matrix:
```
REQUIRED QA COMMANDS BY VERIFICATION TYPE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
필수 코드 검증:
1. 환경 동기화:
   npm install

2. 정적 검사:
   npm run lint
   npm run format:check
   # 실패 시: npm run format:write

3. 타입 체크:
   npm run type-check

4. 유닛 테스트:
   npm run test:unit

5. Storybook 테스트:
   npm run test:storybook      # Playwright 브라우저 테스트
   npm run storybook:test      # Storybook 테스트 러너

6. 전체 빌드 검증:
   npm run build               # Next.js + Storybook + Registry
   npm run registry:build      # Registry JSON 생성 검증

7. Storybook 개발 서버 확인:
   npm run storybook           # 포트 6006에서 정상 작동 확인

Git 상태 확인:
   git status
   git diff --name-only

Registry 로컬 테스트:
   npx shadcn@latest add http://localhost:3000/v2/r/[component]-story.json

ALL QA TASKS: 모든 검증 통과 후 최종 보고서 작성

🚨 Command execution failure → Apply QA Protocol
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Cleanup Verification Matrix:
```
🧹 정리 항목 체크리스트
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ 데드코드: 사용되지 않는 함수/변수/파일 식별 및 제거
  # Serena MCP 또는 Grep으로 미사용 export/import 검색

□ 미사용 의존성: package.json에서 불필요한 패키지 제거
  # dependencies와 devDependencies 재검토

□ 주석 코드: 주석 처리된 오래된 코드 정리
  # Grep으로 // 또는 /* */ 패턴 검색

□ 임시 파일: 개발 중 생성된 임시 파일들 삭제
  find . -name "*.tmp" -o -name "*.bak" -o -name ".DS_Store"

□ 중복 문서: 같은 내용의 중복 문서 통합 또는 제거
  # 프로젝트 루트 및 docs/ 디렉토리 검토

□ TODO/FIXME: 해결되지 않은 주석들 처리 또는 이슈화
  # Grep으로 TODO, FIXME 패턴 검색

□ 불필요한 로그: console.log, debug 코드 제거
  # Grep으로 console.log 패턴 검색 (의도적 로그 제외)

□ Registry 검증: registry.json의 모든 항목이 실제 파일과 일치하는지 확인
  # 각 entry의 files 경로가 존재하는지 검증
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Story Quality Verification:
```
📚 Storybook 스토리 품질 검증
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
필수 검증 사항:
✅ Meta 설정: title, component, tags 올바르게 설정
✅ Story 패턴: Default story 포함, 주요 variant 모두 구현
✅ JSDoc 주석: 각 story export에 설명 주석 존재
✅ Import 경로: @/components/ui/ 패턴 사용 (registry 빌드 필수)
✅ Registry 등록: registry.json에 올바른 entry 존재
✅ 의존성 정의: registryDependencies, dependencies 정확
✅ 테마 지원: light/dark 모드 모두 정상 작동
✅ A11y: 접근성 위반 사항 없음 (Storybook a11y addon)

스토리 컨벤션:
- Default, Loading, Disabled, 크기 variant (sm, lg) 등 포함
- 인터랙티브 컴포넌트는 play 함수 테스트 스토리 포함
- 테스트 전용 스토리는 tags: ["!dev", "!autodocs"] 사용
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Step 4: QA Completion Report

### QA Completion Verification Template:
```
QA 완료 검증 보고서: [Task Name]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 완료 현황 요약
✅ 완료된 항목: [N개] - 구체적 완료 사항 나열
⚠️  미완료 항목: [N개] - 미완료 사항 상세 목록
🔧 발견된 정리 필요 사항: [N개] - 데드코드, 불필요 문서 등

🚨 필수 대응 계획 (원래 계획의 미완료 사항)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. [미완료 항목 1] - 대응 방안 및 예상 소요 시간
2. [미완료 항목 2] - 대응 방안 및 예상 소요 시간
...

💡 옵션 개선 계획 (추가 발견 사항)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. [개선 사항 1] - 효과 및 예상 작업량
2. [개선 사항 2] - 효과 및 예상 작업량
...

⚡ 코드 품질 상태 (Shadcn Storybook Quality Gates)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ ESLint 검사: [통과/실패 - 구체적 오류]
   npm run lint

□ Prettier 포맷: [통과/실패 - 구체적 오류]
   npm run format:check

□ TypeScript 타입: [통과/실패 - 구체적 오류]
   npm run type-check

□ 유닛 테스트: [통과율 - 실패한 테스트 목록]
   npm run test:unit

□ Storybook 테스트: [통과/실패 - 구체적 오류]
   npm run test:storybook
   npm run storybook:test

□ 빌드: [성공/실패 - 구체적 오류]
   npm run build
   npm run registry:build

□ Storybook 서버: [정상작동/오류]
   npm run storybook (포트 6006 확인)

□ Registry 테스트: [성공/실패]
   npx shadcn@latest add http://localhost:3000/v2/r/[component]-story.json

□ Git 상태: [클린/변경사항 있음 - 구체적 파일 목록]
   git status

□ 문서 동기화: [CLAUDE.md, registry.json 업데이트 여부]

🎯 최종 상태: [완료/조건부완료/미완료]
📅 완전 완료 예상일: [필수 계획 기준]

🧠 Next QA Task Requirements:
1. Maintain Hard Think mode: 원래 계획 대비 실제 결과 심층 분석
2. Follow verification protocol: 모든 코드 품질 검증 완료
3. Apply cleanup standards: 데드코드 및 불필요 요소 제거
4. Ensure CLAUDE.md compliance: shadcn-storybook-registry 표준 준수
5. Update documentation: 변경사항 문서 반영
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### 🚨 Emergency QA Protocol

```
🚨 SHADCN STORYBOOK QA EMERGENCY PROCEDURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1) HALT immediately when gaps found
2) DOCUMENT all discrepancies between plan and actual
3) WEB SEARCH after 2 verification failures (5 searches)
4) CREATE detailed action plans (Required vs Optional)
5) RESTART only after complete gap analysis

⛔ NEVER mark as complete without this procedure
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 📋 QA Verification Tools Reference

```bash
# Shadcn Storybook 품질 검증 명령어

# 1. 환경 동기화
npm install

# 2. 정적 검사
npm run lint
npm run format:check
npm run format:write

# 3. 타입 검증
npm run type-check

# 4. 테스트
npm run test
npm run test:unit
npm run test:storybook        # Playwright 브라우저 테스트
npm run storybook:test        # Storybook 테스트 러너

# 5. 빌드 검증
npm run build
npm run registry:build
npm run storybook:build

# 6. 개발 서버
npm run storybook             # 포트 6006
npm run dev                   # Next.js 개발 서버

# 7. Git 상태 확인
git status
git diff --name-only
git ls-files --others --exclude-standard

# 8. Registry 로컬 테스트
npx shadcn@latest add http://localhost:3000/v2/r/button-story.json

# 9. 정리 및 검색
find . -name "*.tmp" -o -name "*.bak" -o -name ".DS_Store"
# Grep을 사용한 패턴 검색:
# - TODO/FIXME 검색
# - console.log 검색
# - 주석 처리된 코드 검색
# Serena MCP를 사용한 심볼 분석:
# - 미사용 export 검색
# - 데드코드 식별
```

### 🌐 언어 및 의사소통 원칙

```
🌐 프로젝트 언어 원칙
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ QA 보고서 작성: 한국어로 작성
✅ 문제점 설명: 주니어 개발자도 이해 가능한 간단한 한국어
✅ 대응 방안 제시: 한국어로 명확하고 구체적으로
✅ 코드 주석 및 JSDoc: 영어 유지
✅ Git 커밋 메시지: 영어 사용 (Conventional Commits)

⚠️  검증 결과는 명확하고 구체적으로 한국어로 기록
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**📖 Project Commands Reference**: [CLAUDE.md](../../CLAUDE.md)

**🧠 Core Rule: Hard Think First → Plan vs Actual Verification → All Quality Gates Pass → Comprehensive Cleanup → Detailed Action Plans → Korean Communication → CLAUDE.md Compliance**
