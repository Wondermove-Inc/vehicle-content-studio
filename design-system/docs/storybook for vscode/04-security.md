# Storybook + VSCode Extension: 보안 요구사항 및 CSP 가이드

**작성일**: 2025-10-08
**문서 버전**: 1.0
**이전 문서**: [03-performance.md](03-performance.md)
**다음 문서**: [05-workflow.md](05-workflow.md)

---

## 📋 목차

1. [CSP (Content Security Policy) 필수 요구사항](#csp-content-security-policy-필수-요구사항)
2. [Nonce 기반 Script 로딩](#nonce-기반-script-로딩)
3. [XSS 방어 전략](#xss-방어-전략)
4. [입력 검증 및 Sanitization](#입력-검증-및-sanitization)
5. [리소스 로딩 보안](#리소스-로딩-보안)
6. [IPC 통신 보안](#ipc-통신-보안)
7. [보안 체크리스트](#보안-체크리스트)

---

## 🔒 CSP (Content Security Policy) 필수 요구사항

### 1.1 VSCode Webview CSP 정책

**필수**: 모든 Webview는 반드시 CSP를 설정해야 합니다.

```typescript
// ✅ 올바른 CSP 설정
function getHtml(webview: vscode.Webview): string {
  const nonce = getNonce();  // 랜덤 nonce 생성

  const csp = `
    default-src 'none';
    script-src 'nonce-${nonce}';
    style-src ${webview.cspSource} 'unsafe-inline';
    img-src ${webview.cspSource} https: data:;
    font-src ${webview.cspSource};
    connect-src 'none';
  `.replace(/\s+/g, ' ').trim();

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta http-equiv="Content-Security-Policy" content="${csp}">
      <title>Pod Details</title>
    </head>
    <body>
      <div id="root"></div>
      <script nonce="${nonce}" src="${scriptUri}"></script>
    </body>
    </html>
  `;
}

function getNonce() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
```

---

### 1.2 CSP Directive 설명

| Directive | 값 | 설명 | 필수 여부 |
|-----------|---|------|----------|
| `default-src` | `'none'` | 기본적으로 모든 리소스 차단 | ✅ 필수 |
| `script-src` | `'nonce-{random}'` | nonce가 일치하는 script만 허용 | ✅ 필수 |
| `style-src` | `${webview.cspSource} 'unsafe-inline'` | VSCode 리소스 + inline 스타일 허용 | ✅ 필수 |
| `img-src` | `${webview.cspSource} https: data:` | 이미지 로딩 허용 | ⚠️ 권장 |
| `font-src` | `${webview.cspSource}` | 폰트 로딩 허용 | ⚠️ 필요 시 |
| `connect-src` | `'none'` 또는 특정 도메인 | AJAX/WebSocket 차단 | ⚠️ 권장 |

**webview.cspSource 값 예시**:
```
vscode-webview://3e7e8e9c-4f3a-4b1d-9e8c-7f6a5b4c3d2e
```

---

### 1.3 흔한 CSP 위반 사례

#### ❌ 위반 1: inline script

```html
<!-- ❌ CSP 위반: inline script -->
<script>
  console.log('Hello World');  <!-- Refused to execute inline script -->
</script>

<!-- ✅ 올바른 방법: nonce 사용 -->
<script nonce="${nonce}">
  console.log('Hello World');
</script>
```

#### ❌ 위반 2: eval() 사용

```typescript
// ❌ CSP 위반
const code = 'console.log("Hello")';
eval(code);  // Refused to evaluate a string as JavaScript

// ✅ 대안: 미리 정의된 함수 사용
const actions = {
  log: () => console.log('Hello')
};
actions['log']();
```

#### ❌ 위반 3: CDN 리소스

```html
<!-- ❌ CSP 위반: 외부 CDN -->
<script src="https://cdn.jsdelivr.net/npm/react@17/umd/react.production.min.js"></script>

<!-- ✅ 올바른 방법: 번들에 포함 -->
<script nonce="${nonce}" src="${webview.asWebviewUri(scriptPath)}"></script>
```

---

## 🔐 Nonce 기반 Script 로딩

### 2.1 Nonce 생성 및 적용

**Extension Host에서 Nonce 생성**:

```typescript
// src/webviews/podDetailsWebview.ts
export class PodDetailsWebview implements WebviewProvider {
  private getNonce(): string {
    return crypto.randomBytes(16).toString('base64');
  }

  async getHtml(webview: vscode.Webview): Promise<string> {
    const nonce = this.getNonce();

    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'dist', 'webviews', 'podDetails.js')
    );
    const styleUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'dist', 'webviews', 'podDetails.css')
    );

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta http-equiv="Content-Security-Policy" content="
          default-src 'none';
          script-src 'nonce-${nonce}';
          style-src ${webview.cspSource} 'unsafe-inline';
        ">
        <link rel="stylesheet" href="${styleUri}">
      </head>
      <body>
        <div id="root"></div>
        <script nonce="${nonce}" src="${scriptUri}"></script>
      </body>
      </html>
    `;
  }
}
```

---

### 2.2 React에서 동적 Script 로딩

**문제**: React에서 `<script>` 태그를 동적으로 생성하면 nonce가 없어 CSP 위반

```typescript
// ❌ CSP 위반
function loadScript(src: string) {
  const script = document.createElement('script');
  script.src = src;  // ⚠️ nonce 없음
  document.body.appendChild(script);
}
```

**해결 방법 1: Extension Host에서 모든 스크립트 포함**

```html
<!-- ✅ 모든 필요한 스크립트를 HTML에 미리 포함 -->
<script nonce="${nonce}" src="${mainScriptUri}"></script>
<script nonce="${nonce}" src="${vendorScriptUri}"></script>
```

**해결 방법 2: Webpack Code Splitting + Preload**

```typescript
// Webpack에서 chunk 생성
import(/* webpackChunkName: "charts" */ './charts').then(module => {
  module.renderChart();
});

// Extension Host HTML에서 preload
<link rel="preload" href="${chartsChunkUri}" as="script" nonce="${nonce}">
<script nonce="${nonce}" src="${chartsChunkUri}"></script>
```

---

## 🛡️ XSS 방어 전략

### 3.1 사용자 입력 Sanitization

**HTML Injection 방어**:

```typescript
// ❌ XSS 취약점
function PodName({ pod }: { pod: Pod }) {
  return <div dangerouslySetInnerHTML={{ __html: pod.name }} />;
  // ⚠️ pod.name이 "<script>alert('XSS')</script>"이면 실행됨
}

// ✅ React의 기본 escaping 사용
function PodName({ pod }: { pod: Pod }) {
  return <div>{pod.name}</div>;  // ✅ 자동으로 HTML escape
}

// ✅ DOMPurify로 Sanitization (HTML 렌더링이 필요한 경우)
import DOMPurify from 'dompurify';

function PodDescription({ description }: { description: string }) {
  const sanitized = DOMPurify.sanitize(description, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong'],  // 허용된 태그만
    ALLOWED_ATTR: []  // 속성 차단
  });

  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
}
```

---

### 3.2 YAML/JSON Injection 방어

**Kubernetes YAML 렌더링 시 주의**:

```typescript
// ❌ YAML Injection 취약점
function YamlEditor({ yaml }: { yaml: string }) {
  return <pre>{yaml}</pre>;  // ✅ React가 자동 escape
}

// ⚠️ Monaco Editor 사용 시
import Editor from '@monaco-editor/react';

function YamlEditor({ yaml }: { yaml: string }) {
  const [content, setContent] = useState(yaml);

  return (
    <Editor
      value={content}
      language="yaml"
      onChange={(value) => {
        // ✅ YAML 파싱 전 검증
        try {
          jsyaml.load(value);  // 유효한 YAML인지 확인
          setContent(value);
        } catch (e) {
          console.error('Invalid YAML');
        }
      }}
    />
  );
}
```

---

### 3.3 Command Injection 방어

**IPC Command 검증**:

```typescript
// ❌ Command Injection 취약점
// Webview
vscode.postMessage({
  command: 'pod/exec',
  podName: userInput,  // ⚠️ 검증 없이 전송
  shellCommand: 'ls'
});

// Extension Host
panel.webview.onDidReceiveMessage(async (message) => {
  if (message.command === 'pod/exec') {
    // ⚠️ 위험: kubectl exec에 직접 사용
    exec(`kubectl exec ${message.podName} -- ${message.shellCommand}`);
  }
});

// ✅ 올바른 방법: 입력 검증
// Extension Host
panel.webview.onDidReceiveMessage(async (message) => {
  if (message.command === 'pod/exec') {
    // ✅ Pod 이름 검증 (K8s naming convention)
    const podNameRegex = /^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/;
    if (!podNameRegex.test(message.podName)) {
      panel.webview.postMessage({
        type: 'error',
        message: 'Invalid pod name'
      });
      return;
    }

    // ✅ 허용된 명령어만
    const allowedCommands = ['ls', 'pwd', 'env'];
    if (!allowedCommands.includes(message.shellCommand)) {
      panel.webview.postMessage({
        type: 'error',
        message: 'Command not allowed'
      });
      return;
    }

    // ✅ 안전하게 실행
    exec('kubectl', ['exec', message.podName, '--', message.shellCommand]);
  }
});
```

---

## ✅ 입력 검증 및 Sanitization

### 4.1 입력 검증 패턴

**Kubernetes 리소스 이름 검증**:

```typescript
// src/utils/validation.ts
export const K8S_NAME_REGEX = /^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/;
export const K8S_NAMESPACE_REGEX = /^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/;
export const K8S_LABEL_KEY_REGEX = /^[a-z0-9A-Z]([-._a-z0-9A-Z]*[a-z0-9A-Z])?$/;

export function validatePodName(name: string): boolean {
  return K8S_NAME_REGEX.test(name) && name.length <= 253;
}

export function validateNamespace(namespace: string): boolean {
  return K8S_NAMESPACE_REGEX.test(namespace) && namespace.length <= 63;
}

export function validateLabel(key: string, value: string): boolean {
  return (
    K8S_LABEL_KEY_REGEX.test(key) &&
    key.length <= 253 &&
    value.length <= 63
  );
}
```

**사용 예시**:

```typescript
// Webview
function PodFilter() {
  const [namespace, setNamespace] = useState('');

  const handleSubmit = () => {
    if (!validateNamespace(namespace)) {
      alert('Invalid namespace name');
      return;
    }

    vscode.postMessage({
      command: 'pods/filter',
      namespace
    });
  };

  return (
    <input
      value={namespace}
      onChange={(e) => setNamespace(e.target.value)}
      onBlur={handleSubmit}
    />
  );
}
```

---

### 4.2 Type-Safe IPC Protocol

**TypeScript로 IPC 프로토콜 정의**:

```typescript
// src/webviews/protocol.ts

// ✅ 명령어 타입 정의
export interface IpcCommand {
  'pod/delete': { podName: string; namespace: string };
  'pod/logs': { podName: string; namespace: string; container?: string };
  'deployment/scale': { name: string; namespace: string; replicas: number };
}

// ✅ 알림 타입 정의
export interface IpcNotification {
  'pod/updated': { pod: SerializedPod };
  'error': { message: string };
}

// ✅ Type-safe postMessage
export function sendCommand<K extends keyof IpcCommand>(
  command: K,
  params: IpcCommand[K]
) {
  const vscode = acquireVsCodeApi();
  vscode.postMessage({ command, ...params });
}

// ✅ Type-safe onDidReceiveMessage
export function handleMessage<K extends keyof IpcNotification>(
  type: K,
  handler: (params: IpcNotification[K]) => void
) {
  window.addEventListener('message', (event) => {
    if (event.data.type === type) {
      handler(event.data);
    }
  });
}
```

**사용 예시**:

```typescript
// Webview
sendCommand('pod/delete', {
  podName: 'nginx-1',
  namespace: 'default'
});  // ✅ 타입 안전

sendCommand('pod/delete', {
  podName: 'nginx-1'
});  // ❌ TypeScript 오류: namespace 필수

// Extension Host
panel.webview.onDidReceiveMessage((message) => {
  if (message.command === 'pod/delete') {
    const { podName, namespace } = message;  // ✅ 타입 추론
    // ...
  }
});
```

---

## 📂 리소스 로딩 보안

### 5.1 webview.asWebviewUri 사용

**모든 로컬 리소스는 반드시 `asWebviewUri`로 변환**:

```typescript
// ❌ 직접 파일 경로 사용 (작동 안 함)
const scriptPath = path.join(extensionPath, 'dist', 'webview.js');
const html = `<script src="file://${scriptPath}"></script>`;  // ⚠️ 로딩 실패

// ✅ asWebviewUri 사용
const scriptUri = webview.asWebviewUri(
  vscode.Uri.file(path.join(extensionPath, 'dist', 'webview.js'))
);
const html = `<script nonce="${nonce}" src="${scriptUri}"></script>`;  // ✅ 정상 작동
```

---

### 5.2 localResourceRoots 제한

**접근 가능한 로컬 리소스 제한**:

```typescript
const panel = vscode.window.createWebviewPanel(
  'podDetails',
  'Pod Details',
  vscode.ViewColumn.One,
  {
    enableScripts: true,

    // ✅ dist 폴더만 접근 허용
    localResourceRoots: [
      vscode.Uri.joinPath(extensionUri, 'dist')
    ]
  }
);

// ✅ dist 내부 파일: 접근 가능
webview.asWebviewUri(
  vscode.Uri.joinPath(extensionUri, 'dist', 'webview.js')
);  // ✅ 허용

// ❌ dist 외부 파일: 접근 차단
webview.asWebviewUri(
  vscode.Uri.joinPath(extensionUri, 'src', 'secret.json')
);  // ❌ 차단됨
```

---

### 5.3 외부 이미지 로딩

**CSP img-src 정책**:

```typescript
// CSP 설정
const csp = `
  img-src ${webview.cspSource} https: data:;
`;

// ✅ 허용되는 이미지 소스
<img src="${webview.asWebviewUri(localImageUri)}" />  // ✅ 로컬 이미지
<img src="https://example.com/logo.png" />            // ✅ HTTPS
<img src="data:image/png;base64,iVBORw0KG..." />      // ✅ Data URI

// ❌ 차단되는 이미지 소스
<img src="http://example.com/logo.png" />             // ❌ HTTP 차단
<img src="file:///path/to/image.png" />               // ❌ file:// 차단
```

---

## 🔗 IPC 통신 보안

### 6.1 메시지 Origin 검증

**postMessage Origin 확인**:

```typescript
// Webview
window.addEventListener('message', (event) => {
  // ⚠️ Origin 검증 (VSCode는 자동으로 검증하지만 추가 검증 권장)
  // if (event.origin !== 'vscode-webview://...') {
  //   return;
  //}

  const message = event.data;

  // ✅ Message Type 검증
  if (typeof message.type !== 'string') {
    console.error('Invalid message type');
    return;
  }

  // ✅ 허용된 타입만 처리
  const allowedTypes = ['pod/updated', 'error', 'logs/line'];
  if (!allowedTypes.includes(message.type)) {
    console.error('Unknown message type:', message.type);
    return;
  }

  // 메시지 처리
  handleMessage(message);
});
```

---

### 6.2 Rate Limiting

**과도한 IPC 호출 방지**:

```typescript
// Extension Host: Rate Limiting
class RateLimiter {
  private requests = new Map<string, number>();
  private readonly maxRequests = 10;
  private readonly windowMs = 1000;

  isAllowed(command: string): boolean {
    const now = Date.now();
    const count = this.requests.get(command) || 0;

    if (count >= this.maxRequests) {
      return false;
    }

    this.requests.set(command, count + 1);

    setTimeout(() => {
      this.requests.delete(command);
    }, this.windowMs);

    return true;
  }
}

const rateLimiter = new RateLimiter();

panel.webview.onDidReceiveMessage((message) => {
  if (!rateLimiter.isAllowed(message.command)) {
    panel.webview.postMessage({
      type: 'error',
      message: 'Too many requests'
    });
    return;
  }

  // 명령 처리
  handleCommand(message);
});
```

---

## ✅ 보안 체크리스트

### Extension 개발 시 필수 확인사항

**CSP 보안**:
- [ ] 모든 Webview에 CSP 설정
- [ ] `default-src 'none'` 사용
- [ ] `script-src 'nonce-{random}'` 사용
- [ ] nonce는 매번 랜덤 생성 (32자 이상)
- [ ] inline script/style 사용 안 함
- [ ] eval() 사용 안 함
- [ ] CDN 리소스 번들에 포함

**XSS 방어**:
- [ ] 사용자 입력 HTML escape
- [ ] DOMPurify로 sanitization (HTML 렌더링 시)
- [ ] `dangerouslySetInnerHTML` 사용 최소화
- [ ] Kubernetes 리소스 이름 검증
- [ ] YAML/JSON 파싱 전 검증

**IPC 보안**:
- [ ] Type-safe IPC Protocol 사용
- [ ] Command Injection 방어
- [ ] 입력 검증 (정규식)
- [ ] Rate Limiting 구현
- [ ] Message Origin 검증

**리소스 로딩**:
- [ ] `webview.asWebviewUri` 사용
- [ ] `localResourceRoots` 제한
- [ ] HTTPS만 허용 (img-src, font-src)
- [ ] Data URI는 필요 시에만

**민감 정보 보호**:
- [ ] Kubernetes Secrets는 Extension Host에서만 처리
- [ ] Token/Password는 Webview에 전송 안 함
- [ ] 로그에 민감 정보 출력 안 함
- [ ] State에 민감 정보 저장 안 함

---

**보안 심각도**:

| 취약점 | 심각도 | 영향 | 대응 필수 |
|--------|--------|------|----------|
| CSP 미설정 | 🔴 Critical | XSS 공격 가능 | ✅ 필수 |
| inline script | 🔴 Critical | CSP 위반 | ✅ 필수 |
| Command Injection | 🔴 Critical | 시스템 침해 | ✅ 필수 |
| XSS 취약점 | 🔴 Critical | 데이터 유출 | ✅ 필수 |
| HTTP 리소스 | 🟡 Medium | MITM 공격 | ⚠️ 권장 |
| Rate Limiting 없음 | 🟡 Medium | DoS 공격 | ⚠️ 권장 |
| Origin 검증 없음 | 🟢 Low | 제한적 위험 | ⚠️ 권장 |

---

**다음 문서**: [05-workflow.md](05-workflow.md) - Storybook 개발 워크플로우 및 Best Practices
