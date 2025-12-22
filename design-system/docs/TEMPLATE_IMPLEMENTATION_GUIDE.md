# 템플릿 구현 가이드

템플릿을 shadcn/ui 컴포넌트로 구현하기 위한 체계적인 가이드입니다.

## 작업 프로세스

### 1단계: 유저 코드 분석
유저가 제공한 템플릿 코드에서 다음 요소들을 파악합니다:

#### 분석 대상
- **내용 (Content)**: 텍스트, 제목, 설명 등
- **아이콘 (Icons)**: 사용된 아이콘의 종류와 위치
- **Variant**: 버튼 스타일, 크기, 색상 등의 변형
- **레이아웃 구조**: 컴포넌트들의 배치와 관계
- **상호작용**: 클릭, 호버 등의 인터랙션

#### 분석 질문
- 어떤 UI 패턴인가? (카드, 폼, 대시보드, 네비게이션 등)
- 주요 컴포넌트는 무엇인가?
- 데이터 표시 방식은?
- 사용자 액션은 무엇인가?

### 2단계: shadcn/ui 컴포넌트 매핑

#### 사용 가능한 컴포넌트 목록
```typescript
// Layout & Structure
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { ScrollArea } from "@/components/ui/scroll-area"

// Navigation
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Input & Forms
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"

// Feedback & Display
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Data Display
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Overlays & Popups
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
```

#### 컴포넌트 선택 기준
1. **기능적 유사성**: 원본 코드의 기능과 가장 유사한 shadcn 컴포넌트
2. **의미론적 적절성**: HTML 시멘틱과 접근성 고려
3. **스타일 일관성**: shadcn 디자인 시스템과 조화
4. **확장성**: 향후 커스터마이징 가능성

### 3단계: shadcn 컴포넌트로 재구현

#### 구현 원칙
- **오직 shadcn/ui 컴포넌트만 사용**
- **유저 코드는 참조용으로만 활용**
- **내용, 아이콘, variant 정보만 추출**
- **구조와 스타일은 완전히 재작성**

#### 구현 템플릿
```typescript
import type { Meta, StoryObj } from "@storybook/react-vite";
import { [필요한 shadcn 컴포넌트들] } from "@/components/ui/[컴포넌트명]";
import { [필요한 아이콘들] } from "lucide-react";

/**
 * [템플릿 설명] - 용도와 사용 시나리오 설명
 */
const meta: Meta<typeof [메인컴포넌트]> = {
  title: "templates/[템플릿명]",
  component: [메인컴포넌트],
  tags: ["autodocs"],
  parameters: { layout: "centered" }, // 또는 "fullscreen"
} satisfies Meta<typeof [메인컴포넌트]>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 템플릿 구현
 */
export const Default: Story = {
  render: () => (
    // shadcn 컴포넌트로 구현된 템플릿
  )
};

/**
 * 변형 버전들 (필요시)
 */
export const [VariantName]: Story = {
  render: () => (
    // 다른 variant나 상태
  )
};
```

#### 주의사항
- **절대 경로 사용**: `@/components/ui/` 형식 필수
- **타입스크립트 엄격 모드**: 모든 props에 타입 지정
- **접근성 고려**: ARIA 속성과 키보드 네비게이션
- **반응형 디자인**: 모바일 우선 접근법

### 4단계: 하드코딩 검증

#### 검증 체크리스트

##### ✅ 허용되는 하드코딩
- **텍스트 내용**: 제목, 설명, 라벨 텍스트
- **샘플 데이터**: 데모용 데이터 (명확히 샘플임을 표시)
- **아이콘 선택**: 특정 아이콘 (lucide-react)
- **기본 variant**: 컴포넌트의 기본 스타일 설정

##### ❌ 금지되는 하드코딩
- **픽셀 단위 크기**: `width: 300px` 등 고정 크기
- **절대 색상 값**: `#ff0000`, `rgb(255,0,0)` 등
- **고정 여백/패딩**: 반응형이 아닌 고정 spacing
- **브레이크포인트**: 특정 화면 크기 가정
- **외부 URL**: 특정 이미지나 리소스 URL
- **하드코딩된 상태값**: 특정 상태에 고정된 컴포넌트

#### 검증 방법
1. **코드 리뷰**: 모든 하드코딩된 값 식별
2. **반응형 테스트**: 다양한 화면 크기에서 확인
3. **테마 테스트**: 라이트/다크 모드에서 확인
4. **데이터 변경 테스트**: 다른 내용으로 테스트

### 5단계: Registry 등록

#### registry.json 엔트리
```json
{
  "name": "[템플릿명]-template",
  "type": "registry:component", 
  "title": "[템플릿 제목]",
  "description": "[템플릿 설명]",
  "categories": ["templates"],
  "registryDependencies": ["[사용된 shadcn 컴포넌트들]"],
  "dependencies": ["lucide-react"],
  "files": [{
    "path": "src/registry/templates/[템플릿명]-template/[파일명].stories.tsx",
    "type": "registry:component"
  }]
}
```

#### 빌드 및 테스트
```bash
npm run registry:build
npm run lint
npm run type-check  
npm run storybook
```

## 자주 사용되는 패턴

### 대시보드 레이아웃
```typescript
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">제목</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">내용</div>
    </CardContent>
  </Card>
</div>
```

### 폼 레이아웃
```typescript
<Card className="w-full max-w-md">
  <CardHeader>
    <CardTitle>폼 제목</CardTitle>
    <CardDescription>설명</CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="field">라벨</Label>
      <Input id="field" placeholder="placeholder" />
    </div>
  </CardContent>
  <CardFooter>
    <Button className="w-full">제출</Button>
  </CardFooter>
</Card>
```

### 목록 아이템
```typescript
<div className="space-y-2">
  {items.map((item, index) => (
    <div key={index} className="flex items-center space-x-4 rounded-md border p-4">
      <Avatar>
        <AvatarImage src={item.avatar} />
        <AvatarFallback>{item.initials}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium">{item.name}</p>
        <p className="text-sm text-muted-foreground">{item.description}</p>
      </div>
      <Button variant="outline" size="sm">액션</Button>
    </div>
  ))}
</div>
```

## 품질 기준

### 코드 품질
- ESLint 오류 없음
- TypeScript 타입 오류 없음  
- 접근성 기본 요구사항 충족
- 반응형 디자인 구현

### 사용성
- 다양한 화면 크기에서 정상 동작
- 라이트/다크 테마 지원
- 키보드 네비게이션 지원
- 로딩 상태 및 에러 처리 (필요시)

### 문서화
- 컴포넌트별 JSDoc 주석
- Storybook controls 활용
- 사용 예시 제공
- 한국어 주석으로 설명 추가

---

**중요 참고사항**:
- 이 가이드는 shadcn Storybook Registry 프로젝트의 기존 아키텍처와 컨벤션을 따릅니다
- 모든 구현은 `src/registry/templates/` 디렉토리에 위치합니다
- registry.json 업데이트와 빌드 프로세스를 반드시 따라야 합니다