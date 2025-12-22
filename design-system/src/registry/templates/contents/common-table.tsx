"use client";

import React from "react";
import {
  Search,
  ChevronDown,
  EllipsisVertical,
  BadgeCheck,
  ChevronsRight,
  ExternalLink,
  ArrowUpDown,
  Pen,
  FolderSearch,
  SquareTerminal,
  History,
  Trash2,
  Box,
  File,
  RefreshCw,
  Play,
  Ruler,
  Download,
  ArrowUpToLine,
  OctagonPause,
  Plus,
} from "lucide-react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Item, ItemContent, ItemMedia } from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import { Typography } from "@/components/ui/typography";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

/**
 * 🎯 목적: CommonTable 테이블 행 데이터 타입 정의
 */
interface TableRowData {
  id: string;
  checked: boolean;
  column2: string;
  column3: string;
  column4: { text: string; href?: string };
  column5: {
    text: string;
    variant: "default" | "secondary" | "outline" | "verified";
  };
  column6: string;
  column7: boolean; // EllipsisVertical 아이콘 버튼 표시 여부
}

/**
 * 🎯 목적: 테이블 샘플 데이터 - UIDL 명세에 따른 6개 행 구성
 */
const tableData: TableRowData[] = [
  {
    id: "1",
    checked: false,
    column2: "Cell Text",
    column3: "Cell Text",
    column4: { text: "Link Button", href: "#" },
    column5: { text: "Badge", variant: "default" },
    column6: "Cell Text",
    column7: true,
  },
  {
    id: "2",
    checked: false,
    column2: "Cell Text",
    column3: "Cell Text",
    column4: { text: "Link Button", href: "#" },
    column5: { text: "Badge", variant: "secondary" },
    column6: "Cell Text",
    column7: true,
  },
  {
    id: "3",
    checked: false,
    column2: "Cell Text",
    column3: "Cell Text",
    column4: { text: "Link Button", href: "#" },
    column5: { text: "Verified", variant: "verified" },
    column6: "Cell Text",
    column7: true,
  },
  {
    id: "4",
    checked: false,
    column2: "Cell Text",
    column3: "Cell Text",
    column4: { text: "Link Button", href: "#" },
    column5: { text: "Badge", variant: "default" },
    column6: "Cell Text",
    column7: true,
  },
  {
    id: "5",
    checked: false,
    column2: "Cell Text",
    column3: "Cell Text",
    column4: { text: "Link Button", href: "#" },
    column5: { text: "Badge", variant: "secondary" },
    column6: "Cell Text",
    column7: true,
  },
  {
    id: "6",
    checked: false,
    column2: "Cell Text",
    column3: "Cell Text",
    column4: { text: "Link Button", href: "#" },
    column5: { text: "Verified", variant: "verified" },
    column6: "Cell Text",
    column7: true,
  },
];

/**
 * 🎯 목적: CommonTable 컴포넌트 Props 타입
 */
interface CommonTableProps {
  className?: string;
  showChart?: boolean; // 🎯 목적: 속성 패널에 차트 표시 여부
  contentType?: "default" | "install"; // 🎯 목적: 속성 패널 내용 타입 (Default 또는 Install)
}

/**
 * 🎯 목적: Kubernetes 리소스를 위한 공통 테이블 컴포넌트
 *
 * 구성 요소:
 * - 상단 메뉴 (메뉴명, 네임스페이스 드롭다운, 검색 입력)
 * - 7개 열을 가진 데이터 테이블
 * - 헤더 행 (Head Text 레이블)
 * - 6개 데이터 행 (텍스트, 링크, 뱃지, 액션 버튼 포함)
 */
export function CommonTable({
  className,
  showChart = false,
  contentType = "default",
}: CommonTableProps) {
  const [selectedNamespaces, setSelectedNamespaces] = React.useState<string[]>([
    "monitoring",
    "cilium-secrets",
    "kube-node-lease",
    "kube-public",
  ]);
  const [searchValue, setSearchValue] = React.useState("");
  const [data, setData] = React.useState(tableData);
  const [isPropertiesOpen, setIsPropertiesOpen] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [selectedRowData, setSelectedRowData] =
    React.useState<TableRowData | null>(null);
  const [selectedRowId, setSelectedRowId] = React.useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

  // 🎯 목적: 테이블 정렬 상태 관리
  const [sorting, setSorting] = React.useState<SortingState>([]);

  // 🎯 목적: 페이지네이션 관련 상태
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 40, // 기본 rows per page
  });

  // 🎯 목적: 차트 관련 상태 (showChart가 true일 때만 사용)
  const [selectedMetric, setSelectedMetric] = React.useState("cpu");

  // 🎯 목적: 전체 네임스페이스 목록 정의
  const allNamespaces = [
    "monitoring",
    "cilium-secrets",
    "kube-node-lease",
    "kube-public",
  ];

  /**
   * 🎯 목적: All Namespaces 체크 처리 함수
   */
  const handleAllNamespacesToggle = (checked: boolean) => {
    if (checked) {
      // 모든 네임스페이스 선택
      setSelectedNamespaces([...allNamespaces]);
    } else {
      // All Namespaces가 이미 선택된 상태에서 체크 해제 시도하면 무시 (체크 상태 유지)
      if (isAllNamespacesSelected) {
        return; // 아무것도 하지 않음
      }
      // 다른 경우에는 첫 번째 네임스페이스만 유지
      setSelectedNamespaces([allNamespaces[0]]);
    }
  };

  /**
   * 🎯 목적: 개별 네임스페이스 선택 처리 함수
   */
  const handleNamespaceToggle = (namespace: string) => {
    setSelectedNamespaces((prev) => {
      const isSelected = prev.includes(namespace);

      // All Namespaces가 선택된 상태에서 개별 네임스페이스 클릭 시
      if (isAllNamespacesSelected) {
        // 클릭한 네임스페이스만 선택
        return [namespace];
      }

      if (isSelected) {
        // 선택 해제 (최소 1개는 유지)
        return prev.length > 1 ? prev.filter((ns) => ns !== namespace) : prev;
      } else {
        // 선택 추가
        return [...prev, namespace];
      }
    });
  };

  /**
   * 🎯 목적: All Namespaces 체크 상태 계산
   */
  const isAllNamespacesSelected =
    selectedNamespaces.length === allNamespaces.length;

  /**
   * 🎯 목적: 선택된 네임스페이스 표시 텍스트 생성
   */
  const getNamespaceDisplayText = () => {
    if (isAllNamespacesSelected) {
      return "All Namespaces";
    }
    if (selectedNamespaces.length === 1) {
      return `Namespace: ${selectedNamespaces[0]}`;
    }
    return `${selectedNamespaces.length} Namespaces selected`;
  };

  /**
   * 🎯 목적: TanStack Table 컬럼 정의 - 정렬 기능이 포함된 헤더
   */
  const columns: ColumnDef<TableRowData>[] = [
    {
      id: "select",
      header: () => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={isIndeterminate ? "indeterminate" : isAllSelected}
            onCheckedChange={handleSelectAll}
            aria-label="전체 선택"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={row.original.checked}
            onCheckedChange={(checked) =>
              handleRowCheckChange(row.original.id, !!checked)
            }
            aria-label={`행 ${row.original.id} 선택`}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ),
      enableSorting: false,
      enableResizing: false,
      size: 64,
      minSize: 64,
      maxSize: 64,
    },
    {
      accessorKey: "column2",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Head Text
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <div className="px-3">{row.original.column2}</div>,
      size: 150,
      minSize: 100,
      maxSize: 300,
      enableResizing: true,
    },
    {
      accessorKey: "column3",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Head Text
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <div className="px-3">{row.original.column3}</div>,
      size: 150,
      minSize: 100,
      maxSize: 300,
      enableResizing: true,
    },
    {
      accessorKey: "column4",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Head Text
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="px-3">
          <Button variant="link" className="text-primary h-auto p-0">
            {row.original.column4.text}
          </Button>
        </div>
      ),
      sortingFn: (rowA, rowB) => {
        return rowA.original.column4.text.localeCompare(
          rowB.original.column4.text,
        );
      },
      size: 200,
      minSize: 120,
      maxSize: 350,
      enableResizing: true,
    },
    {
      accessorKey: "column5",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Head Text
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        const column5 = row.original.column5;
        return (
          <div className="px-3">
            {column5.variant === "verified" ? (
              <Badge
                variant="secondary"
                className="bg-blue-500 text-white dark:bg-blue-600"
              >
                <BadgeCheck className="h-3 w-3" />
                {column5.text}
              </Badge>
            ) : (
              <Badge
                variant={column5.variant as "default" | "secondary" | "outline"}
              >
                {column5.text}
              </Badge>
            )}
          </div>
        );
      },
      sortingFn: (rowA, rowB) => {
        return rowA.original.column5.text.localeCompare(
          rowB.original.column5.text,
        );
      },
      size: 180,
      minSize: 100,
      maxSize: 250,
      enableResizing: true,
    },
    {
      accessorKey: "column6",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Head Text
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <div className="px-3">{row.original.column6}</div>,
      size: 150,
      minSize: 100,
      maxSize: 300,
      enableResizing: true,
    },
    {
      id: "actions",
      header: () => <div className="text-right"></div>,
      cell: ({ row }) =>
        row.original.column7 && (
          <div className="text-right" onClick={(e) => e.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" aria-label="행 옵션">
                  <EllipsisVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[150px]" align="end">
                <DropdownMenuItem
                  onClick={() =>
                    console.log("Edit clicked for row", row.original.id)
                  }
                  className="relative pl-8"
                >
                  <Pen className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => console.log("Attach to Pod clicked")}
                  className="relative pl-8"
                >
                  <FolderSearch className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2" />
                  Attach to Pod
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => console.log("Pod Shell clicked")}
                  className="relative pl-8"
                >
                  <SquareTerminal className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2" />
                  Pod Shell
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => console.log("Pod Log clicked")}
                  className="relative pl-8"
                >
                  <History className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2" />
                  Pod Log
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => console.log("Set as Default clicked")}
                  className="relative pl-8"
                >
                  <Box className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2" />
                  Set as Default
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => console.log("Kubeconfig File clicked")}
                  className="relative pl-8"
                >
                  <File className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2" />
                  Kubeconfig File
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => console.log("Restart clicked")}
                  className="relative pl-8"
                >
                  <RefreshCw className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2" />
                  Restart
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => console.log("Trigger clicked")}
                  className="relative pl-8"
                >
                  <Play className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2" />
                  Trigger
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => console.log("Scale clicked")}
                  className="relative pl-8"
                >
                  <Ruler className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2" />
                  Scale
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => console.log("Upgrade clicked")}
                  className="relative pl-8"
                >
                  <ArrowUpToLine className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2" />
                  Upgrade
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => console.log("Suspend clicked")}
                  className="relative pl-8"
                >
                  <OctagonPause className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2" />
                  Suspend
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() =>
                    console.log("Delete clicked for row", row.original.id)
                  }
                  className="text-destructive relative pl-8"
                >
                  <Trash2 className="text-destructive absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
      enableSorting: false,
      enableResizing: false,
      size: 80,
      minSize: 80,
      maxSize: 80,
    },
  ];

  /**
   * 🎯 목적: TanStack Table 인스턴스 생성 - 정렬, 리사이징, 페이징 기능 포함
   */
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableColumnResizing: true,
    columnResizeMode: "onEnd",
    columnResizeDirection: "ltr",
    state: {
      sorting,
      pagination,
    },
  });

  // 🎯 목적: 차트 데이터 정의 (CPU/Memory 메트릭)
  const chartData = [
    { month: "Jan", usage: 200 },
    { month: "Feb", usage: 300 },
    { month: "Mar", usage: 250 },
    { month: "Apr", usage: 80 },
    { month: "May", usage: 200 },
    { month: "Jun", usage: 220 },
  ];

  // 🎯 목적: 차트 설정 (공식 shadcn/ui 스타일)
  const chartConfig = {
    usage: {
      label: selectedMetric === "cpu" ? "CPU Usage" : "Memory Usage",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  /**
   * 🎯 목적: 명시적 패널 닫기 함수 (닫기 버튼 클릭 시에만 사용)
   * 애니메이션 완료 후 실제 닫기 처리
   */
  const handleExplicitClose = () => {
    setIsAnimating(true);
    // 300ms 후 실제 닫기 (닫기 애니메이션 duration과 동일)
    setTimeout(() => {
      setIsPropertiesOpen(false);
      setIsAnimating(false);
      setSelectedRowData(null);
      setSelectedRowId(null);
    }, 300);
  };

  /**
   * 🎯 목적: Delete 버튼 클릭 시 AlertDialog 열기
   */
  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  /**
   * 🎯 목적: Delete 확인 시 실제 삭제 처리
   */
  const handleDeleteConfirm = () => {
    if (selectedRowData) {
      // 실제 삭제 로직 (현재는 콘솔 로그)
      console.log(`Deleting row: ${selectedRowData.id}`);
      // 데이터에서 해당 행 제거
      setData((prev) => prev.filter((row) => row.id !== selectedRowData.id));
    }
    setIsDeleteDialogOpen(false);
  };

  // 🎯 목적: 드롭다운 메뉴 항목들 정의 (함수 정의 이후에 배치)
  const dropdownMenuItems = [
    {
      id: "edit",
      label: "Edit",
      icon: Pen,
      action: () => console.log("Edit clicked"),
      destructive: false,
    },
    {
      id: "attach-pod",
      label: "Attach to Pod",
      icon: FolderSearch,
      action: () => console.log("Attach to Pod clicked"),
      destructive: false,
    },
    {
      id: "pod-shell",
      label: "Pod Shell",
      icon: SquareTerminal,
      action: () => console.log("Pod Shell clicked"),
      destructive: false,
    },
    {
      id: "pod-log",
      label: "Pod Log",
      icon: History,
      action: () => console.log("Pod Log clicked"),
      destructive: false,
    },
    {
      id: "set-default",
      label: "Set as Default",
      icon: Box,
      action: () => console.log("Set as Default clicked"),
      destructive: false,
    },
    {
      id: "kubeconfig-file",
      label: "Kubeconfig File",
      icon: File,
      action: () => console.log("Kubeconfig File clicked"),
      destructive: false,
    },
    {
      id: "restart",
      label: "Restart",
      icon: RefreshCw,
      action: () => console.log("Restart clicked"),
      destructive: false,
    },
    {
      id: "trigger",
      label: "Trigger",
      icon: Play,
      action: () => console.log("Trigger clicked"),
      destructive: false,
    },
    {
      id: "scale",
      label: "Scale",
      icon: Ruler,
      action: () => console.log("Scale clicked"),
      destructive: false,
    },
    {
      id: "upgrade",
      label: "Upgrade",
      icon: ArrowUpToLine,
      action: () => console.log("Upgrade clicked"),
      destructive: false,
    },
    {
      id: "suspend",
      label: "Suspend",
      icon: OctagonPause,
      action: () => console.log("Suspend clicked"),
      destructive: false,
    },
    { id: "separator", type: "separator" },
    {
      id: "delete",
      label: "Delete",
      icon: Trash2,
      action: handleDeleteClick,
      destructive: true,
    },
  ];

  /**
   * 🎯 목적: 개별 체크박스 상태 변경 처리
   */
  const handleRowCheckChange = (id: string, checked: boolean) => {
    setData((prev) =>
      prev.map((row) => (row.id === id ? { ...row, checked } : row)),
    );
  };

  /**
   * 🎯 목적: 전체 선택/해제 처리
   */
  const handleSelectAll = (checked: boolean) => {
    setData((prev) => prev.map((row) => ({ ...row, checked })));
  };

  /**
   * 🎯 목적: 현재 선택된 행 개수 계산
   */
  const selectedCount = data.filter((row) => row.checked).length;
  const isAllSelected = selectedCount === data.length;
  const isIndeterminate = selectedCount > 0 && selectedCount < data.length;

  /**
   * 🎯 목적: 테이블 행 클릭 시 속성창 열기/닫기 및 선택된 행 표시
   * - 새로운 행 클릭: 패널 열기 또는 데이터 업데이트
   * - 같은 행 재클릭: 패널 닫기 (토글 동작)
   */
  const handleRowClick = (e: React.MouseEvent, rowData: TableRowData) => {
    e.stopPropagation(); // 이벤트 전파 차단

    // 이미 선택된 행을 다시 클릭한 경우 패널 닫기
    if (isPropertiesOpen && selectedRowId === rowData.id) {
      handleExplicitClose();
      console.log("Panel closed by re-clicking selected row:", rowData.id);
      return;
    }

    // 패널이 이미 열려있고 다른 행을 클릭한 경우 데이터만 업데이트
    if (isPropertiesOpen) {
      setSelectedRowData(rowData);
      setSelectedRowId(rowData.id);
      console.log("Row data updated:", rowData);
      return;
    }

    // 패널이 닫혀있으면 데이터 설정 후 열기
    setSelectedRowData(rowData);
    setSelectedRowId(rowData.id);
    setIsPropertiesOpen(true);
    console.log("Panel opened with data:", rowData);
  };

  return (
    <div
      className={`relative flex h-screen w-full flex-col ${className || ""}`}
    >
      {/* 전체 콘텐츠 영역 - 640px 미만에서 우측 마진 유지 */}
      <div className="flex-1 p-5 pr-1 sm:pr-5">
        <div className="space-y-4">
          {/* 상단 메뉴 섹션 */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* 왼쪽: 메뉴 이름과 아이템 개수 */}
            <div className="flex items-center gap-1">
              <h2 className="text-foreground text-lg font-semibold">{`{Menuname}`}</h2>
              <span className="text-muted-foreground text-base font-light">
                ({data.length})
              </span>
            </div>

            {/* 오른쪽: 네임스페이스 드롭다운과 검색 */}
            <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
              {/* 네임스페이스 드롭다운 */}
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    variant="outline"
                    onClick={() => console.log("Dropdown trigger clicked")}
                    className="w-full max-w-none min-w-[180px] justify-between sm:w-auto"
                  >
                    {getNamespaceDisplayText()}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start">
                  <DropdownMenuCheckboxItem
                    checked={isAllNamespacesSelected}
                    onCheckedChange={handleAllNamespacesToggle}
                  >
                    All Namespaces
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={selectedNamespaces.includes("monitoring")}
                    onCheckedChange={() => {
                      console.log("Monitoring clicked");
                      handleNamespaceToggle("monitoring");
                    }}
                  >
                    monitoring
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedNamespaces.includes("cilium-secrets")}
                    onCheckedChange={() => {
                      console.log("cilium-secrets clicked");
                      handleNamespaceToggle("cilium-secrets");
                    }}
                  >
                    cilium-secrets
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedNamespaces.includes("kube-node-lease")}
                    onCheckedChange={() => {
                      console.log("kube-node-lease clicked");
                      handleNamespaceToggle("kube-node-lease");
                    }}
                  >
                    kube-node-lease
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedNamespaces.includes("kube-public")}
                    onCheckedChange={() => {
                      console.log("kube-public clicked");
                      handleNamespaceToggle("kube-public");
                    }}
                  >
                    kube-public
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* 검색 입력 */}
              <div className="relative min-w-0 flex-1 sm:w-[360px] sm:flex-none">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                <Input
                  placeholder="Search..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full min-w-[180px] pl-9"
                />
              </div>

              {/* Add 버튼 */}
              <Button className="gap-2 !px-4">
                <Plus className="h-4 w-4" />
                Add
              </Button>

              {/* Delete 버튼 - 체크된 row가 있을 때만 표시 */}
              {selectedCount > 0 && (
                <Button
                  variant="secondary"
                  className="text-destructive gap-2 !px-4"
                >
                  <Trash2 className="text-destructive h-4 w-4" />
                  Delete ({selectedCount})
                </Button>
              )}
            </div>
          </div>

          {/* 테이블 섹션 - TanStack Table 기반 정렬 가능한 테이블 */}
          <div className="relative w-full overflow-hidden rounded-md border">
            <table className="w-full caption-bottom border-collapse text-sm">
              <colgroup>
                <col
                  style={{ width: "64px", minWidth: "64px", maxWidth: "64px" }}
                />
              </colgroup>
              <TableHeader className="bg-muted [&_tr]:border-b-0">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="hover:bg-muted border-b"
                  >
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className={header.id === "actions" ? "text-right" : ""}
                        style={
                          header.id === "select"
                            ? {
                                width: "64px",
                                minWidth: "64px",
                                maxWidth: "64px",
                              }
                            : {
                                width: header.getSize(),
                              }
                        }
                      >
                        <div className="relative">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                          {header.column.getCanResize() && (
                            <div
                              onMouseDown={header.getResizeHandler()}
                              onTouchStart={header.getResizeHandler()}
                              className="border-border hover:border-primary absolute top-0 right-0 h-full w-1 cursor-col-resize touch-none border-r select-none"
                              style={{
                                transform: header.column.getIsResizing()
                                  ? "translateX(0.5px)"
                                  : "",
                              }}
                            />
                          )}
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => {
                    const isSelected = selectedRowId === row.original.id;
                    return (
                      <TableRow
                        key={row.id}
                        data-table-row
                        data-state={
                          row.getIsSelected() ? "selected" : undefined
                        }
                        className={`cursor-pointer transition-colors ${
                          isSelected ? "bg-muted/50" : "hover:bg-muted/50"
                        }`}
                        onClick={(e) => handleRowClick(e, row.original)}
                      >
                        {row.getVisibleCells().map((cell, cellIndex) => (
                          <TableCell
                            key={cell.id}
                            className="relative"
                            style={
                              cell.column.id === "select"
                                ? {
                                    width: "64px",
                                    minWidth: "64px",
                                    maxWidth: "64px",
                                  }
                                : undefined
                            }
                          >
                            {/* 첫 번째 셀에 선택 표시 indicator 추가 */}
                            {cellIndex === 0 && isSelected && (
                              <div className="bg-primary absolute top-0 left-0 h-full w-0.5" />
                            )}
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </table>
          </div>

          {/* 페이지네이션 컨트롤 - DataTable 스타일 */}
          <div className="flex items-center justify-between px-4">
            <div className="text-muted-foreground flex-1 text-sm">
              {selectedCount} of {table.getFilteredRowModel().rows.length}{" "}
              row(s) selected.
            </div>
            <div className="flex items-center space-x-6 lg:space-x-8">
              {/* Rows per page 선택 */}
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">Rows per page</p>
                <Select
                  value={`${table.getState().pagination.pageSize}`}
                  onValueChange={(value) => {
                    table.setPageSize(Number(value));
                  }}
                >
                  <SelectTrigger className="h-8 w-[70px]">
                    <SelectValue
                      placeholder={table.getState().pagination.pageSize}
                    />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 속성창 패널 - Sheet 대신 직접 구현 */}
      {(isPropertiesOpen || isAnimating) && (
        <div
          className={`bg-card fixed inset-y-0 right-0 z-50 flex h-full w-full flex-col border-l shadow-lg transition ease-in-out md:w-[700px] ${
            isAnimating
              ? "animate-out slide-out-to-right duration-300"
              : "animate-in slide-in-from-right duration-[400ms]"
          }`}
        >
          {/* 고정 헤더 영역 */}
          <div className="flex-shrink-0 p-5 pb-0">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Button
                  variant="secondary"
                  size="icon-sm"
                  onClick={handleExplicitClose}
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => console.log("Dropdown trigger clicked")}
                    >
                      <EllipsisVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuContent
                      className="z-[200] w-[150px]"
                      align="end"
                      sideOffset={8}
                      side="bottom"
                      avoidCollisions={true}
                      sticky="always"
                    >
                      {dropdownMenuItems.map((item) => {
                        if (item.type === "separator") {
                          return <DropdownMenuSeparator key={item.id} />;
                        }

                        const Icon = item.icon;
                        return (
                          <DropdownMenuItem
                            key={item.id}
                            onClick={item.action}
                            className={`relative pl-8 ${
                              item.destructive ? "text-destructive" : ""
                            }`}
                          >
                            {Icon && (
                              <Icon
                                className={`absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 ${
                                  item.destructive ? "text-destructive" : ""
                                }`}
                              />
                            )}
                            {item.label}
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenuPortal>
                </DropdownMenu>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground text-sm leading-5">
                  {`{Menuname}`}
                </span>
                <h2 className="text-lg font-semibold">
                  {selectedRowData
                    ? `${selectedRowData.column2} (Row ${selectedRowData.id})`
                    : "Properties"}
                </h2>
              </div>
            </div>
          </div>

          {/* 스크롤 가능한 콘텐츠 영역 */}
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {/* 🎯 목적: 차트 영역 (showChart가 true일 때만 표시) */}
            {showChart && (
              <div className="space-y-6">
                {/* 토글 그룹 (Figma 설정에 따른 shadcn/ui ToggleGroup) */}
                <div className="flex justify-center">
                  <ToggleGroup
                    type="single"
                    value={selectedMetric}
                    onValueChange={(value) => value && setSelectedMetric(value)}
                    variant="outline"
                    size="default"
                    className="w-full max-w-[280px]"
                  >
                    <ToggleGroupItem value="cpu" aria-label="CPU">
                      CPU
                    </ToggleGroupItem>
                    <ToggleGroupItem value="memory" aria-label="Memory">
                      Memory
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>

                {/* 차트 영역 */}
                <div className="h-[240px] w-full">
                  <ChartContainer
                    config={chartConfig}
                    className="h-full w-full"
                    style={{ width: "100%", height: "100%" }}
                  >
                    <AreaChart
                      accessibilityLayer
                      data={chartData}
                      margin={{
                        left: 0,
                        right: 0,
                        top: 5,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value.slice(0, 3)}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        width={40}
                      />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                      />
                      <Area
                        dataKey="usage"
                        type="step"
                        fill="var(--color-usage)"
                        fillOpacity={0.4}
                        stroke="var(--color-usage)"
                      />
                      <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                  </ChartContainer>
                </div>
              </div>
            )}

            {/* 🎯 목적: Install 전용 Item 컴포넌트 */}
            {contentType === "install" && (
              <div className="mb-2">
                <Item variant="outline" size="sm">
                  <ItemMedia>
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src="/placeholder-avatar.png"
                        alt="Package"
                      />
                      <AvatarFallback>PA</AvatarFallback>
                    </Avatar>
                  </ItemMedia>
                  <ItemContent>
                    <span className="text-sm font-medium">
                      The Alertmanager handles alerts sent by client
                      applications such as the Prometheus server.
                    </span>
                  </ItemContent>
                  <Button>
                    <Download className="h-4 w-4" />
                    Install
                  </Button>
                </Item>
              </div>
            )}

            {/* 🎯 목적: 속성 테이블 - contentType에 따라 다른 내용 표시 */}
            <Table>
              <TableBody>
                {contentType === "install" ? (
                  // Install 전용 테이블 내용 - UIDL 명세 기반
                  <>
                    <TableRow>
                      <TableCell className="border-border border-b px-3 py-[14px]">
                        <span className="text-foreground text-sm">Version</span>
                      </TableCell>
                      <TableCell className="border-border border-b px-2 py-[6px]">
                        <Select defaultValue="1.28.0">
                          <SelectTrigger className="h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1.28.0">1.28.0</SelectItem>
                            <SelectItem value="1.27.5">1.27.5</SelectItem>
                            <SelectItem value="1.26.8">1.26.8</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border-border border-b px-3 py-[14px]">
                        <span className="text-foreground text-sm">Home</span>
                      </TableCell>
                      <TableCell className="border-border border-b px-2 py-2">
                        <Button
                          variant="ghost"
                          className="text-foreground/80 hover:text-foreground h-8 px-0 text-sm font-medium underline"
                        >
                          https://prometheus.io/
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border-border border-b px-3 py-[14px]">
                        <span className="text-foreground text-sm">
                          Maintainers
                        </span>
                      </TableCell>
                      <TableCell className="border-border border-b px-3 py-[14px]">
                        <span className="text-foreground text-sm">
                          • monotek&lt;monotek23@gmail.com&gt;
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border-border border-b px-3 py-[14px]">
                        <span className="text-foreground text-sm">
                          Keywords
                        </span>
                      </TableCell>
                      <TableCell className="border-border border-b px-3 py-[14px]">
                        <Badge className="bg-primary text-primary-foreground border-0 text-xs font-semibold">
                          monitoring
                        </Badge>
                      </TableCell>
                    </TableRow>
                  </>
                ) : (
                  // Default 테이블 내용 (기존 내용)
                  <>
                    <TableRow>
                      <TableCell className="border-border border-b px-3 py-[14px]">
                        <span className="text-foreground text-sm">Created</span>
                      </TableCell>
                      <TableCell className="border-border border-b px-3 py-[14px]">
                        <span className="text-foreground text-sm">
                          19d 4h 36m ago (2025-10-01T09:24:39+09:00)
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border-border border-b px-3 py-[14px]">
                        <span className="text-foreground text-sm">Name</span>
                      </TableCell>
                      <TableCell className="border-border border-b px-3 py-[14px]">
                        <span className="text-foreground text-sm">
                          {selectedRowData
                            ? selectedRowData.column3
                            : "ciliumcidrgroups.cilium.io"}
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border-border border-b px-3 py-[14px]">
                        <span className="text-foreground text-sm">Labels</span>
                      </TableCell>
                      <TableCell className="border-border border-b px-3 py-[14px]">
                        <Badge
                          variant="outline"
                          className="bg-background border-border text-xs font-semibold"
                        >
                          {selectedRowData
                            ? `column5=${selectedRowData.column5.text}`
                            : "io.cilium.k8s.crd.schema.version=1.31.11"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border-border border-b px-3 py-[14px]">
                        <span className="text-foreground text-sm">
                          Annotations
                        </span>
                      </TableCell>
                      <TableCell className="border-border border-b px-3 py-[14px]">
                        <Badge
                          variant="outline"
                          className="bg-background border-border text-xs font-semibold"
                        >
                          freelens.app/resource-version=v1
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border-border border-b px-3 py-[14px]">
                        <span className="text-foreground text-sm">
                          Resource
                        </span>
                      </TableCell>
                      <TableCell className="border-border border-b px-3 py-2">
                        <Button
                          variant="ghost"
                          className="text-foreground/80 hover:text-foreground h-8 px-3 text-sm font-medium underline"
                        >
                          Ciliumendpoints
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border-border border-b px-3 py-[14px]">
                        <span className="text-foreground text-sm">
                          Conversion
                        </span>
                      </TableCell>
                      <TableCell className="border-border border-b px-3 py-1.5">
                        <Input
                          placeholder='{"strategy": "None"}'
                          className="text-muted-foreground bg-muted/50 h-9 font-mono text-sm"
                          readOnly
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border-border border-b px-3 py-[14px]">
                        <span className="text-foreground text-sm">
                          Conditions
                        </span>
                      </TableCell>
                      <TableCell className="border-border border-b px-3 py-[14px]">
                        <Badge className="bg-primary text-primary-foreground border-0 text-xs font-semibold">
                          NamesAccepted
                        </Badge>
                      </TableCell>
                    </TableRow>
                  </>
                )}
              </TableBody>
            </Table>

            {/* Install 전용 Documentation 섹션 또는 기본 Validation 섹션 */}
            {contentType === "install" ? (
              <div className="mt-8 flex w-full flex-col gap-5">
                {/* Overview 섹션 */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-base leading-none font-medium">
                    Overview
                  </h3>
                  <div className="flex items-center gap-1">
                    <span className="text-sm leading-none font-light">
                      As per
                    </span>
                    <Button
                      variant="ghost"
                      className="h-8 px-0 text-sm font-medium text-[#E5E5E5] underline underline-offset-4 hover:no-underline"
                    >
                      https://prometheus.io/documentation
                    </Button>
                  </div>
                  <Typography variant="blockquote" className="mt-0">
                    &quot;After all,&quot; he said, &quot;everyone enjoys a good
                    joke, so it&apos;s only fair that they should pay for the
                    privilege.&quot;
                  </Typography>
                </div>

                <Separator />

                {/* Prerequisites 섹션 */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-base leading-none font-medium">
                    Prerequisites
                  </h3>
                  <p className="text-sm leading-none font-light">
                    Kubernetes 1.14+
                  </p>
                </div>

                <Separator />

                {/* Usage 섹션 */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-base leading-none font-medium">Usage</h3>
                  <p className="text-sm leading-none font-light">
                    The chart is distributed as an{" "}
                    <span className="underline">OCI Artifact</span> as well as
                    via a traditional{" "}
                    <span className="underline">Helm Repository</span>.<br />
                    OCI Artifact:
                  </p>
                  <Typography variant="inlineCode">
                    oci://ghcr.io/prometheus-community/charts/alertmanager
                  </Typography>
                  <p className="text-sm leading-none font-light">
                    Helm Repository:
                  </p>
                  <Typography variant="inlineCode">
                    https://prometheus-community.github.io/helm-charts
                  </Typography>
                  <p className="text-sm leading-none font-light">
                    The installation instructions use the OCI registry. Refer to
                    the helm repo command documentation for information on
                    installing charts via the traditional repository.
                  </p>
                </div>

                <Separator />

                {/* Install Chart 섹션 */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-base leading-none font-medium">
                    Install Chart
                  </h3>
                  <div className="bg-muted/30 flex w-full flex-col items-center justify-center rounded-[10px] border p-4">
                    <div className="text-muted-foreground w-full text-left font-mono text-base leading-6">
                      helm install [RELEASE_NAME]
                      oci://ghcr.io/prometheus-community/charts/alertmanager
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-8 flex flex-col gap-4">
                <span className="text-foreground text-base leading-none font-medium">
                  Validation
                </span>
                <div className="bg-muted/30 flex w-full flex-col items-center justify-center rounded-[10px] border p-4">
                  <div className="text-muted-foreground w-full text-left font-mono text-base leading-6">
                    <div>
                      import &#123; Button &#125; from
                      &quot;@/components/ui/button&quot;
                    </div>
                    <br />
                    <br />
                    <div>
                      export function{" "}
                      <span className="font-bold">ButtonOutline</span>() &#123;
                    </div>
                    <div>
                      &nbsp;&nbsp;return &lt;Button
                      variant=&quot;outline&quot;&gt;Outline&lt;/Button&gt;
                    </div>
                    <div>&#125;</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 고정 푸터 영역 */}
          <div className="bg-card flex-shrink-0 p-4">
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={handleExplicitClose}>
                Cancel
              </Button>
              <Button disabled>Save</Button>
            </div>
          </div>
        </div>
      )}

      {/* 🎯 목적: Delete 확인 AlertDialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Resource</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedRowData?.column2}" (Row{" "}
              {selectedRowData?.id})? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
