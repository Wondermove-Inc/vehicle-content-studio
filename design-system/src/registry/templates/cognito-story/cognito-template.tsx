import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Eye, EyeOff, ArrowLeft, GalleryVerticalEnd } from "lucide-react";

/**
 * 🎯 목적: shadcn/ui login-03 블록 원본 (변형 없음)
 */
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = React.useState(false);

  /**
   * 🎯 목적: 비밀번호 입력 필드의 표시/숨기기 상태를 토글
   */
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className={cn("flex w-full max-w-sm flex-col gap-4", className)}
      {...props}
    >
      <a href="#" className="flex items-center gap-1 self-center font-medium">
        <Avatar className="size-8 rounded-md">
          <AvatarImage src="/images/apps/skuber.svg" alt="Skuber+ Logo" />
          <AvatarFallback className="bg-primary text-primary-foreground rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </AvatarFallback>
        </Avatar>
        <span className="text-lg leading-normal font-semibold">Skuber+</span>
      </a>
      <Card>
        <div
          className="px-0 pb-0 text-center"
          style={{ paddingBottom: "0", marginBottom: "0" }}
        >
          <h1 className="mb-1.5 text-xl leading-none font-semibold">
            Welcome back
          </h1>
          <CardDescription>Login with your Email account</CardDescription>
        </div>
        <CardContent>
          <form>
            <FieldGroup className="gap-6">
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="/?path=/story/templates-cognito--finding-password"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <InputGroup>
                  <InputGroupInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      size="icon-xs"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                      <span className="sr-only">
                        {showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
                      </span>
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
              <Field>
                <Button type="submit">Login</Button>
              </Field>
              <Field>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <a href="/?path=/story/templates-cognito--sign-up">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * 🎯 목적: 비밀번호 찾기 폼 (Login 폼을 기반으로 한 독립적인 컴포넌트)
 */
export function FindingPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex w-full max-w-sm flex-col gap-4", className)}
      {...props}
    >
      <a href="#" className="flex items-center gap-1 self-center font-medium">
        <Avatar className="size-8 rounded-md">
          <AvatarImage src="/images/apps/skuber.svg" alt="Skuber+ Logo" />
          <AvatarFallback className="bg-primary text-primary-foreground rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </AvatarFallback>
        </Avatar>
        <span className="text-lg leading-normal font-semibold">Skuber+</span>
      </a>
      <Card>
        <div
          className="px-0 pb-0 text-center"
          style={{ paddingBottom: "0", marginBottom: "0" }}
        >
          <h1 className="mb-1.5 text-xl leading-none font-semibold">
            Finding Password
          </h1>
          <CardDescription>
            Please enter your login email and click the button
          </CardDescription>
        </div>
        <CardContent>
          <form>
            <FieldGroup className="gap-6">
              <Field>
                <FieldLabel htmlFor="reset-email">Email</FieldLabel>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <Button type="submit">Find Password</Button>
              </Field>
              <Field>
                <FieldDescription className="text-center">
                  Do you want to log in again?{" "}
                  <a href="/?path=/story/templates-cognito--login">
                    Back to Login
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * 🎯 목적: 이메일 인증을 위한 OTP 인증 폼 (otp-03 블록 기반)
 */
export function EmailAuthenticationForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <a href="#" className="flex items-center gap-1 self-center font-medium">
        <Avatar className="size-8 rounded-md">
          <AvatarImage src="/images/apps/skuber.svg" alt="Skuber+ Logo" />
          <AvatarFallback className="bg-primary text-primary-foreground rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </AvatarFallback>
        </Avatar>
        <span className="text-lg leading-normal font-semibold">Skuber+</span>
      </a>
      <Card className="w-80">
        <CardHeader className="gap-1.5 text-center">
          <CardTitle className="text-xl">Enter verification code</CardTitle>
          <CardDescription>
            We sent a 6-digit code to your email:
            <br />
            useremail@domain.com
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup className="gap-6">
              <Field>
                <FieldLabel htmlFor="otp" className="sr-only">
                  Verification code
                </FieldLabel>
                <div className="flex justify-center">
                  <InputOTP maxLength={6} id="otp" required>
                    <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <FieldDescription className="text-center">
                  Please enter the code.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit">Verify</Button>
              </Field>
              <Field>
                <FieldDescription className="text-center">
                  Didn&apos;t receive the code?{" "}
                  <a href="#" className="underline underline-offset-4">
                    Resend
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * 🎯 목적: signup block-3 스타일의 회원가입 폼 (shadcn/ui blocks에서 다운로드한 컴포넌트)
 */
export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  /**
   * 🎯 목적: 비밀번호 입력 필드의 표시/숨기기 상태를 토글
   */
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  /**
   * 🎯 목적: 비밀번호 확인 필드의 표시/숨기기 상태를 토글
   */
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <a href="#" className="flex items-center gap-1 self-center font-medium">
        <Avatar className="size-8 rounded-md">
          <AvatarImage src="/images/apps/skuber.svg" alt="Skuber+ Logo" />
          <AvatarFallback className="bg-primary text-primary-foreground rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </AvatarFallback>
        </Avatar>
        <span className="text-lg leading-normal font-semibold">Skuber+</span>
      </a>
      <Card>
        <div
          className="px-0 pb-0 text-center"
          style={{ paddingBottom: "0", marginBottom: "0" }}
        >
          <h1 className="mb-1.5 text-xl leading-none font-semibold">
            Create your account
          </h1>
          <CardDescription>
            Fill in the form below to create your account
          </CardDescription>
        </div>
        <CardContent>
          <form>
            <FieldGroup className="gap-6">
              <Field>
                <FieldLabel htmlFor="signup-email">Email</FieldLabel>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="signup-password">Password</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    required
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      size="icon-xs"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                      <span className="sr-only">
                        {showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
                      </span>
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                <FieldDescription className="text-muted-foreground text-sm leading-normal font-normal">
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="signup-confirm-password">
                  Confirm Password
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="signup-confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      size="icon-xs"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {showConfirmPassword ? <EyeOff /> : <Eye />}
                      <span className="sr-only">
                        {showConfirmPassword
                          ? "비밀번호 숨기기"
                          : "비밀번호 표시"}
                      </span>
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
              <Field>
                <Button type="submit">Sign up</Button>
              </Field>
              <Field>
                <FieldDescription className="text-center">
                  Already have an account?{" "}
                  <a href="/?path=/story/templates-cognito--login">Log in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <p className="text-muted-foreground px-20 text-center text-xs">
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline underline-offset-4">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline underline-offset-4">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}

/**
 * 🎯 목적: AWS Cognito 인증 시스템에서 사용되는 다양한 인증 폼들을 제공하는 종합 템플릿
 * 로그인, 회원가입, 비밀번호 재설정, 비밀번호 변경, 이메일 인증 등의 기능을 포함
 */

type AuthView =
  | "login"
  | "signup"
  | "forgot-password"
  | "reset-password"
  | "verify-email"
  | "change-password";

interface CognitoTemplateProps extends React.ComponentProps<"div"> {
  /** 초기 표시할 인증 뷰 */
  initialView?: AuthView;
  /** 비밀번호 표시/숨기기 토글 활성화 */
  enablePasswordToggle?: boolean;
  /** 소셜 로그인 활성화 */
  enableSocialLogin?: boolean;
  /** 브랜딩 로고 URL */
  logoUrl?: string;
  /** 애플리케이션 이름 */
  appName?: string;
}

export function CognitoTemplate({
  className,
  initialView = "login",
  enablePasswordToggle = true,
  enableSocialLogin = true,
  logoUrl,
  appName = "Your App",
  ...props
}: CognitoTemplateProps) {
  const [currentView, setCurrentView] = React.useState<AuthView>(initialView);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  /**
   * 🎯 목적: 비밀번호 입력 필드의 표시/숨기기 상태를 토글
   */
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  /**
   * 🎯 목적: 비밀번호 확인 필드의 표시/숨기기 상태를 토글
   */
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  /**
   * 🎯 목적: 이전 뷰로 돌아가기 (네비게이션 헬퍼)
   */
  const goBack = () => {
    setCurrentView("login");
  };

  /**
   * 🎯 목적: 소셜 로그인 버튼들을 렌더링
   */
  const renderSocialButtons = () => {
    if (!enableSocialLogin) return null;

    return (
      <Field>
        <Button variant="outline" type="button" className="w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="mr-2 h-4 w-4"
          >
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          Continue with Google
        </Button>
        <Button variant="outline" type="button" className="w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="mr-2 h-4 w-4"
          >
            <path
              d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
              fill="currentColor"
            />
          </svg>
          Continue with Apple
        </Button>
      </Field>
    );
  };

  /**
   * 🎯 목적: 비밀번호 입력 필드를 렌더링 (토글 기능 포함)
   */
  const renderPasswordField = (
    id: string,
    label: string,
    value: boolean,
    toggle: () => void,
    placeholder?: string,
  ) => (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="relative">
        <Input
          id={id}
          type={value ? "text" : "password"}
          placeholder={placeholder}
          required
          className="pr-10"
        />
        {enablePasswordToggle && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={toggle}
          >
            {value ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
            <span className="sr-only">
              {value ? "비밀번호 숨기기" : "비밀번호 표시"}
            </span>
          </Button>
        )}
      </div>
    </Field>
  );

  /**
   * 🎯 목적: 헤더 영역을 렌더링 (로고, 제목, 설명)
   */
  const renderHeader = (
    title: string,
    description: string,
    showBackButton = false,
  ) => (
    <CardHeader className="text-center">
      {showBackButton && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 left-4"
          onClick={goBack}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">뒤로 가기</span>
        </Button>
      )}
      {logoUrl && (
        <div className="mx-auto mb-4">
          <img src={logoUrl} alt={`${appName} 로고`} className="h-12 w-auto" />
        </div>
      )}
      <CardTitle className="text-xl">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
  );

  /**
   * 🎯 목적: 로그인 폼을 렌더링
   */
  const renderLoginForm = () => (
    <Card>
      {renderHeader("Welcome back", `Sign in to your ${appName} account`)}
      <CardContent>
        <form>
          <FieldGroup>
            {renderSocialButtons()}
            {enableSocialLogin && (
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with email
              </FieldSeparator>
            )}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </Field>
            {renderPasswordField(
              "password",
              "Password",
              showPassword,
              togglePasswordVisibility,
              "Enter your password",
            )}
            <Field>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </Field>
            <Field>
              <div className="flex justify-between text-sm">
                <button
                  type="button"
                  onClick={() => setCurrentView("forgot-password")}
                  className="text-muted-foreground underline-offset-4 hover:underline"
                >
                  Forgot password?
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentView("signup")}
                  className="text-muted-foreground underline-offset-4 hover:underline"
                >
                  Create account
                </button>
              </div>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );

  /**
   * 🎯 목적: 비밀번호 재설정 요청 폼을 렌더링
   */
  const renderForgotPasswordForm = () => (
    <Card>
      {renderHeader(
        "Forgot password?",
        "Enter your email to reset your password",
        true,
      )}
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="reset-email">Email</FieldLabel>
              <Input
                id="reset-email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </Field>
            <Field>
              <Button type="submit" className="w-full">
                Send Reset Link
              </Button>
            </Field>
            <Field>
              <FieldDescription className="text-center">
                Remember your password?{" "}
                <button
                  type="button"
                  onClick={() => setCurrentView("login")}
                  className="underline-offset-4 hover:underline"
                >
                  Back to sign in
                </button>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );

  /**
   * 🎯 목적: 비밀번호 재설정 폼을 렌더링
   */
  const renderResetPasswordForm = () => (
    <Card>
      {renderHeader("Reset password", "Enter your new password", true)}
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="verification-code">
                Verification Code
              </FieldLabel>
              <Input
                id="verification-code"
                type="text"
                placeholder="Enter 6-digit code"
                required
              />
            </Field>
            {renderPasswordField(
              "new-password",
              "New Password",
              showPassword,
              togglePasswordVisibility,
              "Enter new password",
            )}
            {renderPasswordField(
              "confirm-new-password",
              "Confirm New Password",
              showConfirmPassword,
              toggleConfirmPasswordVisibility,
              "Confirm new password",
            )}
            <Field>
              <Button type="submit" className="w-full">
                Reset Password
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );

  /**
   * 🎯 목적: 이메일 인증 폼을 렌더링
   */
  const renderVerifyEmailForm = () => (
    <Card>
      {renderHeader(
        "Verify your email",
        "Enter the verification code sent to your email",
        true,
      )}
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="verify-code">Verification Code</FieldLabel>
              <Input
                id="verify-code"
                type="text"
                placeholder="Enter 6-digit code"
                required
              />
            </Field>
            <Field>
              <Button type="submit" className="w-full">
                Verify Email
              </Button>
            </Field>
            <Field>
              <FieldDescription className="text-center">
                Didn't receive a code?{" "}
                <button
                  type="button"
                  className="underline-offset-4 hover:underline"
                >
                  Resend code
                </button>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );

  /**
   * 🎯 목적: 비밀번호 변경 폼을 렌더링 (로그인된 사용자용)
   */
  const renderChangePasswordForm = () => (
    <Card>
      {renderHeader("Change password", "Update your account password", true)}
      <CardContent>
        <form>
          <FieldGroup>
            {renderPasswordField(
              "current-password",
              "Current Password",
              showPassword,
              togglePasswordVisibility,
              "Enter current password",
            )}
            {renderPasswordField(
              "new-password-change",
              "New Password",
              showConfirmPassword,
              toggleConfirmPasswordVisibility,
              "Enter new password",
            )}
            <Field>
              <Button type="submit" className="w-full">
                Update Password
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );

  /**
   * 🎯 목적: 현재 선택된 뷰에 따라 적절한 폼을 렌더링
   */
  const renderCurrentView = () => {
    switch (currentView) {
      case "signup":
        return <SignupForm />;
      case "forgot-password":
        return renderForgotPasswordForm();
      case "reset-password":
        return renderResetPasswordForm();
      case "verify-email":
        return renderVerifyEmailForm();
      case "change-password":
        return renderChangePasswordForm();
      default:
        return renderLoginForm();
    }
  };

  return (
    <div
      className={cn("flex w-full max-w-sm flex-col gap-4", className)}
      {...props}
    >
      {renderCurrentView()}
      <p className="text-muted-foreground px-20 text-center text-xs">
        By continuing, you agree to our{" "}
        <a href="#" className="underline-offset-4 hover:underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline-offset-4 hover:underline">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}
