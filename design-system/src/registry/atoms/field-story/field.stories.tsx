import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldContent,
  FieldTitle,
  FieldSet,
  FieldLegend,
  FieldGroup,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

/**
 * Field 컴포넌트는 폼 필드를 구성하고 레이블, 설명, 오류 메시지를 관리하는 데 사용됩니다.
 * shadcn/ui 공식 문서의 예제들을 기반으로 구현되었습니다.
 */
const meta: Meta<typeof Field> = {
  title: "ui/Field",
  component: Field,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 Input Field - 사용자 이름 입력
 */
export const InputField: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="username">Username</FieldLabel>
      <Input id="username" type="text" placeholder="Max Leiter" />
      <FieldDescription>
        Choose a unique username for your account.
      </FieldDescription>
    </Field>
  ),
};

/**
 * Textarea Field - 피드백 입력
 */
export const TextareaField: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="feedback">Feedback</FieldLabel>
      <Textarea
        id="feedback"
        placeholder="Your feedback helps us improve..."
        rows={4}
      />
      <FieldDescription>
        Share your thoughts about our service.
      </FieldDescription>
    </Field>
  ),
};

/**
 * Select Field - 부서 선택
 */
export const SelectField: Story = {
  render: () => (
    <Field>
      <FieldLabel>Department</FieldLabel>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Choose department" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="engineering">Engineering</SelectItem>
          <SelectItem value="marketing">Marketing</SelectItem>
          <SelectItem value="sales">Sales</SelectItem>
          <SelectItem value="support">Support</SelectItem>
        </SelectContent>
      </Select>
      <FieldDescription>
        Select your department or area of work.
      </FieldDescription>
    </Field>
  ),
};

/**
 * Slider Field - 가격 범위 선택
 */
export const SliderField: Story = {
  render: () => {
    const [value, setValue] = useState([500]);

    return (
      <Field>
        <FieldTitle>Price Range</FieldTitle>
        <FieldDescription>Set your budget range ($200 - 800).</FieldDescription>
        <Slider
          value={value}
          onValueChange={setValue}
          max={1000}
          min={0}
          step={10}
          className="w-[300px]"
        />
      </Field>
    );
  },
};

/**
 * Fieldset - 관련 필드의 그룹화
 */
export const FieldsetExample: Story = {
  render: () => (
    <FieldSet>
      <FieldLegend>Personal Information</FieldLegend>
      <FieldDescription>
        Please provide your basic information.
      </FieldDescription>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="first-name">First Name</FieldLabel>
          <Input id="first-name" placeholder="John" />
        </Field>
        <Field>
          <FieldLabel htmlFor="last-name">Last Name</FieldLabel>
          <Input id="last-name" placeholder="Doe" />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="john@example.com" />
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
};

/**
 * Checkbox Field - 하드 디스크 선택
 */
export const CheckboxField: Story = {
  render: () => (
    <Field orientation="horizontal">
      <Checkbox id="hard-disks" />
      <FieldLabel htmlFor="hard-disks" className="font-normal">
        Hard disks
      </FieldLabel>
    </Field>
  ),
};

/**
 * Radio Field - 요금제 선택
 */
export const RadioField: Story = {
  render: () => (
    <Field>
      <FieldLabel>Choose a plan</FieldLabel>
      <RadioGroup defaultValue="monthly">
        <Field orientation="horizontal">
          <RadioGroupItem value="monthly" id="plan-monthly" />
          <FieldLabel htmlFor="plan-monthly" className="font-normal">
            Monthly
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="yearly" id="plan-yearly" />
          <FieldLabel htmlFor="plan-yearly" className="font-normal">
            Yearly
          </FieldLabel>
        </Field>
      </RadioGroup>
    </Field>
  ),
};

/**
 * Switch Field - 알림 설정
 */
export const SwitchField: Story = {
  render: () => (
    <Field orientation="horizontal">
      <Switch id="notifications" />
      <FieldContent>
        <FieldLabel htmlFor="notifications">Notifications</FieldLabel>
        <FieldDescription>Email, SMS, and push options.</FieldDescription>
      </FieldContent>
    </Field>
  ),
};

/**
 * Choice Card - 구독 플랜 선택
 */
export const ChoiceCard: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <FieldGroup>
        <FieldSet>
          <FieldLabel htmlFor="subscription-plan">Subscription Plan</FieldLabel>
          <FieldDescription>
            Choose the plan that best fits your needs.
          </FieldDescription>
          <RadioGroup defaultValue="pro">
            <FieldLabel htmlFor="basic-plan">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Basic Plan</FieldTitle>
                  <FieldDescription>
                    Perfect for small teams getting started.
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem value="basic" id="basic-plan" />
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor="pro-plan">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Pro Plan</FieldTitle>
                  <FieldDescription>
                    Advanced features for growing businesses.
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem value="pro" id="pro-plan" />
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor="enterprise-plan">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Enterprise Plan</FieldTitle>
                  <FieldDescription>
                    Custom solutions for large organizations.
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem value="enterprise" id="enterprise-plan" />
              </Field>
            </FieldLabel>
          </RadioGroup>
        </FieldSet>
      </FieldGroup>
    </div>
  ),
};

/**
 * Field Group - 구분자가 있는 필드 그룹
 */
export const FieldGroupExample: Story = {
  render: () => (
    <div className="w-96">
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Account Settings</FieldLegend>
          <Field orientation="horizontal">
            <Checkbox id="newsletter" />
            <FieldLabel htmlFor="newsletter" className="font-normal">
              Subscribe to newsletter
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="marketing" />
            <FieldLabel htmlFor="marketing" className="font-normal">
              Receive marketing emails
            </FieldLabel>
          </Field>
        </FieldSet>

        <FieldSeparator>Privacy Settings</FieldSeparator>

        <FieldSet>
          <Field orientation="horizontal">
            <Checkbox id="analytics" />
            <FieldLabel htmlFor="analytics" className="font-normal">
              Allow analytics tracking
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="cookies" />
            <FieldLabel htmlFor="cookies" className="font-normal">
              Accept cookies
            </FieldLabel>
          </Field>
        </FieldSet>
      </FieldGroup>
    </div>
  ),
};

/**
 * Responsive Layout - 반응형 필드 레이아웃
 */
export const ResponsiveLayout: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <form>
        <FieldSet>
          <FieldLegend>Profile</FieldLegend>
          <FieldDescription>Fill in your profile information.</FieldDescription>
          <FieldSeparator />
          <FieldGroup>
            <Field orientation="responsive">
              <FieldContent>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <FieldDescription>
                  Provide your full name for identification
                </FieldDescription>
              </FieldContent>
              <Input id="name" placeholder="Evil Rabbit" required />
            </Field>
            <FieldSeparator />
            <Field orientation="responsive">
              <FieldContent>
                <FieldLabel htmlFor="message">Message</FieldLabel>
                <FieldDescription>
                  You can write your message here. Keep it short, preferably
                  under 100 characters.
                </FieldDescription>
              </FieldContent>
              <Textarea
                id="message"
                placeholder="Hello, world!"
                required
                className="min-h-[100px] resize-none sm:min-w-[300px]"
              />
            </Field>
            <FieldSeparator />
            <Field orientation="responsive">
              <Button type="submit">Submit</Button>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  ),
};
