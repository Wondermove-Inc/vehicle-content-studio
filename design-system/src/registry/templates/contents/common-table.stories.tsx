import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CommonTable } from "./common-table";

/**
 * CommonTable 컴포넌트 - Kubernetes 리소스 테이블 인터페이스
 *
 * 특징:
 * - 네임스페이스 드롭다운과 검색 기능이 포함된 상단 메뉴
 * - 7개 열을 가진 데이터 테이블
 * - 텍스트, 링크, 뱃지, 액션 버튼 등 다양한 셀 타입
 * - shadcn/ui 컴포넌트 활용한 일관된 디자인
 */
const meta: Meta<typeof CommonTable> = {
  title: "templates/Contents/CommonTable",
  component: CommonTable,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CommonTable>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 CommonTable - 완전한 리소스 테이블 레이아웃
 */
export const Default: Story = {
  render: () => <CommonTable />,
};

/**
 * Install 스토리 - 패키지 설치 정보를 표시하는 CommonTable (Version, Home, Maintainers, Keywords)
 */
export const Install: Story = {
  render: () => <CommonTable contentType="install" />,
};

/**
 * Chart Data - 속성 패널에 차트가 포함된 CommonTable
 */
export const ChartData: Story = {
  render: () => <CommonTable showChart={true} />,
};
