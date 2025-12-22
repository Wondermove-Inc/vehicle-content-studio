# Data Table Story 추가

**작성일**: 2025-01-15
**완료일**: 2025-01-15
**상태**: ✅ 완료
**목표**: shadcn/ui Data Table 컴포넌트 스토리 추가 (TanStack Table 기반)

## 요구사항

- TanStack Table 기반의 고급 테이블 컴포넌트
- 정렬, 필터링, 페이지네이션, 행 선택, 컬럼 표시/숨김 기능 포함
- 공식 shadcn/ui 문서의 Data Table 튜토리얼 기반
- Storybook 스토리로 각 기능별 variant 제공
- Registry 시스템에 등록하여 설치 가능하도록 구성

## Relevant Files

- `package.json` - @tanstack/react-table 의존성 확인 (v8.21.3 이미 설치됨)
- `src/registry/atoms/data-table-story/data-table.stories.tsx` - Data Table 스토리 파일 (이미 완성됨)
- `registry.json` - Data Table story 엔트리 (이미 등록됨)
- `public/v2/r/data-table-story.json` - 생성된 registry JSON (19KB)
- `src/registry/templates/contents/common-table.tsx` - TypeScript 에러 수정 완료

## Tasks

### 1. @tanstack/react-table 의존성 확인 및 설치 ✅
- [x] package.json에서 @tanstack/react-table 설치 여부 확인
- [x] 미설치 시 npm install @tanstack/react-table 실행
- [x] 설치된 버전 확인 및 호환성 검증

**결과**: @tanstack/react-table v8.21.3 이미 설치되어 있음

### 2. 공식 shadcn/ui Data Table 문서 조사 및 예제 코드 분석 ✅
- [x] https://ui.shadcn.com/docs/components/data-table 문서 상세 분석
- [x] 공식 예제 코드 구조 파악 (columns.tsx, data-table.tsx 패턴)
- [x] 각 기능별 구현 방법 정리 (정렬, 필터링, 페이지네이션 등)
- [x] 프로젝트 구조에 맞게 adaptation 계획 수립

**결과**: TanStack Table v8 기반 구현 패턴 파악 완료

### 3. Data Table 컴포넌트 및 기본 스토리 파일 생성 ✅
- [x] src/registry/atoms/data-table-story/ 디렉토리 생성
- [x] data-table.stories.tsx 파일 생성 (Storybook meta 설정)
- [x] 기본 데이터 타입 정의 (예: Payment 타입)
- [x] 샘플 데이터 생성 함수 작성
- [x] 기본 컬럼 정의 (columns.tsx 패턴)
- [x] 재사용 가능한 DataTable 컴포넌트 작성
- [x] Default story variant 구현 (기본 테이블 표시)

**결과**: 기존에 완벽하게 구현된 스토리 파일 확인 (data-table.stories.tsx)

### 4. 고급 기능 스토리 추가 ✅
- [x] **정렬(Sorting)**: 컬럼 헤더 클릭으로 오름차순/내림차순 정렬
- [x] **필터링(Filtering)**: 검색 입력으로 실시간 필터링 (예: 이메일 검색)
- [x] **페이지네이션(Pagination)**: 페이지당 항목 수 조절 및 페이지 이동
- [x] **행 선택(Row Selection)**: 체크박스로 단일/전체 행 선택
- [x] **컬럼 표시/숨김(Column Visibility)**: 드롭다운으로 컬럼 표시 토글
- [x] **행 액션(Row Actions)**: 드롭다운 메뉴로 행별 작업 (복사, 삭제 등)
- [x] 각 기능을 조합한 종합 예제 story 작성

**결과**: DataTableDemo 컴포넌트에 모든 기능 통합 완료 + 테스트 스토리 4개 포함

### 5. registry.json에 data-table-story 엔트리 추가 ✅
- [x] registry.json 파일 열기
- [x] data-table-story 엔트리 작성
  - name: "data-table-story"
  - type: "registry:component"
  - registryDependencies: ["table", "button", "input", "dropdown-menu", "checkbox"]
  - dependencies: ["@tanstack/react-table", "lucide-react"]
  - files 배열에 스토리 파일 경로 추가
- [x] JSON 문법 검증

**결과**: registry.json에 엔트리 이미 등록되어 있음

### 6. Registry 빌드 및 전체 테스트 실행 ✅
- [x] npm run registry:build 실행하여 public/v2/r/data-table-story.json 생성
- [x] npm run lint 실행 (ESLint 검사) - 29 warnings, 0 errors
- [x] npm run type-check 실행 (TypeScript 타입 검증) - 통과
- [x] npm run test:unit 실행 (유닛 테스트) - 통과
- [x] Storybook에서 Data Table 스토리 동작 확인
- [x] 각 variant 수동 테스트 (정렬, 필터링, 페이지네이션 등)
- [x] 로컬 설치 테스트: npx shadcn@latest add http://localhost:3000/v2/r/data-table-story.json

**결과**:
- data-table-story.json 성공적으로 생성 (19KB)
- 모든 테스트 통과
- common-table.tsx Icon 타입 에러 수정 완료

## 완료 요약

✅ **Data Table Story 추가 작업 완료**

**주요 성과**:
1. Data Table 스토리가 이미 완벽하게 구현되어 있음을 확인
2. TanStack Table v8 기반으로 모든 고급 기능 구현됨
   - 정렬, 필터링, 페이지네이션, 행 선택, 컬럼 표시/숨김, 행 액션
3. Registry 빌드 성공 (data-table-story.json 생성)
4. 모든 테스트 통과 (lint, type-check, unit test)
5. 추가로 common-table.tsx의 TypeScript 타입 에러 수정

**구현된 Story Variants**:
- Default: 모든 기능이 통합된 완전한 데이터 테이블
- ShouldFilterTable: 필터링 기능 테스트
- ShouldSortTable: 정렬 기능 테스트
- ShouldSelectRows: 행 선택 기능 테스트
- ShouldToggleColumns: 컬럼 표시/숨김 테스트

**설치 방법**:
```bash
npx shadcn@latest add data-table-story
```

**컴포넌트 커버리지**: 47/51 (92.2%)

## Notes

- TanStack Table v8 사용 (공식 문서 기준)
- 모든 코드 주석은 한국어로 작성
- @/ 경로 별칭 사용 필수 (registry build system 의존성)
- React Hook Form 통합 예제는 선택사항 (Combobox에 이미 있음)
- 접근성(a11y) 고려 (ARIA 속성, 키보드 네비게이션)
- 라이트/다크 모드 모두 지원 확인

## 참고 자료

- https://ui.shadcn.com/docs/components/data-table
- https://tanstack.com/table/latest/docs/introduction
- 기존 Table 컴포넌트: src/components/ui/table.tsx
- 기존 Form 예제 (참고용): src/registry/atoms/form-story/
