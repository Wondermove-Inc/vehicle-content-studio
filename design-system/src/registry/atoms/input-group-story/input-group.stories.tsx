import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Plus,
  InfoIcon,
  Send,
  Mic,
  Copy,
  Download,
  ChevronDown,
  DollarSign,
  AtSign,
  Lock,
} from "lucide-react";

/**
 * Input Group은 입력 필드에 추가 정보나 액션을 표시하는 컴포넌트입니다.
 * shadcn/ui 공식 문서의 예제들을 기반으로 구현되었습니다.
 */
const meta: Meta<typeof InputGroup> = {
  title: "ui/InputGroup",
  component: InputGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 검색 Input Group - 검색 아이콘과 결과 수 표시
 */
export const Default: Story = {
  render: () => (
    <InputGroup>
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
    </InputGroup>
  ),
};

/**
 * URL Input Group - 프로토콜 접두사와 정보 툴팁
 */
export const WithTooltip: Story = {
  render: () => (
    <InputGroup>
      <InputGroupInput placeholder="example.com" className="!pl-1" />
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <Tooltip>
          <TooltipTrigger asChild>
            <InputGroupButton className="rounded-full" size="icon-sm">
              <InfoIcon />
            </InputGroupButton>
          </TooltipTrigger>
          <TooltipContent>This is content in a tooltip.</TooltipContent>
        </Tooltip>
      </InputGroupAddon>
    </InputGroup>
  ),
};

/**
 * Textarea Input Group - 드롭다운과 여러 버튼들
 */
export const WithTextarea: Story = {
  render: () => (
    <InputGroup>
      <InputGroupTextarea placeholder="Ask, Search or Chat..." rows={3} />
      <InputGroupAddon align="block-end">
        <InputGroupButton
          variant="outline"
          className="rounded-full"
          size="icon-sm"
        >
          <Plus />
        </InputGroupButton>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <InputGroupButton variant="ghost">
              Auto <ChevronDown className="ml-1 h-3 w-3" />
            </InputGroupButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Auto</DropdownMenuItem>
            <DropdownMenuItem>Agent</DropdownMenuItem>
            <DropdownMenuItem>Manual</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <InputGroupText className="ml-auto">52% used</InputGroupText>
        <Separator orientation="vertical" className="!h-4" />
        <InputGroupButton>
          <Send />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};

/**
 * 이메일 Input Group - @ 기호 접두사
 */
export const EmailInput: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon>
        <AtSign />
      </InputGroupAddon>
      <InputGroupInput placeholder="username" />
      <InputGroupAddon align="inline-end">
        <InputGroupText>@company.com</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
};

/**
 * 가격 Input Group - 통화 기호와 단위
 */
export const PriceInput: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon>
        <DollarSign />
      </InputGroupAddon>
      <InputGroupInput placeholder="0.00" type="number" />
      <InputGroupAddon align="inline-end">
        <InputGroupText>USD</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
};

/**
 * 음성 입력 Group - 마이크 버튼과 입력
 */
export const VoiceInput: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon>
        <InputGroupButton variant="outline" size="icon-sm">
          <Mic />
        </InputGroupButton>
      </InputGroupAddon>
      <InputGroupInput placeholder="Say something..." />
      <InputGroupAddon align="inline-end">
        <InputGroupButton>
          <Send />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};

/**
 * 보안 입력 Group - 잠금 아이콘과 복사 버튼
 */
export const SecureInput: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon>
        <Lock />
      </InputGroupAddon>
      <InputGroupInput type="password" placeholder="Enter password" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton variant="outline" size="icon-sm">
          <Copy />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};

/**
 * 파일 다운로드 Group - 파일명과 다운로드 버튼
 */
export const FileDownload: Story = {
  render: () => (
    <InputGroup>
      <InputGroupInput value="document.pdf" readOnly />
      <InputGroupAddon align="inline-end">
        <InputGroupText>2.4 MB</InputGroupText>
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <InputGroupButton>
          <Download />
          Download
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};

/**
 * 블록 정렬 Input Group - 상단 레이블
 */
export const BlockStart: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon align="block-start">
        <InputGroupText>Website URL</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="https://example.com" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton variant="outline">
          <Copy />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};

/**
 * 블록 끝 정렬 Input Group - 하단 액션
 */
export const BlockEnd: Story = {
  render: () => (
    <InputGroup>
      <InputGroupInput placeholder="Type your message..." />
      <InputGroupAddon align="block-end">
        <InputGroupText>0/280 characters</InputGroupText>
        <InputGroupButton className="ml-auto">
          <Send />
          Send
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};
