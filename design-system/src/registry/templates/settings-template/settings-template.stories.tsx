import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SettingsDialog } from "../../../../components/settings-dialog";
import {
  Settings,
  Network,
  Terminal,
  Layers,
  BarChart3,
  Hexagon,
  RefreshCw,
  FolderSearch,
  RotateCcw,
  ChevronDown,
  X,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemActions,
} from "@/components/ui/item";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

// 🎯 목적: 클러스터 설정 메뉴 데이터 - 클러스터 관련 6개 메뉴
const clusterMenuData = {
  nav: [
    { name: "General", icon: Settings },
    { name: "Proxy", icon: Network },
    { name: "Terminal", icon: Terminal },
    { name: "Namespace", icon: Layers },
    { name: "Metrics", icon: BarChart3 },
    { name: "Node Shell", icon: Hexagon },
  ],
};

// 🎯 목적: General 메뉴 콘텐츠 - 클러스터 일반 설정
// ✨ 기능: Avatar, Button 클릭 시 OS 파일 선택 창 호출
function GeneralContent() {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const kubeconfigInputRef = React.useRef<HTMLInputElement>(null);

  // Avatar 클릭: 이미지 파일 선택 (OS 파일 탐색기 호출)
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // Avatar 이미지 파일 선택 처리
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Selected avatar image:", file.name);
      // 실제 구현: 이미지 업로드 및 프리뷰 처리
    }
  };

  // Kubeconfig Button 클릭: kubeconfig 파일 선택 (OS 파일 탐색기 호출)
  const handleKubeconfigClick = () => {
    kubeconfigInputRef.current?.click();
  };

  // Kubeconfig 파일 선택 처리
  const handleKubeconfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Selected kubeconfig:", file.name);
      // 실제 구현: kubeconfig 파일 경로 업데이트
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Cluster profile 섹션: Avatar 클릭 시 이미지 파일 선택 */}
      <div className="flex flex-col gap-3">
        <Label className="text-foreground text-sm font-medium">
          Cluster profile
        </Label>
        <div className="flex items-center gap-2.5">
          {/* Avatar 클릭: OS 파일 선택 창 호출 (이미지 파일) */}
          <Avatar
            className="h-8 w-8 cursor-pointer hover:opacity-80"
            onClick={handleAvatarClick}
          >
            <AvatarImage src="https://github.com/shadcn.png" alt="Cluster" />
            <AvatarFallback>CP</AvatarFallback>
          </Avatar>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
          <Input
            type="text"
            placeholder="Placeholder"
            className="border-border bg-input/30 flex-1"
          />
        </div>
      </div>

      {/* Kubeconfig 섹션: Button 클릭 시 kubeconfig 파일 선택 */}
      <div className="flex flex-col gap-3">
        <Label className="text-foreground text-sm font-medium">
          Kubeconfig
        </Label>
        {/* Button 클릭: OS 파일 선택 창 호출 (kubeconfig 파일) */}
        <Button
          variant="secondary"
          className="bg-secondary hover:bg-secondary/80 justify-between"
          onClick={handleKubeconfigClick}
        >
          <span className="flex-1 truncate text-left">
            /Users/mihyeon/Library/Application
            Support/DAIVE/kubeconfigs/13a662d5-95ac-4d8a-a60d-8ae65ea7b3a2
          </span>
          <RefreshCw className="h-4 w-4 flex-shrink-0" />
        </Button>
        <input
          ref={kubeconfigInputRef}
          type="file"
          className="hidden"
          onChange={handleKubeconfigChange}
        />
      </div>
    </div>
  );
}

// 🎯 목적: Proxy 메뉴 콘텐츠 - 클러스터 프록시 설정
// ✨ 구조: Field (Label + Input + Description)
function ClusterProxyContent() {
  return (
    <div className="flex w-full flex-col gap-3">
      {/* HTTP proxy Field: Label + Input + Description */}
      <Label
        htmlFor="http-proxy"
        className="text-foreground text-sm font-medium"
      >
        HTTP proxy
      </Label>
      <Input
        id="http-proxy"
        type="text"
        placeholder="http://<address>:<port>"
        className="border-border bg-input/30"
      />
      <p className="text-muted-foreground text-sm">
        HTTP Proxy server. Used for communicating with Kubernetes API.
      </p>
    </div>
  );
}

// 🎯 목적: Terminal 메뉴 콘텐츠 - 클러스터 터미널 설정
function ClusterTerminalContent() {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Working directory 버튼 클릭: 디렉토리 선택 (OS 파일 탐색기 호출)
  const handleDirectoryClick = () => {
    fileInputRef.current?.click();
  };

  // 디렉토리 선택 처리
  const handleDirectoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Selected directory:", file.name);
      // 실제 구현: 디렉토리 경로 업데이트
    }
  };

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Working directory Field */}
      <div className="flex w-full flex-col gap-3">
        <Label
          htmlFor="working-directory"
          className="text-foreground text-sm font-medium"
        >
          Working directory
        </Label>
        <InputGroup>
          <InputGroupInput
            id="working-directory"
            type="text"
            defaultValue="$HOME"
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              variant="default"
              size="icon-xs"
              onClick={handleDirectoryClick}
            >
              <FolderSearch className="h-4 w-4" />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleDirectoryChange}
        />
        <p className="text-muted-foreground text-sm leading-5">
          An explicit start path where the terminal will be launched, this is
          used as the current working directory (cwd) for the shell process.
        </p>
      </div>

      {/* Default namespace Field */}
      <div className="flex w-full flex-col gap-3">
        <Label
          htmlFor="default-namespace"
          className="text-foreground text-sm font-medium"
        >
          Default namespace
        </Label>
        <Input
          id="default-namespace"
          type="text"
          placeholder="default"
          className="bg-input/30 border-border"
        />
        <p className="text-muted-foreground text-sm leading-5">
          Default namespace used for kubectl.
        </p>
      </div>
    </div>
  );
}

// 🎯 목적: Namespace 메뉴 콘텐츠 - 네임스페이스 설정
function NamespaceContent() {
  return (
    <Field>
      <Label
        htmlFor="accessible-namespaces"
        className="text-foreground text-sm font-medium"
      >
        Accessible namespaces
      </Label>
      <Input
        id="accessible-namespaces"
        type="text"
        placeholder="Add new namespaces (comma-separated)..."
        className="bg-input/30 border-border"
      />
      <FieldDescription>
        This setting is useful for manually specifying which namespaces you have
        access to. This is useful when you do not have permissions to list
        namespaces.
      </FieldDescription>
    </Field>
  );
}

// 🎯 목적: Metrics 메뉴 콘텐츠 - 메트릭 수집 설정
function MetricsContent() {
  // 선택된 메트릭 상태 관리
  const [selectedMetrics, setSelectedMetrics] = React.useState<string[]>([]);

  // 체크박스 토글 핸들러
  const handleMetricToggle = (
    metric: string,
    checked: boolean | "indeterminate",
  ) => {
    if (checked === true) {
      setSelectedMetrics([...selectedMetrics, metric]);
    } else {
      setSelectedMetrics(selectedMetrics.filter((m) => m !== metric));
    }
  };

  // 메트릭 제거 핸들러
  const handleRemoveMetric = (metric: string) => {
    setSelectedMetrics(selectedMetrics.filter((m) => m !== metric));
  };

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Metric Collection Method Field */}
      <Field>
        <Label
          htmlFor="metric-collection-method"
          className="text-foreground text-sm font-medium"
        >
          Metric Collection Method
        </Label>
        <Select defaultValue="auto-detect">
          <SelectTrigger
            id="metric-collection-method"
            className="bg-input/30 border-border w-full"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="auto-detect">Auto detect</SelectItem>
          </SelectContent>
        </Select>
      </Field>

      {/* Filesystem mountpoints Field */}
      <Field>
        <Label
          htmlFor="filesystem-mountpoints"
          className="text-foreground text-sm font-medium"
        >
          Filesystem mountpoints
        </Label>
        <Input
          id="filesystem-mountpoints"
          type="text"
          placeholder="/I/local"
          className="bg-input/30 border-border"
        />
        <FieldDescription>
          A regexp for the label with the filesystem mountpoints that will
          create a graph for disk usage. For the root disk only use "/" and for
          all disks use ".*".
        </FieldDescription>
      </Field>

      {/* Separator */}
      <Separator />

      {/* Hide metrics from the UI */}
      <div className="flex flex-col gap-3">
        <div className="flex items-end gap-2 self-stretch">
          <Field className="flex-1">
            <Label className="text-foreground text-sm font-medium">
              Hide metrics from the UI
            </Label>
            <Popover modal={false}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="bg-input/30 border-border w-full justify-between"
                  onClick={() => console.log("Button clicked!")}
                >
                  <span className="text-muted-foreground">
                    {selectedMetrics.length > 0
                      ? `${selectedMetrics.length} metrics selected`
                      : "Select metrics to hide..."}
                  </span>
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="min-w-[var(--radix-popover-trigger-width)] p-0"
                align="start"
                sideOffset={4}
              >
                <Command>
                  <CommandList>
                    <CommandEmpty>No metrics found.</CommandEmpty>
                    <CommandGroup>
                      <CommandItem
                        onSelect={() =>
                          handleMetricToggle(
                            "Repositories",
                            !selectedMetrics.includes("Repositories"),
                          )
                        }
                      >
                        <Checkbox
                          checked={selectedMetrics.includes("Repositories")}
                          className="pointer-events-none"
                        />
                        <span>Repositories</span>
                      </CommandItem>
                      <CommandItem
                        onSelect={() =>
                          handleMetricToggle(
                            "CPU",
                            !selectedMetrics.includes("CPU"),
                          )
                        }
                      >
                        <Checkbox
                          checked={selectedMetrics.includes("CPU")}
                          className="pointer-events-none"
                        />
                        <span>CPU</span>
                      </CommandItem>
                      <CommandItem
                        onSelect={() =>
                          handleMetricToggle(
                            "Memory",
                            !selectedMetrics.includes("Memory"),
                          )
                        }
                      >
                        <Checkbox
                          checked={selectedMetrics.includes("Memory")}
                          className="pointer-events-none"
                        />
                        <span>Memory</span>
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </Field>
          <Button>Hide all metics</Button>
          <Button variant="secondary" size="icon">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {/* 선택된 메트릭 리스트 표시 */}
        {selectedMetrics.length > 0 && (
          <div className="space-y-2">
            {selectedMetrics.map((metric) => (
              <Item key={metric} variant="outline" size="sm">
                <ItemContent>
                  <ItemTitle>{metric}</ItemTitle>
                </ItemContent>
                <ItemActions>
                  <X
                    className="h-4 w-4 cursor-pointer"
                    onClick={() => handleRemoveMetric(metric)}
                  />
                </ItemActions>
              </Item>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// 🎯 목적: Node Shell 메뉴 콘텐츠 - 노드 셸 접근 설정
function NodeShellContent() {
  return (
    <div className="flex w-full flex-col gap-6">
      {/* Node shell image for Linux Field */}
      <Field>
        <Label
          htmlFor="node-shell-linux"
          className="text-foreground text-sm font-medium"
        >
          Node shell image for Linux
        </Label>
        <Input
          id="node-shell-linux"
          type="text"
          placeholder="Default image: {}"
          className="bg-input/30 border-border"
        />
        <FieldDescription>
          Node shell image. Used for creating node shell pod on Linux nodes.
        </FieldDescription>
      </Field>

      {/* Node shell image for Windows Field */}
      <Field>
        <Label
          htmlFor="node-shell-windows"
          className="text-foreground text-sm font-medium"
        >
          Node shell image for Windows
        </Label>
        <Input
          id="node-shell-windows"
          type="text"
          placeholder="Default image: {}"
          className="bg-input/30 border-border"
        />
        <FieldDescription>
          Node shell image. Used for creating node shell pod on Windows nodes.
        </FieldDescription>
      </Field>

      {/* Image pull secret Field */}
      <Field>
        <Label
          htmlFor="image-pull-secret"
          className="text-foreground text-sm font-medium"
        >
          Image pull secret
        </Label>
        <Input
          id="image-pull-secret"
          type="text"
          placeholder="Specify a secret name..."
          className="bg-input/30 border-border"
        />
        <FieldDescription>
          Name of a pre-existing secret in the kube-system namespace. An
          optional setting. Used for pulling image from a private registry.
        </FieldDescription>
      </Field>
    </div>
  );
}

// 🎯 목적: 클러스터 전용 설정 다이얼로그 컴포넌트
function ClusterSettingsDialog() {
  const [open, setOpen] = React.useState(true);
  const [activeMenu, setActiveMenu] = React.useState("General");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Open Cluster Settings</Button>
      </DialogTrigger>
      <DialogContent className="flex h-[85vh] max-h-[900px] max-w-[70%] flex-col overflow-hidden p-0 sm:h-[90vh] sm:max-w-[65%] lg:max-w-[60%] xl:max-w-[55%]">
        <DialogTitle className="sr-only">Cluster Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Customize your cluster settings here.
        </DialogDescription>
        <SidebarProvider className="items-start">
          <Sidebar collapsible="none" className="flex">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {clusterMenuData.nav.map((item) => (
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
                      <BreadcrumbLink href="#">Cluster Settings</BreadcrumbLink>
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
                {activeMenu === "General" && <GeneralContent />}
                {activeMenu === "Proxy" && <ClusterProxyContent />}
                {activeMenu === "Terminal" && <ClusterTerminalContent />}
                {activeMenu === "Namespace" && <NamespaceContent />}
                {activeMenu === "Metrics" && <MetricsContent />}
                {activeMenu === "Node Shell" && <NodeShellContent />}
              </div>
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
}

/**
 * 다이얼로그 내에 사이드바가 포함된 설정 템플릿입니다.
 *
 * 🎯 목적: Dialog 안에서 사용 가능한 Sidebar 컴포넌트 데모
 * ✨ 특징:
 * - Dialog 모달 내부에 Sidebar 레이아웃 구현
 * - 설정 카테고리별 네비게이션 제공
 * - 반응형 디자인 (모바일에서는 사이드바 숨김)
 * - Breadcrumb 네비게이션 포함
 * - 12개의 설정 카테고리 메뉴
 */
const meta = {
  title: "templates/Settings",
  component: SettingsDialog,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `Dialog 내부에 Sidebar가 포함된 설정 템플릿입니다. VS Code의 설정 페이지와 유사한 레이아웃으로, 좌측에는 설정 카테고리 네비게이션이, 우측에는 설정 내용이 표시됩니다. 모바일에서는 사이드바가 숨겨지고 콘텐츠만 표시됩니다.`,
      },
    },
  },
} satisfies Meta<typeof SettingsDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * 기본 설정 다이얼로그 템플릿입니다.
 *
 * 🎯 목적: Dialog 내 Sidebar 레이아웃의 완전한 기능 데모
 * ✨ 특징:
 * - 설정 카테고리: Notifications, Navigation, Home, Appearance 등 12개 메뉴
 * - 활성 메뉴: "Messages & media" 기본 선택
 * - 반응형 레이아웃: 데스크톱에서만 사이드바 표시
 * - Breadcrumb: Settings > Messages & media 경로 표시
 */
export const Default: Story = {
  render: () => {
    return (
      <div className="bg-background flex h-screen w-full items-center justify-center">
        <SettingsDialog />
      </div>
    );
  },
};

/**
 * 클러스터 설정 다이얼로그 템플릿입니다.
 *
 * 🎯 목적: Default 스토리와 독립적인 클러스터 전용 설정 다이얼로그
 * ✨ 특징:
 * - 클러스터 전용 메뉴: General, Proxy, Terminal, Namespace, Metrics, Node Shell
 * - Default와 완전히 독립적인 구조
 * - 클러스터 관련 설정 시나리오에 특화
 */
export const ClusterSettings: Story = {
  render: () => {
    return (
      <div className="bg-background flex h-screen w-full items-center justify-center">
        <ClusterSettingsDialog />
      </div>
    );
  },
};

/**
 * 설정 다이얼로그를 위한 인터랙션 테스트입니다.
 *
 * 🎯 목적: Dialog 열기/닫기 및 사이드바 네비게이션 테스트
 * ✨ 테스트 항목:
 * - Dialog trigger 버튼 클릭
 * - 사이드바 메뉴 항목들 확인
 * - Breadcrumb 네비게이션 확인
 * - 콘텐츠 영역 렌더링 확인
 */
export const InteractionTest: Story = {
  tags: ["!dev", "!autodocs"],
  render: () => {
    return (
      <div className="bg-background flex h-screen w-full items-center justify-center p-8">
        <div className="text-center">
          <h2 className="mb-4 text-lg font-semibold">
            Setting Dialog Template
          </h2>
          <p className="text-muted-foreground mb-6 text-sm">
            Dialog 내부에 Sidebar가 포함된 설정 템플릿을 테스트합니다.
          </p>
          <SettingsDialog />
        </div>
      </div>
    );
  },
};
