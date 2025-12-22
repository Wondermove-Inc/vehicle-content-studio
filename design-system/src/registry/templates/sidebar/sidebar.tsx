"use client";

import React from "react";
import { ResizableAppSidebar } from "@/components/resizable-app-sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

/**
 * 🎯 목적: Sidebar 템플릿의 Props 타입 정의
 */
interface SidebarTemplateProps {
  children?: React.ReactNode;
  /** 🎯 목적: 사이드바 초기 크기 (퍼센트, 기본값: 25%) */
  defaultSidebarSize?: number;
  /** 🎯 목적: 사이드바 최소 크기 (퍼센트, 기본값: 15%) */
  minSidebarSize?: number;
  /** 🎯 목적: 사이드바 최대 크기 (퍼센트, 기본값: 50%) */
  maxSidebarSize?: number;
}

/**
 * 🎯 목적: 드래그 리사이즈 기능이 있는 사이드바 레이아웃 템플릿 컴포넌트
 * ResizablePanelGroup을 사용하여 사이드바와 메인 콘텐츠 영역을 리사이즈 가능하게 구현
 * 📝 특징:
 * - 드래그로 사이드바 너비 조절 가능 (퍼센트 단위)
 * - 최소/최대 크기 제한 설정 가능
 * - 사이드바 border가 리사이즈 핸들 역할
 * - SidebarProvider 없이 독립적인 구조
 */
export function SidebarTemplate({
  children,
  defaultSidebarSize = 25,
  minSidebarSize = 15,
  maxSidebarSize = 50,
}: SidebarTemplateProps) {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-screen w-full">
      {/* 🎯 목적: 리사이즈 가능한 사이드바 패널 (퍼센트 단위) */}
      <ResizablePanel
        defaultSize={defaultSidebarSize}
        minSize={minSidebarSize}
        maxSize={maxSidebarSize}
      >
        <ResizableAppSidebar className="border-r" />
      </ResizablePanel>

      {/* 🎯 목적: 사이드바 border가 리사이즈 핸들 역할 */}
      <ResizableHandle className="w-1 cursor-col-resize bg-transparent transition-colors hover:bg-blue-500/20 active:bg-blue-500/30" />

      {/* 🎯 목적: 메인 콘텐츠 영역 패널 (자동으로 나머지 공간 차지) */}
      <ResizablePanel>
        <div className="flex flex-1 flex-col overflow-auto p-4">{children}</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
