/**
 * 🎯 목적: 모델 관리 페이지 (WPro1000)
 * 📝 설명: 차량 모델 목록을 표시하고 관리하는 메인 페이지
 * - 사이드바: 네비게이션 메뉴 및 즐겨찾기
 * - 헤더: 사이드바 토글, 알림, 사용자 아바타
 * - 필터: 브랜드, 모델 코드, 연식 필터링
 * - 데이터 테이블: 모델 목록 표시
 * - 페이지네이션: 페이지 이동 및 페이지 크기 조절
 */

import * as React from "react";

// design-system 컴포넌트 import
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@design-system/src/components/ui/sidebar";
import { Button } from "@design-system/src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@design-system/src/components/ui/select";
import { Switch } from "@design-system/src/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@design-system/src/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@design-system/src/components/ui/avatar";
import { Separator } from "@design-system/src/components/ui/separator";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@design-system/src/components/ui/pagination";

// lucide-react 아이콘
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Boxes,
  FileText,
  Users,
  Shield,
  Star,
  Plus,
} from "lucide-react";

// 모델 데이터 타입 정의
interface ModelData {
  id: string;
  thumbnail: string;
  brand: string;
  modelCode: string;
  year: string;
  projectType: string;
  lastModified: string;
  isFavorite: boolean;
}

// 샘플 데이터
const sampleModels: ModelData[] = [
  {
    id: "1",
    thumbnail: "/images/nx-26my.png",
    brand: "Genesis",
    modelCode: "NX 26MY",
    year: "2026",
    projectType: "FCM WebCC",
    lastModified: "2024.12.05 14:30",
    isFavorite: true,
  },
  {
    id: "2",
    thumbnail: "/images/gv70-25my.png",
    brand: "Genesis",
    modelCode: "GV70 25MY",
    year: "2025",
    projectType: "FL WebCC",
    lastModified: "2024.12.04 09:15",
    isFavorite: true,
  },
  {
    id: "3",
    thumbnail: "/images/ioniq6.png",
    brand: "Hyundai",
    modelCode: "IONIQ 6",
    year: "2025",
    projectType: "EV Platform",
    lastModified: "2024.12.03 16:45",
    isFavorite: false,
  },
  {
    id: "4",
    thumbnail: "/images/ev9.png",
    brand: "Kia",
    modelCode: "EV9",
    year: "2025",
    projectType: "EV Platform",
    lastModified: "2024.12.02 11:20",
    isFavorite: false,
  },
  {
    id: "5",
    thumbnail: "/images/santa-fe.png",
    brand: "Hyundai",
    modelCode: "Santa Fe",
    year: "2026",
    projectType: "FCM WebCC",
    lastModified: "2024.12.01 08:00",
    isFavorite: false,
  },
];

// 네비게이션 메뉴 아이템
const navigationItems = [
  { icon: Boxes, label: "모델", href: "/models", isActive: true },
  { icon: FileText, label: "컨텐츠 요청", href: "/content-requests", isActive: false },
  { icon: Users, label: "사용자 관리", href: "/users", isActive: false },
  { icon: Shield, label: "권한 관리", href: "/permissions", isActive: false },
];

// 즐겨찾기 아이템
const favoriteItems = [
  { label: "NX 26MY FCM WebCC", href: "/models/nx-26my-fcm" },
  { label: "NX 26MY FL WebCC", href: "/models/nx-26my-fl" },
];

/**
 * 🎯 목적: 모델 관리 페이지 메인 컴포넌트
 */
export function ModelListPage() {
  // 상태 관리
  const [showFavoritesOnly, setShowFavoritesOnly] = React.useState(false);
  const [selectedBrand, setSelectedBrand] = React.useState<string>("");
  const [selectedModelCode, setSelectedModelCode] = React.useState<string>("");
  const [selectedYear, setSelectedYear] = React.useState<string>("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState("10");

  // 필터링된 모델 목록
  const filteredModels = React.useMemo(() => {
    return sampleModels.filter((model) => {
      if (showFavoritesOnly && !model.isFavorite) return false;
      if (selectedBrand && model.brand !== selectedBrand) return false;
      if (selectedModelCode && model.modelCode !== selectedModelCode) return false;
      if (selectedYear && model.year !== selectedYear) return false;
      return true;
    });
  }, [showFavoritesOnly, selectedBrand, selectedModelCode, selectedYear]);

  return (
    <SidebarProvider>
      {/* 사이드바 */}
      <Sidebar className="w-64 border-r">
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Boxes className="h-4 w-4" />
            </div>
            <span className="font-semibold">HMG 00 System</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          {/* 메인 네비게이션 */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton isActive={item.isActive} tooltip={item.label}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />

          {/* 즐겨찾기 */}
          <SidebarGroup>
            <SidebarGroupLabel>
              <Star className="mr-2 h-4 w-4" />
              즐겨찾기
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {favoriteItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton tooltip={item.label}>
                      <span className="truncate">{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-4">
          <div className="text-xs text-muted-foreground">© 2024 HMG</div>
        </SidebarFooter>
      </Sidebar>

      {/* 메인 컨텐츠 영역 */}
      <SidebarInset>
        {/* 헤더 */}
        <header className="flex h-14 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-6" />
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/user.png" alt="사용자" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* 페이지 컨텐츠 */}
        <main className="flex-1 p-6">
          {/* 타이틀 및 추가 버튼 */}
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">모델</h1>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              모델 추가하기
            </Button>
          </div>

          {/* 필터 섹션 */}
          <div className="mb-6 flex flex-wrap items-center gap-4">
            {/* 브랜드 선택 */}
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="브랜드" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="Genesis">Genesis</SelectItem>
                <SelectItem value="Hyundai">Hyundai</SelectItem>
                <SelectItem value="Kia">Kia</SelectItem>
              </SelectContent>
            </Select>

            {/* 모델 코드 선택 */}
            <Select value={selectedModelCode} onValueChange={setSelectedModelCode}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="모델 코드" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="NX 26MY">NX 26MY</SelectItem>
                <SelectItem value="GV70 25MY">GV70 25MY</SelectItem>
                <SelectItem value="IONIQ 6">IONIQ 6</SelectItem>
                <SelectItem value="EV9">EV9</SelectItem>
                <SelectItem value="Santa Fe">Santa Fe</SelectItem>
              </SelectContent>
            </Select>

            {/* 연식 선택 */}
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="연식" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="2026">2026</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
              </SelectContent>
            </Select>

            {/* 즐겨찾기 토글 */}
            <div className="flex items-center gap-2">
              <Switch
                checked={showFavoritesOnly}
                onCheckedChange={setShowFavoritesOnly}
              />
              <span className="text-sm">즐겨찾기만 보기</span>
            </div>
          </div>

          {/* 데이터 테이블 */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">썸네일</TableHead>
                  <TableHead>브랜드</TableHead>
                  <TableHead>모델 코드</TableHead>
                  <TableHead>연식</TableHead>
                  <TableHead>프로젝트 유형</TableHead>
                  <TableHead>최근 수정일시</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredModels.map((model) => (
                  <TableRow key={model.id}>
                    <TableCell>
                      <div className="h-12 w-16 rounded bg-muted flex items-center justify-center">
                        <img
                          src={model.thumbnail}
                          alt={model.modelCode}
                          className="h-full w-full object-cover rounded"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{model.brand}</TableCell>
                    <TableCell>{model.modelCode}</TableCell>
                    <TableCell>{model.year}</TableCell>
                    <TableCell>{model.projectType}</TableCell>
                    <TableCell>{model.lastModified}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* 페이지네이션 */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">페이지당 행:</span>
              <Select value={pageSize} onValueChange={setPageSize}>
                <SelectTrigger className="w-[80px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>

            <div className="text-sm text-muted-foreground">
              1-{Math.min(parseInt(pageSize), filteredModels.length)} / {filteredModels.length}
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default ModelListPage;
