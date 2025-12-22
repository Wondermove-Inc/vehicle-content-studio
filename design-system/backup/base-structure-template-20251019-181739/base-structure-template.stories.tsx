import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { BaseStructureTemplate } from "./base-structure-template";

/**
 * A comprehensive base structure template showcasing a file explorer interface.
 *
 * 🎯 목적: 파일 탐색기 인터페이스를 제공하는 완전한 베이스 구조 템플릿
 */
const meta = {
  title: "templates/BaseStructure",
  component: BaseStructureTemplate,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `파일 탐색기 인터페이스를 제공하는 완전한 베이스 구조 템플릿입니다.`,
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "1920px", height: "1080px", display: "flex" }}>
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
 * 🎯 목적: 완전한 파일 탐색기 인터페이스 데모
 */
export const Default: Story = {};
