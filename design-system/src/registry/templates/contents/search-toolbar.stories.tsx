import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SearchToolbar } from "./search-toolbar";

/**
 * SearchToolbar 컴포넌트 - 코드 에디터형 검색 툴바
 *
 * 코드 에디터에서 사용되는 검색 툴바 컴포넌트를 제공합니다.
 * 검색 입력 필드, 대소문자/전체단어 토글, 네비게이션 버튼을 포함합니다.
 *
 * 🎯 목적: 코드나 텍스트에서 효율적인 검색 및 네비게이션
 *
 */
const meta: Meta<typeof SearchToolbar> = {
  title: "templates/Contents/SearchToolbar",
  component: SearchToolbar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
코드 에디터에서 사용되는 SearchToolbar 컴포넌트입니다. 검색 입력과 네비게이션 기능을 제공합니다.


        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    searchValue: {
      control: "text",
      description: "검색어 값",
    },
    placeholder: {
      control: "text",
      description: "플레이스홀더 텍스트",
    },
    resultsInfo: {
      control: "text",
      description: "검색 결과 정보",
    },
    caseSensitive: {
      control: "boolean",
      description: "대소문자 구분 활성화",
    },
    wholeWord: {
      control: "boolean",
      description: "전체 단어 일치 활성화",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 상태",
    },
  },
} satisfies Meta<typeof SearchToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 🎯 목적: SearchToolbar를 Resizable로 감싸는 래퍼 컴포넌트
 */
interface ResizableSearchToolbarProps {
  children: React.ReactNode;
  defaultWidth?: number;
}

const ResizableSearchToolbar: React.FC<ResizableSearchToolbarProps> = ({
  children,
}) => {
  const [toolbarWidth, setToolbarWidth] = React.useState(500);

  return (
    <div
      className="relative inline-block"
      style={{ width: `${toolbarWidth}px` }}
    >
      {/* 좌측 드래그 핸들 */}
      <div
        className="bg-border hover:bg-primary/50 absolute top-0 left-0 h-full w-1 cursor-ew-resize transition-colors"
        onMouseDown={(e) => {
          e.preventDefault();
          const startX = e.clientX;
          const startWidth = toolbarWidth;

          const handleMouseMove = (e: MouseEvent) => {
            const deltaX = startX - e.clientX;
            const newWidth = Math.max(500, startWidth + deltaX);
            setToolbarWidth(newWidth);
          };

          const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
          };

          document.addEventListener("mousemove", handleMouseMove);
          document.addEventListener("mouseup", handleMouseUp);
        }}
      />

      {/* SearchToolbar를 감싸는 div에 동적 width 적용 */}
      <div
        style={
          {
            "--input-group-width": `${Math.max(300, toolbarWidth - 200)}px`,
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </div>
  );
};

/**
 * 기본 SearchToolbar - 기본 검색 툴바 레이아웃
 */
export const Default: Story = {
  render: () => {
    const [caseSensitive, setCaseSensitive] = React.useState(false);
    const [wholeWord, setWholeWord] = React.useState(false);
    const [useRegex, setUseRegex] = React.useState(false);

    return (
      <TooltipProvider delayDuration={300}>
        <div className="flex w-full justify-center">
          <ResizableSearchToolbar>
            <SearchToolbar
              caseSensitive={caseSensitive}
              wholeWord={wholeWord}
              useRegex={useRegex}
              onSearchChange={(value) => console.log("Search changed:", value)}
              onSearch={(value) => console.log("Search executed:", value)}
              onPrevious={() => console.log("Previous clicked")}
              onNext={() => console.log("Next clicked")}
              onClose={() => console.log("Close clicked")}
              onCaseSensitiveToggle={(enabled) => {
                setCaseSensitive(enabled);
                console.log("Case sensitive toggle:", enabled);
              }}
              onWholeWordToggle={(enabled) => {
                setWholeWord(enabled);
                console.log("Whole word toggle:", enabled);
              }}
              onRegexToggle={(enabled) => {
                setUseRegex(enabled);
                console.log("Regex toggle:", enabled);
              }}
            />
          </ResizableSearchToolbar>
        </div>
      </TooltipProvider>
    );
  },
};

/**
 * 검색어가 입력된 상태
 */
export const WithSearchValue: Story = {
  render: () => {
    const [caseSensitive, setCaseSensitive] = React.useState(false);
    const [wholeWord, setWholeWord] = React.useState(false);
    const [useRegex, setUseRegex] = React.useState(false);

    return (
      <TooltipProvider delayDuration={300}>
        <div className="flex w-full justify-center">
          <ResizableSearchToolbar>
            <SearchToolbar
              searchValue="function"
              resultsInfo="3 of 12"
              caseSensitive={caseSensitive}
              wholeWord={wholeWord}
              useRegex={useRegex}
              onSearchChange={(value) => console.log("Search changed:", value)}
              onSearch={(value) => console.log("Search executed:", value)}
              onPrevious={() => console.log("Previous clicked")}
              onNext={() => console.log("Next clicked")}
              onClose={() => console.log("Close clicked")}
              onCaseSensitiveToggle={(enabled) => {
                setCaseSensitive(enabled);
                console.log("Case sensitive toggle:", enabled);
              }}
              onWholeWordToggle={(enabled) => {
                setWholeWord(enabled);
                console.log("Whole word toggle:", enabled);
              }}
              onRegexToggle={(enabled) => {
                setUseRegex(enabled);
                console.log("Regex toggle:", enabled);
              }}
            />
          </ResizableSearchToolbar>
        </div>
      </TooltipProvider>
    );
  },
};

/**
 * 검색 결과가 없는 상태
 */
export const NoResults: Story = {
  render: () => (
    <TooltipProvider delayDuration={300}>
      <div className="flex w-full justify-center">
        <ResizableSearchToolbar>
          <SearchToolbar
            searchValue="xyz123"
            resultsInfo="No results"
            resultsInfoClassName="text-destructive"
            onSearchChange={(value) => console.log("Search changed:", value)}
            onSearch={(value) => console.log("Search executed:", value)}
            onPrevious={() => console.log("Previous clicked")}
            onNext={() => console.log("Next clicked")}
            onClose={() => console.log("Close clicked")}
            onCaseSensitiveToggle={(enabled) =>
              console.log("Case sensitive toggle:", enabled)
            }
            onWholeWordToggle={(enabled) =>
              console.log("Whole word toggle:", enabled)
            }
            onRegexToggle={(enabled) => console.log("Regex toggle:", enabled)}
          />
        </ResizableSearchToolbar>
      </div>
    </TooltipProvider>
  ),
};
