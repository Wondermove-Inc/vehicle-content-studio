"use client";

import React from "react";
import {
  BotMessageSquare,
  ShieldAlert,
  ListChecks,
  MessagesSquare,
  ShieldHalf,
  Shield,
  ArrowUpRight,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
} from "@/components/ui/item";

/**
 * 🎯 목적: AI Assistant 템플릿의 Props 타입 정의
 */
interface AIAssistantProps {
  onClose?: () => void;
  onStart?: (provider: string, apiKey: string) => void;
  className?: string;
}

/**
 * 🎯 목적: AI Assistant 패널 템플릿 컴포넌트
 *
 * 특징:
 * - 닫기 기능
 * - 다크 테마 최적화 디자인
 * - shadcn/ui 디자인 토큰 준수
 */
export function AIAssistant({ onClose, onStart, className }: AIAssistantProps) {
  return (
    <aside
      className={`border-border bg-sidebar flex h-auto shrink-0 flex-col gap-10 border-l p-4 ${className || ""} `.trim()}
    >
      {/* 🎯 목적: 헤더 섹션 */}
      <div className="relative flex flex-col gap-0.5">
        <div className="flex items-center justify-between">
          <h3 className="text-foreground text-lg leading-7 font-semibold">
            Skuber+ AI Assistant
          </h3>

          {/* 🎯 목적: 닫기 버튼 */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 shrink-0 p-0 opacity-70 hover:opacity-100"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close AI Assistant</span>
          </Button>
        </div>
      </div>

      {/* 🎯 목적: UIDL 기반 메인 콘텐츠 */}
      <div className="flex w-full flex-col items-center gap-10">
        {/* 🎯 목적: 상단 섹션 - 봇 아이콘과 안내 텍스트 */}
        <div className="flex flex-col items-center gap-3.5">
          <BotMessageSquare
            className="text-foreground h-11 w-11"
            size={44}
            strokeWidth={1.5}
          />
          <p className="text-foreground text-center text-sm leading-5 font-normal">
            Setup API Key for LLM
            <br />
            to activate Skuber+ AI Assistant
            <br />
            for your extreme productivity.
          </p>
        </div>

        {/* 🎯 목적: 알림 리스트 섹션 */}
        <div className="flex w-full flex-col items-center gap-2">
          <div className="flex w-full flex-col items-start gap-2">
            <Item variant="outline" className="w-full">
              <ItemMedia variant="icon" className="bg-muted border-border">
                <ListChecks className="text-foreground h-4 w-4" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>See Through Complexity</ItemTitle>
                <ItemDescription>
                  AI reads context, shows the fix.
                </ItemDescription>
              </ItemContent>
            </Item>

            <Item variant="outline" className="w-full">
              <ItemMedia variant="icon" className="bg-muted border-border">
                <MessagesSquare className="text-foreground h-4 w-4" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Control Without Commands</ItemTitle>
                <ItemDescription>
                  Manage clusters in plain language.
                </ItemDescription>
              </ItemContent>
            </Item>

            <Item variant="outline" className="w-full">
              <ItemMedia variant="icon" className="bg-muted border-border">
                <Shield className="text-foreground h-4 w-4" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Secure by Design</ItemTitle>
                <ItemDescription>
                  AI spots risks before they hit.
                </ItemDescription>
              </ItemContent>
            </Item>
          </div>

          {/* 🎯 목적: Setup Now 버튼 */}
          <Button
            variant="link"
            size="default"
            className="text-foreground hover:text-foreground h-9 gap-2 p-2"
          >
            <span className="text-sm leading-5 font-medium">Setup Now</span>
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </aside>
  );
}
