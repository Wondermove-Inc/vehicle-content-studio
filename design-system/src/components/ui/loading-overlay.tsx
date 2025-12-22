"use client";

import React from "react";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface LoadingOverlayProps {
  /** 🎯 목적: 로딩 오버레이 표시 여부 */
  isVisible: boolean;
  /** 🎯 목적: 로딩 메시지 (선택사항) */
  message?: string;
  /** 🎯 목적: 스피너 크기 커스터마이징 */
  size?: "sm" | "md" | "lg" | "xl";
  /** 🎯 목적: 커스텀 클래스명 */
  className?: string;
}

const sizeClasses = {
  sm: "size-6", // 24px
  md: "size-8", // 32px
  lg: "size-12", // 48px
  xl: "size-16", // 64px
};

/**
 * 🎯 목적: shadcn/ui 패턴을 따르는 전체 화면 로딩 오버레이 컴포넌트
 *
 * ✨ 특징:
 * - shadcn/ui Spinner 컴포넌트 기반 (흰색 고정 색상)
 * - 검은색 배경 딤드 (bg-black/50) - light/dark 모드 모두 일관된 딤드 효과
 * - 부드러운 fade 애니메이션
 * - 선택적 로딩 메시지 표시
 * - 접근성 고려 (aria-label, role)
 */
export function LoadingOverlay({
  isVisible,
  message,
  size = "lg",
  className,
}: LoadingOverlayProps) {
  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center",
        "bg-black/50 backdrop-saturate-150",
        "animate-in fade-in-0 duration-200",
        className,
      )}
      role="dialog"
      aria-label="Loading"
      aria-live="polite"
    >
      {/* 🎯 목적: 로딩 콘텐츠 컨테이너 */}
      <div className="flex flex-col items-center gap-4">
        {/* 🎯 목적: shadcn/ui Spinner 컴포넌트 사용 (흰색 고정) */}
        <Spinner className={cn(sizeClasses[size], "text-white")} />

        {/* 🎯 목적: 선택적 로딩 메시지 */}
        {message && (
          <p className="text-muted-foreground text-sm font-medium">{message}</p>
        )}
      </div>
    </div>
  );
}
