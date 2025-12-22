import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Progress } from "@/components/ui/progress";
import { ArrowUpIcon } from "lucide-react";

/**
 * Spinner 컴포넌트는 로딩 상태를 표시하는 데 사용됩니다.
 * shadcn/ui 공식 문서의 예제들을 기반으로 구현되었습니다.
 */
const meta: Meta<typeof Spinner> = {
  title: "ui/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 Spinner - Item 내에서 로딩 상태 표시
 */
export const Default: Story = {
  render: () => (
    <div className="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]">
      <Item variant="muted">
        <ItemMedia>
          <Spinner />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">Processing payment...</ItemTitle>
        </ItemContent>
        <ItemContent className="flex-none justify-end">
          <span className="text-sm tabular-nums">$100.00</span>
        </ItemContent>
      </Item>
    </div>
  ),
};

/**
 * 다양한 크기의 Spinner
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Spinner className="size-3" />
      <Spinner className="size-4" />
      <Spinner className="size-6" />
      <Spinner className="size-8" />
    </div>
  ),
};

/**
 * 다양한 색상의 Spinner
 */
export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Spinner className="size-6 text-red-500" />
      <Spinner className="size-6 text-green-500" />
      <Spinner className="size-6 text-blue-500" />
      <Spinner className="size-6 text-yellow-500" />
      <Spinner className="size-6 text-purple-500" />
    </div>
  ),
};

/**
 * 단순한 Spinner - 기본 크기와 색상
 */
export const Simple: Story = {
  render: () => <Spinner />,
};

/**
 * 버튼과 함께 사용하는 Spinner
 */
export const WithButton: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <Button disabled size="sm">
        <Spinner />
        Loading...
      </Button>
      <Button variant="outline" disabled size="sm">
        <Spinner />
        Please wait
      </Button>
      <Button variant="secondary" disabled size="sm">
        <Spinner />
        Processing
      </Button>
    </div>
  ),
};

/**
 * 뱃지와 함께 사용하는 Spinner
 */
export const WithBadge: Story = {
  render: () => (
    <div className="flex items-center gap-4 [--radius:1.2rem]">
      <Badge>
        <Spinner />
        Syncing
      </Badge>
      <Badge variant="secondary">
        <Spinner />
        Updating
      </Badge>
      <Badge variant="outline">
        <Spinner />
        Processing
      </Badge>
    </div>
  ),
};

/**
 * Input Group과 함께 사용하는 Spinner
 */
export const WithInputGroup: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-4">
      <InputGroup>
        <InputGroupInput placeholder="Send a message..." disabled />
        <InputGroupAddon align="inline-end">
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupTextarea placeholder="Send a message..." disabled />
        <InputGroupAddon align="block-end">
          <Spinner /> Validating...
          <InputGroupButton className="ml-auto" variant="default">
            <ArrowUpIcon />
            <span className="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

/**
 * Empty 상태와 함께 사용하는 Spinner
 */
export const WithEmpty: Story = {
  render: () => (
    <Empty className="w-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner />
        </EmptyMedia>
        <EmptyTitle>Processing your request</EmptyTitle>
        <EmptyDescription>
          Please wait while we process your request. Do not refresh the page.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          Cancel
        </Button>
      </EmptyContent>
    </Empty>
  ),
};

/**
 * Item과 함께 사용하는 Spinner (다운로드 진행 상태)
 */
export const WithItem: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-4 [--radius:1rem]">
      <Item variant="outline">
        <ItemMedia variant="icon">
          <Spinner />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Downloading...</ItemTitle>
          <ItemDescription>129 MB / 1000 MB</ItemDescription>
        </ItemContent>
        <ItemActions className="hidden sm:flex">
          <Button variant="outline" size="sm">
            Cancel
          </Button>
        </ItemActions>
        <ItemFooter>
          <Progress value={75} />
        </ItemFooter>
      </Item>
    </div>
  ),
};
