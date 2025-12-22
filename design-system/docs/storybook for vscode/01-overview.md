# Storybook 기반 컴포넌트를 활용한 VSCode Extension 개발 - 종합 분석

**작성일**: 2025-10-08
**목적**: FreeLens 고도화를 위한 Storybook 기반 신규 UI/UX 도입 전 기술 검토
**문서 버전**: 1.0

---

## 📋 목차

이 분석은 5개의 독립 문서로 구성됩니다:

1. **[01-overview.md](01-overview.md)** (본 문서)
   - 프로젝트 배경 및 목표
   - 기술 스택 분석
   - 전체 아키텍처 개요
   - 문서 구조 안내

2. **[02-constraints.md](02-constraints.md)**
   - VSCode Webview 기술적 제약사항
   - Storybook 통합 시 한계점
   - React 컴포넌트 제약사항
   - 해결 불가능한 제약 목록

3. **[03-performance.md](03-performance.md)**
   - 메모리 사용량 최적화
   - 번들 크기 최적화
   - 로딩 성능 개선 전략
   - 성능 모니터링 방법

4. **[04-security.md](04-security.md)**
   - CSP (Content Security Policy) 요구사항
   - XSS 방어 전략
   - 리소스 로딩 보안
   - 입력 검증 및 Sanitization

5. **[05-workflow.md](05-workflow.md)**
   - Storybook 개발 워크플로우
   - VSCode Extension 통합 프로세스
   - CI/CD 파이프라인 구성
   - 팀 협업 Best Practices

---

## 🎯 프로젝트 배경 및 목표

### 현재 상황

**FreeLens (Kubernetes IDE)를 VSCode Extension으로 마이그레이션 중**

- **현재 Phase**: Phase 3 - Webview 통합
- **기존 계획**: FreeLens 컴포넌트 70% 재사용
- **새로운 목표**: FreeLens 컴포넌트 고도화 + 신규 UI/UX 도입

### 변경된 전략

```
기존 전략: FreeLens 컴포넌트 재활용
  ├── Pod Details UI (70% 재사용)
  ├── Deployment Details UI (70% 재사용)
  └── Terminal/Logs (100% 재사용)

새로운 전략: Storybook 기반 신규 UI/UX 개발
  ├── Storybook에서 컴포넌트 정의 및 개발
  ├── 디자인 시스템 구축
  ├── 고품질 UI/UX 컴포넌트 라이브러리
  └── VSCode Webview로 통합
```

### 핵심 질문

**"Storybook으로 정의된 컴포넌트를 VSCode Extension에서 사용할 때, 어떤 제약사항이 있는가?"**

이 분석은 위 질문에 대한 포괄적인 답변을 제공합니다.

---

## 🏗️ 기술 스택 분석

### 기존 FreeLens 스택

| 기술 | 버전 | 용도 | 비고 |
|------|------|------|------|
| React | 17.0.2 | UI 프레임워크 | Storybook 8 완벽 호환 |
| MobX | 6.13.7 | 상태 관리 | Observable 패턴 |
| Electron | 35.7.5 | Desktop 앱 | Renderer만 재사용 가능 |
| TypeScript | 5.9.2 | 타입 안정성 | 필수 |
| pnpm | 10.17.1 | 패키지 관리자 | Workspace 지원 |
| Webpack | 5.x | 번들러 | Storybook과 별도 |

### Storybook 스택

| 기술 | 권장 버전 | 용도 | 호환성 |
|------|----------|------|--------|
| Storybook | 8.x (latest) | 컴포넌트 개발/문서화 | ✅ React 17 지원 |
| @storybook/react | 8.x | React 통합 | ✅ 완벽 지원 |
| @storybook/addon-essentials | 8.x | 기본 Addon | ✅ 필수 |
| @storybook/addon-interactions | 8.x | 인터랙션 테스트 | ✅ 권장 |
| @storybook/addon-a11y | 8.x | 접근성 테스트 | ✅ 필수 |
| Vite | 5.x | Storybook 빌더 | ✅ 빠른 빌드 |

### VSCode Extension 요구사항

| 기술 | 버전 | 용도 | 비고 |
|------|------|------|------|
| vscode | 1.80+ | Extension API | 최소 1.80 권장 |
| React | 17.0.2+ | Webview UI | 18.x 호환 확인 필요 |
| Webpack/esbuild | 5.x / latest | Webview 번들러 | CSP 준수 필수 |
| @vscode/webview-ui-toolkit | 1.x | VSCode 스타일 컴포넌트 | Deprecated (2025.1.1) |

---

## 🌐 전체 아키텍처 개요

### 3-Layer Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ Layer 1: Storybook Development (격리 환경)                    │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Storybook 8 Dev Server (localhost:6006)                     │
│  ├── Stories (*.stories.tsx)                                 │
│  │   ├── PodDetailsView.stories.tsx                          │
│  │   ├── DeploymentCard.stories.tsx                          │
│  │   └── MetricsChart.stories.tsx                            │
│  │                                                            │
│  ├── Components (src/components/)                            │
│  │   ├── PodDetailsView.tsx                                  │
│  │   ├── DeploymentCard.tsx                                  │
│  │   └── MetricsChart.tsx                                    │
│  │                                                            │
│  └── Addons                                                   │
│      ├── Controls (Props 조작)                               │
│      ├── Actions (이벤트 로깅)                                │
│      ├── Interactions (시나리오 테스트)                       │
│      ├── A11y (접근성 검증)                                   │
│      └── Design Tokens (테마 시스템)                          │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                              ↓
                    Webpack/Vite Build
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ Layer 2: VSCode Webview Integration                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Extension Host (Node.js)                                     │
│  ├── WebviewsController                                       │
│  │   ├── registerWebviewPanel()                              │
│  │   └── createWebview()                                     │
│  │                                                            │
│  ├── WebviewProvider (PodDetailsWebview)                      │
│  │   ├── getHtml() → CSP + nonce                             │
│  │   ├── includeBootstrap() → Initial State                  │
│  │   └── onDidReceiveMessage() → IPC Handler                 │
│  │                                                            │
│  └── IPC Protocol                                             │
│      ├── Commands (Webview → Extension)                      │
│      │   └── pod/delete, pod/restart                         │
│      └── Notifications (Extension → Webview)                 │
│          └── pod/statusChanged                               │
│                                                               │
│  ↕ postMessage (IPC Channel)                                 │
│                                                               │
│  Webview (Sandboxed Iframe)                                  │
│  ├── React App (Storybook 컴포넌트 재사용)                    │
│  │   ├── PodDetailsView.tsx (from Storybook)                 │
│  │   └── acquireVsCodeApi() → vscode.postMessage()           │
│  │                                                            │
│  ├── Bundled JS (dist/webviews/podDetails.js)                │
│  │   ├── React 17                                            │
│  │   ├── Component Code                                      │
│  │   └── Styles (inline CSS)                                 │
│  │                                                            │
│  └── CSP Restrictions                                         │
│      ├── script-src: 'nonce-{random}'                        │
│      ├── style-src: 'unsafe-inline' (제한적 허용)             │
│      └── img-src: https: data:                               │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                              ↓
                    Extension Commands
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ Layer 3: VSCode Extension Ecosystem                           │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  TreeView (Kubernetes Resources)                              │
│  ├── ClustersView                                             │
│  ├── PodsView                                                 │
│  └── DeploymentsView                                          │
│                                                               │
│  Commands                                                     │
│  ├── kubernetes.showPodDetails (TreeView → Webview)          │
│  └── kubernetes.deletePod (Webview → K8s API)                │
│                                                               │
│  Container DI                                                 │
│  ├── ClusterManager                                           │
│  ├── KubernetesApi                                            │
│  └── WebviewsController                                       │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### 데이터 흐름

```
1. Storybook 개발 단계
   User → Storybook UI → Component Props 조작
   → Component Rendering → Actions/Events 로깅

2. VSCode Extension 통합 단계
   User clicks TreeView Pod
   → Extension: createWebview()
   → Extension: postMessage(podData)
   → Webview: React renders PodDetailsView (from Storybook)
   → User clicks "Delete" button
   → Webview: vscode.postMessage({ command: 'pod/delete' })
   → Extension: onDidReceiveMessage()
   → Extension: K8s API call
   → Extension: postMessage({ type: 'pod/deleted' })
   → Webview: React updates UI
```

---

## ✅ 핵심 결론 (Summary)

### 가능성 평가

**✅ 완전히 가능합니다**

Storybook으로 개발된 React 컴포넌트를 VSCode Extension Webview에서 사용하는 것은:

1. **기술적으로 검증됨**
   - Microsoft: `@vscode/webview-ui-toolkit` Storybook 쇼케이스
   - GitHub Next: React Webview UI Toolkit (1500+ 라인 감소)
   - GitLens: Webview 기반 Extension 15M+ 사용자

2. **FreeLens 마이그레이션에 최적**
   - React 17 + TypeScript 5 (Storybook 8 완벽 호환)
   - pnpm workspace (Monorepo 지원)
   - 기존 컴포넌트 아키텍처 재사용 가능

3. **개발 효율성 향상**
   - 격리 환경 개발: 30% 빠른 속도
   - Hot Reload: Extension 재시작 불필요
   - 자동 문서화: Props 자동 생성

4. **품질 보증**
   - Visual Regression Testing (Chromatic)
   - Interaction Testing (Playwright)
   - Accessibility Testing (WCAG 준수)

### 주요 제약사항 (요약)

아래 항목들은 **[02-constraints.md](02-constraints.md)** 문서에서 상세히 다룹니다:

1. **Webview Sandboxing**
   - DOM API 제한 (no window.open, no localStorage 등)
   - CSP로 인한 inline script/style 제약
   - 절대 경로 리소스 로딩 불가

2. **번들 크기**
   - React + Dependencies: 최소 300KB
   - Storybook Addons 제외 필수 (프로덕션 빌드)
   - Tree-shaking 필수

3. **성능**
   - Webview 생성 비용: 100-200ms
   - 메모리 오버헤드: ~50MB per Webview
   - retainContextWhenHidden 지양 (메모리 과다 사용)

4. **IPC 통신**
   - 비동기 메시지 패싱만 가능
   - 대량 데이터 전송 시 직렬화 비용
   - 순환 참조 객체 전송 불가

### 권장 전략

**단계적 마이그레이션**

```
Phase 1: Storybook 파일럿 (1주)
  └── Button, Card 등 기본 컴포넌트 Storybook 구축

Phase 2: 디자인 시스템 구축 (2주)
  └── Design Tokens, Theming, Typography

Phase 3: Feature 컴포넌트 개발 (3주)
  └── PodDetailsView, DeploymentCard 등

Phase 4: VSCode Webview 통합 (2주)
  └── Webpack 번들링, IPC 프로토콜, State 관리

Phase 5: 최적화 및 테스트 (2주)
  └── 성능 최적화, A11y 테스트, Visual Regression
```

---

## 📚 다음 문서 안내

### 필수 읽기 순서

1. **[02-constraints.md](02-constraints.md)** - 기술적 제약사항
   - VSCode Webview의 한계를 이해하지 못하면 개발 중 막힐 수 있습니다
   - **반드시 먼저 읽어야 합니다**

2. **[04-security.md](04-security.md)** - 보안 요구사항
   - CSP 위반 시 Webview가 작동하지 않습니다
   - 개발 초기부터 보안 가이드를 준수해야 합니다

3. **[03-performance.md](03-performance.md)** - 성능 최적화
   - 번들 크기와 메모리 사용량을 관리하지 않으면 Extension이 느려집니다
   - 최적화 전략을 미리 이해하고 개발해야 합니다

4. **[05-workflow.md](05-workflow.md)** - 개발 워크플로우
   - Storybook → VSCode Extension 통합 프로세스
   - 팀 협업 및 CI/CD 구성 가이드

### 긴급 참조

**"내 Webview가 안 보여요!"**
→ [04-security.md § CSP Troubleshooting](04-security.md#csp-troubleshooting)

**"번들 크기가 10MB예요!"**
→ [03-performance.md § Bundle Size Optimization](03-performance.md#bundle-size-optimization)

**"Storybook 컴포넌트가 Webview에서 깨져요!"**
→ [02-constraints.md § React Component Limitations](02-constraints.md#react-component-limitations)

**"Extension 활성화가 3초나 걸려요!"**
→ [03-performance.md § Activation Performance](03-performance.md#activation-performance)

---

## 🔗 외부 참고 자료

### 공식 문서

- [VSCode Webview API](https://code.visualstudio.com/api/extension-guides/webview)
- [Storybook 8 Documentation](https://storybook.js.org/docs)
- [React 17 Documentation](https://react.dev/)
- [pnpm Workspaces](https://pnpm.io/workspaces)

### 검증된 사례

- [Microsoft VSCode Webview UI Toolkit](https://github.com/microsoft/vscode-webview-ui-toolkit)
- [GitHub Next React Webview Toolkit](https://githubnext.com/projects/react-webview-ui-toolkit/)
- [GitLens Extension](https://github.com/gitkraken/vscode-gitlens) (15M+ users)
- [vscode-react-webviews Template](https://github.com/githubnext/vscode-react-webviews)

### 기술 블로그

- [Ken Muse: Using React in VSCode Webviews](https://www.kenmuse.com/blog/using-react-in-vs-code-webviews/)
- [Medium: Building VSCode Webview Panel with React](https://medium.com/@michaelbenliyan/developers-guide-to-building-vscode-webview-panel-with-react-and-messages-797981f34013)

---

## 📞 프로젝트 컨텍스트

### 현재 상태

- **프로젝트**: FreeLens → VSCode Extension Migration
- **현재 Phase**: Phase 3 (Webview 통합) 진입 전
- **목표**: Storybook 기반 고품질 UI/UX 구축
- **타임라인**: 14주 (Phase 1-5)

### 관련 문서

- `docs/analyze/PHASE_3_OVERVIEW.md` - Webview 통합 계획
- `docs/analyze/최강k8sIDE.md` - 전체 마이그레이션 전략
- `docs/analyze/GITLENS_FREELENS_MAPPING_TABLE.md` - 패턴 매핑
- `freelens/docs/archive/guide/storybook-adoption-plan.md` - FreeLens Storybook 도입 계획

---

**문서 버전**: 1.0
**마지막 업데이트**: 2025-10-08
**다음 문서**: [02-constraints.md](02-constraints.md) - 기술적 제약사항 및 한계점
