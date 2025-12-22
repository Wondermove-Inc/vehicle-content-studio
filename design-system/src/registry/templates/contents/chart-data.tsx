"use client";

import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Item,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from "@/components/ui/empty";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartConfig } from "@/components/ui/chart";
import { RadialBar, RadialBarChart, Pie, PieChart } from "recharts";
import { TriangleAlert, BadgeCheck, ChevronDown } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Link } from "react-router-dom";

/**
 * 🎯 목적: ChartData 컴포넌트 Props 타입 정의
 * 스크린샷 기반 다크 테마 대시보드 컴포넌트
 */
interface ChartDataProps {
  className?: string;
  variant?: "default" | "no-data" | "overview";
}

/**
 * 🎯 목적: Master Nodes CPU 시간별 사용량 데이터
 */
const masterHourlyCpuData = [
  { hour: "15:00", value: 953.7 },
  { hour: "16:00", value: 1600 },
  { hour: "17:00", value: 2800 },
  { hour: "18:00", value: 1800 },
  { hour: "19:00", value: 1200 },
  { hour: "20:00", value: 1600 },
];

/**
 * 🎯 목적: Worker Nodes CPU 시간별 사용량 데이터
 */
const workerHourlyCpuData = [
  { hour: "15:00", value: 1205.3 },
  { hour: "16:00", value: 2100 },
  { hour: "17:00", value: 3200 },
  { hour: "18:00", value: 2400 },
  { hour: "19:00", value: 1800 },
  { hour: "20:00", value: 2200 },
];

/**
 * 🎯 목적: Master Nodes Memory 시간별 사용량 데이터
 */
const masterHourlyMemoryData = [
  { hour: "15:00", value: 1024.5 },
  { hour: "16:00", value: 1536.2 },
  { hour: "17:00", value: 2048.8 },
  { hour: "18:00", value: 1792.4 },
  { hour: "19:00", value: 1280.6 },
  { hour: "20:00", value: 1600.3 },
];

/**
 * 🎯 목적: Worker Nodes Memory 시간별 사용량 데이터
 */
const workerHourlyMemoryData = [
  { hour: "15:00", value: 2048.7 },
  { hour: "16:00", value: 2560.4 },
  { hour: "17:00", value: 3072.1 },
  { hour: "18:00", value: 2816.8 },
  { hour: "19:00", value: 2304.5 },
  { hour: "20:00", value: 2688.2 },
];

/**
 * 🎯 목적: Master Nodes CPU 사용량 데이터
 */
const masterCpuData = [
  { metric: "usage", value: 0.06, fill: "var(--chart-1)" },
  { metric: "requests", value: 1.1, fill: "var(--chart-2)" },
  { metric: "limits", value: 0.2, fill: "var(--chart-3)" },
  { metric: "allocatable", value: 4.0, fill: "var(--chart-4)" },
  { metric: "capacity", value: 4.0, fill: "var(--chart-5)" },
];

/**
 * 🎯 목적: Worker Nodes CPU 사용량 데이터
 */
const workerCpuData = [
  { metric: "usage", value: 0.12, fill: "var(--chart-1)" },
  { metric: "requests", value: 2.5, fill: "var(--chart-2)" },
  { metric: "limits", value: 0.8, fill: "var(--chart-3)" },
  { metric: "allocatable", value: 8.0, fill: "var(--chart-4)" },
  { metric: "capacity", value: 8.0, fill: "var(--chart-5)" },
];

/**
 * 🎯 목적: Master Nodes Memory 사용량 데이터
 */
const masterMemoryData = [
  { metric: "usage", value: 1.3, fill: "var(--chart-1)" },
  { metric: "requests", value: 304.0, fill: "var(--chart-2)" },
  { metric: "limits", value: 468.0, fill: "var(--chart-3)" },
  { metric: "allocatable", value: 3700, fill: "var(--chart-4)" },
  { metric: "capacity", value: 3800, fill: "var(--chart-5)" },
];

/**
 * 🎯 목적: Worker Nodes Memory 사용량 데이터
 */
const workerMemoryData = [
  { metric: "usage", value: 2.8, fill: "var(--chart-1)" },
  { metric: "requests", value: 512.0, fill: "var(--chart-2)" },
  { metric: "limits", value: 896.0, fill: "var(--chart-3)" },
  { metric: "allocatable", value: 7200, fill: "var(--chart-4)" },
  { metric: "capacity", value: 7600, fill: "var(--chart-5)" },
];

/**
 * 🎯 목적: Master Nodes Pods 데이터
 */
const masterPodsData = [
  { metric: "usage", value: 15, fill: "var(--chart-1)" },
  { metric: "allocatable", value: 110, fill: "var(--chart-2)" },
  { metric: "capacity", value: 110, fill: "var(--chart-3)" },
];

/**
 * 🎯 목적: Worker Nodes Pods 데이터
 */
const workerPodsData = [
  { metric: "usage", value: 28, fill: "var(--chart-1)" },
  { metric: "allocatable", value: 220, fill: "var(--chart-2)" },
  { metric: "capacity", value: 220, fill: "var(--chart-3)" },
];

/**
 * 🎯 목적: Master Nodes Network 데이터
 */
const masterNetworkData = [
  { metric: "inbound", value: 1.2, fill: "var(--chart-1)" },
  { metric: "outbound", value: 0.8, fill: "var(--chart-2)" },
  { metric: "total", value: 2.0, fill: "var(--chart-3)" },
];

/**
 * 🎯 목적: Worker Nodes Network 데이터
 */
const workerNetworkData = [
  { metric: "inbound", value: 2.5, fill: "var(--chart-1)" },
  { metric: "outbound", value: 1.8, fill: "var(--chart-2)" },
  { metric: "total", value: 4.3, fill: "var(--chart-3)" },
];

/**
 * 🎯 목적: Master Nodes Storage 데이터
 */
const masterStorageData = [
  { metric: "used", value: 45.2, fill: "var(--chart-1)" },
  { metric: "available", value: 154.8, fill: "var(--chart-2)" },
  { metric: "total", value: 200.0, fill: "var(--chart-3)" },
];

/**
 * 🎯 목적: Worker Nodes Storage 데이터
 */
const workerStorageData = [
  { metric: "used", value: 89.7, fill: "var(--chart-1)" },
  { metric: "available", value: 310.3, fill: "var(--chart-2)" },
  { metric: "total", value: 400.0, fill: "var(--chart-3)" },
];

/**
 * 🎯 목적: Master Nodes Events 데이터
 */
const masterEventsData = [
  { metric: "normal", value: 142, fill: "var(--chart-1)" },
  { metric: "warning", value: 8, fill: "var(--chart-2)" },
  { metric: "error", value: 2, fill: "var(--chart-3)" },
];

/**
 * 🎯 목적: Worker Nodes Events 데이터
 */
const workerEventsData = [
  { metric: "normal", value: 289, fill: "var(--chart-1)" },
  { metric: "warning", value: 15, fill: "var(--chart-2)" },
  { metric: "error", value: 4, fill: "var(--chart-3)" },
];

/**
 * 🎯 목적: Master Nodes Health 데이터
 */
const masterHealthData = [
  { metric: "ready", value: 3, fill: "var(--chart-1)" },
  { metric: "notready", value: 0, fill: "var(--chart-2)" },
  { metric: "total", value: 3, fill: "var(--chart-3)" },
];

/**
 * 🎯 목적: Worker Nodes Health 데이터
 */
const workerHealthData = [
  { metric: "ready", value: 6, fill: "var(--chart-1)" },
  { metric: "notready", value: 1, fill: "var(--chart-2)" },
  { metric: "total", value: 7, fill: "var(--chart-3)" },
];

/**
 * 🎯 목적: 경고 테이블 데이터
 */
const warningData = [
  {
    id: "1",
    col1: "Table Cell Text",
    col2: "Table Cell Text",
    col3: "Table Cell Text",
    col4: "Table Cell Text",
    badge: "Badge",
  },
  {
    id: "2",
    col1: "Table Cell Text",
    col2: "Table Cell Text",
    col3: "Table Cell Text",
    col4: "Table Cell Text",
    badge: "Badge",
  },
  {
    id: "3",
    col1: "Table Cell Text",
    col2: "Table Cell Text",
    col3: "Table Cell Text",
    col4: "Table Cell Text",
    badge: "Badge",
  },
  {
    id: "4",
    col1: "Table Cell Text",
    col2: "Table Cell Text",
    col3: "Table Cell Text",
    col4: "Table Cell Text",
    badge: "Verified",
    isVerified: true,
  },
  {
    id: "5",
    col1: "Table Cell Text",
    col2: "Table Cell Text",
    col3: "Table Cell Text",
    col4: "Table Cell Text",
    badge: "Verified",
    isVerified: true,
  },
];

/**
 * 🎯 목적: No Data 상태용 빈 CPU 시간별 데이터
 */
const noDataHourlyCpuData = [
  { hour: "15:00", value: 0 },
  { hour: "16:00", value: 0 },
  { hour: "17:00", value: 0 },
  { hour: "18:00", value: 0 },
  { hour: "19:00", value: 0 },
  { hour: "20:00", value: 0 },
];

/**
 * 🎯 목적: No Data 상태용 빈 Memory 시간별 데이터
 */
const noDataHourlyMemoryData = [
  { hour: "15:00", value: 0 },
  { hour: "16:00", value: 0 },
  { hour: "17:00", value: 0 },
  { hour: "18:00", value: 0 },
  { hour: "19:00", value: 0 },
  { hour: "20:00", value: 0 },
];

const noDataCpuData = [
  { metric: "usage", value: 0, fill: "var(--color-usage)" },
  { metric: "requests", value: 0, fill: "var(--color-requests)" },
  { metric: "limits", value: 0, fill: "var(--color-limits)" },
  { metric: "allocatable", value: 0, fill: "var(--color-allocatable)" },
  { metric: "capacity", value: 0, fill: "var(--color-capacity)" },
];

const noDataMemoryData = [
  { metric: "usage", value: 0, fill: "var(--color-usage)" },
  { metric: "requests", value: 0, fill: "var(--color-requests)" },
  { metric: "limits", value: 0, fill: "var(--color-limits)" },
  { metric: "allocatable", value: 0, fill: "var(--color-allocatable)" },
  { metric: "capacity", value: 0, fill: "var(--color-capacity)" },
];

const noDataPodsData = [
  { metric: "usage", value: 0, fill: "var(--color-usage)" },
  { metric: "allocatable", value: 0, fill: "var(--color-allocatable)" },
  { metric: "capacity", value: 0, fill: "var(--color-capacity)" },
];

const noDataNetworkData = [
  { metric: "inbound", value: 0, fill: "var(--color-usage)" },
  { metric: "outbound", value: 0, fill: "var(--color-requests)" },
  { metric: "total", value: 0, fill: "var(--color-limits)" },
];

const noDataStorageData = [
  { metric: "used", value: 0, fill: "var(--color-usage)" },
  { metric: "available", value: 0, fill: "var(--color-requests)" },
  { metric: "total", value: 0, fill: "var(--color-limits)" },
];

const noDataEventsData = [
  { metric: "normal", value: 0, fill: "var(--color-usage)" },
  { metric: "warning", value: 0, fill: "var(--color-requests)" },
  { metric: "error", value: 0, fill: "var(--color-limits)" },
];

const noDataHealthData = [
  { metric: "ready", value: 0, fill: "var(--chart-1)" },
  { metric: "notready", value: 0, fill: "var(--chart-2)" },
  { metric: "total", value: 0, fill: "var(--chart-3)" },
];

/**
 * 🎯 목적: Overview 전용 Kubernetes 리소스 데이터
 */
const overviewPodsData = [
  { metric: "succeeded", value: 1, fill: "var(--chart-1)" },
  { metric: "running", value: 12, fill: "var(--chart-2)" },
  { metric: "pending", value: 5, fill: "var(--chart-3)" },
];

const overviewDeploymentsData = [
  { metric: "succeeded", value: 0, fill: "var(--chart-1)" },
  { metric: "running", value: 3, fill: "var(--chart-2)" },
  { metric: "pending", value: 1, fill: "var(--chart-3)" },
];

const overviewDaemonSetsData = [
  { metric: "succeeded", value: 0, fill: "var(--chart-1)" },
  { metric: "running", value: 1, fill: "var(--chart-2)" },
  { metric: "pending", value: 3, fill: "var(--chart-3)" },
];

const overviewStatefulSetsData = [
  { metric: "succeeded", value: 0, fill: "var(--chart-1)" },
  { metric: "running", value: 0, fill: "var(--chart-2)" },
  { metric: "pending", value: 0, fill: "var(--chart-3)" },
];

const overviewReplicaSetsData = [
  { metric: "succeeded", value: 0, fill: "var(--chart-1)" },
  { metric: "running", value: 3, fill: "var(--chart-2)" },
  { metric: "pending", value: 1, fill: "var(--chart-3)" },
];

const overviewJobsData = [
  { metric: "succeeded", value: 1, fill: "var(--chart-1)" },
  { metric: "running", value: 0, fill: "var(--chart-2)" },
  { metric: "pending", value: 0, fill: "var(--chart-3)" },
];

const overviewCronJobsData = [
  { metric: "succeeded", value: 0, fill: "var(--chart-1)" },
  { metric: "running", value: 0, fill: "var(--chart-2)" },
  { metric: "pending", value: 0, fill: "var(--chart-3)" },
];

/**
 * 차트와 테이블 조합의 모니터링 차트데이터 입니다.
 */
export function ChartData({ className, variant = "default" }: ChartDataProps) {
  const [selectedNode, setSelectedNode] = React.useState("master");
  const [selectedMetric, setSelectedMetric] = React.useState("cpu");
  const [selectedNamespace, setSelectedNamespace] = React.useState("default");

  // 🎯 목적: selectedNode와 variant에 따라 다른 데이터 선택
  const getNodeData = (
    masterData: any[],
    workerData: any[],
    noData: any[],
    overviewData?: any[],
  ) => {
    if (variant === "no-data") return noData;
    if (variant === "overview" && overviewData) return overviewData;
    return selectedNode === "master" ? masterData : workerData;
  };

  // 🎯 목적: selectedMetric(CPU/Memory)에 따라 시간별 데이터 선택
  const currentHourlyData = getNodeData(
    selectedMetric === "cpu" ? masterHourlyCpuData : masterHourlyMemoryData,
    selectedMetric === "cpu" ? workerHourlyCpuData : workerHourlyMemoryData,
    selectedMetric === "cpu" ? noDataHourlyCpuData : noDataHourlyMemoryData,
  );
  const currentCpuData = getNodeData(
    masterCpuData,
    workerCpuData,
    noDataCpuData,
    overviewPodsData,
  );
  const currentMemoryData = getNodeData(
    masterMemoryData,
    workerMemoryData,
    noDataMemoryData,
    overviewDeploymentsData,
  );
  const currentPodsData = getNodeData(
    masterPodsData,
    workerPodsData,
    noDataPodsData,
    overviewDaemonSetsData,
  );
  const currentNetworkData = getNodeData(
    masterNetworkData,
    workerNetworkData,
    noDataNetworkData,
    overviewStatefulSetsData,
  );
  const currentStorageData = getNodeData(
    masterStorageData,
    workerStorageData,
    noDataStorageData,
    overviewReplicaSetsData,
  );
  const currentEventsData = getNodeData(
    masterEventsData,
    workerEventsData,
    noDataEventsData,
    overviewJobsData,
  );
  const currentHealthData = getNodeData(
    masterHealthData,
    workerHealthData,
    noDataHealthData,
    overviewCronJobsData,
  );

  // 🎯 목적: variant에 따라 '--' 또는 실제 값 표시
  const formatValue = (value: string | number) => {
    return variant === "no-data" ? "--" : value;
  };

  // 🎯 목적: 현재 선택된 노드의 실제 데이터 값 추출
  const getCpuValues = () => {
    const data =
      variant === "no-data"
        ? noDataCpuData
        : selectedNode === "master"
          ? masterCpuData
          : workerCpuData;
    return {
      usage: data.find((d) => d.metric === "usage")?.value || 0,
      requests: data.find((d) => d.metric === "requests")?.value || 0,
      limits: data.find((d) => d.metric === "limits")?.value || 0,
      allocatable: data.find((d) => d.metric === "allocatable")?.value || 0,
      capacity: data.find((d) => d.metric === "capacity")?.value || 0,
    };
  };

  const getMemoryValues = () => {
    const data =
      variant === "no-data"
        ? noDataMemoryData
        : selectedNode === "master"
          ? masterMemoryData
          : workerMemoryData;
    return {
      usage: data.find((d) => d.metric === "usage")?.value || 0,
      requests: data.find((d) => d.metric === "requests")?.value || 0,
      limits: data.find((d) => d.metric === "limits")?.value || 0,
      allocatable: data.find((d) => d.metric === "allocatable")?.value || 0,
      capacity: data.find((d) => d.metric === "capacity")?.value || 0,
    };
  };

  const getPodsValues = () => {
    const data =
      variant === "no-data"
        ? noDataPodsData
        : selectedNode === "master"
          ? masterPodsData
          : workerPodsData;
    return {
      usage: data.find((d) => d.metric === "usage")?.value || 0,
      allocatable: data.find((d) => d.metric === "allocatable")?.value || 0,
      capacity: data.find((d) => d.metric === "capacity")?.value || 0,
    };
  };

  const getNetworkValues = () => {
    const data =
      variant === "no-data"
        ? noDataNetworkData
        : selectedNode === "master"
          ? masterNetworkData
          : workerNetworkData;
    return {
      inbound: data.find((d) => d.metric === "inbound")?.value || 0,
      outbound: data.find((d) => d.metric === "outbound")?.value || 0,
      total: data.find((d) => d.metric === "total")?.value || 0,
    };
  };

  const getStorageValues = () => {
    const data =
      variant === "no-data"
        ? noDataStorageData
        : selectedNode === "master"
          ? masterStorageData
          : workerStorageData;
    return {
      used: data.find((d) => d.metric === "used")?.value || 0,
      available: data.find((d) => d.metric === "available")?.value || 0,
      total: data.find((d) => d.metric === "total")?.value || 0,
    };
  };

  const getEventsValues = () => {
    const data =
      variant === "no-data"
        ? noDataEventsData
        : selectedNode === "master"
          ? masterEventsData
          : workerEventsData;
    return {
      normal: data.find((d) => d.metric === "normal")?.value || 0,
      warning: data.find((d) => d.metric === "warning")?.value || 0,
      error: data.find((d) => d.metric === "error")?.value || 0,
    };
  };

  const getHealthValues = () => {
    const data =
      variant === "no-data"
        ? noDataHealthData
        : selectedNode === "master"
          ? masterHealthData
          : workerHealthData;
    return {
      ready: data.find((d) => d.metric === "ready")?.value || 0,
      notready: data.find((d) => d.metric === "notready")?.value || 0,
      total: data.find((d) => d.metric === "total")?.value || 0,
    };
  };

  const cpuValues = getCpuValues();
  const memoryValues = getMemoryValues();
  const podsValues = getPodsValues();
  const networkValues = getNetworkValues();
  const storageValues = getStorageValues();
  const eventsValues = getEventsValues();
  const healthValues = getHealthValues();

  // 🎯 목적: 메모리 값을 적절한 단위로 포맷팅
  const formatMemoryValue = (value: number) => {
    if (variant === "no-data") return "--";
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}GiB`;
    }
    return `${value.toFixed(1)}MiB`;
  };

  // 🎯 목적: 시간별 사용량 차트 설정 (CPU/Memory에 따라 다른 색상)
  const hourlyChartConfig = {
    hourly: {
      label: "Hourly Usage",
      color: selectedMetric === "cpu" ? "var(--chart-1)" : "var(--chart-3)",
    },
  } satisfies ChartConfig;

  // 🎯 목적: CPU Radial 차트 설정
  const cpuChartConfig = {
    value: {
      label: "CPU Value",
    },
    usage: {
      label: "Usage",
      color: "var(--chart-1)",
    },
    requests: {
      label: "Requests",
      color: "var(--chart-2)",
    },
    limits: {
      label: "Limits",
      color: "var(--chart-3)",
    },
    allocatable: {
      label: "Allocatable",
      color: "var(--chart-4)",
    },
    capacity: {
      label: "Capacity",
      color: "var(--chart-5)",
    },
  } satisfies ChartConfig;

  // 🎯 목적: Memory Radial 차트 설정
  const memoryChartConfig = {
    value: {
      label: "Memory Value",
    },
    usage: {
      label: "Usage",
      color: "var(--chart-1)",
    },
    requests: {
      label: "Requests",
      color: "var(--chart-2)",
    },
    limits: {
      label: "Limits",
      color: "var(--chart-3)",
    },
    allocatable: {
      label: "Allocatable",
      color: "var(--chart-4)",
    },
    capacity: {
      label: "Capacity",
      color: "var(--chart-5)",
    },
  } satisfies ChartConfig;

  // 🎯 목적: Pods Radial 차트 설정
  const podsChartConfig = {
    value: {
      label: "Pods Value",
    },
    usage: {
      label: "Usage",
      color: "var(--chart-1)",
    },
    allocatable: {
      label: "Allocatable",
      color: "var(--chart-2)",
    },
    capacity: {
      label: "Capacity",
      color: "var(--chart-3)",
    },
  } satisfies ChartConfig;

  // 🎯 목적: Network Radial 차트 설정
  const networkChartConfig = {
    value: {
      label: "Network Value",
    },
    inbound: {
      label: "Inbound",
      color: "var(--chart-1)",
    },
    outbound: {
      label: "Outbound",
      color: "var(--chart-2)",
    },
    total: {
      label: "Total",
      color: "var(--chart-3)",
    },
  } satisfies ChartConfig;

  // 🎯 목적: Storage Radial 차트 설정
  const storageChartConfig = {
    value: {
      label: "Storage Value",
    },
    used: {
      label: "Used",
      color: "var(--chart-1)",
    },
    available: {
      label: "Available",
      color: "var(--chart-2)",
    },
    total: {
      label: "Total",
      color: "var(--chart-3)",
    },
  } satisfies ChartConfig;

  // 🎯 목적: Events Radial 차트 설정
  const eventsChartConfig = {
    value: {
      label: "Events Value",
    },
    normal: {
      label: "Normal",
      color: "var(--chart-1)",
    },
    warning: {
      label: "Warning",
      color: "var(--chart-2)",
    },
    error: {
      label: "Error",
      color: "var(--chart-3)",
    },
  } satisfies ChartConfig;

  // 🎯 목적: Health Radial 차트 설정
  const healthChartConfig = {
    value: {
      label: "Health Value",
    },
    ready: {
      label: "Ready",
      color: "var(--chart-1)",
    },
    notready: {
      label: "Not Ready",
      color: "var(--chart-2)",
    },
    total: {
      label: "Total",
      color: "var(--chart-3)",
    },
  } satisfies ChartConfig;

  // 🎯 목적: Overview용 공통 차트 설정 (Succeeded/Running/Pending)
  const overviewChartConfig = {
    value: {
      label: "Status Value",
    },
    succeeded: {
      label: "Succeeded",
      color: "var(--chart-1)",
    },
    running: {
      label: "Running",
      color: "var(--chart-2)",
    },
    pending: {
      label: "Pending",
      color: "var(--chart-3)",
    },
  } satisfies ChartConfig;

  // 🎯 목적: Overview용 공통 범례 컴포넌트
  const OverviewLegend = ({ data }: { data: any[] }) => (
    <>
      <Item className="gap-1.5 px-0.5 py-0 text-sm">
        <ItemMedia variant="icon" className="h-2 w-2">
          <div className="bg-chart-1 h-1 w-1 rounded-full" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="text-muted-foreground text-sm leading-normal font-normal">
            Succeeded: {data.find((d) => d.metric === "succeeded")?.value || 0}
          </ItemTitle>
        </ItemContent>
      </Item>
      <Item className="gap-1.5 px-0.5 py-0 text-sm">
        <ItemMedia variant="icon" className="h-2 w-2">
          <div className="bg-chart-2 h-1 w-1 rounded-full" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="text-muted-foreground text-sm leading-normal font-normal">
            Running: {data.find((d) => d.metric === "running")?.value || 0}
          </ItemTitle>
        </ItemContent>
      </Item>
      <Item className="gap-1.5 px-0.5 py-0 text-sm">
        <ItemMedia variant="icon" className="h-2 w-2">
          <div className="bg-chart-3 h-1 w-1 rounded-full" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="text-muted-foreground text-sm leading-normal font-normal">
            Pending: {data.find((d) => d.metric === "pending")?.value || 0}
          </ItemTitle>
        </ItemContent>
      </Item>
    </>
  );

  return (
    <div className={`bg-background min-h-screen w-full p-5 ${className || ""}`}>
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6">
        {/* 헤더와 차트 영역 */}
        <div className="flex flex-col gap-3">
          {/* 헤더 영역 */}
          <div className="flex items-center justify-between">
            <h1 className="text-foreground text-lg leading-none font-semibold">
              {"{Menuname}"}
            </h1>

            {/* Overview에서는 Namespace 드롭다운, 다른 스토리에서는 Master/Worker 노드 토글 */}
            {variant === "overview" ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="outline" className="min-w-[180px]">
                    Namespace: {selectedNamespace}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start">
                  <DropdownMenuLabel>All Namespaces</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={selectedNamespace === "default"}
                    onCheckedChange={() => setSelectedNamespace("default")}
                  >
                    default
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedNamespace === "cilium-secrets"}
                    onCheckedChange={() =>
                      setSelectedNamespace("cilium-secrets")
                    }
                  >
                    cilium-secrets
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedNamespace === "kube-node-lease"}
                    onCheckedChange={() =>
                      setSelectedNamespace("kube-node-lease")
                    }
                  >
                    kube-node-lease
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedNamespace === "kube-public"}
                    onCheckedChange={() => setSelectedNamespace("kube-public")}
                  >
                    kube-public
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <ToggleGroup
                type="single"
                value={selectedNode}
                onValueChange={(value) => value && setSelectedNode(value)}
                variant="outline"
                size="default"
                className="w-[360px]"
              >
                <ToggleGroupItem value="master" aria-label="Master Nodes">
                  Master Nodes
                </ToggleGroupItem>
                <ToggleGroupItem value="worker" aria-label="Worker Nodes">
                  Worker Nodes
                </ToggleGroupItem>
              </ToggleGroup>
            )}
          </div>

          {/* 차트 영역 - 반응형 레이아웃 (900px 이하에서 세로 정렬) */}
          <div
            className={`flex flex-col rounded-md lg:flex-row ${variant === "overview" ? "" : "border-input border"}`}
          >
            {/* 왼쪽: 시간별 사용량 차트 (overview에서는 숨김) */}
            {variant !== "overview" && (
              <div className="border-input flex min-w-0 flex-1 flex-col items-start gap-4 border-b bg-transparent p-4 lg:border-r lg:border-b-0">
                {/* 제목과 토글 영역 */}
                <div className="flex items-center justify-between gap-5 self-stretch">
                  <h3 className="text-foreground text-sm leading-none font-medium">
                    Hourly {selectedMetric === "cpu" ? "CPU" : "Memory"} usage
                  </h3>

                  {/* CPU/Memory 토글 - shadcn/ui ToggleGroup */}
                  <ToggleGroup
                    type="single"
                    value={selectedMetric}
                    onValueChange={(value) => value && setSelectedMetric(value)}
                    variant="outline"
                    size="sm"
                    className="w-[160px]"
                  >
                    <ToggleGroupItem
                      value="cpu"
                      aria-label="CPU"
                      className="flex-1"
                    >
                      CPU
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="memory"
                      aria-label="Memory"
                      className="flex-1"
                    >
                      Memory
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>

                {/* 차트 래퍼 */}
                <div className="flex flex-grow flex-col items-start gap-2.5 self-stretch">
                  <ChartContainer
                    config={hourlyChartConfig}
                    className="h-[340px] w-full"
                  >
                    <AreaChart
                      accessibilityLayer
                      data={currentHourlyData}
                      margin={{
                        left: 6,
                        right: 12,
                      }}
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="hour"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => {
                          if (selectedMetric === "cpu") {
                            // CPU: 1000 이상이면 GiB, 아니면 MiB
                            if (value >= 1000) {
                              return `${(value / 1000).toFixed(1)}GiB`;
                            }
                            return `${value}MiB`;
                          } else {
                            // Memory: 1000 이상이면 GiB, 아니면 MiB
                            if (value >= 1000) {
                              return `${(value / 1000).toFixed(1)}GiB`;
                            }
                            return `${value}MiB`;
                          }
                        }}
                      />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                      />
                      <Area
                        dataKey="value"
                        type="step"
                        fill={
                          selectedMetric === "cpu"
                            ? "var(--chart-1)"
                            : "var(--chart-3)"
                        }
                        fillOpacity={0.4}
                        stroke={
                          selectedMetric === "cpu"
                            ? "var(--chart-1)"
                            : "var(--chart-3)"
                        }
                      />
                    </AreaChart>
                  </ChartContainer>
                </div>
              </div>
            )}

            {/* 오른쪽: Usage Type Distribution Chart */}
            <div
              className={`flex min-w-0 flex-1 flex-col items-start ${variant === "overview" ? "gap-0" : "gap-2"} self-stretch ${variant === "overview" ? "" : "p-4"}`}
            >
              {/* 제목 (overview에서는 숨김) */}
              {variant !== "overview" && (
                <div className="flex h-8 items-center gap-2.5 self-stretch">
                  <h3 className="text-foreground text-sm leading-none font-medium">
                    Usage Type Distribution Chart
                  </h3>
                </div>
              )}

              {/* 카드들 */}
              <div
                className={`min-w-0 flex-1 self-stretch ${variant === "overview" ? "grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2" : "flex items-stretch gap-4"}`}
              >
                {/* CPU Card */}
                <Card
                  className={`bg-background flex flex-col gap-1 rounded-md p-3 ${variant === "overview" ? "" : "min-w-0 flex-1"}`}
                >
                  <CardHeader className="items-center gap-0 p-0">
                    {variant === "overview" ? (
                      <Link
                        to="/pods"
                        className="text-base font-semibold transition-colors hover:text-blue-600 hover:underline"
                      >
                        Pods (18)
                      </Link>
                    ) : (
                      <CardTitle className="text-base">CPU</CardTitle>
                    )}
                  </CardHeader>
                  <CardContent className="flex-1 p-0 pb-2">
                    <ChartContainer
                      config={
                        variant === "overview"
                          ? overviewChartConfig
                          : cpuChartConfig
                      }
                      className="mx-auto aspect-square max-h-[120px]"
                    >
                      {variant === "overview" ? (
                        <PieChart>
                          <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                          />
                          <Pie
                            data={currentCpuData}
                            dataKey="value"
                            nameKey="metric"
                            innerRadius={20}
                          />
                        </PieChart>
                      ) : (
                        <RadialBarChart
                          data={currentCpuData}
                          innerRadius={20}
                          outerRadius={50}
                        >
                          <ChartTooltip
                            cursor={false}
                            content={
                              <ChartTooltipContent hideLabel nameKey="metric" />
                            }
                          />
                          <RadialBar dataKey="value" background />
                        </RadialBarChart>
                      )}
                    </ChartContainer>
                  </CardContent>
                  <CardFooter className="p-0">
                    <ItemGroup className="w-full gap-0.5">
                      {variant === "overview" ? (
                        <OverviewLegend data={currentCpuData} />
                      ) : (
                        <>
                          <Item className="gap-1.5 px-0.5 py-0 text-sm">
                            <ItemMedia variant="icon" className="h-2 w-2">
                              <div className="bg-chart-1 h-1 w-1 rounded-full" />
                            </ItemMedia>
                            <ItemContent>
                              <ItemTitle className="text-muted-foreground text-sm leading-normal font-normal">
                                Usage: {formatValue(cpuValues.usage.toFixed(2))}
                              </ItemTitle>
                            </ItemContent>
                          </Item>
                          <Item className="gap-1.5 px-0.5 py-0 text-sm">
                            <ItemMedia variant="icon" className="h-2 w-2">
                              <div className="bg-chart-2 h-1 w-1 rounded-full" />
                            </ItemMedia>
                            <ItemContent>
                              <ItemTitle className="text-muted-foreground text-sm leading-normal font-normal">
                                Requests:{" "}
                                {formatValue(cpuValues.requests.toFixed(2))}
                              </ItemTitle>
                            </ItemContent>
                          </Item>
                          <Item className="gap-1.5 px-0.5 py-0 text-sm">
                            <ItemMedia variant="icon" className="h-2 w-2">
                              <div className="bg-chart-3 h-1 w-1 rounded-full" />
                            </ItemMedia>
                            <ItemContent>
                              <ItemTitle className="text-muted-foreground text-sm leading-normal font-normal">
                                Limits:{" "}
                                {formatValue(cpuValues.limits.toFixed(2))}
                              </ItemTitle>
                            </ItemContent>
                          </Item>
                          <Item className="gap-1.5 px-0.5 py-0 text-sm">
                            <ItemMedia variant="icon" className="h-2 w-2">
                              <div className="bg-chart-4 h-1 w-1 rounded-full" />
                            </ItemMedia>
                            <ItemContent>
                              <ItemTitle className="text-muted-foreground text-sm leading-normal font-normal">
                                Allocatable Capacity:{" "}
                                {formatValue(cpuValues.allocatable.toFixed(2))}
                              </ItemTitle>
                            </ItemContent>
                          </Item>
                          <Item className="gap-1.5 px-0.5 py-0 text-sm">
                            <ItemMedia variant="icon" className="h-2 w-2">
                              <div className="bg-chart-5 h-1 w-1 rounded-full" />
                            </ItemMedia>
                            <ItemContent>
                              <ItemTitle className="text-muted-foreground text-sm leading-normal font-normal">
                                Capacity:{" "}
                                {formatValue(cpuValues.capacity.toFixed(2))}
                              </ItemTitle>
                            </ItemContent>
                          </Item>
                        </>
                      )}
                    </ItemGroup>
                  </CardFooter>
                </Card>

                {/* Memory Card */}
                <Card
                  className={`bg-background flex flex-col gap-1 rounded-md p-3 ${variant === "overview" ? "" : "min-w-0 flex-1"}`}
                >
                  <CardHeader className="items-center gap-0 p-0">
                    {variant === "overview" ? (
                      <Link
                        to="/deployments"
                        className="text-base font-semibold transition-colors hover:text-blue-600 hover:underline"
                      >
                        Deployments (4)
                      </Link>
                    ) : (
                      <CardTitle className="text-base">Memory</CardTitle>
                    )}
                  </CardHeader>
                  <CardContent className="flex-1 p-0 pb-2">
                    <ChartContainer
                      config={
                        variant === "overview"
                          ? overviewChartConfig
                          : memoryChartConfig
                      }
                      className="mx-auto aspect-square max-h-[120px]"
                    >
                      {variant === "overview" ? (
                        <PieChart>
                          <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                          />
                          <Pie
                            data={currentMemoryData}
                            dataKey="value"
                            nameKey="metric"
                            innerRadius={20}
                          />
                        </PieChart>
                      ) : (
                        <RadialBarChart
                          data={currentMemoryData}
                          innerRadius={20}
                          outerRadius={50}
                        >
                          <ChartTooltip
                            cursor={false}
                            content={
                              <ChartTooltipContent hideLabel nameKey="metric" />
                            }
                          />
                          <RadialBar dataKey="value" background />
                        </RadialBarChart>
                      )}
                    </ChartContainer>
                  </CardContent>
                  <CardFooter className="p-0">
                    <ItemGroup className="w-full gap-0.5">
                      {variant === "overview" ? (
                        <OverviewLegend data={currentMemoryData} />
                      ) : (
                        <>
                          <Item className="gap-1.5 px-0.5 py-0 text-sm">
                            <ItemMedia variant="icon" className="h-2 w-2">
                              <div className="bg-chart-1 h-1 w-1 rounded-full" />
                            </ItemMedia>
                            <ItemContent>
                              <ItemTitle className="text-muted-foreground text-sm leading-normal font-normal">
                                Usage: {formatMemoryValue(memoryValues.usage)}
                              </ItemTitle>
                            </ItemContent>
                          </Item>
                          <Item className="gap-1.5 px-0.5 py-0 text-sm">
                            <ItemMedia variant="icon" className="h-2 w-2">
                              <div className="bg-chart-2 h-1 w-1 rounded-full" />
                            </ItemMedia>
                            <ItemContent>
                              <ItemTitle className="text-muted-foreground text-sm leading-normal font-normal">
                                Requests:{" "}
                                {formatMemoryValue(memoryValues.requests)}
                              </ItemTitle>
                            </ItemContent>
                          </Item>
                          <Item className="gap-1.5 px-0.5 py-0 text-sm">
                            <ItemMedia variant="icon" className="h-2 w-2">
                              <div className="bg-chart-3 h-1 w-1 rounded-full" />
                            </ItemMedia>
                            <ItemContent>
                              <ItemTitle className="text-muted-foreground text-sm leading-normal font-normal">
                                Limits: {formatMemoryValue(memoryValues.limits)}
                              </ItemTitle>
                            </ItemContent>
                          </Item>
                          <Item className="gap-1.5 px-0.5 py-0 text-sm">
                            <ItemMedia variant="icon" className="h-2 w-2">
                              <div className="bg-chart-4 h-1 w-1 rounded-full" />
                            </ItemMedia>
                            <ItemContent>
                              <ItemTitle className="text-muted-foreground text-sm leading-normal font-normal">
                                Allocatable Capacity:{" "}
                                {formatMemoryValue(memoryValues.allocatable)}
                              </ItemTitle>
                            </ItemContent>
                          </Item>
                          <Item className="gap-1.5 px-0.5 py-0 text-sm">
                            <ItemMedia variant="icon" className="h-2 w-2">
                              <div className="bg-chart-5 h-1 w-1 rounded-full" />
                            </ItemMedia>
                            <ItemContent>
                              <ItemTitle className="text-muted-foreground text-sm leading-normal font-normal">
                                Capacity:{" "}
                                {formatMemoryValue(memoryValues.capacity)}
                              </ItemTitle>
                            </ItemContent>
                          </Item>
                        </>
                      )}
                    </ItemGroup>
                  </CardFooter>
                </Card>

                {/* Pods Card */}
                <Card
                  className={`bg-background flex flex-col gap-1 rounded-md p-3 ${variant === "overview" ? "" : "min-w-0 flex-1"}`}
                >
                  <CardHeader className="items-center gap-0 p-0">
                    {variant === "overview" ? (
                      <Link
                        to="/daemon-sets"
                        className="text-base font-semibold transition-colors hover:text-blue-600 hover:underline"
                      >
                        Daemon Sets (4)
                      </Link>
                    ) : (
                      <CardTitle className="text-base">Pods</CardTitle>
                    )}
                  </CardHeader>
                  <CardContent className="flex-1 p-0 pb-2">
                    <ChartContainer
                      config={
                        variant === "overview"
                          ? overviewChartConfig
                          : podsChartConfig
                      }
                      className="mx-auto aspect-square max-h-[120px]"
                    >
                      {variant === "overview" ? (
                        <PieChart>
                          <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                          />
                          <Pie
                            data={currentPodsData}
                            dataKey="value"
                            nameKey="metric"
                            innerRadius={20}
                          />
                        </PieChart>
                      ) : (
                        <RadialBarChart
                          data={currentPodsData}
                          innerRadius={20}
                          outerRadius={50}
                        >
                          <ChartTooltip
                            cursor={false}
                            content={
                              <ChartTooltipContent hideLabel nameKey="metric" />
                            }
                          />
                          <RadialBar dataKey="value" background />
                        </RadialBarChart>
                      )}
                    </ChartContainer>
                  </CardContent>
                  <CardFooter className="p-0">
                    <ItemGroup className="w-full gap-0.5">
                      {variant === "overview" ? (
                        <OverviewLegend data={currentPodsData} />
                      ) : (
                        <>
                          <Item className="gap-1.5 px-0.5 py-0 text-sm">
                            <ItemMedia variant="icon" className="h-2 w-2">
                              <div className="bg-chart-1 h-1 w-1 rounded-full" />
                            </ItemMedia>
                            <ItemContent>
                              <ItemTitle className="text-muted-foreground text-sm leading-normal font-normal">
                                Usage:{" "}
                                {formatValue(podsValues.usage.toString())}
                              </ItemTitle>
                            </ItemContent>
                          </Item>
                          <Item className="gap-1.5 px-0.5 py-0 text-sm">
                            <ItemMedia variant="icon" className="h-2 w-2">
                              <div className="bg-chart-2 h-1 w-1 rounded-full" />
                            </ItemMedia>
                            <ItemContent>
                              <ItemTitle className="text-muted-foreground text-sm leading-normal font-normal">
                                Allocatable:{" "}
                                {formatValue(podsValues.allocatable.toString())}
                              </ItemTitle>
                            </ItemContent>
                          </Item>
                          <Item className="gap-1.5 px-0.5 py-0 text-sm">
                            <ItemMedia variant="icon" className="h-2 w-2">
                              <div className="bg-chart-3 h-1 w-1 rounded-full" />
                            </ItemMedia>
                            <ItemContent>
                              <ItemTitle className="text-muted-foreground text-sm leading-normal font-normal">
                                Capacity:{" "}
                                {formatValue(podsValues.capacity.toString())}
                              </ItemTitle>
                            </ItemContent>
                          </Item>
                        </>
                      )}
                    </ItemGroup>
                  </CardFooter>
                </Card>

                {/* Network Card - Overview에서만 표시 */}
                {variant === "overview" && (
                  <Card className="bg-background flex flex-col gap-1 rounded-md p-3">
                    <CardHeader className="items-center gap-0 p-0">
                      <Link
                        to="/stateful-sets"
                        className="text-base font-semibold transition-colors hover:text-blue-600 hover:underline"
                      >
                        Stateful Sets (0)
                      </Link>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 pb-2">
                      <ChartContainer
                        config={overviewChartConfig}
                        className="mx-auto aspect-square max-h-[120px]"
                      >
                        <PieChart>
                          <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                          />
                          <Pie
                            data={currentNetworkData}
                            dataKey="value"
                            nameKey="metric"
                            innerRadius={20}
                          />
                        </PieChart>
                      </ChartContainer>
                    </CardContent>
                    <CardFooter className="p-0">
                      <ItemGroup className="w-full gap-0.5">
                        <OverviewLegend data={currentNetworkData} />
                      </ItemGroup>
                    </CardFooter>
                  </Card>
                )}

                {/* Storage Card - Overview에서만 표시 */}
                {variant === "overview" && (
                  <Card className="bg-background flex flex-col gap-1 rounded-md p-3">
                    <CardHeader className="items-center gap-0 p-0">
                      <Link
                        to="/replica-sets"
                        className="text-base font-semibold transition-colors hover:text-blue-600 hover:underline"
                      >
                        Replica Sets (4)
                      </Link>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 pb-2">
                      <ChartContainer
                        config={overviewChartConfig}
                        className="mx-auto aspect-square max-h-[120px]"
                      >
                        <PieChart>
                          <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                          />
                          <Pie
                            data={currentStorageData}
                            dataKey="value"
                            nameKey="metric"
                            innerRadius={20}
                          />
                        </PieChart>
                      </ChartContainer>
                    </CardContent>
                    <CardFooter className="p-0">
                      <ItemGroup className="w-full gap-0.5">
                        <OverviewLegend data={currentStorageData} />
                      </ItemGroup>
                    </CardFooter>
                  </Card>
                )}

                {/* Events Card - Overview에서만 표시 */}
                {variant === "overview" && (
                  <Card className="bg-background flex flex-col gap-1 rounded-md p-3">
                    <CardHeader className="items-center gap-0 p-0">
                      <Link
                        to="/jobs"
                        className="text-base font-semibold transition-colors hover:text-blue-600 hover:underline"
                      >
                        Jobs (1)
                      </Link>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 pb-2">
                      <ChartContainer
                        config={overviewChartConfig}
                        className="mx-auto aspect-square max-h-[120px]"
                      >
                        <PieChart>
                          <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                          />
                          <Pie
                            data={currentEventsData}
                            dataKey="value"
                            nameKey="metric"
                            innerRadius={20}
                          />
                        </PieChart>
                      </ChartContainer>
                    </CardContent>
                    <CardFooter className="p-0">
                      <ItemGroup className="w-full gap-0.5">
                        <OverviewLegend data={currentEventsData} />
                      </ItemGroup>
                    </CardFooter>
                  </Card>
                )}

                {/* Health Card - Overview에서만 표시 */}
                {variant === "overview" && (
                  <Card className="bg-background flex flex-col gap-1 rounded-md p-3">
                    <CardHeader className="items-center gap-0 p-0">
                      <Link
                        to="/cron-jobs"
                        className="text-base font-semibold transition-colors hover:text-blue-600 hover:underline"
                      >
                        Cron Jobs (0)
                      </Link>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 pb-2">
                      <ChartContainer
                        config={overviewChartConfig}
                        className="mx-auto aspect-square max-h-[120px]"
                      >
                        <PieChart>
                          <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                          />
                          <Pie
                            data={currentHealthData}
                            dataKey="value"
                            nameKey="metric"
                            innerRadius={20}
                          />
                        </PieChart>
                      </ChartContainer>
                    </CardContent>
                    <CardFooter className="p-0">
                      <ItemGroup className="w-full gap-0.5">
                        <OverviewLegend data={currentHealthData} />
                      </ItemGroup>
                    </CardFooter>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 경고 테이블 또는 Empty 상태 (overview에서는 숨김) */}
        {variant !== "overview" && (
          <div className="flex flex-1 flex-col items-start gap-3 self-stretch">
            {variant === "no-data" ? (
              <Empty className="min-h-[300px] w-full">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <BadgeCheck className="h-6 w-6" />
                  </EmptyMedia>
                  <EmptyTitle>No issues found</EmptyTitle>
                  <EmptyDescription>
                    Everything is fine in the cluster
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            ) : (
              <>
                {/* 헤더 */}
                <div className="flex items-center gap-1">
                  <TriangleAlert className="h-4 w-4 text-amber-500" />
                  <span className="text-sm leading-none font-medium text-amber-500">
                    Warnings
                  </span>
                  <span className="text-sm leading-none font-medium text-amber-500">
                    ({warningData.length})
                  </span>
                </div>

                {/* 테이블 - DataTable 스타일 */}
                <div className="overflow-hidden rounded-md border">
                  <table className="w-full table-fixed border-collapse text-sm">
                    <TableHeader className="bg-muted">
                      <TableRow className="hover:bg-muted border-b">
                        <TableHead className="text-foreground w-1/5 text-sm leading-5 font-medium">
                          Head Text
                        </TableHead>
                        <TableHead className="text-foreground w-1/5 text-sm leading-5 font-medium">
                          Head Text
                        </TableHead>
                        <TableHead className="text-foreground w-1/5 text-sm leading-5 font-medium">
                          Head Text
                        </TableHead>
                        <TableHead className="text-foreground w-1/5 text-sm leading-5 font-medium">
                          Head Text
                        </TableHead>
                        <TableHead className="text-foreground w-1/5 text-sm leading-5 font-medium">
                          Head Text
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {warningData.map((row) => (
                        <TableRow
                          key={row.id}
                          className="border-border h-[52px]"
                        >
                          <TableCell className="text-foreground text-sm leading-5 font-normal">
                            {row.col1}
                          </TableCell>
                          <TableCell className="text-foreground text-sm leading-5 font-normal">
                            {row.col2}
                          </TableCell>
                          <TableCell className="text-foreground text-sm leading-5 font-normal">
                            {row.col3}
                          </TableCell>
                          <TableCell className="text-foreground text-sm leading-5 font-normal">
                            {row.col4}
                          </TableCell>
                          <TableCell>
                            {row.isVerified ? (
                              <Badge
                                variant="secondary"
                                className="bg-blue-500 text-white dark:bg-blue-600"
                              >
                                <BadgeCheck className="h-3 w-3" />
                                {row.badge}
                              </Badge>
                            ) : (
                              <Badge variant="default">{row.badge}</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
