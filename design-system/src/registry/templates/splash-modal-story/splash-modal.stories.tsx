import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SplashModal } from "@/components/ui/splash-modal";

/**
 * SplashModal은 앱 시작 시 브랜딩/로고를 표시하는 스플래시 화면 컴포넌트입니다.
 *
 * ## 주요 기능
 * - 로고, 브랜드명, 태그라인의 순차적 복합 애니메이션
 * - 프로그레스 바 또는 로딩 스피너 표시
 * - 로딩 완료 시 자동 페이드아웃
 * - 라이트/다크 테마 지원
 *
 * ## 구성 요소
 * 1. **로고**: 브랜드 로고 이미지
 * 2. **브랜드명**: 앱 이름 표시
 * 3. **로딩 인디케이터**: 스피너 + "Loading..." 텍스트
 * 4. **종료** (로딩 완료 시): 페이드아웃 + 스케일업
 */
const meta: Meta<typeof SplashModal> = {
  title: "templates/SplashModal",
  component: SplashModal,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
앱 시작 시 브랜딩과 로고를 표시하는 스플래시 모달입니다.
CSS 애니메이션을 사용하여 로고, 텍스트, 프로그레스 바가 순차적으로 나타나며,
로딩이 완료되면 자연스럽게 사라집니다.
        `,
      },
    },
  },
  argTypes: {
    isLoading: {
      control: "boolean",
      description: "로딩 상태 - false가 되면 모달이 닫힘",
    },
    brandName: {
      control: "text",
      description: "브랜드명 텍스트",
    },
    tagline: {
      control: "text",
      description: "태그라인 또는 서브 텍스트",
    },
    progress: {
      control: { type: "range", min: 0, max: 100 },
      description: "로딩 진행률 (0-100)",
    },
  },
} satisfies Meta<typeof SplashModal>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 스플래시 모달 - 로고, 브랜드명, 로딩 인디케이터를 표시합니다.
 */
export const Default: Story = {
  args: {
    isLoading: true,
    logo: (
      <img
        src="/images/apps/logoSymbol.svg"
        alt="Logo"
        width={48}
        height={48}
      />
    ),
    brandName: "Skuber+ Client",
  },
};
