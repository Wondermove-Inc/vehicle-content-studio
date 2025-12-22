"use client";

import * as React from "react";
import {
  AppWindow,
  Network,
  Container,
  Code,
  Terminal,
  FileQuestion,
  FileText,
  Trash2,
  FolderSync,
  Plus,
  Bot,
  Search,
  ChevronRight,
  ChevronUp,
  ArrowRight,
  Check,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

const data = {
  nav: [
    { name: "App", icon: AppWindow },
    { name: "Proxy", icon: Network },
    { name: "Kubernetes", icon: Container },
    { name: "Editor", icon: Code },
    { name: "Terminal", icon: Terminal },
    { name: "LLM Models", icon: Bot },
  ],
};

// 🎯 목적: App 메뉴의 콘텐츠 영역 - 앱 관련 설정
function AppContent() {
  return (
    <>
      {/* Theme */}
      <div className="flex w-full flex-col gap-3">
        <Label
          htmlFor="app-theme"
          className="text-foreground text-sm font-medium"
        >
          Theme
        </Label>
        <Select defaultValue="default-dark">
          <SelectTrigger className="bg-input/30 border-border w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Light Themes</SelectLabel>
              <SelectItem value="default-light">Default Light</SelectItem>
              <SelectItem value="red-light">Red Light</SelectItem>
              <SelectItem value="orange-light">Orange Light</SelectItem>
              <SelectItem value="green-light">Green Light</SelectItem>
              <SelectItem value="blue-light">Blue Light</SelectItem>
              <SelectItem value="yellow-light">Yellow Light</SelectItem>
              <SelectItem value="violet-light">Violet Light</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Dark Themes</SelectLabel>
              <SelectItem value="default-dark">Default Dark</SelectItem>
              <SelectItem value="red-dark">Red Dark</SelectItem>
              <SelectItem value="orange-dark">Orange Dark</SelectItem>
              <SelectItem value="green-dark">Green Dark</SelectItem>
              <SelectItem value="blue-dark">Blue Dark</SelectItem>
              <SelectItem value="yellow-dark">Yellow Dark</SelectItem>
              <SelectItem value="violet-dark">Violet Dark</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Extension install registry */}
      <div className="flex w-full flex-col gap-3">
        <Label
          htmlFor="extension-registry"
          className="text-foreground text-sm font-medium"
        >
          Extension install registry
        </Label>
        <p className="text-muted-foreground text-sm">
          This setting is to change the registry URL for installing extensions
          by name. If you are unable to access the default registry
          (https://registry.npmjs.org) you can change it in your .npmrc file or
          in the input below.
        </p>
        <Select defaultValue="custom">
          <SelectTrigger className="bg-input/30 border-border w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default (npmjs.org)</SelectItem>
            <SelectItem value="custom">Custom URL</SelectItem>
          </SelectContent>
        </Select>
        <Input
          id="custom-registry-url"
          type="text"
          placeholder="Custom extension registry URL..."
          className="bg-input/30 border-border"
        />
      </div>

      {/* Start-up */}
      <div className="flex items-start gap-3">
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center gap-3">
            <Label
              htmlFor="app-startup"
              className="text-foreground flex-1 text-sm font-medium"
            >
              Start-up
            </Label>
            <Switch id="app-startup" />
          </div>
          <p className="text-muted-foreground text-sm">
            Automatically start freelens on login
          </p>
        </div>
      </div>

      {/* Locate timezone */}
      <div className="flex w-full flex-col gap-3">
        <Label
          htmlFor="locate-timezone"
          className="text-foreground text-sm font-medium"
        >
          Locate timezone
        </Label>
        <Select defaultValue="asia-tokyo">
          <SelectTrigger className="bg-input/30 border-border w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asia-tokyo">Asia/Tokyo</SelectItem>
            <SelectItem value="asia-seoul">Asia/Seoul</SelectItem>
            <SelectItem value="america-new-york">America/New_York</SelectItem>
            <SelectItem value="europe-london">Europe/London</SelectItem>
            <SelectItem value="australia-sydney">Australia/Sydney</SelectItem>
            <SelectItem value="utc">UTC</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}

// 🎯 목적: Proxy 메뉴의 콘텐츠 영역 - 프록시 관련 설정
function ProxyContent() {
  return (
    <>
      {/* HTTP Proxy */}
      <div className="flex w-full flex-col gap-3">
        <Label
          htmlFor="http-proxy"
          className="text-foreground text-sm font-medium"
        >
          HTTP proxy
        </Label>
        <Input
          id="http-proxy"
          type="text"
          placeholder="Type HTTP proxy url (example: http://proxy.acme.org:8080)"
          className="bg-input/30 border-border"
        />
        <p className="text-muted-foreground text-sm">
          Proxy is used only for non-cluster communication.
        </p>
      </div>

      {/* Certificate Trust */}
      <div className="flex items-start gap-3">
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center gap-3">
            <Label
              htmlFor="certificate-trust"
              className="text-foreground flex-1 text-sm font-medium"
            >
              Certificate trust - Allow untrusted certificate authorities
            </Label>
            <Switch id="certificate-trust" />
          </div>
          <p className="text-muted-foreground text-sm">
            This Will Make Freelens Trust Any Certificate Authority Without Any
            Validations. Needed With Some Corporate Proxies That Do Certificate
            Re-Writing. Does Not Affect Cluster Communications!
          </p>
        </div>
      </div>
    </>
  );
}

// 🎯 목적: Editor 메뉴의 콘텐츠 영역 - 에디터 관련 설정
function EditorContent() {
  return (
    <>
      {/* Minimap */}
      <div className="flex items-start gap-3">
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center gap-3">
            <Label
              htmlFor="minimap"
              className="text-foreground flex-1 text-sm font-medium"
            >
              Minimap
            </Label>
            <Switch id="minimap" />
          </div>
          <p className="text-muted-foreground text-sm">Show minimap</p>
        </div>
      </div>

      {/* Position */}
      <div className="flex w-full flex-col gap-3">
        <Label
          htmlFor="position"
          className="text-foreground text-sm font-medium"
        >
          Position
        </Label>
        <Select defaultValue="right">
          <SelectTrigger className="bg-input/30 border-border w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="right">Right</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Line numbers */}
      <div className="flex w-full flex-col gap-3">
        <Label
          htmlFor="line-numbers"
          className="text-foreground text-sm font-medium"
        >
          Line numbers
        </Label>
        <Select defaultValue="on">
          <SelectTrigger className="bg-input/30 border-border w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="on">On</SelectItem>
            <SelectItem value="off">Off</SelectItem>
            <SelectItem value="relative">Relative</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tab size */}
      <div className="flex w-full flex-col gap-3">
        <Label
          htmlFor="tab-size"
          className="text-foreground text-sm font-medium"
        >
          Tab size
        </Label>
        <Select defaultValue="4">
          <SelectTrigger className="bg-input/30 border-border w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="4">4</SelectItem>
            <SelectItem value="8">8</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Font size */}
      <div className="flex w-full flex-col gap-3">
        <Label
          htmlFor="editor-font-size"
          className="text-foreground text-sm font-medium"
        >
          Font size
        </Label>
        <Select defaultValue="12">
          <SelectTrigger className="bg-input/30 border-border w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="11">11</SelectItem>
            <SelectItem value="12">12</SelectItem>
            <SelectItem value="13">13</SelectItem>
            <SelectItem value="14">14</SelectItem>
            <SelectItem value="16">16</SelectItem>
            <SelectItem value="18">18</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Font family */}
      <div className="flex w-full flex-col gap-3">
        <Label
          htmlFor="editor-font-family"
          className="text-foreground text-sm font-medium"
        >
          Font family
        </Label>
        <Select defaultValue="robotomono">
          <SelectTrigger className="bg-input/30 border-border w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="robotomono">RobotoMono</SelectItem>
            <SelectItem value="firacode">Fira Code</SelectItem>
            <SelectItem value="jetbrains">JetBrains Mono</SelectItem>
            <SelectItem value="courier">Courier New</SelectItem>
            <SelectItem value="consolas">Consolas</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}

// 🎯 목적: Terminal 메뉴의 콘텐츠 영역 - 터미널 관련 설정 (App 메뉴와 동일)
function TerminalContent() {
  return (
    <>
      {/* Terminal shell path */}
      <div className="flex w-full flex-col gap-3">
        <Label
          htmlFor="terminal-shell-path"
          className="text-foreground text-sm font-medium"
        >
          Terminal shell path
        </Label>
        <Input
          id="terminal-shell-path"
          type="text"
          placeholder="/bin/zsh"
          className="bg-input/30 border-border"
        />
      </div>

      {/* Terminal copy & paste */}
      <div className="flex items-start gap-3">
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center gap-3">
            <Label
              htmlFor="terminal-copy-paste"
              className="text-foreground flex-1 text-sm font-medium"
            >
              Terminal copy & paste
            </Label>
            <Switch id="terminal-copy-paste" />
          </div>
          <p className="text-muted-foreground text-sm">
            Copy on select and paste on right-click
          </p>
        </div>
      </div>

      {/* Terminal theme */}
      <div className="flex w-full flex-col gap-3">
        <Label
          htmlFor="terminal-terminal-theme"
          className="text-foreground text-sm font-medium"
        >
          Terminal theme
        </Label>
        <Select defaultValue="default-dark">
          <SelectTrigger className="bg-input/30 border-border w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Light Themes</SelectLabel>
              <SelectItem value="default-light">Default Light</SelectItem>
              <SelectItem value="red-light">Red Light</SelectItem>
              <SelectItem value="orange-light">Orange Light</SelectItem>
              <SelectItem value="green-light">Green Light</SelectItem>
              <SelectItem value="blue-light">Blue Light</SelectItem>
              <SelectItem value="yellow-light">Yellow Light</SelectItem>
              <SelectItem value="violet-light">Violet Light</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Dark Themes</SelectLabel>
              <SelectItem value="default-dark">Default Dark</SelectItem>
              <SelectItem value="red-dark">Red Dark</SelectItem>
              <SelectItem value="orange-dark">Orange Dark</SelectItem>
              <SelectItem value="green-dark">Green Dark</SelectItem>
              <SelectItem value="blue-dark">Blue Dark</SelectItem>
              <SelectItem value="yellow-dark">Yellow Dark</SelectItem>
              <SelectItem value="violet-dark">Violet Dark</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Font size */}
      <div className="flex w-full flex-col gap-3">
        <Label
          htmlFor="terminal-font-size"
          className="text-foreground text-sm font-medium"
        >
          Font size
        </Label>
        <Select defaultValue="12">
          <SelectTrigger className="bg-input/30 border-border w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="11">11</SelectItem>
            <SelectItem value="12">12</SelectItem>
            <SelectItem value="13">13</SelectItem>
            <SelectItem value="14">14</SelectItem>
            <SelectItem value="16">16</SelectItem>
            <SelectItem value="18">18</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Font family */}
      <div className="flex w-full flex-col gap-3">
        <Label
          htmlFor="terminal-font-family"
          className="text-foreground text-sm font-medium"
        >
          Font family
        </Label>
        <Select defaultValue="robotomono">
          <SelectTrigger className="bg-input/30 border-border w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="robotomono">RobotoMono</SelectItem>
            <SelectItem value="firacode">Fira Code</SelectItem>
            <SelectItem value="jetbrains">JetBrains Mono</SelectItem>
            <SelectItem value="courier">Courier New</SelectItem>
            <SelectItem value="consolas">Consolas</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}

// 🎯 목적: LLM Models 메뉴의 콘텐츠 영역 - LLM 모델 관련 설정
function LLMModelsContent() {
  const [claude45Sonnet, setClaude45Sonnet] = React.useState(true);
  const [claude4Sonnet, setClaude4Sonnet] = React.useState(true);
  const [gpt5Codex, setGpt5Codex] = React.useState(true);
  const [gpt5, setGpt5] = React.useState(true);
  const [claude45Haiku, setClaude45Haiku] = React.useState(false);
  const [showAllModels, setShowAllModels] = React.useState(false);
  const [claude3Opus, setClaude3Opus] = React.useState(false);
  const [claude3Sonnet, setClaude3Sonnet] = React.useState(false);
  const [claude3Haiku, setClaude3Haiku] = React.useState(false);
  const [openaiApiEnabled, setOpenaiApiEnabled] = React.useState(true);
  const [anthropicApiEnabled, setAnthropicApiEnabled] = React.useState(false);
  const [googleApiEnabled, setGoogleApiEnabled] = React.useState(false);
  const [anthropicApiKey, setAnthropicApiKey] = React.useState("");
  const [googleApiKey, setGoogleApiKey] = React.useState("");
  const [openaiApiKey, setOpenaiApiKey] = React.useState("••••••••••••");
  const [isOpenaiKeyModified, setIsOpenaiKeyModified] = React.useState(false);
  const [isOpenaiKeyValid, setIsOpenaiKeyValid] = React.useState(true);
  const [openaiKeyError, setOpenaiKeyError] = React.useState("");
  const [isAnthropicKeyModified, setIsAnthropicKeyModified] =
    React.useState(false);
  const [isAnthropicKeyValid, setIsAnthropicKeyValid] = React.useState(true);
  const [anthropicKeyError, setAnthropicKeyError] = React.useState("");
  const [isGoogleKeyModified, setIsGoogleKeyModified] = React.useState(false);
  const [isGoogleKeyValid, setIsGoogleKeyValid] = React.useState(true);
  const [googleKeyError, setGoogleKeyError] = React.useState("");

  // 🎯 목적: API Key 밸리데이션 함수 (OpenAI, Anthropic, Google 공통)
  const validateApiKey = (value: string) => {
    // 영문+숫자조합 OR 영문만 OR 숫자만 허용 (최소 1글자 이상)
    const validPattern = /^[a-zA-Z0-9]+$/;
    return validPattern.test(value) && value.length > 0;
  };

  // 🎯 목적: Alert Dialog 상태 관리 - 각 API Key provider별로 개별 상태
  const [showOpenaiAlert, setShowOpenaiAlert] = React.useState(false);
  const [showAnthropicAlert, setShowAnthropicAlert] = React.useState(false);
  const [showGoogleAlert, setShowGoogleAlert] = React.useState(false);
  const [pendingProvider, setPendingProvider] = React.useState<string>("");

  // 🎯 목적: API Key toggle 변경 시 alert dialog 표시 로직
  const handleApiToggle = (
    provider: "openai" | "anthropic" | "google",
    newValue: boolean,
  ) => {
    if (newValue) {
      // toggle을 켤 때만 alert dialog 표시
      setPendingProvider(provider);
      if (provider === "openai") setShowOpenaiAlert(true);
      else if (provider === "anthropic") setShowAnthropicAlert(true);
      else if (provider === "google") setShowGoogleAlert(true);
    } else {
      // toggle을 끌 때는 즉시 적용
      if (provider === "openai") setOpenaiApiEnabled(false);
      else if (provider === "anthropic") setAnthropicApiEnabled(false);
      else if (provider === "google") setGoogleApiEnabled(false);
    }
  };

  // 🎯 목적: Alert Dialog에서 "Use API Key" 버튼 클릭 시 처리
  const handleConfirmApiKey = () => {
    if (pendingProvider === "openai") {
      setOpenaiApiEnabled(true);
      setShowOpenaiAlert(false);
    } else if (pendingProvider === "anthropic") {
      setAnthropicApiEnabled(true);
      setShowAnthropicAlert(false);
    } else if (pendingProvider === "google") {
      setGoogleApiEnabled(true);
      setShowGoogleAlert(false);
    }
    setPendingProvider("");
  };

  // 🎯 목적: Alert Dialog에서 "Cancel" 버튼 클릭 시 처리
  const handleCancelApiKey = () => {
    setShowOpenaiAlert(false);
    setShowAnthropicAlert(false);
    setShowGoogleAlert(false);
    setPendingProvider("");
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Search Field */}
        <div className="flex w-full flex-col gap-3">
          <Label htmlFor="llm-search" className="text-sm font-medium">
            Control model usage
          </Label>
          <div className="relative flex items-center">
            <Search className="text-muted-foreground absolute left-3 h-4 w-4" />
            <Input
              id="llm-search"
              type="text"
              placeholder="Search model..."
              className="bg-input/30 border-border pl-9"
            />
          </div>
        </div>

        {/* Model List */}
        <div className="flex flex-col gap-5">
          {/* claude-4.5-sonnet */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <Label className="text-sm font-medium">claude-4.5-sonnet</Label>
            </div>
            <Switch
              checked={claude45Sonnet}
              onCheckedChange={setClaude45Sonnet}
            />
          </div>

          {/* claude-4-sonnet */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <Label className="text-sm font-medium">claude-4-sonnet</Label>
            </div>
            <Switch
              checked={claude4Sonnet}
              onCheckedChange={setClaude4Sonnet}
            />
          </div>

          {/* gpt-5-codex */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <Label className="text-sm font-medium">gpt-5-codex</Label>
            </div>
            <Switch checked={gpt5Codex} onCheckedChange={setGpt5Codex} />
          </div>

          {/* gpt-5 */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <Label className="text-sm font-medium">gpt-5</Label>
            </div>
            <Switch checked={gpt5} onCheckedChange={setGpt5} />
          </div>

          {/* claude-4.5-haiku */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <Label className="text-sm font-medium">claude-4.5-haiku</Label>
            </div>
            <Switch
              checked={claude45Haiku}
              onCheckedChange={setClaude45Haiku}
            />
          </div>

          {/* 🎯 목적: 추가 모델들 - showAllModels가 true일 때만 표시 */}
          {showAllModels && (
            <>
              {/* claude-3-opus-20240229 */}
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <Label className="text-sm font-medium">
                    claude-3-opus-20240229
                  </Label>
                </div>
                <Switch
                  checked={claude3Opus}
                  onCheckedChange={setClaude3Opus}
                />
              </div>

              {/* claude-3-sonnet-20240229 */}
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <Label className="text-sm font-medium">
                    claude-3-sonnet-20240229
                  </Label>
                </div>
                <Switch
                  checked={claude3Sonnet}
                  onCheckedChange={setClaude3Sonnet}
                />
              </div>

              {/* claude-3-haiku-20240307 */}
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <Label className="text-sm font-medium">
                    claude-3-haiku-20240307
                  </Label>
                </div>
                <Switch
                  checked={claude3Haiku}
                  onCheckedChange={setClaude3Haiku}
                />
              </div>
            </>
          )}

          {/* View All Models / Collapse Models Button */}
          <Button
            variant="secondary"
            size="sm"
            className="w-fit"
            onClick={() => setShowAllModels(!showAllModels)}
          >
            {showAllModels ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
            {showAllModels ? "Collapse Models" : "View All Models"}
          </Button>
        </div>

        {/* Separator */}
        <Separator className="bg-border" />

        {/* OpenAI API Key */}
        <Field>
          <div className="flex items-start gap-3">
            <div className="flex flex-1 flex-col gap-2">
              <FieldLabel className="text-sm font-medium">
                OpenAI API Key
              </FieldLabel>
              <p className="text-muted-foreground text-sm">
                You can put in your OpenAI key to use OpenAI models at cost.
              </p>
            </div>
            <Switch
              checked={openaiApiEnabled}
              onCheckedChange={(value) => handleApiToggle("openai", value)}
            />
          </div>
          <FieldContent>
            <InputGroup>
              <InputGroupInput
                type="password"
                placeholder="Enter your OpenAI API Key"
                value={openaiApiKey}
                onChange={(e) => {
                  setOpenaiApiKey(e.target.value);
                  setIsOpenaiKeyModified(true);
                  setOpenaiKeyError(""); // 입력 시 에러 메시지 제거
                }}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  variant="default"
                  size="xs"
                  disabled={!isOpenaiKeyModified}
                  onClick={() => {
                    if (isOpenaiKeyModified && openaiApiKey.trim()) {
                      // 🎯 목적: "Verify" 버튼 클릭 시 검증 로직 실행
                      const trimmedKey = openaiApiKey.trim();
                      console.log("Validating API Key:", trimmedKey);
                      console.log(
                        "Validation result:",
                        validateApiKey(trimmedKey),
                      );

                      if (validateApiKey(trimmedKey)) {
                        // 검증 성공: "Verified" 상태로 변경
                        setIsOpenaiKeyModified(false);
                        setIsOpenaiKeyValid(true);
                        setOpenaiKeyError("");
                        console.log(
                          "Validation successful - button should show 'Verified'",
                        );
                      } else {
                        // 검증 실패: "Invalid API Key" 에러 표시
                        setIsOpenaiKeyValid(false);
                        setOpenaiKeyError("Invalid API Key");
                        console.log("Validation failed - showing error");
                      }
                    }
                  }}
                >
                  {isOpenaiKeyModified ? (
                    <>
                      Verify
                      <ArrowRight className="h-3 w-3" />
                    </>
                  ) : (
                    <>
                      <Check className="h-3 w-3" />
                      Verified
                    </>
                  )}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </FieldContent>
          {openaiKeyError && <FieldError>{openaiKeyError}</FieldError>}
        </Field>

        {/* Separator */}
        <Separator className="bg-border" />

        {/* Anthropic API Key */}
        <Field>
          <div className="flex items-start gap-3">
            <div className="flex flex-1 flex-col gap-2">
              <FieldLabel className="text-sm font-medium">
                Anthropic API Key
              </FieldLabel>
              <p className="text-muted-foreground text-sm">
                You can put in your Anthropic key to use Claude at cost. When
                enabled, this key will be used for all models beginning with
                "claude-".
              </p>
            </div>
            <Switch
              checked={anthropicApiEnabled}
              onCheckedChange={(value) => handleApiToggle("anthropic", value)}
            />
          </div>
          <FieldContent>
            <InputGroup>
              <InputGroupInput
                type="password"
                placeholder="Enter your Anthropic API Key"
                value={anthropicApiKey}
                onChange={(e) => {
                  setAnthropicApiKey(e.target.value);
                  setIsAnthropicKeyModified(true);
                  setAnthropicKeyError(""); // 입력 시 에러 메시지 제거
                }}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  variant="default"
                  size="xs"
                  disabled={!isAnthropicKeyModified}
                  onClick={() => {
                    if (isAnthropicKeyModified && anthropicApiKey.trim()) {
                      // 🎯 목적: "Verify" 버튼 클릭 시 검증 로직 실행
                      const trimmedKey = anthropicApiKey.trim();
                      console.log("Validating Anthropic API Key:", trimmedKey);
                      console.log(
                        "Validation result:",
                        validateApiKey(trimmedKey),
                      );

                      if (validateApiKey(trimmedKey)) {
                        // 검증 성공: "Verified" 상태로 변경
                        setIsAnthropicKeyModified(false);
                        setIsAnthropicKeyValid(true);
                        setAnthropicKeyError("");
                        console.log(
                          "Anthropic validation successful - button should show 'Verified'",
                        );
                      } else {
                        // 검증 실패: "Invalid API Key" 에러 표시
                        setIsAnthropicKeyValid(false);
                        setAnthropicKeyError("Invalid API Key");
                        console.log(
                          "Anthropic validation failed - showing error",
                        );
                      }
                    }
                  }}
                >
                  {isAnthropicKeyModified ? (
                    <>
                      Verify
                      <ArrowRight className="h-3 w-3" />
                    </>
                  ) : (
                    <>
                      <Check className="h-3 w-3" />
                      Verified
                    </>
                  )}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </FieldContent>
          {anthropicKeyError && <FieldError>{anthropicKeyError}</FieldError>}
        </Field>

        {/* Separator */}
        <Separator className="bg-border" />

        {/* Google API Key */}
        <Field>
          <div className="flex items-start gap-3">
            <div className="flex flex-1 flex-col gap-2">
              <FieldLabel className="text-sm font-medium">
                Google API Key
              </FieldLabel>
              <p className="text-muted-foreground text-sm">
                You can put in your Google AI Studio key to use Google models
                at-cost.
              </p>
            </div>
            <Switch
              checked={googleApiEnabled}
              onCheckedChange={(value) => handleApiToggle("google", value)}
            />
          </div>
          <FieldContent>
            <InputGroup>
              <InputGroupInput
                type="password"
                placeholder="Enter your Google AI Studio API Key"
                value={googleApiKey}
                onChange={(e) => {
                  setGoogleApiKey(e.target.value);
                  setIsGoogleKeyModified(true);
                  setGoogleKeyError(""); // 입력 시 에러 메시지 제거
                }}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  variant="default"
                  size="xs"
                  disabled={!isGoogleKeyModified}
                  onClick={() => {
                    if (isGoogleKeyModified && googleApiKey.trim()) {
                      // 🎯 목적: "Verify" 버튼 클릭 시 검증 로직 실행
                      const trimmedKey = googleApiKey.trim();
                      console.log("Validating Google API Key:", trimmedKey);
                      console.log(
                        "Validation result:",
                        validateApiKey(trimmedKey),
                      );

                      if (validateApiKey(trimmedKey)) {
                        // 검증 성공: "Verified" 상태로 변경
                        setIsGoogleKeyModified(false);
                        setIsGoogleKeyValid(true);
                        setGoogleKeyError("");
                        console.log(
                          "Google validation successful - button should show 'Verified'",
                        );
                      } else {
                        // 검증 실패: "Invalid API Key" 에러 표시
                        setIsGoogleKeyValid(false);
                        setGoogleKeyError("Invalid API Key");
                        console.log("Google validation failed - showing error");
                      }
                    }
                  }}
                >
                  {isGoogleKeyModified ? (
                    <>
                      Verify
                      <ArrowRight className="h-3 w-3" />
                    </>
                  ) : (
                    <>
                      <Check className="h-3 w-3" />
                      Verified
                    </>
                  )}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </FieldContent>
          {googleKeyError && <FieldError>{googleKeyError}</FieldError>}
        </Field>

        {/* 🎯 목적: OpenAI API Key 사용 확인 Alert Dialog */}
        <AlertDialog open={showOpenaiAlert} onOpenChange={setShowOpenaiAlert}>
          <AlertDialogContent className="gap-4 p-6 sm:max-w-[425px]">
            <AlertDialogHeader className="gap-2">
              <AlertDialogTitle>Use OpenAI API Key</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to use your own OpenAI API key? Several of
                Cursor's features require custom models (Tab, Apply from Chat,
                Agent), which cannot be billed to an API key.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="gap-2">
              <AlertDialogCancel onClick={handleCancelApiKey}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmApiKey}>
                Use API Key
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* 🎯 목적: Anthropic API Key 사용 확인 Alert Dialog */}
        <AlertDialog
          open={showAnthropicAlert}
          onOpenChange={setShowAnthropicAlert}
        >
          <AlertDialogContent className="gap-4 p-6 sm:max-w-[425px]">
            <AlertDialogHeader className="gap-2">
              <AlertDialogTitle>Use Anthropic API Key</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to use your own Anthropic API key? Several
                of Cursor's features require custom models (Tab, Apply from
                Chat, Agent), which cannot be billed to an API key.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="gap-2">
              <AlertDialogCancel onClick={handleCancelApiKey}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmApiKey}>
                Use API Key
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* 🎯 목적: Google API Key 사용 확인 Alert Dialog */}
        <AlertDialog open={showGoogleAlert} onOpenChange={setShowGoogleAlert}>
          <AlertDialogContent className="gap-4 p-6 sm:max-w-[425px]">
            <AlertDialogHeader className="gap-2">
              <AlertDialogTitle>Use Google API Key</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to use your own Google API key? Several of
                Cursor's features require custom models (Tab, Apply from Chat,
                Agent), which cannot be billed to an API key.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="gap-2">
              <AlertDialogCancel onClick={handleCancelApiKey}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmApiKey}>
                Use API Key
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}

// 🎯 목적: Kubernetes 메뉴의 콘텐츠 영역 - 쿠버네티스 관련 설정
function KubernetesContent() {
  const [kubectlBinaryDownload, setKubectlBinaryDownload] =
    React.useState(false);
  const [showHelmRepoDialog, setShowHelmRepoDialog] = React.useState(false);
  const [helmRepoName, setHelmRepoName] = React.useState("");
  const [helmRepoUrl, setHelmRepoUrl] = React.useState("");

  return (
    <>
      {/* Kubectl binary download */}
      <div className="flex items-start gap-3">
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center gap-3">
            <Label
              htmlFor="kubectl-binary-download"
              className="text-foreground flex-1 text-sm font-medium"
            >
              Kubectl binary download
            </Label>
            <Switch
              id="kubectl-binary-download"
              checked={kubectlBinaryDownload}
              onCheckedChange={setKubectlBinaryDownload}
            />
          </div>
          <p className="text-muted-foreground text-sm">
            Download kubectl binaries matching the kubernetes cluster version
          </p>
        </div>
      </div>

      {/* Download mirror */}
      <div className="flex w-full flex-col gap-3">
        <Label
          htmlFor="download-mirror"
          className="text-foreground text-sm font-medium"
        >
          Download mirror
        </Label>
        <Select defaultValue="google">
          <SelectTrigger className="bg-input/30 border-border w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="google">Default (Google)</SelectItem>
            <SelectItem value="azure">Azure</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Directory for binaries */}
      <div className="flex w-full flex-col gap-3">
        <Label
          htmlFor="directory-binaries"
          className="text-foreground text-sm font-medium"
        >
          Directory for binaries
        </Label>
        <Input
          id="directory-binaries"
          type="text"
          placeholder="/Users/mihyeon/Library/Application Support/DAIVE/binaries"
          className="bg-input/30 border-border"
          disabled={!kubectlBinaryDownload}
        />
        <p className="text-muted-foreground text-sm">
          The directory to download binaries into.
        </p>
      </div>

      {/* Path to kubectl binary */}
      <div className="flex w-full flex-col gap-3">
        <Label
          htmlFor="kubectl-binary-path"
          className="text-foreground text-sm font-medium"
        >
          Path to kubectl binary
        </Label>
        <Input
          id="kubectl-binary-path"
          type="text"
          placeholder="/Users/mihyeon/Library/Application Support/DAIVE/binaries/kubectl"
          className="bg-input/30 border-border"
          disabled={kubectlBinaryDownload}
        />
      </div>

      {/* Separator */}
      <Separator className="bg-border" />

      {/* Synced items */}
      <div className="flex flex-col gap-3">
        <Label className="text-foreground text-sm font-medium">
          Synced items
        </Label>

        <div className="flex flex-col gap-2">
          {/* Item 1 */}
          <div className="hover:bg-accent/50 flex items-center gap-3 rounded-lg p-3">
            <FileQuestion className="text-muted-foreground h-5 w-5" />
            <div className="flex-1">
              <p className="text-muted-foreground text-sm">
                /Users/mihyeon/.kube
              </p>
            </div>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Item 2 */}
          <div className="hover:bg-accent/50 flex items-center gap-3 rounded-lg p-3">
            <FileText className="text-muted-foreground h-5 w-5" />
            <div className="flex-1">
              <p className="text-muted-foreground text-sm">
                /Users/mihyeon/Documents/ev5-25my-wide-exterior-01 6.png
              </p>
            </div>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Sync kubeconfig button */}
        <div className="flex justify-end">
          <Button className="w-fit">
            <FolderSync className="h-4 w-4" />
            Sync kubeconfig
          </Button>
        </div>
      </div>

      {/* Separator */}
      <Separator className="bg-border" />

      {/* Helm charts */}
      <div className="flex items-end gap-3">
        <div className="flex flex-1 flex-col gap-3">
          <Label
            htmlFor="helm-charts"
            className="text-foreground text-sm font-medium"
          >
            Helm charts
          </Label>
          <Select defaultValue="repositories">
            <SelectTrigger className="bg-input/30 border-border w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="repositories">Repositories</SelectItem>
              <SelectItem value="stable">Stable</SelectItem>
              <SelectItem value="incubator">Incubator</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setShowHelmRepoDialog(true)}>
          Add custom helm repo
        </Button>
      </div>

      {/* Add Custom Helm Repo Dialog */}
      <Dialog open={showHelmRepoDialog} onOpenChange={setShowHelmRepoDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add custom Helm Repo</DialogTitle>
            <DialogDescription>Please add a helm repo.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            {/* Helm repo name */}
            <div className="grid gap-3">
              <Label htmlFor="helm-repo-name">Helm repo name</Label>
              <Input
                id="helm-repo-name"
                type="text"
                placeholder="Enter a name"
                className="bg-input/30 border-border"
                value={helmRepoName}
                onChange={(e) => setHelmRepoName(e.target.value)}
              />
            </div>

            {/* URL */}
            <div className="grid gap-3">
              <Label htmlFor="helm-repo-url">URL</Label>
              <Input
                id="helm-repo-url"
                type="text"
                placeholder="Enter a url"
                className="bg-input/30 border-border"
                value={helmRepoUrl}
                onChange={(e) => setHelmRepoUrl(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setShowHelmRepoDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // 🎯 목적: Helm repo 추가 로직 (여기서는 단순히 Dialog 닫기)
                console.log("Adding helm repo:", {
                  name: helmRepoName,
                  url: helmRepoUrl,
                });
                setHelmRepoName("");
                setHelmRepoUrl("");
                setShowHelmRepoDialog(false);
              }}
            >
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function SettingsDialog() {
  const [open, setOpen] = React.useState(true);
  const [activeMenu, setActiveMenu] = React.useState("App");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="flex h-[85vh] max-h-[900px] max-w-[70%] flex-col overflow-hidden p-0 sm:h-[90vh] sm:max-w-[65%] lg:max-w-[60%] xl:max-w-[55%]">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Customize your settings here.
        </DialogDescription>
        <SidebarProvider className="items-start">
          <Sidebar collapsible="none" className="flex">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {data.nav.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          isActive={item.name === activeMenu}
                          onClick={() => setActiveMenu(item.name)}
                        >
                          <item.icon />
                          <span>{item.name}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">Settings</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{activeMenu}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div
              className="flex-1 overflow-y-auto"
              style={{ maxHeight: "calc(100vh - 200px)" }}
            >
              <div className="flex flex-col gap-6 p-4 pt-0">
                {activeMenu === "App" && <AppContent />}
                {activeMenu === "Proxy" && <ProxyContent />}
                {activeMenu === "Kubernetes" && <KubernetesContent />}
                {activeMenu === "Editor" && <EditorContent />}
                {activeMenu === "Terminal" && <TerminalContent />}
                {activeMenu === "LLM Models" && <LLMModelsContent />}
              </div>
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
}
