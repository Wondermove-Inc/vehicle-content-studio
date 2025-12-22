import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";

/**
 * 🎯 목적: 설정 페이지의 알림 탭을 구현한 완전한 템플릿
 *
 * 다양한 shadcn/ui 컴포넌트를 활용한 설정 알림 템플릿입니다.
 * 사이드바 네비게이션, 라디오 그룹, 스위치, 체크박스 등을 포함합니다.
 */
const meta: Meta = {
  title: "templates/Test/SettingsNotificationsTemplate",
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 설정 페이지의 알림 탭 - 완전한 UI 템플릿
 */
export const Default: Story = {
  render: () => (
    <div className="bg-background min-h-screen p-10 pb-16">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* 헤더 섹션 */}
        <div className="space-y-0.5">
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>

        <Separator />

        <div className="flex gap-12">
          {/* 사이드바 네비게이션 */}
          <aside className="w-54 shrink-0">
            <nav className="space-y-1">
              {[
                { name: "Profile", active: false },
                { name: "Account", active: false },
                { name: "Appearance", active: false },
                { name: "Notifications", active: true },
                { name: "Display", active: false },
              ].map((item) => (
                <button
                  key={item.name}
                  className={`hover:bg-accent hover:text-accent-foreground w-full rounded-md px-3 py-2 text-left text-sm font-medium transition-colors ${
                    item.active
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </aside>

          {/* 메인 콘텐츠 */}
          <div className="flex-1 space-y-6">
            {/* 페이지 헤더 */}
            <div>
              <h2 className="text-lg font-medium">Notifications</h2>
              <p className="text-muted-foreground text-sm">
                Configure how you receive notifications.
              </p>
            </div>

            <Separator />

            {/* 알림 설정 폼 */}
            <div className="space-y-8">
              {/* 알림 타입 선택 */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Notify me about...
                </Label>
                <RadioGroup defaultValue="direct" className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all" className="text-sm font-medium">
                      All new messages
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="direct" id="direct" />
                    <Label htmlFor="direct" className="text-sm font-medium">
                      Direct messages and mentions
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="nothing" id="nothing" />
                    <Label htmlFor="nothing" className="text-sm font-medium">
                      Nothing
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* 이메일 알림 설정 */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>

                <div className="space-y-4">
                  {/* Communication emails */}
                  <Card>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="space-y-0.5">
                        <Label className="text-base font-medium">
                          Communication emails
                        </Label>
                        <p className="text-muted-foreground text-xs">
                          Send notifications to device.
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </CardContent>
                  </Card>

                  {/* Marketing emails */}
                  <Card>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="space-y-0.5">
                        <Label className="text-base font-medium">
                          Marketing emails
                        </Label>
                        <p className="text-muted-foreground text-xs">
                          Receive emails about new products, features, and more.
                        </p>
                      </div>
                      <Switch />
                    </CardContent>
                  </Card>

                  {/* Social emails */}
                  <Card>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="space-y-0.5">
                        <Label className="text-base font-medium">
                          Social emails
                        </Label>
                        <p className="text-muted-foreground text-xs">
                          Receive emails for friend requests, follows, and more.
                        </p>
                      </div>
                      <Switch />
                    </CardContent>
                  </Card>

                  {/* Security emails */}
                  <Card>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="space-y-0.5">
                        <Label className="text-base font-medium">
                          Security emails
                        </Label>
                        <p className="text-muted-foreground text-xs">
                          Receive emails about your account activity and
                          security.
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* 모바일 설정 */}
              <div className="flex items-start space-x-2">
                <Checkbox id="mobile" defaultChecked />
                <div className="space-y-1 leading-none">
                  <Label
                    htmlFor="mobile"
                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Use different settings for my mobile devices
                  </Label>
                  <p className="text-muted-foreground text-sm">
                    You can manage your mobile notifications in the mobile
                    settings page.
                  </p>
                </div>
              </div>

              {/* 저장 버튼 */}
              <Button>Update notifications</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * 컴팩트 버전 - 사이드바 없는 간소한 알림 설정
 */
export const Compact: Story = {
  render: () => (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div className="space-y-0.5">
        <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">
          Configure how you receive notifications.
        </p>
      </div>

      <Separator />

      <div className="space-y-6">
        {/* 알림 타입 선택 */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Notify me about...</Label>
          <RadioGroup defaultValue="direct" className="space-y-3">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="all" id="all-compact" />
              <Label htmlFor="all-compact" className="text-sm font-medium">
                All new messages
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="direct" id="direct-compact" />
              <Label htmlFor="direct-compact" className="text-sm font-medium">
                Direct messages and mentions
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="nothing" id="nothing-compact" />
              <Label htmlFor="nothing-compact" className="text-sm font-medium">
                Nothing
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* 이메일 알림 설정 */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Email Notifications</h3>
          <div className="space-y-4">
            <Card>
              <CardContent className="flex items-center justify-between p-4">
                <div className="space-y-0.5">
                  <Label className="text-base font-medium">
                    Communication emails
                  </Label>
                  <p className="text-muted-foreground text-xs">
                    Send notifications to device.
                  </p>
                </div>
                <Switch defaultChecked />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center justify-between p-4">
                <div className="space-y-0.5">
                  <Label className="text-base font-medium">
                    Marketing emails
                  </Label>
                  <p className="text-muted-foreground text-xs">
                    Receive emails about new products, features, and more.
                  </p>
                </div>
                <Switch />
              </CardContent>
            </Card>
          </div>
        </div>

        <Button>Update notifications</Button>
      </div>
    </div>
  ),
};

/**
 * 다크 모드 - 다크 테마에서의 설정 페이지
 */
export const DarkMode: Story = {
  render: () => (
    <div className="dark">
      <div className="bg-background min-h-screen p-10 pb-16">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="space-y-0.5">
            <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account settings and set e-mail preferences.
            </p>
          </div>

          <Separator />

          <div className="flex gap-12">
            <aside className="w-54 shrink-0">
              <nav className="space-y-1">
                {[
                  { name: "Profile", active: false },
                  { name: "Account", active: false },
                  { name: "Appearance", active: false },
                  { name: "Notifications", active: true },
                  { name: "Display", active: false },
                ].map((item) => (
                  <button
                    key={item.name}
                    className={`hover:bg-accent hover:text-accent-foreground w-full rounded-md px-3 py-2 text-left text-sm font-medium transition-colors ${
                      item.active
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </nav>
            </aside>

            <div className="flex-1 space-y-6">
              <div>
                <h2 className="text-lg font-medium">Notifications</h2>
                <p className="text-muted-foreground text-sm">
                  Configure how you receive notifications.
                </p>
              </div>

              <Separator />

              <div className="space-y-8">
                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    Notify me about...
                  </Label>
                  <RadioGroup defaultValue="direct" className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="all" id="all-dark" />
                      <Label htmlFor="all-dark" className="text-sm font-medium">
                        All new messages
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="direct" id="direct-dark" />
                      <Label
                        htmlFor="direct-dark"
                        className="text-sm font-medium"
                      >
                        Direct messages and mentions
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="nothing" id="nothing-dark" />
                      <Label
                        htmlFor="nothing-dark"
                        className="text-sm font-medium"
                      >
                        Nothing
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  <div className="space-y-4">
                    <Card>
                      <CardContent className="flex items-center justify-between p-4">
                        <div className="space-y-0.5">
                          <Label className="text-base font-medium">
                            Communication emails
                          </Label>
                          <p className="text-muted-foreground text-xs">
                            Send notifications to device.
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="flex items-center justify-between p-4">
                        <div className="space-y-0.5">
                          <Label className="text-base font-medium">
                            Security emails
                          </Label>
                          <p className="text-muted-foreground text-xs">
                            Receive emails about your account activity and
                            security.
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox id="mobile-dark" defaultChecked />
                  <div className="space-y-1 leading-none">
                    <Label
                      htmlFor="mobile-dark"
                      className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Use different settings for my mobile devices
                    </Label>
                    <p className="text-muted-foreground text-sm">
                      You can manage your mobile notifications in the mobile
                      settings page.
                    </p>
                  </div>
                </div>

                <Button>Update notifications</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
