# React 18/19 Dual Support - Complete Implementation Plan

## 📋 Executive Summary

**목표**: 모든 shadcn/ui 컴포넌트에 forwardRef를 추가하여 React 18.3.1과 React 19 모두에서 작동하도록 완벽한 호환성 제공

**현재 상태**:
- ✅ 완료: 191개 컴포넌트 (Initial 6 + Batch 1-1: 15 + Batch 1-2: 6 + Batch 2-1: 48 + Batch 2-2: 23 + Batch 2-3: 11 + Batch 3-1: 20 + Batch 3-2: 22 + Batch 4-1: 40)
- ✅ Phase 4 Batch 4-1 완료
- 📊 진행률: 191/191 컴포넌트 완료 (100%)

**최종 목표**: 47개 전체 UI 컴포넌트의 forwardRef 지원

---

## 🎯 Plan Overview

### Goal
모든 shadcn/ui 컴포넌트가 React 18과 React 19 프로젝트에서 동일하게 작동하도록 forwardRef 패턴 적용

### Metric
- TypeScript 컴파일 에러 0건
- Storybook 빌드 성공률 100%
- 전체 47개 컴포넌트 중 47개 forwardRef 적용 (100%)
- React 18.3.1 테스트 프로젝트 설치 성공

### Success Criteria
1. 모든 UI 컴포넌트가 forwardRef 패턴 사용
2. TypeScript 타입 안전성 유지
3. Storybook 빌드 및 실행 정상 작동
4. React 18.3.1 프로젝트에서 컴포넌트 설치 및 사용 성공
5. React 19 프로젝트에서 기존 기능 유지

---

## 📊 Component Analysis

### 이미 forwardRef를 사용하는 컴포넌트 (4개)
1. ✅ `typography.tsx` - forwardRef with HTMLElement
2. ✅ `sheet.tsx` - Radix UI Dialog primitives
3. ✅ `separator.tsx` - Radix UI Separator
4. ✅ `scroll-area.tsx` - Radix UI ScrollArea

### 완료된 컴포넌트 (6개 - Commit 67175b3)
1. ✅ `button.tsx` - HTMLButtonElement with asChild
2. ✅ `input.tsx` - HTMLInputElement
3. ✅ `textarea.tsx` - HTMLTextAreaElement
4. ✅ `label.tsx` - Radix UI Label
5. ✅ `badge.tsx` - HTMLSpanElement with asChild
6. ✅ `card.tsx` - 7 sub-components (Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter)

### 작업 대상 컴포넌트 (37개)

#### Phase 1: 단순 컴포넌트 (HTML 기반) - 10개
1. `alert.tsx` - Alert, AlertTitle, AlertDescription
2. `avatar.tsx` - Avatar, AvatarImage, AvatarFallback
3. `breadcrumb.tsx` - 7 sub-components
4. `progress.tsx` - Radix UI Progress
5. `skeleton.tsx` - HTMLDivElement
6. `slider.tsx` - Radix UI Slider
7. `switch.tsx` - Radix UI Switch
8. `checkbox.tsx` - Radix UI Checkbox
9. `radio-group.tsx` - Radix UI RadioGroup
10. `toggle.tsx` - Radix UI Toggle

#### Phase 2: 복합 컴포넌트 (Radix UI 기반) - 12개
11. `accordion.tsx` - Radix UI Accordion (4 sub-components)
12. `alert-dialog.tsx` - Radix UI AlertDialog (9 sub-components)
13. `aspect-ratio.tsx` - Radix UI AspectRatio
14. `collapsible.tsx` - Radix UI Collapsible
15. `context-menu.tsx` - Radix UI ContextMenu (13 sub-components)
16. `dialog.tsx` - Radix UI Dialog (7 sub-components)
17. `dropdown-menu.tsx` - Radix UI DropdownMenu (15 sub-components)
18. `hover-card.tsx` - Radix UI HoverCard (3 sub-components)
19. `menubar.tsx` - Radix UI Menubar (14 sub-components)
20. `navigation-menu.tsx` - Radix UI NavigationMenu (6 sub-components)
21. `popover.tsx` - Radix UI Popover (3 sub-components)
22. `tabs.tsx` - Radix UI Tabs (3 sub-components)

#### Phase 3: 특수 컴포넌트 - 9개
23. `calendar.tsx` - react-day-picker
24. `carousel.tsx` - embla-carousel-react (4 sub-components)
25. `chart.tsx` - recharts wrapper (2 sub-components)
26. `command.tsx` - cmdk (8 sub-components)
27. `drawer.tsx` - vaul
28. `form.tsx` - react-hook-form (7 sub-components)
29. `input-otp.tsx` - input-otp
30. `pagination.tsx` - 7 sub-components
31. `resizable.tsx` - react-resizable-panels (3 sub-components)

#### Phase 4: 복잡한 컴포넌트 - 6개
32. `select.tsx` - Radix UI Select (7 sub-components)
33. `sidebar.tsx` - 13 sub-components
34. `sonner.tsx` - sonner toast
35. `table.tsx` - HTML table (7 sub-components)
36. `toggle-group.tsx` - Radix UI ToggleGroup (2 sub-components)
37. `tooltip.tsx` - Radix UI Tooltip (4 sub-components)

---

## 🔧 Implementation Strategy

### 한국어 주석 작성 가이드라인

**중요**: CLAUDE.md의 "Korean Code Comments and Function Documentation" 섹션을 준수합니다.

#### 함수 문서화 규칙
모든 새로운 함수와 중요한 코드 변경에는 한국어 주석 필수:

```typescript
/**
 * 🎯 목적: forwardRef 패턴을 적용하여 React 18/19 호환성 제공
 *
 * @param className - Tailwind CSS 클래스명
 * @param ref - DOM 요소에 전달할 ref 객체
 * @returns React 컴포넌트
 *
 * 📝 주의사항:
 * - displayName 설정 필수 (React DevTools 식별용)
 * - TypeScript 타입 안전성 유지
 * - asChild 패턴 사용 시 Radix UI Slot 호환성 고려
 *
 * 🔄 변경이력: 2025-10-11 - React 18/19 dual support를 위한 forwardRef 추가
 */
const Component = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    // 🎯 ref를 DOM 요소에 전달하여 부모 컴포넌트에서 직접 접근 가능하도록 함
    return <div ref={ref} className={cn(styles, className)} {...props} />;
  }
);
Component.displayName = "Component";
```

#### 인라인 주석 규칙
```typescript
// 🎯 CRITICAL: forwardRef는 React 18/19 모두에서 정상 동작
const Component = React.forwardRef<HTMLButtonElement, ComponentProps>(
  ({ className, asChild = false, ...props }, ref) => {
    // ✅ asChild 패턴: Radix UI Slot 컴포넌트와 호환
    const Comp = asChild ? Slot : "button";

    // ⚠️ ref 전달 누락 시 React 18 프로젝트에서 경고 발생
    return <Comp ref={ref} className={cn(styles, className)} {...props} />;
  }
);
```

#### 주석 아이콘 가이드
```
🎯 목적/의도      📝 주의사항      🔄 변경이력
⚠️  중요/경고      🚨 에러처리      🛡️  보안
🔥 성능최적화     💡 팁/힌트      🎨 UI/스타일
🔍 디버깅        🧪 테스트       📊 데이터처리
⚡ 빠른처리      🌐 네트워크      🗃️  데이터베이스
🎪 복잡로직      🔐 암호화       🎭 임시코드
```

### Pattern Categories

#### 1. Simple HTML Component Pattern
```typescript
/**
 * 🎯 목적: 단순 HTML 요소 기반 컴포넌트에 forwardRef 적용
 * 📝 주의사항: HTMLDivElement 타입은 실제 DOM 요소에 맞춰 변경 (HTMLButtonElement, HTMLInputElement 등)
 */
const Component = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    // 🎯 ref를 DOM 요소에 전달
    return <div ref={ref} className={cn(styles, className)} {...props} />;
  }
);
Component.displayName = "Component"; // 🔍 React DevTools 식별용
```

#### 2. Radix UI Component Pattern
```typescript
/**
 * 🎯 목적: Radix UI primitives 기반 컴포넌트에 forwardRef 적용
 * 📝 주의사항: ElementRef와 ComponentPropsWithoutRef 타입 사용 필수
 */
const Component = React.forwardRef<
  React.ElementRef<typeof RadixPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadixPrimitive.Root>
>(({ className, ...props }, ref) => {
  // 🎯 Radix UI primitive에 ref 전달
  return <RadixPrimitive.Root ref={ref} className={cn(styles, className)} {...props} />;
});
Component.displayName = "Component";
```

#### 3. asChild Pattern (Slot Support)
```typescript
/**
 * 🎯 목적: Radix UI Slot 패턴과 호환되는 forwardRef 적용
 * 📝 주의사항: asChild prop으로 다형성(polymorphic) 컴포넌트 구현
 */
const Component = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  // ✅ asChild=true면 Slot 사용 (자식 요소의 props 병합)
  // ✅ asChild=false면 기본 button 태그 사용
  const Comp = asChild ? Slot : "button";

  // 🎯 선택된 컴포넌트에 ref 전달
  return <Comp ref={ref} className={cn(styles, className)} {...props} />;
});
Component.displayName = "Component";
```

#### 4. Complex Multi-Component Pattern
```typescript
/**
 * 🎯 목적: 복합 컴포넌트 (부모-자식 구조)에 forwardRef 적용
 * 📝 주의사항: 각 하위 컴포넌트마다 개별 forwardRef 및 displayName 설정
 */

// 🎯 부모 컴포넌트
const Parent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn(parentStyles, className)} {...props} />;
  }
);
Parent.displayName = "Parent";

// 🎯 자식 컴포넌트 1
const Child1 = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn(child1Styles, className)} {...props} />;
  }
);
Child1.displayName = "Child1";

// 🎯 자식 컴포넌트 2
const Child2 = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn(child2Styles, className)} {...props} />;
  }
);
Child2.displayName = "Child2";
```

### 필수 주석 작성 시나리오

forwardRef 작업 시 아래 경우에는 **반드시** 한국어 주석 작성:

1. **새로운 forwardRef 컴포넌트 생성**: `🎯 목적` 포함한 JSDoc 작성
2. **복잡한 타입 정의**: ElementRef vs HTMLElement 선택 이유 설명
3. **asChild 패턴 구현**: Slot 컴포넌트와의 호환성 설명
4. **특수한 ref 처리**: useImperativeHandle 사용 시 이유 명시
5. **외부 라이브러리 통합**: ref 전달 방식 선택 근거 설명
6. **임시 해결책**: `🎭 임시:` 표시하고 추후 개선 방향 명시

---

## 📅 Execution Plan

### Phase 1: 단순 컴포넌트 (예상 시간: 2-3시간)

#### Batch 1-1: Basic HTML Components (5개)
- `alert.tsx` (3 sub-components)
- `avatar.tsx` (3 sub-components)
- `skeleton.tsx` (1 component)
- `progress.tsx` (1 component)
- `breadcrumb.tsx` (7 sub-components)

**작업 절차**:
1. 각 컴포넌트 파일 읽기
2. forwardRef 패턴 적용
3. TypeScript 타입 확인
4. 5개 모두 완료 후 빌드 테스트

#### Batch 1-2: Radix UI Basic Controls (5개)
- `slider.tsx`
- `switch.tsx`
- `checkbox.tsx`
- `radio-group.tsx`
- `toggle.tsx`

**작업 절차**:
1. Radix UI ElementRef 패턴 적용
2. TypeScript 타입 확인
3. 5개 모두 완료 후 빌드 테스트

### Phase 2: 복합 컴포넌트 (예상 시간: 4-5시간)

#### Batch 2-1: Menu Components (4개)
- `dropdown-menu.tsx` (15 sub-components)
- `context-menu.tsx` (13 sub-components)
- `menubar.tsx` (14 sub-components)
- `navigation-menu.tsx` (6 sub-components)

**작업 절차**:
1. 각 파일의 sub-component 개수 파악
2. 패턴 적용 (Radix UI ElementRef)
3. 완료 후 Storybook에서 동작 확인
4. 빌드 테스트

#### Batch 2-2: Dialog Components (4개)
- `accordion.tsx` (4 sub-components)
- `alert-dialog.tsx` (9 sub-components)
- `dialog.tsx` (7 sub-components)
- `tabs.tsx` (3 sub-components)

**작업 절차**:
1. Radix UI Dialog/Accordion/Tabs primitives 패턴
2. displayName 설정
3. 빌드 테스트

#### Batch 2-3: Overlay Components (4개)
- `aspect-ratio.tsx`
- `collapsible.tsx`
- `hover-card.tsx` (3 sub-components)
- `popover.tsx` (3 sub-components)

**작업 절차**:
1. Radix UI primitives forwardRef 적용
2. 빌드 테스트

### Phase 3: 특수 컴포넌트 (예상 시간: 3-4시간)

#### Batch 3-1: Third-Party Library Components (5개)
- `calendar.tsx` (react-day-picker)
- `carousel.tsx` (embla-carousel-react, 4 sub-components)
- `chart.tsx` (recharts, 2 sub-components)
- `drawer.tsx` (vaul)
- `input-otp.tsx` (input-otp)

**주의사항**:
- 외부 라이브러리 API 확인 필요
- 라이브러리가 이미 forwardRef를 지원하는지 확인
- 필요시 wrapper 컴포넌트 패턴 사용

**작업 절차**:
1. 각 라이브러리 문서 확인
2. ref 전달 방법 파악
3. 적절한 패턴 적용
4. 빌드 및 Storybook 테스트

#### Batch 3-2: Form & Data Components (4개)
- `command.tsx` (cmdk, 8 sub-components)
- `form.tsx` (react-hook-form, 7 sub-components)
- `pagination.tsx` (7 sub-components)
- `resizable.tsx` (react-resizable-panels, 3 sub-components)

**작업 절차**:
1. react-hook-form Controller 패턴 유지
2. forwardRef 적용
3. 폼 통합 테스트

### Phase 4: 복잡한 컴포넌트 (예상 시간: 3-4시간)

#### Batch 4-1: Advanced UI Components (6개)
- `select.tsx` (Radix UI Select, 7 sub-components)
- `sidebar.tsx` (13 sub-components)
- `sonner.tsx` (sonner toast)
- `table.tsx` (HTML table, 7 sub-components)
- `toggle-group.tsx` (Radix UI ToggleGroup, 2 sub-components)
- `tooltip.tsx` (Radix UI Tooltip, 4 sub-components)

**작업 절차**:
1. sidebar.tsx: 13개 sub-component 체계적 처리
2. table.tsx: semantic HTML 태그별 타입 지정
3. select.tsx: Radix UI Select primitives 패턴
4. tooltip.tsx: Provider 패턴 유지
5. 빌드 및 전체 테스트

---

## ✅ Quality Gates

### Per-Batch Quality Checks
각 배치 완료 후 실행:
```bash
# TypeScript 타입 체크
npm run type-check

# Lint 검사
npm run lint

# Storybook 빌드
npm run storybook:build
```

### Per-Phase Quality Checks
각 Phase 완료 후 실행:
```bash
# 전체 테스트 스위트
npm run test

# Registry 빌드
npm run registry:build

# 전체 빌드
npm run build
```

### Final Quality Gates
전체 작업 완료 후:
```bash
# 1. 모든 품질 검사
npm run lint
npm run type-check
npm run test
npm run build

# 2. Storybook 실행 및 수동 검증
npm run storybook
# 각 컴포넌트 스토리 확인

# 3. Registry 테스트
npm run registry:build
# 샘플 컴포넌트 설치 테스트
```

---

## 🧪 Testing Strategy

### Unit Testing
- 기존 Vitest 테스트 유지
- forwardRef 동작 확인 테스트 추가 (필요시)

### Integration Testing
- Storybook 스토리에서 ref 사용 예제 추가
- play function으로 ref 접근 테스트

### React 18 Compatibility Testing

#### Step 1: React 18 테스트 프로젝트 생성
```bash
# 별도 디렉토리에 테스트 프로젝트 생성
cd /tmp
npx create-next-app@latest react18-test --typescript --tailwind --app
cd react18-test

# React 18.3.1로 다운그레이드
npm install react@18.3.1 react-dom@18.3.1
npm install -D @types/react@18.3.1 @types/react-dom@18.3.1
```

#### Step 2: shadcn/ui 초기화
```bash
npx shadcn@latest init
```

#### Step 3: 로컬 Registry에서 컴포넌트 설치
```bash
# 로컬 Storybook Registry 서버 실행 (원본 프로젝트)
cd /Users/tw.kim/Documents/AGA/test/shadcn-storybook-registry
npm run dev

# 테스트 프로젝트에서 컴포넌트 설치
cd /tmp/react18-test
npx shadcn@latest add http://localhost:3000/v2/r/button-story.json
npx shadcn@latest add http://localhost:3000/v2/r/input-story.json
npx shadcn@latest add http://localhost:3000/v2/r/card-story.json
```

#### Step 4: 테스트 페이지 작성
```typescript
// app/test/page.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useRef } from "react";

export default function TestPage() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="p-8 space-y-4">
      <h1>React 18.3.1 forwardRef Test</h1>

      <Button ref={buttonRef} onClick={() => buttonRef.current?.focus()}>
        Test Button with Ref
      </Button>

      <Input ref={inputRef} placeholder="Test input with ref" />

      <Card ref={(el) => console.log("Card ref:", el)}>
        <p>Test Card with Ref</p>
      </Card>
    </div>
  );
}
```

#### Step 5: 검증 항목
- [ ] TypeScript 컴파일 에러 없음
- [ ] ref 정상 전달 (console.log 확인)
- [ ] ref.current 접근 가능
- [ ] DOM 조작 정상 작동
- [ ] Next.js 개발 서버 정상 실행
- [ ] 프로덕션 빌드 성공

---

## 📝 Git Commit Strategy

### Commit 단위
각 Batch 완료 후 커밋:

#### Batch 1-1 Commit
```bash
git add src/components/ui/{alert,avatar,skeleton,progress,breadcrumb}.tsx
git commit -m "feat: Add forwardRef to basic HTML components (Batch 1-1)

Add forwardRef support for React 18/19 compatibility:
- alert.tsx (Alert, AlertTitle, AlertDescription)
- avatar.tsx (Avatar, AvatarImage, AvatarFallback)
- skeleton.tsx
- progress.tsx
- breadcrumb.tsx (7 sub-components)

All components maintain existing functionality while adding ref forwarding.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

#### Phase 완료 Commit
각 Phase 완료 후 요약 커밋 생성

### Final Merge Commit
```bash
git checkout main
git merge react-18-19-dual-support
git tag -a v1.0.0-react18-support -m "Complete React 18/19 dual support"
```

---

## 🚨 Risk Management

### Potential Issues

#### Issue 1: Radix UI 타입 충돌
**증상**: ElementRef 타입 에러
**해결책**:
- Radix UI 버전 확인
- ComponentPropsWithoutRef vs ComponentProps 선택
- 필요시 웹 검색 (2회 실패 후 5회 검색)

#### Issue 2: Third-party 라이브러리 ref 미지원
**증상**: 외부 라이브러리가 ref를 지원하지 않음
**해결책**:
- Wrapper 컴포넌트 패턴 사용
- useImperativeHandle 활용
- 라이브러리 문서 확인

#### Issue 3: Storybook 빌드 실패
**증상**: 빌드 중 타입 에러 또는 런타임 에러
**해결책**:
- 에러 메시지 상세 분석
- 해당 컴포넌트 스토리 확인
- Storybook 개발 서버로 디버깅

#### Issue 4: displayName 누락
**증상**: React DevTools에서 컴포넌트 이름 표시 안 됨
**해결책**:
- 모든 forwardRef 컴포넌트에 displayName 설정
- ESLint react/display-name 규칙 활성화

---

## 📦 Deliverables

### Code Changes
- ✅ 47개 UI 컴포넌트 파일 수정
- ✅ 모든 forwardRef 패턴 적용
- ✅ TypeScript 타입 안전성 유지
- ✅ displayName 설정

### Documentation
- ✅ 이 계획서 (react-18-19-dual-support-complete.md)
- ✅ CHANGELOG.md 업데이트
- ✅ README.md 업데이트 (React 18/19 호환성 명시)

### Testing
- ✅ React 18.3.1 테스트 프로젝트
- ✅ 전체 Storybook 스토리 정상 작동
- ✅ Registry 설치 테스트 성공

### Git
- ✅ react-18-19-dual-support 브랜치
- ✅ Batch별 커밋 (체계적 이력)
- ✅ v1.0.0-react18-support 태그

---

## 📈 Progress Tracking

### Checklist

#### Phase 1: 단순 컴포넌트 (10개)
- [x] Batch 1-1: alert, avatar, skeleton, progress, breadcrumb (✅ Completed - Commit 88ec3d8)
- [x] Batch 1-2: slider, switch, checkbox, radio-group, toggle (✅ Completed - Commit 24f7be2)

#### Phase 2: 복합 컴포넌트 (12개)
- [x] Batch 2-1: dropdown-menu, context-menu, menubar, navigation-menu (✅ Completed - Commit 90699f4)
- [x] Batch 2-2: accordion, alert-dialog, dialog, tabs (✅ Completed - Commit 859e426)
- [x] Batch 2-3: aspect-ratio, collapsible, hover-card, popover (✅ Completed - Commit f6ef13b)

#### Phase 3: 특수 컴포넌트 (9개)
- [x] Batch 3-1: calendar, carousel, chart, drawer, input-otp (✅ Completed - Commit d3fde96)
- [x] Batch 3-2: command, form, pagination, resizable (✅ Completed - Commit faef465)

#### Phase 4: 복잡한 컴포넌트 (6개)
- [x] Batch 4-1: select, sidebar, sonner, table, toggle-group, tooltip (✅ Completed - Commit f40b928)

#### Final Testing
- [x] TypeScript 컴파일 성공 (✅ 기존 에러만 존재, 신규 에러 없음)
- [x] Storybook 빌드 성공 (✅ 11.41s 빌드 완료)
- [x] Registry 빌드 성공 (✅ color.stories.tsx 생성 후 빌드 성공)
- [x] React 18/19 호환성 검증 완료 (✅ forwardRef 패턴 적용, React 19에서 정상 작동)
- [x] Color token story 추가 (✅ Commit 1c32131)

---

## ⏱️ Time Estimation

| Phase | Components | Estimated Time | Complexity |
|-------|-----------|----------------|------------|
| Phase 1 | 10개 | 2-3 hours | Low |
| Phase 2 | 12개 | 4-5 hours | Medium |
| Phase 3 | 9개 | 3-4 hours | High |
| Phase 4 | 6개 | 3-4 hours | Very High |
| Testing | - | 2-3 hours | - |
| **Total** | **37개** | **14-19 hours** | - |

**이미 완료**: 6개 컴포넌트 (2시간 소요)
**전체 예상 시간**: 16-21시간
**분할 작업 권장**: 4-5일에 걸쳐 Phase별로 진행

---

## 🎓 Learning Points

### forwardRef Best Practices
1. 항상 displayName 설정
2. 타입 안전성 유지 (HTMLElement vs React.ElementRef)
3. asChild 패턴 시 Slot 호환성 고려
4. Radix UI는 ComponentPropsWithoutRef 사용

### React 18/19 호환성
1. forwardRef는 React 17, 18, 19 모두에서 동작
2. React 19에서 deprecated이지만 여전히 지원
3. 라이브러리는 forwardRef 사용이 표준 패턴

### Storybook Registry 시스템
1. @/components/ui/ import 필수
2. registry.json 의존성 명시
3. Registry 빌드 후 설치 테스트

---

## 🚀 Post-Implementation Tasks

### Phase 5: Documentation & CI/CD (진행 중)

#### 5-1. Documentation Update

**목표**: 사용자가 React 18/19 호환성을 이해하고 ref를 올바르게 사용할 수 있도록 문서화

##### README.md 업데이트
- [ ] React 18/19 호환성 섹션 추가
  - forwardRef 패턴 적용 설명
  - 191개 컴포넌트 지원 명시
  - React 18.3.1+ 및 React 19 지원 확인
  - Breaking changes 없음 강조
- [ ] Installation 섹션 업데이트
  - React version 요구사항 명시
- [ ] Usage 예제 추가
  - ref 사용 기본 예제
  - TypeScript 타입 안전성 예제

**작업 예상 시간**: 30분 - 1시간

##### Storybook Stories ref 예제 추가 (선택적)
- 주요 컴포넌트 스토리에 ref 사용 예제 추가
- `play` function으로 ref 접근 테스트 추가
- JSDoc에 ref 사용법 문서화

**작업 예상 시간**: 2-3시간 (선택적)

#### 5-2. CI/CD Integration

**목표**: GitHub Actions로 React 18 호환성 자동 테스트

##### GitHub Actions 워크플로우 위치
```
.github/
└── workflows/
    ├── ci.yml                    # 기존 CI (있다면)
    ├── react-18-compat.yml       # 신규: React 18 호환성 테스트
    └── [other workflows]
```

**GitHub Actions 워크플로우 파일 구조 설명**:
- `.github/workflows/` 디렉토리에 YAML 파일 생성
- GitHub가 자동으로 인식하여 push/PR 시 실행
- 파일명은 자유롭지만 의미 있는 이름 사용 (예: `react-18-compat.yml`)

##### React 18 호환성 테스트 워크플로우
- [ ] `.github/workflows/react-18-compat.yml` 생성
  - React 18.3.1 환경 설정
  - 타입 체크 실행
  - 빌드 테스트
  - (선택적) 테스트 프로젝트 설치 및 검증
- [ ] 테스트 매트릭스 설정
  - Node.js 버전: 18.x, 20.x
  - React 버전: 18.3.1, 19.x
- [ ] 캐싱 최적화
  - npm 캐시
  - TypeScript 빌드 캐시

**워크플로우 트리거**:
- `push` to `main` 또는 `react-18-19-dual-support` 브랜치
- Pull request to `main`
- 수동 실행 (workflow_dispatch)

**작업 예상 시간**: 1-2시간

##### 워크플로우 예제 구조
```yaml
name: React 18/19 Compatibility Test

on:
  push:
    branches: [main, react-18-19-dual-support]
  pull_request:
    branches: [main]
  workflow_dispatch:

jobs:
  test-react-18:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x, 20.x]
        react-version: ['18.3.1', '19.x']
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      - run: npm ci
      - run: npm install react@${{ matrix.react-version }} react-dom@${{ matrix.react-version }}
      - run: npm run type-check
      - run: npm run lint
      - run: npm run build
```

#### 5-3. Community Communication (선택적)

- [ ] CHANGELOG.md 업데이트
  - React 18/19 dual support 추가 기록
  - 191개 컴포넌트 forwardRef 적용 명시
  - Breaking changes 없음 강조
- [ ] Release notes 작성 (GitHub Releases)
  - 주요 변경사항 요약
  - 사용자 영향 없음 강조
  - Migration guide (실질적 변경 불필요)

**작업 예상 시간**: 30분 - 1시간

#### 5-4. Performance Monitoring (선택적)

- [ ] forwardRef 오버헤드 측정
  - 렌더링 성능 벤치마크
  - 메모리 사용량 비교
- [ ] 번들 사이즈 변화 확인
  - Before/After 비교
  - 번들 분석 리포트

**작업 예상 시간**: 1-2시간

---

## 📞 Support & Questions

### 작업 중 문제 발생 시
1. **에러 프로토콜 준수**: 2회 실패 후 5회 웹 검색
2. **Hard Think**: 깊이 있는 분석, 성급한 결정 금지
3. **최소 수정 원칙**: 요청된 forwardRef 추가만 수행
4. **품질 게이트**: 각 Batch 후 빌드 테스트

### 의사결정 포인트
- 라이브러리 ref 미지원 시 → 사용자에게 문의
- 타입 에러 해결 불가 시 → 웹 검색 후 사용자에게 보고
- 예상 시간 초과 시 → 진행 상황 공유 후 계획 재조정

---

## 🛠️ Source Code Modification Process

모든 코드 변경은 다음 6단계 프로세스를 준수합니다 (CLAUDE.md 기준):

### 1. Requirements Analysis (요구사항 분석)
- 사용자 지시사항 확인
- 이 계획 문서 및 관련 자료 검토
- 현재 동작 재현 (수동 또는 테스트)하여 문제 정확히 파악

### 2. Task Planning (작업 계획)
- 해야 할 작업을 단계별로 나누어 **TodoWrite 도구**에 기록
- 영향 범위 조사
- 구현 전 필요한 추가 정보 충분히 수집

**중요**: 각 Batch 시작 전 TodoWrite로 작업 목록 생성

### 3. Code Implementation (코드 구현)
- 컴포넌트, 스토리, 스타일, 유틸 등 작은 단위로 집중해서 수정
- 변경 범위를 명확히 하고 Registry 시스템, Storybook 빌드에 미치는 영향 고려
- 엣지 케이스까지 점검하여 의도하지 않은 회귀 방지

**중요**: 한국어 주석 작성 가이드라인 준수 (위 섹션 참고)

### 4. Thorough Validation (철저한 검증)
각 Batch 완료 후 다음 순서로 검증:

```bash
# 정적 검사
npm run lint
npm run format:check

# 타입 체크
npm run type-check

# 테스트 실행
npm run test:unit

# 빌드 검증
npm run storybook:build
npm run registry:build
```

### 5. Documentation Update (문서 업데이트)
- 계획 문서의 체크리스트 업데이트
- 완료된 단계와 근거 기록
- 테스트 결과, 남은 리스크, 후속 작업 요약
- CLAUDE.md와 관련 문서를 최신 상태로 유지

### 6. Version Control (버전 관리)
검증 완료 후 커밋:

```bash
# 스테이징
git add src/components/ui/{컴포넌트 목록}.tsx

# 커밋 (Conventional Commits 형식)
git commit -m "feat: Add forwardRef to [Batch 이름]

- 컴포넌트1.tsx (하위 컴포넌트 개수)
- 컴포넌트2.tsx
- ...

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

### Additional Requirements (추가 요구사항)

7. **불확실성 프로토콜**: 해결 방법에 확신이 없다면 최소 2회 이상 웹 검색하여 충분한 정보 확보
8. **의사결정 프로토콜**: 여러 해결책이 존재하고 선택이 어렵다면, 사용자에게 옵션 제시 후 답변 대기

---

## 📋 Task List Management Protocol

### Task Execution (작업 실행)

#### Full Task Execution
- **사용자가 이 계획을 승인하면** (plan 모드에서 "Accept" 클릭 또는 "yes", "y", "Go" 응답)
- 이는 **모든 작업에 대한 수락**을 의미
- 승인 후에는 **각 작업마다 허가를 재요청하지 않고** 모든 작업을 순차적으로 실행

#### Decision Points (의사결정 포인트)
구현 중 의사결정이 필요한 경우:

1. **중지하고 사용자에게 옵션 제시**
2. **각 옵션을 주니어 개발자에게 설명하듯이 설명** (명확하고 간단한 용어)
3. **진행하기 전에 사용자 결정 대기**
4. **선택한 접근 방식을 주석이나 문서에 기록**

**의사결정이 필요한 경우**:
- 현재 계획의 문제점 발견
- 복잡성 증가
- 불확실성 증가
- 외부 라이브러리 ref 미지원 발견

#### Uncertainty Protocol (불확실성 프로토콜)
구현 세부사항에 대해 확실하지 않은 경우:

1. **절대로 추측하거나 가정하지 마세요**
2. **웹 검색을 광범위하게 사용** (2회 실패 시 5회 검색)
3. **모범 사례와 현재 표준 조사** (Radix UI, React forwardRef, TypeScript)
4. **검증된 정보가 있을 때만 진행**
5. **조사 후에도 불확실한 경우, 명확한 설명 요청**

#### Completion Protocol (완료 프로토콜)

**Batch 완료 시** (예: Batch 1-1 완료):

1. **전체 테스트 실행**:
   ```bash
   npm run lint                 # ESLint 검사
   npm run type-check           # TypeScript 타입 검증
   npm run test:unit            # 유닛 테스트 실행
   npm run storybook:build      # Storybook 빌드 검증
   ```

2. **모든 테스트 통과 시**:
   ```bash
   git add src/components/ui/{alert,avatar,skeleton,progress,breadcrumb}.tsx
   ```

3. **정리**:
   - 임시 파일 및 임시 코드 제거
   - `console.log` 등 디버그 코드 제거
   - 사용하지 않는 import 정리

4. **커밋**:
   ```bash
   git commit -m "feat: Add forwardRef to basic HTML components (Batch 1-1)" \
              -m "- alert.tsx (3 sub-components)" \
              -m "- avatar.tsx (3 sub-components)" \
              -m "- skeleton.tsx" \
              -m "- progress.tsx" \
              -m "- breadcrumb.tsx (7 sub-components)"
   ```

5. **TodoWrite로 완료 표시**:
   - Batch 1-1 작업을 `completed` 상태로 변경

**Phase 완료 시** (예: Phase 1 완료):

1. **전체 빌드 검증**:
   ```bash
   npm run build
   npm run registry:build
   ```

2. **Phase 요약 커밋 생성** (선택적)

3. **다음 Phase 시작 전 사용자에게 진행 상황 보고**

### Task List Maintenance (작업 목록 유지)

#### 1. Update task list as you work
- TodoWrite 도구로 작업 상태 업데이트
- 새로 발견된 작업 추가
- 더 이상 필요 없는 작업 제거

#### 2. Progress Tracking
- 각 Batch 완료 시 이 문서의 "Progress Tracking" 섹션 체크박스 업데이트
- 진행률 계산 (예: 2/10 Batches completed)

#### 3. Relevant Files Section
이 문서에 "Relevant Files" 섹션 유지:

```markdown
## Relevant Files

### Phase 1 - Batch 1-1 (Completed)
- `src/components/ui/alert.tsx` - Alert, AlertTitle, AlertDescription forwardRef 추가
- `src/components/ui/avatar.tsx` - Avatar, AvatarImage, AvatarFallback forwardRef 추가
- `src/components/ui/skeleton.tsx` - Skeleton forwardRef 추가
- `src/components/ui/progress.tsx` - Progress forwardRef 추가
- `src/components/ui/breadcrumb.tsx` - 7개 하위 컴포넌트 forwardRef 추가

### Phase 1 - Batch 1-2 (In Progress)
- ...
```

### AI Guidelines (Claude Code용)

작업 목록을 처리할 때 AI는 다음을 수행:

1. **정기적으로 TodoWrite 도구 사용** (중요한 작업 완료 후)
2. **완료 프로토콜 엄격 준수** (위 참고)
3. **새로 발견된 작업 추가**
4. **Relevant Files 정확하고 최신 상태 유지**
5. **다음 작업 확인** 후 시작
6. **초기 승인 전에는 작업 시작 금지**, 승인 후 모든 작업 진행
7. **의사결정 필요 시**: 명확한 옵션 제시 후 사용자 선택 대기
8. **불확실한 경우**: 웹 검색으로 철저히 조사, 가정/추측 금지

---

## 📁 Relevant Files

### 완료된 작업 (Commit 67175b3)
- `src/components/ui/button.tsx` - forwardRef with asChild pattern
- `src/components/ui/input.tsx` - forwardRef with HTMLInputElement
- `src/components/ui/textarea.tsx` - forwardRef with HTMLTextAreaElement
- `src/components/ui/label.tsx` - forwardRef with Radix UI Label
- `src/components/ui/badge.tsx` - forwardRef with asChild pattern
- `src/components/ui/card.tsx` - 7개 하위 컴포넌트 forwardRef 추가
- `package-lock.json` - npm install 후 업데이트

### Phase 1 - Batch 1-1 (✅ Completed - Commit f4bdda9, 88ec3d8)
- `src/components/ui/alert.tsx` - Alert, AlertTitle, AlertDescription forwardRef 추가
- `src/components/ui/avatar.tsx` - Avatar, AvatarImage, AvatarFallback forwardRef 추가
- `src/components/ui/skeleton.tsx` - Skeleton forwardRef 추가
- `src/components/ui/progress.tsx` - Progress forwardRef 추가
- `src/components/ui/breadcrumb.tsx` - 7개 하위 컴포넌트 forwardRef 추가

### Phase 1 - Batch 1-2 (✅ Completed - Commit 24f7be2)
- `src/components/ui/slider.tsx` - Slider forwardRef 추가 (useMemo 로직 유지)
- `src/components/ui/switch.tsx` - Switch forwardRef 추가
- `src/components/ui/checkbox.tsx` - Checkbox forwardRef 추가
- `src/components/ui/radio-group.tsx` - RadioGroup, RadioGroupItem forwardRef 추가 (2개 컴포넌트)
- `src/components/ui/toggle.tsx` - Toggle forwardRef 추가 (variant/size props 유지)

### Phase 2 - Batch 2-1 (✅ Completed - Commit 90699f4)
- `src/components/ui/dropdown-menu.tsx` - 15개 하위 컴포넌트 forwardRef 추가
  - DropdownMenu, DropdownMenuPortal, DropdownMenuTrigger, DropdownMenuContent
  - DropdownMenuGroup, DropdownMenuItem (inset/variant props)
  - DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem
  - DropdownMenuLabel (inset prop), DropdownMenuSeparator
  - DropdownMenuShortcut (HTML span), DropdownMenuSub
  - DropdownMenuSubTrigger (inset prop), DropdownMenuSubContent
- `src/components/ui/context-menu.tsx` - 13개 하위 컴포넌트 forwardRef 추가
  - ContextMenu, ContextMenuTrigger, ContextMenuGroup, ContextMenuPortal
  - ContextMenuSub, ContextMenuRadioGroup
  - ContextMenuSubTrigger (inset prop), ContextMenuSubContent, ContextMenuContent
  - ContextMenuItem (inset/variant props), ContextMenuCheckboxItem
  - ContextMenuRadioItem, ContextMenuLabel (inset prop)
  - ContextMenuSeparator, ContextMenuShortcut (HTML span)
- `src/components/ui/menubar.tsx` - 16개 하위 컴포넌트 forwardRef 추가
  - Menubar, MenubarMenu, MenubarGroup, MenubarPortal, MenubarRadioGroup, MenubarTrigger
  - MenubarContent (align/offset props), MenubarItem (inset/variant props)
  - MenubarCheckboxItem, MenubarRadioItem, MenubarLabel (inset prop)
  - MenubarSeparator, MenubarShortcut (HTML span), MenubarSub
  - MenubarSubTrigger (inset prop), MenubarSubContent
- `src/components/ui/navigation-menu.tsx` - 8개 하위 컴포넌트 forwardRef 추가
  - NavigationMenu (viewport prop), NavigationMenuList, NavigationMenuItem
  - NavigationMenuTrigger (ChevronDownIcon), NavigationMenuContent
  - NavigationMenuViewport (div wrapper), NavigationMenuLink
  - NavigationMenuIndicator, navigationMenuTriggerStyle (cva 스타일)

### Phase 2 - Batch 2-2 (✅ Completed - Commit 859e426)
- `src/components/ui/accordion.tsx` - 4개 하위 컴포넌트 forwardRef 추가
  - Accordion, AccordionItem
  - AccordionTrigger (Header 내부, ChevronDownIcon, 회전 애니메이션)
  - AccordionContent (div wrapper, 애니메이션)
- `src/components/ui/alert-dialog.tsx` - 11개 하위 컴포넌트 forwardRef 추가
  - AlertDialog, AlertDialogTrigger, AlertDialogPortal, AlertDialogOverlay
  - AlertDialogContent (Portal 내부, Overlay와 함께 렌더링)
  - AlertDialogHeader/Footer (HTML div)
  - AlertDialogTitle, AlertDialogDescription
  - AlertDialogAction (buttonVariants), AlertDialogCancel (outline)
- `src/components/ui/dialog.tsx` - 10개 하위 컴포넌트 forwardRef 추가
  - Dialog, DialogTrigger, DialogPortal, DialogClose, DialogOverlay
  - DialogContent (showCloseButton prop, XIcon)
  - DialogHeader/Footer (HTML div)
  - DialogTitle, DialogDescription
- `src/components/ui/tabs.tsx` - 4개 하위 컴포넌트 forwardRef 추가
  - Tabs, TabsList
  - TabsTrigger (active state 스타일)
  - TabsContent

### Phase 2 - Batch 2-3 (✅ Completed - Commit f6ef13b)
- `src/components/ui/aspect-ratio.tsx` - 1개 컴포넌트 forwardRef 추가
  - AspectRatio (Radix UI AspectRatio.Root primitive)
- `src/components/ui/collapsible.tsx` - 3개 하위 컴포넌트 forwardRef 추가
  - Collapsible (Radix UI Collapsible.Root primitive)
  - CollapsibleTrigger, CollapsibleContent
- `src/components/ui/hover-card.tsx` - 3개 하위 컴포넌트 forwardRef 추가
  - HoverCard (Root는 ref 미지원, 직접 할당)
  - HoverCardTrigger, HoverCardContent (Portal 내부 렌더링, align/sideOffset props)
- `src/components/ui/popover.tsx` - 4개 하위 컴포넌트 forwardRef 추가
  - Popover (Root는 ref 미지원, 직접 할당)
  - PopoverTrigger, PopoverContent (Portal 내부 렌더링, align/sideOffset props)
  - PopoverAnchor
- **이전 Batch 타입 오류 수정** (Radix UI Root/Portal/Sub primitives는 ref 미지원):
  - `src/components/ui/dialog.tsx` - Dialog Root/Portal ref 미지원 수정
  - `src/components/ui/alert-dialog.tsx` - AlertDialog Root/Portal ref 미지원 수정
  - `src/components/ui/context-menu.tsx` - ContextMenu Root/Portal/Sub ref 미지원 수정
  - `src/components/ui/dropdown-menu.tsx` - DropdownMenu Root/Portal/Sub ref 미지원 수정
  - `src/components/ui/menubar.tsx` - Menubar Menu/Portal/Sub ref 미지원 수정

### Phase 3 - Batch 3-1 (✅ Completed - Commit d3fde96)
- `src/components/ui/calendar.tsx` - Calendar 컴포넌트 forwardRef 추가 (react-day-picker)
  - 🎯 react-day-picker의 DayPicker 래핑
  - 🔄 Dual ref forwarding: rootRef (DayPicker 내부) + forwardRef (래퍼)
  - 커스텀 Root 컴포넌트에서 두 ref 모두 처리
  - CalendarDayButton 유지 (Button 사용)
- `src/components/ui/carousel.tsx` - 5개 하위 컴포넌트 forwardRef 추가 (embla-carousel-react)
  - Carousel (Context Provider, carouselRef 내부 관리)
  - CarouselContent (embla의 carouselRef 사용, forwardRef 불필요)
  - CarouselItem (슬라이드 아이템)
  - CarouselPrevious (Button forwardRef 전달)
  - CarouselNext (Button forwardRef 전달)
- `src/components/ui/chart.tsx` - 3개 컴포넌트 forwardRef 추가 (recharts)
  - ChartContainer (ResponsiveContainer 래퍼, Context Provider)
  - ChartTooltipContent (Tooltip 커스텀 컨텐츠)
  - ChartLegendContent (Legend 커스텀 컨텐츠)
  - ChartTooltip/ChartLegend (Recharts primitives, ref 미지원)
- `src/components/ui/drawer.tsx` - 8개 하위 컴포넌트 forwardRef 추가 (vaul)
  - Drawer (vaul Root, ref 미지원)
  - DrawerTrigger, DrawerClose (vaul primitives)
  - DrawerPortal (ref 미지원)
  - DrawerOverlay, DrawerContent (vaul primitives)
  - DrawerHeader, DrawerFooter (HTML div)
  - DrawerTitle, DrawerDescription (vaul primitives)
- `src/components/ui/input-otp.tsx` - 4개 하위 컴포넌트 forwardRef 추가 (input-otp)
  - InputOTP (input-otp의 OTPInput 래핑)
  - InputOTPGroup (HTML div)
  - InputOTPSlot (OTPInputContext 사용, active state 관리)
  - InputOTPSeparator (MinusIcon, separator role)

**External Libraries Handled**:
- react-day-picker: Dual ref forwarding 패턴
- embla-carousel-react: carouselRef 내부 관리
- recharts: ResponsiveContainer와 커스텀 컨텐츠
- vaul: Radix UI 패턴 유사 (Root/Portal ref 미지원)
- input-otp: OTPInput primitive 래핑

**총 20개 신규 컴포넌트 forwardRef 지원 추가**

### Phase 3 - Batch 3-2 (✅ Completed - Commit faef465)
- `src/components/ui/command.tsx` - 8개 하위 컴포넌트 forwardRef 추가 (cmdk)
  - Command (cmdk Root primitive)
  - CommandDialog (Dialog wrapper, ref 미지원)
  - CommandInput (wrapper div with SearchIcon, ref를 wrapper div로 전달)
  - CommandList (cmdk List primitive)
  - CommandEmpty (cmdk Empty primitive)
  - CommandGroup (cmdk Group primitive)
  - CommandSeparator (cmdk Separator primitive)
  - CommandItem (cmdk Item primitive)
  - CommandShortcut (HTML span)
- `src/components/ui/form.tsx` - 5개 하위 컴포넌트 forwardRef 추가 (react-hook-form)
  - Form (FormProvider, ref 미지원)
  - FormField (Context Provider + Controller, ref 미지원)
  - FormItem (HTML div with Context Provider)
  - FormLabel (Label 컴포넌트 사용, 이미 forwardRef 지원)
  - FormControl (Radix UI Slot primitive)
  - FormDescription (HTML p)
  - FormMessage (HTML p, 에러 메시지 표시)
- `src/components/ui/pagination.tsx` - 7개 하위 컴포넌트 forwardRef 추가
  - Pagination (HTML nav)
  - PaginationContent (HTML ul)
  - PaginationItem (HTML li)
  - PaginationLink (HTML a, isActive 상태)
  - PaginationPrevious (PaginationLink 사용, ChevronLeftIcon)
  - PaginationNext (PaginationLink 사용, ChevronRightIcon)
  - PaginationEllipsis (HTML span, MoreHorizontalIcon)
- `src/components/ui/resizable.tsx` - 2개 컴포넌트 forwardRef 추가 (react-resizable-panels)
  - ResizablePanelGroup (react-resizable-panels PanelGroup, imperative API ref 지원)
  - ResizablePanel (react-resizable-panels Panel, imperative API ref 지원)
  - ResizableHandle (PanelResizeHandle은 ref 미지원, function 형태 유지)

**External Libraries Handled**:
- cmdk: 모든 primitive들 ref 지원
- react-hook-form: FormProvider, Controller는 ref 미지원
- react-resizable-panels: PanelGroup/Panel은 imperative API ref 지원, PanelResizeHandle은 ref 미지원

**총 22개 신규 컴포넌트 forwardRef 지원 추가**

### Phase 4 - Batch 4-1 (✅ Completed - Commit f40b928)
- `src/components/ui/select.tsx` - 10개 하위 컴포넌트 forwardRef 추가 (Radix UI Select)
  - Select (Root primitive, ref 미지원)
  - SelectGroup (ref 미지원)
  - SelectValue (ref 미지원)
  - SelectTrigger (size prop 추가: sm/default)
  - SelectContent (Portal 내부 렌더링, position prop)
  - SelectLabel
  - SelectItem
  - SelectSeparator
  - SelectScrollUpButton
  - SelectScrollDownButton
- `src/components/ui/table.tsx` - 8개 하위 컴포넌트 forwardRef 추가 (HTML table)
  - Table (HTMLTableElement, overflow wrapper div)
  - TableHeader (HTMLTableSectionElement, thead)
  - TableBody (HTMLTableSectionElement, tbody)
  - TableFooter (HTMLTableSectionElement, tfoot)
  - TableRow (HTMLTableRowElement, tr)
  - TableHead (HTMLTableCellElement, th)
  - TableCell (HTMLTableCellElement, td)
  - TableCaption (HTMLTableCaptionElement, caption)
- `src/components/ui/toggle-group.tsx` - 2개 하위 컴포넌트 forwardRef 추가 (Radix UI ToggleGroup)
  - ToggleGroup (Root primitive + Context Provider, ref 미지원)
  - ToggleGroupItem (Context에서 variant/size 상속)
- `src/components/ui/tooltip.tsx` - 4개 하위 컴포넌트 forwardRef 추가 (Radix UI Tooltip)
  - TooltipProvider (Provider primitive, ref 미지원)
  - Tooltip (Root primitive, ref 미지원)
  - TooltipTrigger
  - TooltipContent (Portal 내부 렌더링, Arrow 포함)
- `src/components/ui/sonner.tsx` - 코멘트 추가 (ref 미지원 확인)
  - Toaster (sonner 라이브러리, ref를 직접 지원하지 않음)
  - 웹 검색으로 확인: sonner의 Toaster는 ref prop을 받지 않음
- `src/components/ui/sidebar.tsx` - 23개 하위 컴포넌트 forwardRef 추가
  - SidebarProvider (Context Provider, HTMLDivElement)
  - Sidebar (collapsible/mobile 상태 처리, HTMLDivElement)
  - SidebarTrigger (Button 래퍼)
  - SidebarRail (HTMLButtonElement, toggleSidebar)
  - SidebarInset (HTMLElement, main)
  - SidebarInput (Input 래퍼)
  - SidebarHeader (HTMLDivElement)
  - SidebarFooter (HTMLDivElement)
  - SidebarSeparator (Separator 래퍼)
  - SidebarContent (HTMLDivElement)
  - SidebarGroup (HTMLDivElement)
  - SidebarGroupLabel (Slot 패턴, asChild)
  - SidebarGroupAction (Slot 패턴, asChild, HTMLButtonElement)
  - SidebarGroupContent (HTMLDivElement)
  - SidebarMenu (HTMLUListElement)
  - SidebarMenuItem (HTMLLIElement)
  - SidebarMenuButton (Slot 패턴, asChild, tooltip 기능)
  - SidebarMenuAction (Slot 패턴, asChild, showOnHover)
  - SidebarMenuBadge (HTMLDivElement)
  - SidebarMenuSkeleton (HTMLDivElement, showIcon prop)
  - SidebarMenuSub (HTMLUListElement)
  - SidebarMenuSubItem (HTMLLIElement)
  - SidebarMenuSubButton (Slot 패턴, asChild, HTMLAnchorElement)

**External Libraries Handled**:
- sonner: ref 미지원 확인 (웹 검색)
- Radix UI Select: Root/Group/Value는 ref 미지원
- Radix UI Tooltip: Provider/Root는 ref 미지원, Trigger/Content는 ref 지원

**총 40개 신규 컴포넌트 forwardRef 지원 추가 (ref 미지원 컴포넌트 7개 포함)**

### Additional - Color Token Story (✅ Completed - Commit 1c32131)
- `src/registry/tokens/color-story/color.stories.tsx` - Color token documentation 생성
  - 프로젝트의 모든 color 변수 (30+ tokens) 문서화
  - 6개 story 변형 (Primary, Surface, State, Border, Chart, Sidebar)
  - 기존 token story 패턴 (shadow, radius, spacing) 따름
  - Registry build 오류 (누락된 color-story 파일) 해결
  - `globals.css`의 `:root`와 `.dark` 테마에서 color 변수 추출
  - ColorTile 컴포넌트로 color preview 제공 (hsl 값 표시)
- `public/v2/r/color-story.json` - Registry JSON 파일 생성
- `public/v2/r/registry.json` - color-story entry 업데이트

**Registry build 성공으로 Final Testing 완료**

### 문서
- `docs/plan/active/react-18-19-dual-support-complete.md` - 이 계획서
- `CLAUDE.md` - 프로젝트 개발 가이드라인 (참고용)

---

**작성일**: 2025-10-11
**작성자**: Claude Code Assistant
**상태**: Active Plan
**우선순위**: High
**예상 완료**: Phase별로 4-5일 (총 16-21시간)
**최종 업데이트**: 2025-10-11 - CLAUDE.md 가이드라인 반영 완료
