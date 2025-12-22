import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { BaseStructureTemplate } from "./base-structure-template";
import { Header } from "@/registry/templates/header/header";
import { AIAssistant } from "@/registry/templates/ai-assistant/ai-assistant";
import { ResizableAppSidebar } from "@/components/resizable-app-sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  SidebarProvider,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  X,
  Bell,
  FileText,
  FileJson,
  Terminal,
  Plus,
  Expand,
  Search,
  Filter,
  MoreHorizontal,
  ChevronRight,
  ChevronDown,
  CircleGauge,
  FolderKanban,
  Server,
} from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Hotbar } from "@/components/hotbar";

/**
 * 🎭 실제 적용 시 mock data 삭제 필수
 *
 * 🎯 목적: 다양한 길이의 클러스터 이름 테스트를 위한 예시 데이터
 * - 짧은 이름: docker-desktop
 * - 중간 이름: kubernetes-admin@...
 * - 긴 AWS ARN: arn:aws:eks:...
 */
const EXAMPLE_CLUSTERS = [
  "docker-desktop",
  "kubernetes-admin@starlord-nfs",
  "kubernetes-admin@cluster.local",
  "arn:aws:eks:ap-northeast-2:585748631694:cluster/funny-metal-pumpkin",
  "arn:aws:eks:ap-southeast-1:585748631694:cluster/dev-cluster-bp",
];

/**
 * 모듈화된 베이스 구조 템플릿을 보여주는 Storybook 스토리입니다.
 *
 * 🎯 목적: Header, Sidebar, AI Assistant 템플릿을 조합한 완전한 3열 레이아웃 데모
 *
 * 특징:
 * - Header 템플릿의 검색 기능과 버튼 그룹 (AI Assistant 토글 버튼 포함)
 * - Sidebar 템플릿의 파일 트리와 네비게이션
 * - AI Assistant 템플릿의 설정 패널과 인터랙션
 * - 커스터마이징 가능한 메인 콘텐츠 영역
 * - UIDL 명세서에 따른 3열 레이아웃 구조
 */
const meta = {
  title: "templates/BaseStructure",
  component: BaseStructureTemplate,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `Header, Sidebar, AI Assistant 템플릿을 조합한 모듈화된 베이스 구조 템플릿입니다. 3열 레이아웃 구조로 구성되며, 각 템플릿은 독립적으로 사용할 수도 있고 조합하여 완전한 레이아웃을 구성할 수도 있습니다.`,
      },
    },
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BaseStructureTemplate>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * 기본 베이스 구조 템플릿입니다.
 *
 * 🎯 목적: Header, VS Code Activity Bar 스타일 Hotbar, 리사이즈 가능한 Sidebar, AI Assistant가 결합된 완전한 4열 레이아웃 데모
 * ✨ 특징:
 * - VS Code Activity Bar 스타일의 좌측 핫바 (Explorer, Search, Git 등)
 * - 핫바 아이템 클릭 시 사이드바 자동 표시
 * - Header의 PanelLeft 버튼으로 사이드바 토글
 * - AI Assistant 패널 토글 및 닫기 기능
 */
export const Structure: Story = {
  decorators: [
    (Story) => (
      <SidebarProvider
        style={
          {
            "--sidebar-width-icon": "3rem", // 48px - shadcn/ui 공식 방법
          } as React.CSSProperties
        }
      >
        <Story />
      </SidebarProvider>
    ),
  ],
  render: () => {
    // 🎯 목적: 클러스터 탭 목록 상태 관리
    interface Tab {
      id: string;
      clusterName: string;
      isActive: boolean;
    }
    const [tabs, setTabs] = React.useState<Tab[]>([
      { id: "1", clusterName: EXAMPLE_CLUSTERS[0], isActive: true },
    ]);

    // 🎯 목적: 다음 추가할 클러스터 인덱스 추적
    const [nextClusterIndex, setNextClusterIndex] = React.useState(1);

    // 🎯 목적: 각 탭의 호버 상태 관리
    const [hoveredTab, setHoveredTab] = React.useState<string | null>(null);

    // 🎯 목적: 선택된 탭 참조 (자동 스크롤용)
    const selectedTabRef = React.useRef<HTMLDivElement>(null);

    // 🎯 목적: 이전 활성 탭 ID 추적 (탭 닫기 시 복원용)
    const [previousActiveTabId, setPreviousActiveTabId] = React.useState<
      string | null
    >(null);

    // 🎯 목적: AI Assistant 표시 상태 관리
    const [isAIAssistantVisible, setIsAIAssistantVisible] =
      React.useState(true);

    // 🎯 목적: 사이드바 표시 상태 관리
    const [isSidebarVisible, setIsSidebarVisible] = React.useState(true);

    // 🎯 목적: 핫바 활성 아이템 상태 관리 - 단일 활성 상태
    const [activeItem, setActiveItem] = React.useState("explorer");

    // 🎯 목적: 하단 패널 표시 상태 관리
    const [isPanelVisible, setIsPanelVisible] = React.useState(true);

    // 🎯 목적: Extensions 섹션 확장 상태 관리 (메인 Structure 스토리용)
    const [isMainExtensionsOpen, setIsMainExtensionsOpen] =
      React.useState(false);

    // 🎯 목적: Hotbar 하단 3개 메뉴를 기반으로 한 확장 프로그램 데이터 (메인 Structure 스토리용)
    const mainExtensionItems = [
      {
        id: "skuber-observability",
        name: "Skuber+ Observability",
        description: "Real-time monitoring and system observability platform",
        icon: CircleGauge,
      },
      {
        id: "skuber-management",
        name: "Skuber+ Management",
        description: "Complete workflow and resource management solution",
        icon: FolderKanban,
      },
      {
        id: "skuber-optimization",
        name: "Skuber+ Optimization",
        description: "Performance optimization and server resource management",
        icon: Server,
      },
    ];

    // 🎯 목적: AI Assistant 토글 핸들러
    const handleAIAssistantToggle = () => {
      setIsAIAssistantVisible((prev) => !prev);
    };

    // 🎯 목적: AI Assistant 닫기 핸들러
    const handleAIAssistantClose = () => {
      setIsAIAssistantVisible(false);
    };

    // 🎯 목적: 사이드바 토글 핸들러 (Header의 PanelLeft 버튼용)
    const handlePanelLeftToggle = () => {
      setIsSidebarVisible((prev) => !prev);
    };

    // 🎯 목적: 하단 패널 토글 핸들러
    const handlePanelBottomToggle = () => {
      setIsPanelVisible((prev) => !prev);
    };

    // 🎯 목적: 핫바 아이템 클릭 핸들러 - 단일 활성 상태 관리
    const handleHotbarItemClick = (itemId: string) => {
      // 모든 핫바 아이템은 단일 활성 상태로 관리
      setActiveItem(itemId);

      // 사이드바가 숨겨져 있다면 다시 표시
      if (!isSidebarVisible) {
        setIsSidebarVisible(true);
      }
    };

    // 🎯 목적: 새 탭 추가 핸들러 (추가된 탭을 활성화)
    const handleAddTab = () => {
      const newTab: Tab = {
        id: Date.now().toString(),
        clusterName:
          EXAMPLE_CLUSTERS[nextClusterIndex % EXAMPLE_CLUSTERS.length],
        isActive: true,
      };
      // 기존 탭들은 비활성화하고 새 탭 추가
      setTabs([...tabs.map((tab) => ({ ...tab, isActive: false })), newTab]);
      setNextClusterIndex(nextClusterIndex + 1);
    };

    // 🎯 목적: 탭 제거 핸들러 (최소 1개 유지)
    const handleCloseTab = (tabId: string) => {
      if (tabs.length === 1) return;

      setTabs((prev) => {
        const closedTabIndex = prev.findIndex((tab) => tab.id === tabId);
        const closedTab = prev[closedTabIndex];
        const newTabs = prev.filter((tab) => tab.id !== tabId);

        // 삭제된 탭이 활성 탭이었다면
        if (closedTab?.isActive && newTabs.length > 0) {
          // 1순위: 이전 활성 탭이 남아있으면 그것을 활성화
          const previousTab = newTabs.find(
            (tab) => tab.id === previousActiveTabId,
          );
          if (previousTab) {
            previousTab.isActive = true;
          } else {
            // 2순위: 인접 탭 활성화 (오른쪽 우선, 없으면 왼쪽)
            const newIndex =
              closedTabIndex >= newTabs.length
                ? newTabs.length - 1
                : closedTabIndex;
            newTabs[newIndex].isActive = true;
          }
        }
        return newTabs;
      });
    };

    // 🎯 목적: 탭 클릭 시 활성 탭 전환 핸들러
    const handleTabClick = (tabId: string) => {
      setTabs((prev) => {
        const currentActiveTab = prev.find((tab) => tab.isActive);
        if (currentActiveTab && currentActiveTab.id !== tabId) {
          setPreviousActiveTabId(currentActiveTab.id);
        }
        return prev.map((tab) => ({
          ...tab,
          isActive: tab.id === tabId,
        }));
      });
    };

    // 🎯 목적: 선택된 탭으로 자동 스크롤 (클러스터 이름 전체 표시)
    React.useEffect(() => {
      if (selectedTabRef.current) {
        selectedTabRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }, [tabs]);

    return (
      <div className="bg-background flex h-screen w-full flex-col">
        <Header
          searchQuery=""
          onSearchChange={() => {}}
          onNavigationBack={() => {}}
          onNavigationForward={() => {}}
          onPanelLeftToggle={handlePanelLeftToggle}
          onPanelBottomToggle={handlePanelBottomToggle}
          onAiAssistantToggle={handleAIAssistantToggle}
          isPanelLeftActive={isSidebarVisible}
          isPanelBottomActive={isPanelVisible}
          isAiAssistantActive={isAIAssistantVisible}
        />
        <div className="flex flex-1">
          {/* 핫바 영역 (고정 크기) - 모든 화면 크기에서 표시 */}
          <div className="w-[var(--sidebar-width-icon)] flex-shrink-0">
            <Hotbar
              activeItem={activeItem}
              onItemClick={handleHotbarItemClick}
            />
          </div>

          {/* 사이드바 + 메인 콘텐츠 + AI Assistant 영역 (리사이즈 가능) */}
          <div className="flex-1">
            <ResizablePanelGroup
              direction="horizontal"
              className="h-full w-full"
            >
              {/* 사이드바 패널 - 조건부 렌더링 */}
              {isSidebarVisible && (
                <>
                  <ResizablePanel defaultSize={12} minSize={5} maxSize={80}>
                    {/* activeItem 상태에 따라 사이드바 콘텐츠 동적 렌더링 */}
                    {activeItem === "explorer" ? (
                      <ResizableAppSidebar className="border-r" />
                    ) : activeItem === "extensions" ? (
                      <div className="bg-sidebar flex h-full w-full flex-col overflow-hidden border-r p-2">
                        {/* Extensions Header - shadcn Sidebar 컴포넌트 사용 */}
                        <SidebarGroup className="flex-row items-center justify-between py-0">
                          <SidebarGroupLabel className="px-0">
                            Extensions
                          </SidebarGroupLabel>
                          <SidebarGroupAction
                            title="More options"
                            className="relative top-auto right-auto"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </SidebarGroupAction>
                        </SidebarGroup>

                        {/* Search Section */}
                        <div className="flex flex-col gap-2 p-2">
                          <span className="text-muted-foreground text-xs leading-4">
                            Search Extensions in Marketplace
                          </span>

                          <InputGroup>
                            <InputGroupAddon>
                              <Search />
                            </InputGroupAddon>
                            <InputGroupInput placeholder="Search" />
                            <InputGroupAddon align="inline-end">
                              <Filter />
                            </InputGroupAddon>
                          </InputGroup>
                        </div>

                        {/* Extensions List - shadcn SidebarMenu 컴포넌트 사용 */}
                        <SidebarGroupContent>
                          <SidebarMenu>
                            <SidebarMenuItem>
                              <SidebarMenuButton>
                                <ChevronRight className="h-4 w-4" />
                                <span>Installed</span>
                                <Badge className="ml-auto h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
                                  3
                                </Badge>
                              </SidebarMenuButton>
                            </SidebarMenuItem>

                            {/* Separator between Installed and Recommended */}
                            <div className="px-2 py-1">
                              <Separator />
                            </div>

                            {/* Recommended Section with Collapsible */}
                            <Collapsible
                              open={isMainExtensionsOpen}
                              onOpenChange={setIsMainExtensionsOpen}
                            >
                              <SidebarMenuItem className="w-full overflow-hidden">
                                <CollapsibleTrigger asChild>
                                  <SidebarMenuButton className="w-full max-w-full">
                                    {isMainExtensionsOpen ? (
                                      <ChevronDown className="h-4 w-4" />
                                    ) : (
                                      <ChevronRight className="h-4 w-4" />
                                    )}
                                    <span>Recommended</span>
                                    <Badge className="ml-auto h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
                                      {mainExtensionItems.length}
                                    </Badge>
                                  </SidebarMenuButton>
                                </CollapsibleTrigger>
                              </SidebarMenuItem>

                              {/* UIDL 기반 확장된 Extension 아이템들 */}
                              <CollapsibleContent className="space-y-0">
                                {mainExtensionItems.map((item, index) => (
                                  <React.Fragment key={item.id}>
                                    <div className="flex items-center gap-3 px-4 py-3">
                                      {/* Icon */}
                                      <div className="bg-muted flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border">
                                        <item.icon className="h-4 w-4" />
                                      </div>

                                      {/* Content */}
                                      <div className="min-w-0 flex-1">
                                        <div className="text-foreground truncate text-sm font-medium">
                                          {item.name}
                                        </div>
                                        <div className="text-muted-foreground truncate text-xs">
                                          {item.description}
                                        </div>
                                      </div>

                                      {/* Add Button */}
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-7 px-3 text-xs"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          console.log(
                                            "Extension Sign up button clicked:",
                                            item.name,
                                          );
                                        }}
                                      >
                                        Sign up
                                      </Button>
                                    </div>

                                    {/* Separator between items (except last) */}
                                    {index < mainExtensionItems.length - 1 && (
                                      <div className="px-4">
                                        <Separator className="bg-border/50" />
                                      </div>
                                    )}
                                  </React.Fragment>
                                ))}
                              </CollapsibleContent>
                            </Collapsible>
                          </SidebarMenu>
                        </SidebarGroupContent>
                      </div>
                    ) : (
                      <ResizableAppSidebar className="border-r" />
                    )}
                  </ResizablePanel>

                  {/* 사이드바 리사이즈 핸들 */}
                  <ResizableHandle className="w-0 cursor-col-resize bg-transparent transition-colors hover:bg-blue-500/20 active:bg-blue-500/30" />
                </>
              )}

              {/* 메인 콘텐츠 패널 - VS Code 스타일로 패널을 포함하는 상하 분할 */}
              <ResizablePanel minSize={15}>
                {isPanelVisible ? (
                  <ResizablePanelGroup direction="vertical" className="h-full">
                    {/* 상단: 메인 콘텐츠 영역 */}
                    <ResizablePanel defaultSize={60} minSize={10}>
                      <div className="flex h-full flex-1 flex-col gap-4 lg:gap-6">
                        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
                          <div className="bg-muted text-muted-foreground flex items-center justify-center gap-2 rounded-md px-3 py-2">
                            <span className="font-mono text-sm">
                              contents-area
                            </span>
                          </div>

                          <div className="text-center">
                            <p className="text-muted-foreground mt-2 text-xs">
                              현재 활성 핫바 아이템:{" "}
                              <span className="font-medium">{activeItem}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </ResizablePanel>

                    {/* 상하 구분 리사이즈 핸들 */}
                    <ResizableHandle className="h-1 cursor-row-resize bg-transparent transition-colors hover:bg-blue-500/20 active:bg-blue-500/30" />

                    {/* 하단: VS Code 스타일 패널 */}
                    <ResizablePanel defaultSize={40} minSize={15} maxSize={90}>
                      <div className="bg-background border-border flex h-full w-full flex-col border-t">
                        {/* UIDL 기반 패널 헤더 - 다중 클러스터 탭 + Plus 버튼 + 컨트롤 버튼들 */}
                        <div className="bg-background flex h-10 w-full items-center">
                          {/* 좌측: 클러스터 탭들 */}
                          <div className="bg-background border-border flex min-h-[40px] w-full items-center overflow-hidden">
                            {/* 동적 탭 렌더링 */}
                            {tabs.map((tab, index) => (
                              <React.Fragment key={tab.id}>
                                {/* 활성 탭 또는 비활성 탭 */}
                                {tab.isActive ? (
                                  // 활성 탭 - 어두운 배경과 파란색 상단 보더, 하단 보더를 덮음, primary 아이콘, bold italic 텍스트
                                  <div className="bg-background border-primary after:bg-background relative z-10 -mb-px flex flex-col border-t-2 after:absolute after:right-0 after:bottom-0 after:left-0 after:z-20 after:h-px">
                                    <Button
                                      variant="ghost"
                                      onMouseEnter={() => setHoveredTab(tab.id)}
                                      onMouseLeave={() => setHoveredTab(null)}
                                      onClick={() => handleTabClick(tab.id)}
                                      className="text-foreground hover:bg-sidebar/50 h-10 justify-center rounded-none border-0 bg-transparent px-3 py-2 hover:border-0 focus-visible:border-0 active:border-0"
                                    >
                                      <Terminal className="text-primary h-4 w-4" />
                                      <span className="text-sm font-bold font-medium italic">
                                        {tab.clusterName}
                                      </span>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleCloseTab(tab.id);
                                        }}
                                        className="hover:bg-muted/50 rounded-sm p-0.5 transition-colors"
                                      >
                                        <X className="h-4 w-4" />
                                      </button>
                                    </Button>
                                  </div>
                                ) : (
                                  // 비활성 탭 - 더 약한 투명도와 배경, 호버 시 배경 변경, 하단 border 포함
                                  <div className="border-border relative border-b">
                                    <Button
                                      variant="ghost"
                                      onMouseEnter={() => setHoveredTab(tab.id)}
                                      onMouseLeave={() => setHoveredTab(null)}
                                      onClick={() => handleTabClick(tab.id)}
                                      className="text-foreground hover:bg-sidebar-accent/30 bg-muted/20 h-10 rounded-none border-0 px-3 py-2 opacity-50 transition-all duration-200 hover:border-0 hover:opacity-100 focus-visible:border-0 active:border-0"
                                    >
                                      <Terminal className="h-4 w-4" />
                                      <span className="text-sm font-medium">
                                        {tab.clusterName}
                                      </span>
                                      {/* 🎯 목적: X 버튼을 항상 렌더링하여 공간 확보, hover 시에만 표시 */}
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleCloseTab(tab.id);
                                        }}
                                        className={`hover:bg-muted/50 rounded-sm p-0.5 transition-all ${
                                          hoveredTab === tab.id
                                            ? "opacity-100"
                                            : "opacity-0"
                                        }`}
                                      >
                                        <X className="h-4 w-4" />
                                      </button>
                                    </Button>
                                  </div>
                                )}

                                {/* 탭 사이에 Separator 추가 (마지막 탭 제외) */}
                                {index < tabs.length - 1 && (
                                  <Separator
                                    orientation="vertical"
                                    className="bg-border h-10 w-px"
                                    style={{ height: "40px", width: "1px" }}
                                  />
                                )}
                              </React.Fragment>
                            ))}
                          </div>

                          {/* 우측: + 버튼, Separator, 컨트롤 버튼들 (UIDL 기반) */}
                          <div className="controls-buttons flex min-h-[40px] flex-shrink-0 items-center gap-2">
                            {/* + 버튼 - UIDL 기반 */}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={handleAddTab}
                              className="text-muted-foreground hover:text-foreground hover:bg-muted/50 h-8 w-8 bg-transparent"
                              title="Add New Terminal"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>

                            {/* UIDL 기반 Separator - 세로 구분선 (sm 버튼에 맞춘 높이) */}
                            <Separator
                              orientation="vertical"
                              className="bg-border h-6 w-px"
                              style={{ height: "24px", width: "1px" }}
                            />
                            {/* 확장 버튼 - Expand 아이콘 사용 */}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-muted-foreground hover:text-foreground hover:bg-muted/50 h-8 w-8 bg-transparent"
                              title="Expand Panel"
                            >
                              <Expand className="h-4 w-4" />
                            </Button>

                            {/* 닫기 버튼 */}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={handlePanelBottomToggle}
                              className="text-muted-foreground hover:text-foreground hover:bg-muted/50 h-8 w-8 bg-transparent"
                              title="Close Panel"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* 패널 콘텐츠 영역 */}
                        <div className="bg-background flex w-full flex-1 items-center justify-center p-6">
                          <div className="bg-muted text-muted-foreground flex items-center justify-center rounded-md px-3 py-2">
                            <span className="font-mono text-sm">
                              panel-area
                            </span>
                          </div>
                        </div>
                      </div>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                ) : (
                  // 패널이 닫혔을 때: 전체 화면 콘텐츠 영역
                  <div className="flex h-full flex-1 flex-col gap-4 lg:gap-6">
                    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
                      <div className="bg-muted text-muted-foreground flex items-center justify-center gap-2 rounded-md px-3 py-2">
                        <span className="font-mono text-sm">contents-area</span>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground mt-2 text-xs">
                          현재 활성 핫바 아이템:{" "}
                          <span className="font-medium">{activeItem}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </ResizablePanel>

              {/* AI Assistant 패널 */}
              {isAIAssistantVisible && (
                <>
                  <ResizableHandle className="w-0 cursor-col-resize bg-transparent transition-colors hover:bg-blue-500/20 active:bg-blue-500/30" />
                  <ResizablePanel defaultSize={20} minSize={8} maxSize={80}>
                    <AIAssistant
                      onClose={handleAIAssistantClose}
                      onStart={() => {}}
                      className="h-full w-full"
                    />
                  </ResizablePanel>
                </>
              )}
            </ResizablePanelGroup>
          </div>
        </div>

        {/* Footer - 최하단 고정 */}
        <footer className="bg-sidebar border-border flex h-6 w-full shrink-0 items-center justify-between gap-2 overflow-hidden border-t px-2">
          {/* 좌측: 텍스트 */}
          <span className="text-muted-foreground text-sm leading-5">
            *temporary footer
          </span>

          {/* 우측: 버튼 그룹 */}
          <div className="flex items-center">
            {/* PanelBottom 아이콘 버튼 */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePanelBottomToggle}
              className={`text-muted-foreground hover:text-foreground h-6 w-6 rounded-lg bg-transparent p-1 ${
                isPanelVisible ? "" : "opacity-50"
              }`}
              title="Panel Bottom"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 10H14M3.33333 2H12.6667C13.403 2 14 2.59695 14 3.33333V12.6667C14 13.403 13.403 14 12.6667 14H3.33333C2.59695 14 2 13.403 2 12.6667V3.33333C2 2.59695 2.59695 2 3.33333 2Z"
                  stroke="currentColor"
                  strokeWidth="1.33"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>

            {/* Bell 아이콘 버튼 */}
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground h-6 w-6 rounded-lg bg-transparent p-1"
              title="Notifications"
            >
              <Bell className="h-3 w-3" />
            </Button>
          </div>
        </footer>
      </div>
    );
  },
};

/**
 * Header 템플릿만 독립적으로 표시하는 스토리입니다.
 *
 * 🎯 목적: Header 컴포넌트의 독립적인 사용법 데모
 */
export const StructureHeader: Story = {
  render: () => (
    <div className="bg-background h-screen w-full">
      <Header
        searchQuery=""
        onSearchChange={() => {}}
        onNavigationBack={() => {}}
        onNavigationForward={() => {}}
        onPanelLeftToggle={() => {}}
        onPanelBottomToggle={() => {}}
        onAiAssistantToggle={() => {}}
        isPanelLeftActive={false}
        isPanelBottomActive={false}
        isAiAssistantActive={false}
      />
      <div className="flex h-full items-center justify-center p-8">
        <div className="text-center">
          <h2 className="mb-2 text-lg font-semibold">Header 템플릿</h2>
          <p className="text-muted-foreground text-sm">
            Header 컴포넌트만 독립적으로 사용하는 예시입니다.
          </p>
        </div>
      </div>
    </div>
  ),
};

/**
 * Sidebar Explorer 템플릿만 독립적으로 표시하는 스토리입니다.
 *
 * 🎯 목적: 파일 탐색기 스타일의 Sidebar 컴포넌트 데모
 */
export const StructureSidebarExplorer: Story = {
  storyName: "Structure Sidebar/Sidebar Explorer",
  parameters: {
    docs: {
      description: {
        story:
          "파일 탐색기 스타일의 Sidebar 컴포넌트를 독립적으로 사용하는 예시입니다.",
      },
    },
  },
  render: () => (
    <div className="h-screen w-full">
      <ResizablePanelGroup direction="horizontal" className="h-full w-full">
        {/* 사이드바 영역 - 리사이징 가능 */}
        <ResizablePanel defaultSize={15} minSize={5} maxSize={80}>
          <ResizableAppSidebar className="border-r" />
        </ResizablePanel>

        {/* 리사이즈 핸들 */}
        <ResizableHandle className="w-1 cursor-col-resize bg-transparent transition-colors hover:bg-blue-500/20 active:bg-blue-500/30" />

        {/* 메인 콘텐츠 영역 */}
        <ResizablePanel minSize={15}>
          <div className="flex h-full items-center justify-center p-8">
            <div className="text-center">
              <h2 className="mb-2 text-lg font-semibold">Sidebar Explorer</h2>
              <p className="text-muted-foreground text-sm">
                파일 탐색기 스타일의 Sidebar 컴포넌트만 독립적으로 사용하는
                예시입니다.
              </p>
              <p className="text-muted-foreground mt-2 text-xs">
                VS Code Explorer와 유사한 파일 트리 구조를 제공합니다.
              </p>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

/**
 * Sidebar Extensions 템플릿만 독립적으로 표시하는 스토리입니다.
 *
 * 🎯 목적: 확장 프로그램 관리 스타일의 Sidebar 컴포넌트 데모
 */
export const StructureSidebarExtensions: Story = {
  storyName: "Structure Sidebar/Sidebar Extensions",
  parameters: {
    docs: {
      description: {
        story:
          "확장 프로그램 관리 스타일의 Sidebar 컴포넌트를 독립적으로 사용하는 예시입니다.",
      },
    },
  },
  decorators: [
    (Story) => (
      <SidebarProvider>
        <Story />
      </SidebarProvider>
    ),
  ],
  render: () => {
    // 🎯 목적: Recommended 섹션 확장 상태 관리
    const [isRecommendedOpen, setIsRecommendedOpen] = React.useState(false);

    // 🎯 목적: Hotbar 하단 3개 메뉴를 기반으로 한 확장 프로그램 데이터
    const extensionItems = [
      {
        id: "skuber-observability",
        name: "Skuber+ Observability",
        description: "Real-time monitoring and system observability platform",
        icon: CircleGauge,
      },
      {
        id: "skuber-management",
        name: "Skuber+ Management",
        description: "Complete workflow and resource management solution",
        icon: FolderKanban,
      },
      {
        id: "skuber-optimization",
        name: "Skuber+ Optimization",
        description: "Performance optimization and server resource management",
        icon: Server,
      },
    ];

    return (
      <div className="h-screen w-full">
        <ResizablePanelGroup direction="horizontal" className="h-full w-full">
          {/* 사이드바 영역 - 리사이징 가능 */}
          <ResizablePanel defaultSize={15} minSize={5} maxSize={80}>
            <div className="bg-sidebar flex h-full w-full flex-col overflow-hidden border-r p-2">
              {/* Extensions Header - shadcn Sidebar 컴포넌트 사용 */}
              <SidebarGroup className="flex-row items-center justify-between py-0">
                <SidebarGroupLabel className="px-0">
                  Extensions
                </SidebarGroupLabel>
                <SidebarGroupAction
                  title="More options"
                  className="relative top-auto right-auto"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </SidebarGroupAction>
              </SidebarGroup>

              {/* Search Section */}
              <div className="flex flex-col gap-2 p-2">
                <span className="text-muted-foreground text-xs leading-4">
                  Search Extensions in Marketplace
                </span>

                <InputGroup>
                  <InputGroupAddon>
                    <Search />
                  </InputGroupAddon>
                  <InputGroupInput placeholder="Search" />
                  <InputGroupAddon align="inline-end">
                    <Filter />
                  </InputGroupAddon>
                </InputGroup>
              </div>

              {/* Extensions List - shadcn SidebarMenu 컴포넌트 사용 */}
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <ChevronRight className="h-4 w-4" />
                      <span>Installed</span>
                      <Badge className="ml-auto h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
                        3
                      </Badge>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {/* Separator between Installed and Recommended */}
                  <div className="px-2 py-1">
                    <Separator />
                  </div>

                  {/* Recommended Section with Collapsible */}
                  <Collapsible
                    open={isRecommendedOpen}
                    onOpenChange={setIsRecommendedOpen}
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          {isRecommendedOpen ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                          <span>Recommended</span>
                          <Badge className="ml-auto h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
                            {extensionItems.length}
                          </Badge>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                    </SidebarMenuItem>

                    {/* UIDL 기반 확장된 Extension 아이템들 */}
                    <CollapsibleContent className="space-y-0">
                      {extensionItems.map((item, index) => (
                        <React.Fragment key={item.id}>
                          <div className="flex items-center gap-3 px-4 py-3">
                            {/* Icon */}
                            <div className="bg-muted flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border">
                              <item.icon className="h-4 w-4" />
                            </div>

                            {/* Content */}
                            <div className="min-w-0 flex-1">
                              <div className="text-foreground truncate text-sm font-medium">
                                {item.name}
                              </div>
                              <div className="text-muted-foreground truncate text-xs">
                                {item.description}
                              </div>
                            </div>

                            {/* Add Button */}
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 px-3 text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log(
                                  "Extension Sign up button clicked:",
                                  item.name,
                                );
                              }}
                            >
                              Sign up
                            </Button>
                          </div>

                          {/* Separator between items (except last) */}
                          {index < extensionItems.length - 1 && (
                            <div className="px-4">
                              <Separator className="bg-border/50" />
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                </SidebarMenu>
              </SidebarGroupContent>
            </div>
          </ResizablePanel>

          {/* 리사이즈 핸들 */}
          <ResizableHandle className="w-1 cursor-col-resize bg-transparent transition-colors hover:bg-blue-500/20 active:bg-blue-500/30" />

          {/* 메인 콘텐츠 영역 */}
          <ResizablePanel minSize={15}>
            <div className="flex h-full items-center justify-center p-8">
              <div className="text-center">
                <h2 className="mb-2 text-lg font-semibold">
                  Sidebar Extensions
                </h2>
                <p className="text-muted-foreground text-sm">
                  확장 프로그램 관리 스타일의 Sidebar 컴포넌트만 독립적으로
                  사용하는 예시입니다.
                </p>
                <p className="text-muted-foreground mt-2 text-xs">
                  VS Code Extensions와 유사한 확장 프로그램 관리 구조를
                  제공합니다.
                </p>
                <p className="text-muted-foreground mt-2 text-xs">
                  Recommended 섹션을 클릭하면 확장 프로그램 목록이 펼쳐집니다.
                </p>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    );
  },
};

/**
 * AI Assistant 템플릿만 독립적으로 표시하는 스토리입니다.
 *
 * 🎯 목적: AI Assistant 컴포넌트의 독립적인 사용법 데모
 */
export const StructureAIAssistant: Story = {
  render: () => (
    <div className="bg-background h-screen w-full">
      <ResizablePanelGroup direction="horizontal" className="h-full w-full">
        {/* 메인 콘텐츠 영역 */}
        <ResizablePanel minSize={15}>
          <div className="flex h-full items-center justify-center p-8">
            <div className="text-center">
              <h2 className="mb-2 text-lg font-semibold">
                AI Assistant 템플릿
              </h2>
              <p className="text-muted-foreground text-sm">
                AI Assistant 컴포넌트만 독립적으로 사용하는 예시입니다.
              </p>
            </div>
          </div>
        </ResizablePanel>

        {/* AI Assistant 리사이즈 핸들 */}
        <ResizableHandle className="w-1 cursor-col-resize bg-transparent transition-colors hover:bg-blue-500/20 active:bg-blue-500/30" />

        {/* AI Assistant 패널 (Default 스토리와 동일한 사이즈 정책) */}
        <ResizablePanel defaultSize={20} minSize={8} maxSize={80}>
          <AIAssistant
            onClose={() => {}}
            onStart={() => {}}
            className="h-full w-full"
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

/**
 * UIDL 기반 탭 인터페이스만 독립적으로 표시하는 스토리입니다.
 *
 * 🎯 목적: UIDL 명세서에 따른 실제 탭 네비게이션 구조 정확히 재현
 * ✨ 특징:
 * - 각 탭 왼쪽에 파일 타입별 아이콘 (FileText, FileJson)
 * - 모든 탭 사이에 세로 Separator 구분선
 * - 활성 탭: 어두운 배경, 파란색 하단 보더, 닫기 X 버튼
 * - 비활성 탭: 투명도 적용, 호버 시 우측에 X 아이콘 표시
 * - gap-6 (24px) 내부 요소 간격으로 UIDL 데이터 기반 정확한 구조
 */
export const StructureTab: Story = {
  render: () => {
    // 🎯 목적: 탭 목록 상태 관리 (탭 제거 기능을 위해)
    const [tabs, setTabs] = React.useState([
      { id: "active", name: "main.tsx", type: "active", icon: FileText },
      { id: "tab1", name: "config.json", type: "inactive", icon: FileJson },
      { id: "tab2", name: "data.json", type: "inactive", icon: FileJson },
    ]);

    // 🎯 목적: 각 탭의 호버 상태 관리
    const [hoveredTab, setHoveredTab] = React.useState<string | null>(null);

    // 🎯 목적: 탭 제거 핸들러
    const handleTabClose = (tabId: string) => {
      setTabs((prevTabs) => prevTabs.filter((tab) => tab.id !== tabId));
    };

    return (
      <div className="bg-background h-screen w-full">
        {/* UIDL 기반 탭 네비게이션 바 */}
        <div className="bg-sidebar border-border flex min-h-[40px] w-full items-center overflow-hidden">
          {/* 동적 탭 렌더링 */}
          {tabs.map((tab, index) => (
            <React.Fragment key={tab.id}>
              {/* 활성 탭 또는 비활성 탭 */}
              {tab.type === "active" ? (
                // 활성 탭 - 어두운 배경과 파란색 상단 보더, 하단 보더를 덮음, primary 아이콘, bold italic 텍스트
                <div className="bg-background border-primary after:bg-background relative z-10 -mb-px flex flex-col border-t-2 after:absolute after:right-0 after:bottom-0 after:left-0 after:z-20 after:h-px">
                  <Button
                    variant="ghost"
                    onMouseEnter={() => setHoveredTab(tab.id)}
                    onMouseLeave={() => setHoveredTab(null)}
                    className="text-foreground hover:bg-sidebar/50 h-10 justify-center rounded-none border-0 bg-transparent px-3 py-2 hover:border-0 focus-visible:border-0 active:border-0"
                  >
                    <tab.icon className="text-primary h-4 w-4" />
                    <span className="text-sm font-bold font-medium italic">
                      {tab.name}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTabClose(tab.id);
                      }}
                      className="hover:bg-muted/50 rounded-sm p-0.5 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </Button>
                </div>
              ) : (
                // 비활성 탭 - 더 약한 투명도와 배경, 호버 시 배경 변경, 하단 border 포함
                <div className="border-border relative border-b">
                  <Button
                    variant="ghost"
                    onMouseEnter={() => setHoveredTab(tab.id)}
                    onMouseLeave={() => setHoveredTab(null)}
                    className="text-foreground hover:bg-sidebar-accent/30 bg-muted/20 h-10 rounded-none border-0 px-3 py-2 opacity-50 transition-all duration-200 hover:border-0 hover:opacity-100 focus-visible:border-0 active:border-0"
                  >
                    <tab.icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{tab.name}</span>
                    {/* 🎯 목적: X 버튼을 항상 렌더링하여 공간 확보, hover 시에만 표시 */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTabClose(tab.id);
                      }}
                      className={`hover:bg-muted/50 rounded-sm p-0.5 transition-all ${
                        hoveredTab === tab.id ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </Button>
                </div>
              )}

              {/* 탭 사이에 Separator 추가 (마지막 탭 제외) */}
              {index < tabs.length - 1 && (
                <Separator
                  orientation="vertical"
                  className="bg-border h-10 w-px"
                  style={{ height: "40px", width: "1px" }}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* 메인 콘텐츠 영역 */}
        <div className="flex h-full items-center justify-center p-8">
          <div className="text-center">
            <h2 className="mb-2 text-lg font-semibold">Tab 템플릿</h2>
            <p className="text-muted-foreground text-sm">
              UIDL 기반 Tab 컴포넌트 - 파일 아이콘과 Separator가 포함된 VS Code
              스타일 탭 인터페이스입니다.
            </p>
            <p className="text-muted-foreground mt-2 text-xs">
              탭에 마우스를 올려보세요. 비활성 탭은 호버 시 X 아이콘이 나타나고,
              X 버튼을 클릭하면 탭이 제거됩니다.
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              남은 탭 수: <span className="font-medium">{tabs.length}</span>개
            </p>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * VS Code Activity Bar 스타일의 Hotbar만 독립적으로 표시하는 스토리입니다.
 *
 * 🎯 목적: Hotbar 컴포넌트의 독립적인 사용법 데모
 * ✨ 특징:
 * - VS Code Activity Bar와 동일한 세로 아이콘 바
 * - Explorer, Search, Git, Extensions 등 주요 기능 아이콘
 * - 활성/비활성 상태 시각적 표시
 * - 하단에 Settings, Account 아이콘 배치
 */
export const StructureHotbar: Story = {
  decorators: [
    (Story) => (
      <SidebarProvider
        style={
          {
            "--sidebar-width-icon": "3rem", // 48px - shadcn/ui 공식 방법
          } as React.CSSProperties
        }
      >
        <Story />
      </SidebarProvider>
    ),
  ],
  render: () => {
    // 🎯 목적: 핫바 활성 아이템 상태 관리 - 단일 활성 상태
    const [activeItem, setActiveItem] = React.useState("explorer");

    // 🎯 목적: 핫바 아이템 클릭 핸들러 - 단일 활성 상태 관리
    const handleItemClick = (itemId: string) => {
      // 모든 핫바 아이템은 단일 활성 상태로 관리
      setActiveItem(itemId);
    };

    return (
      <div className="bg-background flex h-screen w-full">
        {/* VS Code Activity Bar 스타일 핫바 */}
        <Hotbar activeItem={activeItem} onItemClick={handleItemClick} />

        {/* 메인 콘텐츠 영역 */}
        <div className="flex flex-1 items-center justify-center p-8">
          <div className="text-center">
            <h2 className="mb-2 text-lg font-semibold">Hotbar 템플릿</h2>
            <p className="text-muted-foreground text-sm">
              VS Code Activity Bar 스타일의 Hotbar 컴포넌트입니다.
            </p>
            <p className="text-muted-foreground mt-2 text-xs">
              현재 활성 아이템:{" "}
              <span className="font-medium">{activeItem}</span>
            </p>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * VS Code 스타일의 Footer만 독립적으로 표시하는 스토리입니다.
 *
 * 🎯 목적: UIDL 기반 Footer 컴포넌트의 독립적인 사용법 데모
 * ✨ 특징:
 * - UIDL 명세서에 따른 Footer 레이아웃 구조
 * - 좌측: "*temporary footer" 텍스트
 * - 우측: PanelBottom, Bell 아이콘 버튼
 * - shadcn/ui 컴포넌트 활용 (Button, lucide-react 아이콘)
 */
export const StructureFooter: Story = {
  render: () => {
    return (
      <div className="bg-background h-screen w-full">
        {/* 메인 콘텐츠 영역 */}
        <div className="flex h-full flex-col">
          <div className="flex flex-1 items-center justify-center p-8">
            <div className="text-center">
              <h2 className="mb-2 text-lg font-semibold">Footer 템플릿</h2>
              <p className="text-muted-foreground text-sm">
                UIDL 기반 Footer 컴포넌트만 독립적으로 사용하는 예시입니다.
              </p>
            </div>
          </div>

          {/* UIDL 기반 Footer */}
          <footer className="bg-sidebar border-border flex h-6 w-full shrink-0 items-center justify-between gap-2 overflow-hidden border-t px-2">
            {/* 좌측: 텍스트 */}
            <span className="text-muted-foreground text-sm leading-5">
              *temporary footer
            </span>

            {/* 우측: 버튼 그룹 */}
            <div className="flex items-center">
              {/* PanelBottom 아이콘 버튼 */}
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground h-8 w-8 rounded-lg bg-transparent p-2"
                title="Panel Bottom"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 10H14M3.33333 2H12.6667C13.403 2 14 2.59695 14 3.33333V12.6667C14 13.403 13.403 14 12.6667 14H3.33333C2.59695 14 2 13.403 2 12.6667V3.33333C2 2.59695 2.59695 2 3.33333 2Z"
                    stroke="currentColor"
                    strokeWidth="1.33"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>

              {/* Bell 아이콘 버튼 */}
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground h-8 w-8 rounded-lg bg-transparent p-2"
                title="Notifications"
              >
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </footer>
        </div>
      </div>
    );
  },
};

/**
 * VS Code 스타일의 하단 패널만 독립적으로 표시하는 스토리입니다.
 *
 * 🎯 목적: UIDL 기반 Panel 컴포넌트의 독립적인 사용법 데모
 * ✨ 특징:
 * - VS Code 하단 패널 스타일의 탭 인터페이스
 * - PROBLEMS, OUTPUT, DEBUG CONSOLE, TERMINAL, PORTS 탭
 * - 활성/비활성 탭 상태 시각적 표시
 * - 우측에 확장/닫기 버튼 배치
 */
export const StructurePanel: Story = {
  render: () => {
    // 🎯 목적: 클러스터 탭 목록 상태 관리
    interface Tab {
      id: string;
      clusterName: string;
      isActive: boolean;
    }
    const [tabs, setTabs] = React.useState<Tab[]>([
      { id: "1", clusterName: EXAMPLE_CLUSTERS[0], isActive: true },
    ]);

    // 🎯 목적: 다음 추가할 클러스터 인덱스 추적
    const [nextClusterIndex, setNextClusterIndex] = React.useState(1);

    // 🎯 목적: 각 탭의 호버 상태 관리
    const [hoveredTab, setHoveredTab] = React.useState<string | null>(null);

    // 🎯 목적: 선택된 탭 참조 (자동 스크롤용)
    const selectedTabRef = React.useRef<HTMLDivElement>(null);

    // 🎯 목적: 이전 활성 탭 ID 추적 (탭 닫기 시 복원용)
    const [previousActiveTabId, setPreviousActiveTabId] = React.useState<
      string | null
    >(null);

    // 🎯 목적: 패널 표시 상태 관리
    const [isPanelVisible, setIsPanelVisible] = React.useState(true);

    // 🎯 목적: 새 탭 추가 핸들러 (추가된 탭을 활성화)
    const handleAddTab = () => {
      const newTab: Tab = {
        id: Date.now().toString(),
        clusterName:
          EXAMPLE_CLUSTERS[nextClusterIndex % EXAMPLE_CLUSTERS.length],
        isActive: true,
      };
      // 기존 탭들은 비활성화하고 새 탭 추가
      setTabs([...tabs.map((tab) => ({ ...tab, isActive: false })), newTab]);
      setNextClusterIndex(nextClusterIndex + 1);
    };

    // 🎯 목적: 탭 제거 핸들러 (최소 1개 유지)
    const handleCloseTab = (tabId: string) => {
      if (tabs.length === 1) return;

      setTabs((prev) => {
        const closedTabIndex = prev.findIndex((tab) => tab.id === tabId);
        const closedTab = prev[closedTabIndex];
        const newTabs = prev.filter((tab) => tab.id !== tabId);

        // 삭제된 탭이 활성 탭이었다면
        if (closedTab?.isActive && newTabs.length > 0) {
          // 1순위: 이전 활성 탭이 남아있으면 그것을 활성화
          const previousTab = newTabs.find(
            (tab) => tab.id === previousActiveTabId,
          );
          if (previousTab) {
            previousTab.isActive = true;
          } else {
            // 2순위: 인접 탭 활성화 (오른쪽 우선, 없으면 왼쪽)
            const newIndex =
              closedTabIndex >= newTabs.length
                ? newTabs.length - 1
                : closedTabIndex;
            newTabs[newIndex].isActive = true;
          }
        }
        return newTabs;
      });
    };

    // 🎯 목적: 탭 클릭 시 활성 탭 전환 핸들러
    const handleTabClick = (tabId: string) => {
      setTabs((prev) => {
        const currentActiveTab = prev.find((tab) => tab.isActive);
        if (currentActiveTab && currentActiveTab.id !== tabId) {
          setPreviousActiveTabId(currentActiveTab.id);
        }
        return prev.map((tab) => ({
          ...tab,
          isActive: tab.id === tabId,
        }));
      });
    };

    // 🎯 목적: 선택된 탭으로 자동 스크롤 (클러스터 이름 전체 표시)
    React.useEffect(() => {
      if (selectedTabRef.current) {
        selectedTabRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }, [tabs]);

    // 🎯 목적: 패널 닫기 핸들러
    const handlePanelClose = () => {
      setIsPanelVisible(false);
    };

    // 🎯 목적: 패널 확장 핸들러
    const handlePanelExpand = () => {
      console.log("Panel expand clicked");
    };

    if (!isPanelVisible) {
      return (
        <div className="bg-background flex h-screen w-full items-center justify-center">
          <div className="text-center">
            <h2 className="mb-2 text-lg font-semibold">Panel 템플릿</h2>
            <p className="text-muted-foreground text-sm">
              패널이 닫혔습니다. 새로고침하여 다시 확인하세요.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-background h-screen w-full">
        {/* 🎯 목적: VS Code 스타일 패널 컨테이너 - 리사이징 가능 */}
        <ResizablePanelGroup direction="vertical" className="h-full">
          {/* 상단: 메인 콘텐츠 영역 */}
          <ResizablePanel defaultSize={60} minSize={10}>
            <div className="flex h-full items-center justify-center p-8">
              <div className="text-center">
                <h2 className="mb-2 text-lg font-semibold">Panel 템플릿</h2>
                <p className="text-muted-foreground text-sm">
                  VS Code 스타일의 하단 패널 컴포넌트입니다.
                </p>
                <p className="text-muted-foreground mt-2 text-xs">
                  활성 탭:{" "}
                  <span className="font-medium">
                    {tabs.find((t) => t.isActive)?.clusterName || "없음"}
                  </span>
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  탭 개수: <span className="font-medium">{tabs.length}</span>개
                </p>
              </div>
            </div>
          </ResizablePanel>

          {/* 상하 구분 리사이즈 핸들 */}
          <ResizableHandle className="h-1 cursor-row-resize bg-transparent transition-colors hover:bg-blue-500/20 active:bg-blue-500/30" />

          {/* 하단: VS Code 스타일 패널 - 리사이징 가능 */}
          <ResizablePanel defaultSize={40} minSize={15} maxSize={90}>
            <div className="bg-background border-border flex h-full w-full flex-col border-t">
              {/* UIDL 기반 패널 헤더 - 다중 클러스터 탭 + Plus 버튼 + 컨트롤 버튼들 */}
              <div className="bg-background flex h-10 w-full items-center">
                {/* 좌측: 클러스터 탭들 */}
                <div className="bg-background border-border flex min-h-[40px] w-full items-center overflow-hidden">
                  {/* 동적 탭 렌더링 */}
                  {tabs.map((tab, index) => (
                    <React.Fragment key={tab.id}>
                      {/* 활성 탭 또는 비활성 탭 */}
                      {tab.isActive ? (
                        // 활성 탭 - 어두운 배경과 파란색 상단 보더, 하단 보더를 덮음, primary 아이콘, bold italic 텍스트
                        <div className="bg-background border-primary after:bg-background relative z-10 -mb-px flex flex-col border-t-2 after:absolute after:right-0 after:bottom-0 after:left-0 after:z-20 after:h-px">
                          <Button
                            variant="ghost"
                            onMouseEnter={() => setHoveredTab(tab.id)}
                            onMouseLeave={() => setHoveredTab(null)}
                            onClick={() => handleTabClick(tab.id)}
                            className="text-foreground hover:bg-sidebar/50 h-10 justify-center rounded-none border-0 bg-transparent px-3 py-2 hover:border-0 focus-visible:border-0 active:border-0"
                          >
                            <Terminal className="text-primary h-4 w-4" />
                            <span className="text-sm font-bold font-medium italic">
                              {tab.clusterName}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCloseTab(tab.id);
                              }}
                              className="hover:bg-muted/50 rounded-sm p-0.5 transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </Button>
                        </div>
                      ) : (
                        // 비활성 탭 - 더 약한 투명도와 배경, 호버 시 배경 변경, 하단 border 포함
                        <div className="border-border relative border-b">
                          <Button
                            variant="ghost"
                            onMouseEnter={() => setHoveredTab(tab.id)}
                            onMouseLeave={() => setHoveredTab(null)}
                            onClick={() => handleTabClick(tab.id)}
                            className="text-foreground hover:bg-sidebar-accent/30 bg-muted/20 h-10 rounded-none border-0 px-3 py-2 opacity-50 transition-all duration-200 hover:border-0 hover:opacity-100 focus-visible:border-0 active:border-0"
                          >
                            <Terminal className="h-4 w-4" />
                            <span className="text-sm font-medium">
                              {tab.clusterName}
                            </span>
                            {/* 🎯 목적: X 버튼을 항상 렌더링하여 공간 확보, hover 시에만 표시 */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCloseTab(tab.id);
                              }}
                              className={`hover:bg-muted/50 rounded-sm p-0.5 transition-all ${
                                hoveredTab === tab.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              }`}
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </Button>
                        </div>
                      )}

                      {/* 탭 사이에 Separator 추가 (마지막 탭 제외) */}
                      {index < tabs.length - 1 && (
                        <Separator
                          orientation="vertical"
                          className="bg-border h-6 w-px"
                          style={{ height: "24px", width: "1px" }}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* 우측: + 버튼, Separator, 컨트롤 버튼들 (UIDL 기반) */}
                <div className="controls-buttons flex min-h-[40px] flex-shrink-0 items-center gap-2">
                  {/* + 버튼 - UIDL 기반 */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleAddTab}
                    className="text-muted-foreground hover:text-foreground hover:bg-muted/50 h-8 w-8 bg-transparent"
                    title="Add New Terminal"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>

                  {/* UIDL 기반 Separator - 세로 구분선 (sm 버튼에 맞춘 높이) */}
                  <Separator
                    orientation="vertical"
                    className="bg-border h-6 w-px"
                    style={{ height: "24px", width: "1px" }}
                  />
                  {/* 확장 버튼 - Expand 아이콘 사용 */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handlePanelExpand}
                    className="text-muted-foreground hover:text-foreground hover:bg-muted/50 h-8 w-8 bg-transparent"
                    title="Expand Panel"
                  >
                    <Expand className="h-4 w-4" />
                  </Button>

                  {/* 닫기 버튼 */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handlePanelClose}
                    className="text-muted-foreground hover:text-foreground hover:bg-muted/50 h-8 w-8 bg-transparent"
                    title="Close Panel"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* 패널 콘텐츠 영역 */}
              <div className="bg-background flex w-full flex-1 items-center justify-center p-6">
                <div className="bg-muted text-muted-foreground flex items-center justify-center rounded-md px-3 py-2">
                  <span className="font-mono text-sm">panel-area</span>
                </div>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    );
  },
};
