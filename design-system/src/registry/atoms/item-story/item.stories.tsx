import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CheckCircle,
  ChevronRight,
  Star,
  Clock,
  User,
  FileText,
  Settings,
  Download,
  Heart,
  MessageSquare,
  Share,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Link as LinkIcon,
  Edit,
  Trash2,
  MoreHorizontal,
} from "lucide-react";

/**
 * Item 컴포넌트는 정보를 구조화된 형태로 표시하는 데 사용됩니다.
 * shadcn/ui 공식 문서의 예제들을 기반으로 구현되었습니다.
 */
const meta: Meta<typeof Item> = {
  title: "ui/Item",
  component: Item,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["default", "outline", "muted"],
    },
    size: {
      control: { type: "radio" },
      options: ["default", "sm"],
    },
  },
} satisfies Meta<typeof Item>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 Item - 제목과 설명, 액션 버튼
 */
export const Default: Story = {
  render: () => (
    <div className="w-96">
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Basic Item</ItemTitle>
          <ItemDescription>
            A simple item with title and description.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Action
          </Button>
        </ItemActions>
      </Item>
    </div>
  ),
};

/**
 * Item Variants - 다양한 스타일 변형
 */
export const Variants: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <Item>
        <ItemContent>
          <ItemTitle>Default Variant</ItemTitle>
          <ItemDescription>
            Standard styling with subtle background and borders.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Open
          </Button>
        </ItemActions>
      </Item>

      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Outline Variant</ItemTitle>
          <ItemDescription>
            Clear border styling for better separation.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            View
          </Button>
        </ItemActions>
      </Item>

      <Item variant="muted">
        <ItemContent>
          <ItemTitle>Muted Variant</ItemTitle>
          <ItemDescription>
            Softer background for subtle emphasis.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </ItemActions>
      </Item>
    </div>
  ),
};

/**
 * Item Sizes - 크기 변형
 */
export const Sizes: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Default Size</ItemTitle>
          <ItemDescription>
            Standard padding for comfortable reading.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Action
          </Button>
        </ItemActions>
      </Item>

      <Item variant="outline" size="sm">
        <ItemContent>
          <ItemTitle>Small Size</ItemTitle>
          <ItemDescription>
            Compact layout for dense information.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Action
          </Button>
        </ItemActions>
      </Item>
    </div>
  ),
};

/**
 * Icon Media Item - 아이콘이 있는 아이템
 */
export const WithIconMedia: Story = {
  render: () => (
    <div className="w-96">
      <Item variant="outline">
        <ItemMedia variant="icon">
          <CheckCircle />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Profile Verified</ItemTitle>
          <ItemDescription>
            Your profile has been successfully verified.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <ChevronRight className="h-4 w-4" />
        </ItemActions>
      </Item>
    </div>
  ),
};

/**
 * Image Media Item - 이미지가 있는 아이템
 */
export const WithImageMedia: Story = {
  render: () => (
    <div className="w-96">
      <Item variant="outline">
        <ItemMedia variant="image">
          <img
            src="https://github.com/shadcn.png"
            alt="User Avatar"
            className="rounded-sm"
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>shadcn/ui</ItemTitle>
          <ItemDescription>
            Beautifully designed components built with Radix UI and Tailwind
            CSS.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Follow
          </Button>
        </ItemActions>
      </Item>
    </div>
  ),
};

/**
 * Avatar Media Item - 아바타가 있는 아이템
 */
export const WithAvatarMedia: Story = {
  render: () => (
    <div className="w-96">
      <Item variant="outline">
        <ItemMedia>
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VE</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Vercel</ItemTitle>
          <ItemDescription>
            The Frontend Cloud – Build, deploy, and scale your applications.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Star className="h-4 w-4" />
          <span className="text-muted-foreground text-sm">4.8</span>
        </ItemActions>
      </Item>
    </div>
  ),
};

/**
 * Link Item - 클릭 가능한 링크 아이템
 */
export const AsLink: Story = {
  render: () => (
    <div className="w-96">
      <Item variant="outline" asChild>
        <a href="#" className="hover:bg-accent/50">
          <ItemMedia variant="icon">
            <FileText />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Documentation</ItemTitle>
            <ItemDescription>
              Read the full documentation and guides.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <ChevronRight className="h-4 w-4" />
          </ItemActions>
        </a>
      </Item>
    </div>
  ),
};

/**
 * Header and Footer Item - 헤더와 푸터가 있는 복합 아이템
 */
export const WithHeaderFooter: Story = {
  render: () => (
    <div className="w-96">
      <Item variant="outline">
        <ItemHeader>
          <ItemTitle>Project Update</ItemTitle>
          <Badge variant="secondary">New</Badge>
        </ItemHeader>
        <ItemContent>
          <ItemDescription>
            We've made some exciting improvements to the dashboard. Check out
            the new features and enhanced performance.
          </ItemDescription>
        </ItemContent>
        <ItemFooter>
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <Clock className="h-3 w-3" />
            <span>2 hours ago</span>
          </div>
          <ItemActions>
            <Button variant="ghost" size="sm">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MessageSquare className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Share className="h-4 w-4" />
            </Button>
          </ItemActions>
        </ItemFooter>
      </Item>
    </div>
  ),
};

/**
 * Contact Item - 연락처 정보 아이템
 */
export const ContactItem: Story = {
  render: () => (
    <div className="w-96">
      <Item variant="outline">
        <ItemMedia>
          <Avatar>
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>John Doe</ItemTitle>
          <ItemDescription>Senior Developer at Acme Corp</ItemDescription>
          <div className="mt-2 flex flex-col gap-1">
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <Mail className="h-3 w-3" />
              <span>john@example.com</span>
            </div>
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <Phone className="h-3 w-3" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <MapPin className="h-3 w-3" />
              <span>San Francisco, CA</span>
            </div>
          </div>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            <LinkIcon className="h-4 w-4" />
          </Button>
        </ItemActions>
      </Item>
    </div>
  ),
};

/**
 * File Item - 파일 정보 아이템
 */
export const FileItem: Story = {
  render: () => (
    <div className="w-96">
      <Item variant="outline">
        <ItemMedia variant="icon">
          <FileText />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>project-proposal.pdf</ItemTitle>
          <ItemDescription>
            Design proposal for the new mobile application
          </ItemDescription>
          <div className="text-muted-foreground mt-2 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>Dec 15, 2023</span>
            </div>
            <span>2.4 MB</span>
          </div>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </ItemActions>
      </Item>
    </div>
  ),
};

/**
 * Item Group - 아이템들의 그룹
 */
export const ItemGroupExample: Story = {
  render: () => (
    <div className="w-96">
      <ItemGroup>
        <Item>
          <ItemMedia variant="icon">
            <Settings />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>General Settings</ItemTitle>
            <ItemDescription>
              Manage your account preferences and settings.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <ChevronRight className="h-4 w-4" />
          </ItemActions>
        </Item>

        <ItemSeparator />

        <Item>
          <ItemMedia variant="icon">
            <User />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Profile Settings</ItemTitle>
            <ItemDescription>
              Update your profile information and avatar.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <ChevronRight className="h-4 w-4" />
          </ItemActions>
        </Item>

        <ItemSeparator />

        <Item>
          <ItemMedia variant="icon">
            <Mail />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Email Preferences</ItemTitle>
            <ItemDescription>
              Configure notification and email settings.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <ChevronRight className="h-4 w-4" />
          </ItemActions>
        </Item>
      </ItemGroup>
    </div>
  ),
};

/**
 * Interactive Item - 편집 가능한 아이템
 */
export const InteractiveItem: Story = {
  render: () => (
    <div className="w-96">
      <Item variant="outline">
        <ItemMedia variant="icon">
          <FileText />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Meeting Notes</ItemTitle>
          <ItemDescription>
            Weekly team sync and project updates
          </ItemDescription>
          <div className="text-muted-foreground mt-2 flex items-center gap-2 text-sm">
            <Clock className="h-3 w-3" />
            <span>Last edited 5 minutes ago</span>
          </div>
        </ItemContent>
        <ItemActions>
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            Open
          </Button>
        </ItemActions>
      </Item>
    </div>
  ),
};
