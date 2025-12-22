import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, X } from "lucide-react";

/**
 * UpdateBanner 컴포넌트
 *
 * 🎯 목적: 새 버전 업데이트 알림 배너
 * ✨ 특징:
 * - 기본 크기: 284x134px (width 최소 284px, 더 늘어날 수 있음, height 고정)
 * - 그라디언트 배경과 오버레이 이미지
 * - 24px Avatar 아이콘
 * - 버전 정보와 업데이트 버튼
 * - 닫기 버튼
 */
function UpdateBanner() {
  return (
    <Card
      className="border-border relative h-[134px] w-full min-w-[284px] !gap-0 overflow-hidden border !p-0 !px-0 !py-0 shadow-none"
      style={{
        borderRadius: 10,
      }}
    >
      {/* 배경 이미지 - 카드 전체를 덮음 */}
      <div
        className="absolute inset-0 z-0 h-full w-full"
        style={{
          backgroundImage: 'url("/images/apps/bg.png")',
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
        }}
      />

      {/* 닫기 버튼 */}
      <button
        className="absolute top-3 right-3 z-10 opacity-70 transition-opacity hover:opacity-100"
        aria-label="Close"
      >
        <X className="h-4 w-4 text-slate-200" />
      </button>

      <div className="relative z-10 flex h-full flex-col p-3">
        {/* 상단 그룹: Avatar + Title + Subtitle */}
        <div className="flex flex-col gap-2">
          {/* Avatar 아이콘 */}
          <Avatar className="h-6 w-6">
            <AvatarImage
              src="/images/apps/notification-bell.png"
              alt="Update notification icon"
            />
            <AvatarFallback className="bg-white/20 text-xs text-white">
              U
            </AvatarFallback>
          </Avatar>

          {/* 헤더 텍스트 */}
          <div className="space-y-1.5">
            <h3 className="text-sm leading-none font-medium text-slate-50">
              Update Ready
            </h3>
            <p className="text-xs leading-none font-light text-slate-100">
              Version 1.0.2 is now available
            </p>
          </div>
        </div>

        {/* 하단: 업데이트 버튼 */}
        <Button
          variant="secondary"
          size="sm"
          className="mt-auto gap-2 self-end border border-white/20 bg-white/10 text-slate-50 hover:bg-white/20"
        >
          Update
          <ArrowUpRight className="h-4 w-4 text-slate-50" />
        </Button>
      </div>
    </Card>
  );
}

/**
 * UpdateBanner 스토리 - 업데이트 알림 배너
 *
 * baseStructure의 contents 영역에 들어갈 업데이트 알림을 제공합니다.
 * Card 컴포넌트를 기반으로 구현되었습니다.
 */
const meta: Meta<typeof UpdateBanner> = {
  title: "templates/Contents/UpdateBanner",
  component: UpdateBanner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof UpdateBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 UpdateBanner - 업데이트 알림 배너
 */
export const Default: Story = {};

/**
 * 인터랙션 테스트 - 버튼 클릭 동작 확인
 */
export const InteractionTest: Story = {
  tags: ["!dev", "!autodocs"],
  render: () => {
    const [isVisible, setIsVisible] = React.useState(true);

    if (!isVisible) {
      return (
        <div className="text-muted-foreground text-center">
          배너가 닫혔습니다.
        </div>
      );
    }

    return (
      <div
        className="border-border relative h-[134px] w-full min-w-[284px] overflow-hidden border"
        style={{
          borderRadius: 10,
        }}
      >
        {/* 배경 이미지 */}
        <div
          className="absolute inset-0 z-0 h-full w-full"
          style={{
            backgroundImage: 'url("/images/apps/bg.png")',
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            width: "100%",
            height: "100%",
          }}
        />

        <button
          className="absolute top-3 right-3 z-10 opacity-70 transition-opacity hover:opacity-100"
          onClick={() => setIsVisible(false)}
          aria-label="Close"
        >
          <X className="h-4 w-4 text-slate-200" />
        </button>

        <div className="relative z-10 flex h-full flex-col p-3">
          {/* 상단 그룹: Avatar + Title + Subtitle */}
          <div className="flex flex-col gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage
                src="/images/apps/notification-bell.png"
                alt="Update notification icon"
              />
              <AvatarFallback className="bg-white/20 text-xs text-white">
                U
              </AvatarFallback>
            </Avatar>

            <div className="space-y-1.5">
              <h3 className="text-sm leading-none font-medium text-slate-50">
                Update Ready
              </h3>
              <p className="text-xs leading-none font-light text-slate-100">
                Version 1.0.2 is now available
              </p>
            </div>
          </div>

          {/* 하단: 업데이트 버튼 */}
          <Button
            variant="secondary"
            size="sm"
            className="mt-auto gap-2 self-end border border-white/20 bg-white/10 text-slate-50 hover:bg-white/20"
            onClick={() => alert("업데이트 시작!")}
          >
            Update
            <ArrowUpRight className="h-4 w-4 text-slate-50" />
          </Button>
        </div>
      </div>
    );
  },
};
