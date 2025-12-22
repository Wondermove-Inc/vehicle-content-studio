import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDown, ChevronUp, FolderSearch, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

/**
 * 🎯 목적: Kubeconfig 클러스터 추가 Dialog 템플릿
 *
 * UIDL 데이터를 기반으로 제작된 실제 애플리케이션 시나리오의 Dialog 템플릿입니다.
 * 다크 테마 최적화되어 있으며, textarea와 footer 버튼 조합을 포함합니다.
 */
function KubeconfigDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [configText, setConfigText] = useState(
    `apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURCVENDQWUyZ0F3SUJBZ0lJSmlGbTVaUE5lWlV3RFFZSktvWklodmNOQVFFTEJRQXdGVEVUTUJFR0ExVUUKQXhNS2EzVmlaWEp1WlhSbGN6QWVGdzB5TXpFeE1qVXdOekUwTXpOYUZ3MHpNekV4TWpJd056RTVNek5hTUJVeApFekFSQmdOVkJBTVRDbXQxWW1WeWJtVjBaWE13Z2dFaU1BMEdDU3FHU0liM0RRRUJBUVVBQTRJQkR3QXdnZ0VLCkFvSUJBUUNuVWR6bmpxNE9qeTNZQ1d0UCtpaThBaGE2eCtCQldUYVJaYVNmQXFxNkNYdmZFaUVsUm1GRlg2a3AKRXJuSHJmQTdnV3ZGRkVabWxGSkJzMEVKOU9xZEFYYkU1cVBQUzJOVU9zeTVORnRrSk1RUU4=
    server: https://prod-k8s-cluster.company.com:6443
  name: production-cluster
- cluster:
    certificate-authority-data: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURCVENDQWUyZ0F3SUJBZ0lJSmlGbTVaUE5lWlV3RFFZSktvWklodmNOQVFFTEJRQXdGVEVUTUJFR0ExVUUKQXhNS2EzVmlaWEp1WlhSbGN6QWVGdzB5TXpFeE1qVXdOekUwTXpOYUZ3MHpNekV4TWpJd056RTVNek5hTUJVeApFekFSQmdOVkJBTVRDbXQxWW1WeWJtVjBaWE13Z2dFaU1BMEdDU3FHU0liM0RRRUJBUVVBQTRJQkR3QXdnZ0VLCkFvSUJBUUNuVWR6bmpxNE9qeTNZQ1d0UCtpaThBaGE2eCtCQldUYVJaYVNmQXFxNkNYdmZFaUVsUm1GRlg2a3AKRXJuSHJmQTdnV3ZGRkVabWxGSkJzMEVKOU9xZEFYYkU1cVBQUzJOVU9zeTVORnRrSk1RUU4=
    server: https://dev-k8s-cluster.company.com:6443
  name: development-cluster
- cluster:
    certificate-authority-data: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURCVENDQWUyZ0F3SUJBZ0lJSmlGbTVaUE5lWlV3RFFZSktvWklodmNOQVFFTEJRQXdGVEVUTUJFR0ExVUUKQXhNS2EzVmlaWEp1WlhSbGN6QWVGdzB5TXpFeE1qVXdOekUwTXpOYUZ3MHpNekV4TWpJd056RTVNek5hTUJVeApFekFSQmdOVkJBTVRDbXQxWW1WeWJtVjBaWE13Z2dFaU1BMEdDU3FHU0liM0RRRUJBUVVBQTRJQkR3QXdnZ0VLCkFvSUJBUUNuVWR6bmpxNE9qeTNZQ1d0UCtpaThBaGE2eCtCQldUYVJaYVNmQXFxNkNYdmZFaUVsUm1GRlg2a3AKRXJuSHJmQTdnV3ZGRkVabWxGSkJzMEVKOU9xZEFYYkU1cVBQUzJOVU9zeTVORnRrSk1RUU4=
    server: https://staging-k8s-cluster.company.com:6443
  name: staging-cluster
contexts:
- context:
    cluster: production-cluster
    namespace: default
    user: prod-admin
  name: production-context
- context:
    cluster: development-cluster
    namespace: development
    user: dev-user
  name: development-context
- context:
    cluster: staging-cluster
    namespace: staging
    user: stage-user
  name: staging-context
current-context: production-context
kind: Config
preferences:
  colors: true
users:
- name: prod-admin
  user:
    client-certificate-data: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURCVENDQWUyZ0F3SUJBZ0lJSmlGbTVaUE5lWlV3RFFZSktvWklodmNOQVFFTEJRQXdGVEVUTUJFR0ExVUUKQXhNS2EzVmlaWEp1WlhSbGN6QWVGdzB5TXpFeE1qVXdOekUwTXpOYUZ3MHpNekV4TWpJd056RTVNek5hTUJVeApFekFSQmdOVkJBTVRDbXQxWW1WeWJtVjBaWE13Z2dFaU1BMEdDU3FHU0liM0RRRUJBUVVBQTRJQkR3QXdnZ0VLCkFvSUJBUUNuVWR6bmpxNE9qeTNZQ1d0UCtpaThBaGE2eCtCQldUYVJaYVNmQXFxNkNYdmZFaUVsUm1GRlg2a3AKRXJuSHJmQTdnV3ZGRkVabWxGSkJzMEVKOU9xZEFYYkU1cVBQUzJOVU9zeTVORnRrSk1RUU4=
    client-key-data: LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFb3dJQkFBS0NBUUVBcDFIYzU0NnVEbzh0MkFsclQvcG92QUlXdXNmZ1FWazJrV1drbndLcXVnbDczekloCkpVWmhSVitaS1JLNXg2M3dPNEZyeFJSR1pwUlNRYk5CQ2ZUcW5RRjJ4T2FqejB0alZEck11VFJiWkNURUVEZUgKUVE2UkJGNHJEc05DYTJxNlhZU0JUMFV3MDRFRUZDeWR0NHpQT0hESDV3MVRDZ056OXJmQVBadTNwOHlhL0NxegpzMFQrcitDRUNGa0k2VUc1SDdKNkMzaVd2Z1Q2djJzekVBY0l3dXlhQ2g5TWF1STZSNWpwZDNBMDNjcGdOd1ZMCk1vNzgxNE5rOGxScGxINFZLaEZkSWNDSkFXVTlUOVZQb2k3bThKZUhjQjdxT1ExK3VGOWNKOGRVSUNzU2x1Wm0KcVdnOCt6NXFRQUR5OXFOWHJudkVPb0k2dGMvaHQzQjlKQQ==
- name: dev-user
  user:
    client-certificate-data: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURCVENDQWUyZ0F3SUJBZ0lJSmlGbTVaUE5lWlV3RFFZSktvWklodmNOQVFFTEJRQXdGVEVUTUJFR0ExVUUKQXhNS2EzVmlaWEp1WlhSbGN6QWVGdzB5TXpFeE1qVXdOekUwTXpOYUZ3MHpNekV4TWpJd056RTVNek5hTUJVeApFekFSQmdOVkJBTVRDbXQxWW1WeWJtVjBaWE13Z2dFaU1BMEdDU3FHU0liM0RRRUJBUVVBQTRJQkR3QXdnZ0VLCkFvSUJBUUNuVWR6bmpxNE9qeTNZQ1d0UCtpaThBaGE2eCtCQldUYVJaYVNmQXFxNkNYdmZFaUVsUm1GRlg2a3AKRXJuSHJmQTdnV3ZGRkVabWxGSkJzMEVKOU9xZEFYYkU1cVBQUzJOVU9zeTVORnRrSk1RUU4=
    client-key-data: LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFb3dJQkFBS0NBUUVBcDFIYzU0NnVEbzh0MkFsclQvcG92QUlXdXNmZ1FWazJrV1drbndLcXVnbDczekloCkpVWmhSVitaS1JLNXg2M3dPNEZyeFJSR1pwUlNRYk5CQ2ZUcW5RRjJ4T2FqejB0alZEck11VFJiWkNURUVEZUgKUVE2UkJGNHJEc05DYTJxNlhZU0JUMFV3MDRFRUZDeWR0NHpQT0hESDV3MVRDZ056OXJmQVBadTNwOHlhL0NxegpzMFQrcitDRUNGa0k2VUc1SDdKNkMzaVd2Z1Q2djJzekVBY0l3dXlhQ2g5TWF1STZSNWpwZDNBMDNjcGdOd1ZMCk1vNzgxNE5rOGxScGxINFZLaEZkSWNDSkFXVTlUOVZQb2k3bThKZUhjQjdxT1ExK3VGOWNKOGRVSUNzU2x1Wm0KcVdnOCt6NXFRQUR5OXFOWHJudkVPb0k2dGMvaHQzQjlKQQ==
- name: stage-user
  user:
    client-certificate-data: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURCVENDQWUyZ0F3SUJBZ0lJSmlGbTVaUE5lWlV3RFFZSktvWklodmNOQVFFTEJRQXdGVEVUTUJFR0ExVUUKQXhNS2EzVmlaWEp1WlhSbGN6QWVGdzB5TXpFeE1qVXdOekUwTXpOYUZ3MHpNekV4TWpJd056RTVNek5hTUJVeApFekFSQmdOVkJBTVRDbXQxWW1WeWJtVjBaWE13Z2dFaU1BMEdDU3FHU0liM0RRRUJBUVVBQTRJQkR3QXdnZ0VLCkFvSUJBUUNuVWR6bmpxNE9qeTNZQ1d0UCtpaThBaGE2eCtCQldUYVJaYVNmQXFxNkNYdmZFaUVsUm1GRlg2a3AKRXJuSHJmQTdnV3ZGRkVabWxGSkJzMEVKOU9xZEFYYkU1cVBQUzJOVU9zeTVORnRrSk1RUU4=
    client-key-data: LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFb3dJQkFBS0NBUUVBcDFIYzU0NnVEbzh0MkFsclQvcG92QUlXdXNmZ1FWazJrV1drbndLcXVnbDczekloCkpVWmhSVitaS1JLNXg2M3dPNEZyeFJSR1pwUlNRYk5CQ2ZUcW5RRjJ4T2FqejB0alZEck11VFJiWkNURUVEZUgKUVE2UkJGNHJEc05DYTJxNlhZU0JUMFV3MDRFRUZDeWR0NHpQT0hESDV3MVRDZ056OXJmQVBadTNwOHlhL0NxegpzMFQrcitDRUNGa0k2VUc1SDdKNkMzaVd2Z1Q2djJzekVBY0l3dXlhQ2g5TWF1STZSNWpwZDNBMDNjcGdOd1ZMCk1vNzgxNE5rOGxScGxINFZLaEZkSWNDSkFXVTlUOVZQb2k3bThKZUhjQjdxT1ExK3VGOWNKOGRVSUNzU2x1Wm0KcVdnOCt6NXFRQUR5OXFOWHJudkVPb0k2dGMvaHQzQjlKQQ==`,
  );

  const handleAddClusters = () => {
    // 🎯 목적: 클러스터 추가 로직 시뮬레이션
    console.log("Adding clusters from kubeconfig:", configText);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Trigger</Button>
      </DialogTrigger>
      <DialogContent className="bg-background border-border flex h-[85%] max-w-[70%] flex-col sm:h-[90%] sm:max-w-[65%] lg:max-w-[60%] xl:max-w-[55%]">
        {/* Dialog Header */}
        <DialogHeader className="gap-1.5">
          <DialogTitle className="text-foreground text-lg font-semibold">
            Add Clusters from Kubeconfig
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm leading-5">
            Clusters added here are not merged into the ~/.kube/config file.
            Read more about adding clusters.
          </DialogDescription>
        </DialogHeader>

        {/* Textarea Container */}
        <div className="bg-muted/30 border-border flex min-h-0 flex-1 flex-col rounded-lg border shadow-sm">
          <ScrollArea className="min-h-0 flex-1">
            <div className="p-3">
              <pre
                className="overflow-wrap-anywhere text-foreground w-full resize-none border-0 bg-transparent font-mono text-sm break-all whitespace-pre-wrap outline-none focus-visible:ring-0"
                contentEditable
                suppressContentEditableWarning={true}
                onInput={(e) =>
                  setConfigText(e.currentTarget.textContent || "")
                }
                style={{
                  fontFamily:
                    'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                  lineHeight: "1.5",
                }}
              >
                {configText}
              </pre>
            </div>
          </ScrollArea>

          {/* Input Group Addon - Status Bar */}
          <div className="border-border bg-muted/20 border-t"></div>
          <div className="flex items-center justify-between px-3 pt-1.5 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-xs font-medium">
                Line 1, Column 1
              </span>
            </div>
            <div className="flex items-center gap-2">
              {/* 추가 상태 정보나 액션 버튼들이 들어갈 수 있는 공간 */}
            </div>
          </div>
        </div>

        {/* Dialog Footer */}
        <DialogFooter className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="bg-muted/30 border-border hover:bg-muted/50"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleAddClusters}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Add clusters
          </Button>
        </DialogFooter>

        {/* Custom Close Icon - 우상단 X 버튼 */}
        <DialogClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Dialog 템플릿 컴포넌트들을 모아놓은 Storybook 스토리입니다.
 * 실제 애플리케이션에서 사용할 수 있는 고품질 Dialog 템플릿을 제공합니다.
 */
const meta = {
  title: "templates/Dialog",
  component: KubeconfigDialog,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "트리거 버튼을 통해 호출되는 dialog 예시입니다.",
      },
    },
  },
} satisfies Meta<typeof KubeconfigDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AddClusters: Story = {
  render: () => <KubeconfigDialog />,
};

/**
 * 🎯 목적: Custom Helm Repo 추가 Dialog
 *
 * Helm repository 이름과 URL을 입력받는 간단한 Dialog 템플릿입니다.
 * Field 컴포넌트를 활용한 폼 구성 예시를 보여줍니다.
 */
function HelmRepoDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [repoName, setRepoName] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [skipTls, setSkipTls] = useState(false);
  const [keyFile, setKeyFile] = useState("");
  const [caFile, setCaFile] = useState("");
  const [certFile, setCertFile] = useState("");

  // 🎯 목적: 파일 입력 참조를 위한 ref
  const keyFileRef = React.useRef<HTMLInputElement>(null);
  const caFileRef = React.useRef<HTMLInputElement>(null);
  const certFileRef = React.useRef<HTMLInputElement>(null);

  const handleAddRepo = () => {
    // 🎯 목적: Helm repo 추가 로직 시뮬레이션
    console.log("Adding Helm repo:", { name: repoName, url: repoUrl });
    setIsOpen(false);
    setRepoName("");
    setRepoUrl("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Helm Repo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {/* Dialog Header */}
        <DialogHeader>
          <DialogTitle>Add custom Helm Repo</DialogTitle>
          <DialogDescription>Please add a helm repo.</DialogDescription>
        </DialogHeader>

        {/* Dialog Content - Form Fields */}
        <div className="flex flex-col gap-4">
          <Field>
            <FieldLabel>Helm repo name</FieldLabel>
            <Input
              type="text"
              placeholder="Enter a name"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
            />
          </Field>

          <Field>
            <FieldLabel>URL</FieldLabel>
            <Input
              type="text"
              placeholder="Enter a url"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
            />
          </Field>

          {/* 🎯 목적: 축소 상태일 때 Expand 버튼 표시 */}
          {!isExpanded && (
            <Button
              variant="ghost"
              size="sm"
              className="w-fit gap-2 self-start"
              onClick={() => setIsExpanded(true)}
            >
              Expand
              <ChevronDown className="h-4 w-4" />
            </Button>
          )}

          {/* 🎯 목적: 확장 시 추가 보안 설정 필드 표시 */}
          {isExpanded && (
            <>
              <div className="flex flex-col gap-2.5">
                {/* Security settings 섹션 */}
                <Field>
                  <FieldLabel>Security settings</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      placeholder="Key file"
                      value={keyFile}
                      readOnly
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        size="icon-xs"
                        variant="default"
                        onClick={() => keyFileRef.current?.click()}
                      >
                        <FolderSearch className="h-4 w-4" />
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                  <input
                    type="file"
                    ref={keyFileRef}
                    className="hidden"
                    onChange={(e) =>
                      setKeyFile(e.target.files?.[0]?.name || "")
                    }
                  />
                </Field>

                <InputGroup>
                  <InputGroupInput
                    placeholder="Ca file"
                    value={caFile}
                    readOnly
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      size="icon-xs"
                      variant="default"
                      onClick={() => caFileRef.current?.click()}
                    >
                      <FolderSearch className="h-4 w-4" />
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                <input
                  type="file"
                  ref={caFileRef}
                  className="hidden"
                  onChange={(e) => setCaFile(e.target.files?.[0]?.name || "")}
                />

                <InputGroup>
                  <InputGroupInput
                    placeholder="Certificate file"
                    value={certFile}
                    readOnly
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      size="icon-xs"
                      variant="default"
                      onClick={() => certFileRef.current?.click()}
                    >
                      <FolderSearch className="h-4 w-4" />
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                <input
                  type="file"
                  ref={certFileRef}
                  className="hidden"
                  onChange={(e) => setCertFile(e.target.files?.[0]?.name || "")}
                />

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="skip-tls"
                    checked={skipTls}
                    onCheckedChange={(checked) => setSkipTls(checked === true)}
                  />
                  <Label
                    htmlFor="skip-tls"
                    className="text-muted-foreground text-sm font-light"
                  >
                    Skip TLS certificate checks for the repository
                  </Label>
                </div>

                {/* Chart Repository Credentials 섹션 */}
                <Field className="mt-1.5">
                  <FieldLabel>Chart Repository Credentials</FieldLabel>
                  <Input type="text" placeholder="Username" />
                </Field>

                <Input type="password" placeholder="Password" />
              </div>

              {/* 🎯 목적: 확장 상태일 때 Collapse 버튼을 하단에 표시 */}
              <Button
                variant="ghost"
                size="sm"
                className="w-fit gap-2 self-start"
                onClick={() => setIsExpanded(false)}
              >
                Collapse
                <ChevronUp className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>

        {/* Dialog Footer */}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button onClick={handleAddRepo} className="gap-2 !px-4">
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </DialogFooter>

        {/* Custom Close Icon */}
        <DialogClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Custom Helm Repo 추가를 위한 간단한 폼 Dialog 예시입니다.
 */
export const HelmRepo: Story = {
  render: () => <HelmRepoDialog />,
};
