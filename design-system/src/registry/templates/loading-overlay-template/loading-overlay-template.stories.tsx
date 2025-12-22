import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";

/**
 * LoadingOverlay 템플릿은 클러스터 연결 등 로딩 상태를 표시하는 Alert 기반 컴포넌트입니다.
 * shadcn/ui Alert와 Spinner 컴포넌트를 활용한 다크 테마 디자인입니다.
 */
const meta: Meta = {
  title: "templates/LoadingOverlay",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
클러스터 연결 등 로딩 상태를 표시하는 Alert 기반 템플릿입니다.
Spinner와 상태 메시지를 통해 사용자에게 진행 상황을 알려줍니다.
        `,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 LoadingOverlay - 클러스터 연결 상태 표시
 */
export const Default: Story = {
  render: () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <Alert className="bg-card max-w-[400px] rounded-[10px]">
        <Spinner />
        <AlertTitle>Connecting cluster-prod-01...</AlertTitle>
        <AlertDescription>
          Starting connection...
          <br />
          Authentication proxy started
          <br />
          Refreshing connection status...
          <br />
          Refreshing cluster accessibility...
        </AlertDescription>
      </Alert>
    </div>
  ),
};
