import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  FolderCode,
  Cloud,
  Bell,
  User,
  Search,
  Plus,
  RefreshCw,
  MessageSquare,
  Upload,
  Import,
} from "lucide-react";

/**
 * Empty 컴포넌트는 데이터가 없거나 빈 상태를 표시하는 데 사용됩니다.
 * shadcn/ui 공식 문서의 예제들을 기반으로 구현되었습니다.
 */
const meta: Meta<typeof Empty> = {
  title: "ui/Empty",
  component: Empty,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 Empty 컴포넌트 - 프로젝트가 없는 상태
 */
export const Default: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderCode />
        </EmptyMedia>
        <EmptyTitle>No Projects Yet</EmptyTitle>
        <EmptyDescription>
          You haven't created any projects yet. Get started by creating your
          first project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>
          <Plus />
          Create Project
        </Button>
        <Button variant="outline">
          <Import />
          Import Project
        </Button>
        <p className="text-muted-foreground mt-2 text-xs">
          <a href="#" className="underline underline-offset-4">
            Learn More
          </a>
        </p>
      </EmptyContent>
    </Empty>
  ),
};

/**
 * 테두리가 있는 Empty 컴포넌트 - 클라우드 스토리지 빈 상태
 */
export const Outline: Story = {
  render: () => (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Cloud />
        </EmptyMedia>
        <EmptyTitle>Cloud Storage Empty</EmptyTitle>
        <EmptyDescription>
          Upload files to your cloud storage to access them anywhere.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>
          <Upload />
          Upload Files
        </Button>
        <Button variant="outline">Browse Files</Button>
      </EmptyContent>
    </Empty>
  ),
};

/**
 * 배경이 있는 Empty 컴포넌트 - 알림 없음 상태
 */
export const Background: Story = {
  render: () => (
    <Empty className="from-muted/50 to-background bg-gradient-to-br">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Bell />
        </EmptyMedia>
        <EmptyTitle>No Notifications</EmptyTitle>
        <EmptyDescription>
          You're all caught up. New notifications will appear here.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline">
          <RefreshCw />
          Refresh
        </Button>
      </EmptyContent>
    </Empty>
  ),
};

/**
 * 아바타를 포함한 Empty 컴포넌트 - 사용자 오프라인 상태
 */
export const WithAvatar: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <Avatar className="size-16 grayscale">
          <AvatarImage src="https://github.com/shadcn.png" alt="User" />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
        <EmptyTitle>User Offline</EmptyTitle>
        <EmptyDescription>
          This user is currently offline. You can leave a message to notify them
          or try again later.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>
          <MessageSquare />
          Leave Message
        </Button>
        <Button variant="outline">Try Again Later</Button>
      </EmptyContent>
    </Empty>
  ),
};

/**
 * 여러 아바타를 포함한 Empty 컴포넌트 - 팀 멤버 없음 상태
 */
export const WithAvatarGroup: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <div className="flex -space-x-2">
          <Avatar className="ring-background ring-2 grayscale">
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <Avatar className="ring-background ring-2 grayscale">
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <Avatar className="ring-background ring-2">
            <AvatarFallback>
              <Plus className="size-4" />
            </AvatarFallback>
          </Avatar>
        </div>
        <EmptyTitle>No Team Members</EmptyTitle>
        <EmptyDescription>
          Invite your team to collaborate on this project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>
          <Plus />
          Invite Team
        </Button>
      </EmptyContent>
    </Empty>
  ),
};

/**
 * 입력 그룹을 포함한 Empty 컴포넌트 - 404 페이지
 */
export const InputGroup: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Search />
        </EmptyMedia>
        <EmptyTitle>404 - Not Found</EmptyTitle>
        <EmptyDescription>
          The page you're looking for doesn't exist. Try searching for what you
          need below.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="relative w-full max-w-sm">
          <Input placeholder="Search..." className="pr-10" />
          <div className="absolute top-1/2 right-3 -translate-y-1/2">
            <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
              ⌘K
            </kbd>
          </div>
        </div>
      </EmptyContent>
    </Empty>
  ),
};
