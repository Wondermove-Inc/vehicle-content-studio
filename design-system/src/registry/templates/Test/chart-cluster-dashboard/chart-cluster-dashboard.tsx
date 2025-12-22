"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Line,
  LineChart,
  Label,
} from "recharts";
import {
  Info,
  CirclePlus,
  Mail,
  Database,
  FileText,
  FileType,
  MoreHorizontal,
  Folder,
  Share2,
  Trash2,
  Settings,
  HelpCircle,
  Search,
  LayoutDashboard,
  List,
  BarChart3,
  FolderKanban,
  Users,
  CreditCard,
  Bell,
  LogOut,
  MoreVertical,
  Hexagon,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

/**
 * 🎯 목적: 사이드바 네비게이션 데이터
 */
const sidebarData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    { title: "Dashboard", url: "#", icon: LayoutDashboard },
    { title: "Lifecycle", url: "#", icon: List },
    { title: "Analytics", url: "#", icon: BarChart3 },
    { title: "Projects", url: "#", icon: FolderKanban },
    { title: "Team", url: "#", icon: Users },
  ],
  navSecondary: [
    { title: "Settings", url: "#", icon: Settings },
    { title: "Get Help", url: "#", icon: HelpCircle },
    { title: "Search", url: "#", icon: Search },
  ],
  documents: [
    { name: "Data Library", url: "#", icon: Database },
    { name: "Reports", url: "#", icon: FileText },
    { name: "Word Assistant", url: "#", icon: FileType },
  ],
};

/**
 * 🎯 목적: CPU 사용량 시계열 데이터 생성
 * CAST AI 스타일의 클러스터 모니터링 데이터
 * 더 굴곡진 차트를 위해 사인파 + 랜덤 노이즈 적용
 */
const generateCpuTimeSeriesData = () => {
  const data = [];
  const startDate = new Date("2024-11-01");

  for (let i = 0; i < 60; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    // 사인파로 주기적 변동 + 랜덤 노이즈로 굴곡 생성 (완만한 곡선)
    const wave1 = Math.sin(i * 0.15) * 200;
    const wave2 = Math.sin(i * 0.4) * 100;
    const noise = (Math.random() - 0.5) * 150;

    const baseProvisioned = 2500 + wave1 + wave2 + noise;
    const baseRequested = 1800 + wave1 * 0.7 + wave2 * 0.5 + noise * 0.8;
    const baseUsed =
      900 + wave1 * 0.4 + wave2 * 0.3 + noise * 0.6 + (i > 30 ? 100 : 0);

    data.push({
      date: date.toISOString().split("T")[0],
      provisioned: Math.round(Math.max(1800, baseProvisioned)),
      requested: Math.round(Math.max(1200, baseRequested)),
      used: Math.round(Math.max(500, baseUsed)),
    });
  }
  return data;
};

/**
 * 🎯 목적: 비용 시계열 데이터 생성
 * 더 굴곡진 차트를 위해 사인파 + 랜덤 노이즈 적용
 */
const generateCostTimeSeriesData = () => {
  const data = [];
  const startDate = new Date("2024-11-01");

  for (let i = 0; i < 60; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    // 사인파로 주기적 변동 + 랜덤 노이즈로 굴곡 생성 (완만한 곡선)
    const wave1 = Math.sin(i * 0.12) * 0.008;
    const wave2 = Math.sin(i * 0.35) * 0.004;
    const noise = (Math.random() - 0.5) * 0.005;

    const baseProvCost = 0.025 + wave1 + wave2 + noise;
    const baseReqCost = 0.035 + wave1 * 0.8 + wave2 * 0.6 + noise * 0.7;
    const baseUsedCost = 0.045 + wave1 * 0.5 + wave2 * 0.4 + noise * 0.5;

    data.push({
      date: date.toISOString().split("T")[0],
      provCost: Number(Math.max(0.01, baseProvCost).toFixed(5)),
      reqCost: Number(Math.max(0.015, baseReqCost).toFixed(5)),
      usedCost: Number(Math.max(0.02, baseUsedCost).toFixed(5)),
    });
  }
  return data;
};

const cpuChartData = generateCpuTimeSeriesData();
const costChartData = generateCostTimeSeriesData();

/**
 * 🎯 목적: CPU/Memory 도넛 차트 데이터
 */
const cpuDonutData = {
  provisioned: 1716.41,
  requested: 1250.63,
  used: 870.82,
  provCost: 0.04732,
  reqCost: 0.06795,
  usedCost: 0.0952,
};

const memoryDonutData = {
  provisioned: 7198.69,
  requested: 3325.82,
  used: 2659.61,
  provCost: 0.00481,
  reqCost: 0.01076,
  usedCost: 0.01381,
};

/**
 * 🎯 목적: Memory 사용량 시계열 데이터 생성
 * 더 굴곡진 차트를 위해 사인파 + 랜덤 노이즈 적용
 */
const generateMemoryTimeSeriesData = () => {
  const data = [];
  const startDate = new Date("2024-11-01");

  for (let i = 0; i < 60; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    // 사인파로 주기적 변동 + 랜덤 노이즈로 굴곡 생성 (완만한 곡선)
    const wave1 = Math.sin(i * 0.12) * 400;
    const wave2 = Math.sin(i * 0.3) * 200;
    const noise = (Math.random() - 0.5) * 250;

    const baseProvisioned = 7200 + wave1 + wave2 + noise;
    const baseRequested = 3300 + wave1 * 0.5 + wave2 * 0.4 + noise * 0.6;
    const baseUsed =
      2600 + wave1 * 0.3 + wave2 * 0.25 + noise * 0.4 + (i > 30 ? 150 : 0);

    data.push({
      date: date.toISOString().split("T")[0],
      provisioned: Math.round(Math.max(5500, baseProvisioned)),
      requested: Math.round(Math.max(2500, baseRequested)),
      used: Math.round(Math.max(1800, baseUsed)),
    });
  }
  return data;
};

const memoryChartData = generateMemoryTimeSeriesData();

/**
 * 🎯 목적: 리소스 요약 데이터
 */
const resourceSummary = {
  cpu: {
    overprovisioned: 517,
    provisioned: 1717,
    requested: 1200,
    used: 856,
    unit: "CPU",
  },
  memory: {
    overprovisioned: 3873,
    provisioned: 7199,
    requested: 3326,
    used: 2660,
    unit: "GiB",
  },
  costs: {
    difference: 0.01104,
    provCost: 0.02555,
    reqCost: 0.03659,
    usedCost: 0.05131,
  },
};

/**
 * 🎯 목적: Resources 차트 설정
 * shadcn/ui 공식 차트 색상 변수 사용
 */
const cpuChartConfig = {
  provisioned: {
    label: "Provisioned",
    color: "oklch(0.457 0.24 277.023)",
  },
  requested: {
    label: "Requested",
    color: "oklch(0.715 0.143 215.221)",
  },
  used: {
    label: "Used",
    color: "oklch(0.551 0.027 264.364)",
  },
} satisfies ChartConfig;

/**
 * 🎯 목적: Costs 차트 설정
 * shadcn/ui 공식 차트 색상 변수 사용
 */
const costChartConfig = {
  provCost: {
    label: "Prov. CPU",
    color: "oklch(0.457 0.24 277.023)",
  },
  reqCost: {
    label: "Req. CPU",
    color: "oklch(0.715 0.143 215.221)",
  },
  usedCost: {
    label: "Used CPU",
    color: "oklch(0.551 0.027 264.364)",
  },
} satisfies ChartConfig;

/**
 * 🎯 목적: 메인 네비게이션 컴포넌트
 */
function NavMain({
  items,
}: {
  items: { title: string; url: string; icon: React.ElementType }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
            >
              <CirclePlus className="size-4" />
              <span>Quick Create</span>
            </SidebarMenuButton>
            <Button
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <Mail className="size-4" />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title}>
                <item.icon className="size-4" />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

/**
 * 🎯 목적: 문서 네비게이션 컴포넌트
 */
function NavDocuments({
  items,
}: {
  items: { name: string; url: string; icon: React.ElementType }[];
}) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Documents</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon className="size-4" />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction
                  showOnHover
                  className="data-[state=open]:bg-accent rounded-sm"
                >
                  <MoreHorizontal className="size-4" />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-24 rounded-lg" align="start">
                <DropdownMenuItem>
                  <Folder className="size-4" />
                  <span>Open</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className="size-4" />
                  <span>Share</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="size-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontal className="text-sidebar-foreground/70 size-4" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}

/**
 * 🎯 목적: 보조 네비게이션 컴포넌트
 */
function NavSecondary({
  items,
  ...props
}: {
  items: { title: string; url: string; icon: React.ElementType }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon className="size-4" />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

/**
 * 🎯 목적: 사용자 네비게이션 컴포넌트
 */
function NavUser({
  user,
}: {
  user: { name: string; email: string; avatar: string };
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user.email}
                </span>
              </div>
              <MoreVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side="right"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Users className="size-4" />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="size-4" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="size-4" />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="size-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

/**
 * 🎯 목적: 앱 사이드바 컴포넌트
 */
function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <Hexagon className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarData.navMain} />
        <NavDocuments items={sidebarData.documents} />
        <NavSecondary items={sidebarData.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter>
    </Sidebar>
  );
}

/**
 * 🎯 목적: 사이트 헤더 컴포넌트
 */
function SiteHeader() {
  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Clusters</h1>
      </div>
    </header>
  );
}

/**
 * 🎯 목적: 도넛 차트 설정
 * shadcn/ui 공식 차트 색상 변수 사용
 * Provisioned, Requested, Used 세 가지 상태 표시
 */
const donutChartConfig = {
  provisioned: {
    label: "Provisioned",
    color: "oklch(0.457 0.24 277.023)",
  },
  requested: {
    label: "Requested",
    color: "oklch(0.715 0.143 215.221)",
  },
  used: {
    label: "Used",
    color: "oklch(0.551 0.027 264.364)",
  },
} satisfies ChartConfig;

/**
 * 🎯 목적: 도넛 차트 컴포넌트
 * CPU/Memory 사용량을 도넛 형태로 시각화
 * shadcn/ui의 ChartContainer 사용
 */
function ResourceDonutChart({
  label,
  data,
  unit,
}: {
  label: string;
  data: typeof cpuDonutData;
  unit: string;
}) {
  const total = data.provisioned;

  // 각 상태를 비율로 표시 (Provisioned 대비)
  // 채워진 부분 + 빈 부분으로 구성
  const provisionedData = [
    { name: "provisioned", value: total, fill: "var(--color-provisioned)" },
  ];
  const requestedData = [
    {
      name: "requested",
      value: data.requested,
      fill: "var(--color-requested)",
    },
    { name: "empty", value: total - data.requested, fill: "transparent" },
  ];
  const usedData = [
    { name: "used", value: data.used, fill: "var(--color-used)" },
    { name: "empty", value: total - data.used, fill: "transparent" },
  ];

  return (
    <div className="flex items-center gap-6">
      <ChartContainer config={donutChartConfig} className="h-24 w-24">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent />} />
          {/* Provisioned - 외곽 링 */}
          <Pie
            data={provisionedData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={38}
            outerRadius={45}
            strokeWidth={0}
            startAngle={90}
            endAngle={-270}
          />
          {/* Requested - 중간 링 */}
          <Pie
            data={requestedData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={28}
            outerRadius={35}
            strokeWidth={0}
            startAngle={90}
            endAngle={-270}
          />
          {/* Used - 내부 링 */}
          <Pie
            data={usedData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={18}
            outerRadius={25}
            strokeWidth={0}
            startAngle={90}
            endAngle={-270}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-[10px] font-medium"
                      >
                        {label}
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>

      <div className="border-r pr-6">
        <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
          <div className="text-muted-foreground">Provisioned:</div>
          <div className="font-medium">
            {data.provisioned.toLocaleString()} {unit}
          </div>
          <div className="text-muted-foreground">Requested:</div>
          <div className="font-medium">
            {data.requested.toLocaleString()} {unit}
          </div>
          <div className="text-muted-foreground">Used:</div>
          <div className="font-medium">
            {data.used.toLocaleString()} {unit}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
        <div className="text-muted-foreground">Provisioned:</div>
        <div className="font-medium">${data.provCost.toFixed(5)}</div>
        <div className="text-muted-foreground">Requested:</div>
        <div className="font-medium">${data.reqCost.toFixed(5)}</div>
        <div className="text-muted-foreground">Used:</div>
        <div className="font-medium">${data.usedCost.toFixed(5)}</div>
      </div>
    </div>
  );
}

/**
 * 🎯 목적: 리소스 오버프로비저닝 상태 카드
 * 로딩 시 0에서 목표값까지 애니메이션 적용
 */
function OverprovisionedCard({
  title,
  percentage,
}: {
  title: string;
  percentage: number;
}) {
  const [animatedValue, setAnimatedValue] = React.useState(0);

  React.useEffect(() => {
    // 마운트 후 약간의 딜레이를 주고 애니메이션 시작
    const timer = setTimeout(() => {
      setAnimatedValue(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="flex-1 space-y-2">
      <div className="text-muted-foreground flex items-center gap-1 text-xs tracking-wide">
        {title}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-3 w-3" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Current overprovisioned resource ratio</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="text-2xl font-semibold">{percentage}%</div>
      <Progress value={animatedValue} className="h-2 bg-white/15" />
    </div>
  );
}

/**
 * 🎯 목적: 대시보드 콘텐츠 컴포넌트
 */
function DashboardContent() {
  const [timeRange, setTimeRange] = React.useState("30d");
  const [priceType, setPriceType] = React.useState("discounted");
  const [resOffering, setResOffering] = React.useState("raw");
  const [costRate, setCostRate] = React.useState("hourly");
  const [resourceTab, setResourceTab] = React.useState("cpu");

  // 시간 범위에 따른 데이터 필터링
  const filteredResourceData = React.useMemo(() => {
    const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;
    const sourceData = resourceTab === "cpu" ? cpuChartData : memoryChartData;
    return sourceData.slice(-days);
  }, [timeRange, resourceTab]);

  const filteredCostData = React.useMemo(() => {
    const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;
    return costChartData.slice(-days);
  }, [timeRange]);

  // 현재 선택된 리소스 요약 데이터
  const currentResourceSummary =
    resourceTab === "cpu" ? resourceSummary.cpu : resourceSummary.memory;

  return (
    <div className="bg-background w-full space-y-4 p-4">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Clusters</h1>
        </div>

        <div className="flex items-center gap-4">
          <Select value={priceType} onValueChange={setPriceType}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="discounted">Discounted price</SelectItem>
              <SelectItem value="ondemand">On-demand price</SelectItem>
            </SelectContent>
          </Select>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[240px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">This month GMT +00:00</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 오버프로비저닝 요약 카드 */}
      <Card className="gap-2 bg-gradient-to-b from-transparent to-white/[0.05] py-4">
        <CardHeader className="gap-0 px-4 pb-0">
          <CardDescription className="text-xs tracking-wide">
            Current Overprovisioned Resources
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 pt-1.5">
          <div className="flex gap-6">
            <OverprovisionedCard title="Cpu" percentage={27} />
            <div className="border-r" />
            <OverprovisionedCard title="Memory GiB" percentage={54} />
            <div className="border-r" />
            <div className="flex-1 space-y-2">
              <div className="text-muted-foreground flex items-center gap-1 text-xs tracking-wide">
                Cumulative This Month
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-3 w-3" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Cumulative wasted cost this month</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="text-2xl font-semibold">$0.01543</div>
              <div className="flex items-center gap-2 text-sm">
                <Badge
                  variant="secondary"
                  className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
                >
                  ↘ $0.00
                </Badge>
                <span className="text-muted-foreground">Than last month</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CPU / Memory 상세 */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="gap-2 bg-gradient-to-b from-transparent to-white/[0.05] py-4">
          <CardHeader className="px-4 pb-0">
            <CardTitle className="text-base font-medium">CPU</CardTitle>
          </CardHeader>
          <CardContent className="px-4">
            <ResourceDonutChart label="CPU" data={cpuDonutData} unit="CPU" />
          </CardContent>
        </Card>

        <Card className="gap-2 bg-gradient-to-b from-transparent to-white/[0.05] py-4">
          <CardHeader className="px-4 pb-0">
            <CardTitle className="text-base font-medium">Memory</CardTitle>
          </CardHeader>
          <CardContent className="px-4">
            <ResourceDonutChart label="GiB" data={memoryDonutData} unit="GiB" />
          </CardContent>
        </Card>
      </div>

      {/* 리소스 차트 - 상/하 2줄 레이아웃 */}
      <div className="grid grid-cols-1 gap-4">
        {/* Resources 차트 */}
        <Card className="gap-2 bg-gradient-to-b from-transparent to-white/[0.05] py-4">
          <CardHeader className="px-4 pb-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">Resources</CardTitle>
              <Tabs value={resourceTab} onValueChange={setResourceTab}>
                <TabsList>
                  <TabsTrigger value="cpu">CPU</TabsTrigger>
                  <TabsTrigger value="memory">Memory</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="px-4">
            {/* 리소스 요약 */}
            <div className="mb-4 grid grid-cols-4 gap-4 text-xs">
              <div className="border-r pr-4">
                <div className="text-muted-foreground flex items-center gap-1">
                  Overprovisioned
                  <Info className="h-3 w-3" />
                </div>
                <div className="text-lg font-bold">
                  {currentResourceSummary.overprovisioned.toLocaleString()}{" "}
                  <span className="text-muted-foreground text-xs font-normal">
                    {currentResourceSummary.unit}
                  </span>
                </div>
              </div>
              <div className="border-r pr-4">
                <div className="text-muted-foreground">
                  Prov. {currentResourceSummary.unit}
                </div>
                <div className="text-lg font-bold">
                  {currentResourceSummary.provisioned.toLocaleString()}{" "}
                  <span className="text-muted-foreground text-xs font-normal">
                    {currentResourceSummary.unit}
                  </span>
                </div>
              </div>
              <div className="border-r pr-4">
                <div className="text-muted-foreground">
                  Req. {currentResourceSummary.unit}
                </div>
                <div className="text-lg font-bold">
                  {currentResourceSummary.requested.toLocaleString()}{" "}
                  <span className="text-muted-foreground text-xs font-normal">
                    {currentResourceSummary.unit}
                  </span>
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">
                  Used {currentResourceSummary.unit}
                </div>
                <div className="text-lg font-bold">
                  {currentResourceSummary.used.toLocaleString()}{" "}
                  <span className="text-muted-foreground text-xs font-normal">
                    {currentResourceSummary.unit}
                  </span>
                </div>
              </div>
            </div>

            {/* Area Chart */}
            <ChartContainer
              config={cpuChartConfig}
              className="h-[200px] w-full"
            >
              <AreaChart data={filteredResourceData}>
                <defs>
                  <linearGradient id="fillProv" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-provisioned)"
                      stopOpacity={0.4}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-provisioned)"
                      stopOpacity={0.05}
                    />
                  </linearGradient>
                  <linearGradient id="fillReq" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-requested)"
                      stopOpacity={0.4}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-requested)"
                      stopOpacity={0.05}
                    />
                  </linearGradient>
                  <linearGradient id="fillUsed" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-used)"
                      stopOpacity={0.6}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-used)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={48}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.getDate().toString().padStart(2, "0");
                  }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickCount={4}
                  domain={["dataMin - 50", "dataMax + 50"]}
                  tickFormatter={(value) =>
                    `${value} ${currentResourceSummary.unit}`
                  }
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) =>
                        new Date(value).toLocaleDateString()
                      }
                    />
                  }
                />
                <Area
                  type="natural"
                  dataKey="provisioned"
                  stroke="var(--color-provisioned)"
                  fill="url(#fillProv)"
                  strokeWidth={2}
                />
                <Area
                  type="natural"
                  dataKey="requested"
                  stroke="var(--color-requested)"
                  fill="url(#fillReq)"
                  strokeWidth={2}
                />
                <Area
                  type="natural"
                  dataKey="used"
                  stroke="var(--color-used)"
                  fill="url(#fillUsed)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Costs 차트 */}
        <Card className="gap-2 bg-gradient-to-b from-transparent to-white/[0.05] py-4">
          <CardHeader className="px-4 pb-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">Costs</CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">
                  Res. offering
                </span>
                <Select value={resOffering} onValueChange={setResOffering}>
                  <SelectTrigger className="h-8 w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normalized">Normalized</SelectItem>
                    <SelectItem value="raw">Raw</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-muted-foreground text-sm">Cost rate</span>
                <Select value={costRate} onValueChange={setCostRate}>
                  <SelectTrigger className="h-8 w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">hourly</SelectItem>
                    <SelectItem value="daily">daily</SelectItem>
                    <SelectItem value="monthly">monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4">
            {/* 비용 요약 */}
            <div className="mb-4 grid grid-cols-4 gap-4 text-xs">
              <div className="border-r pr-4">
                <div className="text-muted-foreground flex items-center gap-1">
                  Difference
                  <Info className="h-3 w-3" />
                </div>
                <div className="text-lg font-bold">
                  ${resourceSummary.costs.difference.toFixed(5)}
                </div>
              </div>
              <div className="border-r pr-4">
                <div className="text-muted-foreground">Prov. CPU</div>
                <div className="text-lg font-bold">
                  ${resourceSummary.costs.provCost.toFixed(5)}
                </div>
              </div>
              <div className="border-r pr-4">
                <div className="text-muted-foreground">Req. CPU</div>
                <div className="text-lg font-bold">
                  ${resourceSummary.costs.reqCost.toFixed(5)}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Used CPU</div>
                <div className="text-lg font-bold">
                  ${resourceSummary.costs.usedCost.toFixed(5)}
                </div>
              </div>
            </div>

            {/* Line Chart */}
            <ChartContainer
              config={costChartConfig}
              className="h-[200px] w-full"
            >
              <LineChart data={filteredCostData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={48}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.getDate().toString().padStart(2, "0");
                  }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickCount={4}
                  domain={["dataMin - 0.001", "dataMax + 0.001"]}
                  tickFormatter={(value) => `$${value.toFixed(3)}`}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) =>
                        new Date(value).toLocaleDateString()
                      }
                    />
                  }
                />
                <Line
                  type="natural"
                  dataKey="provCost"
                  stroke="var(--color-provCost)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="natural"
                  dataKey="reqCost"
                  stroke="var(--color-reqCost)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="natural"
                  dataKey="usedCost"
                  stroke="var(--color-usedCost)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/**
 * 🎯 목적: CAST AI 스타일 클러스터 대시보드 메인 컴포넌트
 * 사이드바 + 헤더 + 대시보드 콘텐츠를 포함한 전체 레이아웃
 */
export function ChartClusterDashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <DashboardContent />
      </SidebarInset>
    </SidebarProvider>
  );
}

export default ChartClusterDashboard;
