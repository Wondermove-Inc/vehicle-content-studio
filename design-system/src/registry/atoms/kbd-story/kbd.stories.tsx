import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SearchIcon } from "lucide-react";

/**
 * Kbd 컴포넌트는 키보드 키와 단축키를 표시하는 데 사용됩니다.
 * shadcn/ui 공식 문서의 예제들을 기반으로 구현되었습니다.
 */
const meta: Meta<typeof Kbd> = {
  title: "ui/Kbd",
  component: Kbd,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 KbdGroup - 공식 문서 예제
 * 키보드 키들을 그룹화하여 표시합니다.
 */
export const Default: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>⌥</Kbd>
        <Kbd>⌃</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <span>+</span>
        <Kbd>B</Kbd>
      </KbdGroup>
    </div>
  ),
};

/**
 * 명령 팔레트 예제
 * 텍스트 안에서 키보드 단축키를 표시합니다.
 */
export const CommandPalette: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <p className="text-muted-foreground text-sm">
        Use{" "}
        <KbdGroup>
          <Kbd>Ctrl + B</Kbd>
          <Kbd>Ctrl + K</Kbd>
        </KbdGroup>{" "}
        to open the command palette
      </p>
    </div>
  ),
};

/**
 * 버튼과 함께 사용하는 예제
 * 버튼 안에 키보드 키를 표시합니다.
 */
export const WithButton: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="outline" size="sm" className="pr-2">
        Accept <Kbd>⏎</Kbd>
      </Button>
      <Button variant="outline" size="sm" className="pr-2">
        Cancel <Kbd>Esc</Kbd>
      </Button>
    </div>
  ),
};

/**
 * 툴팁과 함께 사용하는 예제
 * 툴팁 안에서 키보드 단축키를 표시합니다.
 */
export const WithTooltip: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <ButtonGroup>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="sm" variant="outline">
              Save
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <div className="flex items-center gap-2">
              Save Changes <Kbd>S</Kbd>
            </div>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="sm" variant="outline">
              Print
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <div className="flex items-center gap-2">
              Print Document{" "}
              <KbdGroup>
                <Kbd>Ctrl</Kbd>
                <Kbd>P</Kbd>
              </KbdGroup>
            </div>
          </TooltipContent>
        </Tooltip>
      </ButtonGroup>
    </div>
  ),
};

/**
 * Input Group과 함께 사용하는 예제
 * 검색 입력 필드에 키보드 단축키를 표시합니다.
 */
export const WithInputGroup: Story = {
  render: () => (
    <div className="flex w-full max-w-xs flex-col gap-6">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};
