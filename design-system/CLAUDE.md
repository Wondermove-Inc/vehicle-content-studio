# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a shadcn/ui Storybook registry that serves as both documentation and a distribution system for shadcn components with Storybook stories. The registry allows users to install pre-built Storybook stories alongside shadcn/ui components via the shadcn CLI.

**Tech Stack:**
- **Framework**: React 18.3.1 / 19.1.1 with TypeScript (dual version support)
- **Router**: react-router-dom v7.9.4 (for Link components in stories)
- **UI Library**: shadcn/ui (46/51 components with stories)
- **Documentation**: Storybook 9 with Vite (@storybook/react-vite)
- **Testing**: Vitest with dual projects (unit + Storybook browser tests via Playwright)
- **Styling**: Tailwind CSS v4 with design tokens
- **Package Manager**: Supports both npm and bun (README uses bun, package.json scripts use npm/bun mixed)

**React Version Compatibility:**
- **Current Version**: React 18.3.1 (default)
- **Supported Versions**: React 18.3.1 || React 19.1.1
- **peerDependencies**: Configured to support both versions
- **Compatibility**: All 46 UI components tested and working on both versions

## Essential Commands

### Development
```bash
# Storybook development (primary workflow)
npm run storybook                    # Port 6006

# Registry development with auto-rebuild
npm run registry:dev                 # Watch mode for registry changes
```

### Building
```bash
# Full production build (Storybook + Registry)
npm run build                        # Runs npm run storybook:build

# Registry build (generates public/v2/r/*.json)
npm run registry:build               # Required after story changes

# Storybook only
npm run storybook:build              # Outputs to storybook-static
```

### Testing
```bash
# Run all tests
npm run test

# Run unit tests only
npm run test:unit

# Run Storybook browser tests (Playwright)
npm run test:storybook

# Run Storybook test runner
npm run storybook:test

# Type checking
npm run type-check

# Linting
npm run lint
```

### Code Quality
```bash
# Format code
npm run format:write

# Check formatting
npm run format:check
```

### Testing Registry Locally
After running `npm run registry:build`, test component installation:
```bash
npx shadcn@latest add http://localhost:3000/v2/r/button-story.json
```

### Background Server Management
```bash
# Storybook 백그라운드 실행
nohup npm run storybook > storybook.log 2>&1 &

# 프로세스 확인
ps aux | grep storybook | grep -v grep

# 프로세스 종료
pkill -f "storybook"

# 로그 확인
tail -f storybook.log
```

## Architecture

### Directory Structure
```
src/
├── components/ui/        # shadcn/ui components (installed)
├── hooks/                # Custom React hooks
├── lib/                  # Utilities (cn(), etc.)
└── registry/             # ⚠️ PRIMARY WORK AREA
    ├── atoms/            # Component stories (accordion, button, etc.)
    ├── tokens/           # Design token documentation (color, typography, spacing, shadow, radius)
    ├── foundation/       # Foundation components
    └── templates/        # Template examples

registry.json             # Registry manifest (maps stories to dependencies)
components.json           # shadcn CLI configuration
```

**Important**: All development work focuses on the `src/registry/` directory. Component stories in `registry/` serve dual purposes:
1. Storybook documentation
2. Installable components via shadcn CLI

### Atomic Design Organization
- **atoms/**: Individual component stories (46 shadcn components)
- **tokens/**: Design system documentation (color, typography, spacing, shadow, radius)
- **foundation/**: Foundation-level components
- **templates/**: Complete template examples

### Registry System

Each story requires an entry in `registry.json`:
```json
{
  "name": "button-story",
  "type": "registry:component",
  "title": "Button Story",
  "description": "Interactive Storybook stories for button component",
  "categories": ["atoms", "storybook"],
  "registryDependencies": ["button"],      // shadcn/ui components
  "dependencies": ["lucide-react"],        // npm packages
  "files": [{
    "path": "src/registry/atoms/button-story/button.stories.tsx",
    "type": "registry:component"
  }]
}
```

**Dependency Types:**
- `registryDependencies`: shadcn/ui components (e.g., `["button", "form"]`)
- `dependencies`: External npm packages (e.g., `["lucide-react", "zod", "recharts", "react-router-dom"]`)

**Note**: Stories using `<Link>` components should include `"react-router-dom"` in dependencies.

### Path Aliases (Critical for Registry Build)
```typescript
// tsconfig.json paths - ALWAYS use these imports
"@/components/*"  // src/components/*
"@/lib/*"         // src/lib/*
"@/hooks/*"       // src/hooks/*
"@/registry/*"    // src/registry/*
```

**⚠️ CRITICAL**: Always use `@/components/ui/` imports in stories. The registry build system depends on this pattern.

### React Version Switching

The project supports both React 18.3.1 and React 19.1.1. To switch between versions:

#### Switch to React 19
```bash
# 1. Update package.json React versions
#    react: "19.1.1"
#    react-dom: "19.1.1"
#    @types/react: "^19.1.13"
#    @types/react-dom: "^19.1.9"

# 2. Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# 3. Verify everything works
npm run lint
npm run type-check
npm run registry:build
npm run build
```

#### Switch to React 18
```bash
# 1. Update package.json React versions
#    react: "18.3.1"
#    react-dom: "18.3.1"
#    @types/react: "18.3.3"
#    @types/react-dom: "18.3.3"

# 2. Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# 3. Verify everything works
npm run lint
npm run type-check
npm run registry:build
npm run build
```

#### Compatibility Notes
- **forwardRef**: Works in both versions (deprecated in React 19 but still functional)
- **PropTypes/defaultProps**: Not used in this project
- **TypeScript Types**: @types/react 18.x vs 19.x have minor differences
- **All Components**: 46 shadcn/ui components tested and verified on both versions
- **Build System**: Storybook 9 with Vite supports both React versions
- **No Breaking Changes**: Code works identically on both versions

## Storybook Development

### Story Structure Pattern
```typescript
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Component } from "@/components/ui/component";

/**
 * Main component description explaining purpose and usage.
 */
const meta: Meta<typeof Component> = {
  title: "ui/Component",              // Category: ui, design, foundation, templates
  component: Component,
  tags: ["autodocs"],
  parameters: { layout: "centered" }, // or "fullscreen", "padded"
  args: {
    // Default args (omit if stories need individual variants)
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * JSDoc description for each story variant.
 */
export const Default: Story = {};

/**
 * Use 'outline' variant for secondary actions.
 */
export const Outline: Story = {
  render: () => <Component variant="outline">Outline</Component>
};
```

### Story Categories (title field)
- `ui/ComponentName` - Core shadcn/ui components
- `design/TokenName` - Design token documentation
- `foundation/ComponentName` - Foundation components
- `templates/TemplateName` - Template examples

### Required Stories
- `Default`: Basic component usage
- Common variants: Loading, Disabled, sizes (sm, default, lg), variants (default, secondary, outline, ghost, etc.)
- Interactive components need `play` function test stories

### Testing Stories
```typescript
// Test-only stories (hidden from docs)
export const InteractionTest: Story = {
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button'));
    await expect(canvas.getByText('Success')).toBeInTheDocument();
  }
};
```

### Storybook Configuration
- **Port**: 6006
- **Addons**: Docs, A11y (todo level), Vitest, Themes, React Router (storybook-addon-remix-react-router)
- **Theme Support**: Light/dark mode via `addon-themes`
- **Story Sort**: foundation → design → ui → templates → alphabetical
- **Path Aliases**: Configured via `vite-tsconfig-paths` plugin to resolve `@/*` imports

## Code Style Guidelines

### TypeScript
- Use `satisfies Meta<typeof Component>` for type safety
- Prefer explicit types over `any`
- Define form schemas with `zod`

### Imports
```typescript
// Framework imports
import type { Meta, StoryObj } from "@storybook/react-vite";

// ALWAYS use @ imports for components
import { Button } from "@/components/ui/button";

// Icons (standard library)
import { ChevronRight, Loader2 } from "lucide-react";

// Router (for navigation components)
import { Link } from "react-router-dom";
```

### Common Patterns

#### Forms with Validation
```typescript
// Use react-hook-form + zod
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
});

// Include success and error test scenarios
```

#### Charts (recharts)
```typescript
import { ChartContainer, ChartConfig } from "@/components/ui/chart";
import { LineChart, Line, CartesianGrid, XAxis } from "recharts";

const chartConfig: ChartConfig = {
  /* theme configuration */
};
```

#### Design Tokens
```typescript
// Read CSS custom properties
const styles = getComputedStyle(document.documentElement);
const value = styles.getPropertyValue('--radius');
```

#### Separator (세로 구분선)
**🚨 중요**: 세로 Separator는 반드시 부모 컨테이너에 명시적 높이가 필요합니다.

**문제**: Radix UI Separator의 `data-[orientation=vertical]:h-full` CSS가 사용자 설정 높이를 덮어써서 부모 높이가 없으면 0이 됩니다.

```typescript
// ❌ 잘못된 사용 - 높이가 0이 되어 보이지 않음
<div className="flex items-center gap-2">
  <Separator orientation="vertical" className="h-5" />
</div>

// ✅ 올바른 사용 - 부모에 높이 + 인라인 스타일 백업
<div className="flex items-center gap-2 min-h-[40px]">
  <Separator 
    orientation="vertical" 
    className="h-5 w-px bg-border"
    style={{ height: '20px', width: '1px' }}
  />
</div>

// ✅ 툴바/버튼 그룹에서 사용
<div className="flex items-center rounded-md border px-3">
  <button className="h-10 px-2">Bold</button>
  <Separator 
    orientation="vertical" 
    className="mx-2 h-6"
    style={{ height: '24px', width: '1px' }}
  />
  <button className="h-10 px-2">Italic</button>
</div>
```

**핵심 규칙**:
1. 부모 컨테이너에 `min-h-[Npx]` 또는 `h-[Npx]` 필수
2. Separator에 `style={{ height: 'Npx', width: '1px' }}` 백업 적용
3. `bg-border` 클래스로 테마 일관성 유지

## Testing Strategy

### Vitest Dual Project Setup
1. **Storybook Project**: Browser-based tests via Playwright
   - Tests stories directly in browser context
   - Validates interactions, accessibility
   - Run with: `npm run test:storybook`

2. **Unit Project**: Traditional unit tests
   - Component logic testing
   - Run with: `npm run test:unit`

### Accessibility Testing
- A11y addon configured with `test: "todo"` level
- Shows violations in test UI without failing CI
- Goal: WCAG 2.1 AA compliance

### Quality Checks Before Completion
```bash
npm run lint && npm run type-check
```

## Component Coverage Status

### ✅ Implemented (46/51 components - 90.2%)
Accordion, Alert, Alert Dialog, Aspect Ratio, Avatar, Badge, Breadcrumb, Button, Calendar, Card, Carousel, Chart, Checkbox, Collapsible, Combobox, Command, Context Menu, Date Picker, Dialog, Drawer, Dropdown Menu, Form, Hover Card, Input, Input OTP, Label, Menubar, Navigation Menu, Pagination, Popover, Progress, Radio Group, Resizable, Scroll Area, Select, Separator, Sheet, Sidebar, Skeleton, Slider, Sonner, Switch, Table, Tabs, Textarea, Toggle, Toggle Group, Tooltip

### ❌ Missing Components (5)
1. **Data Table** - Advanced table with sorting/filtering/pagination
2. **Toast** - Base toast component (Sonner exists but separate)
3. **Typography** - Base typography component (tokens exist but not component)
4. **React Hook Form** - Dedicated form integration story (Form exists but not RHF-specific)
5. **Combobox** - Listed as implemented but verify completeness

### 🎨 Design Tokens (Additional)
Color, Typography, Spacing, Shadow, Radius - documented in `registry/tokens/`

## Development Workflow

### Adding a New Component Story

1. **Create story file**:
   ```bash
   src/registry/atoms/my-component-story/my-component.stories.tsx
   ```

2. **Follow story structure pattern** (see Storybook Development section)

3. **Add registry entry** to `registry.json`:
   ```json
   {
     "name": "my-component-story",
     "type": "registry:component",
     "title": "My Component Story",
     "registryDependencies": ["my-component"],
     "files": [{
       "path": "src/registry/atoms/my-component-story/my-component.stories.tsx",
       "type": "registry:component"
     }]
   }
   ```

4. **Build registry**:
   ```bash
   npm run registry:build
   ```

5. **Test locally**:
   ```bash
   npx shadcn@latest add http://localhost:3000/v2/r/my-component-story.json
   ```

6. **Verify in Storybook**:
   ```bash
   npm run storybook
   ```

7. **Run quality checks**:
   ```bash
   npm run lint && npm run type-check && npm run test
   ```

### Updating Existing Stories

1. Modify story file in `src/registry/atoms/`
2. If dependencies changed, update `registry.json`
3. Rebuild registry: `npm run registry:build`
4. Test: `npm run lint && npm run type-check`

---

## Communication Guidelines

**Important: All code comments, documentation, and user responses must be in Korean (한국어).**

### Language Usage Rules
- **Commit messages**: English (Conventional Commits format)
- **Code comments**: Korean
- **Documentation**: Korean
- **User responses**: Korean
- **Error messages/logs**: Korean (when possible)
- **Code itself** (variables, functions, etc.): English naming conventions

### Korean Comment Requirements
All new functions and significant code changes require Korean comments:

- **Function documentation**: Include `🎯 목적` (purpose) in JSDoc
- **Complex logic**: Explain step-by-step in Korean
- **Registry operations**: Specify what data is processed and how
- **Error handling**: Explain which errors are handled and how
- **Performance optimizations**: Explain why this approach was chosen
- **Temporary code**: Mark with `🎭 임시:` and note future changes needed

### Commit Message Format
```
feat/fix/docs: [Brief description]

- [Detailed change - with file path]
- docs: Updated [document name] with [change description]

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## 🔧 Source Code Modification Process

Follow this process for all code changes:

### 1. Requirements Analysis
- 사용자 지시, 기존 계획 문서, 관련 자료를 확인합니다
- 현재 동작을 재현(수동 또는 테스트)하여 문제를 정확히 파악합니다

### 2. Task Planning
- 해야 할 작업을 단계별로 나누어 TodoWrite 도구에 기록합니다
- 영향 범위를 조사하고, 구현 전에 필요한 추가 정보를 충분히 수집합니다

### 3. Code Implementation
- 컴포넌트, 스토리, 스타일, 유틸 등 작은 단위로 집중해서 수정합니다
- 변경 범위를 명확히 하고 Registry 시스템, Storybook 빌드에 미치는 영향을 항상 고려합니다
- 의도하지 않은 회귀가 없도록 엣지 케이스까지 점검합니다

### 4. Thorough Validation
- **정적 검사**: `npm run lint`, `npm run format:check`
- **테스트/빌드**: `npm run test:unit`, `npm run build` 또는 `npm run registry:build`
- **실행 검증**: `npm run storybook`로 Storybook에서 동작 확인
- **통합 테스트**: `npm run test:storybook` (필요시)

### 5. Documentation Update
- 계획 문서나 진행 내역에 완료된 단계와 근거를 업데이트합니다
- 테스트 결과, 남아 있는 리스크, 후속 작업을 요약합니다
- CLAUDE.md와 관련 문서를 최신 상태로 유지합니다

### 6. Version Control
- 검증을 마친 뒤 관련 파일을 스테이징하고 명확한 메시지로 커밋합니다
- Conventional Commits 형식을 따릅니다 (feat:, fix:, docs: 등)

### Additional Requirements

7. 해결 방법에 확신이 없다면, 진행 전에 최소 두 번 이상 인터넷을 검색해 충분한 정보를 확보해야 합니다
8. 여러 해결책이 존재하고 선택이 어렵다면, 사용자에게 옵션을 제시하고 답변을 받은 후 진행합니다

---

## 📋 Task List Creation Guidelines (docs/plan)

사용자 요구사항 문서를 기반으로 작업 리스트를 만들 때는 다음 절차를 따릅니다.

### 1. Requirements Document Location
- 요구사항은 `docs/plan/active/`(진행 중) 또는 `docs/plan/complete/`(완료)에 있습니다
- 사용자가 지정한 파일을 사용합니다

### 2. Requirements Analysis
- 해당 문서의 기능 요구, 사용자 스토리, 수용 기준, 제약 사항을 읽습니다
- 기존 코드베이스에서 관련 아키텍처 패턴, 컴포넌트, 유틸을 확인합니다

### 3. Phase 1 – High-Level Tasks
- 요구사항을 충족하는 데 필요한 상위 작업(약 4-6개)을 도출합니다
- 각 상위 작업에는 실제로 수행해야 할 내용을 구체적으로 설명하는 부가 문장을 함께 적고, 주니어 개발자가 따라 할 수 있을 만큼 친절하고 상세하게 작성합니다
- `docs/plan/active/YYYY-MM-DD-[작업명].md` 형식의 Markdown 파일을 생성합니다
- "Relevant Files"와 "Notes" 항목에 즉시 파악한 정보를 적고, 지정된 체크박스 포맷으로 상위 작업만 나열합니다
- **반드시 plan 모드에서 사용자 승인을 받아야 합니다:**
  - 상위 작업을 제시합니다
  - **사용자가 계획을 승인(Accept 버튼 클릭)하거나 "Go"라고 응답하기 전에는 진행하지 않습니다**
  - **승인 전에는 어떠한 추가 계획 작성이나 실행도 진행하지 않습니다**

### 4. Phase 2 – Detailed Tasks (After Approval Only)
- 사용자가 계획을 승인하거나 "Go"라고 답하면 각 상위 작업을 실제 구현 단계로 세분화하여 하위 작업을 작성합니다
- 하위 작업을 정리할 때는 의미를 축약하거나 축소해서 표현하는 것이 금지되며, 작업 의도와 실행 과정을 깊이 이해할 수 있도록 최대한 자세히 서술해야 합니다
- 하위 작업을 정리하면서 추가로 필요한 파일이 있으면 "Relevant Files" 목록을 갱신합니다

### 5. Finalization and Saving
- Markdown 파일에 "Relevant Files", "Notes", "Tasks" 헤더와 체크박스 구조가 정확히 포함되어 있는지 확인합니다
- 완성된 작업 파일은 `docs/plan/active/`에 유지하고, 완료되면 `docs/plan/complete/`로 **반드시** 이동해야 합니다

### 6. Interaction Mode
- **상위 작업을 제시한 뒤 사용자가 명확히 계획을 승인하거나 "Go"라고 답하기 전에는 하위 작업 작성과 구현을 절대 시작하지 않습니다**
- 지시가 모호하거나 여러 방법이 있다면, 반드시 한국어로 사용자에게 선택지를 제안하고 의사결정을 받아야 합니다

---

## 📋 Task List Management Protocol

Storybook registry 프로젝트 진행 상황을 추적하기 위한 작업 목록 관리 가이드라인입니다.

### Task Execution

#### Full Task Execution
- **사용자가 plan 모드에서 "Accept" 버튼을 클릭하거나 "yes", "y", "Go"라고 답하면**, 이는 현재 **모든 작업**에 대한 수락을 의미합니다
- **반드시 이 응답을 받기 전에는 어떤 작업도 진행하거나 세부 단계를 작성해서는 안 되며**, 승인 후에는 각 상위 작업이나 하위 작업마다 허가를 다시 요청하지 않고 모든 작업을 순차적으로 실행합니다

#### Decision Points
구현 중 의사결정이 필요한 경우 (현재 계획의 문제점 발견, 복잡성 증가, 불확실성 증가 등):

1. **중지하고 사용자에게 선택 가능한 옵션을 제시합니다**
2. **각 옵션을 주니어 개발자에게 설명하듯이 설명합니다** (문맥과 함께 명확하고 간단한 용어 사용)
3. **진행하기 전에 사용자의 결정을 기다립니다**
4. **선택한 접근 방식을 주석이나 문서에 기록합니다**

#### Uncertainty Protocol
구현 세부사항에 대해 확실하지 않은 경우:

1. **절대로 추측하거나 가정하지 마세요**
2. **웹 검색을 광범위하게 사용하여 정확한 정보를 수집합니다**
3. **모범 사례와 현재 표준을 조사합니다** (React, TypeScript, Storybook, shadcn/ui, react-router-dom)
4. **검증된 정보가 있을 때만 진행합니다**
5. **조사 후에도 여전히 불확실한 경우, 사용자에게 명확한 설명을 요청합니다**

#### Completion Protocol

**하위 작업 완료 시**:
1. **하위 작업**을 완료하면 **즉시** TodoWrite 도구로 해당 작업을 `completed`로 표시합니다

**상위 작업 완료 시** (모든 하위 작업이 completed가 되면):
2. 상위 작업 아래의 **모든** 하위 작업이 `completed`가 되면 다음 순서를 따릅니다:

   **a. 전체 테스트 실행**:
   ```bash
   npm run lint                 # ESLint 검사
   npm run type-check           # TypeScript 타입 검증
   npm run test:unit            # 유닛 테스트 실행
   npm run registry:build       # Registry JSON 생성
   ```

   **b. 모든 테스트가 통과한 경우에만**:
   - 변경사항을 스테이징합니다: `git add .`

   **c. 정리**:
   - 커밋하기 전에 임시 파일과 임시 코드를 제거합니다
   - `console.log` 등 디버그 코드 제거
   - 사용하지 않는 import 정리

   **d. 커밋**:
   - Conventional Commits 형식 사용:
     ```bash
     git commit -m "feat: [상위 작업 요약]" \
                -m "[주요 변경사항 및 추가사항]" \
                -m "[작업 번호와 컨텍스트 참조]"
     ```
   - 예시:
     ```bash
     git commit -m "feat: add Calendar story with date range picker" \
                -m "- Update registry.json with calendar-story entry" \
                -m "- Add Korean comments to date picker implementation" \
                -m "Related to Component Story Enhancement"
     ```

3. **모든 하위 작업이 완료 표시되고 변경사항이 커밋되면 상위 작업을 완료로 표시합니다**

### Task List Maintenance

#### 1. Update task list as you work
- 위 프로토콜에 따라 작업과 하위 작업을 완료(`completed`)로 표시합니다
- 새로 발생하는 작업을 추가합니다

#### 2. Maintain "Relevant Files" section
- 생성되거나 수정된 모든 파일을 나열합니다
- 각 파일에 대해 용도를 한 줄로 설명합니다

**예시**:
```markdown
## Relevant Files
- `src/registry/atoms/calendar-story/calendar.stories.tsx` - Calendar 컴포넌트 Storybook 스토리
- `registry.json` - Calendar story registry 엔트리 추가
- `CLAUDE.md` - 개발 프로세스 가이드라인 업데이트
```

### AI Guidelines (For Claude Code)

작업 목록을 작업할 때 AI는 다음을 수행해야 합니다:

1. **정기적으로 TodoWrite 도구를 사용하여 작업 목록을 업데이트합니다** (중요한 작업 완료 후)

2. **완료 프로토콜을 엄격히 따릅니다**:
   - 완료된 각 **하위 작업**을 즉시 `completed`로 표시
   - **모든** 하위 작업이 `completed`가 되면 **상위 작업**을 `completed`로 표시

3. **새로 발견된 작업을 추가합니다**

4. **"Relevant Files"을 정확하고 최신 상태로 유지합니다**

5. **작업을 시작하기 전에 다음 하위 작업이 무엇인지 확인합니다**

6. **초기 "Accept", "yes", "y", "Go" 승인을 받기 전에는 어떠한 작업도 시작하지 말고**, 승인이 확인된 이후에만 모든 작업을 **반드시** 진행합니다

7. **의사결정이 필요한 경우**:
   - 주니어 개발자 친화적인 설명과 함께 명확한 옵션을 제시합니다
   - 진행하기 전에 사용자 선택을 기다립니다

8. **불확실한 경우**:
   - 웹 검색을 사용하여 철저히 조사합니다
   - 절대로 가정이나 추측을 하지 않습니다
   - 조사로 명확한 답을 얻지 못한 경우 명확한 설명을 요청합니다

9. **Storybook Registry 프로젝트 특화 주의사항**:
   - src/registry/ 디렉토리 구조 이해 (atoms/tokens/foundation/templates)
   - Registry 시스템 (registry.json) 업데이트 필수
   - @/ 경로 별칭 사용 (registry build system 의존성)
   - 한국어 주석, 영어 코드 네이밍 원칙 준수

---

## 📝 Document Synchronization Rules

**Important**: This document (CLAUDE.md) and CLAUDE-KR.md must be synchronized.

### Synchronization Principles
1. **When CLAUDE.md is updated, CLAUDE-KR.md must also be updated simultaneously**
2. **When CLAUDE-KR.md is updated, CLAUDE.md must also be updated simultaneously**
3. Both documents should always have matching content, with only the language being different
4. Code examples should remain identical, with only comments and explanations being translated

### Update Checklist
- [ ] When updating CLAUDE.md → Update CLAUDE-KR.md with the same content
- [ ] When updating CLAUDE-KR.md → Update CLAUDE.md with the same content
- [ ] Change "Last Updated" date to match in both files
- [ ] Increment "Document Version" identically in both files
- [ ] Commit both files together in Git

---

## Important Notes

### Focus Areas
- **Primary work area**: `src/registry/` directory only
- **Maintain consistency**: Follow existing story patterns
- **Test interactivity**: Add `play` functions for stateful components
- **Registry dependencies**: Use correct dependency types (registry vs npm)
- **Path aliases**: Always use `@/` imports for registry build compatibility

### Semantic Release
- Automated releases via GitHub Actions
- Changelog generation configured
- Uses conventional commits

### Production URLs
- **Registry**: `https://registry.lloydrichards.dev/v2/r/`
- **Usage**: `npx shadcn@latest add @storybook/button-story`

### Key Constraints
- Must use `@/components/ui/` imports (required for registry build)
- Story files must be in correct category directories
- Registry.json must be updated for new stories
- All stories should support light/dark themes
- Maintain JSDoc comments for each story export

---

# Important Guidelines
- Only perform what is requested; no more, no less
- Always prefer editing existing files over creating new files
- Always follow the source code modification process above after modifying files
- Always use Korean for documentation updates, commit messages, and code comments
- Always add Korean comments when creating new functions or making significant code changes
- Always update existing Korean comments when modifying related code
- Documentation updates are mandatory for all changes, not optional
- Always follow the task list management protocol for plan mode and task execution
- Never proceed with implementation before receiving "Accept"/"Go" approval in plan mode
- Always research thoroughly when uncertain about solutions (minimum 2 web searches)
- Always present options to the user when multiple valid approaches exist

---

**Last Updated**: 2025-01-15
**Document Version**: 2.1
