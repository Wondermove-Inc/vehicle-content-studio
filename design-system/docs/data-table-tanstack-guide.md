# TanStack Table + shadcn/ui 데이터 테이블 구현 가이드

이 문서는 TanStack React Table과 shadcn/ui를 결합하여 강력한 데이터 테이블을 구현하는 방법을 설명합니다.

## 목차

1. [개요](#개요)
2. [설치 및 설정](#설치-및-설정)
3. [기본 구현](#기본-구현)
4. [핵심 개념](#핵심-개념)
5. [고급 기능](#고급-기능)
6. [실제 사용 사례](#실제-사용-사례)
7. [성능 최적화](#성능-최적화)
8. [접근성](#접근성)
9. [자주 묻는 질문](#자주-묻는-질문)

## 개요

### TanStack Table이란?

TanStack Table(이전 React Table)은 React 애플리케이션을 위한 강력하고 유연한 테이블 라이브러리입니다.

**주요 특징:**
- **Headless UI**: 렌더링 로직과 상태 관리 분리
- **타입 안전성**: TypeScript 완전 지원
- **성능**: 가상화 및 지연 로딩 지원
- **기능**: 정렬, 필터링, 페이지네이션, 그룹화 등

### shadcn/ui와의 조합

shadcn/ui의 깔끔한 디자인 시스템과 TanStack Table의 강력한 기능을 결합하면:
- 일관된 UI/UX
- 접근성 준수
- 커스터마이징 용이성
- 모던한 디자인

## 설치 및 설정

### 1. 필수 패키지 설치

```bash
# shadcn/ui Table 컴포넌트 추가
npx shadcn@latest add table

# TanStack React Table 설치
npm install @tanstack/react-table

# 기타 필요한 shadcn/ui 컴포넌트들
npx shadcn@latest add button checkbox input dropdown-menu
```

### 2. 추가 의존성

```bash
# 아이콘 (선택사항)
npm install lucide-react

# 날짜 처리 (선택사항)
npm install date-fns
```

## 기본 구현

### 1. 데이터 타입 정의

```typescript
// types/payment.ts
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  createdAt: Date;
};
```

### 2. 컬럼 정의

```typescript
// components/data-table/columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Payment } from "./types";

export const columns: ColumnDef<Payment>[] = [
  // 🎯 목적: 행 선택을 위한 체크박스 컬럼
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="모든 행 선택"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="행 선택"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  
  // 🎯 목적: 상태 표시 컬럼
  {
    accessorKey: "status",
    header: "상태",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  
  // 🎯 목적: 정렬 가능한 이메일 컬럼
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          이메일
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  
  // 🎯 목적: 통화 형식으로 표시되는 금액 컬럼
  {
    accessorKey: "amount",
    header: () => <div className="text-right">금액</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("ko-KR", {
        style: "currency",
        currency: "KRW",
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  
  // 🎯 목적: 행별 액션 메뉴
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">메뉴 열기</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              결제 ID 복사
            </DropdownMenuItem>
            <DropdownMenuItem>고객 보기</DropdownMenuItem>
            <DropdownMenuItem>결제 상세</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
```

### 3. 데이터 테이블 컴포넌트

```typescript
// components/data-table/data-table.tsx
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  // 🎯 목적: 테이블 상태 관리
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  // 🎯 목적: TanStack Table 인스턴스 생성
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      {/* 🎯 목적: 필터 및 컬럼 가시성 제어 */}
      <div className="flex items-center py-4">
        <Input
          placeholder="이메일로 필터링..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              컬럼 <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* 🎯 목적: 테이블 렌더링 */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  결과가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* 🎯 목적: 페이지네이션 */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length}개 중{" "}
          {table.getFilteredRowModel().rows.length}개 행이 선택되었습니다.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            이전
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            다음
          </Button>
        </div>
      </div>
    </div>
  );
}
```

## 핵심 개념

### 1. Headless UI 패턴

TanStack Table은 **Headless UI** 패턴을 사용합니다:
- **로직과 UI 분리**: 테이블 상태 관리와 렌더링 로직이 분리됨
- **유연성**: 원하는 UI 라이브러리와 조합 가능
- **재사용성**: 동일한 로직을 다른 UI에서 재사용

### 2. 컬럼 정의

```typescript
// 기본 컬럼
{
  accessorKey: "email", // 데이터 접근 키
  header: "이메일",      // 헤더 텍스트
}

// 커스텀 셀 렌더링
{
  accessorKey: "amount",
  header: "금액",
  cell: ({ row }) => {
    const amount = parseFloat(row.getValue("amount"));
    return formatCurrency(amount);
  },
}

// 정렬 가능한 헤더
{
  accessorKey: "email",
  header: ({ column }) => (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      이메일 <ArrowUpDown />
    </Button>
  ),
}
```

### 3. 테이블 상태

```typescript
// 정렬 상태
const [sorting, setSorting] = useState<SortingState>([]);

// 필터 상태
const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

// 컬럼 가시성
const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

// 행 선택
const [rowSelection, setRowSelection] = useState({});
```

## 고급 기능

### 1. 전역 필터링

```typescript
// 전역 검색 기능
const [globalFilter, setGlobalFilter] = useState("");

const table = useReactTable({
  // ... 기타 설정
  onGlobalFilterChange: setGlobalFilter,
  getFilteredRowModel: getFilteredRowModel(),
  globalFilterFn: "includesString",
  state: {
    // ... 기타 상태
    globalFilter,
  },
});
```

### 2. 서버 사이드 페이지네이션

```typescript
interface ServerSideTableProps {
  data: Payment[];
  pageCount: number;
  loading: boolean;
  onPaginationChange: (pagination: PaginationState) => void;
  onSortingChange: (sorting: SortingState) => void;
}

function ServerSideTable({
  data,
  pageCount,
  loading,
  onPaginationChange,
  onSortingChange,
}: ServerSideTableProps) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  
  const table = useReactTable({
    data,
    columns,
    pageCount,
    manualPagination: true, // 서버 사이드 페이지네이션 활성화
    manualSorting: true,    // 서버 사이드 정렬 활성화
    onPaginationChange: (updater) => {
      const newPagination = typeof updater === 'function' 
        ? updater(pagination) 
        : updater;
      setPagination(newPagination);
      onPaginationChange(newPagination);
    },
    // ... 기타 설정
  });
  
  // 로딩 UI 처리
  if (loading) {
    return <div>로딩 중...</div>;
  }
  
  return <DataTable columns={columns} data={data} />;
}
```

### 3. 행 확장

```typescript
// 확장 가능한 행
const columns: ColumnDef<Payment>[] = [
  {
    id: "expander",
    header: () => null,
    cell: ({ row }) => {
      return row.getCanExpand() ? (
        <button
          {...{
            onClick: row.getToggleExpandedHandler(),
            style: { cursor: "pointer" },
          }}
        >
          {row.getIsExpanded() ? "👇" : "👉"}
        </button>
      ) : (
        "🔵"
      );
    },
  },
  // ... 기타 컬럼
];

// 서브 행 렌더링
{table.getRowModel().rows.map((row) => (
  <React.Fragment key={row.id}>
    <TableRow data-state={row.getIsSelected() && "selected"}>
      {/* 일반 셀들 */}
    </TableRow>
    {row.getIsExpanded() && (
      <TableRow>
        <TableCell colSpan={columns.length}>
          {/* 확장된 콘텐츠 */}
          <div className="p-4">
            <h4>상세 정보</h4>
            <pre>{JSON.stringify(row.original, null, 2)}</pre>
          </div>
        </TableCell>
      </TableRow>
    )}
  </React.Fragment>
))}
```

### 4. 다중 정렬

```typescript
// 다중 컬럼 정렬 활성화
const table = useReactTable({
  // ... 기타 설정
  enableMultiSort: true,
  // Ctrl/Cmd + 클릭으로 다중 정렬 가능
});
```

### 5. 컬럼 크기 조정

```typescript
// 컬럼 크기 조정 상태
const [columnSizing, setColumnSizing] = useState({});

const table = useReactTable({
  // ... 기타 설정
  onColumnSizingChange: setColumnSizing,
  columnResizeMode: "onChange",
  state: {
    // ... 기타 상태
    columnSizing,
  },
});

// 헤더에서 크기 조정 핸들 렌더링
<TableHead
  key={header.id}
  style={{ width: header.getSize() }}
>
  {/* 헤더 콘텐츠 */}
  <div
    {...{
      onMouseDown: header.getResizeHandler(),
      onTouchStart: header.getResizeHandler(),
      className: `resizer ${
        header.column.getIsResizing() ? "isResizing" : ""
      }`,
    }}
  />
</TableHead>
```

## 실제 사용 사례

### 1. 사용자 관리 테이블

```typescript
// types/user.ts
export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "moderator";
  status: "active" | "inactive" | "pending";
  lastLogin: Date;
  createdAt: Date;
};

// 사용자 테이블 컬럼
export const userColumns: ColumnDef<User>[] = [
  // 체크박스
  {
    id: "select",
    header: ({ table }) => (/* 전체 선택 체크박스 */),
    cell: ({ row }) => (/* 행 선택 체크박스 */),
  },
  
  // 사용자 이름 및 아바타
  {
    accessorKey: "name",
    header: "사용자",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              {user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
          </div>
        </div>
      );
    },
  },
  
  // 역할 배지
  {
    accessorKey: "role",
    header: "역할",
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      return (
        <Badge variant={role === "admin" ? "default" : "secondary"}>
          {role}
        </Badge>
      );
    },
  },
  
  // 상태 인디케이터
  {
    accessorKey: "status",
    header: "상태",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <div className="flex items-center space-x-2">
          <div 
            className={`h-2 w-2 rounded-full ${
              status === "active" ? "bg-green-500" : 
              status === "inactive" ? "bg-red-500" : "bg-yellow-500"
            }`} 
          />
          <span className="capitalize">{status}</span>
        </div>
      );
    },
  },
  
  // 마지막 로그인 (상대 시간)
  {
    accessorKey: "lastLogin",
    header: "마지막 로그인",
    cell: ({ row }) => {
      const lastLogin = row.getValue("lastLogin") as Date;
      return (
        <div className="text-sm">
          {formatDistanceToNow(lastLogin, { 
            addSuffix: true, 
            locale: ko 
          })}
        </div>
      );
    },
  },
];
```

### 2. 주문 관리 테이블

```typescript
// types/order.ts
export type Order = {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
  };
  items: OrderItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: Date;
  shippingAddress: Address;
};

// 주문 테이블 컬럼
export const orderColumns: ColumnDef<Order>[] = [
  // 주문 번호 (클릭 시 상세 페이지로)
  {
    accessorKey: "orderNumber",
    header: "주문 번호",
    cell: ({ row }) => {
      const orderNumber = row.getValue("orderNumber") as string;
      return (
        <Button variant="link" className="p-0 font-mono">
          {orderNumber}
        </Button>
      );
    },
  },
  
  // 고객 정보
  {
    accessorKey: "customer",
    header: "고객",
    cell: ({ row }) => {
      const customer = row.getValue("customer") as Order["customer"];
      return (
        <div>
          <div className="font-medium">{customer.name}</div>
          <div className="text-sm text-muted-foreground">{customer.email}</div>
        </div>
      );
    },
  },
  
  // 주문 총액
  {
    accessorKey: "total",
    header: () => <div className="text-right">총액</div>,
    cell: ({ row }) => {
      const total = row.getValue("total") as number;
      return (
        <div className="text-right font-medium">
          {new Intl.NumberFormat("ko-KR", {
            style: "currency",
            currency: "KRW",
          }).format(total)}
        </div>
      );
    },
  },
  
  // 상태 진행 표시기
  {
    accessorKey: "status",
    header: "상태",
    cell: ({ row }) => {
      const status = row.getValue("status") as Order["status"];
      const statusConfig = {
        pending: { label: "대기", color: "bg-yellow-500" },
        processing: { label: "처리중", color: "bg-blue-500" },
        shipped: { label: "배송중", color: "bg-purple-500" },
        delivered: { label: "배송완료", color: "bg-green-500" },
        cancelled: { label: "취소", color: "bg-red-500" },
      };
      
      return (
        <div className="flex items-center space-x-2">
          <div className={`h-2 w-2 rounded-full ${statusConfig[status].color}`} />
          <span>{statusConfig[status].label}</span>
        </div>
      );
    },
  },
];
```

### 3. 분석 및 리포트 테이블

```typescript
// types/analytics.ts
export type AnalyticsData = {
  date: Date;
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: number;
  conversions: number;
  revenue: number;
};

// 분석 테이블 컬럼
export const analyticsColumns: ColumnDef<AnalyticsData>[] = [
  // 날짜 (그룹화 가능)
  {
    accessorKey: "date",
    header: "날짜",
    cell: ({ row }) => {
      const date = row.getValue("date") as Date;
      return format(date, "yyyy-MM-dd", { locale: ko });
    },
  },
  
  // 페이지 뷰 (트렌드 표시)
  {
    accessorKey: "pageViews",
    header: () => <div className="text-right">페이지 뷰</div>,
    cell: ({ row }) => {
      const pageViews = row.getValue("pageViews") as number;
      return (
        <div className="text-right">
          <div className="font-medium">
            {pageViews.toLocaleString("ko-KR")}
          </div>
          {/* 간단한 트렌드 인디케이터 */}
          <div className="text-xs text-muted-foreground">
            ↗️ +12%
          </div>
        </div>
      );
    },
  },
  
  // 바운스율 (경고 색상)
  {
    accessorKey: "bounceRate",
    header: () => <div className="text-right">바운스율</div>,
    cell: ({ row }) => {
      const bounceRate = row.getValue("bounceRate") as number;
      const isHigh = bounceRate > 0.7;
      return (
        <div className={`text-right ${isHigh ? "text-red-600" : ""}`}>
          {(bounceRate * 100).toFixed(1)}%
        </div>
      );
    },
  },
  
  // 수익 (통화 형식)
  {
    accessorKey: "revenue",
    header: () => <div className="text-right">수익</div>,
    cell: ({ row }) => {
      const revenue = row.getValue("revenue") as number;
      return (
        <div className="text-right font-medium">
          {new Intl.NumberFormat("ko-KR", {
            style: "currency",
            currency: "KRW",
            notation: revenue > 1000000 ? "compact" : "standard",
          }).format(revenue)}
        </div>
      );
    },
  },
];
```

## 성능 최적화

### 1. 메모이제이션

```typescript
import { useMemo } from "react";

function OptimizedDataTable({ data }: { data: Payment[] }) {
  // 🎯 목적: 컬럼 정의 메모이제이션 (불필요한 리렌더링 방지)
  const columns = useMemo(() => paymentColumns, []);
  
  // 🎯 목적: 정렬된 데이터 메모이제이션
  const sortedData = useMemo(() => {
    return data.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }, [data]);
  
  return <DataTable columns={columns} data={sortedData} />;
}
```

### 2. 가상화 (Virtualization)

```typescript
import { useVirtualizer } from "@tanstack/react-virtual";

function VirtualizedTable({ data }: { data: Payment[] }) {
  const parentRef = useRef<HTMLDivElement>(null);
  
  // 🎯 목적: 대용량 데이터를 위한 가상화
  const virtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50, // 예상 행 높이
    overscan: 10, // 버퍼 행 수
  });
  
  return (
    <div ref={parentRef} className="h-[400px] overflow-auto">
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const row = table.getRowModel().rows[virtualItem.index];
          return (
            <div
              key={row.id}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              {/* 행 콘텐츠 렌더링 */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

### 3. 지연 로딩

```typescript
import { useInfiniteQuery } from "@tanstack/react-query";

function InfiniteScrollTable() {
  // 🎯 목적: 무한 스크롤을 위한 데이터 페칭
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["payments"],
    queryFn: ({ pageParam = 0 }) => fetchPayments(pageParam),
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });
  
  // 플래튼된 데이터
  const flatData = useMemo(
    () => data?.pages?.flatMap((page) => page.data) ?? [],
    [data]
  );
  
  // 스크롤 이벤트 처리
  const tableContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = tableContainerRef.current;
    if (!container) return;
    
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (
        scrollTop + clientHeight >= scrollHeight - 5 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };
    
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);
  
  return (
    <div ref={tableContainerRef} className="h-[600px] overflow-auto">
      <DataTable columns={columns} data={flatData} />
      {isFetchingNextPage && (
        <div className="flex justify-center p-4">
          <Spinner />
        </div>
      )}
    </div>
  );
}
```

## 접근성

### 1. ARIA 라벨링

```typescript
// 접근성을 고려한 컬럼 정의
export const accessibleColumns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="모든 행 선택"
        aria-describedby="select-all-description"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label={`${row.getValue("email")} 행 선택`}
      />
    ),
  },
  
  // 정렬 버튼에 접근성 정보 추가
  {
    accessorKey: "email",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          aria-label={`이메일 컬럼 ${
            isSorted === "asc" ? "내림차순" : 
            isSorted === "desc" ? "정렬 해제" : "오름차순"
          } 정렬`}
        >
          이메일
          <ArrowUpDown className="ml-2 h-4 w-4" aria-hidden="true" />
        </Button>
      );
    },
  },
];
```

### 2. 키보드 네비게이션

```typescript
function AccessibleDataTable({ columns, data }: DataTableProps) {
  const tableRef = useRef<HTMLTableElement>(null);
  
  // 🎯 목적: 키보드 네비게이션 지원
  const handleKeyDown = (event: React.KeyboardEvent) => {
    const { key, ctrlKey, metaKey } = event;
    
    // Ctrl/Cmd + A로 모든 행 선택
    if ((ctrlKey || metaKey) && key === "a") {
      event.preventDefault();
      table.toggleAllRowsSelected();
      return;
    }
    
    // 화살표 키로 셀 간 이동
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(key)) {
      event.preventDefault();
      // 포커스 이동 로직 구현
      handleArrowKeyNavigation(key);
    }
  };
  
  return (
    <Table 
      ref={tableRef}
      onKeyDown={handleKeyDown}
      role="grid"
      aria-label="결제 내역 테이블"
    >
      {/* 테이블 콘텐츠 */}
    </Table>
  );
}
```

### 3. 스크린 리더 지원

```typescript
// 상태 변경 시 스크린 리더에 알림
function AccessibleTable() {
  const [announcement, setAnnouncement] = useState("");
  
  // 정렬 변경 시 알림
  useEffect(() => {
    if (sorting.length > 0) {
      const sortInfo = sorting[0];
      setAnnouncement(
        `테이블이 ${sortInfo.id} 컬럼으로 ${
          sortInfo.desc ? "내림차순" : "오름차순"
        } 정렬되었습니다.`
      );
    }
  }, [sorting]);
  
  // 필터 변경 시 알림
  useEffect(() => {
    if (columnFilters.length > 0) {
      setAnnouncement(
        `${table.getFilteredRowModel().rows.length}개의 결과가 표시됩니다.`
      );
    }
  }, [columnFilters, table]);
  
  return (
    <>
      {/* 스크린 리더용 라이브 영역 */}
      <div 
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
      >
        {announcement}
      </div>
      
      <DataTable columns={columns} data={data} />
    </>
  );
}
```

## 자주 묻는 질문

### Q1: 테이블 성능이 느린 경우 어떻게 해야 하나요?

**A:** 다음 최적화 방법을 시도해보세요:

1. **메모이제이션 적용**:
   ```typescript
   const columns = useMemo(() => myColumns, []);
   const data = useMemo(() => myData, [myData]);
   ```

2. **가상화 사용** (1000+ 행의 경우):
   ```bash
   npm install @tanstack/react-virtual
   ```

3. **서버 사이드 페이지네이션** 사용:
   ```typescript
   const table = useReactTable({
     manualPagination: true,
     pageCount: Math.ceil(totalCount / pageSize),
   });
   ```

### Q2: 커스텀 필터를 어떻게 만들 수 있나요?

**A:** 커스텀 필터 함수를 정의하고 사용하세요:

```typescript
// 커스텀 필터 함수 정의
const dateRangeFilter: FilterFn<Payment> = (row, columnId, value) => {
  const date = row.getValue(columnId) as Date;
  const [start, end] = value as [Date, Date];
  return date >= start && date <= end;
};

// 컬럼에서 사용
{
  accessorKey: "createdAt",
  header: "생성일",
  filterFn: dateRangeFilter,
}
```

### Q3: 다중 테이블을 동기화하려면 어떻게 해야 하나요?

**A:** 상위 컴포넌트에서 상태를 관리하고 props로 전달하세요:

```typescript
function MultiTableView() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  
  return (
    <div className="grid grid-cols-2 gap-4">
      <DataTable 
        data={ordersData} 
        globalFilter={globalFilter}
        sorting={sorting}
        onSortingChange={setSorting}
      />
      <DataTable 
        data={paymentsData} 
        globalFilter={globalFilter}
        sorting={sorting}
        onSortingChange={setSorting}
      />
    </div>
  );
}
```

### Q4: 셀 편집 기능을 추가하려면?

**A:** 편집 가능한 셀 컴포넌트를 만들어 사용하세요:

```typescript
function EditableCell({ 
  value: initialValue, 
  row, 
  column, 
  table 
}: {
  value: any;
  row: Row<Payment>;
  column: Column<Payment>;
  table: Table<Payment>;
}) {
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);
  
  const onBlur = () => {
    // 값 저장 로직
    table.options.meta?.updateData(row.index, column.id, value);
    setIsEditing(false);
  };
  
  if (isEditing) {
    return (
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        autoFocus
      />
    );
  }
  
  return (
    <div onClick={() => setIsEditing(true)}>
      {value}
    </div>
  );
}
```

### Q5: 테이블 데이터를 Excel로 내보내려면?

**A:** 라이브러리를 사용하여 내보내기 기능을 구현하세요:

```bash
npm install xlsx
```

```typescript
import * as XLSX from 'xlsx';

function ExportButton({ table }: { table: Table<Payment> }) {
  const exportToExcel = () => {
    const data = table.getFilteredRowModel().rows.map(row => 
      row.getVisibleCells().reduce((acc, cell) => {
        acc[cell.column.columnDef.header as string] = cell.getValue();
        return acc;
      }, {} as Record<string, any>)
    );
    
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, "table-data.xlsx");
  };
  
  return (
    <Button onClick={exportToExcel}>
      Excel로 내보내기
    </Button>
  );
}
```

---

## 마무리

이 가이드를 통해 TanStack Table과 shadcn/ui를 결합한 강력한 데이터 테이블을 구현할 수 있습니다. 핵심은:

1. **Headless UI 패턴 이해**: 로직과 UI 분리
2. **점진적 개선**: 기본 기능부터 시작해서 필요에 따라 고급 기능 추가
3. **성능 고려**: 대용량 데이터를 다룰 때는 가상화나 서버 사이드 처리 고려
4. **접근성 준수**: 모든 사용자가 접근 가능한 테이블 구현

더 자세한 정보는 [TanStack Table 공식 문서](https://tanstack.com/table/v8)와 [shadcn/ui 공식 문서](https://ui.shadcn.com/)를 참조하세요.