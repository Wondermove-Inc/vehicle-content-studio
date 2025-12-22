import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { BrowserRouter } from "react-router-dom";
import { ChartData } from "./chart-data";

/**
 * 차트와 테이블 조합의 모니터링 차트데이터 입니다.
 */
const meta: Meta<typeof ChartData> = {
  title: "templates/Contents/Chart Data",
  component: ChartData,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ChartData>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/**
 * 데이터가 없는 상태의 차트 컴포넌트입니다.
 */
export const DefaultNodata: Story = {
  render: () => <ChartData variant="no-data" />,
};

/**
 * 개요 대시보드 상태의 차트 컴포넌트입니다.
 */
export const Overview: Story = {
  render: () => (
    <BrowserRouter>
      <ChartData variant="overview" />
    </BrowserRouter>
  ),
};
