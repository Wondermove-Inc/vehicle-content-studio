import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { ChartContainer } from "@/components/ui/chart";

// Import all tooltip chart components
import { ChartTooltipDefault } from "./tooltip-default";
import { ChartTooltipLineIndicator } from "./tooltip-line-indicator";
import { ChartTooltipNoIndicator } from "./tooltip-no-indicator";
import { ChartTooltipCustomLabel } from "./tooltip-custom-label";
import { ChartTooltipLabelFormatter } from "./tooltip-label-formatter";
import { ChartTooltipNoLabel } from "./tooltip-no-label";
import { ChartTooltipFormatter } from "./tooltip-formatter";
import { ChartTooltipIcons } from "./tooltip-icons";
import { ChartTooltipAdvanced } from "./tooltip-advanced";

const meta = {
  title: "ui/Chart/Tooltips",
  component: ChartContainer,
  tags: ["autodocs"],
} satisfies Meta<typeof ChartContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * 기본 툴팁이 적용된 Area Chart입니다. 마우스 오버 시 데이터 포인트 정보를 보여주는
 * 표준 툴팁으로, 가장 일반적인 차트 상호작용 방식을 제공합니다.
 */
export const Default: Story = {
  // @ts-expect-error - Storybook 타입 시스템이 component: ChartContainer와 render 함수 조합을 올바르게 처리하지 못합니다
  args: {},
  render: () => <ChartTooltipDefault />,
};

/**
 * 라인 인디케이터가 있는 툴팁입니다. 마우스 오버 시 세로 점선이 표시되어
 * 정확한 데이터 포인트 위치를 시각적으로 강조합니다. 정밀한 데이터 읽기가 필요할 때 유용합니다.
 */
export const LineIndicator: Story = {
  // @ts-expect-error - Storybook 타입 시스템이 component: ChartContainer와 render 함수 조합을 올바르게 처리하지 못합니다
  args: {},
  render: () => <ChartTooltipLineIndicator />,
};

/**
 * 시각적 인디케이터가 없는 툴팁입니다. 깔끔한 UI를 위해 마우스 커서나 라인 표시 없이
 * 툴팁만 표시합니다. 미니멀한 디자인이나 복잡한 차트에서 시각적 노이즈를 줄일 때 적합합니다.
 */
export const NoIndicator: Story = {
  // @ts-expect-error - Storybook 타입 시스템이 component: ChartContainer와 render 함수 조합을 올바르게 처리하지 못합니다
  args: {},
  render: () => <ChartTooltipNoIndicator />,
};

/**
 * 커스텀 레이블이 적용된 툴팁입니다. 툴팁 레이블의 텍스트와 포맷을 사용자 정의하여
 * 브랜드나 용도에 맞게 조정할 수 있습니다. 특별한 명명 규칙이나 다국어 지원이 필요할 때 활용합니다.
 */
export const CustomLabel: Story = {
  // @ts-expect-error - Storybook 타입 시스템이 component: ChartContainer와 render 함수 조합을 올바르게 처리하지 못합니다
  args: {},
  render: () => <ChartTooltipCustomLabel />,
};

/**
 * 레이블 포맷터가 적용된 툴팁입니다. 레이블 표시 방식을 완전히 커스터마이징하여
 * 복잡한 레이아웃이나 추가 정보를 포함할 수 있습니다. 고급 데이터 표시가 필요한 대시보드에 적합합니다.
 */
export const LabelFormatter: Story = {
  // @ts-expect-error - Storybook 타입 시스템이 component: ChartContainer와 render 함수 조합을 올바르게 처리하지 못합니다
  args: {},
  render: () => <ChartTooltipLabelFormatter />,
};

/**
 * 레이블이 숨겨진 툴팁입니다. 제목이나 범주 정보 없이 데이터 값만 표시하여
 * 더욱 간결한 정보 전달을 구현합니다. 반복적인 레이블이 불필요하거나 공간이 제한적일 때 사용합니다.
 */
export const NoLabel: Story = {
  // @ts-expect-error - Storybook 타입 시스템이 component: ChartContainer와 render 함수 조합을 올바르게 처리하지 못합니다
  args: {},
  render: () => <ChartTooltipNoLabel />,
};

/**
 * 커스텀 포맷터가 적용된 툴팁입니다. 데이터 값의 표시 방식을 완전히 커스터마이징하여
 * 색상 인디케이터, 단위, 추가 텍스트 등을 자유롭게 조합할 수 있습니다.
 */
export const Formatter: Story = {
  // @ts-expect-error - Storybook 타입 시스템이 component: ChartContainer와 render 함수 조합을 올바르게 처리하지 못합니다
  args: {},
  render: () => <ChartTooltipFormatter />,
};

/**
 * 아이콘이 포함된 툴팁입니다. 각 데이터 시리즈에 의미있는 아이콘을 추가하여
 * 시각적 인식성과 사용자 경험을 향상시킵니다. 직관적인 카테고리 구분이 필요할 때 효과적입니다.
 */
export const Icons: Story = {
  // @ts-expect-error - Storybook 타입 시스템이 component: ChartContainer와 render 함수 조합을 올바르게 처리하지 못합니다
  args: {},
  render: () => <ChartTooltipIcons />,
};

/**
 * 고급 기능이 적용된 툴팁입니다. 여러 커스터마이징 기법을 조합하여
 * 최대한의 정보를 효과적으로 표시합니다. 복잡한 비즈니스 요구사항이나 전문적인 분석 도구에 적합합니다.
 */
export const Advanced: Story = {
  // @ts-expect-error - Storybook 타입 시스템이 component: ChartContainer와 render 함수 조합을 올바르게 처리하지 못합니다
  args: {},
  render: () => <ChartTooltipAdvanced />,
};

export const ShouldRenderChart: Story = {
  name: "when chart is rendered, should display chart container and content",
  tags: ["!dev", "!autodocs"],
  // @ts-expect-error - Storybook 타입 시스템이 component: ChartContainer와 render 함수 조합을 올바르게 처리하지 못합니다
  args: {},
  render: () => <ChartTooltipDefault />,
  play: async ({ canvasElement }) => {
    // 🎯 목적: Tooltip Chart가 정상적으로 렌더링되고 Chart container가 존재하는지 확인

    // ChartContainer가 렌더링되었는지 확인
    const chartContainer = canvasElement.querySelector("[data-chart]");
    await expect(chartContainer).toBeInTheDocument();
  },
};
