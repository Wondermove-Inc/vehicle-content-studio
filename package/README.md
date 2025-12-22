# HMG Design System

- 최신 내용은 https://ict-designsystem-storybook.hmg-corp.io 스토리북 참조 바랍니다.

# previous content

## 개요

- Hyundai Motor Group Design System
- BO 와 FO 모두 사용할 수 있는 Design System

### BO

- HMG

### FO

- Hyundai
- Kia
- Genesis

## 진행 방향

### Phase 1

- mui, antd 를 Full By Pass 로 래핑하여 사용함
  - 우선적으론 mui 만 래핑해서 사용
- 추가적으로 theme 을 적용하여 디자인 시스템의 look & feel 을 맞춤
- 래핑된 내용으로 선 적용하여 기존 개발 시스템들이 추후에 적용가능한 상태로 만듬

```typescript
import Button from '@mui/material/Button';
-> import { Button } from '@hmg-fe/hmg-design-system';
```

### Phase 2 [TBD]

- 담당자를 지정하여서 실제 개발하고 문서화, StoryBook, 교육등 운영하는 전담 인력이 담당한다.

### Phase 3 [TBD]

- asset 단위가 아닌 시스템에서 자주 쓰는 합성 Component 를 요구 사항을 받아 진행

## 사용 방법

- 사내 nexus repo 를 사용해야 함

```typescript
registry=https://nexus.hmc.co.kr/repository/npm-group/
@hmg-fe:registry=https://nexus.hmc.co.kr/repository/npm-component-library/
```

- package.json 에 dependencies 로 추가

```shell
npm install @hmg-fe/hmg-design-system
```

## Mui ByPass 사용 방법

> 기본적으로 HMG Design System 은 mui 5.x.x 버전을 By Pass 로 지원합니다. <br/>
> 기존 `@mui/material` import 부분을 `@hmg-fe/hmg-design-system` 으로 변경합니다.

```typescript
// @mui/material
import Button from '@mui/material/Button';
-> import { Button } from '@hmg-fe/hmg-design-system';

// @mui/icons-material
import { Add } from '@mui/icons-material';
-> import { Add, Input, Radio } from '@hmg-fe/hmg-design-system/icons-material';

// @mui/x-date-pickers 무료 버전 only, 타입 제공 x
import { DesktopDatePicker } from '@mui/x-date-pickers';
-> import { DesktopDatePicker } from '@hmg-fe/hmg-design-system';

// @mui/x-tree-view 무료 버전 only, 타입 제공 x
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
-> import { SimpleTreeView, TreeItem } from '@hmg-fe/hmg-design-system';

// @mui/x-data-grid 무료 버전 only, 타입 제공 x
import { DataGrid } from '@mui/x-data-grid';
-> import { DataGrid } from '@hmg-fe/hmg-design-system';
```

## To Do List

- [x] 최초 인터페이스 정리 필요 (mui 를 감싸는 형태)
- [x] 기존 디자인 시스템과의 연동 방법 고민
- [x] html, css 마크업 기반 디자인 시스템 필요
- [x] figma token 으로 Style Dictionary 적용
- [x] Storybook 배포 웹사이트 도메인 필요 (사내 접속 도메인)
- [x] [피그마](<https://www.figma.com/file/KOm4ujoEMTA86wQoW89K3A/HMG_%EB%94%94%EC%9E%90%EC%9D%B8%EC%8B%9C%EC%8A%A4%ED%85%9C(PC%2FMo_Web)?node-id=0%3A1&mode=dev>) 에서 나온 디자인 시스템 적용 고민
- [x] [마크업](http://tm.pages.hivelab.co.kr/hmg-design-system-uio/@index.html) 에서 나온 디자인 시스템 적용 고민
