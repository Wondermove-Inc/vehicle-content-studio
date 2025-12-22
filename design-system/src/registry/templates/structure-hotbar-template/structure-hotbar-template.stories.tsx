import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Files, Blocks, CircleGauge, FolderKanban, Server } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Hotbar } from "@/components/hotbar";

/**
 * VS Code Activity Bar 스타일의 Hotbar 템플릿입니다.
 *
 * 🎯 목적: 독립적으로 사용 가능한 Hotbar 컴포넌트 데모
 * ✨ 특징:
 * - VS Code Activity Bar와 동일한 세로 아이콘 바
 * - Explorer, Extensions, Skuber+ Observability, Skuber+ Management 등 순서로 배치
 * - 활성/비활성 상태 시각적 표시
 * - 하단에 Settings, Account 아이콘 배치
 * - 전체 메인 그룹에서 단일 활성 상태 관리 (1개만 선택 가능)
 */
const meta = {
  title: "templates/Hotbar",
  component: Hotbar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `VS Code Activity Bar 스타일의 Hotbar 컴포넌트를 독립적으로 사용하는 템플릿입니다. Explorer, Extensions 기능 아이콘 다음에 Skuber+ Observability, Skuber+ Management, Skuber+ Optimization 등 애플리케이션 아이콘들이 배치되어 있으며, 전체 메인 그룹에서 단일 활성 상태로 관리됩니다.`,
      },
    },
  },
  decorators: [
    (Story) => (
      <SidebarProvider
        style={
          {
            "--sidebar-width-icon": "3rem", // 48px - 공식 shadcn/ui 방법
          } as React.CSSProperties
        }
      >
        <Story />
      </SidebarProvider>
    ),
  ],
} satisfies Meta<typeof Hotbar>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * VS Code Activity Bar 스타일의 기본 Hotbar 템플릿입니다.
 *
 * 🎯 목적: 독립적으로 사용 가능한 Hotbar 컴포넌트의 완전한 기능 데모
 * ✨ 특징:
 * - 단일 메인 그룹: Explorer, Extensions, Skuber+ Observability, Skuber+ Management, Skuber+ Optimization 순서로 배치
 * - 전체 그룹에서 단일 활성 상태 관리 (1개만 선택 가능)
 * - 클릭 시 상태 변경 및 시각적 피드백
 */
export const Default: Story = {
  render: () => {
    // 🎯 목적: 핫바 활성 아이템 상태 관리 - 단일 활성 상태
    const [activeItem, setActiveItem] = React.useState("explorer");

    // 🎯 목적: 핫바 아이템 클릭 핸들러 - 단일 활성 상태 관리
    const handleItemClick = (itemId: string) => {
      setActiveItem(itemId);
    };

    return (
      <div className="bg-background flex h-screen w-full">
        {/* VS Code Activity Bar 스타일 핫바 */}
        <Hotbar activeItem={activeItem} onItemClick={handleItemClick} />

        {/* 메인 콘텐츠 영역 */}
        <div className="flex flex-1 items-center justify-center p-8">
          <div className="text-center">
            <h2 className="mb-2 text-lg font-semibold">Hotbar 템플릿</h2>
            <p className="text-muted-foreground text-sm">
              VS Code Activity Bar 스타일의 Hotbar 컴포넌트입니다.
            </p>
            <p className="text-muted-foreground mt-2 text-xs">
              현재 활성 아이템:{" "}
              <span className="font-medium">{activeItem}</span>
            </p>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Hotbar에 Badge 표시 기능이 포함된 예제입니다.
 *
 * 🎯 목적: Hotbar 아이콘에 알림 Badge가 표시되는 데모
 * ✨ 특징:
 * - 기본 Hotbar 기능 + Badge 알림 표시
 * - 독립적인 상태 관리 (Default와 완전 분리)
 * - 각 아이콘별 개별 Badge 상태 제어
 * - 전체 그룹에서 단일 활성 상태 관리
 */
export const Badge: Story = {
  render: () => {
    // 🎯 목적: Badge 예제용 독립적인 핫바 활성 아이템 상태 관리 - 단일 활성 상태
    const [activeItem, setActiveItem] = React.useState("explorer");

    // 🎯 목적: Badge가 있는 메인 아이템 목록 - 단일 그룹으로 통합
    const itemsWithBadge = [
      {
        id: "explorer",
        icon: Files,
        label: "Explorer",
        isActive: false,
      },
      {
        id: "extensions",
        icon: Blocks,
        label: "Extensions",
        isActive: false,
      },
      {
        id: "skuber-observability",
        icon: CircleGauge,
        label: "Skuber+ Observability",
        isActive: false,
        badge: 8,
        badgeVariant: "secondary" as const,
      },
      {
        id: "skuber-management",
        icon: FolderKanban,
        label: "Skuber+ Management",
        isActive: false,
        badge: "N",
        badgeVariant: "destructive" as const,
      },
      {
        id: "skuber-optimization",
        icon: Server,
        label: "Skuber+ Optimization",
        isActive: false,
      },
    ];

    // 🎯 목적: Badge 예제용 독립적인 핫바 아이템 클릭 핸들러 - 단일 활성 상태 관리
    const handleItemClick = (itemId: string) => {
      setActiveItem(itemId);
    };

    return (
      <div className="bg-background flex h-screen w-full">
        {/* VS Code Activity Bar 스타일 핫바 - Badge 예제용 */}
        <Hotbar
          items={itemsWithBadge}
          activeItem={activeItem}
          onItemClick={handleItemClick}
        />

        {/* 메인 콘텐츠 영역 - Badge 예제 설명 */}
        <div className="flex flex-1 items-center justify-center p-8">
          <div className="text-center">
            <h2 className="mb-2 text-lg font-semibold">Hotbar Badge 예제</h2>
            <p className="text-muted-foreground text-sm">
              Hotbar 아이콘에 Badge 알림이 표시되는 예제입니다.
            </p>
            <p className="text-muted-foreground mt-2 text-xs">
              현재 활성 아이템:{" "}
              <span className="font-medium">{activeItem}</span>
            </p>
          </div>
        </div>
      </div>
    );
  },
};
