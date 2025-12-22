# Storybook + VSCode Extension: 개발 워크플로우 및 Best Practices

**작성일**: 2025-10-08
**문서 버전**: 1.0
**이전 문서**: [04-security.md](04-security.md)

---

## 📋 목차

1. [Storybook 개발 워크플로우](#storybook-개발-워크플로우)
2. [VSCode Extension 통합 프로세스](#vscode-extension-통합-프로세스)
3. [CI/CD 파이프라인](#cicd-파이프라인)
4. [팀 협업 Best Practices](#팀-협업-best-practices)
5. [FreeLens 마이그레이션 로드맵](#freelens-마이그레이션-로드맵)

---

## 🎨 Storybook 개발 워크플로우

### 1.1 개발 환경 설정

**프로젝트 구조**:

```
kubernetes-extension/
├── .storybook/                    # Storybook 설정
│   ├── main.ts                    # Storybook 메인 설정
│   ├── preview.ts                 # Global Decorators/Parameters
│   └── manager.ts                 # Storybook UI 커스터마이징
│
├── src/                           # Extension Host 코드
│   ├── extension.ts
│   ├── container.ts
│   └── views/
│
├── webviews/                      # Webview 코드 (Storybook 대상)
│   ├── components/                # 공통 컴포넌트
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.scss
│   │   │   └── Button.stories.tsx  # ✅ Story 파일
│   │   └── Card/
│   │
│   ├── podDetails/                # Feature 컴포넌트
│   │   ├── PodDetailsView.tsx
│   │   ├── PodDetailsView.stories.tsx
│   │   └── index.tsx              # Webview Entry Point
│   │
│   └── mocks/                     # Mock 데이터 (Storybook + Webview 공유)
│       ├── pods.mock.ts
│       └── deployments.mock.ts
│
├── dist/                          # 빌드 결과
│   ├── extension.js               # Extension Host 번들
│   └── webviews/
│       └── podDetails.js          # Webview 번들
│
└── package.json
```

---

### 1.2 Storybook 설정

**.storybook/main.ts**:

```typescript
import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
  // ✅ Story 파일 위치
  stories: ['../webviews/**/*.stories.@(ts|tsx)'],

  // ✅ Addons
  addons: [
    '@storybook/addon-essentials',       // Controls, Actions, Docs
    '@storybook/addon-interactions',     // 인터랙션 테스트
    '@storybook/addon-a11y',             // 접근성 검증
  ],

  framework: {
    name: '@storybook/react-vite',       // ✅ Vite 사용 (빠른 빌드)
    options: {},
  },

  // ✅ Vite 설정 커스터마이징
  async viteFinal(config) {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          '@/webviews': path.resolve(__dirname, '../webviews'),
          '@/mocks': path.resolve(__dirname, '../webviews/mocks'),
        },
      },
      define: {
        'process.env.IS_STORYBOOK': 'true',  // ✅ Storybook 환경 감지
      },
    };
  },

  docs: {
    autodocs: 'tag',  // ✅ 'autodocs' 태그가 있는 Story는 자동 문서화
  },
};

export default config;
```

**.storybook/preview.ts**:

```typescript
import type { Preview } from '@storybook/react';
import '../webviews/styles/global.scss';  // ✅ 전역 스타일

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },  // ✅ onXxx Props는 자동으로 Actions
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },

    // ✅ VSCode 테마 배경 설정
    backgrounds: {
      default: 'vscode-dark',
      values: [
        { name: 'vscode-dark', value: '#1e1e1e' },
        { name: 'vscode-light', value: '#ffffff' },
      ],
    },
  },

  // ✅ Global Decorators
  decorators: [
    (Story) => (
      <div className="vscode-theme">  {/* VSCode 테마 클래스 적용 */}
        <Story />
      </div>
    ),
  ],
};

export default preview;
```

---

### 1.3 Story 작성 패턴

**기본 컴포넌트 Story**:

```typescript
// webviews/components/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',  // ✅ Storybook 사이드바 경로
  component: Button,
  tags: ['autodocs'],          // ✅ 자동 문서 생성

  // ✅ Props 제어
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ✅ Story Variants
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Disabled Button',
  },
};
```

**Feature 컴포넌트 Story (Mock 데이터 사용)**:

```typescript
// webviews/podDetails/PodDetailsView.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { PodDetailsView } from './PodDetailsView';
import { mockPods } from '../mocks/pods.mock';  // ✅ Mock 데이터 재사용

const meta: Meta<typeof PodDetailsView> = {
  title: 'Features/PodDetailsView',
  component: PodDetailsView,
  tags: ['autodocs'],

  // ✅ Decorator로 Context 제공
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PodDetailsView>;

export const Running: Story = {
  args: {
    pod: mockPods.find(p => p.status === 'Running'),
  },
};

export const Failed: Story = {
  args: {
    pod: mockPods.find(p => p.status === 'Failed'),
  },
};

export const WithLogs: Story = {
  args: {
    pod: mockPods[0],
    showLogs: true,
  },
};
```

---

### 1.4 개발 프로세스

**Day-to-Day 워크플로우**:

```bash
# 1. Storybook 실행 (개발 서버)
npm run storybook:dev
# → http://localhost:6006

# 2. 컴포넌트 개발
# - webviews/components/NewComponent/NewComponent.tsx 작성
# - webviews/components/NewComponent/NewComponent.stories.tsx 작성
# - Storybook에서 실시간 확인

# 3. Props 조작 및 테스트
# - Storybook Controls Addon으로 Props 변경
# - Actions Addon으로 이벤트 확인
# - Accessibility Addon으로 A11y 검증

# 4. Interaction Testing (선택)
# - @storybook/addon-interactions로 클릭/입력 시나리오 테스트

# 5. 컴포넌트 완성 후 Webview에 통합
```

---

## 🔧 VSCode Extension 통합 프로세스

### 2.1 Webview 번들링

**Webpack 설정 (webviews 전용)**:

```javascript
// webpack.webview.config.js
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    'webviews/podDetails': './webviews/podDetails/index.tsx',
    'webviews/deploymentDetails': './webviews/deploymentDetails/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@/webviews': path.resolve(__dirname, 'webviews'),
      '@/mocks': path.resolve(__dirname, 'webviews/mocks'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,  // ✅ console.log 제거
          },
        },
      }),
    ],
  },
  // ✅ Storybook 제외
  externals: {
    '@storybook/react': 'undefined',
    '@storybook/addon-actions': 'undefined',
  },
};
```

---

### 2.2 Storybook → Webview 통합 체크리스트

**컴포넌트 통합 시 확인사항**:

- [ ] **Mock 데이터 공유**
  - Storybook과 Webview에서 동일한 Mock 사용
  - `webviews/mocks/` 폴더에 공유 Mock 위치

- [ ] **Storybook Addons 제거**
  - `@storybook/addon-actions` 등 프로덕션 제외
  - `process.env.IS_STORYBOOK`로 조건부 코드

- [ ] **CSP 준수**
  - inline script/style 제거
  - nonce 사용

- [ ] **IPC 통신 구현**
  - Extension Host ↔ Webview 메시지 프로토콜
  - Type-safe IPC

- [ ] **State 관리**
  - `vscode.setState/getState` 구현
  - Webview 복원 시 State 복구

- [ ] **성능 최적화**
  - 번들 크기 < 500KB
  - Virtual Scrolling (대량 데이터)

---

### 2.3 통합 예시

**Storybook 컴포넌트**:

```typescript
// webviews/podDetails/PodDetailsView.tsx
export function PodDetailsView({ pod }: { pod: Pod }) {
  const [logs, setLogs] = useState<string[]>([]);

  // ✅ Storybook에서는 Mock 사용
  useEffect(() => {
    if (process.env.IS_STORYBOOK) {
      setLogs(['Mock log line 1', 'Mock log line 2']);
    }
  }, []);

  return (
    <div>
      <h1>{pod.name}</h1>
      <div>{logs.map((log, i) => <div key={i}>{log}</div>)}</div>
    </div>
  );
}
```

**Webview 통합**:

```typescript
// webviews/podDetails/index.tsx (Webview Entry Point)
import { PodDetailsView } from './PodDetailsView';

const vscode = acquireVsCodeApi();

function App() {
  const [pod, setPod] = useState(() => {
    const state = vscode.getState();
    return state?.pod || null;
  });

  useEffect(() => {
    // ✅ Extension Host로부터 데이터 수신
    window.addEventListener('message', (event) => {
      if (event.data.type === 'pod/update') {
        setPod(event.data.pod);
        vscode.setState({ pod: event.data.pod });
      }
    });
  }, []);

  if (!pod) return <div>Loading...</div>;

  return <PodDetailsView pod={pod} />;
}

ReactDOM.render(<App />, document.getElementById('root'));
```

---

## 🚀 CI/CD 파이프라인

### 3.1 GitHub Actions 예시

**.github/workflows/ci.yml**:

```yaml
name: CI

on:
  push:
    branches: [master, develop]
  pull_request:
    branches: [master]

jobs:
  # ✅ Storybook 빌드 및 Visual Regression Testing
  storybook:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Install dependencies
        run: npm ci

      - name: Build Storybook
        run: npm run storybook:build

      - name: Run Chromatic (Visual Regression)
        uses: chromaui/action@v1
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          buildScriptName: storybook:build

  # ✅ Extension 빌드 및 테스트
  extension:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Type Check
        run: npm run type-check

      - name: Build Extension
        run: npm run build

      - name: Unit Tests
        run: npm run test

      - name: Package Extension
        run: npx vsce package

      - name: Upload VSIX
        uses: actions/upload-artifact@v4
        with:
          name: extension-vsix
          path: '*.vsix'
```

---

### 3.2 Visual Regression Testing (Chromatic)

**설정**:

```bash
# Chromatic 설치
npm install --save-dev chromatic

# package.json
{
  "scripts": {
    "chromatic": "chromatic --project-token=$CHROMATIC_PROJECT_TOKEN"
  }
}
```

**CI에서 자동 실행**:

```yaml
# .github/workflows/ci.yml
- name: Run Chromatic
  uses: chromaui/action@v1
  with:
    projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
    buildScriptName: storybook:build
    exitZeroOnChanges: true  # ✅ UI 변경 시에도 성공 (리뷰 필요)
```

**PR에서 UI 변경 리뷰**:

```
PR #123: Add Pod Details View

Chromatic detected 5 visual changes:
- PodDetailsView/Running: 2 changes
- PodDetailsView/Failed: 1 change
- Button/Primary: 2 changes

[Review Changes in Chromatic] →
```

---

## 👥 팀 협업 Best Practices

### 4.1 Story 작성 가이드

**필수 사항**:

1. **모든 컴포넌트는 Story 필수**
   - 컴포넌트 1개당 최소 3개 Story (기본, Edge Case, Error)

2. **autodocs 태그 추가**
   - Props 자동 문서화

3. **Mock 데이터 공유**
   - `webviews/mocks/` 폴더 사용
   - Storybook과 Webview에서 동일 Mock 사용

4. **Interaction Testing (권장)**
   - 사용자 시나리오 테스트 (`addon-interactions`)

**Story Naming Convention**:

```
PodDetailsView/
├── Default              # 기본 상태
├── Running              # 정상 동작 상태
├── Failed               # 오류 상태
├── Loading              # 로딩 상태
├── Empty                # 데이터 없음
└── WithLogs             # 특정 기능 활성화
```

---

### 4.2 코드 리뷰 체크리스트

**PR 리뷰 시 확인사항**:

- [ ] Story 파일 포함됨 (*.stories.tsx)
- [ ] autodocs 태그 추가됨
- [ ] Mock 데이터 `mocks/` 폴더에 위치
- [ ] Storybook Addons 프로덕션 제외
- [ ] CSP 준수 (nonce, 외부 리소스 제외)
- [ ] Type-safe IPC Protocol 사용
- [ ] vscode.setState/getState 구현
- [ ] React.memo, useMemo 적용 (성능)
- [ ] 번들 크기 확인 (< 500KB)
- [ ] Chromatic Visual Regression 통과

---

## 🗺️ FreeLens 마이그레이션 로드맵

### 5.1 Phase별 Storybook 적용 계획

**Phase 1: Storybook 파일럿 (1주)**

```
Week 1:
  ├── Storybook 8 설치 및 설정
  ├── 기본 컴포넌트 Story 작성
  │   ├── Button
  │   ├── Card
  │   └── Tooltip
  └── Mock 데이터 구조 설계
```

**Phase 2: 디자인 시스템 구축 (2주)**

```
Week 2-3:
  ├── Design Tokens 정의
  │   ├── colors.css (VSCode 테마 연동)
  │   ├── typography.css
  │   └── spacing.css
  │
  ├── 공통 컴포넌트 Story
  │   ├── Layout (Flex, Grid)
  │   ├── Typography (H1-H6, P)
  │   ├── Input, Select, Checkbox
  │   └── Icon System
  │
  └── Storybook Decorators
      ├── ThemeDecorator (Dark/Light)
      └── LayoutDecorator
```

**Phase 3: Feature 컴포넌트 개발 (3주)**

```
Week 4-6:
  ├── PodDetailsView Story
  │   ├── Running, Failed, Pending
  │   ├── With Logs
  │   └── With Terminal
  │
  ├── DeploymentDetailsView Story
  │   ├── Scaled, Scaling
  │   ├── Rollback
  │   └── Update Strategy
  │
  ├── LogsView Story
  │   ├── Streaming
  │   ├── Search
  │   └── 10,000+ lines
  │
  └── TerminalView Story (xterm.js)
```

**Phase 4: VSCode Extension 통합 (2주)**

```
Week 7-8:
  ├── Webpack Webview 번들 설정
  ├── IPC Protocol 구현
  ├── Extension Host WebviewProvider
  ├── CSP 설정
  └── State 관리 (setState/getState)
```

**Phase 5: 최적화 및 테스트 (2주)**

```
Week 9-10:
  ├── 번들 크기 최적화 (Tree-shaking)
  ├── Chromatic Visual Regression Setup
  ├── Interaction Testing (addon-interactions)
  ├── A11y Testing (addon-a11y)
  └── Performance Profiling
```

---

### 5.2 마일스톤 및 성공 지표

| Phase | 완료 기준 | 성공 지표 |
|-------|---------|----------|
| Phase 1 | Storybook 실행 가능 | 10+ Stories, < 5초 빌드 |
| Phase 2 | 디자인 시스템 완성 | 50+ Stories, Design Tokens 문서화 |
| Phase 3 | Feature 컴포넌트 완성 | 100+ Stories, Interaction Tests |
| Phase 4 | Extension 통합 | Webview 정상 작동, IPC 안정화 |
| Phase 5 | 프로덕션 준비 | < 500KB 번들, 90%+ A11y 점수 |

---

## 📚 참고 자료

### 공식 문서

- [Storybook 8 Documentation](https://storybook.js.org/docs)
- [VSCode Webview API](https://code.visualstudio.com/api/extension-guides/webview)
- [Chromatic Visual Testing](https://www.chromatic.com/docs/)

### 예제 프로젝트

- [Microsoft VSCode Webview UI Toolkit](https://github.com/microsoft/vscode-webview-ui-toolkit)
- [Storybook Design System](https://github.com/storybookjs/design-system)
- [GitLens Extension](https://github.com/gitkraken/vscode-gitlens)

---

## ✅ 최종 체크리스트

**Storybook 개발**:
- [ ] Storybook 8 설치 완료
- [ ] `.storybook/main.ts` 설정 완료
- [ ] 모든 컴포넌트 Story 작성
- [ ] Mock 데이터 `mocks/` 폴더에 위치
- [ ] Chromatic 연동 (Visual Regression)

**VSCode Extension 통합**:
- [ ] Webpack Webview 번들 설정
- [ ] Storybook Addons 프로덕션 제외
- [ ] CSP 설정 (nonce 사용)
- [ ] IPC Protocol 구현
- [ ] vscode.setState/getState 구현

**CI/CD**:
- [ ] GitHub Actions 설정
- [ ] Chromatic 자동 실행
- [ ] Unit Tests 추가
- [ ] VSIX 자동 빌드

**팀 협업**:
- [ ] Story Naming Convention 준수
- [ ] 코드 리뷰 체크리스트 준수
- [ ] 번들 크기 모니터링
- [ ] 성능 목표 달성

---

**문서 시리즈 완료**

1. [01-overview.md](01-overview.md) - 프로젝트 개요 및 아키텍처
2. [02-constraints.md](02-constraints.md) - 기술적 제약사항
3. [03-performance.md](03-performance.md) - 성능 최적화
4. [04-security.md](04-security.md) - 보안 요구사항
5. [05-workflow.md](05-workflow.md) - 개발 워크플로우 (본 문서)

**프로젝트 성공을 위한 핵심 원칙**:
1. Storybook에서 컴포넌트를 먼저 개발하고 검증
2. Mock 데이터를 Storybook과 Webview에서 공유
3. CSP와 보안 요구사항을 처음부터 준수
4. 성능 목표(번들 크기, 메모리)를 지속적으로 모니터링
5. Visual Regression Testing으로 UI 품질 보증
