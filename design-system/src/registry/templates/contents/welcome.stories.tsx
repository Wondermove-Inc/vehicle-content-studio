import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Welcome } from "./welcome";
import { Button } from "@/components/ui/button";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
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
} from "@/components/ui/alert-dialog";
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
} from "@/components/ui/item";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";
import {
  Plus,
  RefreshCcw,
  EllipsisVertical,
  CircleHelp,
  ArrowUpDown,
  Megaphone,
  Info,
  Settings,
  Trash2,
  MousePointer,
} from "lucide-react";
import { Area, AreaChart, Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * Welcome 콘텐츠 컴포넌트 - Kubernetes IDE 환경의 웰컴 페이지
 *
 * baseStructure의 contents 영역에 들어갈 웰컴 콘텐츠를 제공합니다.
 * 탭 네비게이션, 메인 제목, 액션 카드, 도움말 정보를 포함합니다.
 */
const meta: Meta<typeof Welcome> = {
  title: "templates/Contents/Welcome",
  component: Welcome,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Welcome>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 🎯 목적: 클러스터 테이블 행 데이터 타입 정의
 */
interface ClusterRowData {
  id: string;
  name: string;
  version: string;
  provider: string;
  podStatus: {
    running: number;
    pending: number;
    succeeded: number;
    failed: number;
    unknown: number;
  };
  cpuUsage: Array<{ time: string; usage: number }>;
  memoryUsage: Array<{ time: string; usage: number }>;
}

/**
 * Home 페이지 - Skuber+ AI Assistant의 메인 대시보드
 *
 * 클러스터 관리, kubeconfig 동기화, 클러스터 목록 테이블을 포함한 완전한 홈 화면입니다.
 */
export const Home: Story = {
  render: () => {
    // 🎯 목적: 클러스터 테이블 데이터 관리 (프로바이더 정보, Pod Status, CPU/Memory 시계열 포함)
    const clusters: ClusterRowData[] = [
      {
        id: "1",
        name: "AzurProd",
        version: "1.28",
        provider: "azure",
        podStatus: {
          running: 45,
          pending: 3,
          succeeded: 12,
          failed: 2,
          unknown: 1,
        },
        cpuUsage: [
          { time: "00:00", usage: 45 },
          { time: "04:00", usage: 52 },
          { time: "08:00", usage: 48 },
          { time: "12:00", usage: 65 },
          { time: "16:00", usage: 58 },
          { time: "20:00", usage: 62 },
        ],
        memoryUsage: [
          { time: "00:00", usage: 72 },
          { time: "04:00", usage: 75 },
          { time: "08:00", usage: 78 },
          { time: "12:00", usage: 82 },
          { time: "16:00", usage: 79 },
          { time: "20:00", usage: 76 },
        ],
      },
      {
        id: "2",
        name: "GcloudStage",
        version: "1.27",
        provider: "gcp",
        podStatus: {
          running: 32,
          pending: 5,
          succeeded: 8,
          failed: 1,
          unknown: 2,
        },
        cpuUsage: [
          { time: "00:00", usage: 35 },
          { time: "04:00", usage: 42 },
          { time: "08:00", usage: 38 },
          { time: "12:00", usage: 55 },
          { time: "16:00", usage: 48 },
          { time: "20:00", usage: 45 },
        ],
        memoryUsage: [
          { time: "00:00", usage: 62 },
          { time: "04:00", usage: 65 },
          { time: "08:00", usage: 68 },
          { time: "12:00", usage: 72 },
          { time: "16:00", usage: 69 },
          { time: "20:00", usage: 66 },
        ],
      },
      {
        id: "3",
        name: "OpenShift",
        version: "1.26",
        provider: "openshift",
        podStatus: {
          running: 28,
          pending: 2,
          succeeded: 15,
          failed: 0,
          unknown: 0,
        },
        cpuUsage: [
          { time: "00:00", usage: 25 },
          { time: "04:00", usage: 32 },
          { time: "08:00", usage: 28 },
          { time: "12:00", usage: 45 },
          { time: "16:00", usage: 38 },
          { time: "20:00", usage: 35 },
        ],
        memoryUsage: [
          { time: "00:00", usage: 52 },
          { time: "04:00", usage: 55 },
          { time: "08:00", usage: 58 },
          { time: "12:00", usage: 62 },
          { time: "16:00", usage: 59 },
          { time: "20:00", usage: 56 },
        ],
      },
      {
        id: "4",
        name: "DigitalOceanddlMetrics Co",
        version: "1.25",
        provider: "digitalocean",
        podStatus: {
          running: 18,
          pending: 8,
          succeeded: 6,
          failed: 2,
          unknown: 3,
        },
        cpuUsage: [
          { time: "00:00", usage: 55 },
          { time: "04:00", usage: 62 },
          { time: "08:00", usage: 58 },
          { time: "12:00", usage: 75 },
          { time: "16:00", usage: 68 },
          { time: "20:00", usage: 65 },
        ],
        memoryUsage: [
          { time: "00:00", usage: 82 },
          { time: "04:00", usage: 85 },
          { time: "08:00", usage: 88 },
          { time: "12:00", usage: 92 },
          { time: "16:00", usage: 89 },
          { time: "20:00", usage: 86 },
        ],
      },
      {
        id: "5",
        name: "IBM Cloud Development",
        version: "1.29",
        provider: "ibm",
        podStatus: {
          running: 52,
          pending: 1,
          succeeded: 20,
          failed: 0,
          unknown: 1,
        },
        cpuUsage: [
          { time: "00:00", usage: 65 },
          { time: "04:00", usage: 72 },
          { time: "08:00", usage: 68 },
          { time: "12:00", usage: 85 },
          { time: "16:00", usage: 78 },
          { time: "20:00", usage: 75 },
        ],
        memoryUsage: [
          { time: "00:00", usage: 88 },
          { time: "04:00", usage: 92 },
          { time: "08:00", usage: 90 },
          { time: "12:00", usage: 95 },
          { time: "16:00", usage: 93 },
          { time: "20:00", usage: 91 },
        ],
      },
    ];

    // 🎯 목적: TanStack Table 정렬 상태 관리
    const [sorting, setSorting] = React.useState<SortingState>([]);

    // 🎯 목적: 페이지네이션 상태 관리
    const [pagination, setPagination] = React.useState({
      pageIndex: 0,
      pageSize: 10,
    });

    // 🎯 목적: 각 클라우드 프로바이더별 로고 이미지 렌더링
    const getProviderLogo = React.useCallback((provider: string) => {
      const logoConfig: Record<string, { image: string; alt: string }> = {
        azure: { image: "/images/apps/azure.png", alt: "Microsoft Azure" },
        gcp: {
          image: "/images/apps/google-cloud.png",
          alt: "Google Cloud Platform",
        },
        openshift: { image: "/images/apps/openshift.png", alt: "OpenShift" },
        digitalocean: {
          image: "/images/apps/digital-ocean.png",
          alt: "DigitalOcean",
        },
        ibm: { image: "/images/apps/ibm-cloud.png", alt: "IBM Cloud" },
      };

      const config = logoConfig[provider] || {
        image: "",
        alt: "Unknown Provider",
      };

      return (
        <div
          className="flex h-9 w-9 items-center justify-center"
          style={{ filter: "grayscale(100%)" }}
        >
          {config.image ? (
            <img
              src={config.image}
              alt={config.alt}
              className="h-full w-full object-contain"
            />
          ) : (
            <span className="text-foreground text-xs font-bold">?</span>
          )}
        </div>
      );
    }, []);

    // 🎯 목적: TanStack Table 컬럼 정의 (정렬 가능한 컬럼 포함)
    const columns = React.useMemo<ColumnDef<ClusterRowData>[]>(
      () => [
        {
          id: "provider",
          accessorKey: "provider",
          header: () => (
            <div className="flex items-center justify-center">Clusters</div>
          ),
          cell: ({ row }) => (
            <div className="flex items-center justify-center">
              {getProviderLogo(row.original.provider)}
            </div>
          ),
          enableSorting: false,
        },
        {
          id: "name",
          accessorKey: "name",
          header: "Display Name",
          cell: ({ row }) => <div className="text-sm">{row.original.name}</div>,
          enableSorting: false,
        },
        {
          id: "version",
          accessorKey: "version",
          header: ({ column }) => (
            <Button
              variant="ghost"
              className="px-2"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Version
              <ArrowUpDown />
            </Button>
          ),
          cell: ({ row }) => (
            <div className="px-3 text-sm">{row.original.version}</div>
          ),
        },
        {
          id: "cpuUsage",
          accessorFn: (row) =>
            row.cpuUsage[row.cpuUsage.length - 1]?.usage || 0,
          header: ({ column }) => (
            <Button
              variant="ghost"
              className="px-2"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              CPU Usg.
              <ArrowUpDown />
            </Button>
          ),
          cell: ({ row }) => (
            <div className="px-3">
              <CPUUsageChart data={row.original.cpuUsage} />
            </div>
          ),
        },
        {
          id: "memoryUsage",
          accessorFn: (row) =>
            row.memoryUsage[row.memoryUsage.length - 1]?.usage || 0,
          header: ({ column }) => (
            <Button
              variant="ghost"
              className="px-2"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Mem Usg.
              <ArrowUpDown />
            </Button>
          ),
          cell: ({ row }) => (
            <div className="px-3">
              <MemoryUsageChart data={row.original.memoryUsage} />
            </div>
          ),
        },
        {
          id: "podStatus",
          accessorFn: (row) =>
            row.podStatus.running +
            row.podStatus.pending +
            row.podStatus.succeeded +
            row.podStatus.failed +
            row.podStatus.unknown,
          header: "Pods Status",
          cell: ({ row }) => (
            <div className="relative overflow-visible">
              <PodStatusChart podStatus={row.original.podStatus} />
            </div>
          ),
          enableSorting: false,
        },
        {
          id: "setting",
          header: () => <div className="text-right"></div>,
          cell: () => {
            // 🎯 목적: AlertDialog 상태 관리
            const [alertOpen, setAlertOpen] = React.useState(false);

            return (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-lg p-2"
                    >
                      <EllipsisVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        window.top!.location.href =
                          "/?path=/story/templates-settings--cluster-settings";
                      }}
                    >
                      <Settings className="h-4 w-4" />
                      Cluster Setting
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => setAlertOpen(true)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to delete this cluster?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the cluster and all related data.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-destructive hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 text-white"
                        onClick={() => {
                          // 🎯 목적: 클러스터 삭제 로직 (실제 구현 시 추가)
                          console.log("Cluster deleted");
                        }}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            );
          },
          enableSorting: false,
        },
      ],
      [getProviderLogo],
    );

    // 🎯 목적: TanStack Table 인스턴스 생성
    const table = useReactTable({
      data: clusters,
      columns,
      state: {
        sorting,
        pagination,
      },
      onSortingChange: setSorting,
      onPaginationChange: setPagination,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      autoResetPageIndex: false,
    });

    const tableContainerRef = React.useRef<HTMLDivElement | null>(null);
    const cpuHeaderRef = React.useRef<HTMLTableCellElement | null>(null);
    const memoryHeaderRef = React.useRef<HTMLTableCellElement | null>(null);
    const [overlayPosition, setOverlayPosition] = React.useState<{
      left: number;
      width: number;
      top: number;
      height: number;
    }>({
      left: 0,
      width: 0,
      top: 0,
      height: 0,
    });

    React.useLayoutEffect(() => {
      const updateOverlayPosition = () => {
        const container = tableContainerRef.current;
        const cpuHeader = cpuHeaderRef.current;
        const memHeader = memoryHeaderRef.current;

        if (!container || !cpuHeader || !memHeader) {
          return;
        }

        const containerRect = container.getBoundingClientRect();
        const cpuRect = cpuHeader.getBoundingClientRect();
        const memRect = memHeader.getBoundingClientRect();

        const tbody = container.querySelector("tbody");
        const tbodyRect = tbody?.getBoundingClientRect();

        const left = cpuRect.left - containerRect.left;
        const width = memRect.right - cpuRect.left;
        const top = tbodyRect
          ? tbodyRect.top - containerRect.top
          : cpuRect.bottom - containerRect.top;
        const height = tbodyRect
          ? tbodyRect.height
          : containerRect.height - top;

        setOverlayPosition({
          left,
          width,
          top,
          height,
        });
      };

      updateOverlayPosition();
      window.addEventListener("resize", updateOverlayPosition);

      return () => {
        window.removeEventListener("resize", updateOverlayPosition);
      };
    }, []);

    // 🎯 목적: Pod Status를 가로 stacked bar chart로 시각화 (ChartContainer 기반)
    const PodStatusChart = ({
      podStatus,
    }: {
      podStatus: ClusterRowData["podStatus"];
    }) => {
      // 🎯 목적: 차트 데이터 (실제 Pod 수 저장, stackOffset="expand"로 비율 렌더링)
      const chartData = [
        {
          pods: "status",
          running: podStatus.running,
          pending: podStatus.pending,
          succeeded: podStatus.succeeded,
          failed: podStatus.failed,
          unknown: podStatus.unknown,
        },
      ];

      // 🎯 목적: 전체 Pod 수 계산 (오른쪽 표시용)
      const total =
        podStatus.running +
        podStatus.pending +
        podStatus.succeeded +
        podStatus.failed +
        podStatus.unknown;

      // 🎯 목적: Chart 색상 설정 (왼쪽부터 chart-5 > chart-4 > chart-3 > chart-2 > chart-1)
      const chartConfig = {
        running: {
          label: "Running",
          color: "var(--chart-5)", // Chart color 5 - Pod 실행 중
        },
        succeeded: {
          label: "Succeeded",
          color: "var(--chart-4)", // Chart color 4 - Pod 성공 완료
        },
        pending: {
          label: "Pending",
          color: "var(--chart-3)", // Chart color 3 - Pod 대기 중
        },
        failed: {
          label: "Failed",
          color: "var(--chart-2)", // Chart color 2 - Pod 실패
        },
        unknown: {
          label: "Unknown",
          color: "var(--chart-1)", // Chart color 1 - Pod 상태 알 수 없음
        },
      } satisfies ChartConfig;

      return (
        <div className="flex h-8 w-full items-center gap-2">
          {/* 가로 Stacked Bar Chart */}
          <div className="h-full flex-1 overflow-visible rounded">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                barSize={20}
                stackOffset="expand"
              >
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="pods" hide />
                <ChartTooltip
                  content={(props: any) => {
                    // 🎯 목적: Tooltip 항목을 running > succeeded > pending > failed > unknown 순서로 정렬
                    const order = [
                      "running",
                      "succeeded",
                      "pending",
                      "failed",
                      "unknown",
                    ];
                    const sortedPayload = props.payload?.sort(
                      (a: any, b: any) => {
                        const aIndex = order.indexOf(a.dataKey as string);
                        const bIndex = order.indexOf(b.dataKey as string);
                        return aIndex - bIndex;
                      },
                    );
                    return (
                      <ChartTooltipContent
                        {...props}
                        payload={sortedPayload}
                        hideLabel
                      />
                    );
                  }}
                  cursor={false}
                  wrapperStyle={{
                    zIndex: 10000,
                  }}
                />
                <Bar
                  dataKey="running"
                  stackId="stack"
                  fill="var(--color-running)"
                  radius={[4, 0, 0, 4]}
                />
                <Bar
                  dataKey="succeeded"
                  stackId="stack"
                  fill="var(--color-succeeded)"
                />
                <Bar
                  dataKey="pending"
                  stackId="stack"
                  fill="var(--color-pending)"
                />
                <Bar
                  dataKey="failed"
                  stackId="stack"
                  fill="var(--color-failed)"
                />
                <Bar
                  dataKey="unknown"
                  stackId="stack"
                  fill="var(--color-unknown)"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ChartContainer>
          </div>

          {/* 전체 Pod 수 표시 */}
          <span className="text-muted-foreground text-xs font-medium">
            {total}
          </span>
        </div>
      );
    };

    // 🎯 목적: CPU 사용량을 Area chart gradient로 시각화 (dimmed - 준비 중)
    const CPUUsageChart = ({
      data,
    }: {
      data: Array<{ time: string; usage: number }>;
    }) => {
      const chartConfig = {
        usage: {
          label: "CPU",
          color: "var(--chart-1)",
        },
      } satisfies ChartConfig;

      return (
        <div className="h-8 w-full opacity-20">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <AreaChart
              data={data}
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            >
              <defs>
                <linearGradient id="fillCPU" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-usage)"
                    stopOpacity={0.5}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-usage)"
                    stopOpacity={0.05}
                  />
                </linearGradient>
              </defs>
              <Area
                dataKey="usage"
                type="natural"
                fill="url(#fillCPU)"
                fillOpacity={0.2}
                stroke="var(--color-usage)"
                strokeWidth={1}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      );
    };

    // 🎯 목적: Memory 사용량을 Area chart gradient로 시각화 (dimmed - 준비 중)
    const MemoryUsageChart = ({
      data,
    }: {
      data: Array<{ time: string; usage: number }>;
    }) => {
      const chartConfig = {
        usage: {
          label: "Memory",
          color: "var(--chart-2)",
        },
      } satisfies ChartConfig;

      return (
        <div className="h-8 w-full opacity-20">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <AreaChart
              data={data}
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            >
              <defs>
                <linearGradient id="fillMemory" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-usage)"
                    stopOpacity={0.5}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-usage)"
                    stopOpacity={0.05}
                  />
                </linearGradient>
              </defs>
              <Area
                dataKey="usage"
                type="natural"
                fill="url(#fillMemory)"
                fillOpacity={0.2}
                stroke="var(--color-usage)"
                strokeWidth={1}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      );
    };

    return (
      <div className="bg-background flex h-screen w-full flex-col items-center overflow-auto p-5 pt-28">
        <div className="flex w-full max-w-[1280px] flex-col items-start gap-10">
          {/* 로고 및 타이틀 섹션 */}
          <div className="flex items-center gap-3">
            {/* 로고 심볼 */}
            <div className="relative h-12 w-12 flex-shrink-0">
              <div className="absolute top-0 left-0 h-12 w-12">
                {/* 배경 원 */}
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="24" cy="24" r="24" fill="#125AED" />
                  <circle
                    cx="24"
                    cy="24"
                    r="24"
                    fill="white"
                    fillOpacity="0.05"
                  />
                </svg>
                {/* 로고 아이콘 */}
                <svg
                  className="absolute top-[4.5px] left-[4.5px]"
                  width="39"
                  height="39"
                  viewBox="0 0 39 39"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.4274 0C8.69355 0 0 8.70161 0 19.4274C0 30.1532 8.70161 38.8548 19.4274 38.8548C30.1532 38.8548 38.8548 30.1532 38.8548 19.4274C38.8548 8.70161 30.1613 0 19.4274 0ZM28.3226 17L21.8548 10.5323L24.1935 8.19355C25.9758 6.41129 28.871 6.41129 30.6613 8.19355C32.4435 9.97581 32.4435 12.871 30.6613 14.6613L28.3226 17ZM30.6613 24.1855C32.4435 25.9677 32.4435 28.8629 30.6613 30.6532C28.879 32.4355 25.9839 32.4355 24.1935 30.6532L21.8548 28.3145L28.3226 21.8468L30.6613 24.1855ZM19.4274 25.8871L16.2016 22.6613H19.4274L12.9758 19.4355L12.9597 19.4194L19.4274 12.9516L22.6613 16.1855H19.4274L25.8871 19.4194L19.4193 25.8871H19.4274ZM8.19355 30.6613C6.41129 28.879 6.41129 25.9839 8.19355 24.1935L10.5403 21.8468L17.0081 28.3145L14.6613 30.6613C12.879 32.4435 9.98387 32.4435 8.19355 30.6613ZM8.19355 14.6532C6.41129 12.871 6.41129 9.97581 8.19355 8.18548C9.9758 6.40322 12.871 6.40322 14.6613 8.18548L17.0081 10.5323L10.5403 17L8.19355 14.6532ZM24.1532 4.1371C23.2903 4.52419 22.4839 5.06452 21.7742 5.77419L19.4355 8.1129L17.0968 5.77419C16.3871 5.06452 15.5806 4.52419 14.7177 4.1371C16.2097 3.67742 17.7903 3.42742 19.4355 3.42742C21.0806 3.42742 22.6613 3.67742 24.1613 4.1371H24.1532ZM4.14516 14.6935C4.53226 15.5564 5.07258 16.371 5.78226 17.0806L8.12097 19.4194L5.78226 21.7581C5.07258 22.4677 4.53226 23.2823 4.14516 24.1532C3.68548 22.6613 3.43548 21.0726 3.43548 19.4274C3.43548 17.7823 3.68548 16.1935 4.14516 14.6935ZM14.7097 34.7177C15.5726 34.3306 16.3871 33.7903 17.1048 33.0806L19.4435 30.7419L21.7823 33.0806C22.4919 33.7903 23.3064 34.3306 24.1693 34.7177C22.6774 35.1774 21.0887 35.4274 19.4355 35.4274C17.7823 35.4274 16.2016 35.1774 14.7097 34.7177ZM34.7339 24.1452C34.3468 23.2823 33.8064 22.4758 33.0968 21.7661L30.7581 19.4274L33.0968 17.0887C33.8064 16.379 34.3468 15.5726 34.7339 14.7097C35.1935 16.2016 35.4435 17.7903 35.4435 19.4355C35.4435 21.0806 35.1935 22.6613 34.7339 24.1532V24.1452Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>

            {/* 타이틀 텍스트 */}
            <div className="flex flex-col items-start gap-1.5">
              <span className="text-foreground text-center text-3xl leading-none font-medium">
                Skuber+ AI Assistant
              </span>
              <span className="text-foreground text-left text-base leading-none font-light">
                Kubernetes IDE · Simplified Cluster Management
              </span>
            </div>
          </div>

          {/* 카드 및 테이블 컨테이너 */}
          <div className="flex w-full flex-col items-start gap-7">
            {/* 액션 카드 섹션 */}
            <div className="flex w-full flex-col items-start gap-3">
              <span className="text-foreground text-base leading-none font-normal">
                Add Cluster
              </span>
              <div className="flex w-full items-stretch gap-4">
                {/* Add from kubeconfig 카드 */}
                <Item variant="muted" className="flex-1">
                  <ItemContent>
                    <ItemTitle>Add from kubeconfig</ItemTitle>
                    <ItemDescription>
                      Add clusters directly from your kubeconfig file
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Button className="flex h-9 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm leading-5">
                      <Plus className="h-4 w-4" />
                      Add
                    </Button>
                  </ItemActions>
                </Item>

                {/* Sync kubeconfig 카드 */}
                <Item variant="muted" className="flex-1">
                  <ItemContent>
                    <ItemTitle>Sync kubeconfig</ItemTitle>
                    <ItemDescription>
                      Automatically sync and manage your kubeconfig files
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Button
                      variant="outline"
                      className="flex h-9 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm leading-5"
                    >
                      <RefreshCcw className="h-4 w-4" />
                      Sync
                    </Button>
                  </ItemActions>
                </Item>
              </div>
            </div>

            {/* 테이블 섹션 */}
            <div className="flex w-full flex-col items-start gap-3">
              <span className="text-foreground text-base leading-none font-normal">
                Clusters Management
              </span>

              {/* 클러스터 테이블 - TanStack Table 정렬 기능 적용 */}
              <div className="relative w-full" ref={tableContainerRef}>
                <div className="overflow-visible rounded-md border">
                  <table className="w-full table-fixed border-collapse text-sm">
                    <TableHeader className="bg-muted [&_tr]:border-b-0">
                      {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow
                          key={headerGroup.id}
                          className="hover:bg-muted border-b"
                        >
                          {headerGroup.headers.map((header) => (
                            <TableHead
                              key={header.id}
                              className={`text-foreground ${
                                header.column.id === "provider"
                                  ? "w-[60px]"
                                  : header.column.id === "name"
                                    ? "w-[200px]"
                                    : header.column.id === "version"
                                      ? "w-[60px]"
                                      : header.column.id === "cpuUsage"
                                        ? "w-[100px]"
                                        : header.column.id === "memoryUsage"
                                          ? "w-[100px]"
                                          : header.column.id === "podStatus"
                                            ? "w-[180px]"
                                            : header.column.id === "setting"
                                              ? "w-[60px] text-right"
                                              : ""
                              } text-sm font-medium`}
                              ref={
                                header.column.id === "cpuUsage"
                                  ? cpuHeaderRef
                                  : header.column.id === "memoryUsage"
                                    ? memoryHeaderRef
                                    : undefined
                              }
                            >
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext(),
                                  )}
                            </TableHead>
                          ))}
                        </TableRow>
                      ))}
                    </TableHeader>
                    <TableBody>
                      {table.getRowModel().rows.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="h-[400px]">
                            <Empty className="border-0">
                              <EmptyHeader>
                                <EmptyTitle>No clusters</EmptyTitle>
                                <EmptyDescription>
                                  There are no clusters registered yet
                                </EmptyDescription>
                              </EmptyHeader>
                            </Empty>
                          </TableCell>
                        </TableRow>
                      ) : (
                        table.getRowModel().rows.map((row) => (
                          <TableRow
                            key={row.id}
                            className="hover:bg-muted/50 group border-b hover:relative"
                          >
                            {row.getVisibleCells().map((cell) => (
                              <TableCell
                                key={cell.id}
                                className={`text-foreground ${
                                  cell.column.id === "provider"
                                    ? "w-[60px]"
                                    : cell.column.id === "name"
                                      ? "w-[200px]"
                                      : cell.column.id === "version"
                                        ? "w-[60px]"
                                        : cell.column.id === "cpuUsage"
                                          ? "w-[100px]"
                                          : cell.column.id === "memoryUsage"
                                            ? "w-[100px]"
                                            : cell.column.id === "podStatus"
                                              ? "relative z-50 w-[180px]"
                                              : cell.column.id === "setting"
                                                ? "w-[60px] text-right"
                                                : ""
                                } group-hover:relative group-hover:z-[100]`}
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext(),
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </table>
                </div>

                {/* 페이지네이션 컨트롤 - Rows per page */}
                <div className="flex items-center justify-end px-4 pt-4">
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

                {/* 🎯 목적: CPU/Memory 차트 준비 중 안내 메시지 - CPU Usg와 Mem Usg 컬럼 그룹 중앙에 오버레이 (모든 행에 걸쳐) */}
                {overlayPosition.width > 0 && overlayPosition.height > 0 && (
                  <div
                    className="pointer-events-none absolute z-10 flex items-center justify-center"
                    style={{
                      left: overlayPosition.left,
                      width: overlayPosition.width,
                      top: overlayPosition.top,
                      height: overlayPosition.height,
                    }}
                  >
                    <Empty className="border-0 p-4 pt-2">
                      <EmptyHeader>
                        {clusters.length > 2 && (
                          <EmptyMedia variant="icon">
                            <Megaphone className="h-5 w-5" />
                          </EmptyMedia>
                        )}
                        <EmptyTitle>Updated soon</EmptyTitle>
                        <EmptyDescription>
                          Ability to check Usage will be updated soon
                        </EmptyDescription>
                      </EmptyHeader>
                    </Empty>
                  </div>
                )}
              </div>
            </div>

            {/* 도움말 섹션 */}
            <Item variant="outline" className="w-full">
              <ItemMedia variant="icon">
                <CircleHelp className="h-4 w-4" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Need Help?</ItemTitle>
                <ItemDescription>
                  New login detected from unknown device.
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button
                  variant="outline"
                  className="h-9 rounded-lg px-4 py-2 text-sm"
                >
                  Get help
                </Button>
              </ItemActions>
            </Item>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * HomeNodata 페이지 - 데이터 없는 상태의 Skuber+ AI Assistant 대시보드
 *
 * Home 스토리의 복제본으로, 독립적으로 수정 가능합니다.
 */
export const HomeNodata: Story = {
  render: () => {
    // 🎯 목적: 클러스터 테이블 데이터 관리 (데이터 없는 상태)
    const clusters: ClusterRowData[] = [];

    // 🎯 목적: TanStack Table 정렬 상태 관리
    const [sorting, setSorting] = React.useState<SortingState>([]);

    // 🎯 목적: 페이지네이션 상태 관리
    const [pagination, setPagination] = React.useState({
      pageIndex: 0,
      pageSize: 10,
    });

    // 🎯 목적: 각 클라우드 프로바이더별 로고 이미지 렌더링
    const getProviderLogo = React.useCallback((provider: string) => {
      const logoConfig: Record<string, { image: string; alt: string }> = {
        azure: { image: "/images/apps/azure.png", alt: "Microsoft Azure" },
        gcp: {
          image: "/images/apps/google-cloud.png",
          alt: "Google Cloud Platform",
        },
        openshift: { image: "/images/apps/openshift.png", alt: "OpenShift" },
        digitalocean: {
          image: "/images/apps/digital-ocean.png",
          alt: "DigitalOcean",
        },
        ibm: { image: "/images/apps/ibm-cloud.png", alt: "IBM Cloud" },
      };

      const config = logoConfig[provider] || {
        image: "",
        alt: "Unknown Provider",
      };

      return (
        <div
          className="flex h-9 w-9 items-center justify-center"
          style={{ filter: "grayscale(100%)" }}
        >
          {config.image ? (
            <img
              src={config.image}
              alt={config.alt}
              className="h-full w-full object-contain"
            />
          ) : (
            <span className="text-foreground text-xs font-bold">?</span>
          )}
        </div>
      );
    }, []);

    // 🎯 목적: TanStack Table 컬럼 정의 (정렬 가능한 컬럼 포함)
    const columns = React.useMemo<ColumnDef<ClusterRowData>[]>(
      () => [
        {
          id: "provider",
          accessorKey: "provider",
          header: () => (
            <div className="flex items-center justify-center">Clusters</div>
          ),
          cell: ({ row }) => (
            <div className="flex items-center justify-center">
              {getProviderLogo(row.original.provider)}
            </div>
          ),
          enableSorting: false,
        },
        {
          id: "name",
          accessorKey: "name",
          header: "Display Name",
          cell: ({ row }) => <div className="text-sm">{row.original.name}</div>,
          enableSorting: false,
        },
        {
          id: "version",
          accessorKey: "version",
          header: ({ column }) => (
            <Button
              variant="ghost"
              className="px-2"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Version
              <ArrowUpDown />
            </Button>
          ),
          cell: ({ row }) => (
            <div className="px-3 text-sm">{row.original.version}</div>
          ),
        },
        {
          id: "cpuUsage",
          accessorFn: (row) =>
            row.cpuUsage[row.cpuUsage.length - 1]?.usage || 0,
          header: ({ column }) => (
            <Button
              variant="ghost"
              className="px-2"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              CPU Usg.
              <ArrowUpDown />
            </Button>
          ),
          cell: ({ row }) => (
            <div className="px-3">
              <CPUUsageChart data={row.original.cpuUsage} />
            </div>
          ),
        },
        {
          id: "memoryUsage",
          accessorFn: (row) =>
            row.memoryUsage[row.memoryUsage.length - 1]?.usage || 0,
          header: ({ column }) => (
            <Button
              variant="ghost"
              className="px-2"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Mem Usg.
              <ArrowUpDown />
            </Button>
          ),
          cell: ({ row }) => (
            <div className="px-3">
              <MemoryUsageChart data={row.original.memoryUsage} />
            </div>
          ),
        },
        {
          id: "podStatus",
          accessorFn: (row) =>
            row.podStatus.running +
            row.podStatus.pending +
            row.podStatus.succeeded +
            row.podStatus.failed +
            row.podStatus.unknown,
          header: "Pods Status",
          cell: ({ row }) => (
            <div className="relative overflow-visible">
              <PodStatusChart podStatus={row.original.podStatus} />
            </div>
          ),
          enableSorting: false,
        },
        {
          id: "setting",
          header: () => <div className="text-right"></div>,
          cell: () => {
            // 🎯 목적: AlertDialog 상태 관리
            const [alertOpen, setAlertOpen] = React.useState(false);

            return (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-lg p-2"
                    >
                      <EllipsisVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        window.top!.location.href =
                          "/?path=/story/templates-settings--cluster-settings";
                      }}
                    >
                      <Settings className="h-4 w-4" />
                      Cluster Setting
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => setAlertOpen(true)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to delete this cluster?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the cluster and all related data.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-destructive hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 text-white"
                        onClick={() => {
                          // 🎯 목적: 클러스터 삭제 로직 (실제 구현 시 추가)
                          console.log("Cluster deleted");
                        }}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            );
          },
          enableSorting: false,
        },
      ],
      [getProviderLogo],
    );

    // 🎯 목적: TanStack Table 인스턴스 생성
    const table = useReactTable({
      data: clusters,
      columns,
      state: {
        sorting,
        pagination,
      },
      onSortingChange: setSorting,
      onPaginationChange: setPagination,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      autoResetPageIndex: false,
    });

    const tableContainerRef = React.useRef<HTMLDivElement | null>(null);

    // 🎯 목적: Pod Status를 가로 stacked bar chart로 시각화 (ChartContainer 기반)
    const PodStatusChart = ({
      podStatus,
    }: {
      podStatus: ClusterRowData["podStatus"];
    }) => {
      // 🎯 목적: 차트 데이터 (실제 Pod 수 저장, stackOffset="expand"로 비율 렌더링)
      const chartData = [
        {
          pods: "status",
          running: podStatus.running,
          pending: podStatus.pending,
          succeeded: podStatus.succeeded,
          failed: podStatus.failed,
          unknown: podStatus.unknown,
        },
      ];

      // 🎯 목적: 전체 Pod 수 계산 (오른쪽 표시용)
      const total =
        podStatus.running +
        podStatus.pending +
        podStatus.succeeded +
        podStatus.failed +
        podStatus.unknown;

      // 🎯 목적: Chart 색상 설정 (왼쪽부터 chart-5 > chart-4 > chart-3 > chart-2 > chart-1)
      const chartConfig = {
        running: {
          label: "Running",
          color: "var(--chart-5)", // Chart color 5 - Pod 실행 중
        },
        succeeded: {
          label: "Succeeded",
          color: "var(--chart-4)", // Chart color 4 - Pod 성공 완료
        },
        pending: {
          label: "Pending",
          color: "var(--chart-3)", // Chart color 3 - Pod 대기 중
        },
        failed: {
          label: "Failed",
          color: "var(--chart-2)", // Chart color 2 - Pod 실패
        },
        unknown: {
          label: "Unknown",
          color: "var(--chart-1)", // Chart color 1 - Pod 상태 알 수 없음
        },
      } satisfies ChartConfig;

      return (
        <div className="flex h-8 w-full items-center gap-2">
          {/* 가로 Stacked Bar Chart */}
          <div className="h-full flex-1 overflow-visible rounded">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                barSize={20}
                stackOffset="expand"
              >
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="pods" hide />
                <ChartTooltip
                  content={(props: any) => {
                    // 🎯 목적: Tooltip 항목을 running > succeeded > pending > failed > unknown 순서로 정렬
                    const order = [
                      "running",
                      "succeeded",
                      "pending",
                      "failed",
                      "unknown",
                    ];
                    const sortedPayload = props.payload?.sort(
                      (a: any, b: any) => {
                        const aIndex = order.indexOf(a.dataKey as string);
                        const bIndex = order.indexOf(b.dataKey as string);
                        return aIndex - bIndex;
                      },
                    );
                    return (
                      <ChartTooltipContent
                        {...props}
                        payload={sortedPayload}
                        hideLabel
                      />
                    );
                  }}
                  cursor={false}
                  wrapperStyle={{
                    zIndex: 10000,
                  }}
                />
                <Bar
                  dataKey="running"
                  stackId="stack"
                  fill="var(--color-running)"
                  radius={[4, 0, 0, 4]}
                />
                <Bar
                  dataKey="succeeded"
                  stackId="stack"
                  fill="var(--color-succeeded)"
                />
                <Bar
                  dataKey="pending"
                  stackId="stack"
                  fill="var(--color-pending)"
                />
                <Bar
                  dataKey="failed"
                  stackId="stack"
                  fill="var(--color-failed)"
                />
                <Bar
                  dataKey="unknown"
                  stackId="stack"
                  fill="var(--color-unknown)"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ChartContainer>
          </div>

          {/* 전체 Pod 수 표시 */}
          <span className="text-muted-foreground text-xs font-medium">
            {total}
          </span>
        </div>
      );
    };

    // 🎯 목적: CPU 사용량을 Area chart gradient로 시각화 (dimmed - 준비 중)
    const CPUUsageChart = ({
      data,
    }: {
      data: Array<{ time: string; usage: number }>;
    }) => {
      const chartConfig = {
        usage: {
          label: "CPU",
          color: "var(--chart-1)",
        },
      } satisfies ChartConfig;

      return (
        <div className="h-8 w-full opacity-20">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <AreaChart
              data={data}
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            >
              <defs>
                <linearGradient id="fillCPU" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-usage)"
                    stopOpacity={0.5}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-usage)"
                    stopOpacity={0.05}
                  />
                </linearGradient>
              </defs>
              <Area
                dataKey="usage"
                type="natural"
                fill="url(#fillCPU)"
                fillOpacity={0.2}
                stroke="var(--color-usage)"
                strokeWidth={1}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      );
    };

    // 🎯 목적: Memory 사용량을 Area chart gradient로 시각화 (dimmed - 준비 중)
    const MemoryUsageChart = ({
      data,
    }: {
      data: Array<{ time: string; usage: number }>;
    }) => {
      const chartConfig = {
        usage: {
          label: "Memory",
          color: "var(--chart-2)",
        },
      } satisfies ChartConfig;

      return (
        <div className="h-8 w-full opacity-20">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <AreaChart
              data={data}
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            >
              <defs>
                <linearGradient id="fillMemory" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-usage)"
                    stopOpacity={0.5}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-usage)"
                    stopOpacity={0.05}
                  />
                </linearGradient>
              </defs>
              <Area
                dataKey="usage"
                type="natural"
                fill="url(#fillMemory)"
                fillOpacity={0.2}
                stroke="var(--color-usage)"
                strokeWidth={1}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      );
    };

    return (
      <div className="bg-background flex h-screen w-full flex-col items-center overflow-auto p-5 pt-28">
        <div className="flex w-full max-w-[1280px] flex-col items-start gap-10">
          {/* 로고 및 타이틀 섹션 */}
          <div className="flex items-center gap-3">
            {/* 로고 심볼 */}
            <div className="relative h-12 w-12 flex-shrink-0">
              <div className="absolute top-0 left-0 h-12 w-12">
                {/* 배경 원 */}
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="24" cy="24" r="24" fill="#125AED" />
                  <circle
                    cx="24"
                    cy="24"
                    r="24"
                    fill="white"
                    fillOpacity="0.05"
                  />
                </svg>
                {/* 로고 아이콘 */}
                <svg
                  className="absolute top-[4.5px] left-[4.5px]"
                  width="39"
                  height="39"
                  viewBox="0 0 39 39"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.4274 0C8.69355 0 0 8.70161 0 19.4274C0 30.1532 8.70161 38.8548 19.4274 38.8548C30.1532 38.8548 38.8548 30.1532 38.8548 19.4274C38.8548 8.70161 30.1613 0 19.4274 0ZM28.3226 17L21.8548 10.5323L24.1935 8.19355C25.9758 6.41129 28.871 6.41129 30.6613 8.19355C32.4435 9.97581 32.4435 12.871 30.6613 14.6613L28.3226 17ZM30.6613 24.1855C32.4435 25.9677 32.4435 28.8629 30.6613 30.6532C28.879 32.4355 25.9839 32.4355 24.1935 30.6532L21.8548 28.3145L28.3226 21.8468L30.6613 24.1855ZM19.4274 25.8871L16.2016 22.6613H19.4274L12.9758 19.4355L12.9597 19.4194L19.4274 12.9516L22.6613 16.1855H19.4274L25.8871 19.4194L19.4193 25.8871H19.4274ZM8.19355 30.6613C6.41129 28.879 6.41129 25.9839 8.19355 24.1935L10.5403 21.8468L17.0081 28.3145L14.6613 30.6613C12.879 32.4435 9.98387 32.4435 8.19355 30.6613ZM8.19355 14.6532C6.41129 12.871 6.41129 9.97581 8.19355 8.18548C9.9758 6.40322 12.871 6.40322 14.6613 8.18548L17.0081 10.5323L10.5403 17L8.19355 14.6532ZM24.1532 4.1371C23.2903 4.52419 22.4839 5.06452 21.7742 5.77419L19.4355 8.1129L17.0968 5.77419C16.3871 5.06452 15.5806 4.52419 14.7177 4.1371C16.2097 3.67742 17.7903 3.42742 19.4355 3.42742C21.0806 3.42742 22.6613 3.67742 24.1613 4.1371H24.1532ZM4.14516 14.6935C4.53226 15.5564 5.07258 16.371 5.78226 17.0806L8.12097 19.4194L5.78226 21.7581C5.07258 22.4677 4.53226 23.2823 4.14516 24.1532C3.68548 22.6613 3.43548 21.0726 3.43548 19.4274C3.43548 17.7823 3.68548 16.1935 4.14516 14.6935ZM14.7097 34.7177C15.5726 34.3306 16.3871 33.7903 17.1048 33.0806L19.4435 30.7419L21.7823 33.0806C22.4919 33.7903 23.3064 34.3306 24.1693 34.7177C22.6774 35.1774 21.0887 35.4274 19.4355 35.4274C17.7823 35.4274 16.2016 35.1774 14.7097 34.7177ZM34.7339 24.1452C34.3468 23.2823 33.8064 22.4758 33.0968 21.7661L30.7581 19.4274L33.0968 17.0887C33.8064 16.379 34.3468 15.5726 34.7339 14.7097C35.1935 16.2016 35.4435 17.7903 35.4435 19.4355C35.4435 21.0806 35.1935 22.6613 34.7339 24.1532V24.1452Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>

            {/* 타이틀 텍스트 */}
            <div className="flex flex-col items-start gap-1.5">
              <span className="text-foreground text-center text-3xl leading-none font-medium">
                Skuber+ AI Assistant
              </span>
              <span className="text-foreground text-left text-base leading-none font-light">
                Kubernetes IDE · Simplified Cluster Management
              </span>
            </div>
          </div>

          {/* 카드 및 테이블 컨테이너 */}
          <div className="flex w-full flex-col items-start gap-7">
            {/* 액션 카드 섹션 */}
            <div className="flex w-full flex-col items-start gap-3">
              <span className="text-foreground text-base leading-none font-normal">
                Add Cluster
              </span>
              <div className="flex w-full items-stretch gap-4">
                {/* Add from kubeconfig 카드 */}
                <Item variant="muted" className="flex-1">
                  <ItemContent>
                    <ItemTitle>Add from kubeconfig</ItemTitle>
                    <ItemDescription>
                      Add clusters directly from your kubeconfig file
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Button className="flex h-9 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm leading-5">
                      <Plus className="h-4 w-4" />
                      Add
                    </Button>
                  </ItemActions>
                </Item>

                {/* Sync kubeconfig 카드 */}
                <Item variant="muted" className="flex-1">
                  <ItemContent>
                    <ItemTitle>Sync kubeconfig</ItemTitle>
                    <ItemDescription>
                      Automatically sync and manage your kubeconfig files
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Button
                      variant="outline"
                      className="flex h-9 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm leading-5"
                    >
                      <RefreshCcw className="h-4 w-4" />
                      Sync
                    </Button>
                  </ItemActions>
                </Item>
              </div>
            </div>

            {/* 테이블 섹션 */}
            <div className="flex w-full flex-col items-start gap-3">
              <span className="text-foreground text-base leading-none font-normal">
                Clusters Management
              </span>

              {/* 클러스터 테이블 - TanStack Table 정렬 기능 적용 */}
              <div className="relative w-full" ref={tableContainerRef}>
                <div className="overflow-visible rounded-md border">
                  <table className="w-full table-fixed border-collapse text-sm">
                    <TableHeader className="bg-muted [&_tr]:border-b-0">
                      {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow
                          key={headerGroup.id}
                          className="hover:bg-muted border-b"
                        >
                          {headerGroup.headers.map((header) => (
                            <TableHead
                              key={header.id}
                              className={`text-foreground ${
                                header.column.id === "provider"
                                  ? "w-[60px]"
                                  : header.column.id === "name"
                                    ? "w-[200px]"
                                    : header.column.id === "version"
                                      ? "w-[60px]"
                                      : header.column.id === "cpuUsage"
                                        ? "w-[100px]"
                                        : header.column.id === "memoryUsage"
                                          ? "w-[100px]"
                                          : header.column.id === "podStatus"
                                            ? "w-[180px]"
                                            : header.column.id === "setting"
                                              ? "w-[60px] text-right"
                                              : ""
                              } text-sm font-medium`}
                            >
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext(),
                                  )}
                            </TableHead>
                          ))}
                        </TableRow>
                      ))}
                    </TableHeader>
                    <TableBody>
                      {table.getRowModel().rows.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="h-[280px]">
                            <Empty className="border-0">
                              <EmptyHeader>
                                <EmptyMedia variant="icon">
                                  <Info className="h-5 w-5" />
                                </EmptyMedia>
                                <EmptyTitle>No cluster</EmptyTitle>
                                <EmptyDescription>
                                  Add cluster from kubeconfig or sync with
                                  kubeconfig to add cluster
                                </EmptyDescription>
                              </EmptyHeader>
                            </Empty>
                          </TableCell>
                        </TableRow>
                      ) : (
                        table.getRowModel().rows.map((row) => (
                          <TableRow
                            key={row.id}
                            className="hover:bg-muted/50 group border-b hover:relative"
                          >
                            {row.getVisibleCells().map((cell) => (
                              <TableCell
                                key={cell.id}
                                className={`text-foreground ${
                                  cell.column.id === "provider"
                                    ? "w-[60px]"
                                    : cell.column.id === "name"
                                      ? "w-[200px]"
                                      : cell.column.id === "version"
                                        ? "w-[60px]"
                                        : cell.column.id === "cpuUsage"
                                          ? "w-[100px]"
                                          : cell.column.id === "memoryUsage"
                                            ? "w-[100px]"
                                            : cell.column.id === "podStatus"
                                              ? "relative z-50 w-[180px]"
                                              : cell.column.id === "setting"
                                                ? "w-[60px] text-right"
                                                : ""
                                } group-hover:relative group-hover:z-[100]`}
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext(),
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </table>
                </div>

                {/* 페이지네이션 컨트롤 - Rows per page */}
                <div className="flex items-center justify-end px-4 pt-4">
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

            {/* 도움말 섹션 */}
            <Item variant="outline" className="w-full">
              <ItemMedia variant="icon">
                <CircleHelp className="h-4 w-4" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Need Help?</ItemTitle>
                <ItemDescription>
                  New login detected from unknown device.
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button
                  variant="outline"
                  className="h-9 rounded-lg px-4 py-2 text-sm"
                >
                  Get help
                </Button>
              </ItemActions>
            </Item>
          </div>
        </div>
      </div>
    );
  },
};
/**
 * Cluster Home - 클러스터 리소스 선택 대기 상태
 *
 * Empty 컴포넌트를 활용한 간단한 안내 화면입니다.
 * 사용자가 리소스를 선택하기 전의 초기 상태를 표시합니다.
 */
export const ClusterHome: Story = {
  render: () => {
    return (
      <div className="bg-background flex min-h-screen w-full items-center justify-center p-5">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <MousePointer />
            </EmptyMedia>
            <EmptyDescription>
              Click the resource you want to check.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    );
  },
};

/**
 * 기본 Welcome 콘텐츠 - 완전한 웰컴 페이지 레이아웃
 */
export const Backup: Story = {};
