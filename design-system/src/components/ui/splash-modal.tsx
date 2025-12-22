"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * 🎯 목적: 앱 로딩 시 브랜딩/로고를 표시하는 스플래시 모달 컴포넌트
 * 📝 기능: 로고, 브랜드명, 태그라인, 프로그레스 바를 순차적으로 애니메이션
 * 🔄 동작: isLoading이 false가 되면 페이드아웃 후 onComplete 콜백 호출
 */

export interface SplashModalProps {
  /** 로딩 상태 - false가 되면 모달이 닫힘 */
  isLoading?: boolean;
  /** 로고 요소 (이미지, 아이콘, SVG 등) */
  logo?: React.ReactNode;
  /** 브랜드명 텍스트 */
  brandName?: string;
  /** 태그라인 또는 서브 텍스트 */
  tagline?: string;
  /** 로딩 진행률 (0-100) - 설정 시 프로그레스 바 표시 */
  progress?: number;
  /** 모달이 완전히 닫힌 후 호출되는 콜백 */
  onComplete?: () => void;
  /** 추가 클래스명 */
  className?: string;
}

/**
 * 🎯 목적: 브랜드명을 글자별로 순차 애니메이션하는 컴포넌트
 * 📝 동작: 각 글자가 50ms 간격으로 페이드인 + 슬라이드업
 */
function AnimatedText({
  text,
  className,
  startDelay = 400,
}: {
  text: string;
  className?: string;
  startDelay?: number;
}) {
  return (
    <span className={cn("inline-flex", className)}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="animate-[splash-letter_0.4s_ease-out_forwards] opacity-0"
          style={{
            animationDelay: `${startDelay + index * 50}ms`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

/**
 * 🎯 목적: 앱 시작 시 브랜딩을 표시하는 스플래시 모달
 * 📝 애니메이션 시퀀스:
 *   1. 로고: scale(0→1) + rotate (0-600ms)
 *   2. 브랜드명: 글자별 순차 페이드인 (400-1000ms)
 *   3. 태그라인: 슬라이드업 + 페이드 (800-1200ms)
 *   4. 프로그레스: 로딩 진행률 표시 (로딩 중)
 *   5. 전체: 페이드아웃 + 스케일업 (로딩 완료 시)
 */
function SplashModal({
  isLoading = true,
  logo,
  brandName = "Brand",
  tagline,
  progress,
  onComplete,
  className,
}: SplashModalProps) {
  // 🎯 모달 가시성 상태 관리
  const [isVisible, setIsVisible] = React.useState(true);
  // 🎯 닫힘 애니메이션 트리거 상태
  const [isClosing, setIsClosing] = React.useState(false);

  // 🎯 로딩 완료 시 닫힘 애니메이션 시작
  React.useEffect(() => {
    if (!isLoading && !isClosing) {
      setIsClosing(true);
      // 닫힘 애니메이션 완료 후 모달 숨김
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 500); // 페이드아웃 애니메이션 시간
      return () => clearTimeout(timer);
    }
  }, [isLoading, isClosing, onComplete]);

  // 🎯 모달이 보이지 않으면 렌더링하지 않음
  if (!isVisible) return null;

  return (
    <div
      data-slot="splash-modal-overlay"
      className={cn(
        // 🎯 오버레이: 전체 화면 덮기 + 중앙 정렬
        "fixed inset-0 z-50 flex items-center justify-center",
        // 배경 어둡게
        "bg-black/50",
        // 닫힘 애니메이션
        isClosing && "animate-[splash-exit_0.5s_ease-in-out_forwards]",
      )}
      role="dialog"
      aria-modal="true"
      aria-label="앱 로딩 중"
    >
      <div
        data-slot="splash-modal"
        className={cn(
          // 🎯 모달 컨테이너: 400px 너비 + 상하좌우 28px 패딩
          "flex h-auto w-[400px] flex-col items-center gap-4 p-7",
          // Dialog 스타일 적용: rounded-lg shadow-lg + 반투명 흰색 border
          "overflow-hidden rounded-lg border border-white/30 shadow-lg",
          className,
        )}
        style={{
          backgroundImage: "url('/images/apps/splash-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          // 🎯 배경 이미지가 border 영역까지 확장되도록 설정
          backgroundOrigin: "border-box",
          backgroundClip: "border-box",
        }}
      >
        {/* 로고 + 브랜드명 그룹 (gap-1.5 = 6px) */}
        <div className="flex flex-col items-center gap-1.5">
          {/* 로고 영역 */}
          {logo && <div>{logo}</div>}

          {/* 브랜드명 */}
          <h1 className="text-3xl leading-normal font-light text-white">
            {brandName}
          </h1>
        </div>

        {/* 태그라인 */}
        {tagline && (
          <p
            className="text-muted-foreground mt-2 animate-[splash-tagline_0.4s_ease-out_forwards] text-lg opacity-0"
            style={{ animationDelay: "800ms" }}
          >
            {tagline}
          </p>
        )}

        {/* 프로그레스 바 */}
        {progress !== undefined && (
          <div
            className="mt-8 w-64 animate-[splash-tagline_0.4s_ease-out_forwards] opacity-0"
            style={{ animationDelay: "1000ms" }}
          >
            <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
              <div
                className="bg-primary h-full rounded-full transition-all duration-300 ease-out"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              />
            </div>
            <p className="text-muted-foreground mt-2 text-center text-sm">
              {Math.round(progress)}%
            </p>
          </div>
        )}

        {/* 로딩 인디케이터 (프로그레스가 없을 때) */}
        {progress === undefined && (
          <div className="flex w-full items-center justify-center gap-1">
            {/* 🎯 회전하는 로더 아이콘 (16x16) */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="animate-spin"
            >
              <path
                d="M14 8.00029C13.9999 9.26735 13.5988 10.5019 12.854 11.5269C12.1092 12.552 11.059 13.3149 9.85392 13.7064C8.64886 14.0979 7.3508 14.0979 6.14576 13.7063C4.94073 13.3147 3.89059 12.5517 3.14584 11.5266C2.4011 10.5016 1.99999 9.26702 2 7.99996C2.00001 6.7329 2.40114 5.49837 3.14589 4.47329C3.89065 3.44822 4.9408 2.68523 6.14584 2.29368C7.35088 1.90212 8.64895 1.90211 9.854 2.29363"
                stroke="#FAFAFA"
                strokeWidth="1.33"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {/* 🎯 로딩 텍스트 */}
            <span className="text-center text-sm leading-none font-light text-white">
              Loading...
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export { SplashModal, AnimatedText };
