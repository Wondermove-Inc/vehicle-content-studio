import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  LoginForm,
  CognitoTemplate,
  SignupForm,
  EmailAuthenticationForm,
  FindingPasswordForm,
} from "./cognito-template";

/**
 * AWS Cognito 인증 시스템을 위한 종합적인 템플릿입니다.
 * 로그인, 회원가입, 비밀번호 재설정, 이메일 인증 등 모든 인증 플로우를 포함합니다.
 *
 * 기능:
 * - 6가지 인증 뷰 (로그인, 회원가입, 비밀번호 재설정, 비밀번호 변경, 이메일 인증, 비밀번호 재설정)
 * - 소셜 로그인 (Google, Apple)
 * - 비밀번호 표시/숨기기 토글
 * - 브랜딩 지원 (로고, 앱 이름)
 * - 완전한 접근성 지원
 * - 라이트/다크 테마 지원
 */
const meta: Meta<typeof CognitoTemplate> = {
  title: "templates/Cognito",
  component: CognitoTemplate,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
AWS Cognito 스타일의 종합적인 인증 템플릿입니다. 실제 프로덕션 환경에서 바로 사용할 수 있도록 설계되었습니다.
        `,
      },
    },
  },
  argTypes: {
    initialView: {
      control: { type: "select" },
      options: [
        "login",
        "signup",
        "forgot-password",
        "reset-password",
        "verify-email",
        "change-password",
      ],
      description: "초기에 표시할 인증 뷰를 선택합니다",
    },
    enablePasswordToggle: {
      control: { type: "boolean" },
      description: "비밀번호 표시/숨기기 버튼을 활성화합니다",
    },
    enableSocialLogin: {
      control: { type: "boolean" },
      description: "소셜 로그인 버튼들을 표시합니다",
    },
    logoUrl: {
      control: { type: "text" },
      description: "브랜딩 로고 이미지 URL",
    },
    appName: {
      control: { type: "text" },
      description: "애플리케이션 또는 서비스 이름",
    },
  },
  args: {
    enablePasswordToggle: true,
    enableSocialLogin: true,
    appName: "Your App",
  },
} satisfies Meta<typeof CognitoTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 로그인 화면입니다.
 * shadcn/ui의 login-03 블록을 완전히 그대로 사용합니다.
 */
export const Login: Story = {
  render: () => <LoginForm />,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="bg-background flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <Story />
        </div>
      </div>
    ),
  ],
};

/**
 * 회원가입 화면입니다.
 * 새 계정 생성을 위한 폼을 표시합니다.
 */
export const SignUp: Story = {
  render: () => <SignupForm />,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="bg-background flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <Story />
        </div>
      </div>
    ),
  ],
};

/**
 * 이메일 인증 화면입니다.
 * 이메일 기반 인증을 위한 독립적인 폼입니다.
 */
export const EmailAuthentication: Story = {
  render: () => <EmailAuthenticationForm />,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="bg-background flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <Story />
      </div>
    ),
  ],
};

/**
 * 비밀번호 찾기 화면입니다.
 * 이메일 주소로 비밀번호 재설정 링크를 요청하는 독립적인 폼입니다.
 */
export const FindingPassword: Story = {
  render: () => <FindingPasswordForm />,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="bg-background flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <Story />
        </div>
      </div>
    ),
  ],
};
