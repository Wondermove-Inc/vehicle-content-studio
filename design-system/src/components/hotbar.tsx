"use client";

import React from "react";
import {
  Files,
  Blocks,
  CircleGauge,
  FolderKanban,
  Server,
  CircleUserRound,
  Settings,
  BadgeCheck,
  Bell,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * 🎯 목적: Hotbar 아이템의 타입 정의 - 아이콘, 이미지, 텍스트 지원, Badge 표시 기능 포함
 */
export interface HotbarItem {
  id: string;
  icon?: React.ElementType; // lucide 아이콘 (선택적)
  imageUrl?: string; // 이미지 URL (선택적)
  text?: string; // 텍스트 아이콘 (선택적) - 예: "SI", "DA" 등
  label: string;
  isActive?: boolean;
  badge?: string | number; // Badge 텍스트 또는 숫자 (선택적)
  badgeVariant?: "default" | "secondary" | "destructive" | "outline"; // Badge 스타일 (선택적)
}

/**
 * 🎯 목적: Hotbar 컴포넌트의 Props 타입 정의
 */
interface HotbarProps {
  items?: HotbarItem[];
  footerItems?: HotbarItem[];
  activeItem?: string;
  onItemClick?: (itemId: string) => void;
  className?: string;
  user?: {
    name: string;
    email: string;
    avatar: string;
  };
}

/**
 * 🎯 목적: 기본 아이템 목록 - Explorer, Extensions, App 아이콘들을 하나의 그룹으로 통합
 */
const defaultHotbarItems: HotbarItem[] = [
  {
    id: "explorer",
    icon: Files,
    label: "Explorer",
    isActive: true,
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
  },
  {
    id: "skuber-management",
    icon: FolderKanban,
    label: "Skuber+ Management",
    isActive: false,
  },
  {
    id: "skuber-optimization",
    icon: Server,
    label: "Skuber+ Optimization",
    isActive: false,
  },
];

/**
 * 🎯 목적: Footer 아이템 목록 - UIDL 명세 적용
 */
const defaultFooterItems: HotbarItem[] = [
  {
    id: "user",
    icon: CircleUserRound,
    label: "User",
  },
  {
    id: "settings",
    icon: Settings,
    label: "Settings",
  },
];

/**
 * 🎯 목적: 기본 사용자 데이터 - CircleUserRound 버튼 클릭시 사용
 */
const defaultUser = {
  name: "사용자",
  email: "user@example.com",
  avatar: "",
};

/**
 * 🎯 목적: VS Code Activity Bar 스타일의 핫바 컴포넌트
 *
 * shadcn/ui 공식 패턴 적용:
 * - Sidebar, SidebarMenu, SidebarMenuButton 구조 사용
 * - SidebarFooter에서 NavUser 컴포넌트 활용
 * - 단일 그룹 구조로 모든 메인 아이템을 하나의 그룹에서 관리
 */
export function Hotbar({
  items = defaultHotbarItems,
  footerItems = defaultFooterItems,
  activeItem,
  onItemClick,
  className,
  user = defaultUser,
}: HotbarProps) {
  const { isMobile } = useSidebar();
  return (
    <Sidebar
      collapsible="none"
      className={cn("h-full w-12 border-r", className)}
    >
      <SidebarContent className="flex w-12 flex-1 flex-col justify-between">
        {/* 메인 아이템 그룹 - 단일 그룹으로 통합 */}
        <div className="w-12">
          <SidebarGroup className="w-12 p-2">
            <SidebarGroupContent className="flex flex-col gap-2 px-0">
              <SidebarMenu className="w-8 gap-2">
                {items.map((item) => {
                  // 전체 그룹: activeItem이 설정된 경우 그것만 사용, 아니면 기본 isActive 사용
                  const isActive = activeItem
                    ? activeItem === item.id
                    : item.isActive;
                  return (
                    <SidebarMenuItem key={item.id} className="relative">
                      {/* VS Code 스타일 활성화 표시 - Hotbar 좌측 경계에 붙은 border */}
                      {isActive && (
                        <div className="bg-primary absolute top-1/2 -left-2 h-8 w-[2px] -translate-y-1/2 rounded-r-sm" />
                      )}
                      <SidebarMenuButton
                        tooltip={{
                          children: item.label,
                          hidden: false,
                        }}
                        onClick={() => onItemClick?.(item.id)}
                        isActive={isActive}
                        className={cn(
                          "h-8 w-8 items-center justify-center p-0",
                          !isActive && "text-muted-foreground",
                        )}
                        size="sm"
                      >
                        {/* 이미지, 아이콘, 텍스트 조건부 렌더링 */}
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.label}
                            className="h-8 w-8"
                          />
                        ) : item.icon ? (
                          <item.icon />
                        ) : item.text ? (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 p-0 text-xs font-semibold"
                          >
                            {item.text}
                          </Button>
                        ) : null}
                        <span className="sr-only">{item.label}</span>
                      </SidebarMenuButton>

                      {/* Badge 표시 - 아이콘 우상단에 배치 */}
                      {item.badge && (
                        <Badge
                          variant={item.badgeVariant || "destructive"}
                          className="absolute -top-1 -right-1 h-4 min-w-[16px] px-1 text-[10px] leading-none font-semibold"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {/* 푸터 그룹 - 하단에 고정 */}
        <div className="flex w-12 flex-col items-center gap-2 p-2">
          {footerItems.map((item) => {
            // Footer 아이템들은 독립적으로 동작 (User는 드롭다운, Settings는 일반 버튼)
            const isActive = item.isActive;

            // User 버튼인 경우 드롭다운 메뉴 적용
            if (item.id === "user") {
              return (
                <DropdownMenu key={item.id}>
                  <DropdownMenuTrigger asChild>
                    <div className="relative">
                      <SidebarMenuButton
                        tooltip={{
                          children: item.label,
                          hidden: false,
                        }}
                        isActive={isActive}
                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground h-8 w-8 items-center justify-center p-0"
                        size="sm"
                      >
                        {/* 이미지 또는 아이콘 조건부 렌더링 */}
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.label}
                            className="h-6 w-6 object-contain"
                          />
                        ) : item.icon ? (
                          <item.icon />
                        ) : null}
                        <span className="sr-only">{item.label}</span>
                      </SidebarMenuButton>

                      {/* Badge 표시 - 아이콘 우상단에 배치 */}
                      {item.badge && (
                        <Badge
                          variant={item.badgeVariant || "destructive"}
                          className="absolute -top-1 -right-1 h-4 min-w-[16px] px-1 text-[10px] leading-none font-semibold"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                    side={isMobile ? "bottom" : "right"}
                    align="end"
                    sideOffset={4}
                  >
                    <DropdownMenuLabel className="p-0 font-normal">
                      <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 rounded-lg">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="rounded-lg">
                            {user.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                          <span className="truncate font-semibold">
                            {user.name}
                          </span>
                          <span className="truncate text-xs">{user.email}</span>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Sparkles />
                        업그레이드
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <BadgeCheck />
                        계정
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CreditCard />
                        결제
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Bell />
                        알림
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut />
                      로그아웃
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }

            // 다른 버튼들 (Settings 등)은 기본 버튼으로 처리
            return (
              <div key={item.id} className="relative">
                <SidebarMenuButton
                  tooltip={{
                    children: item.label,
                    hidden: false,
                  }}
                  onClick={() => onItemClick?.(item.id)}
                  isActive={isActive}
                  className="h-8 w-8 items-center justify-center p-0"
                  size="sm"
                >
                  {/* 이미지 또는 아이콘 조건부 렌더링 */}
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.label}
                      className="h-6 w-6 object-contain"
                    />
                  ) : item.icon ? (
                    <item.icon />
                  ) : null}
                  <span className="sr-only">{item.label}</span>
                </SidebarMenuButton>

                {/* Badge 표시 - 아이콘 우상단에 배치 */}
                {item.badge && (
                  <Badge
                    variant={item.badgeVariant || "destructive"}
                    className="absolute -top-1 -right-1 h-4 min-w-[16px] px-1 text-[10px] leading-none font-semibold"
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
            );
          })}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
