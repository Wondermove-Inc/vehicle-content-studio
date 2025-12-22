import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChartClusterDashboard } from "./chart-cluster-dashboard";

/**
 * 🎨 CAST AI 스타일 클러스터 모니터링 대시보드
 *
 * shadcn/ui 컴포넌트를 사용하여 구현한 클라우드 리소스 모니터링 대시보드입니다.
 *
 * ## 사용된 shadcn/ui 컴포넌트
 * - **Card**: 각 섹션의 컨테이너
 * - **Chart**: CPU/비용 시계열 데이터 시각화 (AreaChart, LineChart)
 * - **Progress**: 오버프로비저닝 퍼센티지 표시
 * - **Badge**: 비용 변동 표시
 * - **Select**: 시간 범위, 가격 타입 선택
 * - **Tabs**: 탭 네비게이션
 * - **Tooltip**: 정보 아이콘 호버 시 설명 표시
 *
 * ## 주요 기능
 * - CPU/Memory 오버프로비저닝 현황 요약
 * - 도넛 차트로 리소스 사용량 시각화
 * - 시계열 Area/Line 차트로 리소스 및 비용 추이 표시
 * - 시간 범위 필터 (7일, 30일, 90일)
 * - 가격 타입 선택 (할인가, 정가)
 */
const meta: Meta<typeof ChartClusterDashboard> = {
  title: "templates/Test/Chart Cluster Dashboard",
  component: ChartClusterDashboard,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ChartClusterDashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 클러스터 대시보드 뷰
 *
 * CAST AI 스타일의 클러스터 효율성 모니터링 대시보드를 표시합니다.
 */
export const Default: Story = {};
