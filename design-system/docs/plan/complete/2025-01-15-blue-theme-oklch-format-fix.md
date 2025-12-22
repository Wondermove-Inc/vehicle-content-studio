# Blue Theme OKLCH Format Consistency Fix

**작성일**: 2025-01-15
**상태**: Active
**우선순위**: High
**작업 유형**: Bug Fix / Theme System

## 🎯 목적

Blue 테마의 OKLCH 색상 형식 불일치를 해결하여 Storybook에서 색상이 정상적으로 렌더링되도록 합니다.

## 🔍 문제 정의

### 발견된 문제
Blue 테마에서 **OKLCH 형식이 혼재**되어 있어 색상 렌더링이 정상적으로 작동하지 않습니다:

- **대부분의 변수**: 퍼센트 형식 `oklch(100% 0 0)`
- **Chart/Sidebar 일부**: 소수점 형식 `oklch(0.796 0.099 250.366)`

### 일관성 비교
다른 모든 테마(default, red, green, yellow, violet, orange)는 일관되게 **소수점 형식**을 사용합니다.

### 영향 범위
- `app/globals.css` 파일의 Blue Light (Lines 324-366), Blue Dark (Lines 367-408) 섹션
- Storybook의 Blue 테마 색상 표시
- Chart, Surface, Code, Selection 등 새로 추가된 변수 렌더링

## 📋 Relevant Files

- `app/globals.css` - Blue theme light/dark 섹션 (Lines 324-408)
- `src/registry/tokens/color-story/color.stories.tsx` - 색상 토큰 스토리 (검증용)
- `storybook.log` - Storybook 서버 로그 (테스트용)

## 📝 Notes

### OKLCH 형식 변환 규칙
```
퍼센트 → 소수점 변환: 퍼센트 값 ÷ 100

예시:
- oklch(100% 0 0) → oklch(1 0 0)
- oklch(14.5% 0 0) → oklch(0.145 0 0)
- oklch(98.5% 0 0) → oklch(0.985 0 0)
- oklch(57% 0.006 286.375) → oklch(0.57 0.006 286.375)
```

### 기존 소수점 형식 유지
다음 변수들은 이미 소수점 형식이므로 변경하지 않습니다:
- `--chart-1` ~ `--chart-5` (Lines 345-349, 387-391)
- `--sidebar-foreground`, `--sidebar-primary`, `--sidebar-accent`, `--sidebar-accent-foreground` (일부 sidebar 변수)

## ✅ Tasks

### Phase 1: 변환 대상 분석 및 확인
- [x] Blue Light 테마 퍼센트 형식 변수 식별 (Lines 324-366)
- [x] Blue Dark 테마 퍼센트 형식 변수 식별 (Lines 367-408)
- [x] 변환 규칙 검증 (퍼센트 ÷ 100 = 소수점)
- [x] 다른 테마와의 일관성 비교

#### 세부 작업
1. `app/globals.css` 파일을 읽고 Blue Light 섹션(Lines 324-366)에서 퍼센트 형식 변수를 모두 찾습니다
2. Blue Dark 섹션(Lines 367-408)에서 퍼센트 형식 변수를 모두 찾습니다
3. 다른 테마(Lines 14-223)의 형식을 확인하여 소수점 형식이 표준임을 재검증합니다
4. 변환 대상 변수 목록을 정리합니다 (총 52개 변수)

### Phase 2: Blue Light 테마 OKLCH 형식 변환
- [ ] `--background`, `--foreground`, `--card` 계열 변환
- [ ] `--primary`, `--secondary`, `--muted`, `--accent` 계열 변환
- [ ] `--destructive`, `--border`, `--input`, `--ring` 변환
- [ ] `--sidebar-background` 변환 (나머지 sidebar는 유지)
- [ ] `--surface`, `--code`, `--selection` 계열 변환

#### 세부 작업
1. **Background/Foreground 그룹 변환**:
   - `--background: oklch(100% 0 0)` → `oklch(1 0 0)`
   - `--foreground: oklch(14.5% 0 0)` → `oklch(0.145 0 0)`
   - `--card: oklch(100% 0 0)` → `oklch(1 0 0)`
   - `--card-foreground: oklch(14.5% 0 0)` → `oklch(0.145 0 0)`
   - `--popover: oklch(100% 0 0)` → `oklch(1 0 0)`
   - `--popover-foreground: oklch(14.5% 0 0)` → `oklch(0.145 0 0)`

2. **Primary/Secondary 그룹 변환**:
   - `--primary: oklch(20.5% 0 0)` → `oklch(0.205 0 0)`
   - `--primary-foreground: oklch(98.5% 0 0)` → `oklch(0.985 0 0)`
   - `--secondary: oklch(96.5% 0 0)` → `oklch(0.965 0 0)`
   - `--secondary-foreground: oklch(20.5% 0 0)` → `oklch(0.205 0 0)`

3. **Muted/Accent 그룹 변환**:
   - `--muted: oklch(96.5% 0 0)` → `oklch(0.965 0 0)`
   - `--muted-foreground: oklch(57% 0.006 286.375)` → `oklch(0.57 0.006 286.375)`
   - `--accent: oklch(96.5% 0 0)` → `oklch(0.965 0 0)`
   - `--accent-foreground: oklch(20.5% 0 0)` → `oklch(0.205 0 0)`

4. **Destructive/Border 그룹 변환**:
   - `--destructive: oklch(57.6% 0.246 29.233)` → `oklch(0.576 0.246 29.233)`
   - `--destructive-foreground: oklch(98.5% 0 0)` → `oklch(0.985 0 0)`
   - `--border: oklch(90% 0.008 286.375)` → `oklch(0.9 0.008 286.375)`
   - `--input: oklch(90% 0.008 286.375)` → `oklch(0.9 0.008 286.375)`
   - `--ring: oklch(20.5% 0 0)` → `oklch(0.205 0 0)`

5. **Chart 변수 유지** (이미 소수점 형식):
   - `--chart-1` ~ `--chart-5` 변경하지 않음

6. **Sidebar 그룹 부분 변환**:
   - `--sidebar-background: oklch(100% 0 0)` → `oklch(1 0 0)`
   - 나머지 sidebar 변수는 이미 소수점 형식이므로 유지

7. **Surface/Code/Selection 그룹 변환**:
   - `--surface: oklch(98% 0 0)` → `oklch(0.98 0 0)`
   - `--surface-foreground: oklch(14.5% 0 0)` → `oklch(0.145 0 0)`
   - `--code: oklch(96% 0 0)` → `oklch(0.96 0 0)`
   - `--code-foreground: oklch(14.5% 0 0)` → `oklch(0.145 0 0)`
   - `--code-highlight: oklch(93% 0 0)` → `oklch(0.93 0 0)`
   - `--code-number: oklch(57% 0.006 286.375)` → `oklch(0.57 0.006 286.375)`
   - `--selection: oklch(14.5% 0 0)` → `oklch(0.145 0 0)`
   - `--selection-foreground: oklch(98.5% 0 0)` → `oklch(0.985 0 0)`

### Phase 3: Blue Dark 테마 OKLCH 형식 변환
- [ ] `--background`, `--foreground`, `--card` 계열 변환
- [ ] `--primary`, `--secondary`, `--muted`, `--accent` 계열 변환
- [ ] `--destructive`, `--border`, `--input`, `--ring` 변환
- [ ] `--sidebar-background` 변환 (나머지 sidebar는 유지)
- [ ] `--surface`, `--code`, `--selection` 계열 변환

#### 세부 작업
1. **Background/Foreground 그룹 변환**:
   - `--background: oklch(14.5% 0 0)` → `oklch(0.145 0 0)`
   - `--foreground: oklch(98.5% 0 0)` → `oklch(0.985 0 0)`
   - `--card: oklch(14.5% 0 0)` → `oklch(0.145 0 0)`
   - `--card-foreground: oklch(98.5% 0 0)` → `oklch(0.985 0 0)`
   - `--popover: oklch(14.5% 0 0)` → `oklch(0.145 0 0)`
   - `--popover-foreground: oklch(98.5% 0 0)` → `oklch(0.985 0 0)`

2. **Primary/Secondary 그룹 변환**:
   - `--primary: oklch(98.5% 0 0)` → `oklch(0.985 0 0)`
   - `--primary-foreground: oklch(20.5% 0 0)` → `oklch(0.205 0 0)`
   - `--secondary: oklch(24.5% 0 0)` → `oklch(0.245 0 0)`
   - `--secondary-foreground: oklch(98.5% 0 0)` → `oklch(0.985 0 0)`

3. **Muted/Accent 그룹 변환**:
   - `--muted: oklch(24.5% 0 0)` → `oklch(0.245 0 0)`
   - `--muted-foreground: oklch(70.5% 0.011 286.062)` → `oklch(0.705 0.011 286.062)`
   - `--accent: oklch(24.5% 0 0)` → `oklch(0.245 0 0)`
   - `--accent-foreground: oklch(98.5% 0 0)` → `oklch(0.985 0 0)`

4. **Destructive/Border 그룹 변환**:
   - `--destructive: oklch(62.8% 0.257 29.233)` → `oklch(0.628 0.257 29.233)`
   - `--destructive-foreground: oklch(98.5% 0 0)` → `oklch(0.985 0 0)`
   - `--border: oklch(24.5% 0 0)` → `oklch(0.245 0 0)`
   - `--input: oklch(24.5% 0 0)` → `oklch(0.245 0 0)`
   - `--ring: oklch(83.1% 0.184 70.429)` → `oklch(0.831 0.184 70.429)`

5. **Chart 변수 유지** (이미 소수점 형식):
   - `--chart-1` ~ `--chart-5` 변경하지 않음

6. **Sidebar 그룹 부분 변환**:
   - `--sidebar-background: oklch(14.5% 0 0)` → `oklch(0.145 0 0)`
   - 나머지 sidebar 변수는 이미 소수점 형식이므로 유지

7. **Surface/Code/Selection 그룹 변환**:
   - `--surface: oklch(18% 0 0)` → `oklch(0.18 0 0)`
   - `--surface-foreground: oklch(98.5% 0 0)` → `oklch(0.985 0 0)`
   - `--code: oklch(22% 0 0)` → `oklch(0.22 0 0)`
   - `--code-foreground: oklch(98.5% 0 0)` → `oklch(0.985 0 0)`
   - `--code-highlight: oklch(26% 0 0)` → `oklch(0.26 0 0)`
   - `--code-number: oklch(70.5% 0.011 286.062)` → `oklch(0.705 0.011 286.062)`
   - `--selection: oklch(98.5% 0 0)` → `oklch(0.985 0 0)`
   - `--selection-foreground: oklch(14.5% 0 0)` → `oklch(0.145 0 0)`

### Phase 4: 검증 및 테스트
- [ ] Storybook 실행하여 Blue Light 테마 색상 렌더링 확인
- [ ] Storybook 실행하여 Blue Dark 테마 색상 렌더링 확인
- [ ] Chart 색상 정상 표시 확인 (http://localhost:6006/?path=/story/foundation-color--chart&globals=theme:blue-light)
- [ ] Surface, Code, Selection 색상 정상 표시 확인
- [ ] 다른 테마와 형식 일관성 재확인

#### 세부 작업
1. **Storybook 서버 실행**:
   ```bash
   npm run storybook
   ```

2. **Blue Light 테마 검증**:
   - http://localhost:6006/?path=/story/foundation-color--primary&globals=theme:blue-light
   - http://localhost:6006/?path=/story/foundation-color--chart&globals=theme:blue-light
   - http://localhost:6006/?path=/story/foundation-color--surface&globals=theme:blue-light
   - 모든 색상이 파란색 계열로 정상 표시되는지 확인

3. **Blue Dark 테마 검증**:
   - http://localhost:6006/?path=/story/foundation-color--primary&globals=theme:blue-dark
   - http://localhost:6006/?path=/story/foundation-color--chart&globals=theme:blue-dark
   - http://localhost:6006/?path=/story/foundation-color--surface&globals=theme:blue-dark
   - 다크 모드에서 모든 색상이 정상 표시되는지 확인

4. **렌더링된 HTML 검증**:
   - 브라우저 개발자 도구로 `bg-chart-1` 등이 정확한 색상 값으로 계산되는지 확인
   - `bg-[var(--color-chart-4)]` 같은 fallback 패턴이 아닌 직접 색상 값 확인

5. **다른 테마와 비교**:
   - Default 테마와 Blue 테마를 전환하며 형식 일관성 확인
   - 모든 테마가 소수점 형식 OKLCH 사용 확인

### Phase 5: 코드 품질 검증 및 커밋
- [ ] Lint 검사 통과 (`npm run lint`)
- [ ] Type 검사 통과 (`npm run type-check`)
- [ ] Registry 빌드 통과 (`npm run registry:build`)
- [ ] Git 스테이징 및 커밋

#### 세부 작업
1. **정적 검사 실행**:
   ```bash
   npm run lint
   npm run type-check
   ```

2. **Registry 빌드 검증**:
   ```bash
   npm run registry:build
   ```

3. **변경사항 스테이징**:
   ```bash
   git add app/globals.css
   ```

4. **커밋 메시지 작성** (Conventional Commits):
   ```bash
   git commit -m "fix: convert Blue theme OKLCH format to decimal for consistency" \
              -m "- Convert all percentage format (oklch(100% 0 0)) to decimal format (oklch(1 0 0))" \
              -m "- Ensure Blue Light and Blue Dark themes use consistent decimal OKLCH" \
              -m "- Align Blue theme format with all other themes (default, red, green, etc.)" \
              -m "- Fix color rendering issues in Storybook Blue theme" \
              -m "" \
              -m "Related to Blue Theme Color Rendering Fix"
   ```

## 🎯 성공 기준

1. **형식 일관성**: Blue 테마의 모든 OKLCH 값이 소수점 형식으로 통일
2. **다른 테마와 일관성**: Blue 테마가 다른 모든 테마와 동일한 소수점 형식 사용
3. **렌더링 정상화**: Storybook에서 Blue Light/Dark 테마의 모든 색상이 정상 표시
4. **Chart 색상 표시**: Chart 스토리에서 파란색 계열 색상이 명확히 보임
5. **신규 변수 정상 작동**: Surface, Code, Selection 색상이 정상 렌더링

## 📊 변환 대상 변수 요약

### Blue Light (26개 변수)
- Background/Foreground: 6개
- Primary/Secondary: 4개
- Muted/Accent: 4개
- Destructive/Border: 5개
- Sidebar: 1개 (background만)
- Surface/Code/Selection: 8개

### Blue Dark (26개 변수)
- Background/Foreground: 6개
- Primary/Secondary: 4개
- Muted/Accent: 4개
- Destructive/Border: 5개
- Sidebar: 1개 (background만)
- Surface/Code/Selection: 8개

**총 변환 대상**: 52개 변수

## 🚨 주의사항

1. **Chart 변수 유지**: `--chart-1` ~ `--chart-5`는 이미 소수점 형식이므로 변경하지 않습니다
2. **Sidebar 일부 유지**: Sidebar의 foreground, primary, accent 계열은 이미 소수점 형식이므로 background만 변환합니다
3. **정확한 계산**: 퍼센트 값을 100으로 나눌 때 소수점 자릿수를 정확히 유지합니다 (예: 14.5% → 0.145, 98.5% → 0.985)
4. **Storybook 서버 재시작**: CSS 변경 후 Storybook이 hot reload로 반영되지 않으면 서버를 재시작합니다

## 📝 작업 로그

### 2025-01-15
- ✅ OKLCH 형식 불일치 문제 발견 및 분석
- ✅ 변환 규칙 정의 (퍼센트 ÷ 100 = 소수점)
- ✅ 변환 대상 변수 52개 식별 완료
- ✅ 작업 계획 수립 및 문서화
- ⏳ Blue Light 테마 변환 대기 중
- ⏳ Blue Dark 테마 변환 대기 중
- ⏳ Storybook 검증 대기 중
- ⏳ Git 커밋 대기 중
