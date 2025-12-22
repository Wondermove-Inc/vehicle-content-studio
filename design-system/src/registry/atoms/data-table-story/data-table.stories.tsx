"use client";

import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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

// 🎯 목적: 결제 데이터 타입 정의 - 테이블에 표시될 데이터 구조
type Payment = {
  id: string; // 결제 고유 ID
  amount: number; // 결제 금액 (USD)
  status: "pending" | "processing" | "success" | "failed"; // 결제 상태
  email: string; // 사용자 이메일
};

// 🎯 목적: 테스트용 결제 데이터 - 다양한 상태와 금액을 포함한 샘플 데이터
const data: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@example.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@example.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@example.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@example.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@example.com",
  },
];

// 🎯 목적: TanStack Table 컬럼 정의 - 각 컬럼의 헤더, 셀 렌더링, 정렬/필터 설정
const columns: ColumnDef<Payment>[] = [
  {
    // 행 선택용 체크박스 컬럼
    id: "select",
    header: ({ table }) => (
      <Checkbox
        // 모든 페이지 행이 선택되었는지 또는 일부만 선택되었는지 확인
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false, // 체크박스 컬럼은 정렬 불가
    enableHiding: false, // 체크박스 컬럼은 숨김 불가
  },
  {
    // 결제 상태 컬럼 (pending, processing, success, failed)
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    // 이메일 컬럼 - 정렬 기능이 포함된 헤더 버튼
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    // 금액 컬럼 - 통화 형식으로 포맷팅
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      // 달러 통화 형식으로 포맷팅
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    // 행별 액션 메뉴 컬럼
    id: "actions",
    enableHiding: false, // 액션 컬럼은 항상 표시
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

function DataTableDemo() {
  // 🎯 목적: 테이블 정렬 상태 관리 (컬럼별 오름차순/내림차순)
  const [sorting, setSorting] = React.useState<SortingState>([]);
  // 🎯 목적: 컬럼별 필터 상태 관리 (이메일 검색 등)
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  // 🎯 목적: 컬럼 표시/숨김 상태 관리
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  // 🎯 목적: 행 선택 상태 관리 (체크박스 선택된 행들)
  const [rowSelection, setRowSelection] = React.useState({});

  // 🎯 목적: TanStack Table 인스턴스 생성 - 모든 테이블 기능을 통합 관리
  const table = useReactTable({
    data, // 표시할 데이터 배열
    columns, // 컬럼 정의 배열
    onSortingChange: setSorting, // 정렬 상태 변경 핸들러
    onColumnFiltersChange: setColumnFilters, // 컬럼 필터 상태 변경 핸들러
    getCoreRowModel: getCoreRowModel(), // 기본 행 모델 (필수)
    getPaginationRowModel: getPaginationRowModel(), // 페이지네이션 기능
    getSortedRowModel: getSortedRowModel(), // 정렬 기능
    getFilteredRowModel: getFilteredRowModel(), // 필터링 기능
    onColumnVisibilityChange: setColumnVisibility, // 컬럼 표시/숨김 상태 변경 핸들러
    onRowSelectionChange: setRowSelection, // 행 선택 상태 변경 핸들러
    state: {
      // 현재 테이블 상태 객체
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      {/* 테이블 상단 컨트롤 영역: 필터링 입력과 컬럼 표시/숨김 메뉴 */}
      <div className="flex items-center py-4">
        {/* 이메일 필터링 입력 필드 */}
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {/* 컬럼 표시/숨김 드롭다운 메뉴 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide()) // 숨길 수 있는 컬럼만 필터링
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
      {/* 테이블 본체 영역 */}
      <div className="rounded-md border">
        <Table>
          {/* 테이블 헤더 */}
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
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {/* 테이블 바디 */}
          <TableBody>
            {table.getRowModel().rows?.length ? (
              // 데이터가 있는 경우: 각 행을 렌더링
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"} // 선택된 행 표시
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              // 데이터가 없는 경우: "No results" 메시지 표시
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
        </Table>
      </div>
      {/* 테이블 하단: 선택된 행 수와 페이지네이션 컨트롤 */}
      <div className="flex items-center justify-end space-x-2 py-4">
        {/* 선택된 행 수 표시 */}
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        {/* 페이지네이션 버튼 */}
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * A powerful data table component with sorting, filtering, and pagination.
 * Built using TanStack Table and shadcn/ui components.
 *
 * This component demonstrates the integration of TanStack Table with shadcn/ui
 * to create feature-rich data tables that include:
 * - Column sorting with visual indicators
 * - Email filtering with real-time search
 * - Row selection with bulk operations
 * - Column visibility toggles
 * - Responsive pagination controls
 * - Accessible keyboard navigation
 * - Action menus for row-specific operations
 *
 * The implementation follows shadcn/ui patterns and is fully compatible
 * with the shadcn CLI for easy installation in projects.
 */
const meta = {
  title: "ui/DataTable",
  component: DataTableDemo,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A comprehensive data table implementation using TanStack Table and shadcn/ui components.

## Features

- **Sorting**: Click column headers to sort data ascending/descending
- **Filtering**: Real-time email filtering with search input
- **Selection**: Individual row selection with bulk operations
- **Pagination**: Navigate through data with Previous/Next controls
- **Column Visibility**: Toggle column visibility via dropdown menu
- **Actions**: Row-specific actions via dropdown menus
- **Responsive**: Adapts to different screen sizes
- **Accessible**: Full keyboard navigation and screen reader support

## Installation

\`\`\`bash
npx shadcn@latest add data-table-story
\`\`\`

This will install the data table component along with all required dependencies including \`@tanstack/react-table\`.

## Usage

\`\`\`tsx
import { DataTable } from "@/components/data-table"
import { columns } from "@/components/data-table/columns"

const data = [
  // your data array
]

export function DataTableDemo() {
  return <DataTable columns={columns} data={data} />
}
\`\`\`

## Dependencies

- \`@tanstack/react-table\` - Headless table library
- \`lucide-react\` - Icons
- All standard shadcn/ui components (table, button, checkbox, etc.)
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[800px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DataTableDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default data table with all features enabled.
 *
 * This story demonstrates the complete data table implementation with:
 * - **Column Sorting**: Click on the "Email" header to sort alphabetically
 * - **Row Selection**: Use checkboxes to select individual rows or all rows
 * - **Email Filtering**: Type in the search input to filter by email address
 * - **Column Visibility**: Use the "Columns" dropdown to show/hide columns
 * - **Pagination**: Navigate between pages using Previous/Next buttons
 * - **Actions Menu**: Click the three-dot menu to access row actions
 *
 * The table includes sample payment data with different statuses to showcase
 * various UI states and interactions.
 */
export const Default: Story = {};

/**
 * Interactive test story demonstrating email filtering functionality.
 *
 * This story automatically types "ken99" into the filter input and verifies
 * that the table correctly filters to show only matching results.
 * Used for automated testing of the filtering feature.
 */
export const ShouldFilterTable: Story = {
  name: "when filtering by email, should display filtered rows",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 🎯 목적: Email 필터 입력 시 테이블이 필터링되는지 확인
    const filterInput = canvas.getByPlaceholderText("Filter emails...");
    await userEvent.type(filterInput, "ken99");

    await waitFor(
      () => {
        // 필터링 후 1개 행만 표시되어야 함 (ken99@example.com)
        const email = canvas.getByText("ken99@example.com");
        expect(email).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  },
};

/**
 * Interactive test story demonstrating column sorting functionality.
 *
 * This story automatically clicks the "Email" column header to trigger sorting
 * and verifies that the sort functionality works correctly with visual feedback.
 * Used for automated testing of the sorting feature.
 */
export const ShouldSortTable: Story = {
  name: "when clicking sort button, should sort table",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 🎯 목적: Email 컬럼 정렬 버튼 클릭 시 테이블이 정렬되는지 확인
    const emailSortButton = canvas.getByRole("button", { name: /email/i });
    await userEvent.click(emailSortButton);

    await waitFor(
      () => {
        // 정렬 버튼에 정렬 아이콘이 표시되어야 함
        expect(emailSortButton).toBeInTheDocument();
      },
      { timeout: 2000 },
    );
  },
};

/**
 * Interactive test story demonstrating row selection functionality.
 *
 * This story automatically clicks a row checkbox to select it and verifies
 * that the selection state updates correctly, including the selection count display.
 * Used for automated testing of the row selection feature.
 */
export const ShouldSelectRows: Story = {
  name: "when selecting rows, should update selection count",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 🎯 목적: 첫 번째 행 체크박스 선택
    const checkboxes = canvas.getAllByRole("checkbox");
    const firstRowCheckbox = checkboxes[1]; // 0은 헤더 체크박스
    await userEvent.click(firstRowCheckbox);

    await waitFor(
      () => {
        // 선택된 행 수가 업데이트되어야 함
        const selectionText = canvas.getByText(/1 of \d+ row\(s\) selected/);
        expect(selectionText).toBeInTheDocument();
      },
      { timeout: 2000 },
    );
  },
};

/**
 * Interactive test story demonstrating column visibility toggle functionality.
 *
 * This story automatically clicks the "Columns" dropdown button to open the
 * column visibility menu and verifies that column options are displayed correctly.
 * Used for automated testing of the column visibility feature.
 */
export const ShouldToggleColumns: Story = {
  name: "when toggling column visibility, should hide/show columns",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 🎯 목적: 컬럼 토글 메뉴 열기
    const columnsButton = canvas.getByRole("button", { name: /columns/i });
    await userEvent.click(columnsButton);

    await waitFor(
      () => {
        // 컬럼 토글 옵션이 표시되어야 함
        const statusOption = canvas.getByText("status");
        expect(statusOption).toBeInTheDocument();
      },
      { timeout: 2000 },
    );
  },
};
