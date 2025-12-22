# CLAUDE-KR.md

이 파일은 Claude Code(claude.ai/code)가 이 저장소의 코드 작업 시 참조하는 한국어 가이드입니다.

## 프로젝트 개요

**DAIVE**는 Open Lens/Lens Desktop에서 포크된 Kubernetes IDE 프로젝트입니다. "Freelens"라는 메인 Electron 애플리케이션과 모듈형 기능을 제공하는 여러 workspace 패키지로 구성되어 있습니다.

## 개발 설정

### 필수 요구사항
- Node.js >=22.0.0
- pnpm 10.17.1 (packageManager 필드로 관리)

### 주요 명령어

```bash
# 의존성 설치
pnpm install

# 개발 빌드
pnpm build:dev

# 개발 서버 시작
pnpm dev

# 프로덕션 빌드
pnpm build

# Lint 및 포맷팅
pnpm lint                    # trunk check 실행
pnpm lint:fix               # lint 이슈 자동 수정
pnpm biome:check            # Biome으로 검사
pnpm biome:fix              # Biome으로 자동 수정
pnpm prettier:check         # 포맷 검사
pnpm prettier:fix           # 포맷 자동 수정

# 테스팅
pnpm test:unit              # 모든 유닛 테스트 실행
pnpm test:unit:core         # core 패키지 테스트만 실행
pnpm test:integration       # 통합 테스트 실행 (freelens/)

# Electron 앱 빌드
pnpm build:app              # 현재 플랫폼용 빌드
pnpm build:dir              # 앱 디렉터리만 빌드

# 빌드된 앱 실행
pnpm start                  # 플랫폼별 시작 스크립트
```

### 개별 패키지 작업

```bash
# Core 패키지 개발
cd packages/core
pnpm test:unit              # 유닛 테스트
pnpm test:unit -u           # 스냅샷 업데이트
pnpm build                  # 코어 라이브러리 빌드

# Freelens 앱 개발
cd freelens
pnpm dev                    # 개발 모드 시작
pnpm build                  # 애플리케이션 빌드
pnpm test:integration       # 통합 테스트
```

## 아키텍처

### Workspace 구조

이 프로젝트는 두 개의 주요 영역으로 구성된 pnpm workspace입니다:

1. **`packages/`** - 특정 기능을 제공하는 모듈형 패키지들:
   - `core` - 메인 애플리케이션 로직, UI 컴포넌트, Kubernetes API
   - `kube-object` - Kubernetes 객체 표현
   - `logger` - 로깅 유틸리티
   - `routing` - 애플리케이션 라우팅
   - `metrics` - 메트릭 수집
   - 기타 여러 유틸리티 패키지

2. **`freelens/`** - 패키지들을 사용하는 메인 Electron 애플리케이션

### 의존성 주입 아키텍처

이 프로젝트는 `@ogre-tools/injectable`을 사용하여 의존성 주입을 구현합니다:

- **Main Process** (`freelens/src/main/index.ts`): 기능을 등록하고 Electron 메인 프로세스를 시작
- **Renderer Process** (`freelens/src/renderer/index.ts`): UI 기능을 등록하고 React 렌더러를 시작
- **Features**: `registerFeature()`로 등록되는 모듈형 기능 단위
- **Injectables**: `.injectable.ts` 접미사로 표시되는 서비스 및 컴포넌트

### 기술 스택

- **Electron 35.7.5** - 데스크톱 애플리케이션 프레임워크
- **React 17** - UI 프레임워크 (호환성을 위한 구버전)
- **MobX 6** - 상태 관리
- **TypeScript 5.9** - 타입 시스템
- **Webpack 5** - 모듈 번들링
- **Jest 29** - 테스팅 프레임워크
- **Monaco Editor** - 코드 편집
- **Material-UI** - UI 컴포넌트

### 주요 디렉터리

- `freelens/src/main/` - Electron 메인 프로세스 코드
- `freelens/src/renderer/` - React 렌더러 프로세스 코드
- `freelens/src/common/` - 메인과 렌더러 간 공유 코드
- `packages/core/src/` - 코어 애플리케이션 로직
- `packages/core/src/renderer/` - React 컴포넌트 및 UI 로직
- `packages/core/src/main/` - 메인 프로세스 서비스
- `packages/core/src/common/` - 공유 유틸리티

## 개발 워크플로우

### 변경 작업

1. **코어 로직**: `packages/core/src/`에서 수정
2. **앱 통합**: `freelens/src/`에서 수정
3. **빌드**: 개발용은 `pnpm build:dev`, 프로덕션용은 `pnpm build` 실행
4. **테스트**: 코어 기능은 `pnpm test:unit` 사용
5. **미리보기**: `pnpm dev`로 핫 리로드가 있는 개발 모드 시작

### 테스팅 전략

- **유닛 테스트**: 소스 파일과 함께 `__tests__/` 디렉터리에 위치
- **통합 테스트**: 전체 애플리케이션 테스팅을 위해 `freelens/`에 위치
- **스냅샷**: UI 컴포넌트용 Jest 스냅샷 테스팅 (`-u`로 업데이트)

### Kubernetes 통합

이 애플리케이션은 다음과 같은 완전한 Kubernetes IDE를 제공합니다:
- 멀티 클러스터 관리
- 리소스 탐색 및 편집
- Pod 터미널 액세스
- 메트릭 및 모니터링 (2가지 깔끔한 옵션으로 단순화: Prometheus와 Metrics Server)
- Helm 차트 관리
- 커스텀 기능을 위한 확장 시스템

### 메트릭 설정

메트릭 시스템은 **"Metric Collection Method"** 섹션에서 2가지 필수 옵션만 제공하도록 단순화되었습니다:

#### Prometheus
- **목적**: 풍부한 메트릭, 알림, 대시보드를 갖춘 고급 모니터링
- **적합한 환경**: 포괄적인 모니터링이 필요한 프로덕션 환경
- **제공 기능**: 커스텀 메트릭, 히스토리 데이터, 복잡한 쿼리, 알림 규칙
- **UI 라벨**: "Prometheus" (깔끔하고 단순함)

#### Metrics Server
- **목적**: Kubernetes 내장 Metrics Server를 사용한 기본 리소스 메트릭
- **적합한 환경**: 단순한 리소스 모니터링 (CPU, 메모리 사용량)
- **제공 기능**: Pod 및 노드의 실시간 리소스 사용 데이터
- **UI 라벨**: "Metrics Server" (깔끔하고 단순함)

**UI 개선사항:**
- 명확성을 위해 섹션 제목을 "Prometheus"에서 "Metric Collection Method"로 변경
- 긴 설명 텍스트에서 깔끔하고 짧은 이름으로 라벨 단순화
- 정확한 마우스/선택 감지를 위한 선택 로직 개선

**참고**: 추가 prometheus provider들(Helm, Lens, Operator, Stacklight)은 `packages/technical-features/prometheus/src/disabled-providers/`로 이동되었으며 필요시 재활성화 가능합니다.

주요 Kubernetes 관련 패키지:
- `@freelensapp/kube-api` - Kubernetes API 클라이언트
- `@freelensapp/kube-object` - 리소스 타입 정의
- `@freelensapp/kubectl-versions` - kubectl 바이너리 관리

---

## 📚 문서 시스템

### 📁 이중 문서 구조

**이 프로젝트는 이중 문서 시스템을 사용합니다:**

#### 1. **개발자 문서** (`docs/` 디렉터리)
**인간 개발자를 위한** - 상세하고 포괄적인 가이드:
- `docs/ui-styling-guide.md` - 완전한 UI/스타일링 구현 가이드
- `docs/kubernetes-metrics-server-support.md` - 포괄적인 메트릭 시스템 문서
- `docs/main-tab-system-api.md` - 전체 탭 시스템 API 레퍼런스
- 기타 상세한 기술 문서

#### 2. **Claude 레퍼런스 문서** (`docs/claude-reference/` 디렉터리)
**Claude Code 지원을 위한** - 간소화되고 작업 중심적인 레퍼런스:
- `docs/claude-reference/README.md` - 문서 시스템 설명
- `docs/claude-reference/CLAUDE-WORK-REFERENCE.md` - 파일 위치 및 작업 매핑을 위한 **주요 레퍼런스**
- `docs/claude-reference/ui-styling-quick-ref.md` - 현재 UI 상태 및 변경 절차
- `docs/claude-reference/main-tab-system-quick-ref.md` - 탭 시스템 수정 가이드
- `docs/claude-reference/metrics-server-quick-ref.md` - 메트릭 기능 레퍼런스

### 🔄 Claude 작업 레퍼런스 프로토콜

**항상 Claude 레퍼런스 문서를 먼저 확인하고 작업을 시작하세요:**

#### 1. **주요 레퍼런스 확인**:
```
첫 번째 → `docs/claude-reference/CLAUDE-WORK-REFERENCE.md`
↓
작업 타입 매핑 찾기 → 정확한 파일 경로 얻기 → 작업 시작
```

#### 2. **작업 타입 → 레퍼런스 매핑**:
- **UI/스타일링 작업** → `docs/claude-reference/ui-styling-quick-ref.md`
- **탭 시스템 작업** → `docs/claude-reference/main-tab-system-quick-ref.md`
- **메트릭/모니터링 작업** → `docs/claude-reference/metrics-server-quick-ref.md`
- **일반 파일 위치** → `docs/claude-reference/CLAUDE-WORK-REFERENCE.md`

#### 3. **문서 업데이트 프로토콜**:
- **코드 변경** → 상세 정보로 개발자 문서(`docs/`) 업데이트
- **새 기능** → 필요에 따라 개발자 문서와 Claude 레퍼런스 모두 추가
- **파일 구조 변경** → `CLAUDE-WORK-REFERENCE.md` 매핑 업데이트
- **문서 정리** → 이중 구조 분리 및 적절한 상세 수준 유지

### 🎯 빠른 작업 시작 프로세스:

1. **확인** `docs/claude-reference/CLAUDE-WORK-REFERENCE.md`에서 파일 위치 확인
2. **참조** 현재 상태 및 절차를 위한 특정 quick-ref 파일 참조
3. **작업** 정확한 파일 경로와 현재 구현을 알고 자신있게 작업
4. **업데이트** 변경사항으로 개발자 문서 업데이트

**이 시스템은 인간 개발자와 Claude 모두에게 최적의 문서를 제공합니다.**

---

## 📋 개발 워크플로우 가이드라인

### 🔍 문서 우선 탐색 규칙
**파일 탐색이나 코드베이스 검색 전에, 항상 Claude 레퍼런스 문서를 먼저 확인하세요:**

1. **주요: `docs/claude-reference/` 디렉터리 먼저 확인**:
   - `docs/claude-reference/CLAUDE-WORK-REFERENCE.md` - 파일 위치를 위한 **시작점**
   - `docs/claude-reference/ui-styling-quick-ref.md` - UI/스타일링 관련 작업
   - `docs/claude-reference/metrics-server-quick-ref.md` - 메트릭/모니터링 관련
   - `docs/claude-reference/main-tab-system-quick-ref.md` - 탭 시스템 관련

2. **Claude 레퍼런스가 충분한 정보를 제공하면 → 바로 작업 시작**

3. **Claude 레퍼런스가 불충분하면**, 파일 탐색 진행:
   - 코드 검색을 위해 `Grep` 도구 사용
   - 파일 패턴 매칭을 위해 `Glob` 도구 사용
   - 특정 파일을 위해 `Read` 도구 사용

4. **선택사항: 깊은 이해가 필요할 때만 개발자 문서 확인**:
   - `docs/ui-styling-guide.md` - 상세한 UI 구현 가이드
   - `docs/kubernetes-metrics-server-support.md` - 포괄적인 메트릭 문서
   - 기타 상세한 개발자 문서 (복잡한 아키텍처 결정을 위해)

5. **코드베이스 구조에 대한 새로운 인사이트를 얻은 후 항상 적절한 문서를 업데이트**

### 📝 문서 유지관리 가이드라인

**문서를 업데이트하거나 정리할 때, 항상 이중 구조를 유지하세요:**

#### **개발자 문서 스타일** (`docs/` 디렉터리):
- **포괄적인 상세정보**: 전체 기술 설명, 완전한 API 레퍼런스
- **히스토리 컨텍스트**: 배경 정보, 설계 결정, 마이그레이션 노트
- **완전한 예제**: 전체 코드 샘플, 상세한 구현 가이드
- **대상 독자**: 깊은 이해가 필요한 인간 개발자

#### **Claude 레퍼런스 스타일** (`docs/claude-reference/` 디렉터리):
- **작업 중심의 간결함**: 현재 상태 정보, 필수 절차만
- **파일 위치 강조**: 정확한 경로, 명확한 수정 대상
- **행동 지향적**: "어떤 기능을 위해 어떤 파일을 수정할지" 접근
- **간소화된 포맷**: 히스토리 제거, 최신 구현 상태에 집중
- **대상 독자**: 효율적인 작업 실행을 위한 Claude Code

#### **문서 정리 규칙**:
1. **이중 업데이트 필수**: 새 기능 추가 시 두 시스템 모두 업데이트
2. **분리 유지**: 상세한 설명을 Claude 레퍼런스에 병합하지 않음
3. **파일 매핑 우선순위**: `CLAUDE-WORK-REFERENCE.md`가 항상 현재 파일 구조를 반영하도록 보장
4. **현재 상태 집중**: Claude 레퍼런스는 "무엇이 변경되었는지"가 아닌 "현재 무엇인지" 표시
5. **빠른 접근성**: Claude 레퍼런스는 학습이 아닌 빠른 작업 시작에 최적화

#### **문서 분할 예시**:
```
개발자 문서: "탭 시스템은 단순한 배열 기반 접근에서 복잡한 상태 관리를 처리하기 위한
             MobX observable 스토어 패턴으로 발전했습니다..."

Claude 레퍼런스: "🎯 탭 시스템 수정 파일들:
                - packages/core/src/renderer/components/main-layout/tabs/
                - packages/core/src/common/tabs/tab-store.ts"
```

---

## 🗣️ 커뮤니케이션 가이드라인

**중요: 모든 설명, 주석, 응답은 반드시 한국어(韓國語)로 작성해야 합니다.**

이 프로젝트 작업 시:
- 모든 커밋 메시지: 영어 (Conventional Commits 형식)
- 모든 코드 주석: 한국어
- 모든 문서: 한국어
- 모든 사용자 질문에 대한 응답: 한국어
- 모든 에러 메시지 및 로그: 한국어 (가능한 경우)

**예외**: 코드 자체(변수명, 함수명 등)는 에코시스템 일관성을 위해 표준 영어 네이밍 컨벤션을 따라야 합니다.

**예시**:
```typescript
// ✅ 올바른 예시
// Pod 상태를 확인하고 아이콘을 반환합니다
function getPodStatusIcon(pod: Pod): string {
  // Running 상태일 때 초록색 아이콘 사용
  if (pod.status.phase === 'Running') {
    return 'status-running.svg';
  }
}

// ❌ 잘못된 예시
// Check pod status and return icon
function getPodStatusIcon(pod: Pod): string {
  // Use green icon when running
  if (pod.status.phase === 'Running') {
    return 'status-running.svg';
  }
}
```

### 🔍 한국어 코드 주석 및 함수 문서화
**모든 새로운 함수와 중요한 코드 변경사항에는 한국어 주석이 필요합니다:**

#### 1. 함수 문서화 규칙:
```typescript
/**
 * 🎯 목적: Pod의 메트릭 데이터를 가져와서 차트에 표시할 수 있는 형태로 변환
 *
 * @param podName - 조회할 Pod 이름
 * @param namespace - Pod가 속한 네임스페이스
 * @returns CPU와 메모리 사용량 데이터 배열
 *
 * 📝 주의사항:
 * - Kubernetes Metrics Server가 활성화되어 있어야 함
 * - 데이터가 없을 경우 빈 배열 반환
 *
 * 🔄 변경이력: 2025-09-25 - 초기 생성 (단순 메트릭 조회 기능)
 */
async function getSimplePodMetrics(podName: string, namespace: string) {
  // 구현 내용...
}
```

#### 2. 인라인 주석 규칙:
```typescript
// 🔥 SIMPLE: 복잡한 파라미터 없이 바로 쿠버네티스 API 호출
if (pods.length === 1 && !container) {
  // ⚠️ 중요: CustomObjectsApi가 없으면 fallback 사용
  if (this.customObjectsApi) {
    // 🎯 실제 쿠버네티스 메트릭 서버에서 데이터 가져오기
    const response = await this.customObjectsApi.listNamespacedCustomObject(/*...*/);
  }
}
```

#### 3. 코드 섹션 라벨:
```typescript
// ============================================
// 🎯 메트릭 데이터 처리 섹션
// ============================================

// 🔄 데이터 변환 로직
const transformedData = rawData.map(/*...*/);

// 🛡️ 에러 처리
try {
  // 메인 로직
} catch (error) {
  // 🚨 에러 발생 시 기본값 반환
  return defaultValue;
}
```

#### 4. 주석 업데이트 규칙:
- **기능 변경 시**: 관련 주석도 함께 업데이트 필수
- **함수 수정 시**: `🔄 변경이력`에 날짜와 변경사항 추가
- **파라미터 변경 시**: `@param` 설명도 함께 수정
- **주의사항 추가 시**: `📝 주의사항` 섹션에 추가

#### 5. 주석 아이콘 가이드:
```
🎯 목적/의도      📝 주의사항      🔄 변경이력
⚠️  중요/경고      🚨 에러처리      🛡️  보안
🔥 성능최적화     💡 팁/힌트      🎨 UI/스타일
🔍 디버깅        🧪 테스트       📊 데이터처리
⚡ 빠른처리      🌐 네트워크      🗃️  데이터베이스
🎪 복잡로직      🔐 암호화       🎭 임시코드
```

#### 6. 필수 주석 시나리오:
- **새로운 함수 생성**: 반드시 `🎯 목적` 포함한 JSDoc 작성
- **복잡한 로직 구현**: 단계별 한글 주석으로 설명
- **API 호출 부분**: 어떤 API를 왜 호출하는지 명시
- **에러 처리 로직**: 어떤 에러를 어떻게 처리하는지 설명
- **성능 최적화 코드**: 왜 이 방식을 선택했는지 설명
- **임시/해킹 코드**: `🎭 임시:` 표시하고 나중에 수정할 내용 명시

#### 커밋 메시지 포맷 (한국어):
```
feat/fix/docs: [간단한 설명]

- [상세 변경사항 - 파일 경로와 함께]
- docs: [문서명]에 [변경사항] 내용 추가

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

#### 문서 업데이트 전략:
- **기존 섹션이 있는 경우**: 해당 섹션의 내용을 최신 정보로 업데이트
- **새로운 주제인 경우**: 새 섹션 추가
- **변경 이력**: Git 커밋 메시지로 충분, 문서에는 최신 정보만 유지

#### 문서 포맷 (한국어):
```markdown
## [기능명] 변경 방법

### 수정해야 하는 파일
- `경로/파일명`: [목적/역할]

### 변경 방법
1. [단계별 설명]
2. [주의사항]

### 영향 범위
- [변경 시 영향받는 UI/기능]
```

---

## 🔧 소스 코드 수정 프로세스

모든 코드 변경에 다음 프로세스를 따르세요:

### 1. 요구사항 분석
- 사용자 지시, 기존 계획 문서, 관련 자료를 확인합니다
- 현재 동작을 재현(수동 또는 테스트)하여 문제를 정확히 파악합니다

### 2. 작업 계획 수립
- 해야 할 작업을 단계별로 나누어 TodoWrite 도구에 기록합니다
- 영향 범위를 조사하고, 구현 전에 필요한 추가 정보를 충분히 수집합니다

### 3. 코드 구현
- 컴포넌트, 컨텍스트, 훅, 스타일, 유틸 등 작은 단위로 집중해서 수정합니다
- 변경 범위를 명확히 하고 기존 API나 테스트에 미치는 영향을 항상 고려합니다
- 의도하지 않은 회귀가 없도록 엣지 케이스까지 점검합니다

### 4. 철저한 검증
- **정적 검사**: `pnpm lint`, `pnpm prettier:check`
- **테스트/빌드**: `pnpm test:unit`, `pnpm build:dev` 또는 `pnpm build`
- **실행 검증**: `pnpm dev`로 개발 모드에서 동작 확인
- **통합 테스트**: `pnpm test:integration` (필요시)

### 5. 문서 업데이트
- 계획 문서나 진행 내역에 완료된 단계와 근거를 업데이트합니다
- 테스트 결과, 남아 있는 리스크, 후속 작업을 요약합니다
- Developer docs (`docs/`)와 Claude reference (`docs/claude-reference/`) 업데이트

### 6. 버전 관리
- 검증을 마친 뒤 관련 파일을 스테이징하고 명확한 메시지로 커밋합니다
- Conventional Commits 형식을 따릅니다 (feat:, fix:, docs: 등)

### 추가 요구 사항

7. 해결 방법에 확신이 없다면, 진행 전에 최소 두 번 이상 인터넷을 검색해 충분한 정보를 확보해야 합니다
8. 여러 해결책이 존재하고 선택이 어렵다면, 사용자에게 옵션을 제시하고 답변을 받은 후 진행합니다

---

## 📋 작업 리스트 생성 지침 (docs/plan)

사용자 요구사항 문서를 기반으로 작업 리스트를 만들 때는 다음 절차를 따릅니다.

### 1. 요구사항 문서 찾기
- 요구사항은 `docs/plan/active/`(진행 중) 또는 `docs/plan/complete/`(완료)에 있습니다
- 사용자가 지정한 파일을 사용합니다

### 2. 요구사항 분석
- 해당 문서의 기능 요구, 사용자 스토리, 수용 기준, 제약 사항을 읽습니다
- 기존 코드베이스에서 관련 아키텍처 패턴, 컴포넌트, 유틸을 확인합니다

### 3. 1단계 – 상위 작업 작성
- 요구사항을 충족하는 데 필요한 상위 작업(약 5개)을 도출합니다
- 각 상위 작업에는 실제로 수행해야 할 내용을 구체적으로 설명하는 부가 문장을 함께 적고, 주니어 개발자가 따라 할 수 있을 만큼 친절하고 상세하게 작성합니다
- `docs/plan/active/YYYY-MM-DD-[작업명].md` 형식의 Markdown 파일을 생성합니다
- "Relevant Files"와 "Notes" 항목에 즉시 파악한 정보를 적고, 지정된 체크박스 포맷으로 상위 작업만 나열합니다
- **반드시** `docs/plan/plan-task-mgmt-kr.md`를 처음부터 끝까지 읽고, 그 문서에 기재된 지침을 계획 실행 전 과정에서 철저히 준수합니다
- **반드시 plan 모드에서 사용자 승인을 받아야 합니다:**
  - 상위 작업을 제시합니다
  - **사용자가 계획을 승인(Accept 버튼 클릭)하거나 "Go"라고 응답하기 전에는 진행하지 않습니다**
  - **승인 전에는 어떠한 추가 계획 작성이나 실행도 진행하지 않습니다**

### 4. 2단계 – 하위 작업 작성 (승인 후에만)
- 사용자가 계획을 승인하거나 "Go"라고 답하면 각 상위 작업을 실제 구현 단계로 세분화하여 하위 작업을 작성합니다
- 하위 작업을 정리할 때는 의미를 축약하거나 축소해서 표현하는 것이 금지되며, 작업 의도와 실행 과정을 깊이 이해할 수 있도록 최대한 자세히 서술해야 합니다
- 하위 작업을 정리하면서 추가로 필요한 파일이 있으면 "Relevant Files" 목록을 갱신합니다

### 5. 마무리 및 저장
- Markdown 파일에 "Relevant Files", "Notes", "Tasks" 헤더와 체크박스 구조가 정확히 포함되어 있는지 확인합니다
- 완성된 작업 파일은 `docs/plan/active/`에 유지하고, 완료되면 `docs/plan/complete/`로 **반드시** 이동해야 합니다

### 6. 상호작용 방식
- **상위 작업을 제시한 뒤 사용자가 명확히 계획을 승인하거나 "Go"라고 답하기 전에는 하위 작업 작성과 구현을 절대 시작하지 않습니다**
- 지시가 모호하거나 여러 방법이 있다면, 반드시 한국어로 사용자에게 선택지를 제안하고 의사결정을 받아야 합니다

---

## 📋 작업 목록 관리 프로토콜

DAIVE 프로젝트 진행 상황을 추적하기 위한 작업 목록 관리 가이드라인입니다.

### 작업 구현

#### 전체 작업 실행
- **사용자가 plan 모드에서 "Accept" 버튼을 클릭하거나 "yes", "y", "Go"라고 답하면**, 이는 현재 **모든 작업**에 대한 수락을 의미합니다
- **반드시 이 응답을 받기 전에는 어떤 작업도 진행하거나 세부 단계를 작성해서는 안 되며**, 승인 후에는 각 상위 작업이나 하위 작업마다 허가를 다시 요청하지 않고 모든 작업을 순차적으로 실행합니다

#### 의사결정 지점
구현 중 의사결정이 필요한 경우 (현재 계획의 문제점 발견, 복잡성 증가, 불확실성 증가 등):

1. **중지하고 사용자에게 선택 가능한 옵션을 제시합니다**
2. **각 옵션을 주니어 개발자에게 설명하듯이 설명합니다** (문맥과 함께 명확하고 간단한 용어 사용)
3. **진행하기 전에 사용자의 결정을 기다립니다**
4. **선택한 접근 방식을 주석이나 문서에 기록합니다**

#### 불확실성 프로토콜
구현 세부사항에 대해 확실하지 않은 경우:

1. **절대로 추측하거나 가정하지 마세요**
2. **웹 검색을 광범위하게 사용하여 정확한 정보를 수집합니다**
3. **모범 사례와 현재 표준을 조사합니다** (Electron, React, TypeScript, MobX)
4. **검증된 정보가 있을 때만 진행합니다**
5. **조사 후에도 여전히 불확실한 경우, 사용자에게 명확한 설명을 요청합니다**

#### 완료 프로토콜

**하위 작업 완료 시**:
1. **하위 작업**을 완료하면 **즉시** TodoWrite 도구로 해당 작업을 `completed`로 표시합니다

**상위 작업 완료 시** (모든 하위 작업이 completed가 되면):
2. 상위 작업 아래의 **모든** 하위 작업이 `completed`가 되면 다음 순서를 따릅니다:

   **a. 전체 테스트 실행**:
   ```bash
   pnpm lint                 # TypeScript lint 검사
   pnpm test:unit            # 유닛 테스트 실행
   pnpm build:dev            # 개발 빌드 (또는 pnpm build)
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
     git commit -m "feat: add Metrics Server support to UI" \
                -m "- Update PreferencesPage with Metrics Server selection" \
                -m "- Add Korean comments to metrics configuration" \
                -m "Related to Metrics System Enhancement"
     ```

3. **모든 하위 작업이 완료 표시되고 변경사항이 커밋되면 상위 작업을 완료로 표시합니다**

### 작업 목록 유지관리

#### 1. 작업하면서 작업 목록을 업데이트합니다
- 위 프로토콜에 따라 작업과 하위 작업을 완료(`completed`)로 표시합니다
- 새로 발생하는 작업을 추가합니다

#### 2. "Relevant Files" 섹션을 유지관리합니다
- 생성되거나 수정된 모든 파일을 나열합니다
- 각 파일에 대해 용도를 한 줄로 설명합니다

**예시**:
```markdown
## Relevant Files
- `packages/core/src/renderer/components/preferences/metrics-config.tsx` - Metrics 설정 UI 컴포넌트
- `packages/core/src/common/metrics/metrics-store.ts` - Metrics 상태 관리 Store
- `docs/ui-styling-guide.md` - UI 스타일 가이드 업데이트
```

### AI 지침 (Claude Code용)

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

9. **DAIVE 프로젝트 특화 주의사항**:
   - pnpm workspace 구조 이해 (packages/ vs freelens/)
   - @ogre-tools/injectable DI 패턴 준수
   - MobX state management 활용
   - 한국어 주석, 영어 코드 네이밍 원칙 준수

---

## 📝 문서 동기화 규칙

**중요**: 이 문서(CLAUDE-KR.md)와 CLAUDE.md는 동기화되어야 합니다.

### 동기화 원칙
1. **CLAUDE.md가 업데이트되면 CLAUDE-KR.md도 반드시 동시에 업데이트해야 합니다**
2. **CLAUDE-KR.md가 업데이트되면 CLAUDE.md도 반드시 동시에 업데이트해야 합니다**
3. 두 문서는 항상 내용이 일치해야 하며, 언어만 다릅니다
4. 코드 예제는 동일하게 유지하고, 주석과 설명만 번역합니다

### 업데이트 체크리스트
- [ ] CLAUDE.md 수정 시 → CLAUDE-KR.md도 동일 내용으로 업데이트
- [ ] CLAUDE-KR.md 수정 시 → CLAUDE.md도 동일 내용으로 업데이트
- [ ] 두 파일의 "마지막 업데이트" 날짜 동일하게 변경
- [ ] 두 파일의 "문서 버전" 동일하게 증가
- [ ] Git 커밋 시 두 파일 함께 커밋

---

# 중요 지침
- 요청받은 것만 수행하세요; 그 이상도 그 이하도 아님
- 항상 새 파일 생성보다 기존 파일 수정을 선호하세요
- 파일 탐색 전에 항상 `docs/claude-reference/` 디렉터리를 먼저 확인하세요
- 파일 수정 후 항상 위의 소스 코드 수정 프로세스를 따르세요
- 문서 업데이트, 커밋 메시지, 코드 주석에 항상 한국어를 사용하세요
- 새 함수 생성이나 중요한 코드 변경 시 항상 한국어 주석을 추가하세요
- 관련 코드 수정 시 항상 기존 한국어 주석을 업데이트하세요
- 문서 업데이트는 선택사항이 아니라 모든 변경사항에 필수입니다
- plan 모드와 작업 실행을 위해 항상 작업 목록 관리 프로토콜을 따르세요
- plan 모드에서 "Accept"/"Go" 승인을 받기 전에는 절대 구현을 진행하지 마세요
- 해결책에 불확실할 때는 항상 철저히 조사하세요 (최소 2회 웹 검색)
- 여러 유효한 접근법이 있을 때는 항상 사용자에게 옵션을 제시하세요

---

**마지막 업데이트**: 2025-10-10
**문서 버전**: 3.0
