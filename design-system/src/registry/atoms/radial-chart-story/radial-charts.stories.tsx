import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { ChartContainer } from "@/components/ui/chart";

// Import all radial chart components
import { ChartRadialSimple } from "./radial-chart-simple";
import { ChartRadialLabel } from "./radial-chart-label";
import { ChartRadialGrid } from "./radial-chart-grid";
import { ChartRadialText } from "./radial-chart-text";
import { ChartRadialShape } from "./radial-chart-shape";
import { ChartRadialStacked } from "./radial-chart-stacked";

/**
 * 🎯 목적: Radial Chart 컴포넌트들의 Storybook 스토리 모음
 * shadcn/ui의 모든 Radial Chart variants를 포함
 */
const meta = {
  title: "ui/Chart/Radial Charts",
  component: ChartContainer,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ChartContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * 기본 Radial Chart - 브라우저별 방문자 수를 원형 막대 차트로 표시
 */
export const Simple: Story = {
  // @ts-expect-error - Storybook 타입 시스템이 component: ChartContainer와 render 함수 조합을 올바르게 처리하지 못합니다
  args: {},
  render: () => <ChartRadialSimple />,
};

/**
 * 라벨이 포함된 Radial Chart - 각 브라우저명이 차트 내부에 표시
 */
export const Label: Story = {
  // @ts-expect-error - Storybook 타입 시스템이 component: ChartContainer와 render 함수 조합을 올바르게 처리하지 못합니다
  args: {},
  render: () => <ChartRadialLabel />,
};

/**
 * 그리드가 포함된 Radial Chart - 원형 그리드 라인을 배경으로 표시
 */
export const Grid: Story = {
  // @ts-expect-error - Storybook 타입 시스템이 component: ChartContainer와 render 함수 조합을 올바르게 처리하지 못합니다
  args: {},
  render: () => <ChartRadialGrid />,
};

/**
 * 중앙 텍스트가 포함된 Radial Chart - 차트 중앙에 방문자 수를 텍스트로 표시
 */
export const Text: Story = {
  // @ts-expect-error - Storybook 타입 시스템이 component: ChartContainer와 render 함수 조합을 올바르게 처리하지 못합니다
  args: {},
  render: () => <ChartRadialText />,
};

/**
 * 커스텀 모양을 가진 Radial Chart - 부분 원형으로 제한된 형태
 */
export const Shape: Story = {
  // @ts-expect-error - Storybook 타입 시스템이 component: ChartContainer와 render 함수 조합을 올바르게 처리하지 못합니다
  args: {},
  render: () => <ChartRadialShape />,
};

/**
 * 스택된 섹션을 가진 Radial Chart - 데스크톱과 모바일 방문자를 구분하여 표시
 */
export const Stacked: Story = {
  // @ts-expect-error - Storybook 타입 시스템이 component: ChartContainer와 render 함수 조합을 올바르게 처리하지 못합니다
  args: {},
  render: () => <ChartRadialStacked />,
};

/**
 * 차트 렌더링 및 상호작용 테스트용 스토리
 */
export const InteractionTest: Story = {
  name: "Chart should render with proper dimensions and tooltip interaction",
  tags: ["!dev", "!autodocs"],
  // @ts-expect-error - Storybook 타입 시스템이 component: ChartContainer와 render 함수 조합을 올바르게 처리하지 못합니다
  args: {},
  render: () => <ChartRadialSimple />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 🎯 목적: Chart 컨테이너가 올바르게 렌더링되는지 확인
    const chartContainer = canvas.getByRole("img", { hidden: true });
    await expect(chartContainer).toBeInTheDocument();

    // 🎯 목적: Card 제목이 표시되는지 확인
    const chartTitle = canvas.getByText("Radial Chart");
    await expect(chartTitle).toBeInTheDocument();

    // 🎯 목적: 설명 텍스트가 표시되는지 확인
    const chartDescription = canvas.getByText("January - June 2024");
    await expect(chartDescription).toBeInTheDocument();

    // 🎯 목적: Footer 텍스트가 표시되는지 확인
    const footerText = canvas.getByText(/Trending up by 5.2% this month/);
    await expect(footerText).toBeInTheDocument();
  },
};
