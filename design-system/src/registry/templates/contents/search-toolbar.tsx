"use client";

import React from "react";
import {
  ArrowUp,
  ArrowDown,
  X,
  CaseSensitive,
  WholeWord,
  Regex,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton,
} from "@/components/ui/input-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * 🎯 목적: 검색 툴바 컴포넌트 Props 타입 정의
 */
interface SearchToolbarProps {
  /** 🎯 목적: 검색어 값 */
  searchValue?: string;
  /** 🎯 목적: 검색어 변경 핸들러 */
  onSearchChange?: (value: string) => void;
  /** 🎯 목적: 검색 실행 핸들러 */
  onSearch?: (value: string) => void;
  /** 🎯 목적: 이전 검색 결과로 이동 */
  onPrevious?: () => void;
  /** 🎯 목적: 다음 검색 결과로 이동 */
  onNext?: () => void;
  /** 🎯 목적: 검색 툴바 닫기 */
  onClose?: () => void;
  /** 🎯 목적: 대소문자 구분 토글 */
  onCaseSensitiveToggle?: (enabled: boolean) => void;
  /** 🎯 목적: 전체 단어 일치 토글 */
  onWholeWordToggle?: (enabled: boolean) => void;
  /** 🎯 목적: 정규식 사용 토글 */
  onRegexToggle?: (enabled: boolean) => void;
  /** 🎯 목적: 플레이스홀더 텍스트 */
  placeholder?: string;
  /** 🎯 목적: 검색 결과 정보 */
  resultsInfo?: string;
  /** 🎯 목적: 검색 결과 정보 텍스트 커스텀 클래스명 */
  resultsInfoClassName?: string;
  /** 🎯 목적: 대소문자 구분 활성화 상태 */
  caseSensitive?: boolean;
  /** 🎯 목적: 전체 단어 일치 활성화 상태 */
  wholeWord?: boolean;
  /** 🎯 목적: 정규식 사용 활성화 상태 */
  useRegex?: boolean;
  /** 🎯 목적: 비활성화 상태 */
  disabled?: boolean;
  /** 🎯 목적: 커스텀 클래스명 */
  className?: string;
}

/**
 * 🎯 목적: 코드 에디터형 검색 툴바 컴포넌트
 *
 * ✨ 특징:
 * - 검색 입력 필드 (히스토리 힌트 포함)
 * - 대소문자 구분 및 전체 단어 일치 토글
 * - 이전/다음 검색 결과 네비게이션
 * - 검색 결과 정보 표시
 * - 검색 툴바 닫기 기능
 * - 다크 테마 지원
 */
export function SearchToolbar({
  searchValue = "",
  onSearchChange,
  onSearch,
  onPrevious,
  onNext,
  onClose,
  onCaseSensitiveToggle,
  onWholeWordToggle,
  onRegexToggle,
  placeholder = "Find (↑↓ for history)",
  resultsInfo = "No results",
  resultsInfoClassName = "",
  caseSensitive = false,
  wholeWord = false,
  useRegex = false,
  disabled = false,
  className = "",
}: SearchToolbarProps) {
  const [searchInput, setSearchInput] = React.useState(searchValue);

  /**
   * 🎯 목적: 검색어 입력 처리
   */
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearchChange?.(value);
  };

  /**
   * 🎯 목적: 검색 실행 처리 (Enter 키)
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch?.(searchInput);
    }
  };

  /**
   * 🎯 목적: 대소문자 구분 토글 처리
   */
  const handleCaseSensitiveClick = () => {
    onCaseSensitiveToggle?.(!caseSensitive);
  };

  /**
   * 🎯 목적: 전체 단어 일치 토글 처리
   */
  const handleWholeWordClick = () => {
    onWholeWordToggle?.(!wholeWord);
  };

  /**
   * 🎯 목적: 정규식 사용 토글 처리
   */
  const handleRegexClick = () => {
    onRegexToggle?.(!useRegex);
  };

  React.useEffect(() => {
    setSearchInput(searchValue);
  }, [searchValue]);

  return (
    <div
      className={`bg-background flex items-center gap-2 rounded-r-lg border py-1.5 pr-2 pl-2.5 shadow-sm ${disabled ? "opacity-50" : ""} ${className}`}
    >
      {/* 검색 입력 그룹 */}
      <InputGroup style={{ width: "var(--input-group-width, 300px)" }}>
        <InputGroupInput
          value={searchInput}
          onChange={handleSearchInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="text-sm"
        />
        <InputGroupAddon align="inline-end" className="gap-0.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <InputGroupButton
                variant="ghost"
                size="icon-xs"
                onClick={handleCaseSensitiveClick}
                disabled={disabled}
                className={`${caseSensitive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                aria-label="Match Case"
              >
                <CaseSensitive className="h-4 w-4" />
              </InputGroupButton>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={5}>
              <p>Match Case</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <InputGroupButton
                variant="ghost"
                size="icon-xs"
                onClick={handleWholeWordClick}
                disabled={disabled}
                className={`${wholeWord ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                aria-label="Match Whole Word"
              >
                <WholeWord className="h-4 w-4" />
              </InputGroupButton>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={5}>
              <p>Match Whole Word</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <InputGroupButton
                variant="ghost"
                size="icon-xs"
                onClick={handleRegexClick}
                disabled={disabled}
                className={`${useRegex ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                aria-label="Use Regular Expression"
              >
                <Regex className="h-4 w-4" />
              </InputGroupButton>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={5}>
              <p>Use Regular Expression</p>
            </TooltipContent>
          </Tooltip>
        </InputGroupAddon>
      </InputGroup>

      {/* 검색 결과 정보 */}
      <div
        className={`w-[74px] text-sm whitespace-nowrap ${resultsInfoClassName || "text-muted-foreground"}`}
      >
        {resultsInfo}
      </div>

      {/* 네비게이션 버튼들 */}
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={onPrevious}
          disabled={disabled}
          className="h-8 w-8 p-0 opacity-50 hover:opacity-100"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onNext}
          disabled={disabled}
          className="h-8 w-8 p-0 opacity-50 hover:opacity-100"
        >
          <ArrowDown className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          disabled={disabled}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
