import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

export function ButtonGroupOrientation() {
  return (
    <ButtonGroup
      orientation="vertical"
      aria-label="Media controls"
      className="h-fit"
    >
      <Button variant="outline" size="icon">
        <PlusIcon />
      </Button>
      <Button variant="outline" size="icon">
        <MinusIcon />
      </Button>
    </ButtonGroup>
  );
}

export function ButtonGroupSize() {
  return (
    <div className="flex flex-col items-start gap-8">
      <ButtonGroup>
        <Button variant="outline" size="sm">
          Small
        </Button>
        <Button variant="outline" size="sm">
          Button
        </Button>
        <Button variant="outline" size="sm">
          Group
        </Button>
        <Button variant="outline" size="icon-sm">
          <PlusIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Default</Button>
        <Button variant="outline">Button</Button>
        <Button variant="outline">Group</Button>
        <Button variant="outline" size="icon">
          <PlusIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="lg">
          Large
        </Button>
        <Button variant="outline" size="lg">
          Button
        </Button>
        <Button variant="outline" size="lg">
          Group
        </Button>
        <Button variant="outline" size="icon-lg">
          <PlusIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
}

export function ButtonGroupNested() {
  return (
    <ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="sm">
          1
        </Button>
        <Button variant="outline" size="sm">
          2
        </Button>
        <Button variant="outline" size="sm">
          3
        </Button>
        <Button variant="outline" size="sm">
          4
        </Button>
        <Button variant="outline" size="sm">
          5
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="icon-sm" aria-label="Previous">
          <ArrowLeftIcon />
        </Button>
        <Button variant="outline" size="icon-sm" aria-label="Next">
          <ArrowRightIcon />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  );
}

export function ButtonGroupSeparatorDemo() {
  return (
    <ButtonGroup>
      <Button variant="secondary" size="sm">
        Copy
      </Button>
      <ButtonGroupSeparator />
      <Button variant="secondary" size="sm">
        Paste
      </Button>
    </ButtonGroup>
  );
}

export function ButtonGroupSplit() {
  return (
    <ButtonGroup>
      <Button variant="secondary">Button</Button>
      <ButtonGroupSeparator />
      <Button size="icon" variant="secondary">
        <IconPlus />
      </Button>
    </ButtonGroup>
  );
}

export function ButtonGroupInput() {
  return (
    <ButtonGroup>
      <Input placeholder="Search..." />
      <Button variant="outline" aria-label="Search">
        <SearchIcon />
      </Button>
    </ButtonGroup>
  );
}
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Archive,
  AlertTriangle,
  ArrowLeftIcon,
  ArrowRightIcon,
  Clock,
  MinusIcon,
  PlusIcon,
  SearchIcon,
  Mic,
  UserPlus,
  ChevronDown,
  Send,
  MoreHorizontal,
} from "lucide-react";
import { IconPlus } from "@tabler/icons-react";

/**
 * Button Group은 관련된 버튼들을 그룹화하여 하나의 단위로 표시하는 컴포넌트입니다.
 * shadcn/ui 공식 문서의 예제들을 기반으로 구현되었습니다.
 */
const meta: Meta<typeof ButtonGroup> = {
  title: "ui/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    orientation: {
      control: { type: "radio" },
      options: ["horizontal", "vertical"],
    },
  },
  excludeStories:
    /ButtonGroupOrientation$|ButtonGroupSize$|ButtonGroupNested$|ButtonGroupSeparatorDemo$|ButtonGroupSplit$|ButtonGroupInput$/,
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 버튼 그룹 - Archive, Report, Snooze 액션
 */
export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">
        <Archive />
        Archive
      </Button>
      <Button variant="outline">
        <AlertTriangle />
        Report
      </Button>
      <Button variant="outline">
        <Clock />
        Snooze
      </Button>
    </ButtonGroup>
  ),
};

/**
 * 방향 설정 버튼 그룹 - vertical orientation을 사용한 Plus/Minus 아이콘 버튼
 * aria-label과 className을 통해 접근성과 스타일링을 개선했습니다.
 */
export const Orientation: Story = {
  render: () => <ButtonGroupOrientation />,
};

/**
 * 버튼 그룹 크기 변형 - Small, Default, Large 크기별로 텍스트와 아이콘 버튼 조합
 * 각 크기에 맞는 icon-sm, icon, icon-lg 사이즈를 사용합니다.
 */
export const Sizes: Story = {
  render: () => <ButtonGroupSize />,
};

/**
 * 중첩된 버튼 그룹 - 페이지네이션 스타일의 숫자 버튼(1-5)과 화살표 네비게이션 버튼
 * 작은 크기(sm)를 사용하여 컴팩트한 디자인과 aria-label로 접근성을 개선했습니다.
 */
export const Nested: Story = {
  render: () => <ButtonGroupNested />,
};

/**
 * 구분자가 있는 버튼 그룹 - Copy와 Paste 분리
 * secondary variant와 sm 크기를 사용하여 깔끔한 디자인을 제공합니다.
 */
export const Separator: Story = {
  render: () => <ButtonGroupSeparatorDemo />,
};

/**
 * 분할 버튼 - 메인 버튼과 추가 액션 아이콘
 * ButtonGroupSeparator를 사용하여 버튼들을 시각적으로 분리하고
 * secondary variant로 일관된 스타일을 제공합니다.
 */
export const Split: Story = {
  render: () => <ButtonGroupSplit />,
};

/**
 * 입력과 통합 - 검색 입력 필드와 검색 버튼
 * 검색 기능을 위한 Input과 Button의 조합으로, 깔끔한 통합 인터페이스를 제공합니다.
 * aria-label을 통해 접근성을 개선했습니다.
 */
export const WithInput: Story = {
  render: () => <ButtonGroupInput />,
};

/**
 * 입력 그룹 - 음성 모드 토글과 입력
 */
export const InputGroup: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline" size="icon">
        <Mic />
      </Button>
      <Input placeholder="Voice mode..." />
    </ButtonGroup>
  ),
};

/**
 * 드롭다운 메뉴와 함께 - Follow 버튼과 추가 액션
 */
export const WithDropdown: Story = {
  render: () => (
    <ButtonGroup>
      <Button>Follow</Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <UserPlus />
            Add to contacts
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MoreHorizontal />
            More options
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  ),
};

/**
 * Select와 통합 - 통화 선택, 입력, 전송
 */
export const WithSelect: Story = {
  render: () => (
    <ButtonGroup>
      <Select defaultValue="usd">
        <SelectTrigger className="w-20 rounded-r-none">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="usd">USD</SelectItem>
          <SelectItem value="eur">EUR</SelectItem>
          <SelectItem value="gbp">GBP</SelectItem>
        </SelectContent>
      </Select>
      <Input placeholder="Amount" className="rounded-none" />
      <Button>
        <Send />
        Send
      </Button>
    </ButtonGroup>
  ),
};

/**
 * Popover와 통합 - Copilot 버튼과 추가 옵션
 */
export const WithPopover: Story = {
  render: () => (
    <ButtonGroup>
      <Button>Copilot</Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon">
            <MoreHorizontal />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48">
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Help
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Feedback
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </ButtonGroup>
  ),
};
