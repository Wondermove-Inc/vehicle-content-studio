# Storybook + VSCode Extension: 성능 최적화 가이드

**작성일**: 2025-10-08
**문서 버전**: 1.0
**이전 문서**: [02-constraints.md](02-constraints.md)
**다음 문서**: [04-security.md](04-security.md)

---

## 📋 목차

1. [번들 크기 최적화](#번들-크기-최적화)
2. [Extension 활성화 성능](#extension-활성화-성능)
3. [Webview 메모리 관리](#webview-메모리-관리)
4. [React 컴포넌트 최적화](#react-컴포넌트-최적화)
5. [IPC 통신 최적화](#ipc-통신-최적화)
6. [Storybook 빌드 최적화](#storybook-빌드-최적화)
7. [성능 모니터링 및 디버깅](#성능-모니터링-및-디버깅)
8. [성능 벤치마크 및 목표](#성능-벤치마크-및-목표)

---

## 📦 번들 크기 최적화

### 1.1 목표 번들 크기

**VSCode Extension 권장 번들 크기**:

| 구성 요소 | 권장 크기 | 최대 허용 | 비고 |
|----------|---------|---------|------|
| Extension Host (JS) | < 500KB | < 1MB | Node.js 코드 |
| Webview 번들 (React) | < 500KB | < 800KB | React + Components |
| Webview CSS | < 100KB | < 200KB | 스타일 |
| 총 Extension 크기 | < 2MB | < 5MB | 압축 전 |

**현실적 목표** (FreeLens 마이그레이션):

| 항목 | 초기 (최적화 전) | 목표 (최적화 후) | 개선율 |
|-----|--------------|--------------|--------|
| React 번들 | 1.2MB | 450KB | -62% |
| Extension Host | 800KB | 400KB | -50% |
| Webview CSS | 250KB | 80KB | -68% |
| 총 크기 | 2.25MB | 930KB | -59% |

---

### 1.2 Tree-Shaking 전략

**Webpack Tree-Shaking 설정**:

```javascript
// webpack.config.js
const path = require('path');

module.exports = {
  mode: 'production',  // ✅ Tree-shaking 활성화
  entry: {
    extension: './src/extension.ts',
    'webviews/podDetails': './webviews/podDetails/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',  // Extension Host용
  },
  optimization: {
    usedExports: true,  // ✅ 사용된 Export만 포함
    sideEffects: false, // ✅ Side-effect 없는 모듈 제거
    minimize: true,     // ✅ Minification
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,     // console.log 제거
            drop_debugger: true,    // debugger 제거
            pure_funcs: ['console.info', 'console.debug'],
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10,
        },
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react-vendor',
          priority: 20,
        },
      },
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      // ✅ Lodash 대신 lodash-es 사용 (Tree-shakable)
      'lodash': 'lodash-es',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,  // Type-checking은 별도
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
};
```

---

### 1.3 라이브러리 선택 최적화

**번들 크기 비교** (gzip 후):

| 라이브러리 | 번들 크기 | 대안 | 대안 크기 | 절감 |
|-----------|---------|------|----------|------|
| Moment.js | 288KB | date-fns | 78KB | -73% |
| Lodash (전체) | 71KB | Lodash-es (필요한 것만) | 15KB | -79% |
| Axios | 13KB | Fetch API (내장) | 0KB | -100% |
| React + ReactDOM | 130KB | Preact | 10KB | -92% ⚠️ |
| Material-UI | 500KB+ | Custom Components | 50KB | -90% |
| Chart.js | 180KB | Lightweight alternative | 40KB | -78% |

**권장 라이브러리**:

```json
{
  "dependencies": {
    "react": "^17.0.2",           // ✅ 필수
    "react-dom": "^17.0.2",       // ✅ 필수

    "date-fns": "^2.30.0",        // ✅ Moment.js 대신
    "lodash-es": "^4.17.21",      // ✅ Lodash 대신
    "clsx": "^2.0.0",             // ✅ classNames 대신
    "react-window": "^1.8.10",    // ✅ Virtual Scrolling
    "zustand": "^4.4.0",          // ✅ Redux 대신 (3KB)

    "recharts": "^2.10.0"         // ⚠️ 차트 필요 시
  },
  "devDependencies": {
    // Storybook은 devDependencies에만
    "@storybook/react": "^8.0.0",
    "@storybook/addon-essentials": "^8.0.0"
  }
}
```

**절대 피해야 할 라이브러리**:

```json
{
  "dependencies": {
    "moment": "...",              // ❌ 288KB, date-fns 사용
    "lodash": "...",              // ❌ 71KB, lodash-es 사용
    "jquery": "...",              // ❌ React와 불필요
    "@material-ui/core": "...",   // ❌ 500KB+, 커스텀 컴포넌트 사용
    "antd": "...",                // ❌ 600KB+
    "rxjs": "..."                 // ❌ 복잡성 증가, 필요한 경우만
  }
}
```

---

### 1.4 Code Splitting

**Lazy Loading 패턴**:

```typescript
// ❌ 모든 컴포넌트를 즉시 로드
import { PodDetailsView } from './PodDetailsView';
import { DeploymentDetailsView } from './DeploymentDetailsView';
import { LogsView } from './LogsView';
import { TerminalView } from './TerminalView';

// 번들 크기: 800KB (모든 컴포넌트 포함)

// ✅ Lazy Loading으로 필요한 컴포넌트만 로드
import { lazy, Suspense } from 'react';

const PodDetailsView = lazy(() => import('./PodDetailsView'));
const DeploymentDetailsView = lazy(() => import('./DeploymentDetailsView'));
const LogsView = lazy(() => import('./LogsView'));
const TerminalView = lazy(() => import('./TerminalView'));

function App({ view }) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      {view === 'pod' && <PodDetailsView />}
      {view === 'deployment' && <DeploymentDetailsView />}
      {view === 'logs' && <LogsView />}
      {view === 'terminal' && <TerminalView />}
    </Suspense>
  );
}

// 초기 번들: 200KB, 각 View: 150KB (필요할 때만)
```

**Dynamic Import로 Webview 최적화**:

```typescript
// Extension Host: Webview 생성 시점에 필요한 코드만 로드
export class PodDetailsWebview implements WebviewProvider {
  async show(pod: Pod) {
    // ✅ Webview 생성 전까지 HTML 템플릿 로딩 지연
    const html = await this.getHtml();

    this._panel = vscode.window.createWebviewPanel(
      'podDetails',
      `Pod: ${pod.name}`,
      vscode.ViewColumn.One,
      { enableScripts: true }
    );

    this._panel.webview.html = html;
  }

  private async getHtml(): Promise<string> {
    // ✅ HTML 템플릿을 동적으로 로드
    const htmlTemplate = await import('./podDetails.html');
    return htmlTemplate.default;
  }
}
```

**번들 크기 개선 효과**:

| 방법 | 초기 로딩 크기 | 총 크기 | 개선 |
|-----|------------|--------|------|
| 즉시 로드 | 800KB | 800KB | - |
| Lazy Loading | 200KB | 800KB | 초기 -75% |
| Code Splitting | 150KB | 700KB | 초기 -81% |

---

## ⚡ Extension 활성화 성능

### 2.1 Extension Activation 시간 목표

**VSCode Extension 활성화 시간 기준**:

| 등급 | 활성화 시간 | 사용자 경험 | 목표 |
|------|-----------|----------|------|
| 🟢 Excellent | < 500ms | 즉각 응답 | ✅ 목표 |
| 🟡 Good | 500ms - 1s | 약간의 지연 | ⚠️ 허용 |
| 🟠 Acceptable | 1s - 2s | 눈에 띄는 지연 | ⚠️ 최대치 |
| 🔴 Poor | > 2s | 답답함 | ❌ 회피 |

**FreeLens 마이그레이션 목표**:
- **초기 활성화**: < 1초
- **Webview 생성**: < 500ms
- **첫 렌더링**: < 300ms

---

### 2.2 Lazy Activation 전략

**Activation Events 최적화**:

```json
{
  "activationEvents": [
    // ❌ 너무 이른 활성화
    "onStartupFinished",  // VSCode 시작 시 즉시 활성화 (피해야 함)

    // ✅ 필요한 시점에만 활성화
    "onView:kubernetesExplorer",     // TreeView가 표시될 때
    "onCommand:kubernetes.showPods",  // 명령 실행 시
    "onWebviewPanel:podDetails",      // Webview 복원 시

    // ✅ 특정 파일 타입
    "onLanguage:yaml",                // YAML 파일 열 때 (필요 시)
  ]
}
```

**Lazy Loading Container**:

```typescript
// ❌ 즉시 초기화 (느림)
export function activate(context: vscode.ExtensionContext) {
  const container = K8sContainer.create(context);

  // 모든 서비스 즉시 초기화
  container.clusterManager.init();
  container.kubernetesApi.init();
  container.webviewsController.init();
  // 활성화 시간: 2초+
}

// ✅ Lazy Loading (빠름)
export function activate(context: vscode.ExtensionContext) {
  const container = K8sContainer.create(context);

  // 서비스는 최초 사용 시에만 초기화 (Lazy Getter)
  // 활성화 시간: 200ms
}

// Container DI with Lazy Loading
export class K8sContainer {
  private _clusterManager?: ClusterManager;

  get clusterManager(): ClusterManager {
    if (!this._clusterManager) {
      this._clusterManager = new ClusterManager();  // 최초 호출 시에만 생성
      this._disposables.push(this._clusterManager);
    }
    return this._clusterManager;
  }
}
```

**활성화 시간 비교**:

| 방법 | Extension 활성화 | 첫 명령 실행 | 총 시간 |
|-----|----------------|-----------|---------|
| 즉시 초기화 | 2.5초 | 0.1초 | 2.6초 |
| Lazy Loading | 0.2초 | 0.4초 | 0.6초 |
| **개선율** | **-92%** | +300% | **-77%** |

---

### 2.3 Bundling 최적화

**번들러 선택**:

| 번들러 | 빌드 시간 | 번들 크기 | 권장 |
|--------|---------|---------|------|
| Webpack 5 | 8초 | 500KB | ✅ 권장 |
| esbuild | 0.5초 | 480KB | ✅ 빠른 개발 |
| Rollup | 6초 | 450KB | ⚠️ 복잡 |
| Parcel | 5초 | 520KB | ⚠️ 설정 제한 |

**esbuild 설정 (개발 속도 우선)**:

```javascript
// esbuild.js
const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/extension.ts', 'webviews/podDetails/index.tsx'],
  bundle: true,
  outdir: 'dist',
  external: ['vscode'],  // ✅ vscode는 번들 제외
  platform: 'node',
  target: 'node16',
  format: 'cjs',
  minify: true,
  sourcemap: 'external',
  define: {
    'process.env.NODE_ENV': '"production"',
  },
}).then(() => {
  console.log('Build complete');
});

// 빌드 시간: 0.5초 (Webpack 대비 16배 빠름)
```

---

## 💾 Webview 메모리 관리

### 3.1 메모리 사용량 목표

**Webview 메모리 사용 기준**:

| 상태 | 메모리 사용량 | 평가 | 목표 |
|------|-------------|------|------|
| 빈 Webview | ~30MB | 기본 | - |
| React 앱 (작음) | ~50MB | 🟢 Good | ✅ |
| React 앱 (중간) | ~100MB | 🟡 Acceptable | ⚠️ |
| React 앱 (큼) | ~200MB | 🔴 Poor | ❌ |
| retainContextWhenHidden (10개) | ~500MB | 🔴 Critical | ❌ |

**FreeLens 마이그레이션 목표**:
- **PodDetailsView**: < 80MB
- **DeploymentDetailsView**: < 100MB
- **LogsView**: < 120MB (스트리밍 버퍼 포함)
- **동시 Webview 3개**: < 300MB

---

### 3.2 retainContextWhenHidden 회피

**retainContextWhenHidden의 문제점**:

```typescript
// ❌ 메모리 과다 사용
const panel = vscode.window.createWebviewPanel(
  'podDetails',
  'Pod Details',
  vscode.ViewColumn.One,
  {
    retainContextWhenHidden: true  // ⚠️ 숨겨져도 메모리 유지
  }
);

// 10개 Webview 생성 시: 10 × 50MB = 500MB
```

**메모리 사용량 측정**:

| Webview 개수 | retainContextWhenHidden: false | retainContextWhenHidden: true |
|-------------|-------------------------------|------------------------------|
| 1개 (visible) | 50MB | 50MB |
| 5개 (1개만 visible) | 80MB | 250MB |
| 10개 (1개만 visible) | 120MB | 500MB |

**올바른 대안: vscode.setState/getState**:

```typescript
// ✅ State 직렬화로 메모리 절약
function PodDetailsView() {
  const vscode = acquireVsCodeApi();
  const [pods, setPods] = useState<Pod[]>(() => {
    // Webview 복원 시 State 복원
    const state = vscode.getState();
    return state?.pods || [];
  });

  useEffect(() => {
    // State 변경 시 저장 (JSON 직렬화)
    vscode.setState({ pods });
  }, [pods]);

  // Webview가 destroy되어도 State는 유지
  // 메모리 사용: JSON 문자열 (~10KB) vs 전체 Webview (~50MB)
}
```

**메모리 절감 효과**:

| 방법 | Webview 10개 (1개 visible) | 메모리 절감 |
|-----|-------------------------|-----------|
| retainContextWhenHidden | 500MB | - |
| vscode.setState | 120MB | **-76%** |

---

### 3.3 메모리 누수 방지

**흔한 메모리 누수 패턴**:

```typescript
// ❌ 메모리 누수 1: EventListener 정리 안 함
function PodList() {
  useEffect(() => {
    const handleMessage = (event) => {
      console.log(event.data);
    };

    window.addEventListener('message', handleMessage);

    // ⚠️ cleanup 함수 누락
  }, []);
}

// ✅ 올바른 cleanup
function PodList() {
  useEffect(() => {
    const handleMessage = (event) => {
      console.log(event.data);
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);  // ✅
    };
  }, []);
}
```

```typescript
// ❌ 메모리 누수 2: Interval/Timeout 정리 안 함
function LogsView() {
  useEffect(() => {
    const interval = setInterval(() => {
      fetchLogs();
    }, 1000);

    // ⚠️ cleanup 누락
  }, []);
}

// ✅ 올바른 cleanup
function LogsView() {
  useEffect(() => {
    const interval = setInterval(() => {
      fetchLogs();
    }, 1000);

    return () => clearInterval(interval);  // ✅
  }, []);
}
```

```typescript
// ❌ 메모리 누수 3: 대량 로그 무한 저장
function LogsView() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    window.addEventListener('message', (event) => {
      if (event.data.type === 'log/line') {
        setLogs(prev => [...prev, event.data.line]);  // ⚠️ 무한 증가
      }
    });
  }, []);
}

// ✅ 버퍼 크기 제한
const MAX_LOG_LINES = 10000;

function LogsView() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    window.addEventListener('message', (event) => {
      if (event.data.type === 'log/line') {
        setLogs(prev => {
          const newLogs = [...prev, event.data.line];
          // ✅ 최대 10,000 라인만 유지
          return newLogs.length > MAX_LOG_LINES
            ? newLogs.slice(-MAX_LOG_LINES)
            : newLogs;
        });
      }
    });
  }, []);
}
```

---

## ⚛️ React 컴포넌트 최적화

### 4.1 Re-render 최소화

**React.memo 사용**:

```typescript
// ❌ 매번 re-render
function PodCard({ pod }: { pod: Pod }) {
  console.log('PodCard rendered');
  return <div>{pod.name}</div>;
}

function PodList({ pods }: { pods: Pod[] }) {
  const [filter, setFilter] = useState('');

  return (
    <div>
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      {pods.map(pod => (
        <PodCard key={pod.id} pod={pod} />  // ⚠️ filter 변경 시 모든 PodCard re-render
      ))}
    </div>
  );
}

// ✅ React.memo로 불필요한 re-render 방지
const PodCard = React.memo(({ pod }: { pod: Pod }) => {
  console.log('PodCard rendered');
  return <div>{pod.name}</div>;
});  // ✅ pod가 변경되지 않으면 re-render 안 함

function PodList({ pods }: { pods: Pod[] }) {
  const [filter, setFilter] = useState('');

  return (
    <div>
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      {pods.map(pod => (
        <PodCard key={pod.id} pod={pod} />  // ✅ filter 변경 시 PodCard re-render 안 함
      ))}
    </div>
  );
}
```

**useMemo와 useCallback**:

```typescript
// ❌ 매번 새로운 객체/함수 생성
function PodList({ pods }: { pods: Pod[] }) {
  const runningPods = pods.filter(p => p.status === 'Running');  // ⚠️ 매 render마다 실행
  const handleClick = (pod: Pod) => console.log(pod);  // ⚠️ 매 render마다 새 함수

  return (
    <div>
      {runningPods.map(pod => (
        <PodCard pod={pod} onClick={handleClick} />  // ⚠️ 항상 re-render
      ))}
    </div>
  );
}

// ✅ useMemo와 useCallback으로 최적화
function PodList({ pods }: { pods: Pod[] }) {
  const runningPods = useMemo(
    () => pods.filter(p => p.status === 'Running'),
    [pods]  // ✅ pods 변경 시에만 재계산
  );

  const handleClick = useCallback(
    (pod: Pod) => console.log(pod),
    []  // ✅ 한 번만 생성
  );

  return (
    <div>
      {runningPods.map(pod => (
        <PodCard pod={pod} onClick={handleClick} />  // ✅ 불필요한 re-render 없음
      ))}
    </div>
  );
}
```

**성능 개선 효과**:

| 최적화 | Pod 100개 렌더링 시간 | 개선율 |
|--------|-------------------|--------|
| 최적화 전 | 250ms | - |
| React.memo | 120ms | -52% |
| useMemo/useCallback | 80ms | -68% |

---

### 4.2 Virtual Scrolling

**react-window로 대량 데이터 렌더링**:

```typescript
// ❌ 10,000개 Pod를 모두 렌더링
function PodList({ pods }: { pods: Pod[] }) {
  return (
    <div>
      {pods.map(pod => (
        <PodRow key={pod.id} pod={pod} />  // ⚠️ 10,000개 DOM 노드 생성
      ))}
    </div>
  );
}

// 메모리: 200MB, 렌더링 시간: 3초+

// ✅ Virtual Scrolling (화면에 보이는 것만 렌더링)
import { FixedSizeList } from 'react-window';

function PodList({ pods }: { pods: Pod[] }) {
  return (
    <FixedSizeList
      height={600}         // 컨테이너 높이
      itemCount={pods.length}  // 총 아이템 수
      itemSize={35}        // 각 아이템 높이
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>
          <PodRow pod={pods[index]} />  // ✅ 화면에 보이는 20개만 렌더링
        </div>
      )}
    </FixedSizeList>
  );
}

// 메모리: 60MB, 렌더링 시간: 0.1초
```

**성능 비교**:

| Pod 개수 | 일반 렌더링 | Virtual Scrolling | 개선율 |
|---------|-----------|------------------|--------|
| 100개 | 150ms / 30MB | 80ms / 25MB | -47% / -17% |
| 1,000개 | 1.2s / 80MB | 90ms / 30MB | -92% / -62% |
| 10,000개 | 12s / 200MB | 100ms / 60MB | -99% / -70% |

---

## 📡 IPC 통신 최적화

### 5.1 메시지 크기 최소화

**대량 데이터 전송 최적화**:

```typescript
// ❌ 전체 Pod 객체 전송 (비효율적)
// Extension Host
panel.webview.postMessage({
  type: 'pods/update',
  pods: pods.map(pod => ({
    // ⚠️ 모든 필드 전송 (불필요한 데이터 포함)
    id: pod.id,
    name: pod.name,
    namespace: pod.namespace,
    status: pod.status,
    createdAt: pod.createdAt,
    labels: pod.labels,
    annotations: pod.annotations,
    spec: pod.spec,                    // ⚠️ 큰 객체
    status: pod.status,                // ⚠️ 중복
    metadata: pod.metadata,            // ⚠️ 큰 객체
    // ... 50+ fields
  }))
});

// 메시지 크기: 500KB (Pod 100개)

// ✅ 필요한 필드만 전송
// Extension Host
panel.webview.postMessage({
  type: 'pods/update',
  pods: pods.map(pod => ({
    id: pod.id,
    name: pod.name,
    namespace: pod.namespace,
    status: pod.status,
    // ✅ UI에 필요한 필드만
  }))
});

// 메시지 크기: 50KB (Pod 100개) → 90% 감소
```

**Delta Updates (증분 업데이트)**:

```typescript
// ❌ 매번 전체 데이터 전송
setInterval(() => {
  const pods = await getPods();
  panel.webview.postMessage({
    type: 'pods/update',
    pods  // ⚠️ 100개 Pod 전체 전송 (매 초마다)
  });
}, 1000);

// 메시지 크기: 50KB/초

// ✅ 변경된 Pod만 전송
let previousPods = [];

setInterval(() => {
  const pods = await getPods();

  const added = pods.filter(p => !previousPods.find(prev => prev.id === p.id));
  const updated = pods.filter(p => {
    const prev = previousPods.find(prev => prev.id === p.id);
    return prev && prev.status !== p.status;  // ✅ 상태 변경된 것만
  });
  const removed = previousPods.filter(p => !pods.find(curr => curr.id === p.id));

  panel.webview.postMessage({
    type: 'pods/delta',
    added,
    updated,
    removed
  });

  previousPods = pods;
}, 1000);

// 메시지 크기: 5KB/초 (평균) → 90% 감소
```

---

### 5.2 IPC 요청 Batching

**여러 요청을 하나로 묶기**:

```typescript
// ❌ 개별 요청 (비효율적)
pods.forEach(pod => {
  vscode.postMessage({
    command: 'pod/getMetrics',
    podId: pod.id
  });
});

// ⚠️ 100개 Pod → 100번 IPC 호출

// ✅ Batching으로 한 번에 요청
const podIds = pods.map(p => p.id);
vscode.postMessage({
  command: 'pods/getMetrics',
  podIds  // ✅ 한 번에 100개 요청
});

// Extension Host에서 한 번에 처리
panel.webview.onDidReceiveMessage(async (message) => {
  if (message.command === 'pods/getMetrics') {
    const metrics = await Promise.all(
      message.podIds.map(id => getMetrics(id))
    );

    panel.webview.postMessage({
      type: 'metrics/result',
      metrics
    });
  }
});
```

**성능 개선**:

| 방법 | IPC 호출 수 | 지연 시간 |
|-----|-----------|---------|
| 개별 요청 | 100회 | 500ms |
| Batching | 1회 | 50ms |
| **개선율** | **-99%** | **-90%** |

---

## 📚 Storybook 빌드 최적화

### 6.1 Storybook 빌드 시간 단축

**Storybook 8 성능 최적화**:

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.tsx'],

  // ✅ Vite 사용 (Webpack 대비 2-4배 빠름)
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  // ✅ --test 플래그로 빠른 빌드
  build: {
    test: {
      disableDocs: true,         // Docs 페이지 제외
      disableSourcemaps: true,   // Sourcemap 제외
      disableAutoDocs: true,     // Auto-docs 제외
    },
  },

  // ✅ Addons 최소화
  addons: [
    '@storybook/addon-essentials',
    // 프로덕션에서는 addon-interactions 제외
  ],

  viteFinal: async (config) => {
    return {
      ...config,
      build: {
        ...config.build,
        // ✅ Minification 최적화
        minify: 'esbuild',  // Terser보다 빠름
        target: 'es2020',
        rollupOptions: {
          output: {
            manualChunks: undefined,  // 자동 chunk 비활성화
          },
        },
      },
    };
  },
};

export default config;
```

**빌드 시간 비교**:

| 설정 | 빌드 시간 | 번들 크기 |
|-----|---------|---------|
| Webpack (전체) | 45초 | 2.5MB |
| Vite (전체) | 18초 | 2.2MB |
| Vite + --test | 8초 | 1.2MB |
| **개선율** | **-82%** | **-52%** |

---

### 6.2 Storybook vs Webview 빌드 분리

**빌드 파이프라인**:

```json
{
  "scripts": {
    // ✅ Storybook 개발 (개발자용)
    "storybook:dev": "storybook dev -p 6006",

    // ✅ Storybook 빌드 (CI/CD, Visual Regression Testing)
    "storybook:build": "storybook build --test",

    // ✅ Webview 프로덕션 빌드 (Extension 포함)
    "webview:build": "webpack --mode production --config webpack.webview.config.js",

    // ✅ Extension 전체 빌드
    "build": "npm run webview:build && vsce package"
  }
}
```

**Webview 번들에서 Storybook 제외**:

```javascript
// webpack.webview.config.js
module.exports = {
  entry: './webviews/podDetails/index.tsx',  // ✅ Storybook 코드 제외
  externals: {
    '@storybook/react': 'undefined',         // ✅ Storybook 제외
    '@storybook/addon-actions': 'undefined',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.IS_STORYBOOK': 'false',  // ✅ Storybook 전용 코드 제거
    }),
  ],
};
```

---

## 📊 성능 모니터링 및 디버깅

### 7.1 VSCode Extension 성능 프로파일링

**활성화 시간 측정**:

```bash
# VSCode Command Palette
> Developer: Show Running Extensions

# 결과:
# Extension                  Activation Time
# kubernetes-extension       850ms          ⚠️ 목표: <500ms
```

**상세 프로파일링**:

```typescript
// src/extension.ts
export function activate(context: vscode.ExtensionContext) {
  const startTime = Date.now();

  console.time('Container.create');
  const container = K8sContainer.create(context);
  console.timeEnd('Container.create');  // Container.create: 120ms

  console.time('Commands.register');
  registerCommands(context, container);
  console.timeEnd('Commands.register');  // Commands.register: 45ms

  console.time('Views.register');
  registerViews(context, container);
  console.timeEnd('Views.register');  // Views.register: 80ms

  const totalTime = Date.now() - startTime;
  console.log(`Extension activated in ${totalTime}ms`);  // 245ms
}
```

---

### 7.2 Webview 메모리 모니터링

**Chrome DevTools 사용**:

```typescript
// Webview에서 메모리 사용량 측정
function measureMemory() {
  if (performance.memory) {
    console.log({
      totalJSHeapSize: (performance.memory.totalJSHeapSize / 1048576).toFixed(2) + ' MB',
      usedJSHeapSize: (performance.memory.usedJSHeapSize / 1048576).toFixed(2) + ' MB',
      jsHeapSizeLimit: (performance.memory.jsHeapSizeLimit / 1048576).toFixed(2) + ' MB',
    });
  }
}

// 정기적으로 모니터링
setInterval(measureMemory, 10000);  // 10초마다
```

**VSCode Developer Tools**:

```bash
# Command Palette
> Developer: Toggle Developer Tools

# Memory Tab에서
# 1. Take Heap Snapshot
# 2. 메모리 누수 확인 (Detached DOM nodes)
# 3. Comparison View로 증가량 확인
```

---

### 7.3 번들 크기 분석

**webpack-bundle-analyzer 사용**:

```bash
npm install --save-dev webpack-bundle-analyzer
```

```javascript
// webpack.config.js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'bundle-report.html',
      openAnalyzer: false,
    }),
  ],
};
```

```bash
npm run build

# bundle-report.html 생성됨
# 각 모듈의 크기를 시각화
```

**분석 결과 예시**:

```
Total Bundle Size: 500KB

react-dom.production.min.js      130KB  (26%)  ← ✅ 필수
react.production.min.js           40KB   (8%)  ← ✅ 필수
PodDetailsView.tsx               100KB  (20%)  ← ✅ 핵심 기능
lodash-es (used exports)          15KB   (3%)  ← ✅ 필요한 것만
date-fns (2 functions)             8KB   (2%)  ← ✅ Tree-shaken
...
@storybook/addon-actions         120KB  (24%)  ← ❌ 제거 필요!
```

---

## 🎯 성능 벤치마크 및 목표

### 8.1 성능 목표 (FreeLens 마이그레이션)

| 지표 | 현재 (최적화 전) | 목표 (최적화 후) | 달성 방법 |
|------|----------------|----------------|----------|
| **Extension 활성화 시간** | 2.5초 | < 1초 | Lazy Loading |
| **Webview 생성 시간** | 1.2초 | < 500ms | Code Splitting |
| **첫 렌더링 시간** | 800ms | < 300ms | React.memo, useMemo |
| **번들 크기 (Extension)** | 800KB | < 400KB | Tree-shaking |
| **번들 크기 (Webview)** | 1.2MB | < 500KB | Storybook Addons 제거 |
| **메모리 (Webview 1개)** | 150MB | < 80MB | Virtual Scrolling |
| **메모리 (Webview 5개)** | 600MB | < 250MB | setState/getState |
| **IPC 지연 시간** | 50ms | < 20ms | Batching |

---

### 8.2 성능 테스트 체크리스트

**Extension 활성화 성능**:
- [ ] `onStartupFinished` Activation Event 사용 안 함
- [ ] Container DI Lazy Loading 구현
- [ ] 활성화 시간 < 1초
- [ ] `Developer: Show Running Extensions`로 측정

**Webview 성능**:
- [ ] 초기 번들 크기 < 500KB
- [ ] Code Splitting 적용 (Lazy Loading)
- [ ] Virtual Scrolling (1000개 이상 아이템)
- [ ] React.memo, useMemo, useCallback 사용
- [ ] retainContextWhenHidden 사용 안 함

**메모리 관리**:
- [ ] Webview 메모리 < 80MB
- [ ] EventListener cleanup 구현
- [ ] Interval/Timeout cleanup 구현
- [ ] 로그 버퍼 크기 제한 (10,000 라인)
- [ ] Chrome DevTools Heap Snapshot 검증

**번들 크기**:
- [ ] Storybook Addons 프로덕션 제외
- [ ] Tree-shaking 적용
- [ ] Lodash → Lodash-es
- [ ] Moment.js → date-fns
- [ ] webpack-bundle-analyzer로 검증

---

**다음 문서**: [04-security.md](04-security.md) - CSP 보안 정책 및 XSS 방어
