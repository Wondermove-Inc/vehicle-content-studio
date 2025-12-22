"use client";

import React from "react";
import { Search, Settings } from "lucide-react";

import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SidebarInset,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";

// 🎯 목적: 파일 트리 항목의 타입 정의 (AppSidebar에 정의된 것과 동일)
interface FileTreeItem {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: FileTreeItem[];
  extension?: string;
}

// 🎯 목적: 사이드바 토글 기능을 가진 헤더 컴포넌트
function HeaderWithToggle({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}) {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="border-border bg-background flex h-16 w-full shrink-0 items-center justify-between gap-2.5 border-b px-4 py-3">
      {/* 왼쪽 여백 */}
      <div className="flex items-center"></div>

      {/* 중앙 검색 영역 */}
      <div className="flex flex-grow items-center justify-center gap-2">
        <div className="border-border bg-background/[0.045] flex h-9 w-[373px] shrink-0 items-center gap-2 rounded-lg border px-3 py-1 shadow-sm">
          <div className="flex items-center justify-center gap-2">
            <Search className="text-muted-foreground h-4 w-4" />
          </div>
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-muted-foreground flex-grow border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>

      {/* 우측 버튼 그룹 */}
      <div className="flex items-center">
        <div className="flex items-center">
          {/* 패널 토글 버튼 - 사이드바 토글 기능 연결 */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="flex h-8 w-8 shrink-0 items-center justify-center gap-2 rounded-lg bg-transparent p-2"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 2V14M3.33333 2H12.6667C13.403 2 14 2.59695 14 3.33333V12.6667C14 13.403 13.403 14 12.6667 14H3.33333C2.59695 14 2 13.403 2 12.6667V3.33333C2 2.59695 2.59695 2 3.33333 2Z"
                stroke="currentColor"
                strokeWidth="1.33"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>

          {/* 하단 패널 토글 버튼 (비활성화) */}
          <Button
            variant="ghost"
            size="icon"
            className="flex h-8 w-8 shrink-0 items-center justify-center gap-2 rounded-lg bg-transparent p-2 opacity-50"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 10H14M3.33333 2H12.6667C13.403 2 14 2.59695 14 3.33333V12.6667C14 13.403 13.403 14 12.6667 14H3.33333C2.59695 14 2 13.403 2 12.6667V3.33333C2 2.59695 2.59695 2 3.33333 2Z"
                stroke="currentColor"
                strokeWidth="1.33"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>

          {/* AI 어시스턴트 버튼 */}
          <Button
            variant="ghost"
            size="icon"
            className="flex h-8 w-8 shrink-0 items-center justify-center gap-2 rounded-lg bg-transparent p-2"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.99998 5.33335V2.66669H5.33331M1.33331 9.33335H2.66665M13.3333 9.33335H14.6666M9.99998 8.66669V10M5.99998 8.66669V10M3.99998 5.33335H12C12.7364 5.33335 13.3333 5.93031 13.3333 6.66669V12C13.3333 12.7364 12.7364 13.3334 12 13.3334H3.99998C3.2636 13.3334 2.66665 12.7364 2.66665 12V6.66669C2.66665 5.93031 3.2636 5.33335 3.99998 5.33335Z"
                stroke="currentColor"
                strokeWidth="1.33"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>

          {/* 설정 버튼 */}
          <Button
            variant="ghost"
            size="icon"
            className="flex h-8 w-8 shrink-0 items-center justify-center gap-2 rounded-lg bg-transparent p-2"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}

// 🎯 목적: 메인 베이스 구조 템플릿 컴포넌트
export function BaseStructureTemplate() {
  const [selectedFile, setSelectedFile] = React.useState<FileTreeItem | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = React.useState("");
  const [chatMessage, setChatMessage] = React.useState("");

  // 🎯 목적: 파일 선택 핸들러 - 선택된 파일 상태 업데이트
  const handleFileSelect = (file: FileTreeItem) => {
    setSelectedFile(file);
  };

  return (
    <div className="bg-background flex h-screen flex-col">
      {/* 🎯 목적: 전체 레이아웃을 SidebarProvider로 감싸서 사이드바 상태 관리 */}
      <SidebarProvider>
        {/* 🎯 목적: 상단 헤더 영역 - 사용자 제공 헤더를 여기에 적용 가능 */}
        <HeaderWithToggle
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        {/* 🎯 목적: 사이드바와 메인 콘텐츠 영역 */}
        <div className="flex flex-1">
          <AppSidebar onFileSelect={handleFileSelect} />
          <SidebarInset>
            {/* 메인 콘텐츠 영역 */}
            <div className="flex flex-1">
              {/* 중앙 콘텐츠 영역 */}
              <div className="flex-1 p-6">
                <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                  <div className="bg-muted text-muted-foreground flex items-center justify-center gap-2 rounded-md px-3 py-2">
                    <span className="font-mono text-sm">contents-area</span>
                  </div>
                  {selectedFile && (
                    <div className="text-center">
                      <p className="text-muted-foreground text-sm">
                        Selected:{" "}
                        <span className="font-medium">{selectedFile.name}</span>
                      </p>
                      <p className="text-muted-foreground text-xs">
                        Type: {selectedFile.type}
                        {selectedFile.extension &&
                          ` • Extension: ${selectedFile.extension}`}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* AI 어시스턴트 패널 - 우측 고정 */}
              <aside className="bg-background flex w-96 flex-col border-l">
                <div className="flex h-full flex-col gap-6 p-6">
                  {/* 헤더 */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-foreground text-lg font-semibold">
                        Skuber+ AI Assistant
                      </h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 p-0 opacity-70 hover:opacity-100"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 4L4 12M4 4L12 12"
                            stroke="currentColor"
                            strokeWidth="1.33"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Button>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Please set up the API key to use the AI Assistant.
                    </p>
                  </div>

                  {/* 설정 폼 */}
                  <div className="flex flex-1 flex-col gap-6">
                    {/* AI Provider 필드 */}
                    <div className="flex flex-col gap-3">
                      <label className="text-foreground text-sm font-medium">
                        AI Provider
                      </label>
                      <div className="border-border bg-background flex items-center gap-2 rounded-lg border px-3 py-2 shadow-sm">
                        <span className="text-muted-foreground flex-1 text-sm">
                          OpenAI (GPT-4)
                        </span>
                        <div className="flex items-center justify-center">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4 6L8 10L12 6"
                              stroke="currentColor"
                              strokeWidth="1.33"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-muted-foreground"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* API Key 필드 */}
                    <div className="flex flex-col gap-3">
                      <label className="text-foreground text-sm font-medium">
                        API Key
                      </label>
                      <Input
                        type="text"
                        placeholder="Please enter the API key"
                        className="text-muted-foreground placeholder:text-muted-foreground"
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                      />
                    </div>

                    {/* 시작 버튼 */}
                    <div className="flex justify-end">
                      <Button className="h-9 px-4 font-medium">
                        Start AI Assistant
                      </Button>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
